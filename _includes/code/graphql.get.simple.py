# ===== PYTHON EXAMPLE =====
import weaviate

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
)

# ===== END PYTHON EXAMPLE =====
# Actual instantiation for testing
client = weaviate.Client(
    "https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.AuthApiKey("learn-weaviate"),
)
# END Actual instantiation
# ===== PYTHON EXAMPLE =====
result = client.query.get("JeopardyQuestion", ["question", "answer", "points"]).do()
print(result)
# ===== END PYTHON EXAMPLE =====

# ===== TEST RESULTS =====
def check_results(result_in):
    assert "JeopardyQuestion" in result_in["data"]["Get"]
    assert result_in["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "points"}

check_results(result)
# ===== END TEST =====



# ===== GRAPHQL EXAMPLE =====
gql_query = """
# GraphQL query
{
  Get {
    JeopardyQuestion {
      question
      answer
      points
    }
  }
}
# END GraphQL query
"""
result = client.query.raw(gql_query)
print(result)
# ===== END GRAPHQL EXAMPLE =====

expected_result = """
// ===== EXPECTED RESULT =====
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "Jonah",
          "points": 100,
          "question": "This prophet passed the time he spent inside a fish offering up prayers"
        },
        ...
      ]
    }
  }
}
// ===== END EXPECTED RESULT =====
"""

# ===== TEST RESULTS =====
check_results(result)
# ===== END TEST =====
