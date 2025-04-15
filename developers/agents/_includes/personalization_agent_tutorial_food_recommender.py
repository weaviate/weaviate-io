# 1. Set up Weaviate
# 1.1 Connect to Weaviate Cloud
# START ConnectToWeaviate
import os
import weaviate
from weaviate.auth import Auth

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
)

print(client.is_ready())  # Should print: `True`

# Your work goes here!

client.close()  # Free up resources
# END ConnectToWeaviate

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
)

client.collections.delete("Recipes")

# 2. Prepare the Collection
# 2.1 Define the Collection
# START DefineCollection
from weaviate.classes.config import Configure, DataType, Property


client.collections.create(
    "Recipes",
    description="A dataset that lists recipes with titles, descriptions, and labels indicating cuisine",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(),
    properties=[
        Property(
            name="title", data_type=DataType.TEXT, description="title of the recipe"
        ),
        Property(
            name="labels",
            data_type=DataType.TEXT,
            description="the cuisine the recipe belongs to",
        ),
        Property(
            name="description",
            data_type=DataType.TEXT,
            description="short description of the recipe",
        ),
    ],
)
# END DefineCollection

# 2.2 Populate the database
# START PopulateDatabase
from datasets import load_dataset

# Ensure datasets library is installed: pip install datasets
dataset = load_dataset(
    "weaviate/agents",
    "personalization-agent-recipes",
    split="train",
    streaming=True,
)
recipes_collection = client.collections.get("Recipes")

with recipes_collection.batch.dynamic() as batch:
    for i, item in enumerate(dataset):
        if i < 200:
            batch.add_object(properties=item["properties"])

failed_objects = recipes_collection.batch.failed_objects
if failed_objects:
    print(f"Number of failed imports: {len(failed_objects)}")
    print(f"First failed object: {failed_objects[0]}")

# END PopulateDatabase


# 2.3 Check the number of objects
# START CheckCollectionSize
print(f"Size of the Recipes dataset: {len(recipes_collection)}")
# END CheckCollectionSize

# 3. Set up the Personalization Agent
# 3.1 Create or connect to the agent and define user_properties
# START CreateOrConnectAgent
from weaviate.agents.personalization import PersonalizationAgent
from weaviate.classes.config import DataType


agent_exists = PersonalizationAgent.exists(client, "Recipes")
if agent_exists:
    print("Connecting to existing Personalization Agent for 'Recipes' collection...")
    agent = PersonalizationAgent.connect(
        client=client,
        reference_collection="Recipes",
    )
    print("Connected to existing agent.")
else:
    print("Creating new Personalization Agent for 'Recipes' collection...")
    agent = PersonalizationAgent.create(
        client=client,
        reference_collection="Recipes",
        user_properties={
            "favorite_cuisines": DataType.TEXT_ARRAY,
            "likes": DataType.TEXT_ARRAY,
            "dislikes": DataType.TEXT_ARRAY,
        },
    )
    print("New agent created.")
# END CreateOrConnectAgent

# 4. Use the Personalization Agent
# 4.1 Add a New Persona
# START AddPersona
from uuid import uuid4
from weaviate.agents.classes import Persona


persona_id = uuid4()
print(f"Adding persona with ID: {persona_id}")
agent.add_persona(
    Persona(
        persona_id=persona_id,
        properties={
            "favorite_cuisines": ["Italian", "Thai"],
            "likes": ["chocolate", "salmon", "pasta", "most veggies"],
            "dislikes": ["okra", "mushroom"],
        },
    )
)
# END AddPersona

# 4.2 Add Interactions
# START AddInteractions
from weaviate.agents.personalization import PersonaInteraction
from weaviate.collections.classes.filters import Filter


reviewed_foods = [
    "Coq au Vin",
    "Chicken Tikka Masala",
    "Gnocchi alla Sorrentina",
    "Matcha Ice Cream",
    "Fiorentina Steak",
    "Nabe",
    "Duck Confit",
    "Pappardelle with Porcini",
]

# Fetch the recipe objects to get their UUIDs
reviews_dict = {
    recipe.properties["title"]: recipe
    for recipe in recipes_collection.query.fetch_objects(
        filters=Filter.by_property("title").contains_any(reviewed_foods),
        limit=len(reviewed_foods),  # Use len for limit
    ).objects
}

# Define the mapping of food titles to interaction weights
interaction_map = {
    "Coq au Vin": 0.8,
    "Chicken Tikka Masala": 0.8,
    "Matcha Ice Cream": 0.8,
    "Gnocchi alla Sorrentina": 0.5,
    "Fiorentina Steak": 0.8,
    "Nabe": 0.5,
    "Duck Confit": 1.0,
    "Pappardelle with Porcini": -1.0,
}

interactions = []
for food_title, weight in interaction_map.items():
    if food_title in reviews_dict:
        # If the recipe was found, create the interaction object
        interaction = PersonaInteraction(
            persona_id=persona_id,
            item_id=reviews_dict[food_title].uuid,  # Get UUID from fetched recipe
            weight=weight,
        )
        interactions.append(interaction)

# Add the created interactions list to the agent
agent.add_interactions(interactions=interactions)
# END AddInteractions


# 4.3 Get Recommendations
# START GetRecommendations
def get_recommendations(agent, persona_id):
    """Gets and prints personalized recommendations for a given persona."""
    print(f"\nGetting recommendations for persona {persona_id}...")
    try:
        response = agent.get_objects(persona_id, limit=10, use_agent_ranking=True)

        print("\nRanking Rationale:")
        print(
            response.ranking_rationale
            if response.ranking_rationale
            else "No rationale provided."
        )
        print("\nRecommended Recipes:")
        if response.objects:
            for i, obj in enumerate(response.objects):
                print(f"----- Recommendation {i+1} -----")
                print(f"  Title: {obj.properties.get('title', 'N/A')}")
                print(f"  Cuisine: {obj.properties.get('labels', 'N/A')}")
                print(f"  UUID: {obj.uuid}")
        else:
            print("No recommendations found.")
    except Exception as e:
        print(f"Error getting recommendations: {e}")


get_recommendations(agent, persona_id)
# END GetRecommendations

print("\nClosing Weaviate client connection.")
client.close()
print("Client closed.")
