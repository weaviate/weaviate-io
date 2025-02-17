# START ConnectToWeaviate
import os
import weaviate

# END ConnectToWeaviate
# START ColBERTCollectionConfig  # START UserEmbeddingCollectionConfig
from weaviate.classes.config import Configure, Property, DataType
from weaviate.util import generate_uuid5

# END ColBERTCollectionConfig  # END UserEmbeddingCollectionConfig

# START ConnectToWeaviate
# Recommended: save sensitive data as environment variables
jinaai_key = os.getenv("JINAAI_APIKEY")

client = weaviate.connect_to_local(
    headers={"X-JinaAI-Api-Key": jinaai_key}
)
# END ConnectToWeaviate

# START ObtainColBERTEmbedding
def get_colbert_embedding(source_text: str):
    # As shown in https://jina.ai/api-dashboard/embedding
    # For this example, this only retrieves one embedding at a time
    import requests
    import json

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {jinaai_key}",
    }

    data = {
        "model": "jina-colbert-v2",
        "dimensions": 128,
        "input_type": "document",
        "embedding_type": "float",
        "input": [source_text],
    }

    response = requests.post(
        "https://api.jina.ai/v1/multi-vector", headers=headers, data=json.dumps(data)
    )

    response_data = json.loads(response.text)
    embedding = response_data["data"][0]["embeddings"]
    return embedding
# END ObtainColBERTEmbedding

# START ColBERTCollectionConfig  # START UserEmbeddingCollectionConfig
collection_name = "DemoCollection"

# END ColBERTCollectionConfig  # END UserEmbeddingCollectionConfig

# Clean slate - delete the collection if it already exists
client.collections.delete(collection_name)

# START ColBERTCollectionConfig
client.collections.create(
    collection_name,
    vectorizer_config=[
        # highlight-start
        # ColBERT vectorizer
        Configure.NamedVectors.text2colbert_jinaai(
            name="multi_vector",
            source_properties=["text"],
            model="jina-colbert-v2"
        ),
        # highlight-end
    ],
    properties=[
        Property(name="text", data_type=DataType.TEXT),
        Property(name="docid", data_type=DataType.TEXT),
    ],
    # Additional parameters not shown
)
# END ColBERTCollectionConfig

# START ColBERTImport
# An example dataset
documents = [
    {"id": "doc1", "text": "Weaviate is a vector database that is great for AI app builders."},
    {"id": "doc2", "text": "PyTorch is a deep learning framework that is great for AI model builders."},
    {"id": "doc3", "text": "For people building AI driven products, Weaviate is a good database for their tech stack."},
]

collection = client.collections.get(collection_name)

with collection.batch.fixed_size(batch_size=10) as batch:
    for doc in documents:
        # Iterate through the dataset & add to batch
        batch.add_object(
            properties={"text": doc["text"], "docid": doc["id"]},
            uuid=generate_uuid5(doc["id"]),
        )

# Check for errors in batch imports
if collection.batch.failed_objects:
    print(f"Number of failed imports: {len(collection.batch.failed_objects)}")
    print(f"First failed object: {collection.batch.failed_objects[0]}")

print(len(collection))  # This should print `3``
# END ColBERTImport

# START ColBERTCheckEmbeddings
response = collection.query.fetch_objects(limit=3, include_vector=True)

print(f"Embedding data type: {type(response.objects[0].vector['multi_vector'])}")
print(f"Embedding first element type: {type(response.objects[0].vector['multi_vector'][0])}")
for i in range(3):
    # Inspect the shape of the fetched embeddings
    print(f"This embedding's shape is ({len(response.objects[i].vector['multi_vector'])}, {len(response.objects[i].vector['multi_vector'][0])})")
print()
# END ColBERTCheckEmbeddings

# START ColBERTNearText
response = collection.query.near_text(
    query="A good database for AI app builders",
    target_vector="multi_vector",
)

for result in response.objects:
    print(result.properties)
# END ColBERTNearText

# START ColBERTHybrid
response = collection.query.hybrid(
    query="A good database for AI app builders",
    target_vector="multi_vector",
)

for result in response.objects:
    print(result.properties)
# END ColBERTHybrid

# START ColBERTVector
response = collection.query.near_vector(
    near_vector=get_colbert_embedding("A good database for AI app builders"),  # Raw ColBERT embedding, in [[e11, e12, e13, ...], [e21, e22, e23, ...], ...] shape
    target_vector="multi_vector",
)

for result in response.objects:
    print(result.properties)
# END ColBERTVector

# START ColBERTManualHybrid
response = collection.query.hybrid(
    query="A good database for AI app builders",
    vector=get_colbert_embedding("A good database for AI app builders"),  # Or any other raw ColBERT embedding
    target_vector="multi_vector",
)

for result in response.objects:
    print(result.properties)
# END ColBERTManualHybrid

# Clean slate - delete the collection if it already exists
client.collections.delete(collection_name)

# START UserEmbeddingCollectionConfig
client.collections.create(
    collection_name,
    vectorizer_config=[
        # highlight-start
        # User-provided embeddings
        Configure.NamedVectors.none(
            name="multi_vector",
            vector_index_config=Configure.VectorIndex.hnsw(
                # Enable multi-vector index with default settings
                multi_vector=Configure.VectorIndex.MultiVector.multi_vector()
            )
        ),
        # highlight-end
    ],
    properties=[
        Property(name="text", data_type=DataType.TEXT),
        Property(name="docid", data_type=DataType.TEXT),
    ],
    # Additional parameters not shown
)
# END UserEmbeddingCollectionConfig

# START UserEmbeddingImport
# An example dataset
documents = [
    {"id": "doc1", "text": "Weaviate is a vector database that is great for AI app builders."},
    {"id": "doc2", "text": "PyTorch is a deep learning framework that is great for AI model builders."},
    {"id": "doc3", "text": "For people building AI driven products, Weaviate is a good database for their tech stack."},
]

collection = client.collections.get(collection_name)

with collection.batch.fixed_size(batch_size=10) as batch:
    for doc in documents:
        # Iterate through the dataset & add to batch
        batch.add_object(
            properties={"text": doc["text"], "docid": doc["id"]},
            uuid=generate_uuid5(doc["id"]),
            vector=get_colbert_embedding(doc["text"]),  # Provide the embedding manually
        )

# Check for errors in batch imports
if collection.batch.failed_objects:
    print(f"Number of failed imports: {len(collection.batch.failed_objects)}")
    print(f"First failed object: {collection.batch.failed_objects[0]}")

print(len(collection))  # This should print `3``
# END UserEmbeddingImport

# START UserEmbeddingHybrid
response = collection.query.hybrid(
    query="A good database for AI app builders",
    vector=get_colbert_embedding("A good database for AI app builders"),  # Or any other raw ColBERT embedding
    target_vector="multi_vector",
)

for result in response.objects:
    print(result.properties)
# END UserEmbeddingHybrid

client.close()
