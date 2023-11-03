# How-to: Manage-data -> Retrieve objects - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import weaviate.classes as wvc
import json

# client = weaviate.Client(
#     'https://edu-demo.weaviate.network',  # Replace with your Weaviate URL
#     auth_client_secret=weaviate.AuthApiKey('learn-weaviate'),  # Replace w/ your Weaviate API key
# )
client = weaviate.connect_to_wcs(
    cluster_id='edu-demo',  # Replace with your Weaviate URL
    api_key='learn-weaviate'
)

# =======================
# ===== Read object =====
# =======================

# ReadObject START
jeopardy = client.collections("JeopardyQuestion")

# highlight-start
data_object = jeopardy.query.fetch_object_by_id("00ff6900-e64f-5d94-90db-c8cfa3fc851b")
# highlight-end

print(json.dumps(data_object, indent=2))
# ReadObject END

# Test
assert data_object['properties']['answer'] == 'San Francisco'


# ===================================
# ===== Read object with vector =====
# ===================================

# ReadObjectWithVector START
jeopardy = client.collections("JeopardyQuestion")

data_object = jeopardy.query.fetch_object_by_id(
    "00ff6900-e64f-5d94-90db-c8cfa3fc851b",
    # highlight-start
    include_vector=True
    # highlight-end
)

print(json.dumps(data_object, indent=2))
# ReadObjectWithVector END

# Test
assert len(data_object['vector']) == 1536

# ==================================
# ===== Check object existence =====
# ==================================

# CheckObject START
# TODO: broken due to https://weaviate-org.slack.com/archives/C03KGRATUDD/p1685746400315799
# exists = client.data_object.exists(
#     uuid='00ff6900-e64f-5d94-90db-c8cfa3fc851b',
#     class_name='JeopardyQuestion',
# )
#
# print(exists)
# CheckObject END

# Test
# assert exists is True
