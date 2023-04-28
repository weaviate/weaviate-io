import weaviate
import json

client = weaviate.Client(
    url = "https://some-endpoint.weaviate.network/",  # Replace with your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="<YOUR-WEAVIATE-API-KEY>"),  # Replace w/ your API Key for the Weaviate instance
    additional_headers = {
        "X-OpenAI-Api-Key": "<THE-KEY>"  # Replace with your inference API key
    }
)

# ===== add schema =====
class_obj = {
    "class": "Question",
    "vectorizer": "text2vec-openai"
}

client.schema.create_class(class_obj)

# ===== import data =====
# Load data
import requests
url = 'https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json'
resp = requests.get(url)
data = json.loads(resp.text)

# Configure a batch process
with client.batch as batch:
    batch.batch_size=100
    # Batch import all Questions
    for i, d in enumerate(data):
        print(f"importing question: {i+1}")

        properties = {
            "answer": d["Answer"],
            "question": d["Question"],
            "category": d["Category"],
        }

        client.batch.add_data_object(properties, "Question")