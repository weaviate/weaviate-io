# ===== Instantiate Weaviate client w/ auth config =====
import weaviate

client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # Replace w/ your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="<YOUR-WEAVIATE-API-KEY>"),  # Replace w/ your API Key for the Weaviate instance. Delete if authentication is disabled.
    additional_headers={
        "X-OpenAI-Api-Key": "<OPENAI-KEY>",
    },
)

# ===== Create a class with metadata =====
class_obj = {
    "class": "Article",
    "properties": [
        {
            "name": "title",
        },
        {
            "name": "body",
        },
        {
            "name": "url",
        },
    ],
}

client.schema.create_class(class_obj)
# ===== END Create a class with metadata =====

# ===== Delete the class =====
client.schema.delete_class("Article")
# ===== END Delete the class =====

# ===== Create properties with datatypes =====
class_obj = {
    "class": "Article",
    "properties": [
        {
            "name": "title",
            # highlight-start
            "dataType": ["text"],
            # highlight-end
        },
        {
            "name": "body",
            # highlight-start
            "dataType": ["text"],
            # highlight-end
        },
        {
            "name": "url",
            # highlight-start
            "dataType": ["text"],
            # highlight-end
        },
    ],
}

client.schema.create_class(class_obj)
# ===== END Create properties with datatypes =====

# ===== NOT SHOWN - Delete the class =====
client.schema.delete_class("Article")
# ===== NOT SHOWN - Delete the class =====

# ===== Get module list =====
module_metadata = client.get_meta()
module_metadata['modules']
# ===== END Get module list =====

# ===== Create a class with a vectorizer =====
class_obj = {
    "class": "Article",
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
        },
        {
            "name": "body",
            "dataType": ["text"],
        },
        {
            "name": "url",
            "dataType": ["text"],
        },
    ],
    # highlight-start
    "vectorizer": "text2vec-openai"
    # highlight-end
}

client.schema.create_class(class_obj)
# ===== END Create a class with a vectorizer =====

# ===== NOT SHOWN - Delete the class =====
client.schema.delete_class("Article")
# ===== NOT SHOWN - Delete the class =====

# ===== Class-level moduleConfig =====
class_obj = {
    "class": "Article",
    # highlight-start
    "moduleConfig": {
        "text2vec-openai": {
            "vectorizeClassName": False,
            "model": "ada",
            "modelVersion": "002",
            "type": "text"
        }
    },
    # highlight-end
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
        },
        {
            "name": "body",
            "dataType": ["text"],
        },
    ],
    "vectorizer": "text2vec-openai"
}

client.schema.create_class(class_obj)
# ===== END Class-level moduleConfig =====

# ===== NOT SHOWN - Delete the class =====
client.schema.delete_class("Article")
# ===== NOT SHOWN - Delete the class =====

# ===== Property-level moduleConfig =====
class_obj = {
    "class": "Article",
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
        },
        {
            "name": "body",
            "dataType": ["text"],
            # highlight-start
            "moduleConfig": {
                "text2vec-openai": {
                    "skip": False,
                    "vectorizePropertyName": True
                }
            }
            # highlight-end
        },
        {
            "name": "url",
            "dataType": ["text"],
            # highlight-start
            "moduleConfig": {
                "text2vec-openai": {
                    "skip": True,
                }
            }
            # highlight-end
        },
    ],
    "vectorizer": "text2vec-openai"
}

client.schema.create_class(class_obj)
# ===== END Property-level moduleConfig =====

# ===== NOT SHOWN - Delete the class =====
client.schema.delete_class("Article")
# ===== NOT SHOWN - Delete the class =====