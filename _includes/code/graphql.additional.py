# TESTS NEED TO BE UPDATED

import json

# START-ANY
import os
import weaviate
import weaviate.classes as wvc
from weaviate.collections.classes.grpc import Sort

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

def test_gqlresponse(response_in, gqlresponse_in):
    for i, result in enumerate(response_in['data']['Get']['JeopardyQuestion']):
        assert result['question'] == gqlresponse_in['data']['Get']['JeopardyQuestion'][i]['question']


# ===================
# ===== Sorting =====
# ===================

# START Sorting Python
article=client.collections.get("JeopardyQuestion")
response = article.query.fetch_objects(
    # highlight-start
    sort=Sort.by_property(name="answer", ascending=True),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(f"Answer: {o.properties['answer']}")
    print(f"Points: {o.properties['points']}")
    print(f"Question: {o.properties['question']}")
# END Sorting Python

assert response.objects[0].properties['answer'] == '$5 (Lincoln Memorial in the background)'


# ==========================================
# ===== Sorting by multiple properties =====
# ==========================================

# START MultiplePropSorting Python
article=client.collections.get("JeopardyQuestion")
response = article.query.fetch_objects(
    sort=[Sort.by_property(prop="points", ascending=False),
          Sort.by_property(prop="answer", ascending=True)],
    limit=3
)

for o in response.objects:
    print(f"Answer: {o.properties['answer']}")
    print(f"Points: {o.properties['points']}")
    print(f"Question: {o.properties['question']}")
# END MultiplePropSorting Python

# TODO FIX TEST
assert response.objects[0].properties["points"] == 10000
# assert response['data']['Get']['JeopardyQuestion'][0]['question'].startswith('A flurry of ballerinas')


# ===========================================
# ===== Sorting by _additional property =====
# ===========================================

# START AdditionalPropSorting Python
article=client.collections.get("JeopardyQuestion")
response = article.query.fetch_objects(
    return_metadata=wvc.query.MetadataQuery(creation_time=True),
    sort=Sort.by_property(ascending=True, prop="_creationTimeUnix"),
    limit=3
)

for o in response.objects:
    print(f"Answer: {o.properties['answer']}")
    print(f"Points: {o.properties['points']}")
    print(f"Question: {o.properties['question']}")
    print(f"Creation time: {o.metadata.creation_time}")
# END AdditionalPropSorting Python

assert response.objects[0].metadata.creation_time != None

# START-ANY

client.close()
# END-ANY