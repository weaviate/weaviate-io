# NearText
import weaviate
from weaviate.classes.init import Auth
import os, json

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_URL"]
wcd_api_key = os.environ["WCD_API_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]

# NearText  # ShortNearText
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,                                    # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(wcd_api_key),             # Replace with your Weaviate Cloud key
    # highlight-start
    headers={"X-OpenAI-Api-Key": openai_api_key},           # Replace with your OpenAI API key
    # highlight-end
)

questions = client.collections.get("Question")

# highlight-start
response = questions.query.near_text(
    query="biology",
    limit=2
)
# highlight-end

for obj in response.objects:
    print(json.dumps(obj.properties, indent=2))
# NearText  # END ShortNearText

client.close()  # Free up resources
# END NearText
