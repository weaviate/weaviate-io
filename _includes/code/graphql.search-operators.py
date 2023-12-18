# ========================================
# GraphQLAggregateSimple
# ========================================

import weaviate
import weaviate.classes as wvc
import os

client = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)


# Actual client instantiation
# client = weaviate.connect_to_wcs(
#     cluster_url=os.getenv("WCS_DEMO_URL"),
#     auth_credentials=weaviate.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
#     headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")},
# )


# ========================================
# GraphQLnearVector
# ========================================

collection = client.collections.get("Article")
rand_obj = collection.query.fetch_objects(limit=1, include_vector=True)
query_vector = rand_obj.objects[0].vector

# START GraphQLnearVector
collection = client.collections.get("Article")

response = collection.query.near_vector(
    near_vector=query_vector,
    distance=0.7,
    limit=5,
)

for o in response.objects:
    print(o.properties)
# END GraphQLnearVector

# TEST
assert len(response.objects) == 5


# ========================================
# GraphQLnearObject
# ========================================

collection = client.collections.get("Article")
rand_obj = collection.query.fetch_objects(limit=1, include_vector=True)
query_vector = rand_obj.objects[0].vector
object_id = rand_obj.objects[0].uuid

# START GraphQLnearObject
collection = client.collections.get("Article")

response = collection.query.near_object(
    near_object=object_id,
    distance=0.6,
    limit=5,
)

for o in response.objects:
    print(o.properties)
# END GraphQLnearObject

# TEST
assert len(response.objects) == 5


# ========================================
# GraphQLnearText2
# ========================================

# START GraphQLnearText2
collection = client.collections.get("Article")

response = collection.query.near_text(
    query="travelling in Asia",
    certainty=0.7,
    move_to=wvc.Move(
        force=0.75,
        objects="c4209549-7981-3699-9648-61a78c2124b9"
    ),
    return_metadata=wvc.MetadataQuery(certainty=True),
    limit=5,
)

for o in response.objects:
    print(o.properties)
    print(o.metadata.certainty)
# END GraphQLnearText2

# TEST
assert len(response.objects) == 5


# ========================================
# GraphQLSemanticPath
# ========================================

'''
# START GraphQLSemanticPath
# Semantic path is not supported by the V4 client. Please use a raw GraphQL query instead.
response = client.graphql_raw_query(
"""
{
  Get {
    Publication (
      nearText:{
        concepts: ["fashion"],
        distance: 0.6,
        moveAwayFrom: {
          concepts: ["finance"],
          force: 0.45
        },
        moveTo: {
          concepts: ["haute couture"],
          force: 0.85
        }
      }
    ) {
      name
      _additional {
        semanticPath {
          path {
            concept
            distanceToNext
            distanceToPrevious
            distanceToQuery
            distanceToResult
          }
        }
      }
    }
  }
}
"""
)
# END GraphQLSemanticPath
'''


# ========================================
# GraphQLHybridSearch
# ========================================

# START GraphQLHybridSearch
collection = client.collections.get("Article")

response = collection.query.hybrid(
    query="Fisherman that catches salmon",
    alpha=0.5,
    return_metadata=wvc.MetadataQuery(score=True, explain_score=True),
    limit=5,
)

for o in response.objects:
    print(o.properties)
    print(o.metadata.score)
    print(o.metadata.explain_score)
# END GraphQLHybridSearch

    # TEST
    assert len(o.metadata.score) > 0


# ========================================
# GraphQLHybridWithVector
# ========================================

collection = client.collections.get("Article")
rand_obj = collection.query.fetch_objects(limit=1, include_vector=True)
query_vector = rand_obj.objects[0].vector


# START GraphQLHybridWithVector
collection = client.collections.get("Article")

response = collection.query.hybrid(
    query="Fisherman that catches salmon",
    vector=query_vector,
    alpha=0.5,
    return_metadata=wvc.MetadataQuery(score=True, explain_score=True),
    limit=5,
)

for o in response.objects:
    print(o.properties)
    print(o.metadata.score)
    print(o.metadata.explain_score)
# END GraphQLHybridWithVector

    # TEST
    assert len(o.metadata.score) > 0
