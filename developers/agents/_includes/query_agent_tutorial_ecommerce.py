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

client.collections.delete("Brands")
client.collections.delete("ECommerce")

# START DefineCollections
from weaviate.classes.config import Configure, Property, DataType

# Using `auto-schema` to infer the data schema during import
client.collections.create(
    "Brands",
    description="A dataset that lists information about clothing brands, their parent companies, average rating and more.",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(),
)

# Explicitly defining the data schema
client.collections.create(
    "ECommerce",
    description="A dataset that lists clothing items, their brands, prices, and more.",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(),
    properties=[
        Property(name="collection", data_type=DataType.TEXT),
        Property(
            name="category",
            data_type=DataType.TEXT,
            description="The category to which the clothing item belongs",
        ),
        Property(
            name="tags",
            data_type=DataType.TEXT_ARRAY,
            description="The tags that are assocciated with the clothing item",
        ),
        Property(name="subcategory", data_type=DataType.TEXT),
        Property(name="name", data_type=DataType.TEXT),
        Property(
            name="description",
            data_type=DataType.TEXT,
            description="A detailed description of the clothing item",
        ),
        Property(
            name="brand",
            data_type=DataType.TEXT,
            description="The brand of the clothing item",
        ),
        Property(name="product_id", data_type=DataType.UUID),
        Property(
            name="colors",
            data_type=DataType.TEXT_ARRAY,
            description="The colors on the clothing item",
        ),
        Property(name="reviews", data_type=DataType.TEXT_ARRAY),
        Property(name="image_url", data_type=DataType.TEXT),
        Property(
            name="price",
            data_type=DataType.NUMBER,
            description="The price of the clothing item in USD",
        ),
    ],
)
# END DefineCollections

# START PopulateDatabase
from datasets import load_dataset

brands_dataset = load_dataset(
    "weaviate/agents", "query-agent-brands", split="train", streaming=True
)
ecommerce_dataset = load_dataset(
    "weaviate/agents", "query-agent-ecommerce", split="train", streaming=True
)

brands_collection = client.collections.get("Brands")
ecommerce_collection = client.collections.get("ECommerce")

with brands_collection.batch.dynamic() as batch:
    for item in brands_dataset:
        batch.add_object(properties=item["properties"], vector=item["vector"])

with ecommerce_collection.batch.dynamic() as batch:
    for item in ecommerce_dataset:
        batch.add_object(properties=item["properties"], vector=item["vector"])

failed_objects = brands_collection.batch.failed_objects
if failed_objects:
    print(f"Number of failed imports: {len(failed_objects)}")
    print(f"First failed object: {failed_objects[0]}")

print(f"Size of the ECommerce dataset: {len(ecommerce_collection)}")
print(f"Size of the Brands dataset: {len(brands_collection)}")
# END PopulateDatabase

# START BasicQueryAgent
from weaviate.agents.query import QueryAgent

agent = QueryAgent(
    client=client,
    collections=["ECommerce", "Brands"],
)
# END BasicQueryAgent

# START CustomizedQueryAgent
multi_lingual_agent = QueryAgent(
    client=client,
    collections=["ECommerce", "Brands"],
    system_prompt="You are a helpful assistant that always generates the final response in the user's language."
    "You may have to translate the user query to perform searches. But you must always respond to the user in their own language.",
)
# END CustomizedQueryAgent

# START AskQuestions
from weaviate.agents.utils import print_query_agent_response

response = agent.run(
    "I like vintage clothes, can you list me some options that are less than $200?"
)

print(response)
# END AskQuestions

# START FinalAnswerAskQuestions
# Only print the final answer of the response
print(response.final_answer)
# END FinalAnswerAskQuestions

# START PrintQueryAgentResponseAskQuestions
# Print the whole response in a user-friendly format
print_query_agent_response(response)
# END PrintQueryAgentResponseAskQuestions

# START FollowUpAskQuestions
new_response = agent.run(
    "What about some nice shoes, same budget as before?", context=response
)

print_query_agent_response(new_response)
# END FollowUpAskQuestions

# START Aggregation
response = agent.run("What is the the name of the brand that lists the most shoes?")

print_query_agent_response(response)
# END Aggregation

# START SearchOverMultipleCollections
response = agent.run(
    "Does the brand 'Loom & Aura' have a parent brand or child brands and what countries do they operate from? "
    "Also, what's the average price of a shoe from 'Loom & Aura'?"
)

print_query_agent_response(response)
# END SearchOverMultipleCollections

# START MoreQuestions
response = multi_lingual_agent.run('"Eko & Stitch"は英国に支店または関連会社がありますか？')

print(response.final_answer)
# END MoreQuestions

client.close()  # Free up resources
