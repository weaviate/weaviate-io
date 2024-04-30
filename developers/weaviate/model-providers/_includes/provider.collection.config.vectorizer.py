import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"],
        "X-Cohere-Api-Key": os.environ["COHERE_API_KEY"],
    }
)

# START VectorizerCohere
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_cohere(
            name="default",
            # These parameters are optional
            # model="embed-multilingual-v3.0",
            # truncate="END",  # "NONE", "START" or "END"
            # vectorize_collection_name=False,
            # base_url="<custom_cohere_url>"
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END VectorizerCohere

source_objects = [
    {"title": "The Shawshank Redemption"},
    {"title": "The Godfather"},
    {"title": "The Dark Knight"},
    {"title": "Jingle All the Way"},
    {"title": "A Christmas Carol"},
]

# START BatchImportExample
collection = client.collections.get("DemoCollection")

with collection.batch.dynamic() as batch:
    for src_obj in source_objects:
        weaviate_obj = {
            "title": src_obj["title"],
        }

        # highlight-start
        # The model provider integration will automatically vectorize the object
        batch.add_object(
            properties=weaviate_obj,
            # vector=vector  # Optional, if you want to manually provide the vector
        )
        # highlight-end

# Check for failed objects
if len(collection.batch.failed_objects) > 0:
    print(f"Failed to import {len(collection.batch.failed_objects)} objects")
    for failed in collection.batch.failed_objects:
        print(f"e.g. Failed to import object with error: {failed.message}")
# END BatchImportExample

# START NearTextExample
collection = client.collections.get("DemoCollection")

# highlight-start
response = collection.query.near_text(
    query="A holiday film",  # The model provider integration will automatically vectorize the query
    limit=2
)
# highlight-end

for obj in response.objects:
    print(obj.properties["title"])
# END NearTextExample

# START HybridExample
collection = client.collections.get("DemoCollection")

# highlight-start
response = collection.query.hybrid(
    query="A holiday film",  # The model provider integration will automatically vectorize the query
    limit=2
)
# highlight-end

for obj in response.objects:
    print(obj.properties["title"])
# END HybridExample

client.close()
