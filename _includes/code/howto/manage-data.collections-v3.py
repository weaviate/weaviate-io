# How-to: Manage-Data -> Classes
import os
import json

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

# Instantiate the client with the OpenAI API key
client = weaviate.Client(
    "http://localhost:8080",
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]
    }
)


# START BasicCreateCollection  # START ReadOneCollection  # START UpdateCollection
class_name = "Article"

# END BasicCreateCollection  # END ReadOneCollection  # END UpdateCollection

# ================================
# ===== CREATE A COLLECTION =====
# ================================

# Clean slate
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START BasicCreateCollection
class_obj = {"class": class_name}

client.schema.create_class(class_obj)  # returns null on success
# END BasicCreateCollection

# Test
assert client.schema.get(class_name)["class"] == class_name

# ===============================================
# ===== CREATE A COLLECTION WITH PROPERTIES =====
# ===============================================

# Clean slate
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START CreateCollectionWithProperties
class_obj = {
    "class": "Article",
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
        },
        {
            "name": "body",
            "dataType": ["text"],
        },
    ],
}

client.schema.create_class(class_obj)  # returns null on success
# END CreateCollectionWithProperties


# ===============================================
# ===== CREATE A COLLECTION WITH VECTORIZER =====
# ===============================================

# Clean slate
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START Vectorizer
class_obj = {
    "class": "Article",
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
        },
    ],
    # highlight-start
    "vectorizer": "text2vec-openai"  # this could be any vectorizer
    # highlight-end
}

client.schema.create_class(class_obj)
# END Vectorizer

# Test
result = client.schema.get(class_name)
assert result["vectorizer"] == "text2vec-openai"
assert len(result["properties"]) == 1  # no "body" from the previous example

# Delete the class to recreate it
client.schema.delete_class(class_name)


# ===============================================
# ===== CREATE A COLLECTION WITH NAMED VECTORS =====
# ===============================================

# START BasicNamedVectors
# Unfortunately, named vectors are not suppored in the v3 API / Python client.
# Please upgrade to the v4 API / Python client to use named vectors.
# END BasicNamedVectors

# ===============================================
# ===== SetVectorIndex =====
# ===============================================

# START SetVectorIndex
class_obj = {
    'class': 'Article',
    'properties': [
        {
            'name': 'title',
            'dataType': ['text'],
        },
    ],
    'vectorizer': 'text2vec-openai',  # this could be any vectorizer
    # highlight-start
    "vectorIndexType": "flat",
    "vectorIndexConfig": {
        "bq": {
            "enabled": True,  # Enable BQ compression. Default: False
            "rescoreLimit": 200,  # The minimum number of candidates to fetch before rescoring. Default: -1 (No limit)
            "cache": True,  # Enable use of vector cache. Default: False
        },
        "vectorCacheMaxObjects": 100000,  # Cache size if `cache` enabled. Default: 1000000000000
    }
    # highlight-end
}

client.schema.create_class(class_obj)
# END SetVectorIndex

# Test
result = client.schema.get(class_name)
assert result['vectorizer'] == 'text2vec-openai'
assert result['vectorIndexType'] == 'flat'
assert len(result['properties']) == 1  # no 'body' from the previous example

# Delete the class to recreate it
client.schema.delete_class(class_name)


# ===========================
# ===== MODULE SETTINGS =====
# ===========================

# START ModuleSettings
class_obj = {
    "class": "Article",
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
        },
    ],
    "vectorizer": "text2vec-cohere",  # this could be any vectorizer
    # highlight-start
    "moduleConfig": {
        "text2vec-cohere": {  # this must match the vectorizer used
            "vectorizeClassName": True,
            "model": "embed-multilingual-v2.0",
        }
    }
    # highlight-end
}

client.schema.create_class(class_obj)
# END ModuleSettings

# Test
result = client.schema.get(class_name)
assert result["vectorizer"] == "text2vec-cohere"
assert result["moduleConfig"]["text2vec-cohere"]["model"] == "embed-multilingual-v2.0"

# Delete the class to recreate it
client.schema.delete_class(class_name)

# ====================================
# ===== MODULE SETTINGS PROPERTY =====
# ====================================

# START PropModuleSettings
class_obj = {
    "class": "Article",
    "vectorizer": "text2vec-huggingface",  # this could be any vectorizer
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
            # highlight-start
            "moduleConfig": {
                "text2vec-huggingface": {  # this must match the vectorizer used
                    "vectorizePropertyName": True,
                    "tokenization": "lowercase"
                }
            }
            # highlight-end
        },
        {
            "name": "body",
            "dataType": ["text"],
            # highlight-start
            "moduleConfig": {
                "text2vec-huggingface": {  # this must match the vectorizer used
                    "skip": True,  # Don't vectorize body
                    "tokenization": "whitespace"
                }
            }
            # highlight-end
        },
    ],
}

client.schema.create_class(class_obj)
# END PropModuleSettings

# Test
result = client.schema.get(class_name)
assert result["vectorizer"] == "text2vec-huggingface"
assert result["properties"][0]["moduleConfig"]["text2vec-huggingface"]["vectorizePropertyName"] is False

# Delete the class to recreate it
client.schema.delete_class(class_name)

# ===========================
# ===== DISTANCE METRIC =====
# ===========================

# START DistanceMetric
class_obj = {
    "class": "Article",
    # highlight-start
    "vectorIndexConfig": {
        "distance": "cosine",
    },
    # highlight-end
}

client.schema.create_class(class_obj)
# END DistanceMetric

# Test
result = client.schema.get(class_name)
assert result["vectorIndexConfig"]["distance"] == "cosine"

# Delete the class to recreate it
client.schema.delete_class(class_name)

# ===============================================
# ===== CREATE A COLLECTION WITH VECTORIZER =====
# ===============================================

# Clean slate
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START SetGenerative
class_obj = {
    "class": "Article",
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
        },
    ],
    "vectorizer": "text2vec-openai",  # set your vectorizer module
    # highlight-start
    "moduleConfig": {
        "generative-openai": {}  # set your generative module
    }
    # highlight-end
}

client.schema.create_class(class_obj)
# END SetGenerative

# Test
result = client.schema.get(class_name)
assert "generative-openai" in result["moduleConfig"].keys()

# Delete the class to recreate it
client.schema.delete_class(class_name)


# =======================
# ===== REPLICATION =====
# =======================

# START ReplicationSettings
class_obj = {
    "class": "Article",
    # highlight-start
    "replicationConfig": {
        "factor": 3,
    },
    # highlight-end
}

client.schema.create_class(class_obj)
# END ReplicationSettings

# Test
result = client.schema.get(class_name)
assert result["replicationConfig"]["factor"] == 3

# Delete the class to recreate it
client.schema.delete_class(class_name)

# ====================
# ===== SHARDING =====
# ====================

# START ShardingSettings
class_obj = {
    "class": "Article",
    # highlight-start
    "shardingConfig": {
        "virtualPerPhysical": 128,
        "desiredCount": 1,
        "actual_actualCountcount": 1,
        "desiredVirtualCount": 128,
        "actualVirtualCount": 128,
    },
    # highlight-end
}

client.schema.create_class(class_obj)
# END ShardingSettings

# Test
result = client.schema.get(class_name)
assert result["shardingConfig"]["virtualPerPhysical"] == 128
assert result["shardingConfig"]["desiredCount"] == 1
assert result["shardingConfig"]["actualCount"] == 1
assert result["shardingConfig"]["desiredVirtualCount"] == 128
assert result["shardingConfig"]["actual_virtual_count"] == 128

# Delete the class to recreate it
client.schema.delete_class(class_name)

# =========================
# ===== MULTI-TENANCY =====
# =========================

# START Multi-tenancy
class_obj = {
    "class": "Article",
    # highlight-start
    "multiTenancyConfig": {"enabled": True}
    # highlight-end
}

client.schema.create_class(class_obj)  # returns null on success
# END Multi-tenancy

# Delete the class to recreate it
client.schema.delete_class(class_name)

# ==========================
# ===== ADD A PROPERTY =====
# ==========================

# START AddProp
add_prop = {
    "name": "body",
    "dataType": ["text"],
}

client.schema.property.create("Article", add_prop)
# END AddProp

# Test
result = client.schema.get(class_name)
assert result["properties"][-1]["name"] == "body"


# START ModifyParam
class_obj = {
    "invertedIndexConfig": {
      "stopwords": {
        "preset": "en",
        "removals": ["a", "the"]
      },
    },
}

client.schema.update_config("Article", class_obj)
# END ModifyParam

# Test
result = client.schema.get(class_name)
assert result["invertedIndexConfig"]["stopwords"]["removals"] == ["a", "the"]

# ==============================
# ===== MODIFY A PARAMETER =====
# ==============================

# START ModifyParam
class_obj = {
    "invertedIndexConfig": {
      "stopwords": {
        "preset": "en",
        "removals": ["a", "the"]
      },
    },
}

client.schema.update_config("Article", class_obj)
# END ModifyParam

# Test
result = client.schema.get(class_name)
assert result["invertedIndexConfig"]["stopwords"]["removals"] == ["a", "the"]

# ================================
# ===== READ A COLLECTION =====
# ================================

# START ReadOneCollection
response = client.schema.get(class_name)

print(json.dumps(response, indent=2))
# END ReadOneCollection

assert response["class"] == "Article"

# ================================
# ===== READ ALL COLLECTIONS =====
# ================================

# START ReadAllCollections
response = client.schema.get()

print(json.dumps(response, indent=2))
# END ReadAllCollections

assert type(response["classes"]) == list
class_names = [c["class"] for c in response["classes"]]
assert class_name in class_names


# ================================
# ===== UPDATE A COLLECTION =====
# ================================

# Clean slate
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START UpdateCollection
# Define and create a class
original_class_obj = {
    "class": class_name,
    "invertedIndexConfig": {
        "bm25": {
            "k1": 1.2  # Note the k1 parameter
        }
    }
}

client.schema.create_class(original_class_obj)
# END UpdateCollection


# Create an object to make sure it remains mutable
for _ in range(5):
    client.data_object.create({
        "title": "A grand day out."
    }, class_name)
old_class_response = client.schema.get(class_name)

# START UpdateCollection

# Update the class definition
changed_class_obj = {
    "class": class_name,
    "invertedIndexConfig": {
        "bm25": {
            "k1": 1.5  # Change the k1 parameter from 1.2
        }
    }
}

client.schema.update_config("Article", changed_class_obj)
# END UpdateCollection

changed_class_response = client.schema.get(class_name)

assert old_class_response["vectorIndexConfig"]["distance"] == "cosine"
assert changed_class_response["vectorIndexConfig"]["distance"] == "dot"
