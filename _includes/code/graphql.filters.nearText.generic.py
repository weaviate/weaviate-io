# START-ANY
import weaviate
import weaviate.classes as wvc
from weaviate.classes.query import Move
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
