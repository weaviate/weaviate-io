# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import json

# Instantiate the client with the user/password and OpenAI api key
client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.auth.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace w/ your OPENAI API key
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

print(json.dumps(response, indent=2))
# END MetaCount Python


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
assert "JeopardyQuestion" in response["data"]["Aggregate"]
assert response["data"]["Aggregate"]["JeopardyQuestion"][0].keys() == {"meta"}
assert gqlresponse == response
# END Test results

expected_response = (
# MetaCount Expected Results
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
# END MetaCount Expected Results
)
assert response == expected_response


# ==================================
# ===== Text property EXAMPLES =====
# ==================================

# TextProp Python
response = (
    client.query
    .aggregate("JeopardyQuestion")
    # highlight-start
    .with_fields("answer { count type topOccurrences { occurs value } }")
    # highlight-end
    .do()
)

print(json.dumps(response, indent=2))
# END TextProp Python

gql_query = """
# TextProp GraphQL
{
  Aggregate {
    JeopardyQuestion {
      # highlight-start
      answer {
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
assert response["data"]["Aggregate"]["JeopardyQuestion"][0]["answer"]["count"] == 10000
assert gqlresponse == response
# END Test results

expected_response = (
# TextProp Expected Results
{
  "data": {
    "Aggregate": {
      "JeopardyQuestion": [
        {
          "answer": {
            "count": 10000,
            "topOccurrences": [
              {
                "occurs": 19,
                "value": "Australia"
              },
              {
                "occurs": 18,
                "value": "Hawaii"
              },
              {
                "occurs": 16,
                "value": "Boston"
              },
              {
                "occurs": 15,
                "value": "French"
              },
              {
                "occurs": 15,
                "value": "India"
              }
            ],
            "type": "text"
          }
        }
      ]
    }
  }
}
# END TextProp Expected Results
)
for i, row in enumerate(expected_response["data"]["Aggregate"]["JeopardyQuestion"][0]["answer"]["topOccurrences"]):
    for k in ["occurs", "value"]:
      assert response["data"]["Aggregate"]["JeopardyQuestion"][0]["answer"]["topOccurrences"][i][k] == row[k]


# ====================================
# ===== int property EXAMPLES =====
# ====================================

# IntProp Python
response = (
    client.query
    .aggregate("JeopardyQuestion")
    # highlight-start
    .with_fields("points { count sum }")
    # highlight-end
    .do()
)
print(json.dumps(response, indent=2))
# END IntProp Python

gql_query = """
# IntProp GraphQL
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
# END IntProp GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert response["data"]["Aggregate"]["JeopardyQuestion"][0]["points"]["sum"] == 6324100
assert gqlresponse == response
# END Test results

expected_response = (
# IntProp Expected Results
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
# END IntProp Expected Results
)
assert response == expected_response

for k, v in expected_response["data"]["Aggregate"]["JeopardyQuestion"][0]["points"].items():
    assert response["data"]["Aggregate"]["JeopardyQuestion"][0]["points"][k] == v


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
print(json.dumps(response, indent=2))
# END groupBy Python


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
assert len(response["data"]["Aggregate"]["JeopardyQuestion"]) == 3
assert "groupedBy" in response["data"]["Aggregate"]["JeopardyQuestion"][0]
assert "meta" in response["data"]["Aggregate"]["JeopardyQuestion"][2]
assert gqlresponse == response
# END Test results

expected_response = (
# groupBy Expected Results
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
# END groupBy Expected Results
)
for i, group in enumerate(response["data"]["Aggregate"]["JeopardyQuestion"]):
    expected_group = expected_response["data"]["Aggregate"]["JeopardyQuestion"][i]
    for k, v in group.items():
        assert v == expected_group[k]



# =========================================
# ===== nearTextWithLimit EXAMPLES =====
# =========================================

# nearTextWithLimit Python
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
print(json.dumps(response, indent=2))
# END nearTextWithLimit Python


gql_query = """
# nearTextWithLimit GraphQL
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
# END nearTextWithLimit GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert response["data"]["Aggregate"]["JeopardyQuestion"][0]["points"]["sum"] == 4600
assert gqlresponse == response
# END Test results

expected_response = (
# nearTextWithLimit Expected Results
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
# END nearTextWithLimit Expected Results
)
for k, v in expected_response["data"]["Aggregate"]["JeopardyQuestion"][0]["points"].items():
    assert response["data"]["Aggregate"]["JeopardyQuestion"][0]["points"][k] == v


# ============================
# ===== nearTextWithDistance EXAMPLES =====
# ============================

# nearTextWithDistance Python
response = (
    client.query
    .aggregate("JeopardyQuestion")
    # highlight-start
    .with_near_text({
        "concepts": ["animals in space"],
        "distance": 0.19
    })
    # highlight-end
    .with_fields("points { sum }")
    .do()
)

print(json.dumps(response, indent=2))
# END nearTextWithDistance Python


gql_query = """
# nearTextWithDistance GraphQL
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
      points {
        sum
      }
    }
  }
}
# END nearTextWithDistance GraphQL
"""
gqlresponse = client.query.raw(gql_query)
# Test results
assert response["data"]["Aggregate"]["JeopardyQuestion"][0]["points"]["sum"] == 3000
assert gqlresponse == response
# END Test results

expected_response = (
# nearTextWithDistance Expected Results
{
  "data": {
    "Aggregate": {
      "JeopardyQuestion": [
        {
          "points": {
            "sum": 3000
          }
        }
      ]
    }
  }
}
# END nearTextWithDistance Expected Results
)
for k, v in expected_response["data"]["Aggregate"]["JeopardyQuestion"][0]["points"].items():
    assert response["data"]["Aggregate"]["JeopardyQuestion"][0]["points"][k] == v


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

print(json.dumps(response, indent=2))
# END whereFilter Python


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
assert response["data"]["Aggregate"]["JeopardyQuestion"][0] == {"meta": {"count": 285}}
assert gqlresponse == response
# END Test results

expected_response = (
# whereFilter Expected Results
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
# END whereFilter Expected Results
)
assert response == expected_response
