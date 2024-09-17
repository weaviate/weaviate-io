# TODO: Configure as part of the test harness

class_name = "ConfigCollection"

########################
### CLIENT CONNECTION ##
########################

import os
import weaviate

client = weaviate.Client(
    url="http://localhost:8080",
    additional_headers={"X-Cohere-Api-Key": os.getenv("COHERE_API_KEY")},
)

########################
### Inverted Indexes ###
########################

# Delete data from prior runs
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START PropIndex
class_obj = {
    "class": class_name,
    "vectorizer": "text2vec-huggingface",
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
            "indexFilterable": True,
            "indexSearchable": True,
            "moduleConfig": {
                "text2vec-huggingface": {}
            }
        },
        {
            "name": "chunk",
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

client.schema.create_class(class_obj)
# END PropIndex

class_response = client.schema.get()
schema_response = client.schema.get(class_name)

classes = []
for c in class_response["classes"]:
    classes.append(c["class"])
assert class_name in classes, "Class missing"