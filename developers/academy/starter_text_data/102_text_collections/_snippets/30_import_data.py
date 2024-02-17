import os

your_wcs_url = os.getenv("WCS_DEMO_URL")
your_wcs_key = os.getenv("WCS_DEMO_ADMIN_KEY")

# BatchImportData
import weaviate
import pandas as pd
import requests
import datetime
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
    movies = client.collections.get("Movie")
    with movies.batch.dynamic() as batch:
        for i, movie in df[:10].iterrows():
            release_date = datetime.datetime.strptime(movie["release_date"], "%Y-%m-%d")
            movie_obj = {
                "title": movie["title"],
                "overview": movie["overview"],
                "vote_average": movie["vote_average"],
                "genre_ids": movie["genre_ids"],
                "release_date": release_date,
                "tmdb_id": movie["id"]
            }
            batch.add_object(
                properties=movie_obj,
                uuid=generate_uuid5(movie["id"])
            )

finally:
    client.close()

