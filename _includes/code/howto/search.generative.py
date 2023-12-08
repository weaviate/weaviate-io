# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation shown on snippet
import weaviate, os, json

# client = weaviate.Client(
#     "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
#     auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
#     additional_headers={
#         "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace w/ your OPENAI API key
#     }
# )
# TODOv4 - update this to call the wcs instace
client = weaviate.connect_to_wcs(
    cluster_id="some-endpoint",
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"],
    }
)

# =====================================
# ===== SINGLE GENERATIVE EXAMPLE =====
# =====================================

# SingleGenerativePython
# highlight-start
prompt = "Convert the following into a question for twitter. Include emojis for fun, but do not include the answer: {question}."
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
# highlight-start
response = jeopardy.generate.near_text(
# highlight-end
    query="World history",
    limit=2,
    # highlight-start
    single_prompt=prompt
    # highlight-end
)

for o in response.objects:
    print(o.properties["question"])
    # highlight-start
    print(o.generated)
    # highlight-end
# END SingleGenerativePython

# Test results
# TODOv4 update tests
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "_additional"}
# assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["singleResult"] is not None
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
# gqlresponse = client.query.raw(gql_query)
# # Test results
# assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "_additional"}
# assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["singleResult"] is not None
# End test


# =====================================================
# ===== SINGLE GENERATIVE EXAMPLE WITH PROPERTIES =====
# =====================================================

# SingleGenerativePropertiesPython
# highlight-start
prompt = "Convert this quiz question: {question} and answer: {answer} into a trivia tweet."
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="World history",
    limit=2,
    single_prompt=prompt
)

# print source properties and generated responses
for o in response.objects:
    print(o.properties)
    print(o.generated)
# END SingleGenerativePropertiesPython

# Test results
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"_additional"}
# assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["singleResult"] is not None
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
# gqlresponse = client.query.raw(gql_query)
# # Test results
# assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0].keys() == {"_additional"}
# assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["singleResult"] is not None
# End test


# ======================================
# ===== GROUPED GENERATIVE EXAMPLE =====
# ======================================

# GroupedGenerativePython
# highlight-start
task = "What do these animals have in common, if anything?"
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="Cute animals",
    limit=3,
    # highlight-start
    grouped_task=task
    # highlight-end
)

# print the generated response
print(response.generated)
# END GroupedGenerativePython

# Test results
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"points", "_additional"}
# assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["groupedResult"] is not None
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
# gqlresponse = client.query.raw(gql_query)
# # Test results
# assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0].keys() == {"points", "_additional"}
# assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["groupedResult"] is not None
# End test


# ======================================================
# ===== GROUPED GENERATIVE EXAMPLE WITH PROPERTIES =====
# ======================================================

# GroupedGenerativeProperties Python
task = "What do these animals have in common, if anything?"

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.generate.near_text(
    query="Australian animals",
    limit=3,
    grouped_task=task,
    # highlight-start
    grouped_properties=["answer", "question"]
    # highlight-end
)

# print the generated response
# highlight-start
print(response.generated)
# highlight-end
# END GroupedGenerativeProperties Python

# Test results
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "points", "_additional"}
# assert "Australia" in response["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["groupedResult"]
# assert response["data"]["Get"]["JeopardyQuestion"][1].keys() == {"question", "points", "_additional"}
# assert response["data"]["Get"]["JeopardyQuestion"][2]["_additional"] == {"generate": None}
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

# Test results
# gqlresponse = client.query.raw(gql_query)
# print(json.dumps(gqlresponse, indent=2))
# assert gqlresponse["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "points", "_additional"}
# assert "Australia" in gqlresponse["data"]["Get"]["JeopardyQuestion"][0]["_additional"]["generate"]["groupedResult"]
# End test
