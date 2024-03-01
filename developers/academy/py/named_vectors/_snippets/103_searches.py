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
client = weaviate.connect_to_local(
    port=8280,
    grpc_port=50251,
    headers=headers
)

# START-ANY
# Instantiate your client (not shown). e.g.:
# headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key
# client = weaviate.connect_to_local(headers=headers)

# END-ANY


# NVTitleSearch
# Get the collection
movies = client.collections.get("MovieNVDemo")

# Perform query
response = movies.query.near_text(
    query="A joyful holiday film",
    # highlight-start
    target_vector="title",  # The target vector to search against
    # highlight-end
    limit=5,
    return_metadata=wq.MetadataQuery(distance=True),
    return_properties=["title", "release_date", "tmdb_id", "poster"]
)

# Inspect the response
for o in response.objects:
    print(
        o.properties["title"], o.properties["release_date"].year, o.properties["tmdb_id"]
    )  # Print the title and release year (note the release date is a datetime object)
    print(
        f"Distance to query: {o.metadata.distance:.3f}\n"
    )  # Print the distance of the object from the query

client.close()
# END NVTitleSearch


print("\n\n")

client.connect()


# NVOverviewSearch
# Get the collection
movies = client.collections.get("MovieNVDemo")

# Perform query
response = movies.query.near_text(
    query="A joyful holiday film",
    # highlight-start
    target_vector="overview",  # The target vector to search against
    # highlight-end
    limit=5,
    return_metadata=wq.MetadataQuery(distance=True),
    return_properties=["title", "release_date", "tmdb_id", "poster"]
)

# Inspect the response
for o in response.objects:
    print(
        o.properties["title"], o.properties["release_date"].year, o.properties["tmdb_id"]
    )  # Print the title and release year (note the release date is a datetime object)
    print(
        f"Distance to query: {o.metadata.distance:.3f}\n"
    )  # Print the distance of the object from the query

client.close()
# END NVOverviewSearch


print("\n\n")

client.connect()


# NVPosterSearch
# Get the collection
movies = client.collections.get("MovieNVDemo")

# Perform query
response = movies.query.near_text(
    query="A joyful holiday film",
    # highlight-start
    target_vector="poster_title",  # The target vector to search against
    # highlight-end
    limit=5,
    return_metadata=wq.MetadataQuery(distance=True),
    return_properties=["title", "release_date", "tmdb_id", "poster"]
)

# Inspect the response
for o in response.objects:
    print(
        o.properties["title"], o.properties["release_date"].year, o.properties["tmdb_id"]
    )  # Print the title and release year (note the release date is a datetime object)
    print(
        f"Distance to query: {o.metadata.distance:.3f}\n"
    )  # Print the distance of the object from the query

client.close()
# END NVPosterSearch


print("\n\n")

client.connect()


# MetadataMultimodalSearch

def url_to_base64(url):
    import requests
    import base64

    image_response = requests.get(url)
    content = image_response.content
    return base64.b64encode(content).decode("utf-8")


# Get the collection
movies = client.collections.get("MovieNVDemo")

# Perform query
src_img_path = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
query_b64 = url_to_base64(src_img_path)

response = movies.query.near_image(
    near_image=query_b64,
    limit=5,
    target_vector="poster_title",  # The target vector to search against
    return_metadata=wq.MetadataQuery(distance=True),
    return_properties=["title", "release_date", "tmdb_id", "poster"]  # To include the poster property in the response (`blob` properties are not returned by default)
)

# Inspect the response
for o in response.objects:
    print(
        o.properties["title"], o.properties["release_date"].year, o.properties["tmdb_id"]
    )  # Print the title and release year (note the release date is a datetime object)
    print(
        f"Distance to query: {o.metadata.distance:.3f}\n"
    )  # Print the distance of the object from the query

client.close()
# END MetadataMultimodalSearch


print("\n\n")

client.connect()


# MetadataHybridSearch
# Get the collection
movies = client.collections.get("MovieNVDemo")

# Perform query
response = movies.query.hybrid(
    query="history",
    # highlight-start
    target_vector="overview",  # The target vector to search against
    # highlight-end
    limit=5,
    return_metadata=wq.MetadataQuery(score=True)
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
