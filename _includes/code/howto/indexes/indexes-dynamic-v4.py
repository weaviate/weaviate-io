# TODO: Configure as part of the test harness

collection_name = "ConfigCollection"

########################
### CLIENT CONNECTION ##
########################

import os
import weaviate

cohere_api_key = os.environ["COHERE_API_KEY"]
client = weaviate.connect_to_local(headers={"X-Cohere-Api-Key": cohere_api_key})

######################
### ENABLE DYNAMIC ###
######################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START EnableDynamic
from weaviate.classes.config import Configure, Property, DataType, VectorDistances

client.collections.create(
    name=collection_name,
    description="Configuration example",
    vector_index_config=Configure.VectorIndex.dynamic(),
    # Configure vectorizer, properties
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
    ]
)
# END EnableDynamic

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    str(schema_response.vector_index_type) == "VectorIndexType.DYNAMIC"
), "Wrong index type"

######################
### ENABLE DYNAMIC ###
######################

# Delete data from prior runs
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START ConfigDynamic
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
    ),
    # Configure vectorizer, properties
)
# END ConfigDynamic

collection = client.collections.get(collection_name)
collections_response = client.collections.list_all()
schema_response = collection.config.get()

assert collection_name in collections_response.keys(), "Collection missing"
assert (
    str(schema_response.vector_index_type) == "VectorIndexType.DYNAMIC"
), "Wrong index type"

################
### CLEAN UP ###
################

client.close()
