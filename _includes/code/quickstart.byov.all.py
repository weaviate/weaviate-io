# ===== Weaviate Quickstart tutorial =====
import weaviate
import json

client = weaviate.Client(
    url = "https://some-endpoint.weaviate.network",  # Replace with your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # Replace w/ your Weaviate instance API key
)

# ===== add schema =====
class_obj = {
    "class": "Question",
}

client.schema.create_class(class_obj)

# ===== import data =====
# Load data
import requests
url = 'https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny+vectors.json'
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

        vector = TODO

        client.batch.add_data_object(properties, "Question", vector=vector)

# ===== Test import =====
schema = client.schema.get()
obj_count = client.query.aggregate("Question").with_meta_count().do()

assert "Question" in [c["class"] for c in schema["classes"]]
assert obj_count["data"]["Aggregate"]["Question"][0]["meta"]["count"] == 10

# ===== Query instance =====
import weaviate
import json

client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # replace with your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # replace w/ your Weaviate instance API key
)

nearVector = TODO

result = (
    client.query
    .get("Question", ["question", "answer", "category"])
    .with_near_vector(nearVector)
    .with_limit(2)
    .do()
)

print(json.dumps(result, indent=4))

# ===== Test query results =====
assert len(result["data"]["Get"]["Question"]) == 2
assert result["data"]["Get"]["Question"][0]["answer"] == "DNA"
