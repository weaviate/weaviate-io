import os

your_wcs_url = os.getenv("WCS_DEMO_URL")
your_wcs_key = os.getenv("WCS_DEMO_ADMIN_KEY")

# BatchImportData
import weaviate
import pandas as pd
import requests
import datetime
import json
from weaviate.util import generate_uuid5

client = weaviate.connect_to_wcs(
    cluster_url=your_wcs_url,  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(your_wcs_key)  # Replace with your WCS key
)

# END BatchImportData

client.close()

# Actual instantiation
client = weaviate.connect_to_local()
client.connect()

# BatchImportData
data_url = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024.json"
resp = requests.get(data_url)
df = pd.DataFrame(resp.json())

try:
    # Get the collection
    movies = client.collections.get("Movie")

    # Enter context manager
    with movies.batch.dynamic() as batch:

        # Loop through the data
        for i, movie in df.iterrows():

            # Convert data types
            release_date = datetime.datetime.strptime(movie["release_date"], "%Y-%m-%d")
            genre_ids = json.loads(movie["genre_ids"])
            # Build the object payload
            movie_obj = {
                "title": movie["title"],
                "overview": movie["overview"],
                "vote_average": movie["vote_average"],
                "genre_ids": genre_ids,
                "release_date": release_date,
                "tmdb_id": movie["id"]
            }
            batch.add_object(
                properties=movie_obj,
                uuid=generate_uuid5(movie["id"])
                # references=reference_obj  # You can add references here
            )
            # Batcher automatically sends batches

    # Check for failed objects
    if len(movies.batch.failed_objects) > 0:
        print(f"Failed to import {len(movies.batch.failed_objects)} objects")
        print(movies.batch.failed_objects)

finally:
    client.close()

