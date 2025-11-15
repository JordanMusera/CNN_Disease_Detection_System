from fastapi import FastAPI
from pydantic import BaseModel
import importlib
import base64
from fastapi.middleware.cors import CORSMiddleware

print("api.py loaded")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://cnn-disease-detection-system-server.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageInput(BaseModel):
    image_base64: str


def run_model(model_name: str, base64_image: str):
    try:
        module = importlib.import_module(f"trained_models.{model_name}_model")

        if not hasattr(module, "handler"):
            return {"status": "error", "message": "handler() not found in model file"}

        result = module.handler(base64_image)
        return result

    except ModuleNotFoundError:
        return {"status": "error", "message": f"Model file '{model_name}_model.py' not found."}

    except Exception as e:
        return {"status": "error", "message": str(e)}



@app.post("/predict/tuberculosis")
def predict_tb(data: ImageInput):
    print("tb loaded")
    return run_model("tuberculosis", data.image_base64)


@app.post("/predict/pneumonia")
def predict_pneumonia(data: ImageInput):
    return run_model("pneumonia", data.image_base64)


@app.post("/predict/bone_fracture")
def predict_fracture(data: ImageInput):
    return run_model("bone_fracture", data.image_base64)

@app.post("/predict/lung_cancer")
def predict_fracture(data: ImageInput):
    return run_model("lung_cancer", data.image_base64)
