# How-to: Manage-data -> Create objects - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import json

# Instantiate the client with the OpenAI API key
client = weaviate.Client(
    "http://localhost:8080",
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]
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
if not client.schema.exists("JeopardyQuestion"):
    client.schema.create_class(class_definition)


# =========================
# ===== Create object =====
# =========================

# CreateObject START
# highlight-start
uuid = client.data_object.create(
# highlight-end
    class_name="JeopardyQuestion",
    data_object={
        "question": "This vector DB is OSS & supports automatic property type inference on import",
        # "answer": "Weaviate",  # schema properties can be omitted
        "newProperty": 123,  # will be automatically added as a number property
    }
)

print(uuid)  # the return value is the object's UUID
# CreateObject END

# Test
result = client.data_object.get_by_id(uuid, class_name=class_name)
assert result["properties"]["newProperty"] == 123

# ============================================
# ===== Create object with a vector =====
# ============================================

# CreateObjectWithVector START
uuid = client.data_object.create(
    class_name="JeopardyQuestion",
    data_object={
        "question": "This vector DB is OSS and supports automatic property type inference on import",
        "answer": "Weaviate",
    },
    # highlight-start
    vector=[0.12345] * 1536
    # highlight-end
)

print(uuid)  # the return value is the object's UUID
# CreateObjectWithVector END

# Test
result = client.data_object.get_by_id(uuid, class_name=class_name)
assert result["properties"] == {
    "question": "This vector DB is OSS and supports automatic property type inference on import",
    "answer": "Weaviate"
}

# =======================================
# ===== Create object with named vectors =====
# =======================================

# CreateObjectNamedVectors START
# Unfortunately, named vectors are not suppored in the v3 API / Python client.
# Please upgrade to the v4 API / Python client to use named vectors.
# CreateObjectNamedVectors END

# ============================================
# ===== Create object with deterministic id =====
# ============================================

# CreateObjectWithDeterministicId START
# highlight-start
from weaviate.util import generate_uuid5  # Generate a deterministic ID
# highlight-end

data_object = {
    "question": "This vector DB is OSS and supports automatic property type inference on import",
    "answer": "Weaviate",
}
uuid = client.data_object.create(
    class_name="JeopardyQuestion",
    data_object=data_object,
    # highlight-start
    uuid=generate_uuid5(data_object),
    # highlight-end
)
# CreateObjectWithDeterministicId END

# Test
assert generate_uuid5(data_object) == uuid
client.data_object.delete(uuid)  # Clean up

# ============================================
# ===== Create object with id and vector =====
# ============================================

# CreateObjectWithId START
uuid = client.data_object.create(
    class_name="JeopardyQuestion",
    data_object={
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
result = client.data_object.get_by_id(uuid, class_name=class_name)
assert result["properties"] == {
    "question": "This vector DB is OSS and supports automatic property type inference on import",
    "answer": "Weaviate"
}


# ===========================
# ===== Validate object =====
# ===========================

# ValidateObject START
# highlight-start
result = client.data_object.validate(
# highlight-end
    class_name="JeopardyQuestion",
    data_object={
      "question": "This vector DB is open-source and supports auto-schema",
      "answer": "Weaviate",
      "thisPropShouldNotEndUpInTheSchema": -1,
    },
    uuid="12345678-1234-1234-1234-123456789012",
)

# "invalid object: no such prop with name "thisPropShouldNotEndUpInTheSchema" found..."
print(json.dumps(result, indent=2))
# ValidateObject END

assert "thisPropShouldNotEndUpInTheSchema" in result["error"][0]["message"]
