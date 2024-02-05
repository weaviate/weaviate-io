# ===== Instantiate Weaviate client w/ auth config =====
import weaviate

client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # Replace w/ your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # Replace w/ your API Key for the Weaviate instance. Delete if authentication is disabled.
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",
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
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",
    },
)

client.is_ready()  # This should return `True`
# ===== END Instantiate Weaviate client w/o auth =====
assert client.is_ready()  # This should return `True`

# ===== Confirm that the client can access the instance =====
response = client.data_object.create({"name": "dummy"}, "TestClass")
print(response)  # This should be a UUID, like "59340403-4bcd-479f-ae9c-de5da039ac0e"
# ===== END Confirm that the client can access the instance =====
assert response.count("-") == 4  # This should be a UUID, like "59340403-4bcd-479f-ae9c-de5da039ac0e"

# ===== Delete our test object =====
client.data_object.delete(response, class_name="TestClass")
# ===== END Delete our test object =====
