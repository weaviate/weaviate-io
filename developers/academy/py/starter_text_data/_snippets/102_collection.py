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


# BatchImportData
import weaviate
import pandas as pd
import requests
from datetime import datetime, timezone
import json
from weaviate.util import generate_uuid5
from tqdm import tqdm
import os

# END BatchImportData
headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("WCS_DEMO_ADMIN_KEY")
    ),  # Replace with your WCS key
    headers=headers,
)

# BatchImportData
# Instantiate your client (not shown). e.g.:
# client = weaviate.connect_to_wcs(...) or
# client = weaviate.connect_to_local(...)

# END BatchImportData

# BatchImportData
data_url = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024.json"
resp = requests.get(data_url)
df = pd.DataFrame(resp.json())

# Get the collection
movies = client.collections.get("Movie")

# Enter context manager
with movies.batch.rate_limit(2400) as batch:
    # Loop through the data
    for i, movie in tqdm(df.iterrows()):
        # Convert data types
        # Convert a JSON date to `datetime` and add time zone information
        release_date = datetime.strptime(movie["release_date"], "%Y-%m-%d").replace(
            tzinfo=timezone.utc
        )
        # Convert a JSON array to a list of integers
        genre_ids = json.loads(movie["genre_ids"])

        # Build the object payload
        movie_obj = {
            "title": movie["title"],
            "overview": movie["overview"],
            "vote_average": movie["vote_average"],
            "genre_ids": genre_ids,
            "release_date": release_date,
            "tmdb_id": movie["id"],
        }

        # Add object to batch queue
        batch.add_object(
            properties=movie_obj,
            uuid=generate_uuid5(movie["id"])
            # references=reference_obj  # You can add references here
        )
        # Batcher automatically sends batches

# Check for failed objects
if len(movies.batch.failed_objects) > 0:
    print(f"Failed to import {len(movies.batch.failed_objects)} objects")

client.close()
