# TEST DISABLED - sandbox needed

# import weaviate
# import json

# client = weaviate.Client(
#     'https://edu-demo.weaviate.network',
#     auth_client_secret=weaviate.AuthApiKey('learn-weaviate'),
# )


# def test_gqlresponse(response_in, gqlresponse_in):
#     for i, result in enumerate(response_in['data']['Get']['JeopardyQuestion']):
#         assert result['question'] == gqlresponse_in['data']['Get']['JeopardyQuestion'][i]['question']


# ===================
# ===== Sorting =====
# ===================
# START Sorting Python
from weaviate.collections.classes.grpc import Sort
  
article=client.collections.get("JeopardyQuestion")
response = article.query.fetch_objects(
    # highlight-start
    sort=Sort(prop="answer", ascending=True),
    # highlight-end
    limit=3
)  

for o in response.objects:
    print( f"Answer: {o.properties['answer']}")
    print( f"Points: {o.properties['points']}")
    print( f"Question: {o.properties['question']}")
# END Sorting Python

# TEST DISABLED - sandbox needed
# assert response['data']['Get']['JeopardyQuestion'][0]['answer'] == '$5 (Lincoln Memorial in the background)'

gql_query = """
# START Sorting GraphQL
{
  Get {
    JeopardyQuestion(
      # highlight-start
      sort: {
        path: ["answer"]  # Path to the property to sort by
        order: asc        # Sort order, asc (default) or desc
      }
      # highlight-end
      limit: 3
    ) {
      question
      answer
    }
  }
}
# END Sorting GraphQL
"""

# gqlresponse = client.query.raw(gql_query)
# print(json.dumps(gqlresponse, indent=2))
# test_gqlresponse(response, gqlresponse)


# ==========================================
# ===== Sorting by multiple properties =====
# ==========================================
# START MultiplePropSorting Python
from weaviate.collections.classes.grpc import Sort
  
article=client.collections.get("JeopardyQuestion")
response = article.query.fetch_objects(
    sort=[Sort(prop="points", ascending=False),
          Sort(prop="answer", ascending=True)
         ],
    limit=3
)

for o in response.objects:
    print( f"Answer: {o.properties['answer']}")
    print( f"Points: {o.properties['points']}")
    print( f"Question: {o.properties['question']}")
# END MultiplePropSorting Python

# TEST DISABLED - sandbox needed
# assert response['data']['Get']['JeopardyQuestion'][0]['points'] == 10000
# assert response['data']['Get']['JeopardyQuestion'][0]['question'].startswith('A flurry of ballerinas')

gql_query = """
# START MultiplePropSorting GraphQL
{
  Get {
    JeopardyQuestion(
      # highlight-start
      sort: [
        {
          path: "points"
          order: desc
        },
        {
          path: "question"
          order: asc
        }
      ]
      # highlight-end
      limit: 3
    ) {
      question
      answer
      points
    }
  }
}
# END MultiplePropSorting GraphQL
"""

# TEST DISABLED - sandbox needed
# gqlresponse = client.query.raw(gql_query)
# test_gqlresponse(response, gqlresponse)


# ===========================================
# ===== Sorting by _additional property =====
# ===========================================
# START AdditionalPropSorting Python
return_metadata=wvc.MetadataQuery(creation_time_unix=True)

response = (
    client.query
    .get('JeopardyQuestion', ['question', 'answer'])
    .with_additional('creationTimeUnix')
    .with_sort({
        # highlight-start
        'path': ['_creationTimeUnix'],
        'order': 'asc'
        # highlight-end
    })
    .with_limit(3)
    .do()
)

print(json.dumps(response, indent=2))
# END AdditionalPropSorting Python

# TEST DISABLED - sandbox needed
# assert 'creationTimeUnix' in response['data']['Get']['JeopardyQuestion'][0]['_additional']

gql_query = """
# START AdditionalPropSorting GraphQL
{
  Get {
    JeopardyQuestion(
      sort: [
        {
          # highlight-start
          path: ["_creationTimeUnix"],
          # highlight-end
        }
      ]
      limit: 3
    ) {
      question
      answer
      _additional {
        creationTimeUnix
      }
    }
  }
}
# END AdditionalPropSorting GraphQL
"""

# TEST DISABLED - sandbox needed
# gqlresponse = client.query.raw(gql_query)
# test_gqlresponse(response, gqlresponse)
