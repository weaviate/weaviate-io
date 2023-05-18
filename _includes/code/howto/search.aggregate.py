# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation shown on snippet
import weaviate

client = weaviate.Client(
    "https://your-cluster.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-KEY"),  # If auth on, replace w/ Weaviate instance API key
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # for the nearText example
    }
)

# ===============================
# ===== meta count EXAMPLES =====
# ===============================

# MetaCount Python
response = (
    client.query
    .aggregate("JeopardyQuestion")
    .with_meta_count()
    .do()
)

print(response["data"]["Aggregate"]["JeopardyQuestion"][0]["meta"]["count"])
# END MetaCount Python

# Test results
assert "JeopardyQuestion" in response["data"]["Aggregate"]
assert response["data"]["Aggregate"]["JeopardyQuestion"][0].keys() == {"meta"}
# End test


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

# Only used by FilteredTextBlock because literal comparisons are unreliable due to unpredictable key order in responses
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


# ==================================
# ===== Text property EXAMPLES =====
# ==================================

# TextProp Python
response = (
    client.query
    .aggregate("JeopardyQuestion")
    # highlight-start
    .with_fields("question { count type topOccurrences { occurs value } }")
    # highlight-end
    .do()
)

print(response["data"]["Aggregate"]["JeopardyQuestion"][0])
# END TextProp Python

# Test results
assert "JeopardyQuestion" in response["data"]["Aggregate"]
assert len(response["data"]["Aggregate"]["JeopardyQuestion"]) == 1
assert response["data"]["Aggregate"]["JeopardyQuestion"][0].keys() == {"question"}
assert response["data"]["Aggregate"]["JeopardyQuestion"][0]["question"]["count"] == 10000
# End test


gql_query = """
# TextProp GraphQL
{
  Aggregate {
    JeopardyQuestion {
      # highlight-start
      question {
        count
        type
        topOccurrences {
          occurs
          value
        }
      }
      # highlight-end
    }
  }
}
# END TextProp GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results

# Only used by FilteredTextBlock because literal comparisons are unreliable due to unpredictable key order in responses
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



# ====================================
# ===== Number property EXAMPLES =====
# ====================================

# NumberProp Python
response = (
    client.query
    .aggregate("JeopardyQuestion")
    # highlight-start
    .with_fields("points { count sum }")
    # highlight-end
    .do()
)
print(response["data"]["Aggregate"]["JeopardyQuestion"])
# END NumberProp Python

# Test results
assert "JeopardyQuestion" in response["data"]["Aggregate"]
assert len(response["data"]["Aggregate"]["JeopardyQuestion"]) == 1
assert response["data"]["Aggregate"]["JeopardyQuestion"][0].keys() == {"points"}
assert response["data"]["Aggregate"]["JeopardyQuestion"][0]["points"]["sum"] == 6324100
# End test


gql_query = """
# NumberProp GraphQL
{
  Aggregate {
    JeopardyQuestion {
      # highlight-start
      points {
        count
        sum
      }
      # highlight-end
    }
  }
}
# END NumberProp GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert gqlresponse == response
# END Test results

# Only used by FilteredTextBlock because literal comparisons are unreliable due to unpredictable key order in responses
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


# ============================
# ===== nearXXX EXAMPLES =====
# ============================

# nearXXX Python
response = (
    client.query
    .aggregate("JeopardyQuestion")
    # highlight-start
    .with_near_text({
        "concepts": ["animals in space"],
        "distance": 0.19
    })
    # highlight-end
    .with_meta_count()
    .do()
)

print(response["data"]["Aggregate"])
# END nearXXX Python

# Test results
assert "JeopardyQuestion" in response["data"]["Aggregate"]
assert len(response["data"]["Aggregate"]["JeopardyQuestion"]) == 1
assert response["data"]["Aggregate"]["JeopardyQuestion"][0] == {"meta": {"count": 6}}
# End test


gql_query = """
# nearXXX GraphQL
{
  Aggregate {
    JeopardyQuestion(
      # highlight-start
      nearText: {
        concepts: ["animals in space"]
        distance: 0.19
      }
      # highlight-end
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

# Only used by FilteredTextBlock because literal comparisons are unreliable due to unpredictable key order in responses
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


# =========================================
# ===== nearText.objectLimit EXAMPLES =====
# =========================================

# objectLimit Python
response = (
    client.query
    .aggregate("JeopardyQuestion")
    .with_near_text({
        "concepts": ["animals in space"]
    })
    # highlight-start
    .with_object_limit(10)
    # highlight-end
    .with_fields("points { sum }")
    .do()
)
print(response["data"]["Aggregate"]["JeopardyQuestion"])
# END objectLimit Python

# Test results
assert "JeopardyQuestion" in response["data"]["Aggregate"]
assert len(response["data"]["Aggregate"]["JeopardyQuestion"]) == 1
assert response["data"]["Aggregate"]["JeopardyQuestion"][0] == {"points": {"sum": 4600}}
# End test


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

# Only used by FilteredTextBlock because literal comparisons are unreliable due to unpredictable key order in responses
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


# ============================
# ===== groupBy EXAMPLES =====
# ============================

# groupBy Python
response = (
    client.query
    .aggregate("JeopardyQuestion")
    # highlight-start
    .with_group_by_filter(["round"])
    .with_fields("groupedBy { value }")
    # highlight-end
    .with_meta_count()
    .do()
)
print(response["data"]["Aggregate"]["JeopardyQuestion"])
# END groupBy Python

# Test results
assert "JeopardyQuestion" in response["data"]["Aggregate"]
assert len(response["data"]["Aggregate"]["JeopardyQuestion"]) == 3
assert "groupedBy" in response["data"]["Aggregate"]["JeopardyQuestion"][0]
assert "meta" in response["data"]["Aggregate"]["JeopardyQuestion"][2]
# End test


gql_query = """
# groupBy GraphQL
{
  Aggregate {
    # highlight-start
    JeopardyQuestion(groupBy: "round") {
      groupedBy {
        value
      }
      # highlight-end
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

# Only used by FilteredTextBlock because literal comparisons are unreliable due to unpredictable key order in responses
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


# =================================
# ===== where filter EXAMPLES =====
# =================================

# whereFilter Python
response = (
    client.query
    .aggregate("JeopardyQuestion")
    # highlight-start
    .with_where({
        "path": ["round"],
        "operator": "Equal",
        "valueText": "Final Jeopardy!"
    })
    # highlight-end
    .with_meta_count()
    .do()
)
print(response["data"]["Aggregate"]["JeopardyQuestion"])
# END whereFilter Python

# Test results
assert "JeopardyQuestion" in response["data"]["Aggregate"]
assert len(response["data"]["Aggregate"]["JeopardyQuestion"]) == 1
assert response["data"]["Aggregate"]["JeopardyQuestion"][0] == {"meta": {"count": 285}}
# End test


gql_query = """
# whereFilter GraphQL
{
  Aggregate {
    # highlight-start
    JeopardyQuestion(where: {
      path: ["round"]
      operator: Equal
      valueText: "Final Jeopardy!"
    }) {
    # highlight-end
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

# Only used by FilteredTextBlock because literal comparisons are unreliable due to unpredictable key order in responses
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
