# Train a classifier
classifier = LogisticRegression()
classifier.fit(X_train_vec, y_train)

import joblib
joblib.dump(classifier, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

import pandas as pd
data = pd.read_csv("/content/emails.csv")
data.head()



!pip install transformers
from transformers import BertTokenizer, BertForSequenceClassification
import torch

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)

# Tokenization example for one text entry
inputs = tokenizer("Sample text", return_tensors="pt", max_length=512, truncation=True, padding="max_length")

from sklearn.model_selection import train_test_split
train_data, test_data = train_test_split(data, test_size=0.2, random_state=42)


!pip install spacy
!python -m spacy download en_core_web_sm
import spacy
nlp = spacy.load("en_core_web_sm")


def extract_entities(text):
    doc = nlp(text)
    return [(ent.text, ent.label_) for ent in doc.ents]


data['entities'] = data['text'].apply(extract_entities)


!pip install lime
from lime.lime_text import LimeTextExplainer


import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from lime.lime_text import LimeTextExplainer

# Load the dataset
dataset_path = "/content/emails.csv"
data = pd.read_csv(dataset_path)

# Assuming 'email' is the text column and 'label' is the target column
X = data['text']
y = data['spam']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Vectorize the text data
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Train a classifier
classifier = LogisticRegression()
classifier.fit(X_train_vec, y_train)

# Set up the LIME Text Explainer
explainer = LimeTextExplainer(class_names=['Not Spam', 'Spam'])

# Define a prediction function that works with the explainer
def predict_proba(texts):
    return classifier.predict_proba(vectorizer.transform(texts))

# Explain a prediction for a sample email
exp = explainer.explain_instance("Sample email text", predict_proba, num_features=6)
exp.show_in_notebook(text=True)


from sklearn.metrics import accuracy_score, classification_report

# Make predictions on the test set
y_pred = classifier.predict(X_test_vec)

# Evaluate performance
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred, target_names=['Not Spam', 'Spam'])

print("Accuracy:", accuracy)
print("Classification Report:\n", report)



from lime.lime_text import LimeTextExplainer
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load the dataset
dataset_path = "/content/emails.csv"
data = pd.read_csv(dataset_path)

# Assuming 'email' is the text column and 'label' is the target column
X = data['text']
y = data['spam']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Vectorize the text data
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Train a classifier
classifier = LogisticRegression()
classifier.fit(X_train_vec, y_train)

# Set up the LIME Text Explainer
explainer = LimeTextExplainer(class_names=['Not Spam', 'Spam'])


sample_email = """Subject: Exclusive Deal Just for You!

Hello,

We noticed you’ve been interested in our latest offers. For a limited time only, you can get 50% off all products! Just click the link below to claim your discount.

Click here to activate: www.fakeoffer.com/discount

Don’t miss out! This deal expires in 48 hours.

Best regards,
The Offers Team
"""
# Define a prediction function that works with the explainer
# This function now handles the necessary transformations
def predict_proba(texts):
    # Transform the input texts using the same vectorizer used for training
    transformed_texts = vectorizer.transform(texts)
    # Now, predict probabilities using the classifier
    return classifier.predict_proba(transformed_texts)

# Convert sample email to a 2D array format is no longer needed
# since predict_proba now handles the transformation
# sample_email_2d = [[sample_email]]  # This is not needed now

# Run the LIME explainer
exp = explainer.explain_instance(sample_email, predict_proba, num_features=6)  # Pass the email string directly
exp.show_in_notebook(text=True)

# Extract important features and their contributions
feature_importance = exp.as_list()

# Print a detailed explanation of why the email is classified as spam
print("\nDetailed Explanation:")
for word, importance in feature_importance:
    print(f"Word: '{word}' | Contribution to Spam: {importance:.4f}")

# Highlight the threshold or dominant indicators for spam
print("\nKey Indicators:")
spam_indicators = [word for word, importance in feature_importance if importance > 0]
not_spam_indicators = [word for word, importance in feature_importance if importance < 0]

print(f"Words pushing towards 'Spam': {', '.join(spam_indicators)}")
print(f"Words pushing towards 'Not Spam': {', '.join(not_spam_indicators)}")


**verison 1.1**

**Sentiment Analysis Integration**

!pip install textblob
from textblob import TextBlob


def analyze_sentiment(email_text):
    blob = TextBlob(email_text)
    polarity = blob.sentiment.polarity
    if polarity > 0:
        return "Positive"
    elif polarity < 0:
        return "Negative"
    else:
        return "Neutral"

def enhanced_prediction(email_texts):
    results = []
    for email in email_texts:
        spam_prob = classifier.predict_proba(vectorizer.transform([email]))[:, 1][0]
        sentiment = analyze_sentiment(email)
        results.append({"Spam Probability": spam_prob, "Sentiment": sentiment})
    return results


sample_email = """Subject: Exclusive Deal Just for You!

Hello,

We noticed you’ve been interested in our latest offers. For a limited time only, you can get 50% off all products! Just click the link below to claim your discount.

Click here to activate: www.fakeoffer.com/discount

Don’t miss out! This deal expires in 48 hours.

Best regards,
The Offers Team
"""

# Enhanced Prediction
prediction_with_sentiment = enhanced_prediction([sample_email])
print(prediction_with_sentiment)

import matplotlib.pyplot as plt

def visualize_results(predictions):
    labels = ['Email ' + str(i+1) for i in range(len(predictions))]
    spam_probs = [pred['Spam Probability'] for pred in predictions]
    sentiments = [pred['Sentiment'] for pred in predictions]

    fig, ax = plt.subplots()
    ax.bar(labels, spam_probs, color='orange')
    for i, sentiment in enumerate(sentiments):
        ax.text(i, spam_probs[i] + 0.02, sentiment, ha='center', fontsize=10)
    plt.ylabel("Spam Probability")
    plt.title("Spam Detection with Sentiment Analysis")
    plt.show()

# Visualize for sample email
visualize_results(prediction_with_sentiment)


from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
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


from sklearn.linear_model import SGDClassifier

clf = SGDClassifier()
clf.partial_fit(X_initial, y_initial, classes=[0, 1])
# Later, update with new data
clf.partial_fit(X_new, y_new)
