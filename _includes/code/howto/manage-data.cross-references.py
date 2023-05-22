# Howto: Manage-data/Cross-references - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import json

# Instantiate the client with the user/password and OpenAI api key
client = weaviate.Client(
    "https://some-endpoint.weaviate.network",  # Replace with your Weaviate URL
    auth_client_secret=weaviate.AuthApiKey("YOUR-WEAVIATE-API-KEY"),  # If authentication is on. Replace w/ your Weaviate instance API key
    additional_headers = {
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY"  # Replace w/ your OPENAI API key
    }
)

# ==========================================
# ===== Define classes in the schema =====
# ==========================================

class_definitions = [
    {
        "class": "JeopardyCategory",
        "description": "A Jeopardy! category",
    },
    {
        "class": "JeopardyQuestion",
        "description": "A Jeopardy! question",
        "properties": [
            {
                "name": "hasCategory",
                "dataType": ["JeopardyCategory"],
                "description": "The category of the question",
            },
        ],
    },
]
