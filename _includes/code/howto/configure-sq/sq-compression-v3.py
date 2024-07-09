# THIS FILE NEEDS TESTS

# ==============================
# =====  CONNECT =====
# ==============================

# START ConnectCode
import weaviate
import os

client = weaviate.Client(
    url="http://localhost:8080/",  # Replace with your Weaviate endpoint
    additional_headers={
        "X-OpenAI-Api-Key": os.getenv(
            "OPENAI_API_KEY"
        )  # Replace with your OpenAI API key
    },
)

print(client.is_ready())
# END ConnectCode

# ==============================
# =====  EnableSQ =====
# ==============================

if client.schema.exists("MyCollection"):
    client.schema.delete_class("MyCollection")

# START EnableSQ
class_definition = {
    "class": "MyCollection",
    "vectorizer": "text2vec-openai",  # Can be any vectorizer
    # highlight-start
    "vectorIndexType": "flat",
    "vectorIndexConfig": {
        "SQ": {
            "enabled": True,
        },
    },
    # highlight-end
    #  Remainder not shown
}

client.schema.create_class(class_definition)
# END EnableSQ

# ==============================
# =====  EnableSQ with Options =====
# ==============================

if client.schema.exists("MyCollection"):
    client.schema.delete_class("MyCollection")

# START SQWithOptions
class_definition = {
    "class": "MyCollection",
    "vectorizer": "text2vec-openai",  # Can be any vectorizer
    "vectorIndexType": "flat",
    "vectorIndexConfig": {
        # highlight-start
        "SQ": {
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
# END SQWithOptions
