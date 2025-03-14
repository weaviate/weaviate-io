# InstantiationExample
import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

# highlight-start
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
)
# highlight-end

print(client.is_ready())  # Should print: `True`

client.close()  # Free up resources
# END InstantiationExample
