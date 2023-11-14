# THIS FILE NEEDS TESTS

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation shown on snippet
import weaviate
import json, os

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

# ==============================
# =====  CONNECT =====
# ==============================

# ConnectCode
import weaviate, os, json
import weaviate.classes as wvc

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ['OPENAI_API_KEY']  # Replace with your inference API key
    }
)

client.is_ready()

# END ConnectCode

# ==============================
# =====  STEP:  =====
# ==============================

# BasicGetPython
jeopardy = client.collections.get("JeopardyQuestion")
# highlight-start
response = jeopardy.query.fetch_objects()
# highlight-end

# This prints the response object
print(response)

# This formatting step prints the output that you probably want.
# The remaining examples use formatted output where appropriate.
for o in response.objects:
    print(json.dumps(o.properties, indent=2))
# END BasicGetPython

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

# ... TODO: Write test

# END BasicGetGraphQL
"""

# gqlresponse = client.query.raw(gql_query)

# Test results
# assert gqlresponse == response

# END Test results

