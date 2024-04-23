# ===== PYTHON EXAMPLE =====
import weaviate

client = weaviate.Client(
    "https://WEAVIATE_INSTANCE_URL",  # Replace with your Weaviate URL
)

# ===== END PYTHON EXAMPLE =====
client = weaviate.Client(
    "https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.auth.AuthApiKey("learn-weaviate"),
)

# ===== PYTHON EXAMPLE =====
result = client.query.get("JeopardyQuestion", ["question", "answer", "points", "hasCategory {... on JeopardyCategory {title }}"]).do()

print(result)
# ===== END PYTHON EXAMPLE =====

# ===== TEST RESULTS =====
def check_results(result_in):
    assert "JeopardyQuestion" in result_in["data"]["Get"]
    assert result_in["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "points", "hasCategory"}

check_results(result)
# ===== END TEST =====





gql_query = """
# ===== GRAPHQL EXAMPLE =====
{
  Get {
    JeopardyQuestion {
      question
      answer
      points
      hasCategory {                # the reference property
        ... on JeopardyCategory {  # the destination class
          title                    # the property related to target class
        }
      }
    }
  }
}
# ===== END GRAPHQL EXAMPLE =====
"""
result = client.query.raw(gql_query)
print(result)

expected_result = """
// ===== EXPECTED RESULT =====
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "Jonah",
          "hasCategory": [
            {
              "title": "THE BIBLE"
            }
          ],
          "points": 100,
          "question": "This prophet passed the time he spent inside a fish offering up prayers"
        },
        // shortened for brevity
      ]
    }
  }
}
// ===== END EXPECTED RESULT =====
"""

# ===== TEST RESULTS =====
check_results(result)
# ===== END TEST =====
