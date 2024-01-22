# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation shown on snippet
import weaviate
import json, os

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

# ==============================
# ===== BASIC GET EXAMPLES =====
# ==============================

# BasicGetPython
jeopardy = client.collections.get("JeopardyQuestion")
# highlight-start
response = jeopardy.query.fetch_objects()
# highlight-end

for o in response.objects:
    print(o.properties)
# END BasicGetPython

# TESTS IN THIS FILE NOT CHECKED OR EXPECTED TO RUN YET

# Test results
# TODOv4 update tests
# assert "JeopardyQuestion" in response["data"]["Get"]
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test

expected_response = """
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

gql_query = """
# BasicGetGraphQL
{
  Get {
    JeopardyQuestion {
      question
    }
  }
}
# END BasicGetGraphQL
"""

# gqlresponse = client.query.raw(gql_query)

# Test results
# assert gqlresponse == response

# END Test results

# ====================================
# ===== BASIC GET LIMIT EXAMPLES =====
# ====================================

# GetWithLimitPython
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    limit=1
    # highlight-end
)

for o in response.objects:
    print(o.properties)
# END GetWithLimitPython

# Test results
# assert "JeopardyQuestion" in response["data"]["Get"]
# assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_response = """
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


gql_query = """
# GetWithLimitGraphQL
{
  Get {
    JeopardyQuestion (
    # highlight-start
      limit: 1
    # highlight-end
    ) {
      question
    }
  }
}
# END GetWithLimitGraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# Test results
# assert gqlresponse == response
# END Test results



# ==========================================
# ===== GET LIMIT WITH OFFSET EXAMPLES =====
# ==========================================

# GetWithLimitOffsetPython
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    limit=1,
    offset=1
    # highlight-end
)

for o in response.objects:
    print(o.properties)
# END GetWithLimitOffsetPython

# Test results
# assert "JeopardyQuestion" in response["data"]["Get"]
# assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question"}
# End test


expected_response = """
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


gql_query = """
# GetWithLimitOffsetGraphQL
{
  Get {
    JeopardyQuestion (
    # highlight-start
      limit: 1
      offset: 1
    # highlight-end
    ) {
      question
    }
  }
}
# END GetWithLimitOffsetGraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# Test results
# assert gqlresponse == response
# END Test results



# ==========================================
# ===== GET OBJECT PROPERTIES EXAMPLES =====
# ==========================================

# GetPropertiesPython
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    limit=1,
    return_properties=["question", "answer", "points"]
    # highlight-end
)

for o in response.objects:
    print(o.properties)
# END GetPropertiesPython

# Test results
# assert "JeopardyQuestion" in response["data"]["Get"]
# assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "points"}
# End test


expected_response = """
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


gql_query = """
# GetPropertiesGraphQL
{
  Get {
    JeopardyQuestion (limit: 1) {
    # highlight-start
      question
      answer
      points
    # highlight-end
    }
  }
}
# END GetPropertiesGraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# Test results
# assert gqlresponse == response
# END Test results



# ======================================
# ===== GET OBJECT VECTOR EXAMPLES =====
# ======================================

# GetObjectVectorPython
# highlight-start
import weaviate.classes as wvc
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    include_vector=True,
    # highlight-end
    limit=1
)

print(response.objects[0].vector)
# END GetObjectVectorPython

# Test results
# assert "JeopardyQuestion" in response["data"]["Get"]
# assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
# assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"vector"}
# End test


expected_response = """
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


gql_query = """
# GetObjectVectorGraphQL
{
  Get {
    JeopardyQuestion (limit: 1) {
    # highlight-start
      _additional {
        vector
      }
    # highlight-end
    }
  }
}
# END GetObjectVectorGraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# Test results
# assert gqlresponse == response
# END Test results


# ==================================
# ===== GET OBJECT ID EXAMPLES =====
# ==================================

# GetObjectIdPython
# highlight-start
import weaviate.classes as wvc
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # Object IDs are included by default with the `v4` client! :)
    limit=1
)

for o in response.objects:
    print(o.uuid)
# END GetObjectIdPython

# Test results
# assert "JeopardyQuestion" in response["data"]["Get"]
# assert len(response["data"]["Get"]["JeopardyQuestion"]) == 1
# assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"id"}
# End test


expected_response = """
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


gql_query = """
# GetObjectIdGraphQL
{
  Get {
    JeopardyQuestion (limit: 1) {
    # highlight-start
      _additional {
        id
      }
    # highlight-end
    }
  }
}
# END GetObjectIdGraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# Test results
# assert gqlresponse == response
# END Test results


# ==============================
# ===== GET WITH CROSS-REF EXAMPLES =====
# ==============================

# TODO - REVIEW this when 1.23 live & corresponding client live
"""
# GetWithCrossRefsPython
# highlight-start
import weaviate.classes as wvc
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    return_references=[
        # highlight-start
        wvc.query.QueryReference(
            link_on="hasCategory",
            return_properties=["title"]
        ),
        # highlight-end
        "question",
    ],
    limit=2
)

for o in response.objects:
    print(o.properties["question"])
    # print referenced objects
    for ref in o.references["hasCategory"].objects:
        print(ref.properties)
# END GetWithCrossRefsPython
"""

expected_response = (
# GetWithCrossRefs Expected Results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "hasCategory": [
            {
              "title": "THE BIBLE"
            }
          ],
          "question": "This prophet passed the time he spent inside a fish offering up prayers"
        },
        {
          "hasCategory": [
            {
              "title": "ANIMALS"
            }
          ],
          "question": "Pythons are oviparous, meaning they do this"
        }
      ]
    }
  }
}
# END GetWithCrossRefs Expected Results
)


gql_query = """
# GetWithCrossRefsGraphQL
{
  Get {
    JeopardyQuestion (
      limit: 2
    )
    # highlight-start
    {
      question
      hasCategory {
        ... on JeopardyCategory {
          title
        }
      }
    }
    # highlight-end
  }
}
# END GetWithCrossRefsGraphQL
"""
# gqlresponse = client.query.raw(gql_query)
# Test results
# assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "hasCategory"}
# assert gqlresponse == response
# assert expected_response == response
# END Test results



# ====================================
# ===== GET WITH METADATA EXAMPLE =====
# ====================================

# GetWithMetadataPython
# highlight-start
import weaviate.classes as wvc
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    limit=1,
    # highlight-start
    return_metadata=wvc.query.MetadataQuery(creation_time=True)
    # highlight-end
)

for o in response.objects:
    print(o.properties)  # View the returned properties
    print(o.metadata.creation_time)  # View the returned creation time
# END GetWithMetadataPython

# Test results
# # NEEDS TESTS
# END Test results


# =========================
# ===== MULTI-TENANCY =====
# =========================

# <!-- NEEDS TESTS -->

# MultiTenancy
import weaviate.classes as wvc

# Connect to the collection
mt_collection = client.collections.get("WineReviewMT")

# Get the specific tenant's version of the collection
# highlight-start
collection_tenant_a = mt_collection.with_tenant("tenantA")
# highlight-end

# Query tenantA's version
result = collection_tenant_a.query.fetch_objects(
    return_properties=["review_body", "title"],
    limit=1,
)

print(result.objects[0].properties)
# END MultiTenancy


# Test results
pass
# End test


expected_response = """
// MultiTenancy Expected Results
pass
// END MultiTenancy Expected Results
"""

# START-ANY

client.close()
# END-ANY