# GetQueryVector
# Define a function to call the endpoint and obtain embeddings
def query(texts):
    import requests
    import os

    model_id = "sentence-transformers/all-MiniLM-L6-v2"
    hf_token = os.getenv("HUGGINGFACE_APIKEY")

    api_url = f"https://api-inference.huggingface.co/pipeline/feature-extraction/{model_id}"
    headers = {"Authorization": f"Bearer {hf_token}"}

    response = requests.post(
        api_url,
        headers=headers,
        json={"inputs": texts, "options": {"wait_for_model": True}},
    )
    return response.json()


query_text = "dystopian future"
query_vector = query(query_text)
# END GetQueryVector


# MetadataSemanticSearch
import weaviate
import weaviate.classes.query as wq
import os

# END MetadataSemanticSearch

# MetadataSemanticSearch

# END MetadataSemanticSearch

headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("WCS_DEMO_ADMIN_KEY")
    ),  # Replace with your WCS key
    headers=headers,
)

# MetadataSemanticSearch
# Instantiate your client (not shown). e.g.:
# headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key
# client = weaviate.connect_to_wcs(..., headers=headers) or
# client = weaviate.connect_to_local(..., headers=headers)

# END MetadataSemanticSearch


# MetadataSemanticSearch
# Get the collection
movies = client.collections.get("Movie")

# Perform query
response = movies.query.near_vector(
    near_vector=query_vector,  # A list of floating point numbers
    limit=5,
    return_metadata=wq.MetadataQuery(distance=True),
)

# Inspect the response
for o in response.objects:
    print(
        o.properties["title"], o.properties["release_date"].year
    )  # Print the title and release year (note the release date is a datetime object)
    print(
        f"Distance to query: {o.metadata.distance:.3f}\n"
    )  # Print the distance of the object from the query

client.close()
# END MetadataSemanticSearch
