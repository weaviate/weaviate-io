# THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

# START APIKeyWCD
# Set these environment variables
# WEAVIATE_URL       your Weaviate instance URL
# WEAVIATE_API_KEY   your Weaviate instance API key

import os
import weaviate

# Create the client
client = weaviate.Client(
    url=os.getenv("WEAVIATE_URL"),
    auth_client_secret=weaviate.auth.AuthApiKey(api_key=os.getenv("WEAVIATE_API_KEY")),
)

print(client.is_ready())
# END APIKeyWCD
client.close()

# START LocalNoAuth
import weaviate

# Create the client
client = weaviate.Client(
    url="http:localhost:8080"
)

print(client.is_ready())
# END LocalNoAuth

# START ThirdPartyAPIKeys
# Set these environment variables
# WEAVIATE_URL       your Weaviate instance URL
# WEAVIATE_API_KEY   your Weaviate instance API key
# COHERE_API_KEY     your Cohere API key

import os
import weaviate
from weaviate.auth import AuthApiKey

# Connect to Weaviate Cloud
client = weaviate.Client(
    url=os.getenv("WEAVIATE_URL"),
    auth_client_secret=weaviate.auth.AuthApiKey(api_key=os.getenv("WEAVIATE_API_KEY")),
    additional_headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_API_KEY"),
    },
)

print(client.is_ready())
# END ThirdPartyAPIKeys
