# MetadataSemanticSearch
import weaviate
import weaviate.classes.query as wq
import os

# END MetadataSemanticSearch

# MetadataSemanticSearch

# END MetadataSemanticSearch

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCD_DEMO_URL"),  # Replace with your WCD URL
    auth_credentials=weaviate.classes.init.Auth.api_key(
        os.getenv("WCD_DEMO_ADMIN_KEY")
    ),  # Replace with your WCD key
)

# MetadataSemanticSearch
# Instantiate your client (not shown). e.g.:
# client = weaviate.connect_to_wcs(...) or
# client = weaviate.connect_to_local(...)

# END MetadataSemanticSearch


# GetQueryVector  # MetadataSemanticSearch
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


query_text = "dystopian future"
query_vector = vectorize(co, [query_text])[0]
# END GetQueryVector  # END MetadataSemanticSearch


# MetadataSemanticSearch
# Get the collection
movies = client.collections.get("MovieCustomVector")

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
