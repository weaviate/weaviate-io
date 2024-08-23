
# WCDQuickStartInstantiation
import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_DEMO_URL"]
wcd_api_key = os.environ["WCD_DEMO_RO_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]

with weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,  # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(wcd_api_key),  # Replace with your Weaviate Cloud key
    headers={
        'X-OpenAI-Api-key': openai_api_key  # Replace with appropriate header key/value pair for the required API
    }
) as client:  # Use this context manager to ensure the connection is closed
    print(client.is_ready())
# END WCDQuickStartInstantiation
