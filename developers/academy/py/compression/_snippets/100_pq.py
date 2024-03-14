import weaviate
# PQBasicConfig  # PQCustomConfig
from weaviate.classes.config import Configure, DataType, Property
# END PQBasicConfig  # PQCustomConfig
from weaviate.collections.classes.config import PQEncoderType, PQEncoderDistribution
# END PQCustomConfig

client = weaviate.connect_to_local()

# PQBasicConfig  # PQCustomConfig

# Client instantiation not shown
collection_name = "PQExampleCollection"

# END PQBasicConfig  # END PQCustomConfig

# PQBasicConfig
client.collections.create(
    name=collection_name,
    # END PQBasicConfig
    properties=[
        Property(name="title", data_type=DataType.TEXT)
    ],
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    # PQBasicConfig
    # Other configuration not shown
    # highlight-start
    vector_index_config=Configure.VectorIndex.hnsw(
        quantizer=Configure.VectorIndex.Quantizer.pq()
    ),
    # highlight-end
)
# END PQBasicConfig



# PQCustomConfig
client.collections.create(
    name=collection_name,
    # END PQCustomConfig
    properties=[
        Property(name="title", data_type=DataType.TEXT)
    ],
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    # PQCustomConfig
    # Other configuration not shown
    # highlight-start
    vector_index_config=Configure.VectorIndex.hnsw(
        quantizer=Configure.VectorIndex.Quantizer.pq(
            segments=512,
            centroids=512,
            training_limit=50000,
            encoder_distribution=PQEncoderDistribution.NORMAL,
            encoder_type=PQEncoderType.TILE,
        )
    ),
    # highlight-end
)
# END PQCustomConfig