import os

your_wcs_url = os.getenv("WCS_DEMO_URL")
your_wcs_key = os.getenv("WCS_DEMO_ADMIN_KEY")

# START-ANY
import weaviate
import weaviate.classes.query as wq

client = weaviate.connect_to_wcs(
    cluster_url=your_wcs_url,  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(your_wcs_key)  # Replace with your WCS key
)

# END-ANY

client.close()

# Actual instantiation
client = weaviate.connect_to_local()
client.connect()

# BasicQuery
try:
    # Get the collection
    movies = client.collections.get("Movie")

    # Perform query
    response = movies.query.fetch_objects(limit=5)

    # Inspect the response
    for o in response.objects:
        print(o.properties["title"], o.properties["release_date"].year)  # Print the title and release year (note the release date is a datetime object)


finally:
    client.close()
# END BasicQuery


print("\n\n")

client.connect()

# MetadataSemanticSearch
try:
    # Get the collection
    movies = client.collections.get("Movie")

    # Perform query
    response = movies.query.near_text(
        query="dystopian future",
        limit=5,
        return_metadata=wq.MetadataQuery(distance=True)
    )

    # Inspect the response
    for o in response.objects:
        print(o.properties["title"], o.properties["release_date"].year)  # Print the title and release year (note the release date is a datetime object)
        print(f"Distance to query: {o.metadata.distance:.3f}\n")  # Print the distance of the object from the query


finally:
    client.close()
# END MetadataSemanticSearch
