# START InstantiatePersonalizationAgent
import os
import weaviate
from weaviate.classes.init import Auth
from weaviate.agents.personalization import PersonalizationAgent

# END InstantiatePersonalizationAgent
# START AddUserProperties
from weaviate.classes.config import DataType

# END AddUserProperties
# START AddUserEntry
from weaviate.agents.classes import Persona

# END AddUserEntry
# START AddUserInteractions
from weaviate.agents.classes import PersonaInteraction

# END AddUserInteractions

# START InstantiatePersonalizationAgent

# Provide your required API key(s), e.g. for the configured vectorizer(s)
headers = {
    # END InstantiatePersonalizationAgent
    "X-Cohere-API-Key": os.environ.get("COHERE_API_KEY", ""),
    # START InstantiatePersonalizationAgent
    # Provide your required API key(s), e.g. Cohere, OpenAI, etc. for the configured vectorizer(s)
    "X-INFERENCE-PROVIDER-API-KEY": os.environ.get("YOUR_INFERENCE_PROVIDER_KEY", ""),
}

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ.get("WEAVIATE_URL"),
    auth_credentials=Auth.api_key(os.environ.get("WEAVIATE_API_KEY")),
    headers=headers,
)

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

# START AddUserData  # START AddUserPersona
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

# END AddUserData  # END AddUserPersona

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

# START AddUserData  # START AddUserInteractions
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
# END AddUserData  # END AddUserInteractions

# START BasicQuery
response = pa.get_objects(persona_id, limit=10, use_agent_ranking=False)

for i, obj in enumerate(response.objects):
    print(obj.properties)
# END BasicQuery







user_data_list = []
# START AddUserEntry

# Add new users to the user data collection
# Here, `user_data_list` is a list of dictionaries, each containing the user data
response = pa.users.add_users(
    users=[
        UserEntry(
            name=user_data["name"],
            user_id=user_data["user_id"],
            properties={
                "age": user_data["age"],
                "hobbies": user_data["hobbies"],
                "location": user_data["location"],
            },
        )
        for user_data in [user_data_list]
    ]
)
# END AddUserEntry

# START AddUserInteractions

# Add new interactions to the user data collection
response = pa.users.add_interaction(
    interactions=[
        UserInteraction(
            user_id="charlesp_123",
            item_id="product_581",
            interaction_property_name="view",
            weight=1.0,
        ),
        UserInteraction(
            user_id="charlesp_123",
            item_id="product_75",
            interaction_property_name="like",
            weight=1.0,
        ),
        UserInteraction(
            user_id="bob_321",
            item_id="product_812",
            interaction_property_name="purchase",
            weight=1.0,
        ),
    ],
    remove_previous_interactions=False,
)
# END AddUserInteractions


# START AnotherQuery
# Perform a query
response = pa.recommndations.item.from_user(user_id="cpierse_123")

# Print the response
for i in response.recommendations.items:
    print(i)
# END AnotherQuery

# START QueryParameters
# Perform a query
response = pa.recommndations.item.from_user(
    user_id="charlesp_123", limit=10, top_n_interactions=100
)

# Print the response
for i in response.recommendations.items:
    print(i["product_id"])
    print(i["category"])
    print(i["title"])
# END QueryParameters


client.close()
