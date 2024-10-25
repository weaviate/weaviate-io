# CreateCollection
import weaviate
from weaviate.classes.init import Auth
from weaviate.classes.config import Configure
import os

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_URL"]
wcd_api_key = os.environ["WCD_API_KEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,                                    # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(wcd_api_key),             # Replace with your Weaviate Cloud key
)

# END CreateCollection
# NOT SHOWN TO THE USER - DELETE EXISTING COLLECTION
client.collections.delete("Question")

# CreateCollection
# highlight-start
questions = client.collections.create(
    name="Question",
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),   # Configure the OpenAI embedding integration
    generative_config=Configure.Generative.openai()             # Configure the OpenAI generative AI integration
)
# highlight-end
# CreateCollection

client.close()  # Free up resources
# END CreateCollection


