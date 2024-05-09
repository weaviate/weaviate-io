# How-to: Manage-data -> (Batch) Import items - Python examples
import os
MAX_ROWS_TO_IMPORT = 50  # limit vectorization calls

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

assert client.is_ready()

# ============================
# ===== Define the class =====
# ============================

# Clean slate
client.collections.delete("YourCollection")

from weaviate.classes.config import Configure

client.collections.create(
    "YourCollection",
    vectorizer_config=Configure.Vectorizer.none()
)

# ==============================
# ===== Basic batch import =====
# ==============================

# BasicBatchImportExample
data_rows = [
    {"title": f"Object {i+1}"} for i in range(5)
]

collection = client.collections.get("YourCollection")

# highlight-start
with collection.batch.dynamic() as batch:
    for data_row in data_rows:
        batch.add_object(
            properties=data_row,
        )
# highlight-end
# END BasicBatchImportExample

result = collection.aggregate.over_all(total_count=True)
assert result.total_count == 5

# Clean up
client.collections.delete(collection.name)

# =======================================
# ===== Insert_many with custom ID =====
# =======================================

# InsertManyWithIDExample
# highlight-start
from weaviate.util import generate_uuid5  # Generate a deterministic ID
from weaviate.classes.data import DataObject
# highlight-end

data = [
    # use DataObject to provide uuid value
    DataObject(
        properties={"title": "Object 1"},
        # highlight-start
        uuid=generate_uuid5({"title": "Object 1"})
        # highlight-end
    ),
    DataObject(
        properties={"title": "Object 2"},
        uuid=generate_uuid5({"title": "Object 2"})
    ),
    DataObject(
        properties={"title": "Object 3"},
        uuid=generate_uuid5({"title": "Object 3"})
    ),
]

collection = client.collections.get("YourCollection")  # Replace with your collection name
collection.data.insert_many(data)
# END InsertManytWithIDExample

# Tests
result = collection.aggregate.over_all(total_count=True)
assert result.total_count == 3

first_id = generate_uuid5({"title": "Object 1"})
response = collection.query.fetch_object_by_id(first_id)
assert response != None

# Clean up
client.collections.delete(collection.name)

# ===========================================
# ===== Insert many with custom vector =====
# ===========================================

# InsertManyWithVectorExample
from weaviate.classes.data import DataObject

data = [
    # use DataObject to provide custom vector
    DataObject(
        properties={"title": "Object 1"},
        # highlight-start
        vector=[0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
        # highlight-end
    ),
    DataObject(
        properties={"title": "Object 2"},
        vector=[0.2, 0.2, 0.2, 0.2, 0.2, 0.2]
    ),
    DataObject(
        properties={"title": "Object 3"},
        vector=[0.3, 0.3, 0.3, 0.3, 0.3, 0.3]
    ),
]

collection = client.collections.get("YourCollection")  # Replace with your collection name
collection.data.insert_many(data)
# END InsertManyWithVectorExample

# Tests
result = collection.aggregate.over_all(total_count=True)
assert result.total_count == 3

response = collection.query.bm25(
    query="Object 1",
    include_vector=True
)
test_vector = response.objects[0].vector["default"]
assert (test_vector[0] >= 0.1)
assert (test_vector[0] < 0.11)

# Clean up
client.collections.delete(collection.name)


# =======================================
# ===== Insert many with custom ID =====
# =======================================

# BatchImportWithIDExample
# highlight-start
from weaviate.util import generate_uuid5  # Generate a deterministic ID
# highlight-end

# BatchImportWithIDExample
data_rows = [{"title": f"Object {i+1}"} for i in range(5)]

collection = client.collections.get("YourCollection")

# highlight-start
with collection.batch.dynamic() as batch:
    for data_row in data_rows:
        obj_uuid = generate_uuid5(data_row)
        batch.add_object(
            properties=data_row,
            uuid=obj_uuid
        )
# highlight-end
# END BatchImportWithIDExample

result = collection.aggregate.over_all(total_count=True)
assert result.total_count == 5
resp_obj = collection.query.fetch_object_by_id(obj_uuid)
assert resp_obj != None
# Clean up
client.collections.delete(collection.name)

# ===========================================
# ===== Batch import with custom vector =====
# ===========================================

# BatchImportWithVectorExample
data_rows = [{"title": f"Object {i+1}"} for i in range(5)]
vectors = [[0.1] * 1536 for i in range(5)]

collection = client.collections.get("YourCollection")

# highlight-start
with collection.batch.dynamic() as batch:
    for i, data_row in enumerate(data_rows):
        batch.add_object(
            properties=data_row,
            vector=vectors[i]
        )
# highlight-end
# END BatchImportWithVectorExample

result = collection.aggregate.over_all(total_count=True)
assert result.total_count == 5
# Clean up
client.collections.delete(collection.name)


# ===========================================
# ===== Batch import with named vectors =====
# ===========================================

# Clean slate
client.collections.delete("YourCollection")

from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    name="YourCollection",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
    ],
    vectorizer_config=[
        Configure.NamedVectors.text2vec_openai(
            name="title",
            source_properties=["title"]
        ),
        Configure.NamedVectors.text2vec_openai(
            name="body",
            source_properties=["body"]
        ),
    ]
)

# BatchImportWithNamedVectors
data_rows = [{
    "title": f"Object {i+1}",
    "body": f"Body {i+1}"
} for i in range(5)]

title_vectors = [[0.12] * 1536 for _ in range(5)]
body_vectors = [[0.34] * 1536 for _ in range(5)]

collection = client.collections.get("YourCollection")

# highlight-start
with collection.batch.dynamic() as batch:
    for i, data_row in enumerate(data_rows):
        batch.add_object(
            properties=data_row,
            vector={
                "title": title_vectors[i],
                "body": body_vectors[i],
            }
        )
# highlight-end
# END BatchImportWithNamedVectors

response = collection.query.fetch_objects(include_vector=True)
print(len(response.objects))
for i, obj in enumerate(response.objects):
    print(obj.vector)
    assert "Object" in obj.properties["title"]
    assert "Body" in obj.properties["body"]
    assert set(obj.vector.keys()) == {"title", "body"}
    assert len(obj.vector["title"]) == 1536
    assert len(obj.vector["body"]) == 1536


# =======================================
# ===== Batch import with cross-reference =====
# =======================================

client.collections.delete(["Author", "Publication"])

from weaviate.classes.config import Property, ReferenceProperty, DataType

publications = client.collections.create(
    name="Publication",
    properties=[Property(name="title", data_type=DataType.TEXT)]
)

authors = client.collections.create(
    name="Author",
    properties=[Property(name="name", data_type=DataType.TEXT)],
    references=[
        ReferenceProperty(name="writesFor", target_collection="Publication")
    ]
)

from_uuid = authors.data.insert(
    properties={"name": "Jane Austen"}
)

publications.data.insert(
    {"title": "Ye Olde Times"}
)
target_uuid = publications.query.fetch_objects(limit=1).objects[0].uuid

# BatchImportWithRefExample
collection = client.collections.get("Author")

with collection.batch.fixed_size(batch_size=100) as batch:
    batch.add_reference(
        from_property="writesFor",
        from_uuid=from_uuid,
        to=target_uuid,
    )

# END BatchImportWithRefExample

# Tests
from weaviate.classes.query import QueryReference

response = collection.query.fetch_object_by_id(
    from_uuid,
    return_references=QueryReference(link_on="writesFor", return_properties=["title"])
)

assert response.references["writesFor"].objects[0].properties["title"] == "Ye Olde Times"

# Clean up
client.collections.delete(collection.name)


# ===========================================
# ===== Stream data - JSON =====
# ===========================================

# Clean slate
client.collections.delete("JeopardyQuestion")

# Download the data from https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/jeopardy_1k.json
# and save it in the same folder as this script

import requests
import json

request = requests.get("https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/jeopardy_1k.json")
with open("jeopardy_1k.json", "w") as f:
    f.write(request.text)


# START JSON streaming
import ijson

# Settings for displaying the import progress
counter = 0
interval = 100  # print progress every this many records; should be bigger than the batch_size

print("JSON streaming, to avoid running out of memory on large files...")
with client.batch.fixed_size(batch_size=200) as batch:
    with open("jeopardy_1k.json", "rb") as f:
        objects = ijson.items(f, "item")
        for obj in objects:
            properties = {
                "question": obj["Question"],
                "answer": obj["Answer"],
            }
            batch.add_object(
                collection="JeopardyQuestion",
                properties=properties,
                # If you Bring Your Own Vectors, add the `vector` parameter here
                # vector=obj.vector["default"]
            )

            # Calculate and display progress
            counter += 1
            if counter % interval == 0:
                print(f"Imported {counter} articles...")


print(f"Finished importing {counter} articles.")
# END JSON streaming

# Tests
questions = client.collections.get("JeopardyQuestion")
response = questions.aggregate.over_all(total_count=True)
assert response.total_count == 1000

# Cleanup
client.collections.delete("JeopardyQuestion")

# ===========================================
# ===== Stream data - CSV =====
# ===========================================

import pandas as pd

df = pd.read_json("jeopardy_1k.json")
df.to_csv("jeopardy_1k.csv", index=False)

# START CSV streaming
import pandas as pd

# Settings for displaying the import progress
counter = 0
interval = 100  # print progress every this many records; should be bigger than the batch_size

def add_object(obj) -> None:
    global counter
    properties = {
        "question": obj["Question"],
        "answer": obj["Answer"],
    }

    with client.batch.fixed_size(batch_size=200) as batch:
        batch.add_object(
            collection="JeopardyQuestion",
            properties=properties,
            # If you Bring Your Own Vectors, add the `vector` parameter here
            # vector=obj.vector["default"]
        )

        # Calculate and display progress
        counter += 1
        if counter % interval == 0:
            print(f"Imported {counter} articles...")


print("pandas dataframe iterator with lazy-loading, to not load all records in RAM at once...")
with client.batch.fixed_size(batch_size=200) as batch:
    with pd.read_csv(
        "jeopardy_1k.csv",
        usecols=["Question", "Answer", "Category"],
        chunksize=100,  # number of rows per chunk
    ) as csv_iterator:
        # Iterate through the dataframe chunks and add each CSV record to the batch
        for chunk in csv_iterator:
            for index, row in chunk.iterrows():
                properties = {
                    "question": obj["Question"],
                    "answer": obj["Answer"],
                }
                batch.add_object(
                    collection="JeopardyQuestion",
                    properties=properties,
                    # If you Bring Your Own Vectors, add the `vector` parameter here
                    # vector=obj.vector["default"]
                )

        # Calculate and display progress
        counter += 1
        if counter % interval == 0:
            print(f"Imported {counter} articles...")

print(f"Finished importing {counter} articles.")
# END CSV streaming

# Tests
questions = client.collections.get("JeopardyQuestion")
response = questions.aggregate.over_all(total_count=True)
assert response.total_count == 1000

# Cleanup
client.collections.delete("JeopardyQuestion")

# Delete the downloaded files
os.remove("jeopardy_1k.json")
os.remove("jeopardy_1k.csv")

# ================================================
# =====   Batch vectorization set parameters =====
# ================================================

import os
rpm_embeddings = 100
tpm_embeddings = 10000

cohere_key = os.environ["COHERE_API_KEY"]
openai_key = os.environ["OPENAI_API_KEY"]


# START BatchVectorizationClientModify
from weaviate.classes.config import Integrations

integrations = [
    # Each model provider may expose different parameters
    Integrations.cohere(
        api_key=cohere_key,
        requests_per_minute_embeddings=rpm_embeddings,
    ),
    Integrations.openai(
        api_key=openai_key,
        requests_per_minute_embeddings=rpm_embeddings,
        tokens_per_minute_embeddings=tpm_embeddings,   # e.g. OpenAI also exposes tokens per minute for embeddings
    ),
]
client.integrations.configure(integrations)
# END BatchVectorizationClientModify

collection = client.collections.get("NewCollection")

collection.data.insert_many(
    {"title": f"Some title {i}", "summary": f"Summary {i}", "body": f"Body {i}"} for i in range(5)
)

response = collection.aggregate.over_all(total_count=True)
assert response.total_count == 5

# Clean up
client.collections.delete("NewCollection")

client.close()
