#%%
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image, ImageFile, UnidentifiedImageError
import base64
from io import BytesIO
import sys, json, warnings
import numpy as np

from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget

warnings.filterwarnings("ignore")
ImageFile.LOAD_TRUNCATED_IMAGES = True

model = models.resnet18(weights=None)
model.fc = nn.Linear(model.fc.in_features, 2)
model.load_state_dict(torch.load(
     r'C:\Projects\python\deep_learning\chest_xray_phneumonia_detection_CNN\pth_files\bone_fracture_classifier.pth',
    map_location=torch.device('cpu')
))
model.eval()

device = torch.device("cpu")
model.to(device)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

class_names = ["Normal", "Fracture"]

def handler(job):
    try:
        image_base64 = job.get('input', '')
        if not image_base64:
            return {"status": "error", "message": "No image data received."}

        if image_base64.startswith('data:image'):
            image_base64 = image_base64.split(',')[1]

        image_bytes = base64.b64decode(image_base64)

        try:
            original_image = Image.open(BytesIO(image_bytes)).convert('RGB')
        except UnidentifiedImageError:
            return {"status": "error", "message": "Invalid image format."}

        img_for_model = transform(original_image).unsqueeze(0).to(device)

        with torch.no_grad():
            outputs = model(img_for_model)
            pred_idx = torch.argmax(outputs, 1).item()
            prediction = class_names[pred_idx]

        target_layer = model.layer4[-1]
        cam = GradCAM(model=model, target_layers=[target_layer])
        targets = [ClassifierOutputTarget(pred_idx)]
        grayscale_cam = cam(input_tensor=img_for_model, targets=targets)[0]

        img_np = np.array(original_image.resize((224, 224))) / 255.0
        heatmap = show_cam_on_image(img_np, grayscale_cam, use_rgb=True)

        heatmap_pil = Image.fromarray(heatmap)
        buffer = BytesIO()
        heatmap_pil.save(buffer, format="JPEG")
        heatmap_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

        return {
            "status": "success",
            "prediction": prediction,
            "heatmap_base64": heatmap_base64
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    try:
        input_json = sys.stdin.read()
        job = json.loads(input_json)
        result = handler(job)
        print(json.dumps(result), flush=True)
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}), flush=True)
