# Instantiation
import weaviate
from weaviate.classes.init import Auth
import os

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=Auth.api_key(api_key=os.getenv("WCD_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")  # <-- Replace with your API key
    }
)
# END Instantiation

assert client.is_ready()

# DataRetrieval
collection_name = "GitBookChunk"

chunks = client.collections.get(collection_name)
response = chunks.query.near_text(query="history of git", limit=3)
# END DataRetrieval

assert len(response.objects) == 3

# TransformResultSets
collection_name = "GitBookChunk"

chunks = client.collections.get(collection_name)
response = chunks.generate.near_text(
    query="history of git",
    limit=3,
    # highlight-start
    grouped_task="Summarize the key information here in bullet points"
    # highlight-end
)

print(response.generated)
# END TransformResultSets

assert len(response.generated) > 10

# TransformIndividualObjects
collection_name = "WineReview"

reviews = client.collections.get(collection_name)
response = reviews.generate.near_text(
    query="fruity white wine",
    limit=3,
    # highlight-start
    single_prompt="""
        Translate this review into French, using emojis:
        ===== Country of origin: {country}, Title: {title}, Review body: {review_body}
    """
    # highlight-end
)
# END TransformIndividualObjects

assert len(response.objects) == 3
assert len(response.objects[0].generated) > 10

# ListModules
response = client.get_meta()
print(response)
# END ListModules


# Re-instantiate for writing data
# Close previous connection
client.close()

# Create new connection
client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")  # <-- Replace with your API key
    }
)

assert client.is_ready()


# ChunkText
from typing import List


def download_and_chunk(src_url: str, chunk_size: int, overlap_size: int) -> List[str]:
    import requests
    import re

    response = requests.get(src_url)  # Retrieve source text
    source_text = re.sub(r"\s+", " ", response.text)  # Remove multiple whitespaces
    text_words = re.split(r"\s", source_text)  # Split text by single whitespace

    chunks = []
    for i in range(0, len(text_words), chunk_size):  # Iterate through & chunk data
        chunk = " ".join(text_words[max(i - overlap_size, 0): i + chunk_size])  # Join a set of words into a string
        chunks.append(chunk)
    return chunks


pro_git_chapter_url = "https://raw.githubusercontent.com/progit/progit2/main/book/01-introduction/sections/what-is-git.asc"
chunked_text = download_and_chunk(pro_git_chapter_url, 150, 25)
# END ChunkText

assert type(chunked_text) == list
assert type(chunked_text[0]) == str


# CreateClass
import weaviate.classes as wvc


collection_name = "GitBookChunk"

if client.collections.exists(collection_name):  # In case we've created this collection before
    client.collections.delete(collection_name)  # THIS WILL DELETE ALL DATA IN THE COLLECTION

chunks = client.collections.create(
    name=collection_name,
    properties=[
        wvc.config.Property(
            name="chunk",
            data_type=wvc.config.DataType.TEXT
        ),
        wvc.config.Property(
            name="chapter_title",
            data_type=wvc.config.DataType.TEXT
        ),
        wvc.config.Property(
            name="chunk_index",
            data_type=wvc.config.DataType.INT
        ),
    ],
    # highlight-start
    vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(),  # Use `text2vec-openai` as the vectorizer
    generative_config=wvc.config.Configure.Generative.openai(),  # Use `generative-openai` with default parameters
    # highlight-end
)
# END CreateClass

assert client.collections.exists(collection_name)


# ImportData
chunks_list = list()
for i, chunk in enumerate(chunked_text):
    data_properties = {
        "chapter_title": "What is Git",
        "chunk": chunk,
        "chunk_index": i
    }
    data_object = wvc.data.DataObject(properties=data_properties)
    chunks_list.append(data_object)
chunks.data.insert_many(chunks_list)
# END ImportData


# CountObjects
response = chunks.aggregate.over_all(total_count=True)
print(response.total_count)
# END CountObjects

assert response.total_count > 0


# SinglePrompt
response = chunks.generate.fetch_objects(
    limit=2,
    single_prompt="Write the following as a haiku: ===== {chunk} "
)

for o in response.objects:
    print(f"\n===== Object index: [{o.properties['chunk_index']}] =====")
    print(o.generated)
# END SinglePrompt

assert len(response.objects) == 2
assert len(response.objects[0].generated) > 10


# GroupedTask
response = chunks.generate.fetch_objects(
    limit=2,
    grouped_task="Write a trivia tweet based on this text. Use emojis and make it succinct and cute."
)

print(response.generated)
# END GroupedTask

assert len(response.generated) > 10


# NearTextGroupedTask
response = chunks.generate.near_text(
    query="states of git",
    limit=2,
    grouped_task="Write a trivia tweet based on this text. Use emojis and make it succinct and cute."
)

print(response.generated)
# END NearTextGroupedTask

assert len(response.generated) > 10


# SecondNearTextGroupedTask
response = chunks.generate.near_text(
    query="how git saves data",
    limit=2,
    grouped_task="Write a trivia tweet based on this text. Use emojis and make it succinct and cute."
)

print(response.generated)
# END SecondNearTextGroupedTask

assert len(response.generated) > 10
client.close()
