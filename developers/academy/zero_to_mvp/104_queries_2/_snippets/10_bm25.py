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

# ===== Generic BM25 Query =====

# GenericBM25Query
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer"])
    # highlight-start
    .with_bm25(
      query="food",  # Query string
      properties=["question^2", "answer"]  # Searched properties, including boost for `question`
    )
    .with_additional("score")  # Include score in the response
    # highlight-end
    .with_limit(3)
    .do()
  )

print(json.dumps(response, indent=2))
# END GenericBM25Query

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "_additional"}
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"score"}
# End test


expected_response = (
# Expected GenericBM25Query results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "score": "4.0038033"
          },
          "answer": "cake",
          "question": "Devil's food & angel food are types of this dessert"
        },
        {
          "_additional": {
            "score": "3.8706005"
          },
          "answer": "a closer grocer",
          "question": "A nearer food merchant"
        },
        {
          "_additional": {
            "score": "3.2457707"
          },
          "answer": "food stores (supermarkets)",
          "question": "This type of retail store sells more shampoo & makeup than any other"
        }
      ]
    }
  }
}
# END Expected GenericBM25Query results
)

# ===== BM25 - `word` Tokenization Example =====

# BM25WithWordTokenization
response = (
    client.query
    .get(
        class_name="JeopardyQuestion",
        properties=["question", "round"]
    )
    .with_bm25(
        "Jeopardy",
        properties=["question"]
    )
    .with_limit(2)
    .do()
)

print(json.dumps(response, indent=2))
# END BM25WithWordTokenization

expected_response = (
# Expected BM25WithWordTokenization results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "question": "Capistrano swallows, Undeliverable mail, \"Jeopardy!\" champs",
          "round": "Jeopardy!"
        },
        {
          "question": "This opera star & \"Celebrity Jeopardy!\" contestant began life as Belle Silverman",
          "round": "Double Jeopardy!"
        }
      ]
    }
  }
}
# END Expected BM25WithWordTokenization results
)

assert response == expected_response


# ===== BM25 - `field` Tokenization Example =====

# BM25WithFieldTokenization
response = (
    client.query
    .get(
        class_name="JeopardyQuestion",
        properties=["question", "round"]
    )
    .with_bm25(
        "Jeopardy",
        properties=["round"]
    )
    .with_limit(2)
    .do()
)

print(json.dumps(response, indent=2))
# END BM25WithFieldTokenization

expected_response = (
# Expected BM25WithFieldTokenization results
{
  "data": {
    "Get": {
      "JeopardyQuestion": []
    }
  }
}
# END Expected BM25WithFieldTokenization results
)

assert response == expected_response

