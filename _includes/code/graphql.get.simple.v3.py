import weaviate
import os


"""
# ===== PYTHON EXAMPLE =====
import weaviate

client = weaviate.Client(
    "https://WEAVIATE_INSTANCE_URL",  # Replace with your Weaviate URL
)

# ===== END PYTHON EXAMPLE =====
"""

# Actual instantiation for testing
client = weaviate.Client(
    "https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.auth.AuthApiKey("learn-weaviate"),
)
# END Actual instantiation
# ===== PYTHON EXAMPLE =====
result = client.query.get("JeopardyQuestion", ["question", "answer", "points"]).do()
print(result)
# ===== END PYTHON EXAMPLE =====


# ===== TEST RESULTS =====
def check_results(result_in):
    assert "JeopardyQuestion" in result_in["data"]["Get"]
    assert result_in["data"]["Get"]["JeopardyQuestion"][0].keys() == {
        "question",
        "answer",
        "points",
    }


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


# ========================================
# GroupByExample
# ========================================

# Actual client instantiation
client = weaviate.Client(
    url=os.getenv("WCD_EDU_DEMO_URL"),
    auth_client_secret=weaviate.auth.AuthApiKey(os.getenv("WCD_EDU_DEMO_RO_KEY")),
    additional_headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")},
)

response = client.query.raw(
    """
# START GroupByExampleGQL
{
  Get{
    JeopardyQuestion(
      nearText: {
        concepts: ["animals"],
        distance: 0.2
      }
      groupBy: {  # How to group the results
        path: ["points"]
        groups: 3
        objectsPerGroup: 5
      }
    ) {
      _additional {
        group {  # Data to be returned
          id
          groupedBy{ value path }
          count
          hits {  # Actual properties to be retrieved
            question
            answer
            _additional {
              id
              distance
            }
          }
        }
      }
    }
  }
}
# END GroupByExampleGQL
"""
)

print(response)
