# ===== Instantiate Weaviate client w/ auth config =====
import weaviate

client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # Replace w/ your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # Replace w/ your API Key for the Weaviate instance. Delete if authentication is disabled.
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",
    },
)

# ===== Create a class with metadata =====
class_obj = {
    "class": "Article",
}

client.schema.create_class(class_obj)
# ===== END Create a class with metadata =====

# Test
classes = [c["class"] for c in client.schema.get()["classes"]]
assert "Article" in classes

# ===== Delete the class =====
client.schema.delete_class("Article")
# ===== END Delete the class =====

# Test
classes = [c["class"] for c in client.schema.get()["classes"]]
assert "Article" not in classes

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

# Test
classes = [c["class"] for c in client.schema.get()["classes"]]
property_names = [c["name"] for c in client.schema.get("Article")["properties"]]
datatypes = [c["dataType"] for c in client.schema.get("Article")["properties"]]
assert "Article" in classes
for p in ["title", "body", "url"]:
    assert p in property_names
assert datatypes == [["text"], ["text"], ["text"]]

# ===== NOT SHOWN - Delete the class =====
client.schema.delete_class("Article")
# ===== NOT SHOWN - Delete the class =====

# Test
classes = [c["class"] for c in client.schema.get()["classes"]]
assert "Article" not in classes

# ===== Get module list =====
module_metadata = client.get_meta()
module_metadata['modules']
# ===== END Get module list =====

assert 'text2vec-openai' in module_metadata['modules'].keys()

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

# Test
classes = [c["class"] for c in client.schema.get()["classes"]]
property_names = [c["name"] for c in client.schema.get("Article")["properties"]]
datatypes = [c["dataType"] for c in client.schema.get("Article")["properties"]]
vectorizer = client.schema.get("Article")["vectorizer"]
assert "Article" in classes
for p in ["title", "body", "url"]:
    assert p in property_names
assert datatypes == [["text"], ["text"], ["text"]]
assert vectorizer == "text2vec-openai"

# ===== NOT SHOWN - Delete the class =====
client.schema.delete_class("Article")
# ===== NOT SHOWN - Delete the class =====

# Test
classes = [c["class"] for c in client.schema.get()["classes"]]
assert "Article" not in classes

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
        {
            "name": "url",
            "dataType": ["text"],
        },
    ],
    "vectorizer": "text2vec-openai"
}

client.schema.create_class(class_obj)
# ===== END Class-level moduleConfig =====

# Test
classes = [c["class"] for c in client.schema.get()["classes"]]
property_names = [c["name"] for c in client.schema.get("Article")["properties"]]
datatypes = [c["dataType"] for c in client.schema.get("Article")["properties"]]
vectorizer = client.schema.get("Article")["vectorizer"]
module_config = client.schema.get("Article")["moduleConfig"]
assert "Article" in classes
for p in ["title", "body", "url"]:
    assert p in property_names
assert datatypes == [["text"], ["text"], ["text"]]
assert vectorizer == "text2vec-openai"
assert module_config[vectorizer]["vectorizeClassName"] == False
assert module_config[vectorizer]["model"] == "ada"
assert module_config[vectorizer]["modelVersion"] == "002"

# ===== NOT SHOWN - Delete the class =====
client.schema.delete_class("Article")
# ===== NOT SHOWN - Delete the class =====

# Test
classes = [c["class"] for c in client.schema.get()["classes"]]
assert "Article" not in classes

# ===== Property-level moduleConfig =====
class_obj = {
    "class": "Article",
    "moduleConfig": {
        "text2vec-openai": {
            "vectorizeClassName": False,
            "model": "ada",
            "modelVersion": "002",
            "type": "text"
        }
    },
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

# Test
classes = [c["class"] for c in client.schema.get()["classes"]]
property_names = [c["name"] for c in client.schema.get("Article")["properties"]]
datatypes = [c["dataType"] for c in client.schema.get("Article")["properties"]]
vectorizer = client.schema.get("Article")["vectorizer"]
module_config = client.schema.get("Article")["moduleConfig"]
assert "Article" in classes
for p in ["title", "body", "url"]:
    assert p in property_names
assert datatypes == [["text"], ["text"], ["text"]]
assert vectorizer == "text2vec-openai"
assert module_config[vectorizer]["vectorizeClassName"] == False
assert module_config[vectorizer]["model"] == "ada"
assert module_config[vectorizer]["modelVersion"] == "002"
properties = client.schema.get("Article")["properties"]
for p in properties:
    if p["name"] == "body":
        assert p["moduleConfig"]["text2vec-openai"]["skip"] == False
        assert p["moduleConfig"]["text2vec-openai"]["vectorizePropertyName"] == True
    if p["name"] == "url":
        assert p["moduleConfig"]["text2vec-openai"]["skip"] == True

# ===== NOT SHOWN - Delete the class =====
client.schema.delete_class("Article")
# ===== NOT SHOWN - Delete the class =====

# Test
classes = [c["class"] for c in client.schema.get()["classes"]]
assert "Article" not in classes
