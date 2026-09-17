""" isme maine utility functions likhe hai jo ki 
model evaluation aur model saving ke liye use honge."""

import joblib
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


def evaluate(y_true, y_pred, label: str):
    mae = mean_absolute_error(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    r2 = r2_score(y_true, y_pred)
    print(f"\n[{label}] Evaluation on test set")
    print(f"  MAE  : {mae:.3f}")
    print(f"  RMSE : {rmse:.3f}")
    print(f"  R^2  : {r2:.3f}")
    return {"mae": mae, "rmse": rmse, "r2": r2}


def save_model(model, features: list, path: str):
    joblib.dump({"model": model, "features": features}, path)
    print(f"Saved model -> {path}")
