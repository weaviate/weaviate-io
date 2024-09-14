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

################################
### ENABLE HNSW - COLLECTION ###
################################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START EnableHNSW
from weaviate.classes.config import Configure, VectorDistances

client.collections.create(
    name=collection_name,
    vectorizer_config=Configure.Vectorizer.text2vec_cohere(),
    # This line enables the index
    # vector_index_config=Configure.VectorIndex.hnsw()
    # These lines enable and configure the index
    vector_index_config=Configure.VectorIndex.hnsw(
        distance_metric=VectorDistances.COSINE,
        ef_construction=256,  # Dynamic list size during construction
        max_connections=128,  # Maximum number of connections per node
        quantizer=Configure.VectorIndex.Quantizer.pq(),  # Quantizer configuration
        ef=-1,  # Dynamic list size during search; -1 enables dynamic Ef
        dynamic_ef_factor=15,  # Multiplier for dynamic Ef
        dynamic_ef_min=200,  # Minimum threshold for dynamic Ef
        dynamic_ef_max=1000,  # Maximum threshold for dynamic Ef
    ),
)
# END EnableHNSW

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    str(schema_response.vector_index_type) == "VectorIndexType.HNSW"
), "Wrong index type"

##############################
### ENABLE HNSW - MULTIPLE ###
##############################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START EnableMulti

from weaviate.classes.config import Configure, Property, DataType, Tokenization

client.collections.create(
    name=collection_name,
    vectorizer_config=[
        # Define a named vector
        Configure.NamedVectors.text2vec_cohere(
            name="vectorForFieldOne",
            source_properties=["FieldOne"],
            vector_index_config=Configure.VectorIndex.hnsw(
                max_connections=128,
            ),
        ),
        # Define another named vector
        Configure.NamedVectors.text2vec_openai(
            name="vectorForFieldTwo",
            source_properties=["FieldTwo"],
            vector_index_config=Configure.VectorIndex.flat(),
        ),
    ],
    # Configure properties
)
# END EnableMulti

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    collection.config.get()
    .vector_config["vectorForFieldOne"]
    .vector_index_config.vector_index_type()
    == "hnsw"
), "Wrong index type"
assert (
    collection.config.get()
    .vector_config["vectorForFieldTwo"]
    .vector_index_config.vector_index_type()
    == "flat"
), "Wrong index type"

###################
### ENABLE FLAT ###
###################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START EnableFlat
from weaviate.classes.config import Configure, VectorDistances

client.collections.create(
    name=collection_name,
    vectorizer_config=Configure.Vectorizer.text2vec_cohere(),
    vector_index_config=Configure.VectorIndex.flat(
        distance_metric=VectorDistances.COSINE,
        vector_cache_max_objects=100000,
        quantizer=Configure.VectorIndex.Quantizer.bq()
    ),
)
# END EnableFlat

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    str(schema_response.vector_index_type) == "VectorIndexType.FLAT"
), "Wrong index type"

######################
### ENABLE DYNAMIC ###
######################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START EnableDynamic
from weaviate.classes.config import Configure, VectorDistances

client.collections.create(
    name=collection_name,
    vector_index_config=Configure.VectorIndex.dynamic(
        distance_metric=VectorDistances.COSINE,
        threshold=20000,
        hnsw=Configure.VectorIndex.hnsw(
            # Any hnsw configuration parameters
            dynamic_ef_factor=15,  # Multiplier for dynamic Ef
            dynamic_ef_min=200,    # Minimum threshold for dynamic Ef
            dynamic_ef_max=1000,   # Maximum threshold for dynamic Ef
        ),
        flat=Configure.VectorIndex.flat(
            # Any flat index configuration parameters
            vector_cache_max_objects=100000,
            quantizer=Configure.VectorIndex.Quantizer.bq()
        ),
    )
)
# END EnableDynamic

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    str(schema_response.vector_index_type) == "VectorIndexType.DYNAMIC"
), "Wrong index type"

########################
### Inverted Indexes ###
########################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START PropIndex
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    name=collection_name,
    properties=[
         Property(
            name="TextProperty",
            data_type=DataType.TEXT,
            index_filterable=True,
            index_searchable=True,
        ),
        Property(
            name="NumericProperty",
            data_type=DataType.INT,
            index_range_filters=True,
        ),
    ],
    inverted_index_config=Configure.inverted_index(
        bm25_b=0.7,
        bm25_k1=1.25,
        index_null_state=True,
        index_property_length=True,
        index_timestamps=True
    )
)
# END PropIndex

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()

assert collection_name in collections_response.keys(), "Collection missing"

################
### CLEAN UP ###
################

client.close()
