# START-ANY
import weaviate
import weaviate.classes as wvc
import os

client = weaviate.connect_to_local()

# END-ANY


# Actual client instantiation
client.close()

from weaviate.classes.init import Auth

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
    headers={
        "X-OpenAI-Api-Key": openai_api_key,
    }
)

# START-ANY
try:
# END-ANY

    # ========================================
    # MetadataUUIDDistance
    # ========================================

    # START MetadataUUIDDistance
    articles = client.collections.get("Article")

    response = articles.query.near_text(
        query="fashion",
        limit=5,
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    for o in response.objects:
        print(o.metadata.distance)  # Inspect metadata
        print(o.uuid)  # Inspect UUID (returned by default)
        print(o.properties)  # Inspect returned objects
    # END MetadataUUIDDistance

# START-ANY

finally:
    client.close()
# END-ANY
