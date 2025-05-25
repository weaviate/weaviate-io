# START InstantiateQueryAgent
import os
import weaviate
from weaviate.classes.init import Auth
from weaviate.agents.query import QueryAgent
# END InstantiateQueryAgent

# START InstantiateQueryAgent

headers = {
# END InstantiateQueryAgent
    "X-Cohere-API-Key": os.environ.get("COHERE_API_KEY"),
    "X-OpenAI-API-Key": os.environ.get("OPENAI_API_KEY"),
# START InstantiateQueryAgent
    # Provide your required API key(s), e.g. Cohere, OpenAI, etc. for the configured vectorizer(s)
    "X-INFERENCE-PROVIDER-API-KEY": os.environ.get("YOUR_INFERENCE_PROVIDER_KEY", ""),
}

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ.get("WEAVIATE_URL"),
    auth_credentials=Auth.api_key(os.environ.get("WEAVIATE_API_KEY")),
    headers=headers,
)

# Instantiate a new agent object
qa = QueryAgent(
    client=client, collections=["Ecommerce", "Financial_contracts", "Weather"]
)
# END InstantiateQueryAgent

# START QueryAgentCollectionConfiguration
from weaviate_agents.query import QueryAgent
from weaviate_agents.classes import QueryAgentCollectionConfig

qa = QueryAgent(
    client=client,
    collections=[
        QueryAgentCollectionConfig(
            name="Ecommerce",  # The name of the collection to query
            # target_vector=["first_vector", "second_vector"], # Optional target vector name(s) for collections with named vectors
            # view_properties=["property1", "property2"], # Optional list of property names the agent can view
            # tenant="tenant1", # Optional tenant name for collections with multi-tenancy enabled
        ),
        QueryAgentCollectionConfig(name="Financial_contracts"),
        QueryAgentCollectionConfig(name="Weather"),
    ],
)
# END QueryAgentCollectionConfiguration

# START QueryAgentRunBasicCollectionSelection
response = qa.run(
    "What wines under $20 here pair well with fish?",
    collections=["WineReview"],
)

response.display()
# END QueryAgentRunBasicCollectionSelection

# START QueryAgentRunCollectionConfig
from weaviate_agents.classes import QueryAgentCollectionConfig

response = qa.run(
    "What French dessert wines between $20-$60 are well-reviewed?",
    collections=[
        # Use QueryAgentCollectionConfig class to provide further collection configuration
        QueryAgentCollectionConfig(
            name="WineReviewNV",  # The name of the collection to query
            target_vector=["review_body"], # Optional target vector name(s) for collections with named vectors
            view_properties=["review_body", "title", "country", "points", "price"], # Optional list of property names the agent can view
        ),
        QueryAgentCollectionConfig(
            name="WineReviewMT",  # The name of the collection to query
            tenant="tenantA", # Optional tenant name for collections with multi-tenancy enabled
        ),
    ],
)

response.display()
# END QueryAgentRunCollectionConfig

# START BasicQuery
# Perform a query
from weaviate.agents.utils import print_query_agent_response

response = qa.run(
    "I like vintage clothes and and nice shoes. Recommend some of each below $60."
)

# Print the response
print_query_agent_response(response)    # Use the helper function
response.display()                      # Use the class method
# END BasicQuery

# START FollowUpQuery
# Perform a follow-up query
following_response = qa.run(
    "I like the vintage clothes options, can you do the same again but above $200?",
    context=response,
)

# Print the response
response.display()
# END FollowUpQuery


# START InspectResponseExample
print("\n=== Query Agent Response ===")
print(f"Original Query: {response.original_query}\n")

print("🔍 Final Answer Found:")
print(f"{response.final_answer}\n")

print("🔍 Searches Executed:")
for collection_searches in response.searches:
    for result in collection_searches:
        print(f"- {result}\n")

if response.has_aggregation_answer:
    print("📊 Aggregation Results:")
    for collection_aggs in response.aggregations:
        for agg in collection_aggs:
            print(f"- {agg}\n")

if response.missing_information:
    if response.is_partial_answer:
        print("⚠️ Answer is Partial - Missing Information:")
    else:
        print("⚠️ Missing Information:")
    for missing in response.missing_information:
        print(f"- {missing}")
# END InspectResponseExample

assert response.final_answer != "" and response.final_answer is not None

client.close()
