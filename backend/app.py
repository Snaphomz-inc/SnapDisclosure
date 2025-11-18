import os
import io
import zipfile
import logging
import json
import time
from time import sleep

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PyPDF2 import PdfReader
from dotenv import load_dotenv
import openai

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise RuntimeError("OPENAI_API_KEY missing in .env file")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# PDF TEXT EXTRACTOR
def extract_text_from_pdf(file_bytes):
    """Extract text from a PDF file"""
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        return "\n".join([page.extract_text() or "" for page in reader.pages])
    except Exception:
        return ""


def safe_openai_completion(prompt, retries=5):
    """Retry wrapper for OpenAI API"""
    for attempt in range(retries):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-5-mini",
                messages=[{"role": "user", "content": prompt}],
            )
            return response.choices[0].message.content.strip()

        except Exception as e:
            logging.warning(f"OpenAI error: {e}, retrying in 10 seconds...")
            time.sleep(10)

    return "Failed to get response from OpenAI after retries."


# DOCUMENT SUMMARIZER
def summarize_document(text):
    """
    Generates:
    - Document title
    - 4-6 bullet points with title / summary / details / red_flag flag
    """

    prompt = f"""
You are an expert AI in real estate, finance, and legal risk assessment.

Analyze and summarize this mortgage/disclosure document clearly.
Highlight potential red flags.

Return JSON only in this exact structure:

{{
  "title": "Document title (<=5 words)",
  "points": [
    {{
      "title": "Short title",
      "summary": "1-2 line summary",
      "details": "3-6 lines details",
      "is_red_flag": true or false
    }}
  ]
}}

Rules:
- 4-6 points only
- No markdown
- Only valid JSON

Document text:
{text[:9000]}
"""

    response_text = safe_openai_completion(prompt)

    # Try parsing JSON
    try:
        if response_text.startswith("```json"):
            response_text = response_text[7:-3].strip()
        elif response_text.startswith("```"):
            response_text = response_text[3:-3].strip()

        return json.loads(response_text)

    except Exception as e:
        logging.warning(f"JSON parse failed: {e} — Raw response: {response_text}")

        return {
            "title": "Parsing Error",
            "points": [
                {
                    "title": "Summary Failed",
                    "summary": "Could not parse AI response.",
                    "details": response_text,
                    "is_red_flag": False,
                }
            ]
        }


# UPLOAD ROUTE
@app.route("/api/upload", methods=["POST"])
def upload_zip():
    print("UPLOAD ROUTE HIT")

    if "file" not in request.files:
        return jsonify({"success": False, "error": "No file uploaded"}), 400

    uploaded_file = request.files["file"]
    filename = secure_filename(uploaded_file.filename)
    file_bytes = uploaded_file.read()

    results = []

    # PROCESS SINGLE FILE
    def process_file(name, data):
        print(f"Processing: {name}")

        # Extract text
        if name.lower().endswith(".pdf"):
            text = extract_text_from_pdf(data)
        else:
            text = data.decode("utf-8", errors="ignore")

        if not text.strip():
            return {
                "file_name": name,
                "title": "Untitled Document",
                "points": [
                    {"title": "No content", "summary": "No text extracted", "details": "", "is_red_flag": False}
                ]
            }

        summary_data = summarize_document(text)

        return {
            "file_name": name,
            "title": summary_data.get("title", "Untitled Document"),
            "points": summary_data.get("points", []),
        }

    # ZIP 
    if zipfile.is_zipfile(io.BytesIO(file_bytes)):
        with zipfile.ZipFile(io.BytesIO(file_bytes)) as z:
            for name in z.namelist():
                if name.lower().endswith((".pdf", ".txt")):
                    data = z.read(name)
                    results.append(process_file(name, data))
                    sleep(0.5)

    # SINGLE FILE
    else:
        results.append(process_file(filename, file_bytes))

    return jsonify({"success": True, "files": results}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)


