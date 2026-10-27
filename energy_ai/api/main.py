"""
AI prediction service for the Energy Trading Marketplace.

Run from anywhere:
    uvicorn api.main:app --reload --port 8000
"""
from pathlib import Path
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="Energy Marketplace AI Service",
    description="Demand, solar generation, and price prediction for the P2P energy marketplace",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATHS = {
    "demand": BASE_DIR / "models" / "demand_model.pkl",
    "generation": BASE_DIR / "models" / "generation_model.pkl",
    "price": BASE_DIR / "models" / "price_model.pkl",
}
_loaded = {}


def get_model(name: str):
    if name not in _loaded:
        path = MODEL_PATHS.get(name)
        if not path or not path.exists():
            raise HTTPException(
                status_code=503,
                detail=f"'{name}' model not found at {path}. Run training/train_{name}_model.py first.",
            )
        try:
            _loaded[name] = joblib.load(path)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error loading '{name}' model: {str(e)}",
            )
    return _loaded[name]


# ---------- Request schemas ----------
class DemandRequest(BaseModel):
    hour: int = Field(..., ge=0, le=23)
    day_of_week: int = Field(..., ge=0, le=6, description="0=Monday ... 6=Sunday")
    temperature: float
    humidity: float
    previous_demand: float
    holiday: int = Field(0, ge=0, le=1)


class GenerationRequest(BaseModel):
    temperature: float
    humidity: float
    cloud_cover: float = Field(..., ge=0, le=100)
    solar_irradiance: float = Field(..., ge=0)
    hour: int = Field(..., ge=0, le=23)
    month: int = Field(..., ge=1, le=12)


class PriceRequest(BaseModel):
    demand_kwh: float
    generation_kwh: float
    hour: int = Field(..., ge=0, le=23)
    day_of_week: int = Field(..., ge=0, le=6)
    previous_price: float


# ---------- Endpoints ----------
@app.get("/")
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "Energy Marketplace AI Service",
        "models_available": {name: path.exists() for name, path in MODEL_PATHS.items()}
    }


@app.post("/predict/demand")
def predict_demand(req: DemandRequest):
    bundle = get_model("demand")
    features = bundle["features"]
    row = [[getattr(req, f) for f in features]]
    df = pd.DataFrame(row, columns=features)
    prediction = bundle["model"].predict(df)[0]
    return {
        "status": "success",
        "expected_demand_kwh": round(float(prediction), 2),
        "expectedDemandKwh": round(float(prediction), 2),
        "unit": "kWh"
    }


@app.post("/predict/generation")
def predict_generation(req: GenerationRequest):
    bundle = get_model("generation")
    features = bundle["features"]
    row = [[getattr(req, f) for f in features]]
    df = pd.DataFrame(row, columns=features)
    prediction = bundle["model"].predict(df)[0]
    return {
        "status": "success",
        "expected_generation_kwh": round(float(prediction), 2),
        "expectedGenerationKwh": round(float(prediction), 2),
        "unit": "kWh"
    }


@app.post("/predict/price")
def predict_price(req: PriceRequest):
    bundle = get_model("price")
    features = bundle["features"]
    row = [[getattr(req, f) for f in features]]
    df = pd.DataFrame(row, columns=features)
    prediction = bundle["model"].predict(df)[0]
    return {
        "status": "success",
        "recommended_price_per_kwh": round(float(prediction), 2),
        "recommendedPricePerKwh": round(float(prediction), 2),
        "currency": "INR",
        "unit": "kWh"
    }
