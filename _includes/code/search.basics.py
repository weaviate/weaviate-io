# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation shown on snippet
import weaviate

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
)

# ==============================
# ===== BASIC GET EXAMPLES =====
# ==============================

# BasicGetPython
result = client.query.get("JeopardyQuestion", ["question"]).do()
print(result)
# END BasicGetPython

# Test results
assert "JeopardyQuestion" in result["data"]["Get"]
assert result["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_result = """
// BasicGet Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "question": "This prophet passed the time he spent inside a fish offering up prayers"
        },
        // shortened for brevity
      ]
    }
  }
}
// END BasicGet Expected Results
"""


gql_query = """
# BasicGetGraphQL
{
  Get {
    JeopardyQuestion {
      question
    }
  }
}
# END BasicGetGraphQL
"""
gqlresult = client.query.raw(gql_query)
# Test results
assert gqlresult == result
# END Test results



# ====================================
# ===== BASIC GET LIMIT EXAMPLES =====
# ====================================

# GetWithLimitPython
result = client.query.get("JeopardyQuestion", ["question"]).with_limit(1).do()
print(result)
# END GetWithLimitPython

# Test results
assert "JeopardyQuestion" in result["data"]["Get"]
assert len(result["data"]["Get"]["JeopardyQuestion"]) == 1
assert result["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_result = """
// GetWithLimit Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "question": "This prophet passed the time he spent inside a fish offering up prayers"
        },
        // Note this will only have one result as we limited it to 1
      ]
    }
  }
}
// END GetWithLimit Expected Results
"""


gql_query = """
# GetWithLimitGraphQL
{
  Get {
    JeopardyQuestion (limit: 1) {
      question
    }
  }
}
# ENDGetWithLimit GraphQL
"""
gqlresult = client.query.raw(gql_query)
# Test results
assert gqlresult == result
# END Test results



# ==========================================
# ===== GET LIMIT WITH OFFSET EXAMPLES =====
# ==========================================

# GetWithLimitOffsetPython
result = client.query.get("JeopardyQuestion", ["question"]).with_limit(1).with_offset(1).do()
print(result)
# END GetWithLimitOffsetPython

# Test results
assert "JeopardyQuestion" in result["data"]["Get"]
assert len(result["data"]["Get"]["JeopardyQuestion"]) == 1
assert result["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_result = """
// GetWithLimitOffset Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "question": "Pythons are oviparous, meaning they do this"
        }
      ]
    }
  }
}
// END GetWithLimitOffset Expected Results
"""


gql_query = """
# GetWithLimitOffsetGraphQL
{
  Get {
    JeopardyQuestion (limit: 1 offset: 1) {
      question
    }
  }
}
# END GetWithLimitOffsetGraphQL
"""
gqlresult = client.query.raw(gql_query)
# Test results
assert gqlresult == result
# END Test results



# ==========================================
# ===== GET OBJECT PROPERTIES EXAMPLES =====
# ==========================================

# GetPropertiesPython
result = client.query.get("JeopardyQuestion", ["question", "answer", "points"]).with_limit(1).do()
print(result)
# END GetPropertiesPython

# Test results
assert "JeopardyQuestion" in result["data"]["Get"]
assert len(result["data"]["Get"]["JeopardyQuestion"]) == 1
assert result["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "points"}
# End test


expected_result = """
// GetProperties Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "Jonah",
          "points": 100,
          "question": "This prophet passed the time he spent inside a fish offering up prayers"
        },
      ]
    }
  }
}
// END GetProperties Expected Results
"""


gql_query = """
# GetPropertiesGraphQL
{
  Get {
    JeopardyQuestion (limit: 1) {
      question
      answer
      points
    }
  }
}
# END GetPropertiesGraphQL
"""
gqlresult = client.query.raw(gql_query)
# Test results
assert gqlresult == result
# END Test results



# ======================================
# ===== GET OBJECT VECTOR EXAMPLES =====
# ======================================

# GetObjectVectorPython
result = client.query.get("JeopardyQuestion").with_additional("vector").with_limit(1).do()
print(result)
# END GetObjectVectorPython

# Test results
assert "JeopardyQuestion" in result["data"]["Get"]
assert len(result["data"]["Get"]["JeopardyQuestion"]) == 1
assert result["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"vector"}
# End test


expected_result = """
// GetObjectVector Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "vector": [
              0.0065065133,
              -0.017786196,
              0.005879146,
              0.006707012,
              ...  // shortened for brevity
            ]
          }
        },
      ]
    }
  }
}
// END GetObjectVector Expected Results
"""


gql_query = """
# GetObjectVectorGraphQL
{
  Get {
    JeopardyQuestion (limit: 1) {
      _additional {
        vector
      }
    }
  }
}
# END GetObjectVectorGraphQL
"""
gqlresult = client.query.raw(gql_query)
# Test results
assert gqlresult == result
# END Test results


# ==================================
# ===== GET OBJECT ID EXAMPLES =====
# ==================================

# GetObjectIdPython
result = client.query.get("JeopardyQuestion").with_additional("id").with_limit(1).do()
print(result)
# END GetObjectIdPython

# Test results
assert "JeopardyQuestion" in result["data"]["Get"]
assert len(result["data"]["Get"]["JeopardyQuestion"]) == 1
assert result["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"id"}
# End test


expected_result = """
// GetObjectId Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "id": "0002bf92-80c8-5d94-af34-0d6c5fea1aaf"
          }
        },
        // shortened for brevity
      ]
    }
  }
}
// END GetObjectId Expected Results
"""


gql_query = """
# GetObjectIdGraphQL
{
  Get {
    JeopardyQuestion (limit: 1) {
      _additional {
        id
      }
    }
  }
}
# END GetObjectIdGraphQL
"""
gqlresult = client.query.raw(gql_query)
# Test results
assert gqlresult == result
# END Test results
