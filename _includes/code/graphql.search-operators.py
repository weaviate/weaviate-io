# ========================================
# GraphQLAggregateSimple
# ========================================

# START-ANY
import weaviate
import weaviate.classes as wvc
import os

client = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)

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
  # GraphQLnearVector
  # ========================================

  collection = client.collections.get("Article")
  rand_obj = collection.query.fetch_objects(limit=1, include_vector=True)
  query_vector = rand_obj.objects[0].vector["default"]

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
  query_vector = rand_obj.objects[0].vector["default"]
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
      move_to=wvc.query.Move(
          force=0.75,
          objects="c4209549-7981-3699-9648-61a78c2124b9"
      ),
      return_metadata=wvc.query.MetadataQuery(certainty=True),
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
  # Semantic path is not yet supported by the V4 client. Please use a raw GraphQL query instead.
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
      return_metadata=wvc.query.MetadataQuery(score=True, explain_score=True),
      limit=5,
  )

  for o in response.objects:
      print(o.properties)
      print(o.metadata.score)
      print(o.metadata.explain_score)
  # END GraphQLHybridSearch

      # TEST
      assert o.metadata.score > 0


  # ========================================
  # GraphQLHybridWithVector
  # ========================================

  collection = client.collections.get("Article")
  rand_obj = collection.query.fetch_objects(limit=1, include_vector=True)
  query_vector = rand_obj.objects[0].vector["default"]


  # START GraphQLHybridWithVector
  collection = client.collections.get("Article")

  response = collection.query.hybrid(
      query="Fisherman that catches salmon",
      vector=query_vector,
      alpha=0.5,
      return_metadata=wvc.query.MetadataQuery(score=True, explain_score=True),
      limit=5,
  )

  for o in response.objects:
      print(o.properties)
      print(o.metadata.score)
      print(o.metadata.explain_score)
  # END GraphQLHybridWithVector

      # TEST
      assert o.metadata.score > 0


  # ========================================
  # GraphQLHybridWithFilter
  # ========================================

  # START GraphQLHybridWithFilter
  collection = client.collections.get("Article")

  response = collection.query.hybrid(
      query="How to catch an Alaskan Pollock",
      alpha=0.5,
      filters=wvc.query.Filter.by_property("wordCount").less_than(1000),
      limit=5,
  )

  for o in response.objects:
      print(o.properties)
  # END GraphQLHybridWithFilter

  # TEST
  assert len(response.objects) == 5


  # ========================================
  # GraphQLHybridWithPropertiesSpecified
  # ========================================

  # START GraphQLHybridWithPropertiesSpecified
  collection = client.collections.get("JeopardyQuestion")

  response = collection.query.hybrid(
      query="Venus",
      alpha=0.25,
      query_properties=["question"],
      return_metadata=wvc.query.MetadataQuery(score=True),
      limit=5,
  )

  for o in response.objects:
      print(o.properties)
      print(o.metadata.score)
  # END GraphQLHybridWithPropertiesSpecified

  # TEST
  assert len(response.objects) == 5


  # ========================================
  # GraphQLBM25Basic
  # ========================================

  # START GraphQLBM25Basic
  collection = client.collections.get("Article")

  response = collection.query.bm25(
      query="fox",
      query_properties=["title"],
      return_metadata=wvc.query.MetadataQuery(score=True),
      limit=5,
  )

  for o in response.objects:
      print(o.properties)
      print(o.metadata.score)
  # END GraphQLBM25Basic

  # TEST
  assert len(response.objects) == 5


  # ========================================
  # GraphQLBM25WithFilter
  # ========================================

  # START GraphQLBM25WithFilter
  collection = client.collections.get("Article")

  response = collection.query.bm25(
      query="how to fish",
      return_metadata=wvc.query.MetadataQuery(score=True),
      filters=wvc.query.Filter.by_property("wordCount").less_than(1000),
      limit=5,
  )

  for o in response.objects:
      print(o.properties)
      print(o.metadata.score)
  # END GraphQLBM25WithFilter

  # TEST
  assert len(response.objects) == 5


  # ========================================
  # GraphQLQnAExample
  # ========================================

  '''
  # START GraphQLQnAExample
  # QnA module use is not yet supported by the V4 client. Please use a raw GraphQL query instead.
  response = client.graphql_raw_query(
  """
  {
    Get {
      Article(
        ask: {
          question: "Who is the king of the Netherlands?",
          properties: ["summary"],
        },
        limit: 1
      ) {
        title
        _additional {
          answer {
            hasAnswer
            property
            result
            startPosition
            endPosition
          }
        }
      }
    }
  }
  """
  # END GraphQLQnAExample
  '''

# START-ANY

finally:
  client.close()
# END-ANY