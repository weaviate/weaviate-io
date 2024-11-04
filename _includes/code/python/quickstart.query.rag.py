# RAG
import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_URL"]
wcd_api_key = os.environ["WCD_API_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,                                    # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(wcd_api_key),             # Replace with your Weaviate Cloud key
    # highlight-start
    headers={"X-OpenAI-Api-Key": openai_api_key},           # Replace with your OpenAI API key
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
