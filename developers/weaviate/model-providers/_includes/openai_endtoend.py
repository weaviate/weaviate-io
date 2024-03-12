# START ModelProviderEndToEnd
import weaviate
from weaviate.classes.config import Property, DataType, Configure
from weaviate.auth import AuthApiKey
from weaviate.util import generate_uuid5
import os

# Connect to Weaviate
# highlight-start
headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key
# highlight-end
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=AuthApiKey(os.getenv("WCS_DEMO_KEY")),
    headers=headers,
)


def get_data():  # Helper function to get the data
    import pandas as pd
    import requests

    data_url = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024.json"
    resp = requests.get(data_url)
    return pd.DataFrame(resp.json())


# =============================================================================
# # Create a collection
# =============================================================================

collection_name = "TempMovieCollection"
# END ModelProviderEndToEnd

# =============================================================================
# Actual instantiation for testing (NOT SHOWN IN SNIPPET)
# =============================================================================
# Close the connection
client.close()
# Connect to Weaviate
client = weaviate.connect_to_local(headers=headers)
# Delete the collection if it exists
client.collections.delete(collection_name)
# =============================================================================

# START ModelProviderEndToEnd
client.collections.create(
    name=collection_name,
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="overview", data_type=DataType.TEXT),
    ],
    # highlight-start
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),  # Define the vectorizer module with default settings
    generative_config=Configure.Generative.openai(),  # Define the generative module with default settings
    # highlight-end
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
# END ModelProviderEndToEnd



# START ModelProviderCustomConfig
client.collections.create(
    name=collection_name,
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="overview", data_type=DataType.TEXT),
    ],
    # highlight-start
    vectorizer_config=Configure.Vectorizer.text2vec_openai(
        model="text-embedding-3-large",
        dimensions=1024,
    ),
    generative_config=Configure.Generative.openai(
        model="gpt-4-1106-preview",
        top_p=0.5,
        temperature=0.5
    ),
    # highlight-end
)
# END ModelProviderCustomConfig



# START ModelProviderEndToEnd

# Close connection
client.close()
# END ModelProviderEndToEnd


