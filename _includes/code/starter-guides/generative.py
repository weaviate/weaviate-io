# Instantiation
import weaviate
import os

client = weaviate.Client(
    url="https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.AuthApiKey(api_key="learn-weaviate"),
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]  # <-- Replace with your API key
    }
)
# END Instantiation

assert client.is_ready()

# DataRetrieval
collection_name = "GitBookChunk"

response = (
    client.query
    .get(class_name=collection_name, properties=["chunk", "chapter_title", "chunk_index"])
    .with_near_text({"concepts": ["history of git"]})
    .with_limit(3)
    .do()
)
# END DataRetrieval

assert len(response["data"]["Get"][collection_name]) == 3

# TransformResultSets
collection_name = "GitBookChunk"

response = (
    client.query
    .get(class_name=collection_name, properties=["chunk", "chapter_title", "chunk_index"])
    .with_near_text({"concepts": ["history of git"]})
    .with_limit(3)
    # highlight-start
    .with_generate(grouped_task="Summarize the key information here in bullet points")
    # highlight-end
    .do()
)

print(response["data"]["Get"][collection_name][0]["_additional"]["generate"]["groupedResult"])
# END TransformResultSets

assert len(response["data"]["Get"][collection_name][0]["_additional"]["generate"]["groupedResult"]) > 10

# TransformIndividualObjects
collection_name = "WineReview"

response = (
    client.query
    .get(class_name=collection_name, properties=["review_body", "title", "country", "points"])
    .with_near_text({"concepts": ["fruity white wine"]})
    .with_limit(5)
    .with_generate(single_prompt="""
        Translate this review into French, using emojis:
        ===== Country of origin: {country}, Title: {title}, Review body: {review_body}
    """)
    .do()
)
# END TransformIndividualObjects

assert len(response["data"]["Get"][collection_name]) == 5
assert len(response["data"]["Get"][collection_name][0]["_additional"]["generate"]["singleResult"]) > 10

# ListModules
response = client.get_meta()
print(response)
# END ListModules


# Re-instantiate for writing data to
client = weaviate.Client(
    url="http://localhost:8080",
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]  # <-- Replace with your API key
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
collection_name = "GitBookChunk"

chunk_class = {
    "class": collection_name,
    "properties": [
        {
            "name": "chunk",
            "dataType": ["text"],
        },
        {
            "name": "chapter_title",
            "dataType": ["text"],
        },
        {
            "name": "chunk_index",
            "dataType": ["int"],
        }
    ],
    # highlight-start
    "vectorizer": "text2vec-openai",  # Use `text2vec-openai` as the vectorizer
    # highlight-end
    # highlight-start
    "moduleConfig": {
        "generative-openai": {}  # Use `generative-openai` with default parameters
    }
    # highlight-end
}

if client.schema.exists(collection_name):  # In case we've created this collection before
    client.schema.delete_class(collection_name)  # THIS WILL DELETE ALL DATA IN THE CLASS

client.schema.create_class(chunk_class)
# END CreateClass

assert client.schema.exists(collection_name)


# ImportData
client.batch.configure(batch_size=100)
with client.batch as batch:
    for i, chunk in enumerate(chunked_text):
        data_object = {
            "chapter_title": "What is Git",
            "chunk": chunk,
            "chunk_index": i
        }
        batch.add_data_object(data_object=data_object, class_name=collection_name)
# END ImportData


# CountObjects
response = client.query.aggregate("GitBookChunk").with_meta_count().do()
print(response)
# END CountObjects

assert response["data"]["Aggregate"]["GitBookChunk"][0]["meta"]["count"] > 0


# SinglePrompt
response = (
    client.query
    .get(collection_name, ["chunk", "chunk_index"])
    .with_generate(
        single_prompt="Write the following as a haiku: ===== {chunk} "
    )
    .with_limit(2)
    .do()
)

for r in response["data"]["Get"][collection_name]:
    print(f"\n===== Object index: [{r['chunk_index']}] =====")
    print(r["_additional"]["generate"]["singleResult"])
# END SinglePrompt

assert len(response["data"]["Get"][collection_name]) == 2
assert len(response["data"]["Get"][collection_name][0]["_additional"]["generate"]["singleResult"]) > 10


# GroupedTask
response = (
    client.query
    .get(collection_name, ["chunk", "chunk_index"])
    .with_generate(
        grouped_task="Write a trivia tweet based on this text. Use emojis and make it succinct and cute."
    )
    .with_limit(2)
    .do()
)

print(response["data"]["Get"][collection_name][0]["_additional"]["generate"]["groupedResult"])
# END GroupedTask

assert len(response["data"]["Get"][collection_name][0]["_additional"]["generate"]["groupedResult"]) > 10


# NearTextGroupedTask
response = (
    client.query
    .get(collection_name, ["chunk", "chunk_index"])
    # highlight-start
    .with_near_text({"concepts": "states of git"})
    # highlight-end
    .with_generate(
        grouped_task="Write a trivia tweet based on this text. Use emojis and make it succinct and cute."
    )
    .with_limit(2)
    .do()
)

print(response["data"]["Get"][collection_name][0]["_additional"]["generate"]["groupedResult"])
# END NearTextGroupedTask

assert len(response["data"]["Get"][collection_name][0]["_additional"]["generate"]["groupedResult"]) > 10


# SecondNearTextGroupedTask
response = (
    client.query
    .get(collection_name, ["chunk", "chunk_index"])
    # highlight-start
    .with_near_text({"concepts": "how git saves data"})
    # highlight-end
    .with_generate(
        grouped_task="Write a trivia tweet based on this text. Use emojis and make it succinct and cute."
    )
    .with_limit(2)
    .do()
)

print(response["data"]["Get"][collection_name][0]["_additional"]["generate"]["groupedResult"])
# END SecondNearTextGroupedTask

assert len(response["data"]["Get"][collection_name][0]["_additional"]["generate"]["groupedResult"]) > 10
