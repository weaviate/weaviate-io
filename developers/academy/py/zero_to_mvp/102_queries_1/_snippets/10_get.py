# ===== Instantiate to edu-demo with OpenAI =====
import weaviate

client = weaviate.Client(
    url="https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="learn-weaviate"),  # A read-only API Key for the Weaviate instance
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",  # Replace this with YOUR OpenAI API key
    }
)
# ===== END Instantiate to edu-demo with OpenAI =====

# ===== GET STANDALONE PYTHON =====
import json
response = client.query.get(
    "JeopardyQuestion",
    ["question", "answer"]
).with_limit(2).do()

print(json.dumps(response, indent=2))
# ===== END GET STANDALONE PYTHON =====

graphql_query = """
# ===== GET STANDALONE GRAPHQL =====
{
  Get {
    JeopardyQuestion (
      limit: 2
    ) {
      question
      answer
    }
  }
}
# ===== END GET STANDALONE GRAPHQL =====
"""

response = client.query.raw(graphql_query)

print(json.dumps(response, indent=2))
