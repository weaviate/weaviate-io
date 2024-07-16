import os
import weaviate

# Instantiate the client with the OpenAI API key
client = weaviate.Client(
    "http://localhost:8080",
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]
    }
)

# ===============================================
# ===== CREATE A COLLECTION WITH PROPERTIES =====
# ===============================================

# Clean start
if client.schema.exists("Inventory"):
    client.schema.delete_class("Inventory")

# START RangeIndex
class_obj = {
    "class": "Inventory",
    "properties": [
        {
            "name": "itemName",
            "dataType": ["text"],
        },
        {
            "name": "itemDescription",
            "dataType": ["text"],
        },
        {
            "name": "itemCount",
            "dataType": ["int"],
            "indexRangeFilters": True,
        },
    ],
        "invertedIndexConfig": {
        "bm25": {
            "b": 0.7,
            "k1": 1.25
        },
        "indexTimestamps": True,
        "indexNullState": True,
        "indexPropertyLength": True
    }
}

client.schema.create_class(class_obj)  # returns null on success
# END RangeIndex

# Test
schema = client.schema.get("Inventory")
assert schema["properties"][2]['indexRangeFilters'] == True
