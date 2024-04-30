# START-ANY
import weaviate
from weaviate.auth import AuthApiKey
import os

# END-ANY
weaviate_url = os.getenv("WEAVIATE_URL")
weaviate_key = os.getenv("WEAVIATE_API_KEY")

# START CohereInstantiation
# Recommended: save sensitive data as environment variables
cohere_key = os.getenv("COHERE_API_KEY")
# END CohereInstantiation


# START-ANY
headers = {
# START CohereInstantiation
    "X-Cohere-Api-Key": cohere_key
# END CohereInstantiation
# START-ANY
}

# END-ANY

# START-ANY
client = weaviate.connect_to_wcs(
    cluster_url=weaviate_url,                       # `weaviate_url`: your Weaviate URL
    auth_credentials=AuthApiKey(weaviate_key),      # `weaviate_key`: your Weaviate API key
    headers=headers
)
# END-ANY


# START-ANY

# Work with Weaviate

client.close()
# END-ANY
