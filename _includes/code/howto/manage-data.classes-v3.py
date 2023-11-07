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


# START CreateCollection  # START ReadOneCollection  # START UpdateCollection
class_name = "Article"

# END CreateCollection  # END ReadOneCollection  # END UpdateCollection

# ================================
# ===== CREATE A COLLECTION =====
# ================================

# Clean slate
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START CreateCollection
class_obj = {"class": class_name}

client.schema.create_class(class_obj)  # returns null on success
# END CreateCollection

# Test
assert client.schema.get(class_name)["class"] == class_name

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
