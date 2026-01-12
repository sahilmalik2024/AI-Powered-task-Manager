import pickle
import os

# Dynamically build the paths
base_dir = os.path.dirname(__file__)
model_path = os.path.join(base_dir, "task_priority_model.pkl")
vectorizer_path = os.path.join(base_dir, "vectorizer.pkl")

# Load model and vectorizer
with open(model_path, "rb") as model_file:
    model = pickle.load(model_file)

with open(vectorizer_path, "rb") as vec_file:
    vectorizer = pickle.load(vec_file)

def predict_priority(title: str, description: str) -> str:
    try:
        input_text = f"{title} {description}"
        features = vectorizer.transform([input_text])
        prediction = model.predict(features)[0]
        return prediction  # e.g. 'High', 'Medium', 'Low'
    except Exception as e:
        raise ValueError(f"Failed to predict priority: {e}")
