# START ConnectToWeaviate
import os
import weaviate
from weaviate.classes.init import Auth
# END ConnectToWeaviate
# START InstantiatePersonalizationAgent  # START CreateOrConnectToAgent
from weaviate.agents.personalization import PersonalizationAgent
from weaviate.classes.config import DataType
# END InstantiatePersonalizationAgent  # END CreateOrConnectToAgent
# START AddUserData  # START AddUserPersona
from weaviate.agents.classes import Persona
# END AddUserData  # END AddUserPersona
# START AddUserInteractions
from weaviate.agents.classes import PersonaInteraction
# END AddUserInteractions

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
    auth_credentials=Auth.api_key(os.environ.get("WEAVIATE_API_KEY")),
    headers=headers,
)

# START InstantiatePersonalizationAgent # END ConnectToWeaviate
# Instantiate a new agent object, and specify the collections to query
# The Personalization Agent will automatically also connect to the user data collection

pa = PersonalizationAgent.create(
    client=client,
    reference_collection="Movies",
    user_properties={
        "age": DataType.NUMBER,
        "favorite_genres": DataType.TEXT_ARRAY,
        "favorite_years": DataType.NUMBER_ARRAY,
        "language": DataType.TEXT,
    },
)

# END InstantiatePersonalizationAgent

# START CreateOrConnectToAgent

if PersonalizationAgent.exists(client, "Movies"):
    pa = PersonalizationAgent.connect(client=client, reference_collection="Movies")
else:
    pa = PersonalizationAgent.create(
        client=client,
        reference_collection="Movies",
        user_properties={
            "age": DataType.NUMBER,
            "favorite_genres": DataType.TEXT_ARRAY,
            "favorite_years": DataType.NUMBER_ARRAY,
            "language": DataType.TEXT,
        },
    )
# END CreateOrConnectToAgent

# START CreatePersona
from uuid import uuid4

persona_id = uuid4()
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

movies_collection = client.collections.get("Movies")

movie_dict = {
    movie.properties["title"]: movie
    for movie in movies_collection.query.fetch_objects(
        filters=Filter.by_property("title").contains_any(movie_titles), limit=20
    ).objects
}

# START AddUserInteractions

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

client.close()
