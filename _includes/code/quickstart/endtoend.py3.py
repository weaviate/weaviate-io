# DockerInstantiationExample
import weaviate
import json

client = weaviate.Client(
    url = "http://localhost:8080",  # Replace with your Weaviate endpoint
    additional_headers = {
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace with your inference API key
    }
)
# END DockerInstantiationExample

# EndToEndExample  # InstantiationExample  # NearTextExample
import weaviate
import json
# END EndToEndExample  # END InstantiationExample  # END NearTextExample
# ===== import data =====  # EndToEndExample
import requests
import json
# END EndToEndExample  # Test import
# EndToEndExample  # InstantiationExample  # NearTextExample

client = weaviate.Client(
    url = "https://WEAVIATE_INSTANCE_URL",  # Replace with your Weaviate endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # Replace with your Weaviate instance API key
    additional_headers = {
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace with your inference API key
    }
)

# END EndToEndExample  # END InstantiationExample  # END NearTextExample

# EndToEndExample
# ===== define collection =====
class_obj = {
    "class": "Question",
    "vectorizer": "text2vec-openai",  # If set to "none" you must always provide vectors yourself. Could be any other "text2vec-*" also.
    "moduleConfig": {
        "text2vec-openai": {},
        "generative-openai": {}  # Ensure the `generative-openai` module is used for generative queries
    }
}

client.schema.create_class(class_obj)

# ===== import data =====
resp = requests.get('https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json')
data = json.loads(resp.text)  # Load data

client.batch.configure(batch_size=100)  # Configure batch
with client.batch as batch:  # Initialize a batch process
    for i, d in enumerate(data):  # Batch import data
        print(f"importing question: {i+1}")
        properties = {
            "answer": d["Answer"],
            "question": d["Question"],
            "category": d["Category"],
        }
        batch.add_data_object(
            data_object=properties,
            class_name="Question"
        )

# END EndToEndExample    # Test import
schema = client.schema.get()
obj_count = client.query.aggregate("Question").with_meta_count().do()

assert "Question" in [c["class"] for c in schema["classes"]]
assert obj_count["data"]["Aggregate"]["Question"][0]["meta"]["count"] == 10

# NearTextExample
response = (
    client.query
    .get("Question", ["question", "answer", "category"])
    # highlight-start
    .with_near_text({"concepts": ["biology"]})
    # highlight-end
    .with_limit(2)
    .do()
)

print(json.dumps(response, indent=4))
# END NearTextExample

# ===== Test query responses =====
assert len(response["data"]["Get"]["Question"]) == 2
assert response["data"]["Get"]["Question"][0]["answer"] == "DNA"

# NearTextWhereExample
response = (
    client.query
    .get("Question", ["question", "answer", "category"])
    .with_near_text({"concepts": ["biology"]})
    # highlight-start
    .with_where({
        "path": ["category"],
        "operator": "Equal",
        "valueText": "ANIMALS"
    })
    # highlight-end
    .with_limit(2)
    .do()
)

print(json.dumps(response, indent=4))
# END NearTextWhereExample

# ===== Test query responses =====
assert len(response["data"]["Get"]["Question"]) == 2

# GenerativeSearchExample
response = (
    client.query
    .get("Question", ["question", "answer", "category"])
    .with_near_text({"concepts": ["biology"]})
    # highlight-start
    .with_generate(single_prompt="Explain {answer} as you might to a five-year-old.")
    # highlight-end
    .with_limit(2)
    .do()
)

print(json.dumps(response, indent=4))
# END GenerativeSearchExample

# ===== Test query responses =====
assert len(response["data"]["Get"]["Question"]) == 2
assert "singleResult" in response["data"]["Get"]["Question"][0]["_additional"]["generate"].keys()

# GenerativeSearchGroupedTaskExample
response = (
    client.query
    .get("Question", ["question", "answer", "category"])
    .with_near_text({"concepts": ["biology"]})
    # highlight-start
    .with_generate(grouped_task="Write a tweet with emojis about these facts.")
    # highlight-end
    .with_limit(2)
    .do()
)

print(response["data"]["Get"]["Question"][0]["_additional"]["generate"]["groupedResult"])
# END GenerativeSearchGroupedTaskExample

# ===== Test query responses =====
assert len(response["data"]["Get"]["Question"]) == 2
assert "groupedResult" in response["data"]["Get"]["Question"][0]["_additional"]["generate"].keys()


# Cleanup

client.schema.delete_class("Question")  # Cleanup after


# ===== import with custom vectors =====
import requests

# highlight-start
fname = "jeopardy_tiny_with_vectors_all-OpenAI-ada-002.json"  # This file includes pre-generated vectors
# highlight-end
url = f"https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/{fname}"
resp = requests.get(url)
data = json.loads(resp.text)  # Load data

client.batch.configure(batch_size=100)  # Configure batch
with client.batch as batch:  # Configure a batch process
    for i, d in enumerate(data):  # Batch import all Questions
        print(f"importing question: {i+1}")
        properties = {
            "answer": d["Answer"],
            "question": d["Question"],
            "category": d["Category"],
        }
        batch.add_data_object(
            data_object=properties,
            class_name="Question",
            # highlight-start
            vector=d["vector"]  # Add custom vector
            # highlight-end
        )
# ===== END import with custom vectors =====

schema = client.schema.get()
obj_count = client.query.aggregate("Question").with_meta_count().do()

assert "Question" in [c["class"] for c in schema["classes"]]
assert obj_count["data"]["Aggregate"]["Question"][0]["meta"]["count"] == 10

client.schema.delete_class("Question")  # Cleanup after
