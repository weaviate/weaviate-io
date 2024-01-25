# ===== Instantiate Weaviate client w/ auth config =====
import weaviate
import json

client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # Replace w/ your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # Replace w/ your API Key for the Weaviate instance. Delete if authentication is disabled.
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",
    },
)

# ===== SimpleQnA Query =====

# SimpleAskQuery
ask = {
  "question": "How many championships does Lewis Hamilton have?",
}

response = (
  client.query
  .get("WikiArticle", ["title", "_additional {answer {hasAnswer property result startPosition endPosition} }"])
  .with_ask(ask)
  .with_limit(1)
  .do()
)

print(json.dumps(response, indent=2))
# END SimpleAskQuery

# Tests
assert "WikiArticle" in response["data"]["Get"]
assert len(response["data"]["Get"]["WikiArticle"]) == 1
assert response["data"]["Get"]["WikiArticle"][0].keys() == {"title", "_additional"}
assert response["data"]["Get"]["WikiArticle"][0]["_additional"].keys() == {"answer"}
# End test

"""
# Expected SimpleAskQuery results
{
  "data": {
    "Get": {
      "WikiArticle": [
        {
          "_additional": {
            "answer": {
              "endPosition": 0,
              "hasAnswer": true,
              "property": "",
              "result": " Lewis Hamilton has seven World Drivers' Championship titles.",
              "startPosition": 0
            }
          },
          "title": "Lewis Hamilton"
        }
      ]
    }
  }
}
# END Expected SimpleAskQuery results
"""

# ===== QnA Query with Properties =====

# AskQueryWithProperties
ask = {
  "question": "How many championships does Lewis Hamilton have?",
  "properties": ["title"]
}

response = (
  client.query
  .get("WikiArticle", ["title", "_additional {answer {hasAnswer property result startPosition endPosition} }"])
  .with_ask(ask)
  .with_limit(1)
  .do()
)

print(json.dumps(response, indent=2))
# END AskQueryWithProperties

# Tests
assert "WikiArticle" in response["data"]["Get"]
assert len(response["data"]["Get"]["WikiArticle"]) == 1
assert response["data"]["Get"]["WikiArticle"][0].keys() == {"title", "_additional"}
assert response["data"]["Get"]["WikiArticle"][0]["_additional"].keys() == {"answer"}
# End test

"""
# Expected AskQueryWithProperties results
{
  "data": {
    "Get": {
      "WikiArticle": [
        {
          "_additional": {
            "answer": {
              "endPosition": 0,
              "hasAnswer": true,
              "property": "",
              "result": " Lewis Hamilton has seven World Drivers' Championship titles.",
              "startPosition": 0
            }
          },
          "title": "Lewis Hamilton"
        }
      ]
    }
  }
}
# END Expected AskQueryWithProperties results
"""
