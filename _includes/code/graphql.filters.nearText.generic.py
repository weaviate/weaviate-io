# START-ANY
import weaviate
import weaviate.classes as wvc
from weaviate.collections.classes.grpc import Move
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

# START-ANY
    publications = client.collections.get("Publication")

    response = publications.query.near_text(
        query="fashion",
        distance=0.6,
        move_to=Move(force=0.85, concepts="haute couture"),
        move_away=Move(force=0.45, concepts="finance"),
        return_metadata=wvc.query.MetadataQuery(distance=True),
        limit=2
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata)
# END-ANY

# START-ANY

finally:
    client.close()
# END-ANY