# How-to: Manage-data -> Update objects - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

# Instantiate the client with the user/password and OpenAI api key
client = weaviate.Client(
    "http://localhost:8080",  # Replace with your Weaviate URL
    # auth_client_secret=weaviate.auth.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # Replace with your Weaviate API key
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your OPENAI API key
    }
)

class_name = "JeopardyQuestion"


# ============================
# ===== Define the class =====
# ============================

class_definition = {
    "class": "JeopardyQuestion",
    "description": "A Jeopardy! question",
    "vectorizer": "text2vec-openai",
}


# Clean slate
if client.schema.exists("JeopardyQuestion"):
    client.schema.delete_class("JeopardyQuestion")

client.schema.create_class(class_definition)


# =============================
# ===== Update properties =====
# =============================

# UpdateProps START
uuid = "..."  # replace with the id of the object you want to update
# UpdateProps END

uuid = client.data_object.create({
    "question": "Test question",
    "answer": "Test answer",
    "points": -1,
}, "JeopardyQuestion")

# UpdateProps START
client.data_object.update(
    uuid=uuid,
    class_name="JeopardyQuestion",
    data_object={
        "points": 100,
    },
)
# UpdateProps END

# Test
result = client.data_object.get_by_id(uuid, class_name=class_name)
assert result["properties"]["points"] == 100


# =========================
# ===== Update vector =====
# =========================
# UpdateVector START
client.data_object.update(
    uuid=uuid,
    class_name="JeopardyQuestion",
    data_object={
        "points": 100,
    },
    # highlight-start
    vector=[0.12345] * 1536
    # highlight-end
)
# UpdateVector END

# Test
result = client.data_object.get_by_id(uuid, class_name=class_name, with_vector=True)
assert set(result["vector"]) == {0.12345}


# ==========================
# ===== Replace object =====
# ==========================
# Replace START
uuid = "..."  # the id of the object you want to replace
# Replace END
uuid = result["id"]
# Replace START
# highlight-start
client.data_object.replace(
# highlight-end
    uuid=uuid,
    class_name="JeopardyQuestion",
    data_object={
        "answer": "Replaced",
        # The other properties will be deleted
    },
)
# Replace END

# Test
result = client.data_object.get_by_id(uuid, class_name=class_name, with_vector=True)
assert result["properties"] == {"answer": "Replaced"}  # ensure the other props were deleted


# =============================
# ===== Delete properties =====
# =============================

# DelProps START
from typing import List
from weaviate import Client

def del_props(client: Client, uuid: str, class_name: str, prop_names: List[str]) -> None:
    object_data = client.data_object.get(uuid, class_name=class_name)
    for prop_name in prop_names:
        if prop_name in object_data["properties"]:
            del object_data["properties"][prop_name]
    client.data_object.replace(object_data["properties"], class_name, uuid)


uuid = "..."  # replace with the id of the object you want to delete properties from
# DelProps END

uuid = result["id"]  # Actually get the ID for testing

# DelProps START
del_props(client, uuid, "JeopardyQuestion", ["answer"])
# DelProps END

# Test
result = client.data_object.get_by_id(uuid, class_name=class_name, with_vector=True)
assert result["properties"] == {}
