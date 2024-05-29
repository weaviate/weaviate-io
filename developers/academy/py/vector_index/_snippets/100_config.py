import weaviate
# START ConfigHNSW  # START CustomConfigHNSW
from weaviate.classes.config import Configure, VectorDistances

# END ConfigHNSW  # END CustomConfigHNSW

client = weaviate.connect_to_local()

collection_name = "CollectionWithHNSW"

client.collections.delete(name=collection_name)

# START ConfigHNSW
client.collections.create(
    name=collection_name,
    # ... other parameters
    # highlight-start
    vector_index_config=Configure.VectorIndex.hnsw()
    # highlight-end
)
# END ConfigHNSW

client.collections.delete(name=collection_name)

# START CustomConfigHNSW
client.collections.create(
    name=collection_name,
    # ... other parameters
    # highlight-start
    vector_index_config=Configure.VectorIndex.hnsw(
        # Distance metric
        distance_metric=VectorDistances.COSINE,
        # Parameters for HNSW index construction
        ef_construction=256,    # Dynamic list size during construction
        max_connections=128,    # Maximum number of connections per node
        quantizer=Configure.VectorIndex.Quantizer.bq(), # Quantizer configuration
        # Parameters for HNSW search
        ef=-1,                  # Dynamic list size during search; -1 enables dynamic Ef
        dynamic_ef_factor=15,   # Multiplier for dynamic Ef
        dynamic_ef_min=200,     # Minimum threshold for dynamic Ef
        dynamic_ef_max=1000,    # Maximum threshold for dynamic Ef
    )
    # highlight-end
)
# END CustomConfigHNSW

client.close()
