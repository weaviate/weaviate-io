from uuid import UUID
import os

# START connectionCode
import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_wcs(
    cluster_url="https://hha2nvjsruetknc5vxwrwa.c0.europe-west2.gcp.weaviate.cloud",  # Demo instance URL
    auth_credentials=weaviate.auth.AuthApiKey("nMZuw1z1zVtnjkXXOMGx9Ows7YWGsakItdus"),  # Read-only key
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key (for vector and hybrid searches)
)
# END connectionCode

# START nearTextExample
questions = client.collections.get("JeopardyQuestion")
response = questions.query.near_text(
    query="space travel",  # Your query string
    limit=2
)

for o in response.objects:
    print(o.uuid)
    print(o.properties)
# END nearTextExample

assert len(response.objects) == 2
assert "question" in response.objects[0].properties.keys()


response = questions.query.near_text(
    query="space travel",
    limit=1,
    include_vector=True
)
vector_input = response.objects[0].vector
object_input = response.objects[0].uuid

# START nearVectorExample
questions = client.collections.get("JeopardyQuestion")
response = questions.query.near_vector(
    near_vector=vector_input,  # Your vector object
    limit=2
)

for o in response.objects:
    print(o.uuid)
    print(o.properties)
# END nearVectorExample

assert len(response.objects) == 2
assert "question" in response.objects[0].properties.keys()


# START nearObjectExample
questions = client.collections.get("JeopardyQuestion")
response = questions.query.near_object(
    near_object=object_input,  # Your object UUID
    limit=2
)

for o in response.objects:
    print(o.uuid)
    print(o.properties)
# END nearObjectExample

assert len(response.objects) == 2
assert "question" in response.objects[0].properties.keys()


# START bm25Example
questions = client.collections.get("JeopardyQuestion")
response = questions.query.bm25(
    query="space travel",  # Your query string
    limit=2
)

for o in response.objects:
    print(o.uuid)
    print(o.properties)
# END bm25Example

assert len(response.objects) == 2
assert "question" in response.objects[0].properties.keys()


# START hybridExample
questions = client.collections.get("JeopardyQuestion")
response = questions.query.hybrid(
    query="space travel",  # Your query string
    limit=2
)

for o in response.objects:
    print(o.uuid)
    print(o.properties)
# END hybridExample

assert len(response.objects) == 2
assert "question" in response.objects[0].properties.keys()
