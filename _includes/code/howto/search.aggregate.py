# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation shown on snippet
import weaviate

client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
)

# ===============================
# ===== meta count EXAMPLES =====
# ===============================

# MetaCount Python
response = (
    client.query
    .get("JeopardyQuestion", ["question"])
    .do()
)

print(response)
# END MetaCount Python

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_response = """
// MetaCount Expected Results
{
  "data": {
    "Aggregate": {
      "JeopardyQuestion": [
        {
          "meta": {
            "count": 10000
          }
        }
      ]
    }
  }
}
// END MetaCount Expected Results
"""


gql_query = """
# MetaCount GraphQL
{
  Aggregate {
    JeopardyQuestion {
      meta {
        count
      }
    }
  }
}
# END MetaCount GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results



# ==================================
# ===== Text property EXAMPLES =====
# ==================================

# TextProp Python
response = (
    client.query
    .get("JeopardyQuestion", ["question"])
    # highlight-start
    .with_limit(1)
    # highlight-end
    .do()
)

print(response)
# END TextProp Python

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_response = """
// TextProp Expected Results
{
  "data": {
    "Aggregate": {
      "JeopardyQuestion": [
        {
          "question": {
            "count": 10000,
            "topOccurrences": [
              {
                "occurs": 2,
                "value": "A fake foot covering"
              },
              {
                "occurs": 2,
                "value": "A noisy cumulonimbus"
              },
              {
                "occurs": 2,
                "value": "A special flower for April, it can be oxeye or shasta"
              },
              {
                "occurs": 2,
                "value": "A whole lot of shakin' goes on in this science that deals almost exclusively with earthquakes"
              },
              {
                "occurs": 2,
                "value": "Behaviorists \\u0026 dogs drool over the work of this Russian physiologist"
              }
            ],
            "type": "text"
          }
        }
      ]
    }
  }
}
// END TextProp Expected Results
"""


gql_query = """
# TextProp GraphQL
{
  Aggregate {
    JeopardyQuestion {
      question {
        count
        type
        topOccurrences {
          occurs
          value
        }
      }
    }
  }
}
# END TextProp GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results



# ====================================
# ===== Number property EXAMPLES =====
# ====================================

# NumberProp Python
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
# END NumberProp Python

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_response = """
// NumberProp Expected Results
{
  "data": {
    "Aggregate": {
      "JeopardyQuestion": [
        {
          "points": {
            "count": 10000,
            "sum": 6324100
          }
        }
      ]
    }
  }
}
// END NumberProp Expected Results
"""


gql_query = """
# NumberProp GraphQL
{
  Aggregate {
    JeopardyQuestion {
      points {
        count
        sum
      }
    }
  }
}
# END NumberProp GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results



# ============================
# ===== nearXXX EXAMPLES =====
# ============================

# nearXXX Python
response = (
    client.query
    # highlight-start
    .get("JeopardyQuestion", ["question", "answer", "points"])
    # highlight-end
    .with_limit(1)
    .do()
)
print(response)
# END nearXXX Python

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "points"}
# End test


expected_response = """
// nearXXX Expected Results
{
  "data": {
    "Aggregate": {
      "JeopardyQuestion": [
        {
          "meta": {
            "count": 6
          }
        }
      ]
    }
  }
}
// END nearXXX Expected Results
"""


gql_query = """
# nearXXX GraphQL
{
  Aggregate {
    JeopardyQuestion(
      nearText: {
        concepts: ["animals in space"]
        distance: 0.19
      }
    ) {
      meta {
        count
      }
    }
  }
}
# END nearXXX GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results



# =========================================
# ===== nearText.objectLimit EXAMPLES =====
# =========================================

# objectLimit Python
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
# END objectLimit Python

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"vector"}
# End test


expected_response = """
// objectLimit Expected Results
{
  "data": {
    "Aggregate": {
      "JeopardyQuestion": [
        {
          "points": {
            "sum": 4600
          }
        }
      ]
    }
  }
}
// END objectLimit Expected Results
"""


gql_query = """
# objectLimit GraphQL
{
  Aggregate {
    JeopardyQuestion(
      nearText: {
        concepts: ["animals in space"]
      }
      # highlight-start
      objectLimit: 10
      # highlight-end
    ) {
      points {
        sum
      }
    }
  }
}
# END objectLimit GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results


# ============================
# ===== groupBy EXAMPLES =====
# ============================

# groupBy Python
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
# END groupBy Python

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"id"}
# End test


expected_response = """
// groupBy Expected Results
{
  "data": {
    "Aggregate": {
      "JeopardyQuestion": [
        {
          "groupedBy": {
            "value": "Double Jeopardy!"
          },
          "meta": {
            "count": 5193
          }
        },
        {
          "groupedBy": {
            "value": "Jeopardy!"
          },
          "meta": {
            "count": 4522
          }
        },
        {
          "groupedBy": {
            "value": "Final Jeopardy!"
          },
          "meta": {
            "count": 285
          }
        }
      ]
    }
  }
}
// END groupBy Expected Results
"""


gql_query = """
# groupBy GraphQL
{
  Aggregate {
    JeopardyQuestion(groupBy: "round") {
      groupedBy {
        value
      }
      meta {
        count
      }
    }
  }
}
# END groupBy GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results


# =================================
# ===== where filter EXAMPLES =====
# =================================

# whereFilter Python
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
# END whereFilter Python

# Test results
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"id"}
# End test


expected_response = """
// whereFilter Expected Results
{
  "data": {
    "Aggregate": {
      "JeopardyQuestion": [
        {
          "meta": {
            "count": 285
          }
        }
      ]
    }
  }
}
// END whereFilter Expected Results
"""


gql_query = """
# whereFilter GraphQL
{
  Aggregate {
    JeopardyQuestion(where: {
      path: ["round"]
      operator: Equal
      valueText: "Final Jeopardy!"
    }) {
      meta {
        count
      }
    }
  }
}
# END whereFilter GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results
