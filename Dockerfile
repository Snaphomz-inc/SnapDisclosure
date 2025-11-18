FROM python:3.10-slim

WORKDIR /app

# Install only backend dependencies
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source
COPY backend ./backend
COPY app.py ./app.py

EXPOSE 7860
ENV PORT=7860

# Start the Flask server
CMD ["python", "app.py"]
