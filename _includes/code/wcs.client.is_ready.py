
# WCDQuickStartInstantiation
import weaviate
import os

with weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCD_DEMO_URL"),  # Replace with your Weaviate Cloud URL
    auth_credentials=weaviate.classes.init.Auth.api_key(os.getenv("WCD_DEMO_RO_KEY")),  # Replace with your Weaviate Cloud key
    headers={'X-OpenAI-Api-key': os.getenv("OPENAI_APIKEY")}  # Replace with your vectorizer API key
) as client:  # Use this context manager to ensure the connection is closed
    print(client.is_ready())
# END WCDQuickStartInstantiation
