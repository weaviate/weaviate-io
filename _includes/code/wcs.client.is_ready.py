
# WCDQuickStartInstantiation
import weaviate
from weaviate.classes.init import Auth
import os

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WCD_DEMO_URL"),  # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(os.getenv("WCD_DEMO_RO_KEY")),  # Replace with your Weaviate Cloud key
    headers={'X-OpenAI-Api-key': os.getenv("OPENAI_APIKEY")}  # Replace with your vectorizer API key
) as client:  # Use this context manager to ensure the connection is closed
    print(client.is_ready())
# END WCDQuickStartInstantiation
