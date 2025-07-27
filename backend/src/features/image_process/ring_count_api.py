from fastapi import APIRouter, UploadFile, File, HTTPException
import numpy as np
import cv2
import httpx
from scipy.signal import find_peaks
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
from ...core.config import settings

router = APIRouter()

ROBOFLOW_API_KEY = settings.roboflow_api_key
MODEL_ID = "pith-annotation-of-timber/1"
DETECT_URL = f"https://detect.roboflow.com/{MODEL_ID}?api_key={ROBOFLOW_API_KEY}"

def cartesian_to_polar(img, center):
    h, w = img.shape[:2]
    max_radius = int(np.linalg.norm([max(center[0], w - center[0]), max(center[1], h - center[1])]))
    polar_img = cv2.warpPolar(img, (360, max_radius), center, max_radius, flags=cv2.WARP_POLAR_LINEAR)
    _, polar_img = cv2.threshold(polar_img, 15, 255, cv2.THRESH_TOZERO)
    return polar_img

def fig_to_base64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches='tight')
    buf.seek(0)
    return base64.b64encode(buf.read()).decode('utf-8')

@router.post("/ring-count")
async def analyze_ring_count(file: UploadFile = File(...)):
    img_bytes = await file.read()
    np_img = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image file")

    # Call Roboflow for pith center
    async with httpx.AsyncClient() as client:
        response = await client.post(DETECT_URL, files={"file": (file.filename, img_bytes)})
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Roboflow API failed")
    predictions = response.json().get("predictions", [])
    if not predictions:
        raise HTTPException(status_code=404, detail="No pith detected")
    x_center, y_center = int(predictions[0]["x"]), int(predictions[0]["y"])
    center = (x_center, y_center)

    # Enhance rings
    inverted = 255 - img
    gamma = 2.5
    inv_gamma = 1.0 / gamma
    lut = np.array([((i / 255.0) ** inv_gamma) * 255 for i in range(256)]).astype("uint8")
    boosted = cv2.LUT(inverted, lut)
    contrast_enhanced = 255 - boosted
    contrast_enhanced = cv2.convertScaleAbs(contrast_enhanced, alpha=1.2, beta=-20)
    white_boosted = cv2.convertScaleAbs(contrast_enhanced, alpha=1.3, beta=20)
    blur_for_sharp = cv2.GaussianBlur(white_boosted, (7, 7), 10)
    highlighted = cv2.addWeighted(white_boosted, 1.5, blur_for_sharp, -0.5, 0)
    blurred = cv2.GaussianBlur(highlighted, (3, 3), 1)
    edges = cv2.Canny(blurred, 50, 150)

    # Polar transform
    polar_edges = cartesian_to_polar(edges, center=center)

    # Scan lines and ring count
    height = polar_edges.shape[0]
    line_indices = np.linspace(0, height - 1, 20, dtype=int)
    line_counts = []
    for y in line_indices:
        binary_line = (polar_edges[y, :] > 0).astype(np.uint8)
        peaks, _ = find_peaks(binary_line, distance=5)
        line_counts.append(len(peaks))

    # Visualizations as base64
    fig1 = plt.figure(figsize=(8, 6))
    plt.imshow(edges, cmap="gray")
    plt.title("Canny Edge Detection")
    plt.axis("off")
    img_canny = fig_to_base64(fig1)
    plt.close(fig1)

    fig2 = plt.figure(figsize=(6, 8))
    plt.imshow(polar_edges, cmap='gray', aspect='auto')
    for y in line_indices:
        plt.axhline(y=y, color='cyan', linestyle='--', linewidth=1)
    plt.title("Polar Transform with Scan Lines")
    plt.xlabel("Angle (degrees)")
    plt.ylabel("Radius (pixels)")
    img_polar = fig_to_base64(fig2)
    plt.close(fig2)

    sns.set_theme(style="whitegrid")
    fig3 = plt.figure(figsize=(6, 8))
    sns.boxplot(data=line_counts, orient='v', width=0.3, color="#4c72b0", fliersize=6, linewidth=2)
    plt.title("Distribution of Ring Counts", fontsize=14, weight='bold')
    plt.ylabel("Ring Count", fontsize=12)
    plt.xticks([])
    img_box = fig_to_base64(fig3)
    plt.close(fig3)

    # Boxplot statistics
    q1 = np.percentile(line_counts, 25)
    median = np.percentile(line_counts, 50)
    q3 = np.percentile(line_counts, 75)
    iqr = q3 - q1
    # Outliers: values < Q1 - 1.5*IQR or > Q3 + 1.5*IQR
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr
    outliers = [x for x in line_counts if x < lower_bound or x > upper_bound]
    q1_range = (int(np.floor(q1)), int(np.ceil(q3)))

    return {
        "pith_center": center,
        "ring_counts": line_counts,
        "mean_ring_count": float(np.mean(line_counts)),
        "img_canny": img_canny,
        "img_polar": img_polar,
        "img_boxplot": img_box,
        "boxplot_summary": {
            "Q1": float(q1),
            "Median": float(median),
            "Q3": float(q3),
            "IQR": float(iqr),
            "Outliers": outliers,
            "Q1_Q3_range": q1_range
        }
    }