# START ModelProviderEndToEnd
import weaviate
import weaviate.classes.config as wc
import os
from weaviate.util import generate_uuid5

# Connect to Weaviate
headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("WCS_DEMO_KEY")
    ),  # Replace with your WCS key
    headers=headers,
)


def get_data():  # Helper function to get the data
    import pandas as pd
    import requests

    data_url = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024.json"
    resp = requests.get(data_url)
    return pd.DataFrame(resp.json())


# END ModelProviderEndToEnd


client = weaviate.connect_to_local(headers=headers)


# START ModelProviderEndToEnd
# =============================================================================
# # Create a collection
# =============================================================================

collection_name = "TestMovieCollection"
# END ModelProviderEndToEnd


client.collections.delete(collection_name)


# START ModelProviderEndToEnd
client.collections.create(
    name=collection_name,
    properties=[
        wc.Property(name="title", data_type=wc.DataType.TEXT),
        wc.Property(name="overview", data_type=wc.DataType.TEXT),
        wc.Property(name="vote_average", data_type=wc.DataType.NUMBER),
    ],
    # Define the vectorizer module
    vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(),
    # Define the generative module
    generative_config=wc.Configure.Generative.openai(),
)


# =============================================================================
# # Import data
# =============================================================================
df = get_data()

movies = client.collections.get(collection_name)
with movies.batch.rate_limit(2400) as batch:
    for i, movie in df.iterrows():
        # Add object to batch queue
        batch.add_object(
            properties={
                "title": movie["title"],
                "overview": movie["overview"],
            },
            uuid=generate_uuid5(movie["id"]),
        )

# =============================================================================
# # Perform queries
# =============================================================================
# Example query
response = movies.query.near_text(
    query="dystopian future",
    limit=5,
)

for o in response.objects:
    print(o.properties["title"])  # Print the title


# Example RAG query
response = movies.generate.near_text(
    query="dystopian future",
    limit=5,
    grouped_task="What do these movies have in common?",
)

for o in response.objects:
    print(o.properties["title"])  # Print the title
print(response.generated)  # Print the generated text (the commonalities between them)


# Close connection
client.close()
# END ModelProviderEndToEnd
