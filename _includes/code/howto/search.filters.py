# Howto: Search -> Filters - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import weaviate.classes as wvc
import json
import os

# Instantiate the client with the user/password and OpenAI api key
# client = weaviate.Client(
#     "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
#     auth_client_secret=weaviate.auth.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
#     additional_headers={
#         "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace w/ your OPENAI API key
#     }
# )
# TODOv4 - update this to call the wcs instance
client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

# ==========================================
# ===== Single Filter =====
# ==========================================

# SingleFilterPython
from weaviate.classes import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=Filter("round").equal("Double Jeopardy!"),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
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
# TODOv4 - update tests
# for question in response["data"]["Get"]["JeopardyQuestion"]:
#     assert question["round"] == "Double Jeopardy!"
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
# gqlresponse = client.query.raw(gql_query)
# assert gqlresponse == response
# End test


# ==========================================
# ===== Single Filter with nearText =====
# ==========================================

# SingleFilterNearTextPython
from weaviate.classes import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.near_text(
    query="fashion icons",
    # highlight-start
    filters=Filter("points").greater_than(200),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
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
# assert "JeopardyQuestion" in response["data"]["Get"]
# for question in response["data"]["Get"]["JeopardyQuestion"]:
#     assert question["points"] > 200
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
# gqlresponse = client.query.raw(gql_query)
# assert gqlresponse == response
# End test


# ==========================================
# ===== Partial Match Filter =====
# ==========================================


# LikeFilterPython
from weaviate.classes import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=Filter("answer").like("*inter*"),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
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
# assert "JeopardyQuestion" in response["data"]["Get"]
# for question in response["data"]["Get"]["JeopardyQuestion"]:
#     assert "inter" in question["answer"].lower()
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
# gqlresponse = client.query.raw(gql_query)
# assert gqlresponse == response
# End test


# ==========================================
# ===== Multiple Filters with And =====
# ==========================================

# MultipleFiltersAndPython
from weaviate.classes import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    # Use & as AND
    #     | as OR
    filters=Filter("round").equal("Double Jeopardy!") &
            Filter("points").less_than(600),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
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
# assert "JeopardyQuestion" in response["data"]["Get"]
# for question in response["data"]["Get"]["JeopardyQuestion"]:
#     assert question["round"] == "Double Jeopardy!"
#     assert question["points"] < 600
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
# gqlresponse = client.query.raw(gql_query)
# assert gqlresponse == response
# End test


# ==========================================
# ===== Multiple Filters with Nesting =====
# ==========================================

# MultipleFiltersNestedPython
from weaviate.classes import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=Filter("question").like("*nest*") &
            (Filter("points").greater_than(700) | Filter("points").less_than(300)),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
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
# assert "JeopardyQuestion" in response["data"]["Get"]
# for question in response["data"]["Get"]["JeopardyQuestion"]:
#     assert "nest" in question["answer"].lower()
#     assert question["points"] < 300 or question["points"] > 700
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
# gqlresponse = client.query.raw(gql_query)
# assert gqlresponse == response
# End test

# ===================================================
# ===== Filters using Cross-referenced property =====
# ===================================================

# CrossReferencePython
from weaviate.classes import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=Filter(["hasCategory", "JeopardyCategory", "title"]).like("*Sport*"),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
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
# assert "JeopardyQuestion" in response["data"]["Get"]
# for question in response["data"]["Get"]["JeopardyQuestion"]:
#     assert "sport" in question["hasCategory"][0]["title"].lower()
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
# gqlresponse = client.query.raw(gql_query)
# assert gqlresponse == response
# End test


# ========================================
# FilterByID
# ========================================

# START FilterById
from weaviate.collections.classes.filters import FilterMetadata

collection = client.collections.get("Article")

target_id = "00037775-1432-35e5-bc59-443baaef7d80"
response = collection.query.fetch_objects(
    filters=FilterMetadata.ById.equal(target_id)
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
    print(o.uuid)
# END FilterById

# TEST
assert str(response.objects[0].uuid) == target_id

# START-ANY

client.close()
# END-ANY