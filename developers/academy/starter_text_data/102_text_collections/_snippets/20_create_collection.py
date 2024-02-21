import os

your_wcs_url = os.getenv("WCS_DEMO_URL")
your_wcs_key = os.getenv("WCS_DEMO_ADMIN_KEY")

# CreateMovieCollection
import weaviate
# CreateMovieCollection  # SubmoduleImport
import weaviate.classes.config as wc
# CreateMovieCollection  # END SubmoduleImport

# END CreateMovieCollection
client = weaviate.connect_to_wcs(
    cluster_url=your_wcs_url,  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(your_wcs_key)  # Replace with your WCS key
)

# CreateMovieCollection
# Instantiate your client (not shown). e.g.:
# client = weaviate.connect_to_wcs(...) or
# client = weaviate.connect_to_local(...)

# END CreateMovieCollection

client.close()

# Actual instantiation
client = weaviate.connect_to_local()

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

