"""
AI prediction service for the Energy Trading Marketplace.

Run from the project root:
    uvicorn api.main:app --reload --port 8000

Then open http://127.0.0.1:8000/docs for interactive Swagger UI.
"""
import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(
    title="Energy Marketplace AI Service",
    description="Demand, solar generation, and price prediction for the P2P energy marketplace",
    version="1.0.0",
)

MODEL_PATHS = {
    "demand": "models/demand_model.pkl",
    "generation": "models/generation_model.pkl",
    "price": "models/price_model.pkl",
}
_loaded = {}


def get_model(name: str):
    if name not in _loaded:
        try:
            _loaded[name] = joblib.load(MODEL_PATHS[name])
        except FileNotFoundError:
            raise HTTPException(
                status_code=503,
                detail=f"'{name}' model not found. Run training/train_{name}_model.py first.",
            )
    return _loaded[name]


# ---------- yaha par database  schemas requests kari ahi maine
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


# ---------- endpoints ----------
@app.get("/")
def root():
    return {"status": "ok", "message": "Energy Marketplace AI service is running"}


@app.post("/predict/demand")
def predict_demand(req: DemandRequest):
    bundle = get_model("demand")
    row = [[getattr(req, f) for f in bundle["features"]]]
    prediction = bundle["model"].predict(row)[0]
    return {"expected_demand_kwh": round(float(prediction), 2)}


@app.post("/predict/generation")
def predict_generation(req: GenerationRequest):
    bundle = get_model("generation")
    row = [[getattr(req, f) for f in bundle["features"]]]
    prediction = bundle["model"].predict(row)[0]
    return {"expected_generation_kwh": round(float(prediction), 2)}


@app.post("/predict/price")
def predict_price(req: PriceRequest):
    bundle = get_model("price")
    row = [[getattr(req, f) for f in bundle["features"]]]
    prediction = bundle["model"].predict(row)[0]
    return {"recommended_price_per_kwh": round(float(prediction), 2)}
