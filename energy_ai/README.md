# Energy Marketplace — AI Prediction Service

Trains and serves three regression models used by the marketplace:
1. **Demand forecasting** — expected energy demand (kWh)
2. **Solar generation forecasting** — expected generation (kWh)
3. **Price recommendation** — suggested selling price (₹/kWh)

---

## 1. Where to get the dataset

### Option A — Real public datasets (recommended for your final report)
| Purpose | Dataset | Link |
|---|---|---|
| Demand | Individual Household Electric Power Consumption | archive.ics.uci.edu/dataset/235 |
| Demand (alt.) | Smart Meters in London | kaggle.com/datasets/jeanmidev/smart-meters-in-london |
| Generation | Solar Power Generation Data | kaggle.com/datasets/anikannal/solar-power-generation-data |
| Weather features | Open-Meteo Historical Weather API | open-meteo.com/en/docs/historical-weather-api (free, no key) |

Download the CSV(s), rename/re-map their columns to match the feature names used in
`training/train_*.py` (or edit the `FEATURES` list in those scripts to match your columns),
save the result as `data/energy_dataset.csv`, and skip Step 2 below.

**Note on price:** there is no public dataset for P2P energy trading prices (this market
doesn't really exist yet), so the price model here is trained on a demand-vs-supply
relationship instead — this is disclosed clearly, don't present it as real market data.

### Option B — Synthetic dataset (already wired up, works out of the box)
`data/generate_synthetic_data.py` generates a 6-month hourly dataset with realistic
daily/seasonal patterns (morning/evening demand peaks, midday solar generation, weather,
and a demand-supply-driven price). Good for demoing the full pipeline without waiting on
a download. **Do not claim this represents real-world accuracy in your report** — say
clearly it's synthetic, used to validate the pipeline.

---

## 2. How to run (step by step)

```bash
# 1. Unzip and enter the folder
unzip energy_ai.zip
cd energy_ai

# 2. Create a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Generate the synthetic dataset (skip if you added a real CSV to data/energy_dataset.csv)
python data/generate_synthetic_data.py

# 5. Train all three models (creates models/*.pkl)
python -m training.train_demand_model
python -m training.train_generation_model
python -m training.train_price_model

# 6. Start the API server
uvicorn api.main:app --reload --port 8000
```

Open **http://127.0.0.1:8000/docs** for an interactive Swagger UI to try all endpoints,
or call them directly:

```bash
curl -X POST http://127.0.0.1:8000/predict/demand \
  -H "Content-Type: application/json" \
  -d '{"hour":19,"day_of_week":2,"temperature":30,"humidity":55,"previous_demand":2.1,"holiday":0}'

curl -X POST http://127.0.0.1:8000/predict/generation \
  -H "Content-Type: application/json" \
  -d '{"temperature":32,"humidity":40,"cloud_cover":10,"solar_irradiance":800,"hour":13,"month":5}'

curl -X POST http://127.0.0.1:8000/predict/price \
  -H "Content-Type: application/json" \
  -d '{"demand_kwh":3.5,"generation_kwh":1.2,"hour":19,"day_of_week":2,"previous_price":7.0}'
```

---

## 3. Folder structure

```
energy_ai/
├── data/
│   └── generate_synthetic_data.py   # creates data/energy_dataset.csv
├── training/
│   ├── utils.py                     # shared evaluation/save helpers
│   ├── train_demand_model.py
│   ├── train_generation_model.py
│   └── train_price_model.py
├── models/                          # trained .pkl files land here
├── api/
│   └── main.py                      # FastAPI service (/predict/demand, /generation, /price)
├── requirements.txt
└── README.md
```

## 4. Evaluation (on the bundled synthetic dataset)

| Model | MAE | RMSE | R² |
|---|---|---|---|
| Demand | 0.22 kWh | 0.29 kWh | 0.89 |
| Generation | 0.10 kWh | 0.13 kWh | 0.99 |
| Price | 0.24 ₹/kWh | 0.29 ₹/kWh | 0.90 |

These numbers are from the synthetic dataset — re-run training after swapping in a real
dataset and report the new numbers in your project report.

## 5. Connecting to the Node.js backend

The Node/Express backend should call this service over HTTP (see the SRS's External
Interface Requirements, Section 4.3):
```
POST http://localhost:8000/predict/demand
POST http://localhost:8000/predict/generation
POST http://localhost:8000/predict/price
```
If the AI service is down, the backend should catch the error and show
"AI recommendation temporarily unavailable" rather than blocking the marketplace (FR-12).
