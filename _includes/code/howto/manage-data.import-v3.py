# How-to: Manage-data -> (Batch) Import items - Python examples
import os
MAX_ROWS_TO_IMPORT = 50  # limit vectorization calls

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# START JSON streaming  # START CSV streaming
import weaviate
# END JSON streaming  # END CSV streaming

# Instantiate the client with the user/password and OpenAI api key
client = weaviate.Client(
    "http://localhost:8080",  # Replace with your Weaviate URL
    # auth_client_secret=weaviate.auth.AuthApiKey("YOUR-WEAVIATE-API-KEY"),
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace w/ your OPENAI API key
    }
)

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


# ==============================
# ===== Basic batch import =====
# ==============================

# BasicBatchImportExample
class_name = "YourName"  # Replace with your class name
data_objs = [
    {"title": f"Object {i+1}"} for i in range(5)
]
# highlight-start
client.batch.configure(batch_size=100)  # Configure batch
with client.batch as batch:
    for data_obj in data_objs:
        batch.add_data_object(
            data_obj,
            class_name,
            # tenant="tenantA"  # If multi-tenancy is enabled, specify the tenant to which the object will be added.
        )
# highlight-end
# END BasicBatchImportExample

response = client.query.aggregate(class_name).with_meta_count().do()
assert response["data"]["Aggregate"][class_name][0]["meta"]["count"] == 5
client.schema.delete_class(class_name)


# =======================================
# ===== Batch import with custom ID =====
# =======================================

# BatchImportWithIDExample
# highlight-start
from weaviate.util import generate_uuid5  # Generate a deterministic ID
# highlight-end

class_name = "YourName"  # Replace with your class name
data_objs = [
    {"title": f"Object {i+1}"} for i in range(5)  # Replace with your actual objects
]
client.batch.configure(batch_size=100)  # Configure batch
with client.batch as batch:
    for data_obj in data_objs:
        batch.add_data_object(
            data_obj,
            class_name,
            # highlight-start
            uuid=generate_uuid5(data_obj)  # Optional: Specify an object ID
            # highlight-end
        )
# END BatchImportWithIDExample

response = client.query.aggregate(class_name).with_meta_count().do()
assert response["data"]["Aggregate"][class_name][0]["meta"]["count"] == 5
response = client.query.get(class_name, ["title"]).with_additional(["id"]).do()
for obj in response["data"]["Get"][class_name]:
    src_obj = {k: v for k, v in obj.items() if k != "_additional"}
    gen_uuid = generate_uuid5(src_obj)
    assert obj["_additional"]["id"] == gen_uuid
client.schema.delete_class(class_name)


# ===========================================
# ===== Batch import with custom vector =====
# ===========================================

# BatchImportWithVectorExample
class_name = "YourName"  # Replace with your class name
data_objs = [
    {"title": f"Object {i+1}"} for i in range(5)  # Replace with your actual objects
]
vectors = [
    [0.25 + i/100] * 10 for i in range(5)  # Replace with your actual vectors
]
client.batch.configure(batch_size=100)  # Configure batch
with client.batch as batch:
    for i, data_obj in enumerate(data_objs):
        batch.add_data_object(
            data_obj,
            class_name,
            # highlight-start
            vector=vectors[i]  # Optional: Specify an object vector
            # highlight-end
        )
# END BatchImportWithVectorExample

response = client.query.aggregate(class_name).with_meta_count().do()
assert response["data"]["Aggregate"][class_name][0]["meta"]["count"] == 5
response = client.query.get(class_name, ["title"]).with_additional(["vector"]).do()
for obj in response["data"]["Get"][class_name]:
    assert obj["_additional"]["vector"][0] >= 0.25
    assert obj["_additional"]["vector"][0] < 0.3
client.schema.delete_class(class_name)

# TODOv4 – maybe this should be removed

# ===========================================
# ===== Batch import with named vectors =====
# ===========================================

# BatchImportWithNamedVectors
# Unfortunately, named vectors are not suppored in the v3 API / Python client.
# Please upgrade to the v4 API / Python client to use named vectors.
# END BatchImportWithNamedVectors

# ============================
# ===== Streaming import =====
# ============================
'''
Will test later on
# START JSON streaming
import ijson
# END JSON streaming
# START CSV streaming
import pandas as pd
# END CSV streaming

# START JSON streaming  # START CSV streaming

# Settings for displaying the import progress
counter = 0
interval = 20  # print progress every this many records; should be bigger than the batch_size

def add_object(obj) -> None:
    global counter
    properties = {
        "question": obj["Question"],
        "answer": obj["Answer"],
    }

    client.batch.configure(batch_size=100)  # Configure batch
    with client.batch as batch:
        # Add the object to the batch
        batch.add_data_object(
            data_object=properties,
            class_name="JeopardyQuestion",
            # If you Bring Your Own Vectors, add the `vector` parameter here
            # vector=obj.vector
        )

        # Calculate and display progress
        counter += 1
        if counter % interval == 0:
            print(f"Imported {counter} articles...")


# END JSON streaming  # END CSV streaming

# START JSON streaming
print("JSON streaming, to avoid running out of memory on large files...")
with open("jeopardy_1k.json", "rb") as f:
    objects = ijson.items(f, "item")
    for o in objects:
        add_object(o)
        # END JSON streaming
        if counter >= MAX_ROWS_TO_IMPORT: break
        # START JSON streaming
# END JSON streaming

# START CSV streaming
print("pandas dataframe iterator with lazy-loading, to not load all records in RAM at once...")
with pd.read_csv(
    "jeopardy_1k.csv",
    usecols=["Question", "Answer", "Category"],
    chunksize=100,  # number of rows per chunk
) as csv_iterator:
    # Iterate through the dataframe chunks and add each CSV record to the batch
    for chunk in csv_iterator:
        for index, row in chunk.iterrows():
            add_object(row)
            # END CSV streaming
            if counter >= MAX_ROWS_TO_IMPORT * 2: break
        if counter >= MAX_ROWS_TO_IMPORT * 2: break  # break from the outer loop as well
        # START CSV streaming
# END CSV streaming

# START JSON streaming  # START CSV streaming

print(f"Finished importing {counter} articles.")
# END JSON streaming  # END CSV streaming

# Test
response = client.query.aggregate("JeopardyQuestion").with_meta_count().do()
actual_count = response["data"]["Aggregate"]["JeopardyQuestion"][0]["meta"]["count"]
assert actual_count == MAX_ROWS_TO_IMPORT * 2, f"Expected {MAX_ROWS_TO_IMPORT * 2} but got {actual_count}"
# END test
'''


# ============================================================
# ===== Batch import with parameters explicitly set  =====
# ============================================================

class_name = "YourName"  # Replace with your class name
data_objs = [
    {"title": f"Object {i+1}"} for i in range(5)
]

# ConfigureBatchImportExample
# highlight-start
client.batch.configure(
    batch_size=100,  # Specify the batch size for auto batching
    num_workers=2,   # Maximum number of parallel threads used during import
)
with client.batch as batch:
# highlight-end
    for data_obj in data_objs:
        batch.add_data_object(
            data_obj,
            class_name,
            dynamic=True,    # Weaviate dynamically adjusts the batch size
        )
# END ConfigureBatchImportExample

response = client.query.aggregate(class_name).with_meta_count().do()
assert response["data"]["Aggregate"][class_name][0]["meta"]["count"] == 5
client.schema.delete_class(class_name)


# ConfigureDynamicBatchImportExample
# highlight-start
client.batch.configure(
    batch_size=100,  # Specify the batch size for auto batching
    num_workers=2,   # Maximum number of parallel threads used during import
    dynamic=True,
)
with client.batch as batch:
# highlight-end
    for data_obj in data_objs:
        batch.add_data_object(
            data_obj,
            class_name,
        )
# END ConfigureDynamicBatchImportExample

response = client.query.aggregate(class_name).with_meta_count().do()
assert response["data"]["Aggregate"][class_name][0]["meta"]["count"] == 5
client.schema.delete_class(class_name)
