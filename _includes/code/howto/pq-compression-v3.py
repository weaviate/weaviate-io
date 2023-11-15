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
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"] # Replace with your OpenAI API key
    }
)

# ==============================
# =====  DOWNLOAD DATA =====
# ==============================

# START DownloadData

import requests
import json

# Download the data
resp = requests.get( 'https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/jeopardy_1k.json' )

# Load the data so you can see what it is
data = json.loads( resp.text )

# Parse the JSON and preview it
print( type( data ), len( data ))
print( json.dumps( data[1], indent=2 ) )

# END DownloadData

# ==============================
# =====  CONNECT =====
# ==============================

# START ConnectCode
import weaviate
from weaviate import EmbeddedOptions
import os

client = weaviate.Client(
    url = "http://localhost:8080/",  # Replace with your endpoint
    additional_headers = {
        "X-OpenAI-Api-Key": os.getenv( "OPENAI_API_KEY" ) # Replace with your OpenAI API key
    }
)

client.is_ready()
# END ConnectCode

# ==============================
# =====  INITIAL SCHEMA =====
# ==============================

# START InitialSchema 
class_definition = {
    
    "class": "Question",
    "vectorizer":"text2vec-openai",
    "vectorIndexConfig": {
        "distance" : "cosine"
    },
    
    'properties' : [
        {
            'name' : "question",
            "dataType" : [ "text" ]
        },
        {
            'name' : "answer",
            "dataType" : [ "text" ]
        },
        {
            'name' : 'round',
            'dataType': [ "text" ]
        }
    ]
}

client.schema.create_class(class_definition)

# END InitialSchema 

# ==============================
# =====  LOAD DATA =====
# ==============================

# START LoadData

with client.batch() as batch:
    for o in data:
        obj_body = {
            'question':o[ "Question" ],
            'answer':o[ "Answer" ],
            'round':o[ "Round" ]
        }
        
        batch.add_data_object(
        data_object=obj_body,
        class_name="Question"
        )

# END LoadData 

# ==============================
# =====  UPDATE SCHEMA =====
# ==============================

# START UpdateSchema

client.schema.update_config(
   "Question", {
      "vectorIndexConfig": {
         # highlight-start
         "pq": {
            "enabled": True,    # Enable PQ 
            "trainingLimit": 100000, 
            "segments": 96 
         # highlight-end
         }
      }
   }
)

# END UpdateSchema

# ==============================
# =====  GET THE SCHEMA =====
# ==============================

# START GetSchema

client.schema.get()

# END GetSchema
