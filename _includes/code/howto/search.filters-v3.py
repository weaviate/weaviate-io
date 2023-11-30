# Howto: Search -> Filters - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import json

# Instantiate the client with the user/password and OpenAI api key
client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace w/ your OPENAI API key
    }
)

# ==========================================
# ===== Single Filter =====
# ==========================================

# SingleFilterPython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer", "round"])
    # highlight-start
    .with_where({
        "path": ["round"],
        "operator": "Equal",
        "valueText": "Double Jeopardy!"
    })
    # highlight-end
    .with_limit(3)
    .do()
)

# print(json.dumps(response, indent=2))
# END SingleFilterPython


expected_response = (
# Expected SingleFilter results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "garage",
          "question": "This French word originally meant \"a place where one docks\" a boat, not a car",
          "round": "Double Jeopardy!"
        },
        {
          "answer": "Mexico",
          "question": "The Colorado River provides much of the border between this country's Baja California Norte & Sonora",
          "round": "Double Jeopardy!"
        },
        {
          "answer": "Amy Carter",
          "question": "On September 1, 1996 this former first daughter married Jim Wentzel at the Pond House near Plains",
          "round": "Double Jeopardy!"
        }
      ]
    }
  }
}
# END Expected SingleFilter results
)

# Tests
for question in response["data"]["Get"]["JeopardyQuestion"]:
    assert question["round"] == "Double Jeopardy!"
# End test


gql_query = """
# SingleFilterGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
# highlight-start
      where: {
        path: ["round"],
        operator: Equal,
        valueText: "Double Jeopardy!"
      }
# highlight-end
    ) {
      question
      answer
      round
    }
  }
}
# END SingleFilterGraphQL
"""

# Tests
gqlresponse = client.query.raw(gql_query)
assert gqlresponse == response
# End test


# ==========================================
# ===== Single Filter with nearText =====
# ==========================================

# SingleFilterNearTextPython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer", "round", "points"])
    # highlight-start
    .with_where({
        "path": ["points"],
        "operator": "GreaterThan",
        "valueInt": 200
    })
    .with_near_text({
        "concepts": ["fashion icons"]
    })
    # highlight-end
    .with_limit(3)
    .do()
)

# print(json.dumps(response, indent=2))
# END SingleFilterNearTextPython


expected_response = (
# Expected SingleFilterNearText results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "fashion designers",
          "points": 400,
          "question": "Ted Lapidus, Guy Laroche, Christian Lacroix",
          "round": "Jeopardy!"
        },
        {
          "answer": "Dapper Flapper",
          "points": 400,
          "question": "A stylish young woman of the 1920s",
          "round": "Double Jeopardy!"
        },
        {
          "answer": "Women's Wear Daily",
          "points": 800,
          "question": "This daily chronicler of the fashion industry launched \"W\", a bi-weekly, in 1972",
          "round": "Jeopardy!"
        }
      ]
    }
  }
}
# END Expected SingleFilterNearText results
)

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
for question in response["data"]["Get"]["JeopardyQuestion"]:
    assert question["points"] > 200
# End test


gql_query = """
# SingleFilterNearTextGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
# highlight-start
      where: {
        path: ["points"],
        operator: GreaterThan,
        valueInt: 200
      }
      nearText: {
        concepts: ["fashion icons"]
    }
# highlight-end
    ) {
      question
      answer
      round
      points
    }
  }
}
# END SingleFilterNearTextGraphQL
"""

# Tests
gqlresponse = client.query.raw(gql_query)
assert gqlresponse == response
# End test


# ==========================================
# ===== Partial Match Filter =====
# ==========================================


# LikeFilterPython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer", "round"])
    # highlight-start
    .with_where({
        "path": ["answer"],
        "operator": "Like",
        "valueText": "*inter*"
    })
    # highlight-end
    .with_limit(3)
    .do()
)

# print(json.dumps(response, indent=2))
# END LikeFilterPython


expected_response = (
# Expected LikeFilter results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "interglacial",
          "question": "This term refers to the warm periods within ice ages; we're in one of those periods now",
          "round": "Jeopardy!"
        },
        {
          "answer": "the Interior",
          "question": "In 1849, Thomas Ewing, \"The Logician of the West\", became the USA's first Secy. of this Cabinet Dept.",
          "round": "Jeopardy!"
        },
        {
          "answer": "Interlaken, Switzerland",
          "question": "You can view the Jungfrau Peak from the main street of this town between the Brienz & Thun Lakes",
          "round": "Final Jeopardy!"
        }
      ]
    }
  }
}
# END Expected LikeFilter results
)

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
for question in response["data"]["Get"]["JeopardyQuestion"]:
    assert "inter" in question["answer"].lower()
# End test


gql_query = """
# LikeFilterGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
# highlight-start
      where: {
        path: ["answer"],
        operator: Like,
        valueText: "*inter*"
      }
# highlight-end
    ) {
      question
      answer
      round
    }
  }
}
# END LikeFilterGraphQL
"""

# Tests
gqlresponse = client.query.raw(gql_query)
assert gqlresponse == response
# End test


# ==========================================
# ===== Multiple Filters with And =====
# ==========================================

# MultipleFiltersAndPython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer", "round", "points"])
    # highlight-start
    .with_where({
        "operator": "And",
        "operands": [
            {
                "path": ["round"],
                "operator": "Equal",
                "valueText": "Double Jeopardy!",
            },
            {
                "path": ["points"],
                "operator": "LessThan",
                "valueInt": 600,
            },
        ]
    })
    # highlight-end
    .with_limit(3)
    .do()
)

# print(json.dumps(response, indent=2))
# END MultipleFiltersAndPython


expected_response = (
# Expected MultipleFiltersAnd results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "Mexico",
          "points": 200,
          "question": "The Colorado River provides much of the border between this country's Baja California Norte & Sonora",
          "round": "Double Jeopardy!"
        },
        {
          "answer": "Amy Carter",
          "points": 200,
          "question": "On September 1, 1996 this former first daughter married Jim Wentzel at the Pond House near Plains",
          "round": "Double Jeopardy!"
        },
        {
          "answer": "Greek",
          "points": 400,
          "question": "Athenians speak the Attic dialect of this language",
          "round": "Double Jeopardy!"
        }
      ]
    }
  }
}
# END Expected MultipleFiltersAnd results
)

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
for question in response["data"]["Get"]["JeopardyQuestion"]:
    assert question["round"] == "Double Jeopardy!"
    assert question["points"] < 600
# End test


gql_query = """
# MultipleFiltersAndGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
# highlight-start
      where: {
        operator: And,
        operands: [
          {
            path: ["round"],
            operator: Equal,
            valueText: "Double Jeopardy!",
          },
          {
            path: ["points"],
            operator: LessThan,
            valueInt: 600,
          },
        ]

      }
# highlight-end
    ) {
      question
      answer
      round
      points
    }
  }
}
# END MultipleFiltersAndGraphQL
"""

# Tests
gqlresponse = client.query.raw(gql_query)
assert gqlresponse == response
# End test


# ==========================================
# ===== Multiple Filters with Nesting =====
# ==========================================

# MultipleFiltersNestedPython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer", "round", "points"])
    # highlight-start
    .with_where({
        "operator": "And",
        "operands": [
            {
                "path": ["answer"],
                "operator": "Like",
                "valueText": "*nest*",
            },
            {
                "operator": "Or",
                "operands": [
                    {
                        "path": ["points"],
                        "operator": "GreaterThan",
                        "valueInt": 700,
                    },
                    {
                        "path": ["points"],
                        "operator": "LessThan",
                        "valueInt": 300,
                    },
                ]
            }
        ]
    })
    # highlight-end
    .with_limit(3)
    .do()
)

# print(json.dumps(response, indent=2))
# END MultipleFiltersNestedPython


expected_response = (
# Expected MultipleFiltersNested results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "rhinestones",
          "points": 100,
          "question": "Imitation diamonds, they were originally gems obtained from a certain German river",
          "round": "Jeopardy!"
        },
        {
          "answer": "Clytemnestra",
          "points": 1000,
          "question": "In \"Absalom! Absalom!\", it's the \"mythological\" name of Thomas Stupen's daughter, known as Clytie for short",
          "round": "Double Jeopardy!"
        },
        {
          "answer": "Ernest Hemingway",
          "points": 200,
          "question": "His 1926 novel \"The Sun Also Rises\" has been published in England as \"Fiesta\"",
          "round": "Jeopardy!"
        }
      ]
    }
  }
}
# END Expected MultipleFiltersNested results
)

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
for question in response["data"]["Get"]["JeopardyQuestion"]:
    assert "nest" in question["answer"].lower()
    assert question["points"] < 300 or question["points"] > 700
# End test


gql_query = """
# MultipleFiltersNestedGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
# highlight-start
      where: {
        operator: And,
        operands: [
          {
            path: ["answer"],
            operator: Like,
            valueText: "*nest*",
          },
          {
            operator: Or,
            operands: [
                {
                    path: ["points"],
                    operator: GreaterThan,
                    valueInt: 700,
                },
                {
                    path: ["points"],
                    operator: LessThan,
                    valueInt: 300,
                },
            ]
          }
        ]

      }
# highlight-end
    ) {
      question
      answer
      round
      points
    }
  }
}
# END MultipleFiltersNestedGraphQL
"""

# Tests
gqlresponse = client.query.raw(gql_query)
assert gqlresponse == response
# End test

# ===================================================
# ===== Filters using Cross-referenced property =====
# ===================================================

# CrossReferencePython
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer", "round", "hasCategory {... on JeopardyCategory { title } }"])
    # highlight-start
    .with_where({
        "path": ["hasCategory", "JeopardyCategory", "title"],
        "operator": "Like",
        "valueText": "*Sport*"
    })
    # highlight-end
    .with_limit(3)
    .do()
)

# print(json.dumps(response, indent=2))
# END CrossReferencePython


expected_response = (
# Expected CrossReferencePython results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "Sampan",
          "hasCategory": [
            {
              "title": "TRANSPORTATION"
            }
          ],
          "question": "Smaller than a junk, this Oriental boat usually has a cabin with a roof made of mats",
          "round": "Jeopardy!"
        },
        {
          "answer": "Emmitt Smith",
          "hasCategory": [
            {
              "title": "SPORTS"
            }
          ],
          "question": "In 1994 this Dallas Cowboy scored 22 touchdowns; in 1995 he topped that with 25",
          "round": "Jeopardy!"
        },
        {
          "answer": "Lee Iacocca",
          "hasCategory": [
            {
              "title": "TRANSPORTATION"
            }
          ],
          "question": "Chrysler executive who developed the Ford Mustang",
          "round": "Jeopardy!"
        }
      ]
    }
  }
}
# END Expected CrossReferencePython results
)


# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
for question in response["data"]["Get"]["JeopardyQuestion"]:
    assert "sport" in question["hasCategory"][0]["title"].lower()
# End test


gql_query = """
# CrossReferenceGraphQL
{
  Get {
    JeopardyQuestion(
      limit: 3
# highlight-start
      where: {
        path: ["hasCategory", "JeopardyCategory", "title"],
        operator: Like,
        valueText: "*Sport*"
      }
# highlight-end
    ) {
      question
      answer
      round
      hasCategory {... on JeopardyCategory { title } }
    }
  }
}
# END CrossReferenceGraphQL
"""

# Tests
gqlresponse = client.query.raw(gql_query)
assert gqlresponse == response
# End test
