# START WESInstantiation
import weaviate
from weaviate.classes.init import Auth
import os

# END WESInstantiation

weaviate_url = os.getenv("WEAVIATE_URL")
weaviate_key = os.getenv("WEAVIATE_API_KEY")

# START WESInstantiation
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,                       # `weaviate_url`: your Weaviate URL
    auth_credentials=Auth.api_key(weaviate_key),    # `weaviate_key`: your Weaviate API key
)
# END WESInstantiation


# START WESInstantiation

# Work with Weaviate

client.close()
# END WESInstantiation
