# START-ANY
import weaviate
import weaviate.classes as wvc
from weaviate.collections.classes.grpc import Move
import os

client = weaviate.connect_to_local()

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

client.close()
# END-ANY