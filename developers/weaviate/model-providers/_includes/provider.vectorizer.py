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

# START BasicVectorizerCohere
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_cohere(
            name="title_vector",
            source_properties=["title"]
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerCohere

# START FullVectorizerCohere
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_cohere(
            name="title_vector",
            source_properties=["title"]
            # Further options
            # model="embed-multilingual-v3.0",
            # truncate="END",  # "NONE", "START" or "END"
            # base_url="<custom_cohere_url>"
            # vectorize_collection_name=False,
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerCohere

source_objects = [
    {"title": "The Shawshank Redemption", "description": ""},
    {"title": "The Godfather", "description": ""},
    {"title": "The Dark Knight", "description": ""},
    {"title": "Jingle All the Way", "description": ""},
    {"title": "A Christmas Carol", "description": ""},
]

# START BatchImportExample
collection = client.collections.get("DemoCollection")

with collection.batch.dynamic() as batch:
    for src_obj in source_objects:
        weaviate_obj = {
            "title": src_obj["title"],
            "description": src_obj["description"],
        }

        # highlight-start
        # The model provider integration will automatically vectorize the object
        batch.add_object(
            properties=weaviate_obj,
            # vector=vector  # Optionally provide a pre-obtained vector
        )
        # highlight-end
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
