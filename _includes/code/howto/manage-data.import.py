# How-to: Manage-data -> (Batch) Import items - Python examples
import os
MAX_ROWS_TO_IMPORT = 50  # limit vectorization calls

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

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
        'question': obj['Question'],
        'answer': obj['Answer'],
    }

    client.batch.configure(batch_size=100)  # Configure batch
    with client.batch as batch:
        # Add the object to the batch
        batch.add_data_object(
            data_object=properties,
            class_name='JeopardyQuestion',
            # If you Bring Your Own Vectors, add the `vector` parameter here
            # vector=obj.vector
        )

        # Calculate and display progress
        counter += 1
        if counter % interval == 0:
            print(f'Imported {counter} articles...')


# END JSON streaming  # END CSV streaming

# START JSON streaming
print('JSON streaming, to avoid running out of memory on large files...')
with open('jeopardy_1k.json', 'rb') as f:
    objects = ijson.items(f, 'item')
    for o in objects:
        add_object(o)
        # END JSON streaming
        if counter >= MAX_ROWS_TO_IMPORT: break
        # START JSON streaming
# END JSON streaming

# START CSV streaming
print('pandas dataframe iterator with lazy-loading, to not load all records in RAM at once...')
with pd.read_csv(
    'jeopardy_1k.csv',
    usecols=['Question', 'Answer', 'Category'],
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

print(f'Finished importing {counter} articles.')
# END JSON streaming  # END CSV streaming

# Test
response = client.query.aggregate('JeopardyQuestion').with_meta_count().do()
actual_count = response['data']['Aggregate']['JeopardyQuestion'][0]['meta']['count']
assert actual_count == MAX_ROWS_TO_IMPORT * 2, f'Expected {MAX_ROWS_TO_IMPORT * 2} but got {actual_count}'
# END test
'''


# Commenting out the below as it is not used in V4 docs (but will throw)

# # ============================================================
# # ===== Batch import with parameters explicitly set  =====
# # ============================================================
#
# class_name = "YourClassName"  # Replace with your class name
# data_objs = [
#     {"title": f"Object {i+1}"} for i in range(5)
# ]
#
# # ConfigureBatchImportExample
# # highlight-start
# client.batch.configure(
#     batch_size=100,  # Specify the batch size for auto batching
#     num_workers=2,   # Maximum number of parallel threads used during import
# )
# with client.batch as batch:
# # highlight-end
#     for data_obj in data_objs:
#         batch.add_object(
#             collection=class_name,
#             properties=data_obj,
#         )
# # END ConfigureBatchImportExample
#
# response = client.query.aggregate(class_name).with_meta_count().do()
# assert response["data"]["Aggregate"][class_name][0]["meta"]["count"] == 5
# client.schema.delete_class(class_name)
#
#
# # ConfigureDynamicBatchImportExample
# # highlight-start
# client.batch.configure(
#     batch_size=100,  # Specify the batch size for auto batching
#     num_workers=2,   # Maximum number of parallel threads used during import
#     dynamic=True,
# )
# with client.batch as batch:
# # highlight-end
#     for data_obj in data_objs:
#         batch.add_data_object(
#             collection=class_name,
#             properties=data_obj,
#         )
# # END ConfigureDynamicBatchImportExample
#
# response = client.query.aggregate(class_name).with_meta_count().do()
# assert response["data"]["Aggregate"][class_name][0]["meta"]["count"] == 5
# client.schema.delete_class(class_name)
