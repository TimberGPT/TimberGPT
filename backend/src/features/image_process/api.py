from fastapi import APIRouter, UploadFile, File, HTTPException
import httpx
import numpy as np
import cv2
import matplotlib.pyplot as plt
import io
import base64
from starlette.responses import StreamingResponse
from fastapi.responses import JSONResponse
from ...core.config import settings


router = APIRouter()

ROBOFLOW_API_KEY =  settings.roboflow_api_key
ROBOFLOW_API_URL = "https://serverless.roboflow.com"

# Helper to call Roboflow API using httpx
async def call_roboflow_model(image_bytes: bytes, model_id: str):
    encoded_image = base64.b64encode(image_bytes).decode("utf-8")

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{ROBOFLOW_API_URL}/{model_id}",
            params={"api_key": ROBOFLOW_API_KEY},
            content=encoded_image,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=30.0
        )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    return response.json()

@router.post("/analyze")
async def analyze_defect(file: UploadFile = File(...)):
    # Read uploaded file bytes
    image_bytes = await file.read()
    np_arr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Call Roboflow models
    log_surface_result = await call_roboflow_model(image_bytes, "wood_segment/17")
    defect_result = await call_roboflow_model(image_bytes, "complete_knot-wi27y/1")

    # Create blank masks
    log_mask = np.zeros(image.shape[:2], dtype=np.uint8)
    defect_mask = np.zeros(image.shape[:2], dtype=np.uint8)

    # Draw log surface polygons
    for pred in log_surface_result.get("predictions", []):
        points = np.array([[p['x'], p['y']] for p in pred['points']], dtype=np.int32)
        cv2.fillPoly(log_mask, [points], 255)

    # Draw defect polygons
    for pred in defect_result.get("predictions", []):
        points = np.array([[p['x'], p['y']] for p in pred['points']], dtype=np.int32)
        cv2.fillPoly(defect_mask, [points], 255)

    # Area calculations
    total_log_area = int(np.sum(log_mask > 0))
    defect_area = int(np.sum(defect_mask > 0))
    defect_ratio = (defect_area / total_log_area) * 100 if total_log_area > 0 else 0

    # Visualization
    overlay = image_rgb.copy()
    log_color = np.zeros_like(image_rgb)
    defect_color = np.zeros_like(image_rgb)
    log_color[log_mask > 0] = [0, 255, 255]
    defect_color[defect_mask > 0] = [255, 0, 255]

    overlay = cv2.addWeighted(overlay, 1, log_color, 0.5, 0)
    overlay = cv2.addWeighted(overlay, 1, defect_color, 0.5, 0)

    # Plot using matplotlib
    fig, axs = plt.subplots(1, 2, figsize=(16, 8))
    axs[0].imshow(image_rgb)
    axs[0].set_title("Original Image")
    axs[0].axis('off')

    axs[1].imshow(overlay)
    axs[1].set_title(f"Overlay - Defect Ratio: {defect_ratio:.2f}%")
    axs[1].axis('off')

    # Save to buffer
    buf = io.BytesIO()
    plt.tight_layout()
    plt.savefig(buf, format="png")
    plt.close(fig)
    buf.seek(0)
    image_blob = base64.b64encode(buf.getvalue()).decode("utf-8")

    return {
        "total_log_area": total_log_area,
        "defect_area": defect_area,
        "defect_ratio": round(defect_ratio, 2),
        "image_blob": image_blob
    }