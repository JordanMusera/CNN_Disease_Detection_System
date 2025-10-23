#%%
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image, ImageFile, UnidentifiedImageError
import base64
from io import BytesIO
import sys, json, warnings

# --- Suppress warnings for clean JSON output ---
warnings.filterwarnings("ignore")
ImageFile.LOAD_TRUNCATED_IMAGES = True

# 1. Load the model
model = models.resnet18(weights=None)
model.fc = nn.Linear(model.fc.in_features, 2)
model.load_state_dict(torch.load(
    r'C:\Projects\python\deep_learning\chest_xray_phneumonia_detection_CNN\pneumonia_classifier.pth',
    map_location=torch.device('cpu')
))
model.eval()

# 2. Define transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# 3. Class labels
class_names = ['Normal', 'Tuberculosis']

# 4. Inference handler
def handler(job):
    try:
        image_base64 = job.get('input', '')
        if not image_base64:
            return {"status": "error", "message": "No image data received."}

        # Remove prefix like 'data:image/jpeg;base64,'
        if image_base64.startswith('data:image'):
            image_base64 = image_base64.split(',')[1]

        image_bytes = base64.b64decode(image_base64)

        try:
            image = Image.open(BytesIO(image_bytes)).convert('RGB')
        except UnidentifiedImageError:
            return {"status": "error", "message": "Cannot identify image file. Ensure it's a valid JPEG or PNG image."}

        image = transform(image).unsqueeze(0)

        with torch.no_grad():
            outputs = model(image)
            _, preds = torch.max(outputs, 1)
            prediction = class_names[preds.item()]

        return {"status": "success", "prediction": prediction}

    except Exception as e:
        return {"status": "error", "message": str(e)}

# 5. Entry point for Node.js
if __name__ == "__main__":
    try:
        # Use stdin for large base64 images (safer than sys.argv)
        input_json = sys.stdin.read()
        job = json.loads(input_json)
        result = handler(job)
        print(json.dumps(result), flush=True)  # ✅ print only clean JSON
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}), flush=True)
