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

headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("WCS_DEMO_ADMIN_KEY")
    ),  # Replace with your WCS key
    headers=headers,
)

# START-ANY
# Instantiate your client (not shown). e.g.:
# headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key
# client = weaviate.connect_to_wcs(..., headers=headers) or
# client = weaviate.connect_to_local(..., headers=headers)

# END-ANY

# MetadataSemanticSearch
# Get the collection
movies = client.collections.get("Movie")

# Perform query
response = movies.query.near_text(
    query="dystopian future", limit=5, return_metadata=wq.MetadataQuery(distance=True)
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


print("\n\n")

client.connect()

# MetadataBM25Search
# Get the collection
movies = client.collections.get("Movie")

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
movies = client.collections.get("Movie")

# Perform query
response = movies.query.hybrid(
    query="history", limit=5, return_metadata=wq.MetadataQuery(score=True)
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

# FilteredSemanticSearch
# Get the collection
movies = client.collections.get("Movie")

# Perform query
response = movies.query.near_text(
    query="dystopian future",
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
