import weaviate
# BQBasicConfig  # BQCustomConfig
from weaviate.classes.config import Configure, DataType, Property
# END BQBasicConfig  # BQCustomConfig

from weaviate.classes.config import BQConfig

client = weaviate.connect_to_local()

print(client.get_meta())
print(weaviate.__version__)

# BQBasicConfig  # BQCustomConfig

# Client instantiation not shown
collection_name = "BQExampleCollection"

# END BQBasicConfig  # END BQCustomConfig

client.collections.delete(collection_name)

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


# Confirm creation
c = client.collections.get(collection_name)
coll_config = c.config.get()
assert type(coll_config.vector_index_config.quantizer) == BQConfig


client.collections.delete(collection_name)

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
            rescore_limit=150
        )
    ),
    # highlight-end
)
# END BQCustomConfig

c = client.collections.get(collection_name)
coll_config = c.config.get()
assert type(coll_config.vector_index_config.quantizer) == BQConfig
# assert coll_config.vector_index_config.quantizer.rescore_limit == 150  # appears to be a bug


# START-ANY

client.close()
# END-ANY
