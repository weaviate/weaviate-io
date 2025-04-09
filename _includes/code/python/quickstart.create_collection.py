# CreateCollection
import weaviate
from weaviate.classes.init import Auth
from weaviate.classes.config import Configure
import os

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,                                    # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.api_key(weaviate_api_key),             # Replace with your Weaviate Cloud key
)

# END CreateCollection

# NOT SHOWN TO THE USER - DELETE EXISTING COLLECTION
client.collections.delete("Question")

# CreateCollection
# highlight-start
questions = client.collections.create(
    name="Question",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(), # Configure the Weaviate Embeddings integration
    generative_config=Configure.Generative.cohere()             # Configure the Cohere generative AI integration
)
# highlight-end
# CreateCollection

client.close()  # Free up resources
# END CreateCollection


