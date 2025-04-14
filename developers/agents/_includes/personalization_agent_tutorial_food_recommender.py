import os
from uuid import uuid4

import weaviate
from weaviate.auth import Auth
from getpass import getpass
from weaviate.classes.config import Configure, DataType, Property
from datasets import load_dataset
from weaviate.agents.personalization import PersonalizationAgent
from weaviate.agents.classes import Persona, PersonaInteraction
from weaviate.collections.classes.filters import Filter

# Note: The full script requires all imports at the top for execution.
# The imports are repeated within START/END blocks for tutorial snippet portability.

# 1. Set up Weaviate
# 1.1 Connect to Weaviate Cloud
# START ConnectToWeaviate
# Required imports for this snippet:
import os
import weaviate
from weaviate.auth import Auth
from getpass import getpass

if "WEAVIATE_API_KEY" not in os.environ:
    os.environ["WEAVIATE_API_KEY"] = getpass("Weaviate API Key")
if "WEAVIATE_URL" not in os.environ:
    os.environ["WEAVIATE_URL"] = getpass("Weaviate URL")

# Assume client is defined elsewhere if running snippets independently
# For the full script, 'client' is defined here.
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ.get("WEAVIATE_URL"),
    auth_credentials=Auth.api_key(os.environ.get("WEAVIATE_API_KEY")),
)

# Check if the connection is successful
if client.is_ready():
    print("Client is ready!")
else:
    print("Client connection failed!")
# END ConnectToWeaviate

# 2. Prepare the Collection
# 2.1 Define the Collection
# START DefineCollection
# Required imports for this snippet:
from weaviate.classes.config import Configure, DataType, Property

# Assumes 'client' is already defined and connected from the previous step


def create_recipes_collection(client):
    """Creates the 'Recipes' collection with specified properties and vectorizer."""
    if client.collections.exists("Recipes"):
        print("Deleting existing 'Recipes' collection.")
        client.collections.delete("Recipes")

    print("Creating 'Recipes' collection...")
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
    print("'Recipes' collection created.")


# This call assumes 'client' exists in the context
create_recipes_collection(client)
# END DefineCollection

# 2.2 Populate the database
# START PopulateDatabase
# Required imports for this snippet:
from datasets import load_dataset

# Assumes 'client' is already defined and connected


def populate_recipes_collection(client):
    """Populates the 'Recipes' collection from the Hugging Face dataset."""
    print("Loading dataset...")
    # Ensure datasets library is installed: pip install datasets
    dataset = load_dataset(
        "weaviate/agents",
        "personalization-agent-recipes",
        split="train",
        streaming=True,
    )
    recipes_collection = client.collections.get("Recipes")

    print("Starting data import...")
    with recipes_collection.batch.dynamic() as batch:
        count = 0
        for item in dataset:
            batch.add_object(properties=item["properties"])
            count += 1
            if count % 500 == 0:
                print(f"Imported {count} items...")
    print(f"Finished importing {count} items.")


# This call assumes 'client' exists in the context
populate_recipes_collection(client)
# END PopulateDatabase

# 2.3 Check the number of objects
# START CheckCollectionSize
# No additional imports needed for this specific snippet
# Assumes 'client' is already defined and connected


def check_collection_size(client):
    """Checks and prints the total number of objects in the 'Recipes' collection."""
    recipes_collection = client.collections.get("Recipes")
    count_result = recipes_collection.aggregate.over_all(total_count=True)
    print(f"Size of the Recipes dataset: {count_result.total_count}")


# This call assumes 'client' exists in the context
check_collection_size(client)
# END CheckCollectionSize

# 3. Set up the Personalization Agent
# 3.1 Create or connect to the agent and define user_properties
# START CreateOrConnectAgent
# Required imports for this snippet:
from weaviate.agents.personalization import PersonalizationAgent
from weaviate.classes.config import DataType  # Needed for user_properties definition

# Assumes 'client' is already defined and connected


def create_or_connect_agent(client):
    """Creates a new PersonalizationAgent or connects to an existing one."""
    agent_exists = PersonalizationAgent.exists(client, "Recipes")
    if agent_exists:
        print(
            "Connecting to existing Personalization Agent for 'Recipes' collection..."
        )
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
    return agent


# This call assumes 'client' exists and assigns the result to 'agent'
# For standalone snippets, 'agent' would need separate definition/mocking
agent = create_or_connect_agent(client)
# END CreateOrConnectAgent

# 4. Use the Personalization Agent
# 4.1 Add a New Persona
# START AddPersona
# Required imports for this snippet:
from uuid import uuid4
from weaviate.agents.classes import Persona

# Assumes 'agent' is already defined from the previous step


def add_persona(agent):
    """Adds a new persona to the Personalization Agent."""
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
    print("\nAdded Persona Details:")
    # Retrieve and print the added persona to confirm
    try:
        added_persona = agent.get_persona(persona_id)
        print(added_persona)
    except Exception as e:
        print(f"Error retrieving added persona: {e}")
    return persona_id


# This call assumes 'agent' exists and assigns the result to 'persona_id'
# For standalone snippets, 'persona_id' would need separate definition/mocking
persona_id = add_persona(agent)
# END AddPersona

# 4.2 Add Interactions
# START AddInteractions
# Required imports for this snippet:
from weaviate.agents.classes import PersonaInteraction
from weaviate.collections.classes.filters import Filter

# Assumes 'agent', 'client', and 'persona_id' are already defined


def add_interactions(agent, persona_id, client):  # Added client as parameter
    """Adds interactions for a given persona."""
    recipes_collection = client.collections.get("Recipes")
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

    print(f"\nFetching recipes for interactions: {reviewed_foods}")
    # Fetch the objects to get their UUIDs
    try:
        fetched_recipes = recipes_collection.query.fetch_objects(
            filters=Filter.by_property("title").contains_any(reviewed_foods),
            limit=len(reviewed_foods),
        ).objects
        reviews_dict = {
            recipe.properties["title"]: recipe for recipe in fetched_recipes
        }
        print(f"Fetched {len(reviews_dict)} recipes for interaction mapping.")
    except Exception as e:
        print(f"Error fetching recipes for interactions: {e}")
        return []

    # Create interactions only for fetched recipes
    interactions = []
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

    for food_title, weight in interaction_map.items():
        if food_title in reviews_dict:
            interactions.append(
                PersonaInteraction(
                    persona_id=persona_id,
                    item_id=reviews_dict[food_title].uuid,
                    weight=weight,
                )
            )
        else:
            print(
                f"Warning: Recipe '{food_title}' not found in fetched recipes, skipping interaction."
            )

    if interactions:
        print(f"Adding {len(interactions)} interactions for persona {persona_id}...")
        try:
            agent.add_interactions(interactions)
            print("Interactions added successfully.")
        except Exception as e:
            print(f"Error adding interactions: {e}")
    else:
        print("No interactions to add.")

    return interactions


# This call assumes 'agent', 'persona_id', and 'client' exist
interactions = add_interactions(agent, persona_id, client)  # Pass client
# END AddInteractions

# 4.3 Get Recommendations
# START GetRecommendations
# No additional imports needed for this specific snippet
# Assumes 'agent' and 'persona_id' are already defined


def get_recommendations(agent, persona_id):
    """Gets and prints personalized recommendations for a given persona."""
    print(f"\nGetting recommendations for persona {persona_id}...")
    try:
        # Reduced limit for brevity in tutorial output
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
                # Keep output cleaner for tutorial
                # print(f"  Description: {obj.properties.get('description', 'N/A')}")
                print(f"  Cuisine: {obj.properties.get('labels', 'N/A')}")
                # Useful for debugging if needed
                print(f"  UUID: {obj.uuid}")
        else:
            print("No recommendations found.")
    except Exception as e:
        print(f"Error getting recommendations: {e}")


# This call assumes 'agent' and 'persona_id' exist
get_recommendations(agent, persona_id)
# END GetRecommendations

# Close the client connection
print("\nClosing Weaviate client connection.")
client.close()
print("Client closed.")
