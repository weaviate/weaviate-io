# CreateMovieCollection
import weaviate

# CreateMovieCollection  # SubmoduleImport
import weaviate.classes.config as wc
import os

# CreateMovieCollection  # END SubmoduleImport

# END CreateMovieCollection
client = weaviate.connect_to_local()

# CreateMovieCollection
# Instantiate your client (not shown). e.g.:
# headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key
# client = weaviate.connect_to_local(headers=headers)

# END CreateMovieCollection

# Actual instantiation

client.collections.delete("MMMovie")

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
        wc.Property(name="poster", data_type=wc.DataType.BLOB)
    ],
    # Define the vectorizer module
    vectorizer_config=wc.Configure.Vectorizer.multi2vec_clip(
        image_fields=wc.Multi2VecField(name="poster", weight=0.8),
        text_fields=wc.Multi2VecField(name="title", weight=0.1),
        text_fields=wc.Multi2VecField(name="overview", weight=0.1),
    ),
    # Define the generative module
    generative_config=wc.Configure.Generative.openai()
    # END generativeDefinition  # CreateMovieCollection
)

client.close()
# END CreateMovieCollection
