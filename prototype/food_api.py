from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware( CORSMiddleware, allow_origins=["*"],
allow_credentials=True, 
allow_methods=["*"], 
allow_headers=["*"], 
)

# Load Model
model = models.efficientnet_b3(pretrained=False)
num_classes = 5
model.classifier[1] = torch.nn.Linear(model.classifier[1].in_features, num_classes)
model.load_state_dict(torch.load('./model/efficientnet_food_classification.pth', map_location=torch.device('cpu')))
model.eval()

# Define Image Transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Food Class Labels
DATASET_PATH = "./model/Processed-Dataset/train"
class_labels = sorted(os.listdir(DATASET_PATH))

@app.post("/predict/")
async def predict_image(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file).convert("RGB")
        image = transform(image).unsqueeze(0)  # Add batch dimension
        
        with torch.no_grad():
            outputs = model(image)
            _, predicted_class = torch.max(outputs, 1)
        
        predicted_label = class_labels[predicted_class.item()]
        return JSONResponse(content={"predicted_class": predicted_label})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)