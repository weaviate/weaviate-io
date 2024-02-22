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
headers={
    "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")
}
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_ADMIN_KEY")),  # Replace with your WCS key
    headers=headers
)

# BatchImportData
# Instantiate your client (not shown). e.g.:
# client = weaviate.connect_to_wcs(...) or
# client = weaviate.connect_to_local(...)

# END BatchImportData

# BatchImportData
data_url = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024.json"
data_resp = requests.get(data_url)
df = pd.DataFrame(data_resp.json())

embs_url = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024_all-MiniLM-L6-v2_embeddings.csv"
emb_df = pd.read_csv(embs_url)

# Get the collection
movies = client.collections.get("Movie")

# Enter context manager
with movies.batch.dynamic() as batch:

    # Loop through the data
    for i, movie in enumerate(df.itertuples(index=False)):
        # Convert data types
        # Convert a JSON date to `datetime` and add time zone information
        release_date = datetime.strptime(movie.release_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        # Convert a JSON array to a list of integers
        genre_ids = json.loads(movie.genre_ids)

        # Build the object payload
        movie_obj = {
            "title": movie.title,
            "overview": movie.overview,
            "vote_average": movie.vote_average,
            "genre_ids": genre_ids,
            "release_date": release_date,
            "tmdb_id": movie.id
        }

        # Get the vector
        vector = emb_df.iloc[i].to_list()

        # Add object (including vector) to batch queue
        batch.add_object(
            properties=movie_obj,
            uuid=generate_uuid5(movie.id),
            vector=vector  # Add the custom vector
            # references=reference_obj  # You can add references here
        )
        # Batcher automatically sends batches

# Check for failed objects
if len(movies.batch.failed_objects) > 0:
    print(f"Failed to import {len(movies.batch.failed_objects)} objects")
    print(movies.batch.failed_objects)

client.close()
