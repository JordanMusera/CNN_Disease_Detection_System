FROM python:3.13.2-slim

# Set working directory
WORKDIR /app

# Copy source code
COPY . /app

# Install build tools and upgrade pip, setuptools, wheel
RUN apt-get update && apt-get install -y build-essential \
    && pip install --upgrade pip setuptools wheel

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose FastAPI port
EXPOSE 8000

# Run app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
