# Howto: BM25 search - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import json

# Instantiate the client with the user/password and OpenAI api key
client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
    additional_headers = {
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace w/ your OPENAI API key
    }
)

# ==========================================
# ===== Basic BM25 Query =====
# ==========================================

# BM25BasicPython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer"])
    # highlight-start
    .with_bm25(
      query="food"
    )
    # highlight-end
    .with_limit(3)
    .do()
)

print(json.dumps(response, indent=2))
# END BM25BasicPython

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer"}
# End test


expected_results = """
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
"""



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
def test_gqlresponse(response_in, gqlresponse_in):
    for i, result in enumerate(response_in["data"]["Get"]["JeopardyQuestion"]):
        assert result["question"] == gqlresponse_in["data"]["Get"]["JeopardyQuestion"][i]["question"]
test_gqlresponse(response, gqlresponse)


# ==========================================
# ===== BM25 Query with score / explainScore =====
# ==========================================

# BM25WithScorePython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer"])
    .with_bm25(
      query="food"
    )
    # highlight-start
    .with_additional("score")
    # highlight-end
    .with_limit(3)
    .do()
)

print(json.dumps(response, indent=2))
# END BM25WithScorePython

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "_additional"}
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"score"}
# End test


expected_results = """
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
"""



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
gqlresponse = client.query.raw(gql_query)
def test_gqlresponse(response_in, gqlresponse_in):
    for i, result in enumerate(response_in["data"]["Get"]["JeopardyQuestion"]):
        assert result["question"] == gqlresponse_in["data"]["Get"]["JeopardyQuestion"][i]["question"]
test_gqlresponse(response, gqlresponse)



# ==========================================
# ===== BM25 Query with Selected Properties =====
# ==========================================


# BM25WithPropertiesPython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer"])
    .with_bm25(
      query="food",
      # highlight-start
      properties=["question"]
      # highlight-end
    )
    .with_additional("score")
    .with_limit(3)
    .do()
)

print(json.dumps(response, indent=2))
# END BM25WithPropertiesPython

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "_additional"}
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"score"}
for i, result in enumerate(response["data"]["Get"]["JeopardyQuestion"]):
    assert "food" in response["data"]["Get"]["JeopardyQuestion"][i]["question"]  # Check that "food" appears in the answers
# End test


expected_results = """
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
"""



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
gqlresponse = client.query.raw(gql_query)
test_gqlresponse(response, gqlresponse)


# ==========================================
# ===== BM25 Query with Boosted Properties =====
# ==========================================


# BM25WithBoostedPropertiesPython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer"])
    .with_bm25(
      query="food",
      # highlight-start
      properties=["question^2", "answer"]
      # highlight-end
    )
    .with_additional("score")
    .with_limit(3)
    .do()
  )

print(json.dumps(response, indent=2))
# END BM25WithBoostedPropertiesPython

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "_additional"}
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"score"}
# End test


expected_results = """
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
"""



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
gqlresponse = client.query.raw(gql_query)
test_gqlresponse(response, gqlresponse)


# ==========================================
# ===== Basic BM25 With Filter =====
# ==========================================

# BM25WithFilterPython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer", "round"])
    .with_bm25(
      query="food"
    )
    # highlight-start
    .with_where({
        "path": ["round"],
        "operator": "Equal",
        "valueText": "Double Jeopardy!"
    })
    # highlight-end
    .with_additional("score")
    .with_limit(3)
    .do()
  )

print(json.dumps(response, indent=2))
# END BM25WithFilterPython

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "round", "_additional"}
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"score"}
for q in response["data"]["Get"]["JeopardyQuestion"]:
    assert q["round"] == "Double Jeopardy!"
# End test


expected_results = """
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
"""



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
gqlresponse = client.query.raw(gql_query)
def test_gqlresponse(response_in, gqlresponse_in):
    for i, result in enumerate(response_in["data"]["Get"]["JeopardyQuestion"]):
        assert result["question"] == gqlresponse_in["data"]["Get"]["JeopardyQuestion"][i]["question"]
test_gqlresponse(response, gqlresponse)
