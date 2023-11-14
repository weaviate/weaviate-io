# THIS FILE NEEDS TESTS

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation shown on snippet
import weaviate
import json, os

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"] # Replace with your inference API key
    }
)

# ==============================
# =====  DOWNLOAD DATA =====
# ==============================

# START DownloadData

import requests
import json

# Download the data
resp = requests.get('https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/jeopardy_1k.json')

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
        "X-OpenAI-Api-Key": os.environ['OPENAI_API_KEY'] # Replace with your OpenAI API key
    }
)

client.is_ready()

# END ConnectCode

# ==============================
# =====  INITIAL SCHEMA =====
# ==============================

# START InitialSchema 

client.collections.create(
    name="JeopardyCategory",
    description="A Jeopardy! category",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_openai(),
    generative_config=wvc.Configure.Generative.openai(),
    properties=[
        wvc.Property(name="title", data_type=wvc.DataType.TEXT),
    ]
)

# END InitialSchema 

# ==============================
# =====  LOAD DATA =====
# ==============================

# START LoadData

v4 TBD

# END LoadData 

# ==============================
# =====  UPDATE SCHEMA =====
# ==============================

# START UpdateSchema

v4 TBD

# END UpdateSchema

# ==============================
# =====  GET THE SCHEMA =====
# ==============================

# START GetSchema

collection = client.collections.get("Article")
config = collection.config.get()

# print some of the config properties
print(config.vectorizer)
# END GetSchema

