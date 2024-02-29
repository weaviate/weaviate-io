# How-to: Manage-data -> Retrieve objects - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import json

client = weaviate.Client(
    "https://edu-demo.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.auth.AuthApiKey("learn-weaviate"),  # Replace w/ your Weaviate API key
)

# =======================
# ===== Read object =====
# =======================

# ReadObject START
data_object = client.data_object.get_by_id(
    "00ff6900-e64f-5d94-90db-c8cfa3fc851b",
    class_name="JeopardyQuestion",
)

print(json.dumps(data_object, indent=2))
# ReadObject END

# Test
assert data_object["properties"]["answer"] == "San Francisco"


# ===================================
# ===== Read object with vector =====
# ===================================

# ReadObjectWithVector START
data_object = client.data_object.get_by_id(
    "00ff6900-e64f-5d94-90db-c8cfa3fc851b",
    class_name="JeopardyQuestion",
    # highlight-start
    with_vector=True
    # highlight-end
)

print(json.dumps(data_object, indent=2))
# ReadObjectWithVector END

# Test
assert len(data_object["vector"]) == 1536


# ===================================
# ===== Read object with named vectors =====
# ===================================

# ReadObjectNamedVectors START
# Unfortunately, named vectors are not suppored in the v3 API / Python client.
# Please upgrade to the v4 API / Python client to use named vectors.
# ReadObjectNamedVectors END


# ==================================
# ===== Check object existence =====
# ==================================

# CheckObject START
# TODO: broken due to https://weaviate-org.slack.com/archives/C03KGRATUDD/p1685746400315799
# exists = client.data_object.exists(
#     uuid="00ff6900-e64f-5d94-90db-c8cfa3fc851b",
#     class_name="JeopardyQuestion",
# )
#
# print(exists)
# CheckObject END

# Test
# assert exists is True
