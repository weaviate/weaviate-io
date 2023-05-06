# ===== Instantiate Weaviate client w/ auth config =====
import weaviate

client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # Replace w/ your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="<YOUR-WEAVIATE-API-KEY>"),  # Replace w/ your API Key for the Weaviate instance. Delete if authentication is disabled.
    additional_headers={
        "X-OpenAI-Api-Key": "<OPENAI-KEY>",
    },
)

client.is_ready()  # This should return `True`
# ===== END Instantiate Weaviate client w/ auth config =====
assert client.is_ready()  # This should return `True`

# ===== Instantiate Weaviate client w/o auth =====
import weaviate

client = weaviate.Client(
    url="https://anon-endpoint.weaviate.network",  # Replace w/ your endpoint
    additional_headers={
        "X-OpenAI-Api-Key": "<OPENAI-KEY>",
    },
)

client.is_ready()  # This should return `True`
# ===== END Instantiate Weaviate client w/o auth =====
assert client.is_ready()  # This should return `True`

# ===== Confirm that the client can access the instance =====
schema = client.schema.get()
print(schema)  # This should return {'classes': []}, as you should have a new & blank Weaviate instance
# ===== END Confirm that the client can access the instance =====
assert schema["classes"] == []