# How-to: Manage-data -> (Batch) Import items - Python examples
import os
MAX_ROWS_TO_IMPORT = 50  # limit vectorization calls

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# TODO: create streaming examples with the V4 client
# START JSON streaming  # START CSV streaming
import weaviate
# END JSON streaming  # END CSV streaming

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
client.collections.delete("YourName")

client.collections.create(
    "YourName",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_openai()
)

# ==============================
# ===== Basic batch import =====
# ==============================

# BasicBatchImportExample
data = [
    {"title": f"Object {i+1}"} for i in range(5)
]

collection = client.collections.get("YourName")

# highlight-start
response = collection.data.insert_many(data)
# highlight-end
print(response.uuids)
# END BasicBatchImportExample

result = collection.aggregate.over_all(total_count=True)
assert result.total_count == 5
# Clean up
client.collections.delete(collection.name)

# =======================================
# ===== Batch import with custom ID =====
# =======================================

# BatchImportWithIDExample
# highlight-start
from weaviate.util import generate_uuid5  # Generate a deterministic ID
# highlight-end

data = [
    # use DataObject to provide uuid value
    wvc.DataObject(
        properties={"title": "Object 1"},
        # highlight-start
        uuid=generate_uuid5({"title": "Object 1"})
        # highlight-end
    ),
    wvc.DataObject(
        properties={"title": "Object 2"},
        uuid=generate_uuid5({"title": "Object 2"})
    ),
    wvc.DataObject(
        properties={"title": "Object 3"},
        uuid=generate_uuid5({"title": "Object 3"})
    ),
]

collection = client.collections.get("YourName")  # Replace with your collection name
collection.data.insert_many(data)

# END BatchImportWithIDExample

# Tests
result = collection.aggregate.over_all(total_count=True)
assert result.total_count == 3

first_id = generate_uuid5({"title": "Object 1"})
response = collection.query.fetch_object_by_id(first_id)
assert response != None

# Clean up
client.collections.delete(collection.name)

# ===========================================
# ===== Batch import with custom vector =====
# ===========================================

# BatchImportWithVectorExample
data = [
    # use DataObject to provide uuid value
    wvc.DataObject(
        properties={"title": "Object 1"},
        # highlight-start
        vector=[0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
        # highlight-end
    ),
    wvc.DataObject(
        properties={"title": "Object 2"},
        vector=[0.2, 0.2, 0.2, 0.2, 0.2, 0.2]
    ),
    wvc.DataObject(
        properties={"title": "Object 3"},
        vector=[0.3, 0.3, 0.3, 0.3, 0.3, 0.3]
    ),
]

collection = client.collections.get("YourName")  # Replace with your collection name
collection.data.insert_many(data)
# END BatchImportWithVectorExample

# Tests
result = collection.aggregate.over_all(total_count=True)
assert result.total_count == 3

response = collection.query.bm25(
    query="Object 1",
    include_vector=True
)
test_vector = response.objects[0].vector
assert (test_vector[0] >= 0.1)
assert (test_vector[0] < 0.11)

# Clean up
client.collections.delete(collection.name)
