# Howto: Search -> Reranking - Python examples

import weaviate
import json
import os

# Instantiate the client with the OpenAI API key
client = weaviate.Client(
    'https://edu-demo.weaviate.network',
    auth_client_secret=weaviate.AuthApiKey('learn-weaviate'),
    additional_headers={
        'X-OpenAI-Api-Key': os.environ['OPENAI_API_KEY'],
        'X-Cohere-Api-Key': os.environ['COHERE_API_KEY']
    }
)

# ==================================
# ===== nearText before rerank =====
# ==================================

# START nearText Python
response = (
    client.query
    .get('JeopardyQuestion', ['question', 'answer'])
    .with_near_text({
        'concepts': ['flying']
    })
    .with_additional('distance')
    .with_limit(10)
    .do()
)

# print(json.dumps(response, indent=2))
# END nearText Python


expected_response = (
# START Expected nearText results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "distance": 0.16765535
          },
          "answer": "on their stomachs",
          "question": "W. & O. Wright felt passengers wouldn't mind flying in this position they 1st flew in themselves"
        },
        {
          "_additional": {
            "distance": 0.17469394
          },
          "answer": "flying the mail",
          "question": "In 1926 Lindbergh had to parachute out of planes 4 times while employed to do this"
        },
        {
          "_additional": {
            "distance": 0.17639679
          },
          "answer": "a hot air balloon",
          "question": "In 1783 Benjamin Franklin saw the first piloted flight of this type of transport while in Paris"
        },
        {
          "_additional": {
            "distance": 0.17872101
          },
          "answer": "a falcon",
          "question": "The fastest flying animal is the peregrine species of this bird of prey"
        },
        {
          "_additional": {
            "distance": 0.18135852
          },
          "answer": "Pterodactyl",
          "question": "The name of this prehistoric reptile, the largest known flying animal, means \"wing finger\""
        },
        {
          "_additional": {
            "distance": 0.18168795
          },
          "answer": "hot air balloons",
          "question": "These in the skies of Albuquerque on October 3, 1999 were a fine example of Charles' Law in action"
        },
        {
          "_additional": {
            "distance": 0.1847046
          },
          "answer": "Lizards",
          "question": "In the East Indies certain species of this reptile are called flying dragons because they can glide from tree to tree"
        },
        {
          "_additional": {
            "distance": 0.18559676
          },
          "answer": "a limp blimp",
          "question": "An uninflated airship"
        },
        {
          "_additional": {
            "distance": 0.18577725
          },
          "answer": "hot air balloons",
          "question": "During the Cold War, 2 different families escaped over the Berlin Wall using these lighter-than-air vehicles"
        },
        {
          "_additional": {
            "distance": 0.1866476
          },
          "answer": "a dirigible",
          "question": "In 1926 Roald Amundsen flew over the North Pole in the Norge, this type of craft"
        }
      ]
    }
  }
}
# END Expected nearText results
)

# Tests
for question in response['data']['Get']['JeopardyQuestion']:
    assert 'distance' in question['_additional']
# End test


gql_query = """
# START nearText GraphQL
{
  Get {
    JeopardyQuestion(
      nearText: {
        concepts: "flying"
      }
      limit: 10
    ) {
      answer
      question
      _additional {
        distance
      }
    }
  }
}
# END nearText GraphQL
"""

# Tests
gqlresponse = client.query.raw(gql_query)
assert [q["answer"] for q in gqlresponse["data"]["Get"]["JeopardyQuestion"]] == [q["answer"] for q in response["data"]["Get"]["JeopardyQuestion"]]


# =================================
# ===== nearText after rerank =====
# =================================

# START nearTextRerank Python
response = (
    client.query
    .get('JeopardyQuestion', ['question', 'answer'])
    .with_near_text({
        'concepts': ['flying']
    })
    # highlight-start
    .with_additional('rerank(property: "answer" query: "floating") { score }')
    # highlight-end
    .with_limit(10)
    .do()
)

# print(json.dumps(response, indent=2))
# END nearTextRerank Python


expected_response = (
# START Expected nearTextRerank results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "distance": 0.16765535,
            "rerank": [
              {
                "score": 0.357119
              }
            ]
          },
          "answer": "on their stomachs",
          "question": "W. & O. Wright felt passengers wouldn't mind flying in this position they 1st flew in themselves"
        },
        {
          "_additional": {
            "distance": 0.17639679,
            "rerank": [
              {
                "score": 0.14010079
              }
            ]
          },
          "answer": "a hot air balloon",
          "question": "In 1783 Benjamin Franklin saw the first piloted flight of this type of transport while in Paris"
        },
        {
          "_additional": {
            "distance": 0.1866476,
            "rerank": [
              {
                "score": 0.10631887
              }
            ]
          },
          "answer": "a dirigible",
          "question": "In 1926 Roald Amundsen flew over the North Pole in the Norge, this type of craft"
        },
        {
          "_additional": {
            "distance": 0.18168795,
            "rerank": [
              {
                "score": 0.096705794
              }
            ]
          },
          "answer": "hot air balloons",
          "question": "These in the skies of Albuquerque on October 3, 1999 were a fine example of Charles' Law in action"
        },
        {
          "_additional": {
            "distance": 0.18577725,
            "rerank": [
              {
                "score": 0.096705794
              }
            ]
          },
          "answer": "hot air balloons",
          "question": "During the Cold War, 2 different families escaped over the Berlin Wall using these lighter-than-air vehicles"
        },
        {
          "_additional": {
            "distance": 0.18559676,
            "rerank": [
              {
                "score": 0.037750274
              }
            ]
          },
          "answer": "a limp blimp",
          "question": "An uninflated airship"
        },
        {
          "_additional": {
            "distance": 0.17469394,
            "rerank": [
              {
                "score": 0.036977556
              }
            ]
          },
          "answer": "flying the mail",
          "question": "In 1926 Lindbergh had to parachute out of planes 4 times while employed to do this"
        },
        {
          "_additional": {
            "distance": 0.1847046,
            "rerank": [
              {
                "score": 0.014172366
              }
            ]
          },
          "answer": "Lizards",
          "question": "In the East Indies certain species of this reptile are called flying dragons because they can glide from tree to tree"
        },
        {
          "_additional": {
            "distance": 0.18135852,
            "rerank": [
              {
                "score": 0.0025809042
              }
            ]
          },
          "answer": "Pterodactyl",
          "question": "The name of this prehistoric reptile, the largest known flying animal, means \"wing finger\""
        },
        {
          "_additional": {
            "distance": 0.17872101,
            "rerank": [
              {
                "score": 0.0018386653
              }
            ]
          },
          "answer": "a falcon",
          "question": "The fastest flying animal is the peregrine species of this bird of prey"
        }
      ]
    }
  }
}
# END Expected nearTextRerank results
)

# Tests
for question in response['data']['Get']['JeopardyQuestion']:
    assert 'score' in question['_additional']['rerank'][0]
# End test


gql_query = """
# START nearTextRerank GraphQL
{
  Get {
    JeopardyQuestion(
      nearText: {
        concepts: "flying"
      }
      limit: 10
    ) {
      answer
      question
      _additional {
        distance
        # highlight-start
        rerank(
          property: "answer"
          query: "floating"
        ) {
          score
        }
        # highlight-end
      }
    }
  }
}
# END nearTextRerank GraphQL
"""

# Tests
gqlresponse = client.query.raw(gql_query)
assert [q["answer"] for q in gqlresponse["data"]["Get"]["JeopardyQuestion"]] == [q["answer"] for q in response["data"]["Get"]["JeopardyQuestion"]]


# ============================
# ===== bm25 with rerank =====
# ============================

# START bm25Rerank Python
response = (
    client.query
    .get('JeopardyQuestion', ['question', 'answer'])
    .with_bm25(
      query='paper'
    )
    # highlight-start
    .with_additional('rerank(property: "question" query: "publication") { score }')
    # highlight-end
    .with_limit(10)
    .do()
)

# print(json.dumps(response, indent=2))
# END bm25Rerank Python


expected_response = (
# START Expected bm25Rerank results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "rerank": [
              {
                "score": 0.64957863
              }
            ],
            "score": "1.917839"
          },
          "answer": "Albert Einstein",
          "question": "His 1905 paper \"On the Electrodynamics of Moving Bodies\" contained his special Theory of Relativity"
        },
        {
          "_additional": {
            "rerank": [
              {
                "score": 0.42018318
              }
            ],
            "score": "1.8317645"
          },
          "answer": "Mark Twain",
          "question": "In 1852 his story \"The Dandy Frightening the Squatter\" appeared in The Carpet-Bag, a humorous paper"
        },
        {
          "_additional": {
            "rerank": [
              {
                "score": 0.38139236
              }
            ],
            "score": "1.680885"
          },
          "answer": "Louis Pasteur",
          "question": "In 1857 this French chemist's theory of fermentation was first presented in a paper \"on Lactic Fermentation\""
        },
        {
          "_additional": {
            "rerank": [
              {
                "score": 0.14829372
              }
            ],
            "score": "1.6143973"
          },
          "answer": "Benito Mussolini",
          "question": "After being expelled as editor of the Socialist \"Avanti\" in 1914, he founded his own fascist paper"
        },
        {
          "_additional": {
            "rerank": [
              {
                "score": 0.13974822
              }
            ],
            "score": "1.917839"
          },
          "answer": "Bookworm",
          "question": "It can be a voracious reader, or a beetle larva that feeds on paper"
        },
        {
          "_additional": {
            "rerank": [
              {
                "score": 0.030214587
              }
            ],
            "score": "1.8317645"
          },
          "answer": "hot air balloon",
          "question": "In 1783 Joseph & Jacques Montgolfier, sons of a French paper bag maker, invented this"
        },
        {
          "_additional": {
            "rerank": [
              {
                "score": 0.02470387
              }
            ],
            "score": "1.7530843"
          },
          "answer": "a balloon",
          "question": "The Montgolfier brothers were papermakers by profession & used paper in their early ones of these"
        },
        {
          "_additional": {
            "rerank": [
              {
                "score": 0.018797074
              }
            ],
            "score": "1.6143973"
          },
          "answer": "New York Herald",
          "question": "This paper that had sent Stanley to find Livingstone merged with the New York Tribune in 1924"
        },
        {
          "_additional": {
            "rerank": [
              {
                "score": 0.014672035
              }
            ],
            "score": "2.2325633"
          },
          "answer": "Scott",
          "question": "In 1907 this Phildelphia-based company introduced the paper towel"
        },
        {
          "_additional": {
            "rerank": [
              {
                "score": 0.011915022
              }
            ],
            "score": "1.917839"
          },
          "answer": "crepe",
          "question": "The flowers on this type of myrtle tree resemble the crinkly paper of the same name"
        }
      ]
    }
  }
}
# END Expected bm25Rerank results
)

# Tests
for question in response['data']['Get']['JeopardyQuestion']:
    assert 'score' in question['_additional']['rerank'][0]
# End test


gql_query = """
# START bm25Rerank GraphQL
{
  Get {
    JeopardyQuestion(
      bm25: {
        query: "paper"
      }
      limit: 10
    ) {
      answer
      question
      _additional {
        distance
        # highlight-start
        rerank(
          property: "question"
          query: "publication"
        ) {
          score
        }
        # highlight-end
      }
    }
  }
}
# END bm25Rerank GraphQL
"""

# Tests
gqlresponse = client.query.raw(gql_query)
assert [q["answer"] for q in gqlresponse["data"]["Get"]["JeopardyQuestion"]] == [q["answer"] for q in response["data"]["Get"]["JeopardyQuestion"]]
