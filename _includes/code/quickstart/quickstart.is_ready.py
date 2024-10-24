# InstantiationExample
import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_URL"]
wcd_api_key = os.environ["WCD_API_KEY"]

# highlight-start
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,                                    # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(wcd_api_key),             # Replace with your Weaviate Cloud key
)
# highlight-end

try:
    print(client.is_ready())  # Should print: `True`

finally:
    client.close()  # Close client gracefully
# END InstantiationExample
