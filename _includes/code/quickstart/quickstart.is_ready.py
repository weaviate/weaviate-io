# InstantiationExample
import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_DEMO_URL"]
wcd_api_key = os.environ["WCD_DEMO_RO_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]

# highlight-start
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,                                    # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(wcd_api_key),             # Replace with your Weaviate Cloud key
    headers={"X-OpenAI-Api-Key": openai_api_key}            # OpenAI API key for Weaviate to use when connecting to the OpenAI API
)
# highlight-end

try:
    assert client.is_ready()  # Should throw an exception if not ready

finally:
    client.close()  # Close client gracefully
# END InstantiationExample
