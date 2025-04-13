from fastapi import FastAPI, HTTPException
import joblib
import numpy as np
import os

app = FastAPI()

# Model Paths
MODEL_PATHS = {
    "hybrid_1": {
        "knn": r"D:\SecureFlow\backend\models\hybridmodel1\best_knn_model.pkl",
        "logistic": r"D:\SecureFlow\backend\models\hybridmodel1\logistic_regression.pkl",
        "isolation_forest": r"D:\SecureFlow\backend\models\hybridmodel1\isolation_forest.pkl",
    },
    "hybrid_2": {
        "knn": r"D:\SecureFlow\backend\models\hybridmodel2\knn_model.pkl",
        "isolation_forest": r"D:\SecureFlow\backend\models\hybridmodel2\isolation_forest.pkl",
    }
}

# Load models
models = {"hybrid_1": {}, "hybrid_2": {}}

for hybrid, model_dict in MODEL_PATHS.items():
    for model_name, path in model_dict.items():
        if os.path.exists(path):
            models[hybrid][model_name] = joblib.load(path)
        else:
            print(f"Warning: Model file not found: {path}. Skipping...")

@app.get("/")
def home():
    return {"message": "Hybrid Model API is running!"}

@app.post("/predict")
def predict(data: dict):
    try:
        input_features = data.get("features", None)
        
        # Validate input
        if input_features is None or len(input_features) != 13:
            raise HTTPException(status_code=400, detail="Invalid number of features. Expected 13.")
        
        input_features = np.array(input_features).reshape(1, -1)
        
        # Store individual predictions
        predictions = []
        
        for hybrid, model_dict in models.items():
            for model_name, model in model_dict.items():
                try:
                    pred = model.predict(input_features)[0]
                    predictions.append(int(pred))  # Convert to Python int
                except Exception as e:
                    print(f"Error in {model_name} ({hybrid}): {e}")
        
        # Majority voting for final prediction
        final_prediction = 1 if predictions.count(1) > predictions.count(0) else 0
        
        return {
            "final_prediction": final_prediction,
            "individual_predictions": predictions
        }
    
    except Exception as e:
        print(f"Prediction Error: {str(e)}")  # Log error
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
