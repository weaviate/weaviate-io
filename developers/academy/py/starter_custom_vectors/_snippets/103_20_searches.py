# START-ANY
import weaviate
import weaviate.classes.query as wq
import os

# END-ANY

# FilteredSemanticSearch
from datetime import datetime

# END FilteredSemanticSearch

# START-ANY

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


# START-ANY
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


# END-ANY


query_text = "history"
query_vector = vectorize(co, [query_text])[0]

# MetadataBM25Search
# Get the collection
movies = client.collections.get("MovieCustomVector")

# Perform query
response = movies.query.bm25(
    query="history", limit=5, return_metadata=wq.MetadataQuery(score=True)
)

# Inspect the response
for o in response.objects:
    print(
        o.properties["title"], o.properties["release_date"].year
    )  # Print the title and release year (note the release date is a datetime object)
    print(
        f"BM25 score: {o.metadata.score:.3f}\n"
    )  # Print the BM25 score of the object from the query

client.close()
# END MetadataBM25Search


print("\n\n")

client.connect()

# MetadataHybridSearch
# Get the collection
movies = client.collections.get("MovieCustomVector")

# Perform query
response = movies.query.hybrid(
    query="history",  # For BM25 part of the hybrid search
    vector=query_vector,  # For vector part of the hybrid search
    limit=5,
    return_metadata=wq.MetadataQuery(score=True),
)

# Inspect the response
for o in response.objects:
    print(
        o.properties["title"], o.properties["release_date"].year
    )  # Print the title and release year (note the release date is a datetime object)
    print(
        f"Hybrid score: {o.metadata.score:.3f}\n"
    )  # Print the hybrid search score of the object from the query

client.close()
# END MetadataHybridSearch


print("\n\n")

client.connect()

query_text = "history"
query_vector = vectorize(co, [query_text])[0]

# FilteredSemanticSearch
# Get the collection
movies = client.collections.get("MovieCustomVector")

# Perform query
response = movies.query.near_vector(
    near_vector=query_vector,
    limit=5,
    return_metadata=wq.MetadataQuery(distance=True),
    # highlight-start
    filters=wq.Filter.by_property("release_date").greater_than(datetime(2020, 1, 1))
    # highlight-end
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
# END FilteredSemanticSearch
