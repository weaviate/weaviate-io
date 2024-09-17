# TODO: Configure as part of the test harness

collection_name = "ConfigCollection"

def print_response(title, response):
    print(f"{title}: {response}")

def print_response_iter(title, response):
    for r in response:
        print(f"{title}: {r}")

########################
### CLIENT CONNECTION ##
########################

import os
import weaviate

cohere_api_key = os.environ["COHERE_API_KEY"]

client = weaviate.connect_to_local(headers={"X-Cohere-Api-Key": cohere_api_key})

##############
### SEARCH ###
##############

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START SearchIndex
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    name=collection_name,
    properties=[
         Property(
            name="TextProperty",
            data_type=DataType.TEXT,
            index_searchable=True,
        ),
    ],
)
# END SearchIndex

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()

assert collection_name in collections_response.keys(), "Collection missing"

##############
### FILTER ###
##############

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START FilterIndex
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    name=collection_name,
    properties=[
         Property(
            name="TextProperty",
            data_type=DataType.TEXT,
            index_filterable=True,
        ),
    ],
)
# END FilterIndex

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()

assert collection_name in collections_response.keys(), "Collection missing"

#############
### RANGE ###
#############

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START RangeIndex
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    name=collection_name,
    properties=[
        Property(
            name="NumericProperty",
            data_type=DataType.INT,
            index_range_filters=True,
        ),
    ],
)
# END RangeIndex

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()

assert collection_name in collections_response.keys(), "Collection missing"

############
### BM25 ###
############

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START BM25Index
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    name=collection_name,
    inverted_index_config=Configure.inverted_index(
        bm25_b=0.7,
        bm25_k1=1.25,
    )
)
# END BM25Index

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()

assert collection_name in collections_response.keys(), "Collection missing"

########################
### COLLECTION LEVEL ###
########################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START CollLevIndex
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    name=collection_name,
    inverted_index_config=Configure.inverted_index(
        index_null_state=True,
        index_property_length=True,
        index_timestamps=True
    )
)
# END CollLevIndex

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()

assert collection_name in collections_response.keys(), "Collection missing"

################
### CLEAN UP ###
################

client.close()
