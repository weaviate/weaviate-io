# START WeaviateInstantiation
import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
weaviate_url = os.getenv("WEAVIATE_URL")
wcd_key = os.getenv("WEAVIATE_API_KEY")

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,                     # Weaviate URL: "REST Endpoint" in Weaviate Cloud console
    auth_credentials=Auth.api_key(wcd_key),  # Weaviate API key: "ADMIN" API key in Weaviate Cloud console
)

print(client.is_ready())  # Should print: `True`

# Work with Weaviate

client.close()
# END WeaviateInstantiation
