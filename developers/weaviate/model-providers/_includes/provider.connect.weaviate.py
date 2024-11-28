# START WeaviateInstantiation
import weaviate
from weaviate.classes.init import Auth
import os

# END WeaviateInstantiation

weaviate_url = os.getenv("WEAVIATE_URL")
weaviate_key = os.getenv("WEAVIATE_API_KEY")

# START WeaviateInstantiation
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,                       # `weaviate_url`: your Weaviate URL
    auth_credentials=Auth.api_key(weaviate_key),    # `weaviate_key`: your Weaviate API key
)
# END WeaviateInstantiation


# START WeaviateInstantiation

# Work with Weaviate

client.close()
# END WeaviateInstantiation
