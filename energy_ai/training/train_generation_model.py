"""
isme maine solar generation forcating model train karne ka code likha hai.
ye model energy generation ko predict karega given the input features.

Run from the project root:
    python training/train_generation_model.py
"""
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split

from training.utils import evaluate, save_model

FEATURES = ["temperature", "humidity", "cloud_cover", "solar_irradiance", "hour", "month"]
TARGET = "generation_kwh"


def main():
    df = pd.read_csv("data/energy_dataset.csv")

    X = df[FEATURES]
    y = df[TARGET]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, shuffle=True)

    model = GradientBoostingRegressor(n_estimators=200, max_depth=4, learning_rate=0.05, random_state=42)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    evaluate(y_test, preds, "Generation model")

    save_model(model, FEATURES, "models/generation_model.pkl")


if __name__ == "__main__":
    main()
