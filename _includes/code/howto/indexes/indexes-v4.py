# TODO: Configure as part of the test harness

collection_name = "ConfigCollection"

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
    vector_index_config=Configure.VectorIndex.hnsw(),
    # Configure properties, vectorizer
)
# END EnableHNSW

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    str(schema_response.vector_index_type) == "VectorIndexType.HNSW"
), "Wrong index type"

################################
### CONFIG HNSW - COLLECTION ###
################################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START ConfigHNSW
from weaviate.classes.config import Configure, VectorDistances

client.collections.create(
    name=collection_name,
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
    # Configure properties, vectorizer
)
# END ConfigHNSW

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    str(schema_response.vector_index_type) == "VectorIndexType.HNSW"
), "Wrong index type"

#####################
### COMPRESS HNSW ###
#####################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START CompressHNSW
from weaviate.classes.config import Configure, VectorDistances

client.collections.create(
    name=collection_name,
    vector_index_config=Configure.VectorIndex.hnsw(
        quantizer=Configure.VectorIndex.Quantizer.pq(),  # Quantizer configuration
    ),
    # Configure properties, vectorizer
)
# END CompressHNSW

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
    vector_index_config=Configure.VectorIndex.flat(),
    # Configure properties, vectorizer
)
# END EnableFlat

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    str(schema_response.vector_index_type) == "VectorIndexType.FLAT"
), "Wrong index type"

###################
### CONFIG FLAT ###
###################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START ConfigFlat
from weaviate.classes.config import Configure, VectorDistances

client.collections.create(
    name=collection_name,
    vector_index_config=Configure.VectorIndex.flat(
        distance_metric=VectorDistances.COSINE,
        vector_cache_max_objects=100000,
        quantizer=Configure.VectorIndex.Quantizer.bq()
    ),
    # Configure properties, vectorizer
)
# END ConfigFlat

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    str(schema_response.vector_index_type) == "VectorIndexType.FLAT"
), "Wrong index type"

###################
### COMPRESS FLAT ###
###################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START CompressFlat
from weaviate.classes.config import Configure, VectorDistances

client.collections.create(
    name=collection_name,
    vector_index_config=Configure.VectorIndex.flat(
        quantizer=Configure.VectorIndex.Quantizer.bq()
    ),
    # Configure properties, vectorizer
)
# END CompressFlat

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    str(schema_response.vector_index_type) == "VectorIndexType.FLAT"
), "Wrong index type"

################
### CLEAN UP ###
################

client.close()
