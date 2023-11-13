# Howto: BM25 search - Python examples
import os
import re

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import json

# Instantiate the client with the user/password and OpenAI api key
# client = weaviate.Client(
#     'https://edu-demo.weaviate.network',
#     auth_client_secret=weaviate.AuthApiKey('learn-weaviate'),
#     additional_headers={
#         'X-OpenAI-Api-Key': os.environ['OPENAI_API_KEY']
#     }
# )
# TODOv4 - update this to call the wcs instace
client = weaviate.connect_to_wcs(
    cluster_id="some-endpoint",
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"],
    }
)

# ============================
# ===== Basic BM25 Query =====
# ============================

# BM25BasicPython
jeopardy = client.collections.get("JeopardyQuestion")
# highlight-start
response = jeopardy.query.bm25(
# highlight-end
    query="food",
    limit=3
)

for o in response.objects:
    print(json.dumps(o.properties, indent=2))
# END BM25BasicPython


expected_response = (
# Expected BM25Basic results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "food stores (supermarkets)",
          "question": "This type of retail store sells more shampoo & makeup than any other"
        },
        {
          "answer": "cake",
          "question": "Devil's food & angel food are types of this dessert"
        },
        {
          "answer": "a closer grocer",
          "question": "A nearer food merchant"
        }
      ]
    }
  }
}
# END Expected BM25Basic results
)
# Tests
# TODOv4 update tests
# assert response == expected_response
# End test


gql_query = """
# BM25BasicGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
# highlight-start
      bm25: {
        query: "food"
      }
# highlight-end
    ) {
      question
      answer
    }
  }
}
# END BM25BasicGraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Tests
# assert gqlresponse == expected_response
# End test


# ================================================
# ===== BM25 Query with score / explainScore =====
# ================================================

# BM25WithScorePython
import weaviate.classes as wvc

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.bm25(
    query="food",
    limit=3
)

for o in response.objects:
    print(json.dumps(o.properties, indent=2))
    # highlight-start
    print(o.metadata.score)
    # highlight-end
# END BM25WithScorePython

# Tests
# assert "JeopardyQuestion" in response["data"]["Get"]
# assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "_additional"}
# assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"score"}
# End test


expected_response = (
# Expected BM25WithScore results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "score": "3.0140665"
          },
          "answer": "food stores (supermarkets)",
          "question": "This type of retail store sells more shampoo & makeup than any other"
        },
        {
          "_additional": {
            "score": "2.8725255"
          },
          "answer": "cake",
          "question": "Devil's food & angel food are types of this dessert"
        },
        {
          "_additional": {
            "score": "2.7672548"
          },
          "answer": "a closer grocer",
          "question": "A nearer food merchant"
        }
      ]
    }
  }
}
# END Expected BM25WithScore results
)


gql_query = """
# BM25WithScoreGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
      bm25: {
        query: "food"
      }
    ) {
      question
      answer
# highlight-start
      _additional {
        score
      }
# highlight-end
    }
  }
}
# END BM25WithScoreGraphQL
"""


# def test_gqlresponse(response_in, gqlresponse_in):
#     for i, result in enumerate(response_in["data"]["Get"]["JeopardyQuestion"]):
#         assert result["question"] == gqlresponse_in["data"]["Get"]["JeopardyQuestion"][i]["question"]


# gqlresponse = client.query.raw(gql_query)
# test_gqlresponse(response, gqlresponse)

# =================================
# ===== BM25 Query with limit =====
# =================================

# START limit Python
import weaviate.classes as wvc

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="safety",
    # highlight-start
    limit=3
    # highlight-end
)

for o in response.objects:
    print(json.dumps(o.properties, indent=2))
# END limit Python

# Tests
# assert 'JeopardyQuestion' in response['data']['Get']
# assert len(response['data']['Get']['JeopardyQuestion']) == 3
# assert response['data']['Get']['JeopardyQuestion'][0].keys() == {'question', 'answer', '_additional'}
# assert response['data']['Get']['JeopardyQuestion'][0]['_additional'].keys() == {'score'}
# assert 'OSHA' in response['data']['Get']['JeopardyQuestion'][0]['answer'], f'"OSHA" not found in {response["data"]["Get"]["JeopardyQuestion"][0]["answer"]}'
# End test


expected_response = (
# START Expected limit results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "score": "2.6768136"
          },
          "answer": "OSHA (Occupational Safety and Health Administration)",
          "question": "The government admin. was created in 1971 to ensure occupational health & safety standards"
        },
        {
          "_additional": {
            "score": "2.0213983"
          },
          "answer": "France",
          "question": "Royale, Joseph, and Devil's Islands make up the Safety Islands owned by this country"
        },
        {
          "_additional": {
            "score": "2.0213983"
          },
          "answer": "Devil's Island",
          "question": "The Safety Islands off French Guiana consist of Royale, Saint-Joseph & this diabolical island"
        }
      ]
    }
  }
}
# END Expected limit results
)

gql_query = """
# START limit GraphQL
{
  Get {
    JeopardyQuestion(
      bm25: {
        query: "safety"
      }
# highlight-start
      limit: 3
# highlight-end
    ) {
      question
      answer
      _additional {
        score
      }
    }
  }
}
# END limit GraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# test_gqlresponse(response, gqlresponse)


# ===================================
# ===== BM25 Query with autocut =====
# ===================================

# START autocut Python
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="safety",
    # highlight-start
    auto_limit=1
    # highlight-end
)

for o in response.objects:
    print(json.dumps(o.properties, indent=2))
# END autocut Python

# Tests
# assert 'JeopardyQuestion' in response['data']['Get']
# assert len(response['data']['Get']['JeopardyQuestion']) == 1
# assert response['data']['Get']['JeopardyQuestion'][0].keys() == {'question', 'answer', '_additional'}
# assert response['data']['Get']['JeopardyQuestion'][0]['_additional'].keys() == {'score'}
# assert 'OSHA' in response['data']['Get']['JeopardyQuestion'][0]['answer'], f'"OSHA" not found in {response["data"]["Get"]["JeopardyQuestion"][0]["answer"]}'
# End test


expected_response = (
# START Expected autocut results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "score": "2.6768136"
          },
          "answer": "OSHA (Occupational Safety and Health Administration)",
          "question": "The government admin. was created in 1971 to ensure occupational health & safety standards"
        }
      ]
    }
  }
}
# END Expected autocut results
)

gql_query = """
# START autocut GraphQL
{
  Get {
    JeopardyQuestion(
      bm25: {
        query: "safety"
      }
# highlight-start
      autocut: 1
# highlight-end
    ) {
      question
      answer
      _additional {
        score
      }
    }
  }
}
# END autocut GraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# test_gqlresponse(response, gqlresponse)

# ===============================================
# ===== BM25 Query with Selected Properties =====
# ===============================================


# BM25WithPropertiesPython
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="safety",
    # highlight-start
    query_properties=["question"],
    # highlight-end
    limit=3
)

for o in response.objects:
    print(json.dumps(o.properties, indent=2))
# END BM25WithPropertiesPython

# Tests
# assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "_additional"}
# assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"score"}
# for i, result in enumerate(response["data"]["Get"]["JeopardyQuestion"]):
#     assert "food" in response["data"]["Get"]["JeopardyQuestion"][i]["question"]  # Check that "food" appears in the answers
# End test


expected_response = (
# Expected BM25WithProperties results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "score": "3.7079012"
          },
          "answer": "cake",
          "question": "Devil's food & angel food are types of this dessert"
        },
        {
          "_additional": {
            "score": "3.4311616"
          },
          "answer": "a closer grocer",
          "question": "A nearer food merchant"
        },
        {
          "_additional": {
            "score": "2.8312314"
          },
          "answer": "honey",
          "question": "The primary source of this food is the Apis mellifera"
        }
      ]
    }
  }
}
# END Expected BM25WithProperties results
)



gql_query = """
# BM25WithPropertiesGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
      bm25: {
        query: "food"
        # highlight-start
        properties: ["question"]
        # highlight-end
      }
    ) {
      question
      answer
      _additional {
        score
      }
    }
  }
}
# END BM25WithPropertiesGraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# test_gqlresponse(response, gqlresponse)


# ==============================================
# ===== BM25 Query with Boosted Properties =====
# ==============================================


# BM25WithBoostedPropertiesPython
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
    # highlight-start
    query_properties=["question^2", "answer"],
    # highlight-end
    limit=3
)

for o in response.objects:
    print(json.dumps(o.properties, indent=2))
# END BM25WithBoostedPropertiesPython

# Tests
# assert "JeopardyQuestion" in response["data"]["Get"]
# assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "_additional"}
# assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"score"}
# End test


expected_response = (
# Expected BM25WithBoostedProperties results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "score": "4.0038033"
          },
          "answer": "cake",
          "question": "Devil's food & angel food are types of this dessert"
        },
        {
          "_additional": {
            "score": "3.8706005"
          },
          "answer": "a closer grocer",
          "question": "A nearer food merchant"
        },
        {
          "_additional": {
            "score": "3.2457707"
          },
          "answer": "food stores (supermarkets)",
          "question": "This type of retail store sells more shampoo & makeup than any other"
        }
      ]
    }
  }
}
# END Expected BM25WithBoostedProperties results
)


gql_query = """
# BM25WithBoostedPropertiesGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
      bm25: {
        query: "food"
        # highlight-start
        properties: ["question^2", "answer"]
        # highlight-end
      }
    ) {
      question
      answer
      _additional {
        score
      }
    }
  }
}
# END BM25WithBoostedPropertiesGraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# test_gqlresponse(response, gqlresponse)


# ==================================
# ===== BM25 multiple keywords =====
# ==================================

# START MultipleKeywords Python
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    # highlight-start
    query="food wine", # search for food or wine
    # highlight-end
    query_properties=["question"],
    return_properties=["question"], # only return question property
    limit=5
)

for o in response.objects:
    print(o.properties["question"])
# END MultipleKeywords Python

# Tests
# assert 'JeopardyQuestion' in response['data']['Get']
# assert len(response['data']['Get']['JeopardyQuestion']) == 5
# assert response['data']['Get']['JeopardyQuestion'][0].keys() == {'question', '_additional'}
# assert response['data']['Get']['JeopardyQuestion'][0]['_additional'].keys() == {'score'}

# Check that 'food' or "wine" appears in the questions
# pattern = re.compile(r'food|wine', re.IGNORECASE)
# for result in response['data']['Get']['JeopardyQuestion']:
#     assert pattern.search(result['question'])
# End test


expected_response = (
# Expected MultipleKeywords results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "score": "4.4707017"
          },
          "question": "Wine, a ship, Croce's time"
        },
        {
          "_additional": {
            "score": "3.7450757"
          },
          "question": "Devil's food & angel food are types of this dessert"
        },
        {
          "_additional": {
            "score": "3.647569"
          },
          "question": "Type of event in Cana at which Jesus turned water into wine"
        },
        {
          "_additional": {
            "score": "3.4594069"
          },
          "question": "A nearer food merchant"
        },
        {
          "_additional": {
            "score": "3.3400855"
          },
          "question": "Sparkling wine sold under the name Champagne must come from this region in Northeast France"
        }
      ]
    }
  }
}
# END Expected MultipleKeywords results
)


gql_query = """
# START MultipleKeywords GraphQL
{
  Get {
    JeopardyQuestion(
      limit: 5
      bm25: {
        # highlight-start
        query: "food wine"
        # highlight-end
        properties: ["question"]
      }
    ) {
      question
      _additional {
        score
      }
    }
  }
}
# END MultipleKeywords GraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# test_gqlresponse(response, gqlresponse)


# ==================================
# ===== Basic BM25 With Filter =====
# ==================================

# BM25WithFilterPython
import weaviate.classes as wvc

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
    # highlight-start
    filters=wvc.Filter("round").equal("Double Jeopardy!"),
    # highlight-end
    return_properties=["answer", "question", "round"], # return these properties
    limit=3
)

for o in response.objects:
    print(json.dumps(o.properties, indent=2))
# END BM25WithFilterPython

# Tests
# assert "JeopardyQuestion" in response["data"]["Get"]
# assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "round", "_additional"}
# assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"score"}
# for q in response["data"]["Get"]["JeopardyQuestion"]:
#     assert q["round"] == "Double Jeopardy!"
# End test


expected_response = (
# Expected BM25WithFilter results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "score": "3.0140665"
          },
          "answer": "food stores (supermarkets)",
          "question": "This type of retail store sells more shampoo & makeup than any other",
          "round": "Double Jeopardy!"
        },
        {
          "_additional": {
            "score": "1.9633813"
          },
          "answer": "honey",
          "question": "The primary source of this food is the Apis mellifera",
          "round": "Double Jeopardy!"
        },
        {
          "_additional": {
            "score": "1.6719631"
          },
          "answer": "pseudopods",
          "question": "Amoebas use temporary extensions called these to move or to surround & engulf food",
          "round": "Double Jeopardy!"
        }
      ]
    }
  }
}
# END Expected BM25WithFilter results
)



gql_query = """
# BM25WithFilterGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
      bm25: {
        query: "food"
      }
      # highlight-start
      where: {
        path: ["round"]
        operator: Equal
        valueText: "Double Jeopardy!"
      }
      # highlight-end
    ) {
      question
      answer
      _additional {
        score
      }
    }
  }
}
# END BM25WithFilterGraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# test_gqlresponse(response, gqlresponse)