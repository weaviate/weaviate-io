# GetQueryVector
# Define a function to call the endpoint and obtain embeddings
from typing import List
import os
import cohere
from cohere import Client as CohereClient

co_token = os.getenv("COHERE_APIKEY")
co = cohere.Client(co_token)


# Define a function to call the endpoint and obtain embeddings
def vectorize(cohere_client: CohereClient, texts: List[str]) -> List[List[float]]:

    response = cohere_client.embed(
        texts=texts, model="embed-multilingual-v3.0", input_type="search_document"
    )

    return response.embeddings


# END GetQueryVector


# START-ANY
import os
import weaviate
import os

# END-ANY

headers = {"X-Cohere-Api-Key": os.getenv("COHERE_APIKEY")}
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WCD_DEMO_URL"),  # Replace with your WCD URL
    auth_credentials=weaviate.classes.init.Auth.api_key(
        os.getenv("WCD_DEMO_ADMIN_KEY")
    ),  # Replace with your WCD key
    headers=headers,
)

# START-ANY
# Instantiate your client (not shown). e.g.:
# headers = {"X-Cohere-Api-Key": os.getenv("COHERE_APIKEY")}  # Replace with your Cohere API key
# client = weaviate.connect_to_weaviate_cloud(..., headers=headers) or
# client = weaviate.connect_to_local(..., headers=headers)

# END-ANY

query_text = "dystopian future"
query_vector = vectorize(co, [query_text])[0]

# SinglePromptGeneration
# Get the collection
movies = client.collections.get("MovieCustomVector")

# Perform query
response = movies.generate.near_vector(
    near_vector=query_vector,
    limit=5,
    # highlight-start
    single_prompt="Translate this into French: {title}"
    # highlight-end
)

# Inspect the response
for o in response.objects:
    # highlight-start
    print(o.properties["title"])  # Print the title
    # highlight-end
    print(o.generated)  # Print the generated text (the title, in French)

client.close()
# END SinglePromptGeneration


print("\n\n")

client.connect()


# GroupedTaskGeneration
# Get the collection
movies = client.collections.get("MovieCustomVector")

# Perform query
response = movies.generate.near_vector(
    near_vector=query_vector,
    limit=5,
    # highlight-start
    grouped_task="What do these movies have in common?",
    # grouped_properties=["title", "overview"]  # Optional parameter; for reducing prompt length
    # highlight-end
)

# Inspect the response
for o in response.objects:
    print(o.properties["title"])  # Print the title
# highlight-start
print(response.generated)  # Print the generated text (the commonalities between them)
# highlight-end

client.close()
# END GroupedTaskGeneration
