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
import weaviate.classes as wvc

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ[
            "OPENAI_API_KEY"
        ]  # Replace with your OpenAI API key
    }
)

client.is_ready()

# END ConnectCode

# ==============================
# =====  INITIAL SCHEMA =====
# ==============================

if (client.collections.exists("Question")):
    client.collections.delete("Question")

# START InitialSchema
client.collections.create(
    name="Question",
    description="A Jeopardy! question",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_openai(),
    generative_config=wvc.Configure.Generative.openai(),
    properties=[
        wvc.Property(name="title", data_type=wvc.DataType.TEXT),
    ],
)

# END InitialSchema

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
                "round": obj["Round"],
            }
        )

    return object_list

jeopardy = client.collections.get("Question")
jeopardy.data.insert_many(parse_data())

# Check upload
response = jeopardy.aggregate.over_all(total_count=True)

# Should equal the number of objects uploaded
print(response.total_count)

# END LoadData

# ==============================
# =====  UPDATE SCHEMA =====
# ==============================

# START UpdateSchema
import weaviate.classes as wvc

jeopardy = client.collections.get("Question")
jeopardy.config.update(
    vector_index_config=wvc.Reconfigure.VectorIndex.hnsw(
        quantizer=wvc.Reconfigure.VectorIndex.Quantizer.pq()
    )
)


# END UpdateSchema

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
