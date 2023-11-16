# How-to: Manage-Data -> Classes
import os
import json

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
)

collection_name = "Article"

# ================================
# ===== CREATE A COLLECTION =====
# ================================

# Clean slate
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START CreateCollection
client.collections.create("Article")
# END CreateCollection

# Test
assert client.collections.exists(collection_name)

# ================================
# ===== READ A COLLECTION =====
# ================================

# START ReadOneCollection
articles = client.collections.get("Article")
articles_config = articles.config.get()

print(articles_config)
# END ReadOneCollection

assert articles_config.name == "Article"


# ================================
# ===== READ ALL COLLECTIONS =====
# ================================

# START ReadAllCollections
response = client.collections.list_all()

print(response)
# END ReadAllCollections

assert type(response) == dict
assert collection_name in response


# ================================
# ===== UPDATE A COLLECTION =====
# ================================

# Clean slate
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# Define and create a collection
client.collections.create(
    name="Article",
    inverted_index_config=wvc.Configure.inverted_index(
        bm25_k1=1.2
    )
)

# START UpdateCollection
import weaviate.classes as wvc

articles = client.collections.get("Article")
# END UpdateCollection


# Create an object to make sure it remains mutable
for _ in range(5):
    articles.data.insert({
        "title": "A grand day out."
    })
old_config = articles.config.get()
# START UpdateCollection

# Update the collection definition
articles.config.update(
    inverted_index_config=wvc.Reconfigure.inverted_index(
        bm25_k1=1.5
    )
)
# END UpdateCollection

new_config = articles.config.get()

assert old_config.inverted_index_config.bm25.k1 == 1.2
assert new_config.inverted_index_config.bm25.k1 == 1.5
