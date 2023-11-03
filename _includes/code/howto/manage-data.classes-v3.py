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


# START CreateClass  # START ReadOneClass  # START UpdateClass
class_name = "Article"

# END CreateClass  # END ReadOneClass  # END UpdateClass

# ================================
# ===== CREATE A CLASS =====
# ================================

# Clean slate
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START CreateClass
class_obj = {"class": class_name}

client.schema.create_class(class_obj)  # returns null on success
# END CreateClass

# Test
assert client.schema.get(class_name)["class"] == class_name

# ================================
# ===== READ A CLASS =====
# ================================

# START ReadOneClass
response = client.schema.get(class_name)

print(json.dumps(response, indent=2))
# END ReadOneClass

assert response["class"] == "Article"


# ================================
# ===== READ ALL CLASSES =====
# ================================

# START ReadAllClasses
response = client.schema.get()

print(json.dumps(response, indent=2))
# END ReadAllClasses

assert type(response["classes"]) == list
class_names = [c["class"] for c in response["classes"]]
assert class_name in class_names


# ================================
# ===== UPDATE A CLASS =====
# ================================

# Clean slate
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START UpdateClass
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
# END UpdateClass


# Create an object to make sure it remains mutable
for _ in range(5):
    client.data_object.create({
        "title": "A grand day out."
    }, class_name)
old_class_response = client.schema.get(class_name)

# START UpdateClass

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
# END UpdateClass

changed_class_response = client.schema.get(class_name)

assert old_class_response["vectorIndexConfig"]["distance"] == "cosine"
assert changed_class_response["vectorIndexConfig"]["distance"] == "dot"
