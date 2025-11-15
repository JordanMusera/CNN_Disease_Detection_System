# Use Python 3.10 slim image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy source code
COPY . /app

# Install system dependencies for building Python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip, setuptools, wheel
RUN pip install --upgrade pip setuptools wheel

# Install PyTorch (CPU) and torchvision from official wheels
RUN pip install torch==2.1.0+cpu torchvision==0.15.2+cpu --extra-index-url https://download.pytorch.org/whl/cpu

# Install pytorch-grad-cam compatible with Python 3.10
RUN pip install grad-cam==1.4.6

# Install remaining Python dependencies from requirements.txt
# Remove torch, torchvision, and grad-cam from your requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose FastAPI port
EXPOSE 8000

# Run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
