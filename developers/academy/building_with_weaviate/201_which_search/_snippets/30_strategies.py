from uuid import UUID
import os
import weaviate
import weaviate.classes as wvc
import json


client = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)


client.collections.delete("Product")

# START skipVectorizationExample
products = client.collections.create(
    name="Product",
    vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(
        # highlight-start
        vectorize_collection_name=True
        # highlight-end
        ),
    properties=[
        wvc.config.Property(
            name="name",
            data_type=wvc.config.DataType.TEXT,
            # highlight-start
            vectorize_property_name=True,
            # highlight-end
        ),
        wvc.config.Property(
            name="description",
            data_type=wvc.config.DataType.TEXT,
        ),
        wvc.config.Property(
            name="manufacturing_process",
            data_type=wvc.config.DataType.TEXT,
            # highlight-start
            skip_vectorization=True  # Skip unwanted property
            # highlight-end
        ),
    ]
)
# END skipVectorizationExample

client.collections.delete("Product")



client.collections.delete("SomeCollection")

# START tokenizationExample
things = client.collections.create(
    name="SomeCollection",
    properties=[
        wvc.config.Property(
            name="name",
            data_type=wvc.config.DataType.TEXT,
            # highlight-start
            tokenization=wvc.config.Tokenization.WORD  # Default
            # highlight-end
        ),
        wvc.config.Property(
            name="description",
            data_type=wvc.config.DataType.TEXT,
            tokenization=wvc.config.Tokenization.WHITESPACE  # Will keep case & special characters
        ),
        wvc.config.Property(
            name="email",
            data_type=wvc.config.DataType.TEXT,
            # highlight-start
            tokenization=wvc.config.Tokenization.FIELD  # Do not tokenize at all
            # highlight-end
        ),
    ]
)
# END tokenizationExample

client.collections.delete("SomeCollection")


client = weaviate.connect_to_wcs(
    cluster_url="https://hha2nvjsruetknc5vxwrwa.c0.europe-west2.gcp.weaviate.cloud",
    auth_credentials=weaviate.auth.AuthApiKey("nMZuw1z1zVtnjkXXOMGx9Ows7YWGsakItdus"),
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)

# START selectAndBoostExample
questions = client.collections.get("JeopardyQuestion")

response = questions.query.bm25(
    "animal",
    limit=5,
    query_properties=["question^3", "answer"]  # Boost the impact of "question" property by 3
)

for o in response.objects:
    print(o.properties)
# END selectAndBoostExample


# START adjustAlpha
questions = client.collections.get("JeopardyQuestion")

response = questions.query.hybrid(
    "imaging",
    alpha=0.1,  # Mostly a vector search (Try it with alpha=0.9)
    limit=5
)

for o in response.objects:
    print(o.properties)
# END adjustAlpha


# START changeFusionType
questions = client.collections.get("JeopardyQuestion")

response = questions.query.hybrid(
    "imaging",
    fusion_type=wvc.query.HybridFusion.RELATIVE_SCORE,  # Use relative score fusion
    limit=5
)

for o in response.objects:
    print(o.properties)
# END changeFusionType
