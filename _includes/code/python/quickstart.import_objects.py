# Import
import weaviate
from weaviate.classes.init import Auth
import requests, json, os

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_URL"]
wcd_api_key = os.environ["WCD_API_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]

# Import  # ShortImport
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,                                    # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(wcd_api_key),             # Replace with your Weaviate Cloud key
    # highlight-start
    headers={"X-OpenAI-Api-Key": openai_api_key},           # Replace with your OpenAI API key
    # highlight-end
)

resp = requests.get(
    "https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json"
)
data = json.loads(resp.text)

# highlight-start
questions = client.collections.get("Question")

with questions.batch.dynamic() as batch:
    for d in data:
        batch.add_object({
            "answer": d["Answer"],
            "question": d["Question"],
            "category": d["Category"],
        })
# highlight-end
# Import  # END ShortImport

client.close()  # Free up resources
# END Import
