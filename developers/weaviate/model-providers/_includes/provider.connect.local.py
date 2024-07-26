# START-ANY
import weaviate
from weaviate.auth import AuthApiKey
# END-ANY

import os

weaviate_url = os.getenv("WEAVIATE_URL")
weaviate_key = os.getenv("WEAVIATE_API_KEY")

# START-ANY

client = weaviate.connect_to_local(
    cluster_url=weaviate_url,                       # `weaviate_url`: your Weaviate URL
    auth_credentials=AuthApiKey(weaviate_key),      # `weaviate_key`: your Weaviate API key - if authentication is enabled
)
# END-ANY

# START-ANY

# Work with Weaviate

client.close()
# END-ANY
