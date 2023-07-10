# EndToEndExample  # InstantiationExample  # NearTextExample  # GenerativeSearchExample
import weaviate
import json

client = weaviate.Client(
    url = "https://some-endpoint.weaviate.network",  # Replace with your endpoint
    auth_client_secret=weaviate.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # Replace w/ your Weaviate instance API key
    additional_headers = {
        "X-HuggingFace-Api-Key": "YOUR-HUGGINGFACE-API-KEY"  # Replace with your inference API key
    }
)

# END EndToEndExample  # END InstantiationExample  # END NearTextExample  # END GenerativeSearchExample

# EndToEndExample
# ===== add schema =====
class_obj = {
    "class": "Question",
    "vectorizer": "text2vec-huggingface",  # If set to "none" you must always provide vectors yourself. Could be any other "text2vec-*" also.
    "moduleConfig": {
        "text2vec-huggingface": {
            "model": "sentence-transformers/all-MiniLM-L6-v2",  # Can be any public or private Hugging Face model.
            "options": {
                "waitForModel": True
            }
        }
    }
}

client.schema.create_class(class_obj)

# ===== import data =====
# Load data
import requests
url = 'https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json'
resp = requests.get(url)
data = json.loads(resp.text)

# Configure a batch process
with client.batch(
    batch_size=100
) as batch:
    # Batch import all Questions
    for i, d in enumerate(data):
        print(f"importing question: {i+1}")

        properties = {
            "answer": d["Answer"],
            "question": d["Question"],
            "category": d["Category"],
        }

        client.batch.add_data_object(
            properties,
            "Question",
        )

# END EndToEndExample    # Test import
schema = client.schema.get()
obj_count = client.query.aggregate("Question").with_meta_count().do()

assert "Question" in [c["class"] for c in schema["classes"]]
assert obj_count["data"]["Aggregate"]["Question"][0]["meta"]["count"] == 10

# NearTextExample
nearText = {"concepts": ["biology"]}

response = (
    client.query
    .get("Question", ["question", "answer", "category"])
    .with_near_text(nearText)
    .with_limit(2)
    .do()
)

print(json.dumps(response, indent=4))
# END NearTextExample

# ===== Test query responses =====
assert len(response["data"]["Get"]["Question"]) == 2
assert response["data"]["Get"]["Question"][0]["answer"] == "DNA"

# NearTextWhereExample
nearText = {"concepts": ["biology"]}

response = (
    client.query
    .get("Question", ["question", "answer", "category"])
    .with_near_text(nearText)
    .with_where({
        "path": ["category"],
        "operator": "Equal",
        "valueText": "ANIMALS"
    })
    .with_limit(2)
    .do()
)

print(json.dumps(response, indent=4))
# END NearTextWhereExample

# ===== Test query responses =====
assert len(response["data"]["Get"]["Question"]) == 2
assert response["data"]["Get"]["Question"][0]["answer"] == "Elephant"

# GenerativeSearchExample
nearText = {"concepts": ["biology"]}

response = (
    client.query
    .get("Question", ["question", "answer", "category"])
    .with_near_text(nearText)
    .with_generate(single_prompt="Explain {answer} as you might to a five-year-old.")
    .with_limit(2)
    .do()
)

print(json.dumps(response, indent=4))
# END GenerativeSearchExample

# ===== Test query responses =====
assert len(response["data"]["Get"]["Question"]) == 2
assert response["data"]["Get"]["Question"][0]["answer"] == "DNA"
assert "singleResult" in response["data"]["Get"]["Question"][0]["_additional"]["generate"].keys()

# Cleanup

client.schema.delete_class("Question")  # Cleanup after


# ===== import with custom vectors =====
# Load data
import requests
# highlight-start
fname = "jeopardy_tiny_with_vectors_all-MiniLM-L6-v2.json"  # This file includes vectors, created using `all-MiniLM-L6-v2`
url = f'https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/{fname}'
resp = requests.get(url)
data = json.loads(resp.text)
# highlight-end

# Configure a batch process
with client.batch(
    batch_size=100
) as batch:
    # Batch import all Questions
    for i, d in enumerate(data):
        print(f"importing question: {i+1}")

        properties = {
            "answer": d["Answer"],
            "question": d["Question"],
            "category": d["Category"],
        }

        # highlight-start
        custom_vector = d["vector"]
        # highlight-end
        client.batch.add_data_object(
            properties,
            "Question",
            # highlight-start
            vector=custom_vector  # Add custom vector
            # highlight-end
        )
# ===== END import with custom vectors =====

schema = client.schema.get()
obj_count = client.query.aggregate("Question").with_meta_count().do()

assert "Question" in [c["class"] for c in schema["classes"]]
assert obj_count["data"]["Aggregate"]["Question"][0]["meta"]["count"] == 10

client.schema.delete_class("Question")  # Cleanup after
