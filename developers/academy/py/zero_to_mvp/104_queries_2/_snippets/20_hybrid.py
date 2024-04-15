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

# ===== Generic Hybrid Query =====

# GenericHybridQuery
response = (
    client.query
    .get("JeopardyQuestion", ["question", "answer"])
    # highlight-start
    .with_hybrid(
      query="food",  # Query string
      properties=["question", "answer"],  # Searched properties
      vector=None  # Manually provide a vector; if not, Weaviate will vectorize the query string
    )
    .with_additional(["score", "explainScore"])  # Include score & explainScore in the response
    # highlight-end
    .with_limit(3)
    .do()
  )

print(json.dumps(response, indent=2))
# END GenericHybridQuery

# Tests
assert "JeopardyQuestion" in response["data"]["Get"]
assert len(response["data"]["Get"]["JeopardyQuestion"]) == 3
assert response["data"]["Get"]["JeopardyQuestion"][0].keys() == {"question", "answer", "_additional"}
assert response["data"]["Get"]["JeopardyQuestion"][0]["_additional"].keys() == {"score", "explainScore"}
# End test


expected_response = (
# Expected GenericHybridQuery results
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "_additional": {
            "explainScore": "(bm25)\n(hybrid) Document df958a90-c3ad-5fde-9122-cd777c22da6c contributed 0.003968253968253968 to the score\n(hybrid) Document df958a90-c3ad-5fde-9122-cd777c22da6c contributed 0.012295081967213115 to the score",
            "score": "0.016263336"
          },
          "answer": "a closer grocer",
          "question": "A nearer food merchant"
        },
        {
          "_additional": {
            "explainScore": "(vector) [0.022335753 -0.027532013 -0.0061008437 0.0023294748 -0.00041679747 -0.007862403 -0.018513374 -0.037407625 -0.004291675 -0.012575763]...  \n(hybrid) Document ec776112-e651-519d-afd1-b48e6237bbcb contributed 0.012096774193548387 to the score",
            "score": "0.012096774"
          },
          "answer": "Famine",
          "question": "From the Latin for \"hunger\", it's a period when food is extremely scarce"
        },
        {
          "_additional": {
            "explainScore": "(vector) [0.022335753 -0.027532013 -0.0061008437 0.0023294748 -0.00041679747 -0.007862403 -0.018513374 -0.037407625 -0.004291675 -0.012575763]...  \n(hybrid) Document 98807640-cd16-507d-86a1-801902d784de contributed 0.011904761904761904 to the score",
            "score": "0.011904762"
          },
          "answer": "Tofu",
          "question": "A popular health food, this soybean curd is used to make a variety of dishes & an ice cream substitute"
        }
      ]
    }
  }
}
# END Expected GenericHybridQuery results
)
