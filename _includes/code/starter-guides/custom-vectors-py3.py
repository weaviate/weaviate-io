# START-ANY
# Set these environment variables
# WCD_URL - The URL for your Weaviate instance
# WCD_API_KEY - The API key for your Weaviate instance
# OPENAI_API_KEY - The API key for your OpenAI account

# END-ANY

# For testing and rerunning script
if client.collections.exists("Question"):
    client.collections.delete("Question")

# START create schema
import weaviate
import json

client = weaviate.Client(
    url = WCD_URL,
    auth_client_secret=weaviate.auth.AuthApiKey(api_key=WCD_API_KEY),
    additional_headers = {
        "X-OpenAI-Api-Key": OPENAI_API_KEY
    }
)

class_obj = {
    "class": "Question",
    "description": "Information from a Jeopardy! question",
    "vectorizer": "text2vec-openai",
    "moduleConfig": {
        "generative-openai": {}
    },
    "properties": [
        {
            "name": "question",
            "dataType": ["text"],
            "description": "What to ask",
            "moduleConfig": {
                "text2vec-openai": {
                    "vectorizePropertyName": True,
                    "tokenization": "word"
                }
            }
        },
        {
            "name": "answer",
            "dataType": ["text"],
            "description": "The clue",
            "moduleConfig": {
                "text2vec-openai": {
                    "vectorizePropertyName": False,
                    "tokenization": "word"
                }
            }
        },
        {
            "name": "category",
            "dataType": ["text"],
            "description": "The subject",
            "moduleConfig": {
                "text2vec-openai": {
                    "vectorizePropertyName": False,
                    "tokenization": "word"
                }
            }
        },
    ],
}

# add the schema
client.schema.create_class(class_obj)
# END create schema
