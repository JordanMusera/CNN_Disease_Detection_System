#%%
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image, ImageFile
import base64
from io import BytesIO
import sys, json, warnings
import numpy as np
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
import os

warnings.filterwarnings("ignore")
ImageFile.LOAD_TRUNCATED_IMAGES = True
device = torch.device("cpu")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PTH_DIR = os.path.join(BASE_DIR, "pth_files")

STAGE1_PTH = os.path.join(PTH_DIR, "Normal_Abnormal_lungcancer_classifier.pth")
STAGE2_PTH = os.path.join(PTH_DIR, "bm_classifier.pth")

def load_stage1():
    model = models.resnet18(weights=None)
    model.fc = nn.Linear(model.fc.in_features, 2)
    model.load_state_dict(torch.load(STAGE1_PTH, map_location=device))
    model.to(device).eval()
    return model

def load_stage2():
    model = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)
    model.fc = nn.Linear(model.fc.in_features, 2)
    model.load_state_dict(torch.load(STAGE2_PTH, map_location=device))
    model.to(device).eval()
    return model

stage1 = load_stage1()
stage2 = load_stage2()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

class_stage1 = ["Normal", "Abnormal"]
class_stage2 = ["Benign", "Malignant"]

def handler(job):
    try:
        img_b64 = job.get("input", "")
        if not img_b64:
            return {"status": "error", "message": "No image data received."}

        if img_b64.startswith("data:image"):
            img_b64 = img_b64.split(",")[1]

        img_bytes = base64.b64decode(img_b64)
        original = Image.open(BytesIO(img_bytes)).convert("RGB")
        model_input = transform(original).unsqueeze(0).to(device)

        with torch.no_grad():
            out1 = stage1(model_input)
            pred1 = torch.argmax(out1, 1).item()
            label1 = class_stage1[pred1]

        final_pred = label1

        if label1 == "Abnormal":
            out2 = stage2(model_input)
            pred2 = torch.argmax(out2, 1).item()
            final_pred = class_stage2[pred2]
        else:
            pred2 = None

        cam_model = stage2 if label1 == "Abnormal" else stage1
        target_idx = pred2 if label1 == "Abnormal" else pred1
        target_layer = cam_model.layer4[-1]

        cam = GradCAM(model=cam_model, target_layers=[target_layer])
        grayscale_cam = cam(
            input_tensor=model_input,
            targets=[ClassifierOutputTarget(target_idx)]
        )[0]

        cam_resized = np.array(
            Image.fromarray((grayscale_cam * 255).astype(np.uint8)).resize(original.size)
        ).astype(np.float32) / 255.0

        img_np = np.array(original) / 255.0
        heatmap = show_cam_on_image(img_np, cam_resized, use_rgb=True)

        buffer = BytesIO()
        Image.fromarray(heatmap).save(buffer, format="JPEG")
        heatmap_b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

        return {
            "status": "success",
            "stage1_prediction": label1,
            "final_prediction": final_pred,
            "heatmap_base64": heatmap_b64
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    try:
        data = sys.stdin.read()
        job = json.loads(data)
        result = handler(job)
        print(json.dumps(result), flush=True)
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}), flush=True)
