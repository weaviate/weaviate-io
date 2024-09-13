# TODO: Configure as part of the test harness

# DEBUG = True
DEBUG = False
class_name = "ConfigCollection"


def print_response(title, response):
    print(f"{title}: {response}")


def print_response_iter(title, response):
    for r in response:
        print(f"{title}: {r}")


########################
### CLIENT CONNECTION ##
########################

import os
import weaviate

client = weaviate.Client(
    url="http://localhost:8080",
    additional_headers={"X-Cohere-Api-Key": os.getenv("COHERE_API_KEY")},
)

if DEBUG:
    print(f"CLIENT IS READY: {client.is_ready()}")

################################
### ENABLE HNSW - COLLECTION ###
################################

# Delete data from prior runs
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START EnableHNSW
class_obj = {
    "class": class_name,
    # Additional configuration not shown
    "vectorIndexType": "hnsw",
    "vectorIndexConfig": {
        "distance_metric": "cosine",
        "ef_construction": 256,  # Dynamic list size during construction
        "max_connections": 128,  # Maximum number of connections per node
        "pq": {
            "enabled": True,
        },  # Enable compression
        "ef": -1,  # Dynamic list size during search; -1 enables dynamic Ef
        "dynamic_ef_factor": 15,  # Multiplier for dynamic Ef
        "dynamic_ef_min": 200,  # Minimum threshold for dynamic Ef
        "dynamic_ef_max": 1000,  # Maximum threshold for dynamic Ef
    },
}

client.schema.create_class(class_obj)
# END EnableHNSW

class_response = client.schema.get()
schema_response = client.schema.get(class_name)

if DEBUG:
    print_response_iter("COLLECTIONS", class_response)
if DEBUG:
    print_response("SCHEMA", schema_response)

classes = []
for c in class_response["classes"]:
    classes.append(c["class"])
assert class_name in classes, "Class missing"

correct_index = False
if (schema_response["class"] == class_name) and (
    schema_response["vectorIndexType"] == "hnsw"
):
    correct_index = True
assert correct_index, "Wrong index type"

# ##############################
# ### ENABLE HNSW - MULTIPLE ###
# ##############################

# START EnableMulti
# The Python client v3 doesn't support multiple named vectors.

# To use multiple named vectors, upgrade to the Python client v4.
# END EnableMulti
