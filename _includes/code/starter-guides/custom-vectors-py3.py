# For testing and rerunning script
if client.collections.exists("Question"):
    client.collections.delete("Question")

# START create schema # START connect
import weaviate
import json

client = weaviate.Client(
    url = WCS_URL,
    auth_client_secret=weaviate.auth.AuthApiKey(api_key=WCS_API_KEY),
    additional_headers = {
        "X-OpenAI-Api-Key": OPENAI_API_KEY
    }
)
# END create schema # END connect

# START create schema

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
            }
        },
        {
            "name": "answer",
            "dataType": ["text"],
            "description": "The clue",
        },
        {
            "name": "category",
            "dataType": ["text"],
            "description": "The subject",
        },
    ],
}

# add the schema
client.schema.create_class(class_obj)
# END create schema
