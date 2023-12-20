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
# =====  EnableBQ =====
# ==============================

client.collections.delete("YourCollection")

# START EnableBQ
import weaviate.classes as wvc

client.collections.create(
    name="YourCollection",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_openai(),
    # highlight-start
    vector_index_config=wvc.Configure.VectorIndex.flat(),
    # highlight-end
    properties=[
        wvc.Property(name="title", data_type=wvc.DataType.TEXT),
        wvc.Property(name="body", data_type=wvc.DataType.TEXT),
    ]
)
# END EnableBQ

# ==============================
# =====  EnableBQ with Options =====
# ==============================

client.collections.delete("YourCollection")

# START BQWithOptions
import weaviate.classes as wvc

client.collections.create(
    name="YourCollection",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_openai(),
    # highlight-start
    vector_index_config=wvc.Configure.VectorIndex.flat(
        distance_metric=wvc.VectorDistance.COSINE,
        vector_cache_max_objects=1000000,
        quantizer=wvc.Configure.VectorIndex.Quantizer.bq()
    ),
    # highlight-end
    properties=[
        wvc.Property(name="title", data_type=wvc.DataType.TEXT),
        wvc.Property(name="body", data_type=wvc.DataType.TEXT),
    ]
)
# END BQWithOptions
