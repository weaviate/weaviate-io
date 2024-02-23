# START-ANY
import os
import weaviate
import os
import requests
import base64

# END-ANY

headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
client = weaviate.connect_to_local(headers=headers)

# START-ANY
# Instantiate your client (not shown). e.g.:
# headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key
# client = weaviate.connect_to_local(headers=headers)

def url_to_base64(url):
    image_response = requests.get(url)
    content = image_response.content
    return base64.b64encode(content).decode("utf-8")

# END-ANY

# SinglePromptGeneration
# Get the collection
movies = client.collections.get("MovieMM")

# Perform query
src_img_path = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/440px-International_Space_Station_after_undocking_of_STS-132.jpg"
query_b64 = url_to_base64(src_img_path)

response = movies.generate.near_image(
    near_image=query_b64,
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
movies = client.collections.get("MovieMM")

# Perform query
src_img_path = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/440px-International_Space_Station_after_undocking_of_STS-132.jpg"
query_b64 = url_to_base64(src_img_path)

response = movies.generate.near_image(
    near_image=query_b64,
    limit=5,
    # highlight-start
    grouped_task="What do these movies have in common?",
    grouped_properties=["title", "overview"]  # Optional parameter; for reducing prompt length
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
