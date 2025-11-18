import os

from backend.app import app

if __name__ == "__main__":
    # Align root entry point with Hugging Face default port.
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 7860)))
