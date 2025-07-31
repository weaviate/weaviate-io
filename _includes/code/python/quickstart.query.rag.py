# RAG
import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]
cohere_api_key = os.environ["COHERE_APIKEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,                                    # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(weaviate_api_key),             # Replace with your Weaviate Cloud key
    # highlight-start
    headers={"X-Cohere-Api-Key": cohere_api_key},           # Replace with your Cohere API key
    # highlight-end
)

questions = client.collections.get("Question")

# highlight-start
response = questions.generate.near_text(
    query="biology",
    limit=2,
    grouped_task="Write a tweet with emojis about these facts."
)
# highlight-end

print(response.generated)  # Inspect the generated text

client.close()  # Free up resources
# END RAG
