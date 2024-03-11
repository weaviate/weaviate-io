# THIS FILE NEEDS TESTS

# ==============================
# =====  DOWNLOAD DATA =====
# ==============================

# START DownloadData
import requests
import json

# Download the data
resp = requests.get(
    "https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/jeopardy_1k.json"
)

# Load the data so you can see what it is
data = json.loads(resp.text)

# Parse the JSON and preview it
print(type(data), len(data))
print(json.dumps(data[1], indent=2))

# END DownloadData

# ==============================
# =====  CONNECT =====
# ==============================

# START ConnectCode
import weaviate, os, json
import weaviate.classes.config as wc

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ[
            "OPENAI_API_KEY"
        ]  # Replace with your OpenAI API key
    }
)

assert client.is_ready()

# END ConnectCode


# ==============================
# =====  AUTOPQ =====
# ==============================

client.collections.delete("Question")


# START CollectionWithAutoPQ
import weaviate.classes.config as wc

client.collections.create(
    name="Question",
    vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(),
    # highlight-start
    vector_index_config=wc.Configure.VectorIndex.hnsw(
        quantizer=wc.Configure.VectorIndex.Quantizer.pq(training_limit=50000)  # Set the threshold to begin training
    ),
    # highlight-end
    properties=[
        wc.Property(name="question", data_type=wc.DataType.TEXT),
        wc.Property(name="answer", data_type=wc.DataType.TEXT),
    ],
)

# END CollectionWithAutoPQ


# Confirm that the collection has been created with the right settings
collection = client.collections.get("Question")
config = collection.config.get()

from weaviate.collections.classes.config import _PQConfig

assert type(config.vector_index_config.quantizer) == _PQConfig
# No import test as it would take a long time


# ==============================
# =====  INITIAL SCHEMA =====
# ==============================

client.collections.delete("Question")

# START InitialSchema
client.collections.create(
    name="Question",
    description="A Jeopardy! question",
    vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(),
    generative_config=wc.Configure.Generative.openai(),
    properties=[
        wc.Property(name="question", data_type=wc.DataType.TEXT),
        wc.Property(name="answer", data_type=wc.DataType.TEXT),
    ],
)

# END InitialSchema
assert type(config.vector_index_config.quantizer) is None

# ==============================
# =====  LOAD DATA =====
# ==============================


# START LoadData
def parse_data():
    object_list = []
    for obj in data:
        object_list.append(
            {
                "question": obj["Question"],
                "answer": obj["Answer"],
            }
        )

    return object_list


jeopardy = client.collections.get("Question")
jeopardy.data.insert_many(parse_data())
# END LoadData


response = jeopardy.aggregate.over_all(total_count=True)
assert response.total_count == 1000

# ==============================
# =====  UPDATE SCHEMA =====
# ==============================

# START UpdateSchema
import weaviate.classes.config as wc

jeopardy = client.collections.get("Question")
jeopardy.config.update(
    vector_index_config=wc.Reconfigure.VectorIndex.hnsw(
        quantizer=wc.Reconfigure.VectorIndex.Quantizer.pq()
    )
)
# END UpdateSchema

assert type(config.vector_index_config.quantizer) == _PQConfig

# ==============================
# =====  GET THE SCHEMA =====
# ==============================

# START GetSchema
jeopardy = client.collections.get("Question")
config = jeopardy.config.get()
pq_config = config.vector_index_config.pq

# print some of the config properties
print(f"Enabled: { pq_config.enabled }")
print(f"Training: { pq_config.training_limit }")
print(f"Segments: { pq_config.segments }")
print(f"Centroids: { pq_config.centroids }")
# END GetSchema

# START-ANY

client.close()
# END-ANY
