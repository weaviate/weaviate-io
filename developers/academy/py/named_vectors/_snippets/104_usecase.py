# START-ANY
import os
import weaviate
import os

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

# PosterSearchGeneration

def url_to_base64(url):
    import requests
    import base64

    image_response = requests.get(url)
    content = image_response.content
    return base64.b64encode(content).decode("utf-8")


# Get the collection
movies = client.collections.get("MovieNVDemo")

# Perform query
src_img_path = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/img/1927_Boris_Bilinski_(1900-1948)_Plakat_f%C3%BCr_den_Film_Metropolis%2C_Staatliche_Museen_zu_Berlin.jpg"
query_b64 = url_to_base64(src_img_path)

# response = movies.generate.near_text(
#     query="Science fiction film set in space",
response = movies.generate.near_image(
    near_image=query_b64,
    limit=10,
    # highlight-start
    target_vector="poster_title",  # The target vector to search against
    grouped_task="What types of movies are these, and what kinds of audience might this set of movies be aimed at overall?",
    grouped_properties=["title", "overview"]  # Optional parameter; for reducing prompt length
    # highlight-end
)

# Inspect the response
for o in response.objects:
    print(o.properties["title"])  # Print the title
print(response.generated)  # Print the generated text (the commonalities between them)

client.close()
# END PosterSearchGeneration


print("\n\n")

client.connect()


# TitleSerachLoop
# Get the collection
movies = client.collections.get("MovieNVDemo")

# Perform query
# highlight-start
# Loop through the target vectors
for tgt_vector in ["title", "overview"]:
# highlight-end
    response = movies.generate.near_text(
        query="Chrono Tides: The Anomaly Rift",
        limit=5,
        # highlight-start
        target_vector=tgt_vector,  # The target vector to search against
        grouped_task="What types of movies are these, and what kinds of audience might this set of movies be aimed at overall?",
        grouped_properties=["title", "overview"]  # Optional parameter; for reducing prompt length
        # highlight-end
    )

    # Inspect the response
    for o in response.objects:
        print(o.properties["title"])  # Print the title
    print(response.generated)  # Print the generated text (the commonalities between them)

client.close()
# END TitleSerachLoop
