import os
import io
import zipfile
import logging
import json
import time
import requests

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PyPDF2 import PdfReader
from dotenv import load_dotenv
import openai

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
AZURE_ENDPOINT = os.getenv("AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT") 
AZURE_KEY = os.getenv("AZURE_DOCUMENT_INTELLIGENCE_KEY")
AZURE_MODEL_ID = os.getenv("AZURE_MODEL_ID", "prebuilt-document")  

if not openai.api_key:
    raise RuntimeError("OPENAI_API_KEY not found in .env")
if not AZURE_ENDPOINT or not AZURE_KEY:
    raise RuntimeError("Azure Document Intelligence credentials missing in .env")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

#Azure Document Intelligence
def analyze_with_azure(file_bytes, file_name):
    print(f"Sending {file_name} to Azure Document Intelligence...")
    """Send file to Azure Document Intelligence and get structured data."""
    try:
        url = f"{AZURE_ENDPOINT}/documentintelligence/documentModels/{AZURE_MODEL_ID}:analyze?api-version=2024-02-29-preview"
        headers = {
            "Ocp-Apim-Subscription-Key": AZURE_KEY,
            "Content-Type": "application/pdf"
        }

        response = requests.post(url, headers=headers, data=file_bytes)
        if response.status_code != 202:
            return {"error": f"Azure request failed: {response.text}"}

        result_url = response.headers.get("operation-location")
        if not result_url:
            return {"error": "No operation-location returned from Azure."}

        for _ in range(30):
            poll = requests.get(result_url, headers={"Ocp-Apim-Subscription-Key": AZURE_KEY})
            result_json = poll.json()
            if result_json.get("status") in ["succeeded", "failed"]:
                break
            time.sleep(2)

        if result_json.get("status") != "succeeded":
            return {"error": "Azure analysis failed or timed out."}

        return result_json

    except Exception as e:
        logging.exception("Azure Document Intelligence error")
        return {"error": str(e)}
    
def extract_text_from_pdf(file_bytes):
    """Extract text from PDF pages (fallback if Azure fails)."""
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        return "\n".join([page.extract_text() or "" for page in reader.pages])
    except Exception:
        return ""

# OpenAI Helpers
def safe_openai_completion(prompt, model="gpt-4o-mini", retries=5):
    """Retry-safe OpenAI completion with backoff."""
    for attempt in range(retries):
        try:
            response = openai.ChatCompletion.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logging.warning(f"OpenAI error: {e}, retrying in 10 seconds...")
            time.sleep(10)
    return "Failed to get response from OpenAI after retries."

def summarize_document(extracted_text, structured_fields=None):
    """
    Summarize document with optional structured data context.
    """
    context = ""
    if structured_fields:
        try:
            field_lines = [f"{k}: {v.get('content')}" for k, v in structured_fields.items() if v.get("content")]
            context = "\nStructured fields:\n" + "\n".join(field_lines)
        except Exception:
            pass

    prompt = f"""
You are an expert AI in real estate, finance, and legal risk assessment.

Analyze and summarize this mortgage/disclosure document clearly.
Highlight potential red flags.

Return JSON only in this format:
{{
  "title": "Brief document title (<=5 words)",
  "points": [
    {{
      "title": "Short key point title (3-6 words)",
      "summary": "1-2 line summary of the main observation.",
      "details": "3-6 lines elaborating on the finding — include why it matters, implications, and context.",
      "is_red_flag": true or false
    }},
    ...
  ]
}}

Guidelines:
- "is_red_flag": true for critical or risky findings.
- 4-6 points max.
- No markdown, only valid JSON.

{context}

Document text:
{extracted_text[:9000]}
"""
    response_text = safe_openai_completion(prompt)

    try:
        if response_text.startswith("```json"):
            response_text = response_text[7:-3].strip()
        elif response_text.startswith("```"):
            response_text = response_text[3:-3].strip()
        data = json.loads(response_text)
        for p in data.get("points", []):
            if "is_red_flag" not in p:
                p["is_red_flag"] = False
        return data
    except Exception as e:
        logging.warning(f"Failed to parse JSON: {e}. Raw: {response_text}")
        return {
            "title": "Parsing Error",
            "points": [{
                "title": "Summary Parsing Failed",
                "summary": "Could not parse AI response.",
                "details": response_text,
                "is_red_flag": False,
            }]
        }

# Upload Route
@app.route("/api/upload", methods=["POST"])
def upload_zip():
    print("UPLOAD ROUTE HIT")

    if "file" not in request.files:
        return jsonify({"success": False, "error": "No file uploaded"}), 400

    uploaded_file = request.files["file"]
    filename = secure_filename(uploaded_file.filename)
    file_bytes = uploaded_file.read()

    results = []

    def process_file(name, data):
        """Process each file through Azure + OpenAI."""
        print(f"Processing: {name}")

        azure_result = analyze_with_azure(data, name)

        if "error" in azure_result:
            # fallback to direct text extraction
            print("AZURE ERROR! \n\n\n\n\n")
            text = extract_text_from_pdf(data)
            summary_data = summarize_document(text)
            return {
                "file_name": name,
                "azure_status": "failed",
                "title": summary_data.get("title", "Untitled"),
                "points": summary_data.get("points", []),
            }

        # Extract structured data + text
        analyze_result = azure_result.get("analyzeResult", {})
        docs = analyze_result.get("documents", [])
        text_content = ""

        if "content" in analyze_result:
            text_content = analyze_result["content"]
        elif docs and "content" in docs[0]:
            text_content = docs[0]["content"]

        fields = {}
        if docs and "fields" in docs[0]:
            fields = docs[0]["fields"]

        summary_data = summarize_document(text_content, fields)

        return {
            "file_name": name,
            "azure_status": "succeeded",
            "title": summary_data.get("title", "Untitled Document"),
            "points": summary_data.get("points", []),
            "extracted_fields": {k: v.get("content") for k, v in fields.items() if v.get("content")},
        }

    # Handle ZIP or single PDF
    if zipfile.is_zipfile(io.BytesIO(file_bytes)):
        with zipfile.ZipFile(io.BytesIO(file_bytes)) as z:
            for name in z.namelist():
                if name.endswith((".pdf", ".txt")):
                    data = z.read(name)
                    results.append(process_file(name, data))
                    time.sleep(0.5)
    else:
        results.append(process_file(filename, file_bytes))

    return jsonify({"success": True, "files": results}), 200

#  Run Server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))

