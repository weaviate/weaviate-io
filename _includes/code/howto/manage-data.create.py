# How-to: Manage-data -> Create objects - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import weaviate.classes as wvc
import json

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

# ============================
# ===== Define the class =====
# ============================

# Clean slate
if client.collections.exists("JeopardyQuestion"):
    client.collections.delete("JeopardyQuestion")

client.collections.create(
    "JeopardyQuestion",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_openai()
)

# =========================
# ===== Create object =====
# =========================

# CreateObject START
jeopardy = client.collections.get("JeopardyQuestion")

uuid = jeopardy.data.insert({
    "question": "This vector DB is OSS & supports automatic property type inference on import",
    # "answer": "Weaviate",  # properties can be omitted
    "newProperty": 123,  # will be automatically added as a number property
})

print(uuid)  # the return value is the object's UUID
# CreateObject END

# Test
result = jeopardy.query.fetch_object_by_id(uuid)
assert result["properties"]["newProperty"] == 123


# =======================================
# ===== Create object with a vector =====
# =======================================

# CreateObjectWithVector START
jeopardy = client.collections.get("JeopardyQuestion")
uuid = jeopardy.data.insert(
    properties={
        "question": "This vector DB is OSS and supports automatic property type inference on import",
        "answer": "Weaviate",
    },
    # highlight-start
    vector=[0.12345] * 1536
    # highlight-end
)

print(uuid)  # the return value is the object's UUID
# CreateObjectWithVector END

# ===============================================
# ===== Create object with deterministic id =====
# ===============================================

# CreateObjectWithDeterministicId START
# highlight-start
from weaviate.util import generate_uuid5  # Generate a deterministic ID
# highlight-end

data_object = {
    "question": "This vector DB is OSS and supports automatic property type inference on import",
    "answer": "Weaviate",
}

jeopardy = client.collections.get("JeopardyQuestion")
uuid = jeopardy.data.insert(
    properties=data_object,
    # highlight-start
    uuid=generate_uuid5(data_object),
    # highlight-end
)
# CreateObjectWithDeterministicId END

# Test
assert generate_uuid5(data_object) == uuid
jeopardy.data.delete_by_id(uuid)  # Clean up


# ============================================
# ===== Create object with id and vector =====
# ============================================

# CreateObjectWithId START
jeopardy = client.collections.get("JeopardyQuestion")
uuid = jeopardy.data.insert(
    properties={
        "question": "This vector DB is OSS and supports automatic property type inference on import",
        "answer": "Weaviate",
    },
    # highlight-start
    uuid="12345678-e64f-5d94-90db-c8cfa3fc1234"
    # highlight-end
)

print(uuid)  # the return value is the object's UUID
# CreateObjectWithId END

# Test
result = jeopardy.query.fetch_object_by_id(uuid)
assert result["properties"] == {
    "question": "This vector DB is OSS and supports automatic property type inference on import",
    "answer": "Weaviate"
}


# ===========================
# ===== Validate object =====
# ===========================

# ValidateObject START
# Validate is currently not supported with the Weaviate Python client v4
# ValidateObject END

# ValidateObject-TODO START
jeopardy = client.collections.get("JeopardyQuestion")
# highlight-start
#TODO: see if this is supported
result = jeopardy.data.validate(
# highlight-end
    properties={
      "question": "This vector DB is open-source and supports auto-schema",
      "answer": "Weaviate",
      "thisPropShouldNotEndUpInTheSchema": -1,
    },
    uuid="12345678-1234-1234-1234-123456789012",
)

# "invalid object: no such prop with name "thisPropShouldNotEndUpInTheSchema" found..."
print(json.dumps(result, indent=2))
# ValidateObject-TODO END

# TODO: update the assertion
# assert "thisPropShouldNotEndUpInTheSchema" in result["error"][0]["message"]
