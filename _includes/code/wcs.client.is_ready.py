
# WCSQuickStartInstantiation
import weaviate
import os

with weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCD URL
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),  # Replace with your WCD key
    headers={'X-OpenAI-Api-key': os.getenv("OPENAI_APIKEY")}  # Replace with your vectorizer API key
) as client:  # Use this context manager to ensure the connection is closed
    print(client.is_ready())
# END WCSQuickStartInstantiation
