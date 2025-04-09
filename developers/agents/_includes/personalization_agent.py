# START-ANY
# [🚧 UNDER CONSTRUCTION 🚧] This Weaviate Agent is not available just yet.
# These snippets are indicative. The syntax may change when this Agent is released.

# END-ANY

# START InstantiatePersonalizationAgent
import os
import weaviate
from weaviate.classes.init import Auth
from weaviate.agents.personalization import PersonalizationAgent
# END InstantiatePersonalizationAgent
# START AddUserProperties
from weaviate.classes.agents import UserProperty
from weaviate.classes.config import DataType
# END AddUserProperties
# START AddUserEntry
from weaviate.classes.agents import UserEntry
# END AddUserEntry
# START AddUserInteractions
from weaviate.classes.agents import UserInteraction
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
pa = PersonalizationAgent(
    client=client, collections=["ecommerce"]
)
# END InstantiatePersonalizationAgent

# START BasicQuery
# Perform a query
response = pa.recommndations.item.from_user(
    user_id="cpierse_123"
)

# Print the response
for i in response.recommendations.items:
    print(i)
# END BasicQuery

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

# START AddUserProperties

# Add user properties
response = pa.users.add_properties(
    properties=[
        UserProperty(name="age", data_type=DataType.INT),
        UserProperty(name="hobbies", data_type=DataType.TEXT),
        UserProperty(name="location", data_type=DataType.TEXT),
    ]
)
# END AddUserProperties

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
                "location": user_data["location"]
            }
        ) for user_data in [user_data_list]
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
            weight=1.0
        ),
        UserInteraction(
            user_id="charlesp_123",
            item_id="product_75",
            interaction_property_name="like",
            weight=1.0
        ),
        UserInteraction(
            user_id="bob_321",
            item_id="product_812",
            interaction_property_name="purchase",
            weight=1.0
        ),
    ],
    remove_previous_interactions=False
)
# END AddUserInteractions

client.close()
