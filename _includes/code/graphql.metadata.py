# START-ANY
import weaviate
import weaviate.classes as wvc
import os

client = weaviate.connect_to_local()

# END-ANY


# Actual client instantiation
client.close()

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
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
