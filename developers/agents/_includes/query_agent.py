# START-ANY
# [!NOTE!] This Weaviate Agent is not available just yet.
# These snippets are placeholders only, and may change when it is released.

# END-ANY

# START InstantiateQueryAgent
import os
import weaviate
from weaviate.classes.init import Auth
from weaviate.agents.query import QueryAgent

# END InstantiateQueryAgent
# START InspectResponseShort  # START InspectResponseFull
from weaviate.agents.query import QueryAgentResponse

# END InspectResponseShort  # END InspectResponseFull

# START InstantiateQueryAgent

headers = {
# END InstantiateQueryAgent
    "X-Cohere-API-Key": os.environ.get("COHERE_API_KEY"),
# START InstantiateQueryAgent
    # Provide your required API key(s), e.g. Cohere, OpenAI, etc. for the configured vectorizer(s)
    "X-INFERENCE-PROVIDER-API-KEY": os.environ.get("YOUR_INFERENCE_PROVIDER_KEY", ""),
}

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ.get("WCD_URL"),
    auth_credentials=Auth.api_key(os.environ.get("WCD_API_KEY")),
    headers=headers,
)

# Instantiate a new agent object, and specify the collections to query
qa = QueryAgent(
    client=client, collections=["ecommerce", "financial_contracts", "weather"]
)
# END InstantiateQueryAgent

# START BasicQuery
# Perform a query
response = qa.run(
    "I like vintage clothes and and nice shoes. Recommend some of each below $60."
)

# Print the response
print(f"{response.final_answer}\n")
# END BasicQuery

# START FollowUpQuery
# Perform a follow-up query
following_response = qa.run(
    "I like the vintage clothes options, can you do the same again but above $200?",
    context=response,
)

# Print the response
print(f"{following_response.final_answer}\n")
# END FollowUpQuery


# START InspectResponseShort
print("\n=== Query Agent Response ===")
print(f"Original Query: {response.original_query}\n")

print("🔍 Final Answer Found:")
print(f"{response.final_answer}\n")

print("🔍 Searches Executed:")
for collection_searches in response.searches:
    for result in collection_searches:
        print(f"- {result}\n")

print("📊 Aggregation Results:")
for collection_aggs in response.aggregations:
    for agg in collection_aggs:
        print(f"- {agg}\n")
# END InspectResponseShort

# START InspectResponseFull
print("\n=== Query Agent Response ===")
print(f"Original Query: {response.original_query}\n")

if response.has_search_answer:
    print("🔍 Search Answer Found:")
    print(f"{response.search_answer}\n")

    print("Searches Executed:")
    for collection_searches in response.searches:
        for result in collection_searches:
            print(f"- {result}\n")
else:
    print("🔍 No Searches Run \n")

if response.has_aggregation_answer:
    print("📊 Aggregation Answer Found:")
    print(f"{response.aggregation_answer}\n")

    print("Aggregations Run:")
    for collection_aggs in response.aggregations:
        for agg in collection_aggs:
                print(f"- {agg}\n")
else:
    print("📊 No Aggregations Run")

if response.missing_information:
    if response.is_partial_answer:
        print("⚠️ Answer is Partial - Missing Information:")
    else:
        print("⚠️ Missing Information:")
    for missing in response.missing_information:
        print(f"- {missing}")
    print("Searches Executed:")
    for collection_searches in response.searches:
        for result in collection_searches:
            print(f"- {result}\n")

    print("Aggregation Results:")
    for collection_aggs in response.aggregations:
        for agg in collection_aggs:
            print(f"- {agg}\n")
# END InspectResponseFull

client.close()
