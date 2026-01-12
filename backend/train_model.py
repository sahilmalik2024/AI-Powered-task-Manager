from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import pickle

# Sample data for task titles, descriptions, and priorities
tasks_data = [
    {"title": "Fix Bug in Login", "description": "Resolve the issue with the user login flow", "priority": "High"},
    {"title": "Update Documentation", "description": "Update the software documentation for new features", "priority": "Medium"},
    {"title": "Implement New Feature", "description": "Add a new feature for exporting data", "priority": "Low"}
]

# Convert the text data into numerical features using TF-IDF
vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform([task["title"] + " " + task["description"] for task in tasks_data])
y = [task["priority"] for task in tasks_data]

# Train a model (Random Forest Classifier in this case)
model = RandomForestClassifier()
model.fit(X, y)

# Save the model and vectorizer
with open('task_priority_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)
with open('vectorizer.pkl', 'wb') as vectorizer_file:
    pickle.dump(vectorizer, vectorizer_file)

print("Model trained and saved successfully!")
