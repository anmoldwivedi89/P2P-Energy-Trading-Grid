# Energy AI Model Service – Team Integration Guide

## 1. Overview
This AI service predicts three things for the P2P energy marketplace:

- Demand forecasting (kWh)
- Solar generation forecasting (kWh)
- Price recommendation (₹/kWh)

It is implemented in the project and exposes HTTP endpoints for other teams to call.

## 2. How the model is trained
The project uses scikit-learn regression models:

- `RandomForestRegressor` for demand and price
- `GradientBoostingRegressor` for generation

Training happens using `model.fit(X_train, y_train)`.

There are no explicit training epochs because this is not a neural network. The models are tree-based learners, so training is based on internal tree-building logic rather than weight updates per epoch.

## 3. Run training locally
From the project root:

```powershell
cd "D:\amber-savita\P2P-Energy-Trading-Grid-main\energy_ai"
.\venv\Scripts\Activate.ps1
python -m training.train_demand_model
python -m training.train_generation_model
python -m training.train_price_model
```

Generated model files are stored in the `models` folder as `.pkl` files.

## 4. Start the AI service
```powershell
uvicorn api.main:app --reload --port 8000
```

Open Swagger UI here:

```text
http://127.0.0.1:8000/docs
```

## 5. API contract
Base URL:

```text
http://localhost:8000
```

### 5.1 Demand prediction
Endpoint:

```text
POST /predict/demand
```

Example JSON:

```json
{
  "hour": 19,
  "day_of_week": 2,
  "temperature": 30,
  "humidity": 55,
  "previous_demand": 2.1,
  "holiday": 0
}
```

Response:

```json
{
  "expected_demand_kwh": 2.91
}
```

### 5.2 Generation prediction
Endpoint:

```text
POST /predict/generation
```

Example JSON:

```json
{
  "temperature": 32,
  "humidity": 40,
  "cloud_cover": 10,
  "solar_irradiance": 800,
  "hour": 13,
  "month": 5
}
```

Response:

```json
{
  "expected_generation_kwh": 4.73
}
```

### 5.3 Price prediction
Endpoint:

```text
POST /predict/price
```

Example JSON:

```json
{
  "demand_kwh": 3.5,
  "generation_kwh": 1.2,
  "hour": 19,
  "day_of_week": 2,
  "previous_price": 7.0
}
```

Response:

```json
{
  "recommended_price_per_kwh": 8.42
}
```

## 6. Fallback behavior
If the AI service is not available, frontend or backend should not block the marketplace. Instead they should show:

```text
AI recommendation temporarily unavailable
```

## 7. Backend / frontend handoff summary
- AI service runs locally on port 8000
- It exposes 3 prediction endpoints
- The frontend/backend should call these endpoints with the JSON payloads above
- If the service is down, use the fallback message
- The model files live in the `models` folder and are loaded automatically by FastAPI

## 8. Notes
The project uses generated synthetic data by default; for real-world final reporting, the dataset should be replaced with a real energy dataset and retrained.
