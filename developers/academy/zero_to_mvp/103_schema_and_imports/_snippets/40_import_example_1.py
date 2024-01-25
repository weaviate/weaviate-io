# Full code snippet
# ===== Instantiate Weaviate client w/ auth config =====
import weaviate
from weaviate.util import generate_uuid5
import requests
import json

client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # Replace w/ your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # Replace w/ your Weaviate instance API key. Delete if authentication is disabled.
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",
    },
)

# Define the class
class_obj = {
    # Class & property definitions
    "class": "JeopardyQuestion",
    "properties": [
        {
            "name": "round",
            "dataType": ["text"],
            # Property-level module configuration for `round`
            "moduleConfig": {
                "text2vec-openai": {
                    "skip": True,
                }
            },
            # End of property-level module configuration
        },
        {
            "name": "value",
            "dataType": ["int"],
        },
        {
            "name": "question",
            "dataType": ["text"],
        },
        {
            "name": "answer",
            "dataType": ["text"],
        },
    ],

    # Specify a vectorizer
    "vectorizer": "text2vec-openai",

    # Module settings
    "moduleConfig": {
        "text2vec-openai": {
            "vectorizeClassName": False,
            "model": "ada",
            "modelVersion": "002",
            "type": "text"
        }
    },
}
# End class definition

client.schema.create_class(class_obj)
# Finished creating the class

url = 'https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/jeopardy_100.json'
resp = requests.get(url)
data = json.loads(resp.text)

# Context manager for batch import
with client.batch(
    batch_size=200,  # Specify batch size
    num_workers=2,   # Parallelize the process
) as batch:
    # Build data objects & add to batch
    for i, row in enumerate(data):
        question_object = {
            "question": row["Question"],
            "answer": row["Answer"],
            "value": row["Value"],
            "round": row["Round"],
        }
        batch.add_data_object(
            question_object,
            class_name="JeopardyQuestion",
            uuid=generate_uuid5(question_object)
        )

# END Full code snippet

# Test data ingestion
def test_class_addition(client_in):
    class_schema = client_in.schema.get("JeopardyQuestion")
    assert class_schema["class"] == "JeopardyQuestion"
    assert class_schema["vectorizer"] == "text2vec-openai"
    assert len(class_schema["properties"]) == 4
test_class_addition(client)
assert client.query.aggregate("JeopardyQuestion").with_meta_count().do()["data"]["Aggregate"]["JeopardyQuestion"][0]["meta"]["count"] == 100
# Cleanup
client.schema.delete_class("JeopardyQuestion")
classes = [c["class"] for c in client.schema.get()["classes"]]
assert "JeopardyQuestion" not in classes
# END Test data ingestion

# ============================================================
# ========== SMALLER CODE SNIPPETS ===========================
# ============================================================

client.schema.create_class(class_obj)

# Retrieve "JeopardyQuestion" class schema
client.schema.get("JeopardyQuestion")
# END Retrieve "JeopardyQuestion" class schema

'''
// RETRIEVED CLASS SCHEMA
{
  "class": "JeopardyQuestion",
  "invertedIndexConfig": {
    "bm25": {
      "b": 0.75,
      "k1": 1.2
    },
    "cleanupIntervalSeconds": 60,
    "stopwords": {
      "additions": null,
      "preset": "en",
      "removals": null
    }
  },
  "moduleConfig": {
    "text2vec-openai": {
      "model": "ada",
      "modelVersion": "002",
      "type": "text",
      "vectorizeClassName": false
    }
  },
  "properties": [
    {
      "dataType": [
        "text"
      ],
      "indexFilterable": true,
      "indexSearchable": true,
      "moduleConfig": {
        "text2vec-openai": {
          "skip": true,
          "vectorizePropertyName": false
        }
      },
      "name": "round",
      "tokenization": "word"
    },
    {
      "dataType": [
        "int"
      ],
      "indexFilterable": true,
      "indexSearchable": false,
      "moduleConfig": {
        "text2vec-openai": {
          "skip": false,
          "vectorizePropertyName": false
        }
      },
      "name": "value"
    },
    {
      "dataType": [
        "text"
      ],
      "indexFilterable": true,
      "indexSearchable": true,
      "moduleConfig": {
        "text2vec-openai": {
          "skip": false,
          "vectorizePropertyName": false
        }
      },
      "name": "question",
      "tokenization": "word"
    },
    {
      "dataType": [
        "text"
      ],
      "indexFilterable": true,
      "indexSearchable": true,
      "moduleConfig": {
        "text2vec-openai": {
          "skip": false,
          "vectorizePropertyName": false
        }
      },
      "name": "answer",
      "tokenization": "word"
    }
  ],
  "replicationConfig": {
    "factor": 1
  },
  "shardingConfig": {
    "virtualPerPhysical": 128,
    "desiredCount": 1,
    "actualCount": 1,
    "desiredVirtualCount": 128,
    "actualVirtualCount": 128,
    "key": "_id",
    "strategy": "hash",
    "function": "murmur3"
  },
  "vectorIndexConfig": {
    "skip": false,
    "cleanupIntervalSeconds": 300,
    "maxConnections": 64,
    "efConstruction": 128,
    "ef": -1,
    "dynamicEfMin": 100,
    "dynamicEfMax": 500,
    "dynamicEfFactor": 8,
    "vectorCacheMaxObjects": 1000000000000,
    "flatSearchCutoff": 40000,
    "distance": "cosine",
    "pq": {
      "enabled": false,
      "bitCompression": false,
      "segments": 0,
      "centroids": 256,
      "encoder": {
        "type": "kmeans",
        "distribution": "log-normal"
      }
    }
  },
  "vectorIndexType": "hnsw",
  "vectorizer": "text2vec-openai"
}
// END RETRIEVED CLASS SCHEMA
'''

# Load data
import requests
import json
url = 'https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/jeopardy_100.json'
resp = requests.get(url)
data = json.loads(resp.text)
# Finished loading data

# Import data - simple version
with client.batch(
    batch_size=200,  # Specify batch size
    num_workers=2,   # Parallelize the process
) as batch:
    # Build data objects & add to batch
    for i, row in enumerate(data):
        question_object = {
            "question": row["Question"],
            "answer": row["Answer"],
            "value": row["Value"],
            "round": row["Round"],
        }
        batch.add_data_object(
            question_object,
            class_name="JeopardyQuestion"
        )
# END Import data - simple version

# Check object count
assert client.query.aggregate("JeopardyQuestion").with_meta_count().do()["data"]["Aggregate"]["JeopardyQuestion"][0]["meta"]["count"] == 100
# END Check object count

# Import data again - to demonstrate what happens if duplicated
with client.batch(
    batch_size=200,  # Specify batch size
    num_workers=2,   # Parallelize the process
) as batch:
    for i, row in enumerate(data):
        question_object = {
            "question": row["Question"],
            "answer": row["Answer"],
            "value": row["Value"],
            "round": row["Round"],
        }
        batch.add_data_object(
            question_object,
            class_name="JeopardyQuestion"
        )
# END Import data again - to demonstrate what happens if duplicated
assert client.query.aggregate("JeopardyQuestion").with_meta_count().do()["data"]["Aggregate"]["JeopardyQuestion"][0]["meta"]["count"] == 200

# Cleanup
client.schema.delete_class("JeopardyQuestion")
classes = [c["class"] for c in client.schema.get()["classes"]]
assert "JeopardyQuestion" not in classes

client.schema.create_class(class_obj)
test_class_addition(client)


# Import data with deterministic UUIDs
from weaviate.util import generate_uuid5

with client.batch(
    batch_size=200,  # Specify batch size
    num_workers=2,   # Parallelize the process
) as batch:
    for i, row in enumerate(data):
        question_object = {
            "question": row["Question"],
            "answer": row["Answer"],
            "value": row["Value"],
            "round": row["Round"],
        }
        batch.add_data_object(
            question_object,
            class_name="JeopardyQuestion",
            uuid=generate_uuid5(question_object)
        )
# END Import data with deterministic UUIDs

# Test
assert client.query.aggregate("JeopardyQuestion").with_meta_count().do()["data"]["Aggregate"]["JeopardyQuestion"][0]["meta"]["count"] == 100
with client.batch(
    batch_size=200,  # Specify batch size
    num_workers=2,   # Parallelize the process
) as batch:
    for i, row in enumerate(data):
        question_object = {
            "question": row["Question"],
            "answer": row["Answer"],
            "value": row["Value"],
            "round": row["Round"],
        }
        batch.add_data_object(
            question_object,
            class_name="JeopardyQuestion",
            uuid=generate_uuid5(question_object)
        )
assert client.query.aggregate("JeopardyQuestion").with_meta_count().do()["data"]["Aggregate"]["JeopardyQuestion"][0]["meta"]["count"] == 100

client.schema.delete_class("JeopardyQuestion")
classes = [c["class"] for c in client.schema.get()["classes"]]
assert "JeopardyQuestion" not in classes
