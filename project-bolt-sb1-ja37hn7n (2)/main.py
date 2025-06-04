from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

# Load the trained model and vectorizer
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

class EmailInput(BaseModel):
    text: str

@app.post("/predict")
def predict(input: EmailInput):
    X_vec = vectorizer.transform([input.text])
    prediction = model.predict(X_vec)[0]
    prob = model.predict_proba(X_vec)[0][1]
    return {"spam": bool(prediction), "spam_probability": prob} 