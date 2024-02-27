# START-ANY
import os
import weaviate
import os

# END-ANY

headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("WCS_DEMO_ADMIN_KEY")
    ),  # Replace with your WCS key
    headers=headers,
)

# START-ANY
# Instantiate your client (not shown). e.g.:
# headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key
# client = weaviate.connect_to_wcs(..., headers=headers) or
# client = weaviate.connect_to_local(..., headers=headers)

# END-ANY

# SinglePromptGeneration
# Get the collection
movies = client.collections.get("Movie")

# Perform query
response = movies.generate.near_text(
    query="dystopian future",
    limit=5,
    # highlight-start
    single_prompt="Translate this into French: {title}"
    # highlight-end
)

# Inspect the response
for o in response.objects:
    # highlight-start
    print(o.properties["title"])  # Print the title
    # highlight-end
    print(o.generated)  # Print the generated text (the title, in French)

client.close()
# END SinglePromptGeneration


print("\n\n")

client.connect()


# GroupedTaskGeneration
# Get the collection
movies = client.collections.get("Movie")

# Perform query
response = movies.generate.near_text(
    query="dystopian future",
    limit=5,
    # highlight-start
    grouped_task="What do these movies have in common?",
    # grouped_properties=["title", "overview"]  # Optional parameter; for reducing prompt length
    # highlight-end
)

# Inspect the response
for o in response.objects:
    print(o.properties["title"])  # Print the title
# highlight-start
print(response.generated)  # Print the generated text (the commonalities between them)
# highlight-end

client.close()
# END GroupedTaskGeneration
