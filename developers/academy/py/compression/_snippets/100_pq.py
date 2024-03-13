import weaviate
from weaviate.classes.config import Configure, DataType, Property

client = weaviate.connect_to_local()

client.collections.create(
    name="Question",
    properties=[
        Property(name="title", data_type=DataType.TEXT)
    ],
    vectorizer_config=Configure.Vectorizer.text2vec_transformers(),
    # Other configuration not shown
    # highlight-start
    vector_index_config=Configure.VectorIndex.hnsw(
        quantizer=Configure.VectorIndex.Quantizer.pq()
    ),
    # highlight-end
)