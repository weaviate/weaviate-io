# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation shown on snippet
import weaviate
import json

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
)

# ==============================
# ===== BASIC GET EXAMPLES =====
# ==============================

# BasicGetPython
response = (
    client.query
    .get("JeopardyQuestion", ["question"])
    .do()
)

print(response)
# END BasicGetPython

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_response = """
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
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results



# ====================================
# ===== BASIC GET LIMIT EXAMPLES =====
# ====================================

# GetWithLimitPython
response = (
    client.query
    .get("JeopardyQuestion", ["question"])
    # highlight-start
    .with_limit(1)
    # highlight-end
    .do()
)

print(response)
# END GetWithLimitPython

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_response = """
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
    JeopardyQuestion (
    # highlight-start
      limit: 1
    # highlight-end
    ) {
      question
    }
  }
}
# END GetWithLimitGraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results



# ==========================================
# ===== GET LIMIT WITH OFFSET EXAMPLES =====
# ==========================================

# GetWithLimitOffsetPython
response = (
    client.query
    .get("JeopardyQuestion", ["question"])
    # highlight-start
    .with_limit(1)
    .with_offset(1)
    # highlight-end
    .do()
)
print(response)
# END GetWithLimitOffsetPython

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_response = """
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
    JeopardyQuestion (
    # highlight-start
      limit: 1
      offset: 1
    # highlight-end
    ) {
      question
    }
  }
}
# END GetWithLimitOffsetGraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results



# ==========================================
# ===== GET OBJECT PROPERTIES EXAMPLES =====
# ==========================================

# GetPropertiesPython
response = (
    client.query
    # highlight-start
    .get("JeopardyQuestion", ["question", "answer", "points"])
    # highlight-end
    .with_limit(1)
    .do()
)
print(response)
# END GetPropertiesPython

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "points"}
# End test


expected_response = """
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
    # highlight-start
      question
      answer
      points
    # highlight-end
    }
  }
}
# END GetPropertiesGraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results



# ======================================
# ===== GET OBJECT VECTOR EXAMPLES =====
# ======================================

# GetObjectVectorPython
response = (
    client.query
    .get("JeopardyQuestion")
    # highlight-start
    .with_additional("vector")
    # highlight-end
    .with_limit(1)
    .do()
)
print(response)
# END GetObjectVectorPython

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"vector"}
# End test


expected_response = """
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
    # highlight-start
      _additional {
        vector
      }
    # highlight-end
    }
  }
}
# END GetObjectVectorGraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results


# ==================================
# ===== GET OBJECT ID EXAMPLES =====
# ==================================

# GetObjectIdPython
response = (
    client.query
    .get("JeopardyQuestion")
    # highlight-start
    .with_additional("id")
    # highlight-end
    .with_limit(1)
    .do()
)
print(response)
# END GetObjectIdPython

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"id"}
# End test


expected_response = """
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
    # highlight-start
      _additional {
        id
      }
    # highlight-end
    }
  }
}
# END GetObjectIdGraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results


# ==============================
# ===== GET WITH CROSS-REF EXAMPLES =====
# ==============================

# GetWithCrossRefsPython
response = (
    client.query
    # highlight-start
    .get("JeopardyQuestion", [
      "question",
      "hasCategory { ... on JeopardyCategory { title } }"
    ])
    # highlight-end
    .with_limit(2)
    .do()
)

print(json.dumps(response, indent=2))
# END GetWithCrossRefsPython


expected_response = (
# GetWithCrossRefs Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "hasCategory": [
            {
              "title": "THE BIBLE"
            }
          ],
          "question": "This prophet passed the time he spent inside a fish offering up prayers"
        },
        {
          "hasCategory": [
            {
              "title": "ANIMALS"
            }
          ],
          "question": "Pythons are oviparous, meaning they do this"
        }
      ]
    }
  }
}
# END GetWithCrossRefs Expected Results
)


gql_query = """
# GetWithCrossRefsGraphQL
{
  Get {
    JeopardyQuestion (
      limit: 2
    )
    # highlight-start
    {
      question
      hasCategory {
        ... on JeopardyCategory {
          title
        }
      }
    }
    # highlight-end
  }
}
# END GetWithCrossRefsGraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "hasCategory"}
assert gqlresponse == response
assert expected_response == response
# END Test results
