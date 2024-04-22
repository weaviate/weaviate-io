# THIS FILE NEEDS TESTS

# ==============================
# =====  DOWNLOAD DATA =====
# ==============================

# START DownloadData
import requests
import json

# Download the data
resp = requests.get(
    "https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/jeopardy_1k.json"
)

# Load the data so you can see what it is
data = json.loads(resp.text)

# Parse the JSON and preview it
print(type(data), len(data))
print(json.dumps(data[1], indent=2))

# END DownloadData

# ==============================
# =====  CONNECT =====
# ==============================

# START ConnectCode
import weaviate
import os

client = weaviate.Client(
    url="http://localhost:8080/",  # Replace with your endpoint
    additional_headers={
        "X-OpenAI-Api-Key": os.getenv(
            "OPENAI_APIKEY"
        )  # Replace with your OpenAI API key
    },
)

assert client.is_ready()
# END ConnectCode

# ==============================
# =====  AUTOPQ =====
# ==============================


if client.schema.exists("Question"):
    client.schema.delete_class("Question")

# START CollectionWithAutoPQ
class_definition = {
    "class": "Question",
    "vectorizer": "text2vec-openai",
    "vectorIndexConfig": {
        # highlight-start
        "pq": {
            "enabled": True,  # Enable PQ
            "trainingLimit": 50000,  # Set the threshold to begin training
            # highlight-end
        }
    },
}

client.schema.create_class(class_definition)
# END CollectionWithAutoPQ

collection_def = client.schema.get("Question")

assert collection_def["vectorIndexConfig"]["pq"]["enabled"] is True
assert collection_def["vectorIndexConfig"]["pq"]["trainingLimit"] == 50000


# ==============================
# =====  INITIAL SCHEMA =====
# ==============================

if client.schema.exists("Question"):
    client.schema.delete_class("Question")

# START InitialSchema
class_definition = {
    "class": "Question",
    "vectorizer": "text2vec-openai",
    "properties": [
        {"name": "question", "dataType": ["text"]},
        {"name": "answer", "dataType": ["text"]},
        {"name": "round", "dataType": ["text"]},
    ],
}

client.schema.create_class(class_definition)
# END InitialSchema

collection_def = client.schema.get("Question")
assert collection_def["vectorIndexConfig"]["pq"]["enabled"] is False


# ==============================
# =====  LOAD DATA =====
# ==============================

# START LoadData
with client.batch as batch:
    for o in data:
        obj_body = {
            "question": o["Question"],
            "answer": o["Answer"],
            "round": o["Round"],
        }

        batch.add_data_object(data_object=obj_body, class_name="Question")
# END LoadData


# ==============================
# =====  UPDATE SCHEMA =====
# ==============================

# START UpdateSchema
client.schema.update_config(
    "Question",
    {
        "vectorIndexConfig": {
            # highlight-start
            "pq": {
                "enabled": True,  # Enable PQ
                "trainingLimit": 100000,
                "segments": 96
                # highlight-end
            }
        }
    },
)
# END UpdateSchema

collection_def = client.schema.get("Question")
assert collection_def["vectorIndexConfig"]["pq"]["enabled"] is True
assert collection_def["vectorIndexConfig"]["pq"]["trainingLimit"] == 100000


# ==============================
# =====  GET THE SCHEMA =====
# ==============================

# START GetSchema
schema = client.schema.get("Question")
print(json.dumps(schema["vectorIndexConfig"]["pq"], indent=2))

# END GetSchema
