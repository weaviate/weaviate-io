# CreateMovieCollection
import weaviate

# CreateMovieCollection  # SubmoduleImport
import weaviate.classes.config as wc
import os

# CreateMovieCollection  # END SubmoduleImport

# END CreateMovieCollection
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("WCS_DEMO_ADMIN_KEY")
    ),  # Replace with your WCS key
)

# CreateMovieCollection
# Instantiate your client (not shown). e.g.:
# headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key
# client = weaviate.connect_to_wcs(..., headers=headers) or
# client = weaviate.connect_to_local(..., headers=headers)

# END CreateMovieCollection

# Actual instantiation

client.collections.delete("Movie")

# CreateMovieCollection
client.collections.create(
    name="Movie",
    properties=[
        wc.Property(name="title", data_type=wc.DataType.TEXT),
        wc.Property(name="overview", data_type=wc.DataType.TEXT),
        wc.Property(name="vote_average", data_type=wc.DataType.NUMBER),
        wc.Property(name="genre_ids", data_type=wc.DataType.INT_ARRAY),
        wc.Property(name="release_date", data_type=wc.DataType.DATE),
        wc.Property(name="tmdb_id", data_type=wc.DataType.INT),
    ],
    # Define the vectorizer module
    vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(),
    # Define the generative module
    generative_config=wc.Configure.Generative.openai()
    # END generativeDefinition  # CreateMovieCollection
)

client.close()
# END CreateMovieCollection
