# START ConnectToWeaviate
import os
import weaviate
from weaviate.classes.init import Auth
# END ConnectToWeaviate
# START InstantiatePersonalizationAgent  # START CreateOrConnectToAgent
from weaviate.agents.personalization import PersonalizationAgent
from weaviate.classes.config import DataType
# END InstantiatePersonalizationAgent  # END CreateOrConnectToAgent
# START AddUserPersona
from weaviate.agents.classes import Persona
# END AddUserPersona
# START AddUserInteractions
from weaviate.agents.classes import PersonaInteraction
# END AddUserInteractions

# Additional helpers (not shown in the docs)
from tqdm import tqdm
from datasets import load_dataset
from weaviate.classes.config import Configure, Property, DataType
from typing import Dict, Any

# START ConnectToWeaviate

# Provide your required API key(s), e.g. for the configured vectorizer(s)
headers = {
    # END ConnectToWeaviate
    "X-Cohere-API-Key": os.environ.get("COHERE_API_KEY", ""),
    # START ConnectToWeaviate
    # Provide your required API key(s), e.g. Cohere, OpenAI, etc. for the configured vectorizer(s)
    "X-INFERENCE-PROVIDER-API-KEY": os.environ.get("YOUR_INFERENCE_PROVIDER_KEY", ""),
}

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ.get("WEAVIATE_URL"),
    auth_credentials=Auth.api_key(os.environ.get("WEAVIATE_ADMIN_API_KEY")),
    headers=headers,
)

# END ConnectToWeaviate # END InstantiatePersonalizationAgent

# Delete the collection if we want to start fresh
client.collections.delete("Movie")

client.collections.create(
    "Movie",
    description="A dataset of movies including their metadata.",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(
        model="Snowflake/snowflake-arctic-embed-m-v1.5"
    ),
    properties=[
        Property(
            name="release_date",
            data_type=DataType.TEXT,
            description="release date of the movie",
            skip_vectorization=True,
        ),
        Property(
            name="title", data_type=DataType.TEXT, description="title of the movie"
        ),
        Property(
            name="overview",
            data_type=DataType.TEXT,
            description="overview of the movie",
        ),
        Property(
            name="genres",
            data_type=DataType.TEXT_ARRAY,
            description="genres of the movie",
        ),
        Property(
            name="vote_average",
            data_type=DataType.NUMBER,
            description="vote average of the movie",
        ),
        Property(
            name="vote_count",
            data_type=DataType.INT,
            description="vote count of the movie",
        ),
        Property(
            name="popularity",
            data_type=DataType.NUMBER,
            description="popularity of the movie",
        ),
        Property(
            name="poster_url",
            data_type=DataType.TEXT,
            description="poster path of the movie",
            skip_vectorization=True,
        ),
        Property(
            name="original_language",
            data_type=DataType.TEXT,
            description="Code of the language of the movie",
            skip_vectorization=True,
        ),
    ],
)

# Load the movies dataset
movies_dataset = load_dataset("Pablinho/movies-dataset", split="train", streaming=True)

# Get the Movies collection
movies_collection = client.collections.get("Movie")

def load_movie_row(item: Dict[str, Any]) -> Dict[str, Any]:
    """
    Load movie data to output matching Weaviate object

    Args:
        item: Dictionary containing movie data with original keys

    Returns:
        Dictionary matching Weaviate data schema
    """
    if item.get("Genre"):
        genres = [genre.strip() for genre in item["Genre"].split(",") if genre.strip()]
    else:
        genres = []

    if item.get("Original_Language"):
        original_language = item["Original_Language"].lower()
    else:
        original_language = ""

    if item.get("Vote_Average"):
        try:
            vote_average = float(item["Vote_Average"])
        except ValueError:
            vote_average = 0.0
    else:
        vote_average = 0.0

    if item.get("Vote_Count"):
        try:
            vote_count = int(item["Vote_Count"])
        except ValueError:
            vote_count = 0
    else:
        vote_count = 0

    if item.get("Popularity"):
        try:
            popularity = float(item["Popularity"])
        except ValueError:
            popularity = 0.0
    else:
        popularity = 0.0

    return {
        "release_date": item["Release_Date"],
        "title": item["Title"],
        "overview": item["Overview"],
        "genres": genres,
        "vote_average": vote_average,
        "vote_count": vote_count,
        "popularity": popularity,
        "poster_url": item["Poster_Url"],
        "original_language": original_language,
    }

# Batch import the appropriate data
with movies_collection.batch.fixed_size(batch_size=200) as batch:
    for i, item in tqdm(enumerate(movies_dataset)):
        data_object = load_movie_row(item)
        batch.add_object(properties=data_object)

# START CreateOrConnectToAgent

if PersonalizationAgent.exists(client, "Movie"):
    # Connect to an existing agent
    pa = PersonalizationAgent.connect(client=client, reference_collection="Movie")
else:
    # Instantiate a new agent, and specify the collection to query
    # The Personalization Agent will automatically also connect to the user data collection
    pa = PersonalizationAgent.create(
        client=client,
        reference_collection="Movie",
        user_properties={
            "age": DataType.NUMBER,
            "favorite_genres": DataType.TEXT_ARRAY,
            "favorite_years": DataType.NUMBER_ARRAY,
            "language": DataType.TEXT,
        },
    )
# END CreateOrConnectToAgent

# START CreatePersona
from weaviate.util import generate_uuid5
from uuid import uuid4  # If you want to generate a random UUID

persona_id = generate_uuid5("sebawita")  # To generate a deterministic UUID
# persona_id = uuid4()  # To generate a random UUID

# END CreatePersona
# Delete the persona if it already exists
pa.delete_persona(persona_id)
# START CreatePersona

pa.add_persona(
    Persona(
        persona_id=persona_id,
        properties={
            "age": 30,
            "favorite_genres": ["Action", "Adventure", "Sci-Fi", "Horror"],
            "favorite_years": [1999, 1996, 2008, 2019],
            "language": "English",
        },
    )
)

# END CreatePersona

from weaviate.classes.query import Filter

movie_titles = [
    "Avatar 2",
    "Big Daddy",
    "White House Down",
    "Tales from the Crypt",
    "Twister",
    "West Side Story",
    "The Howling",
    "The Emoji Movie",
    "Magic Mike",
    "Godzilla: Planet of the Monsters",
]

movies_collection = client.collections.get("Movie")

movie_dict = {
    movie.properties["title"]: movie
    for movie in movies_collection.query.fetch_objects(
        filters=Filter.by_property("title").contains_any(movie_titles), limit=20
    ).objects
}

# START AddUserInteractions
# Note: `movie_dict` is a dictionary of movie titles to their corresponding objects
interactions = [
    PersonaInteraction(
        persona_id=persona_id, item_id=movie_dict["Avatar 2"].uuid, weight=0.8
    ),  # Strongly positive
    PersonaInteraction(
        persona_id=persona_id, item_id=movie_dict["Twister"].uuid, weight=0.5
    ),  # Somewhat positive
    PersonaInteraction(
        persona_id=persona_id, item_id=movie_dict["The Howling"].uuid, weight=0.1
    ),  # Almost neutral
    PersonaInteraction(
        persona_id=persona_id, item_id=movie_dict["Magic Mike"].uuid, weight=-0.3
    ),  # Somewhat negative
    PersonaInteraction(
        persona_id=persona_id, item_id=movie_dict["The Emoji Movie"].uuid, weight=-1.0
    ),  # Strongly negative
]

pa.add_interactions(interactions=interactions)
# END AddUserInteractions

# START BasicQuery
response = pa.get_objects(persona_id)

for i, obj in enumerate(response.objects):
    print(obj.properties)
# END BasicQuery

# START QueryParameters
response = pa.get_objects(
    persona_id=persona_id,
    limit=10,
    recent_interactions_count=100,
    exclude_interacted_items=False,
    decay_rate=0.1,
    exclude_items=[],
    use_agent_ranking=True,
    explain_results=True,
    instruction=None,
)

for i, obj in enumerate(response.objects):
    print(obj.properties)
# END QueryParameters

# START InspectResults
print(response.ranking_rationale)
for i, obj in enumerate(response.objects):
    print(obj.properties)
    print(f"original rank: {obj.original_rank}")
    print(f"Personalized rank: {obj.personalized_rank}")
# END InspectResults

# START PersonalizedWeaviateQuery
personalized_query = pa.query(persona_id=persona_id, strength=0.95)

response = personalized_query.near_text(  # Or .bm25 / .hybrid
    query="A movie about a giant monster",
    limit=20,
    # Other normal `near_text` parameters can be added here
    # e.g. filter, auto_limit, distance, include_vector, include_metadata, etc.
)

for i, obj in enumerate(response.objects):
    print(obj.properties)
# END PersonalizedWeaviateQuery

# START ParamsPersonalizedWeaviateQuery
personalized_query = pa.query(
    persona_id=persona_id,          # The ID of the persona to use for personalization
    strength=0.95,                  # The strength of the personalization (0.0 = none, 1.0 = full)
    overfetch_factor=2,             # The number of objects to fetch before personalization
    recent_interactions_count=50,   # The number of recent interactions to consider
    decay_rate=0.2                  # The decay rate for the interactions
)

response = personalized_query.hybrid(  # Or .near_text / .bm25
    query="A movie about a giant monster",
    limit=20,
    # Other normal `hybrid` parameters can be added here
)

for i, obj in enumerate(response.objects):
    print(obj.properties)
# END ParamsPersonalizedWeaviateQuery

client.close()
