import weaviate
# BQBasicConfig  # BQCustomConfig
from weaviate.classes.config import Configure, DataType, Property
# END BQBasicConfig  # BQCustomConfig
from weaviate.collections.classes.config import BQEncoderType, BQEncoderDistribution
# END BQCustomConfig

client = weaviate.connect_to_local()

# BQBasicConfig  # BQCustomConfig

# Client instantiation not shown
collection_name = "BQExampleCollection"

# END BQBasicConfig  # END BQCustomConfig

# BQBasicConfig
client.collections.create(
    name=collection_name,
    # END BQBasicConfig
    properties=[
        Property(name="title", data_type=DataType.TEXT)
    ],
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    # BQBasicConfig
    # Other configuration not shown
    # highlight-start
    vector_index_config=Configure.VectorIndex.hnsw(
        quantizer=Configure.VectorIndex.Quantizer.bq()
    ),
    # highlight-end
)
# END BQBasicConfig



# BQCustomConfig
client.collections.create(
    name=collection_name,
    # END BQCustomConfig
    properties=[
        Property(name="title", data_type=DataType.TEXT)
    ],
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    # BQCustomConfig
    # Other configuration not shown
    # highlight-start
    vector_index_config=Configure.VectorIndex.hnsw(
        quantizer=Configure.VectorIndex.Quantizer.bq(
            rescore_limit=200
        )
    ),
    # highlight-end
)
# END BQCustomConfig