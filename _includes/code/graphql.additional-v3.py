import weaviate
import json

client = weaviate.Client(
    'https://edu-demo.weaviate.network',
    auth_client_secret=weaviate.auth.AuthApiKey('learn-weaviate'),
)


def test_gqlresponse(response_in, gqlresponse_in):
    for i, result in enumerate(response_in['data']['Get']['JeopardyQuestion']):
        assert result['question'] == gqlresponse_in['data']['Get']['JeopardyQuestion'][i]['question']


# ===================
# ===== Sorting =====
# ===================
# START Sorting Python
response = (
    client.query
    .get('JeopardyQuestion', ['question', 'answer'])
    # highlight-start
    .with_sort({
        'path': ['answer'],
        'order': 'asc',
    })
    # highlight-end
    .with_limit(3)
    .do()
)

print(json.dumps(response, indent=2))
# END Sorting Python
assert response['data']['Get']['JeopardyQuestion'][0]['answer'] == '$5 (Lincoln Memorial in the background)'

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
gqlresponse = client.query.raw(gql_query)
print(json.dumps(gqlresponse, indent=2))
test_gqlresponse(response, gqlresponse)


# ==========================================
# ===== Sorting by multiple properties =====
# ==========================================
# START MultiplePropSorting Python
response = (
    client.query
    .get('JeopardyQuestion', ['question', 'answer', 'points'])
    # highlight-start
    .with_sort([
        {
            'path': ['points'],
            'order': 'desc',
        },
        {
            'path': ['question'],
            'order': 'asc',
        }
    ])
    # highlight-end
    .with_limit(3)
    .do()
)

print(json.dumps(response, indent=2))
# END MultiplePropSorting Python
assert response['data']['Get']['JeopardyQuestion'][0]['points'] == 10000
assert response['data']['Get']['JeopardyQuestion'][0]['question'].startswith('A flurry of ballerinas')

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
gqlresponse = client.query.raw(gql_query)
test_gqlresponse(response, gqlresponse)


# ===========================================
# ===== Sorting by _additional property =====
# ===========================================
# START AdditionalPropSorting Python
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
assert 'creationTimeUnix' in response['data']['Get']['JeopardyQuestion'][0]['_additional']

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
gqlresponse = client.query.raw(gql_query)
test_gqlresponse(response, gqlresponse)
