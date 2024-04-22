# THIS FILE NEEDS TESTS

# ==============================
# =====  CONNECT =====
# ==============================

# START ConnectCode
import weaviate
import os

client = weaviate.Client(
    url="http://localhost:8080/",  # Replace with your endpoint
    additional_headers={
        "X-OpenAI-Api-Key": os.getenv(
            "OPENAI_API_KEY"
        )  # Replace with your OpenAI API key
    },
)

print(client.is_ready())
# END ConnectCode

# ==============================
# =====  EnableBQ =====
# ==============================

if client.schema.exists("YourCollection"):
    client.schema.delete_class("YourCollection")

# START EnableBQ
class_definition = {
    "class": "YourCollection",
    "vectorizer": "text2vec-openai",  # Can be any vectorizer
    # highlight-start
    "vectorIndexType": "flat",
    "vectorIndexConfig": {
        "bq": {
            "enabled": True,
        },
    },
    # highlight-end
    #  Remainder not shown
}

client.schema.create_class(class_definition)
# END EnableBQ

# ==============================
# =====  EnableBQ with Options =====
# ==============================

if client.schema.exists("YourCollection"):
    client.schema.delete_class("YourCollection")

# START BQWithOptions
class_definition = {
    "class": "YourCollection",
    "vectorizer": "text2vec-openai",  # Can be any vectorizer
    "vectorIndexType": "flat",
    "vectorIndexConfig": {
        # highlight-start
        "bq": {
            "enabled": True,
            "rescoreLimit": 200,  # The minimum number of candidates to fetch before rescoring
            "cache": True,  # Default: False
        },
        "vectorCacheMaxObjects": 100000,  # Cache size (used if `cache` enabled)
        # highlight-end
    },
    # Remainder not shown
}

client.schema.create_class(class_definition)
# END BQWithOptions
