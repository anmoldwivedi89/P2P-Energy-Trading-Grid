"""
Generates a synthetic energy dataset for demand, solar generation, and price
prediction, with realistic daily/seasonal patterns.

Use this ONLY when you don't have a real dataset yet (see README.md for real
public datasets you can swap in instead). Real-world accuracy claims should
never be made from this synthetic data -- it is for pipeline demonstration.

Run:
    python data/generate_synthetic_data.py
Output:
    data/energy_dataset.csv
"""

import numpy as np
import pandas as pd

np.random.seed(42)

N_DAYS = 180          # ~6 months of hourly data
HOURS_PER_DAY = 24


def build_dataset(n_days: int = N_DAYS) -> pd.DataFrame:
    start = pd.Timestamp("2025-01-01 00:00:00")
    timestamps = pd.date_range(start, periods=n_days * HOURS_PER_DAY, freq="h")

    df = pd.DataFrame({"timestamp": timestamps})
    df["hour"] = df["timestamp"].dt.hour
    df["day_of_week"] = df["timestamp"].dt.dayofweek          # 0=Mon
    df["month"] = df["timestamp"].dt.month
    df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)
    df["holiday"] = np.random.choice([0, 1], size=len(df), p=[0.97, 0.03])

    # --- Weather (synthetic but seasonally consistent) ---
    day_of_year = df["timestamp"].dt.dayofyear
    seasonal_temp = 22 + 8 * np.sin((day_of_year / 365) * 2 * np.pi - np.pi / 2)
    daily_temp_swing = 5 * np.sin((df["hour"] - 6) / 24 * 2 * np.pi)
    df["temperature"] = (seasonal_temp + daily_temp_swing + np.random.normal(0, 1.5, len(df))).round(1)

    df["humidity"] = np.clip(60 - 0.5 * (df["temperature"] - 22) + np.random.normal(0, 8, len(df)), 20, 95).round(1)
    df["cloud_cover"] = np.clip(np.random.beta(2, 3, len(df)) * 100, 0, 100).round(1)  # 0-100 %

    # Solar irradiance: 0 at night, peaks at noon, reduced by cloud cover
    daylight = np.clip(np.sin((df["hour"] - 6) / 12 * np.pi), 0, None)
    seasonal_irr = 1 + 0.3 * np.sin((day_of_year / 365) * 2 * np.pi - np.pi / 2)
    df["solar_irradiance"] = (daylight * seasonal_irr * (1 - df["cloud_cover"] / 130) * 1000).clip(lower=0).round(1)

    # --- Solar generation (kWh) : depends on irradiance, some noise ---
    panel_efficiency = 0.18
    panel_area_kw = 5.0  # 5 kW installed capacity assumption
    df["generation_kwh"] = (
        (df["solar_irradiance"] / 1000) * panel_area_kw * panel_efficiency * 5
        + np.random.normal(0, 0.15, len(df))
    ).clip(lower=0).round(2)

    # --- Demand (kWh): base load + morning/evening peaks + weekday effect + temp effect ---
    morning_peak = 1.8 * np.exp(-((df["hour"] - 8) ** 2) / 4)
    evening_peak = 2.5 * np.exp(-((df["hour"] - 19) ** 2) / 6)
    base_load = 1.0
    weekend_bump = 0.4 * df["is_weekend"]
    temp_effect = 0.05 * np.abs(df["temperature"] - 22)  # heating/cooling load
    holiday_bump = 0.3 * df["holiday"]

    df["demand_kwh"] = (
        base_load + morning_peak + evening_peak + weekend_bump + temp_effect + holiday_bump
        + np.random.normal(0, 0.25, len(df))
    ).clip(lower=0.2).round(2)

    df["previous_demand"] = df["demand_kwh"].shift(1).fillna(df["demand_kwh"].iloc[0])

    # --- Price (Rs./kWh): rises when demand > local supply (generation), base ~ Rs.6 ---
    supply_gap = (df["demand_kwh"] - df["generation_kwh"]).clip(lower=0)
    df["price"] = (
        6.0 + 0.6 * supply_gap - 0.15 * df["generation_kwh"] + np.random.normal(0, 0.3, len(df))
    ).clip(lower=3.0, upper=12.0).round(2)
    df["previous_price"] = df["price"].shift(1).fillna(df["price"].iloc[0])

    return df


if __name__ == "__main__":
    dataset = build_dataset()
    dataset.to_csv("data/energy_dataset.csv", index=False)
    print(f"Generated {len(dataset)} rows -> data/energy_dataset.csv")
    print(dataset.head())
