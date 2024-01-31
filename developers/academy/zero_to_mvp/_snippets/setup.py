# ===== Basic instantiation =====
import weaviate
import os

client = weaviate.Client(
    url="https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="learn-weaviate"),  # A read-only API Key for the Weaviate instance
)

print(client.is_ready()) # This should return `True`
# ===== END Basic instantiation =====
assert client.is_ready()

# ===== Instantiate to edu-demo with OpenAI =====
import weaviate

client = weaviate.Client(
    url="https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="learn-weaviate"),  # A read-only API Key for the Weaviate instance
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace w/ your OPENAI API key
    }
)
# ===== END Instantiate to edu-demo with OpenAI =====
assert client.is_ready()

# ===== Arbitrary code example =====
import json

response = client.query.get(
    "JeopardyQuestion",
    ["question", "answer"]
).with_near_text(
    {"concepts": ["intergalactic travel"]}
).with_limit(2).do()

print(json.dumps(response, indent=2))
# ===== END Arbitrary code example =====
assert len(response["data"]["Get"]["JeopardyQuestion"][0]) == 2

# ===== Fuller arbitrary code example =====
import weaviate
import json

client = weaviate.Client(
    url="https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="learn-weaviate"),  # A read-only API Key for the Weaviate instance
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace w/ your OPENAI API key
    }
)

response = client.query.get(
    "JeopardyQuestion",
    ["question", "answer"]
).with_near_text(
    {"concepts": ["intergalactic travel"]}
).with_limit(2).do()

print(json.dumps(response, indent=2))
# ===== END Fuller arbitrary code example =====
assert len(response["data"]["Get"]["JeopardyQuestion"][0]) == 2

# ===== GraphQL example with Python execution =====
gql_query = """
# ===== Equivalent GraphQL example =====
{
  Get {
    JeopardyQuestion (
      nearText: {
        concepts: ["intergalactic travel"]
        }
      limit: 2
    ) {
      question
      answer
    }
  }
}
# ===== END Equivalent GraphQL example =====
"""

gql_response = client.query.raw(gql_query)
print(json.dumps(gql_response, indent=2))
# ===== END GraphQL example with Python execution =====

assert response == gql_response
