from uuid import UUID
import os
import weaviate
import weaviate.classes as wvc
import json

client = weaviate.connect_to_wcs(
    cluster_url="https://hha2nvjsruetknc5vxwrwa.c0.europe-west2.gcp.weaviate.cloud",
    auth_credentials=weaviate.auth.AuthApiKey("nMZuw1z1zVtnjkXXOMGx9Ows7YWGsakItdus"),
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)


# START robustnessExampleWords
for query in ["cat", "kitten"]:
    questions = client.collections.get("JeopardyQuestion")
    response = questions.query.near_text(
        query=query,
        limit=1,
        return_metadata=wvc.query.MetadataQuery(distance=True),
        return_properties=["question", "answer"]
    )

    for o in response.objects:
        print(f"\n===== Search results for {query} =====")
        print(f"Distance: {o.metadata.distance:.3f}")
        print(json.dumps(o.properties, indent=2))
# END robustnessExampleWords

assert len(response.objects) == 1
assert "question" in response.objects[0].properties.keys()


"""
# START responseRobustnessExampleWords
===== Search results for cat =====
Distance: 0.170
{
  "answer": "Fat cat",
  "question": "A flabby tabby"
}

===== Search results for kitten =====
Distance: 0.150
{
  "answer": "Fat cat",
  "question": "A flabby tabby"
}
# END responseRobustnessExampleWords
"""



# START robustnessExampleSpelling
for query in ["cat", "catt", "caat"]:
    questions = client.collections.get("JeopardyQuestion")
    response = questions.query.near_text(
        query=query,
        limit=1,
        return_metadata=wvc.query.MetadataQuery(distance=True),
        return_properties=["question", "answer"]
    )

    for o in response.objects:
        print(f"\n===== Search results for {query} =====")
        print(f"Distance: {o.metadata.distance:.3f}")
        print(json.dumps(o.properties, indent=2))
# END robustnessExampleSpelling

assert len(response.objects) == 1
assert "question" in response.objects[0].properties.keys()


"""
# START responseRobustnessExampleSpelling
===== Search results for cat =====
Distance: 0.170
{
  "answer": "Fat cat",
  "question": "A flabby tabby"
}

===== Search results for catt =====
Distance: 0.177
{
  "answer": "Fat cat",
  "question": "A flabby tabby"
}

===== Search results for caat =====
Distance: 0.184
{
  "answer": "Fat cat",
  "question": "A flabby tabby"
}
# END responseRobustnessExampleSpelling
"""


# START bm25Example
questions = client.collections.get("JeopardyQuestion")
response = questions.query.bm25(
    query="imaging",  # Your query string
    return_properties=["question", "answer"],
    limit=2
)

for o in response.objects:
    print(o.uuid)
    print(json.dumps(o.properties, indent=2))
# END bm25Example

assert "question" in response.objects[0].properties.keys()

"""
# START bm25Results
49fe3d7c-61a5-5916-99bb-052d07c7c251
{
  "answer": "magnetic resonance imaging",
  "question": "MRI, which stands for this, cannot be used on patients with pacemakers or artificial metal joints"
}
# END bm25Results
"""


# START hybridExample
questions = client.collections.get("JeopardyQuestion")
response = questions.query.hybrid(
    query="imaging",  # Your query string
    return_properties=["question", "answer"],
    limit=2
)

for o in response.objects:
    print(o.uuid)
    print(json.dumps(o.properties, indent=2))
# END hybridExample

assert "question" in response.objects[0].properties.keys()


"""
# START hybridResults
49fe3d7c-61a5-5916-99bb-052d07c7c251
{
  "answer": "magnetic resonance imaging",
  "question": "MRI, which stands for this, cannot be used on patients with pacemakers or artificial metal joints"
}
9041bce6-b5d1-5637-bcbe-2ebb8a689fe0
{
  "answer": "X-rays",
  "question": "These electromagnetic rays used to take pictures of your insides were originally known as Roentgen rays"
}
# END hybridResults
"""