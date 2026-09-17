"""
isme maine price prediction model train karne ka code likha hai.    
ye model energy price ko predict karega given the input features.

Run from the project root:
    python training/train_price_model.py
"""
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

from training.utils import evaluate, save_model

FEATURES = ["demand_kwh", "generation_kwh", "hour", "day_of_week", "previous_price"]
TARGET = "price"


def main():
    df = pd.read_csv("data/energy_dataset.csv")

    X = df[FEATURES]
    y = df[TARGET]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, shuffle=True)

    model = RandomForestRegressor(n_estimators=200, max_depth=8, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    evaluate(y_test, preds, "Price model")

    save_model(model, FEATURES, "models/price_model.pkl")


if __name__ == "__main__":
    main()
