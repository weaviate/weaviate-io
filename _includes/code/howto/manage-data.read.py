# How-to: Manage-data -> Retrieve objects - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import weaviate.classes as wvc
import os

# client = weaviate.Client(
#     "https://edu-demo.weaviate.network",  # Replace with your Weaviate URL
#     auth_client_secret=weaviate.AuthApiKey("learn-weaviate"),  # Replace w/ your Weaviate API key
# )
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your Weaviate URL
    auth_credentials=weaviate.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
)

# =======================
# ===== Read object =====
# =======================

# ReadObject START
jeopardy = client.collections.get("JeopardyQuestion")

# highlight-start
data_object = jeopardy.query.fetch_object_by_id("00ff6900-e64f-5d94-90db-c8cfa3fc851b")
# highlight-end

print(data_object.properties)
# ReadObject END

# Test
assert data_object.properties["answer"] == "San Francisco"


# ===================================
# ===== Read object with vector =====
# ===================================

# TODOv4 -  include_vector

# ReadObjectWithVector START
jeopardy = client.collections.get("JeopardyQuestion")

data_object = jeopardy.query.fetch_object_by_id(
    "00ff6900-e64f-5d94-90db-c8cfa3fc851b",
    # highlight-start
    include_vector=True
    # highlight-end
)

print(data_object.vector)
# ReadObjectWithVector END

# Test
assert len(data_object.vector) == 1536

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
