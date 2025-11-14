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

warnings.filterwarnings("ignore")
ImageFile.LOAD_TRUNCATED_IMAGES = True
device = torch.device("cpu")


stage1 = models.resnet18(weights=None)
stage1.fc = nn.Linear(stage1.fc.in_features, 2)
stage1.load_state_dict(torch.load(
    r'C:\Projects\python\deep_learning\chest_xray_phneumonia_detection_CNN\pth_files\Normal_Abnormal_lungcancer_classifier.pth',
    map_location=device
))
stage1.eval().to(device)

stage2 = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)
stage2.fc = nn.Linear(stage2.fc.in_features, 2)
stage2.load_state_dict(torch.load(
    r'C:\Projects\python\deep_learning\chest_xray_phneumonia_detection_CNN\pth_files\bm_classifier.pth',
    map_location=device
))
stage2.eval().to(device)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

class_stage1 = ['Normal', 'Abnormal']
class_stage2 = ['Benign', 'Malignant']

def handler(job):
    try:
        img_b64 = job.get('input', '')
        if not img_b64:
            return {"status": "error", "message": "No image data received."}

        if img_b64.startswith('data:image'):
            img_b64 = img_b64.split(',')[1]

        img_bytes = base64.b64decode(img_b64)
        original = Image.open(BytesIO(img_bytes)).convert('RGB')
        model_input = transform(original).unsqueeze(0).to(device)

        with torch.no_grad():
            out1 = stage1(model_input)
            pred1 = torch.argmax(out1, 1).item()
            label1 = class_stage1[pred1]

        final_pred = label1
        if label1 == 'Abnormal':
            out2 = stage2(model_input)
            pred2 = torch.argmax(out2, 1).item()
            final_pred = class_stage2[pred2]

        cam_model = stage2 if label1 == 'Abnormal' else stage1
        target_idx = pred2 if label1 == 'Abnormal' else pred1
        target_layer = cam_model.layer4[-1]

        cam = GradCAM(model=cam_model, target_layers=[target_layer])
        grayscale_cam = cam(input_tensor=model_input, targets=[ClassifierOutputTarget(target_idx)])[0]

        cam_resized = np.array(
            Image.fromarray((grayscale_cam * 255).astype(np.uint8)).resize(original.size)
        ).astype(np.float32) / 255.0

        img_np = np.array(original) / 255.0
        heatmap = show_cam_on_image(img_np, cam_resized, use_rgb=True)

        buffer = BytesIO()
        Image.fromarray(heatmap).save(buffer, format="JPEG")
        heatmap_b64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

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
