import base64
from io import BytesIO
import json
import sys
import torch
import torch.nn as nn
from torchvision import transforms,models
from PIL import Image,ImageFile,UnidentifiedImageError

model = models.resnet18(weights=None)
model.fc = nn.Linear(model.fc.in_features,3)
model.load_state_dict(torch.load(
    '',
    map_location=torch.device('cpu')
))
model.eval()

transform = transforms.Compose([
    transforms.Resize(224,224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

class_name = ['Bengin cases','Malignant cases','Normal cases']

def handler(job):
    try:
        image_base64 = job.get('input','')
        if not image_base64:
            return({'status':'error','message':'Cannot identify image file'})
        
        if image_base64.startswith('data:image'):
            image_base64 = image_base64.split(',')[1]
            
        image_bytes = base64.b64decode(image_base64)
        
        try:
            image = Image.open(BytesIO(image_bytes)).convert('RGB')
        except UnidentifiedImageError:
            return({'status':'error','message':'Unidentified image error'})
        
        image.transform(image).unsqueeze(0)
        
        with torch.no_grad():
            outputs = model(0),
            _,preds = torch.max(outputs,1),
            prediction = class_name[preds.item()]
        return({'status':'success',
                'prediction':prediction})
        
    except Exception as e:
        return({'status':'error',
                'message':e})
        

if __name__ == '__main__':
    try:
        input_json = sys.stdin.read()
        job = json.loads(input_json)
        result = handler(job)
        print(json.dump(result),flush=True)
    except Exception as e:
        print(json.dumps({'status':'error','message':str(e)}),flush=True)
        
            