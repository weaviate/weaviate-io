# Howto: Search -> Filters - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import json
import os

# Instantiate the client with the user/password and OpenAI api key
client = weaviate.Client(
    os.getenv("WCS_DEMO_URL"),  # Replace with your Weaviate URL
    auth_client_secret=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),  # If authentication is on. Replace w/ your Weaviate instance API key
    additional_headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")  # Replace w/ your OPENAI API key
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

print(json.dumps(response, indent=2))
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

print(json.dumps(response, indent=2))
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
# ===== ContainsAny Filter =====
# ==========================================

# ContainsAnyFilter
# highlight-start
token_list = ["australia", "india"]
# highlight-end

response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer", "round", "points"])
    # highlight-start
    # Find objects where the `answer` property contains any of the strings in `token_list`
    .with_where({
        "path": ["answer"],
        "operator": "ContainsAny",
        "valueText": token_list
    })
    # highlight-end
    .with_limit(3)
    .do()
)

print(json.dumps(response, indent=2))
# END ContainsAnyFilter


expected_response = (
# Expected ContainsAnyFilter results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "India",
          "points": 100,
          "question": "Country that is home to Parsis & Sikhs",
          "round": "Jeopardy!"
        },
        {
          "answer": "Australia",
          "points": 400,
          "question": "The redundant-sounding Townsville, in this country's Queensland state, was named for Robert Towns",
          "round": "Double Jeopardy!"
        },
        {
          "answer": "Australia",
          "points": 100,
          "question": "Broken Hill, this country's largest company, took its name from a small town in New South Wales",
          "round": "Jeopardy!"
        }
      ]
    }
  }
}
# END Expected ContainsAnyFilter results
)

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
for question in response["data"]["Get"]["JeopardyQuestion"]:
    assert any(i in question["answer"].lower() for i in token_list)
# End test


gql_query = """
# GraphQLContainsAnyFilter
{
  Get {
    JeopardyQuestion(
      limit: 3
# highlight-start
      where: {
        path: ["answer"],
        operator: ContainsAny,
        valueText: ["australia", "india"]
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
# END GraphQLContainsAnyFilter
"""

# Tests
gqlresponse = client.query.raw(gql_query)
assert gqlresponse == response
# End test


# ==========================================
# ===== ContainsAll Filter =====
# ==========================================

# ContainsAllFilter
# highlight-start
token_list = ["blue", "red"]
# highlight-end

response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer", "round", "points"])
    # highlight-start
    .with_where({
        "path": ["question"],
        "operator": "ContainsAll",
        "valueText": token_list
    })
    # highlight-end
    .with_limit(3)
    .do()
)

print(json.dumps(response, indent=2))
# END ContainsAllFilter


expected_response = (
# Expected ContainsAllFilter results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "James Patterson",
          "points": 1000,
          "question": "His Alex Cross thrillers include \"Roses are Red\" & \"Violets are Blue\"",
          "round": "Jeopardy!"
        },
        {
          "answer": "a chevron",
          "points": 800,
          "question": "Chevron's red & blue logo is this heraldic shape, meant to convey rank & service",
          "round": "Jeopardy!"
        },
        {
          "answer": "litmus",
          "points": 400,
          "question": "Vegetable dye that turns red in acid solutions & blue in alkaline solutions",
          "round": "Double Jeopardy!"
        }
      ]
    }
  }
}
# END Expected ContainsAllFilter results
)

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
for question in response["data"]["Get"]["JeopardyQuestion"]:
    assert all(i in question["question"].lower() for i in token_list)
# End test


gql_query = """
# GraphQLContainsAllFilter
{
  Get {
    JeopardyQuestion(
      limit: 3
# highlight-start
      where: {
        path: ["question"],
        operator: ContainsAll,
        valueText: ["blue", "red"]
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
# END GraphQLContainsAllFilter
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

print(json.dumps(response, indent=2))
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

print(json.dumps(response, indent=2))
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

print(json.dumps(response, indent=2))
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

print(json.dumps(response, indent=2))
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


# ========================================
# FilterByID
# ========================================

# START FilterById
target_id = "00037775-1432-35e5-bc59-443baaef7d80"
response = (
    client.query
    .get("Article", ["title"])
    .with_where({
        "path": "id",
        "operator": "Equal",
        "valueText": target_id
    })
    .with_additional("id")
    .do()
)

print(response)
# END FilterById

# TEST
assert response["data"]["Get"]["Article"][0]["_additional"]["id"] == target_id


gql_query = """
# GQLFilterById
{
  Get {
    Article(
# highlight-start
      where: {
        path: ["id"],
        operator: Equal,
        valueText: "00037775-1432-35e5-bc59-443baaef7d80"
      }
# highlight-end
    ) {
      title
      _additional { id }
    }
  }
}
# END GQLFilterById
"""


# Tests
gqlresponse = client.query.raw(gql_query)

assert gqlresponse == response
# End test


# ========================================
# FilterByTimestamp
# ========================================

# START FilterByTimestamp
timestamp_str = "2020-01-01T00:00:00+00:00"

response = (
    client.query
    .get("Article", ["title"])
    .with_where({
        "path": ["_creationTimeUnix"],
        "operator": "GreaterThan",
        "valueDate": timestamp_str  # Can use either `valueDate` with a `RFC3339` datetime or `valueText` as Unix epoch milliseconds
    })
    .with_additional("creationTimeUnix")
    .with_limit(3)
    .do()
)

print(response)
# END FilterByTimestamp

from datetime import datetime, timezone

dt = datetime.fromisoformat(timestamp_str)
query_epoch = dt.replace(tzinfo=timezone.utc).timestamp()
resp_epoch = int(response["data"]["Get"]["Article"][0]["_additional"]["creationTimeUnix"])

assert resp_epoch > query_epoch


gql_query = """
# GQLFilterByTimestamp
{
  Get {
    Article(
# highlight-start
      limit: 3
      where: {
        path: ["_creationTimeUnix"],
        operator: GreaterThan,
        valueDate: "2020-01-01T00:00:00+00:00"
      }
# highlight-end
    ) {
      title
      _additional { creationTimeUnix }
    }
  }
}
# END GQLFilterByTimestamp
"""

# Tests
gqlresponse = client.query.raw(gql_query)

assert gqlresponse == response
# End test


# ========================================
# FilterByPropertyLength
# ========================================

# START FilterByPropertyLength
response = (
    client.query
    .get("JeopardyQuestion", ["answer"])
    .with_where({
        "path": ["len(answer)"],
        "operator": "GreaterThan",
        "valueInt": 20
    })
    .with_limit(3)
    .do()
)

print(response)
# END FilterByPropertyLength

for question in response["data"]["Get"]["JeopardyQuestion"]:
    assert len(question["answer"]) > 20


gql_query = """
# GQLFilterByPropertyLength
{
  Get {
    JeopardyQuestion(
# highlight-start
      limit: 3
      where: {
        path: ["len(answer)"],
        operator: GreaterThan,
        valueInt: 20
      }
# highlight-end
    ) {
      answer
    }
  }
}
# END GQLFilterByPropertyLength
"""

# Tests
gqlresponse = client.query.raw(gql_query)

assert gqlresponse == response
# End test


# ========================================
# FilterByGeolocation
# ========================================


# TODO - Add geolocation data to the test data set & uncomment this section
'''
# START FilterbyGeolocation
get_publications_where = """
  {
    Get {
      Publication(where: {
        operator: WithinGeoRange,
        valueGeoRange: {
          geoCoordinates: {
            latitude: 52.3932696,    # latitude
            longitude: 4.8374263     # longitude
          },
          distance: {
            max: 1000           # distance in meters
          }
        },
        path: ["headquartersGeoLocation"]  # property needs to be a geoLocation data type.
      }) {
        name
        headquartersGeoLocation {
          latitude
          longitude
        }
      }
    }
  }
"""

query_result = client.query.raw(get_publications_where)
print(query_result)
# END FilterbyGeolocation
'''


# GQL query

"""
# START GQLFilterbyGeolocation
  {
    Get {
      Publication(where: {
        operator: WithinGeoRange,
        valueGeoRange: {
          geoCoordinates: {
            latitude: 52.3932696,    # latitude
            longitude: 4.8374263     # longitude
          },
          distance: {
            max: 1000           # distance in meters
          }
        },
        path: ["headquartersGeoLocation"]  # property needs to be a geoLocation data type.
      }) {
        name
        headquartersGeoLocation {
          latitude
          longitude
        }
      }
    }
  }
# END GQLFilterbyGeolocation
"""
