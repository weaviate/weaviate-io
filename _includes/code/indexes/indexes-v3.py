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


assert type(response["classes"]) == list
class_names = [c["class"] for c in response["classes"]]
assert class_name in class_names

changed_class_response = client.schema.get(class_name)

assert old_class_response["vectorIndexConfig"]["distance"] == "cosine"
assert changed_class_response["vectorIndexConfig"]["distance"] == "dot"
