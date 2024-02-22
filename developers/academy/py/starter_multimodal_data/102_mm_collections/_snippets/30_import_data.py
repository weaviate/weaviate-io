# BatchImportData
import weaviate
import pandas as pd
import requests
from datetime import datetime, timezone
import json
from weaviate.util import generate_uuid5
from tqdm import tqdm
import os
import zipfile
from pathlib import Path

# END BatchImportData
headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
client = weaviate.connect_to_local(headers=headers)

# BatchImportData
# Instantiate your client (not shown). e.g.:
# client = weaviate.connect_to_local()

# END BatchImportData

# BatchImportData
data_url = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024.json"
resp = requests.get(data_url)
df = pd.DataFrame(resp.json())

img_dir = Path("scratch/imgs")
img_dir.mkdir(parents=True, exist_ok=True)

posters_url = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024.zip"
posters_path = img_dir / "movies_data_1990_2024.zip"
posters_path.write_bytes(requests.get(posters_url).content)


# Unzip the file
with zipfile.ZipFile(posters_path, 'r') as zip_ref:
    zip_ref.extractall(img_dir)


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
    print(movies.batch.failed_objects)

client.close()
