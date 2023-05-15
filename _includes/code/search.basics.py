# ==============================
# ===== BASIC GET EXAMPLES =====
# ==============================

# BasicGet Python Example
import weaviate

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
)

# END BasicGet Python Example
# Actual instantiation for testing
client = weaviate.Client(
    "https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.AuthApiKey("learn-weaviate"),
)
# END Actual instantiation
# BasicGet Python Example
result = client.query.get("JeopardyQuestion", ["question"]).do()
print(result)
# END BasicGet Python Example

# Test results
def check_results(result_in):
    assert "JeopardyQuestion" in result_in["data"]["Get"]
    assert result_in["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}

check_results(result)
# End test


gql_query = """
# BasicGet GraphQL Example
{
  Get {
    JeopardyQuestion {
      question
    }
  }
}
# END BasicGet GraphQL Example
"""
result = client.query.raw(gql_query)
print(result)

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

# Test results
check_results(result)
# END Test results


# ====================================
# ===== BASIC GET LIMIT EXAMPLES =====
# ====================================

# GetWithLimit Python Example
import weaviate

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
)

# END GetWithLimit Python Example
# Actual instantiation for testing
client = weaviate.Client(
    "https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.AuthApiKey("learn-weaviate"),
)
# END Actual instantiation
# GetWithLimit Python Example
result = client.query.get("JeopardyQuestion", ["question"]).with_limit(1).do()
print(result)
# END GetWithLimit Python Example

# Test results
def check_results(result_in):
    assert "JeopardyQuestion" in result_in["data"]["Get"]
    assert len(result_in["data"]["Get"]["JeopardyQuestion"]) == 1
    assert result_in["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}

check_results(result)
# End test


gql_query = """
# GetWithLimit GraphQL Example
{
  Get {
    JeopardyQuestion (limit: 1) {
      question
    }
  }
}
# END GetWithLimit GraphQL Example
"""
gqlresult = client.query.raw(gql_query)

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

# Test results
check_results(gqlresult)
assert gqlresult == result
# END Test results



# ==========================================
# ===== GET LIMIT WITH OFFSET EXAMPLES =====
# ==========================================

# GetWithLimitOffset Python Example
import weaviate

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
)

# END GetWithLimitOffset Python Example
# Actual instantiation for testing
client = weaviate.Client(
    "https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.AuthApiKey("learn-weaviate"),
)
# END Actual instantiation
# GetWithLimitOffset Python Example
result = client.query.get("JeopardyQuestion", ["question"]).with_limit(1).with_offset(1).do()
print(result)
# END GetWithLimitOffset Python Example

# Test results
def check_results(result_in):
    assert "JeopardyQuestion" in result_in["data"]["Get"]
    assert len(result_in["data"]["Get"]["JeopardyQuestion"]) == 1
    assert result_in["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}

check_results(result)
# End test


gql_query = """
# GetWithLimitOffset GraphQL Example
{
  Get {
    JeopardyQuestion (limit: 1 offset: 1) {
      question
    }
  }
}
# END GetWithLimitOffset GraphQL Example
"""
gqlresult = client.query.raw(gql_query)

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

# Test results
check_results(gqlresult)
assert gqlresult == result
# END Test results



# ==========================================
# ===== GET OBJECT PROPERTIES EXAMPLES =====
# ==========================================


# GetProperties Python Example
import weaviate

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
)

# END GetProperties Python Example
# Actual instantiation for testing
client = weaviate.Client(
    "https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.AuthApiKey("learn-weaviate"),
)
# END Actual instantiation
# GetProperties Python Example
result = client.query.get("JeopardyQuestion", ["question", "answer", "points"]).with_limit(1).do()
print(result)
# END GetProperties Python Example

# Test results
def check_results(result_in):
    assert "JeopardyQuestion" in result_in["data"]["Get"]
    assert len(result_in["data"]["Get"]["JeopardyQuestion"]) == 1
    assert result_in["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "points"}

check_results(result)
# End test


gql_query = """
# GetProperties GraphQL Example
{
  Get {
    JeopardyQuestion (limit: 1) {
      question
      answer
      points
    }
  }
}
# END GetProperties GraphQL Example
"""
gqlresult = client.query.raw(gql_query)

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

# Test results
check_results(gqlresult)
assert gqlresult == result
# END Test results


# ======================================
# ===== GET OBJECT VECTOR EXAMPLES =====
# ======================================


# GetObjectVector Python Example
import weaviate

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
)

# END GetObjectVector Python Example
# Actual instantiation for testing
client = weaviate.Client(
    "https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.AuthApiKey("learn-weaviate"),
)
# END Actual instantiation
# GetObjectVector Python Example
result = client.query.get("JeopardyQuestion").with_additional("vector").with_limit(1).do()
print(result)
# END GetObjectVector Python Example

# Test results
def check_results(result_in):
    assert "JeopardyQuestion" in result_in["data"]["Get"]
    assert len(result_in["data"]["Get"]["JeopardyQuestion"]) == 1
    assert result_in["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"vector"}

check_results(result)
# End test


gql_query = """
# GetObjectVector GraphQL Example
{
  Get {
    JeopardyQuestion (limit: 1) {
      _additional {
        vector
      }
    }
  }
}
# END GetObjectVector GraphQL Example
"""
gqlresult = client.query.raw(gql_query)

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

# Test results
check_results(result)
assert gqlresult == result
# END Test results


# ==================================
# ===== GET OBJECT ID EXAMPLES =====
# ==================================


# GetObjectId Python Example
import weaviate

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
)

# END GetObjectId Python Example
# Actual instantiation for testing
client = weaviate.Client(
    "https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.AuthApiKey("learn-weaviate"),
)
# END Actual instantiation
# GetObjectId Python Example
result = client.query.get("JeopardyQuestion").with_additional("id").with_limit(1).do()
print(result)
# END GetObjectId Python Example

# Test results
def check_results(result_in):
    assert "JeopardyQuestion" in result_in["data"]["Get"]
    assert len(result_in["data"]["Get"]["JeopardyQuestion"]) == 1
    assert result_in["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"id"}

check_results(result)
# End test


gql_query = """
# GetObjectId GraphQL Example
{
  Get {
    JeopardyQuestion (limit: 1) {
      _additional {
        id
      }
    }
  }
}
# END GetObjectId GraphQL Example
"""
gqlresult = client.query.raw(gql_query)

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

# Test results
check_results(gqlresult)
assert gqlresult == result
# END Test results
