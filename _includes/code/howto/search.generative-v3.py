# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation shown on snippet
import weaviate
import json

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace w/ your OPENAI API key
    }
)

# =====================================
# ===== SINGLE GENERATIVE EXAMPLE =====
# =====================================

# SingleGenerativePython
generate_prompt = "Convert the following into a question for twitter. Include emojis for fun, but do not include the answer: {question}."

response = (
  client.query
  .get("JeopardyQuestion", ["question"])
  .with_generate(single_prompt=generate_prompt)
  .with_near_text({
    "concepts": ["World history"]
  })
  .with_limit(2)
).do()

# print(json.dumps(response, indent=2))
# END SingleGenerativePython

# Test results
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "_additional"}
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["singleResult"] is not None
# End test


expected_response = """
# SingleGenerative Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "singleResult": "\ud83c\udf0e\ud83c\udf1e Did you know that in the 19th century, one quarter of the world's land and people were part of an empire where the sun never set? #history #funfact"
            }
          },
          "question": "Including, in 19th century, one quarter of world's land & people, the sun never set on it"
        },
        {
          "_additional": {
            "generate": {
              "error": null,
              "singleResult": "\ud83e\udd14 Which country had more kings than any other in ancient history, from Menes to the Ptolemys? \ud83d\udc51\ud83c\udfdb\ufe0f #history #ancientworld"
            }
          },
          "question": "From Menes to the Ptolemys, this country had more kings than any other in ancient history"
        }
      ]
    }
  }
}
# END SingleGenerative Expected Results
"""


gql_query = '''
# SingleGenerativeGraphQL
{
  Get {
    JeopardyQuestion (
      nearText: {
        concepts: ["World history"]
      }
      limit: 2
    ) {
      question
      _additional {
        generate(
          singleResult: {
            prompt: """
              Convert the following into a question for twitter. Include emojis for fun, but do not include the answer: {question}.
            """
          }
        ) {
          singleResult
          error
        }
      }
    }
  }
}
# END SingleGenerativeGraphQL
'''
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "_additional"}
assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["singleResult"] is not None
# End test


# =====================================================
# ===== SINGLE GENERATIVE EXAMPLE WITH PROPERTIES =====
# =====================================================

# SingleGenerativePropertiesPython
generate_prompt = "Convert this quiz question: {question} and answer: {answer} into a trivia tweet."

response = (
  client.query
  .get("JeopardyQuestion")
  .with_generate(single_prompt=generate_prompt)
  .with_near_text({
    "concepts": ["World history"]
  })
  .with_limit(2)
).do()

# print(json.dumps(response, indent=2))
# END SingleGenerativePropertiesPython

# Test results
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"_additional"}
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["singleResult"] is not None
# End test


expected_response = """
# SingleGenerativeProperties Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "singleResult": "Did you know that in the 19th century, the British Empire included one quarter of the world's land and people? The sun never set on it! #BritishEmpire #TriviaTuesday"
            }
          }
        },
        {
          "_additional": {
            "generate": {
              "error": null,
              "singleResult": "Did you know that Egypt had more kings than any other country in ancient history? From Menes to the Ptolemys, they ruled the land of the Nile. #Egypt #AncientHistory #Kings"
            }
          }
        }
      ]
    }
  }
}
# END SingleGenerativeProperties Expected Results
"""


gql_query = '''
# SingleGenerativePropertiesGraphQL
{
  Get {
    JeopardyQuestion (
      nearText: {
        concepts: ["World history"]
      }
      limit: 2
    ) {
      _additional {
        generate(
          singleResult: {
            prompt: """
              Convert this quiz question: {question} and answer: {answer} into a trivia tweet.
            """
          }
        ) {
          singleResult
          error
        }
      }
    }
  }
}
# END SingleGenerativePropertiesGraphQL
'''
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0].keys() == {"_additional"}
assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["singleResult"] is not None
# End test


# ======================================
# ===== GROUPED GENERATIVE EXAMPLE =====
# ======================================

# GroupedGenerativePython
generate_prompt = "What do these animals have in common, if anything?"

response = (
  client.query
  .get("JeopardyQuestion", ["points"])
  # highlight-start
  .with_generate(grouped_task=generate_prompt)
  # highlight-end
  .with_near_text({
    "concepts": ["Cute animals"]
  })
  .with_limit(3)
).do()

# print(json.dumps(response, indent=2))
# END GroupedGenerativePython

# Test results
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"points", "_additional"}
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["groupedResult"] is not None
# End test


expected_response = """
# GroupedGenerative Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "groupedResult": "All of these animals are mammals."
            }
          },
          "points": 400
        },
        {
          "_additional": {
            "generate": null
          },
          "points": 300
        },
        {
          "_additional": {
            "generate": null
          },
          "points": 400
        }
      ]
    }
  }
}
# END GroupedGenerative Expected Results
"""


gql_query = '''
# GroupedGenerativeGraphQL
{
  Get {
    JeopardyQuestion (
      nearText: {
        concepts: ["Cute animals"]
      }
      limit: 3
    ) {
      points
      _additional {
        # highlight-start
        generate(
          groupedResult: {
            task: """
              What do these animals have in common, if anything?
            """
          }
        ) {
          groupedResult
          error
        }
        # highlight-end
      }
    }
  }
}
# END GroupedGenerativeGraphQL
'''
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0].keys() == {"points", "_additional"}
assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["groupedResult"] is not None
# End test


# ======================================================
# ===== GROUPED GENERATIVE EXAMPLE WITH PROPERTIES =====
# ======================================================

# GroupedGenerativeProperties Python
generate_prompt = 'What do these animals have in common, if anything?'

response = (
  client.query
  .get('JeopardyQuestion', ['question points'])
  .with_generate(
      grouped_task=generate_prompt,
      # highlight-start
      grouped_properties=['answer', 'question']  # available since client version 3.19.2
      # highlight-end
  )
  .with_near_text({
    'concepts': ['Australian animals']
  })
  .with_limit(3)
).do()

# print(json.dumps(response, indent=2))
# END GroupedGenerativeProperties Python

# Test results
assert response['data']['Get']['JeopardyQuestion'][0].keys() == {'question', 'points', '_additional'}
assert "Australia" in response['data']['Get']['JeopardyQuestion'][0]['_additional']['generate']['groupedResult']
assert response['data']['Get']['JeopardyQuestion'][1].keys() == {'question', 'points', '_additional'}
assert response['data']['Get']['JeopardyQuestion'][2]['_additional'] == {'generate': None}
# End test


expected_response = """
# GroupedGenerativeProperties Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "groupedResult": "All of the animals mentioned are native to Australia."
            }
          },
          "points": 800,
          "question": "Australians call this animal a jumbuck or a monkey"
        },
        {
          "_additional": {
            "generate": null
          },
          "points": 100,
          "question": "An island named for the animal seen <a href=\"http://www.j-archive.com/media/2000-03-10_J_01.jpg\" target=\"_blank\">here</a> belongs to this country [kangaroo]"
        },
        {
          "_additional": {
            "generate": null
          },
          "points": 300,
          "question": "Found chiefly in Australia, the wallaby is a smaller type of this marsupial"
        }
      ]
    }
  }
}
# END GroupedGenerativeProperties Expected Results
"""

gql_query = '''
# GroupedGenerativePropertiesGraphQL
{
  Get {
    JeopardyQuestion (
      nearText: {
        concepts: ["Australian animals"]
      }
      limit: 3
    ) {
      question
      points
      _additional {
        generate(
          groupedResult: {
            task: """
              What do these animals have in common, if anything?
            """
            # highlight-start
            properties: ["answer", "question"]
            # highlight-end
          }
        ) {
          groupedResult
          error
        }
      }
    }
  }
}
# END GroupedGenerativePropertiesGraphQL
'''

gqlresponse = client.query.raw(gql_query)
# print(json.dumps(gqlresponse, indent=2))

# Test results
assert gqlresponse['data']['Get']['JeopardyQuestion'][0].keys() == {'question', 'points', '_additional'}
assert 'Australia' in gqlresponse['data']['Get']['JeopardyQuestion'][0]['_additional']['generate']['groupedResult']
# End test
