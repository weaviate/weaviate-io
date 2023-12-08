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

# ===============================================
# ===== CREATE A COLLECTION WITH PROPERTIES =====
# ===============================================

# Clean slate
if client.collections.exists(collection_name):
    client.collections.delete(collection_name)

# START CreateCollectionWithProperties
import weaviate.classes as wvc

client.collections.create(
    "Article",
    properties=[
        wvc.Property(name="title", data_type=wvc.DataType.TEXT),
        wvc.Property(name="body", data_type=wvc.DataType.TEXT),
    ]
)
# END CreateCollectionWithProperties

# ===============================================
# ===== CREATE A COLLECTION WITH VECTORIZER =====
# ===============================================

# START Vectorizer
import weaviate.classes as wvc

client.collections.create(
    "Article",
    # highlight-start
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_openai(),
    # highlight-end
    properties=[ # properties configuration is optional
        wvc.Property(name="title", data_type=wvc.DataType.TEXT),
        wvc.Property(name="body", data_type=wvc.DataType.TEXT),
    ]
)
# END Vectorizer

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.vectorizer.value == "text2vec-openai"

# Delete the collection to recreate it
client.collections.delete("Article")

# ===========================
# ===== MODULE SETTINGS =====
# ===========================

# START ModuleSettings
import weaviate.classes as wvc

client.collections.create(
    "Article",
    # highlight-start
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_cohere(
        model="embed-multilingual-v2.0",
        vectorize_class_name=True
    ),
    # highlight-end
)
# END ModuleSettings

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.vectorizer.value == "text2vec-cohere"
# TODOv4 make sure we can verify the model name
# assert config.vectorizer.model == "embed-multilingual-v2.0"

# Delete the collection to recreate it
client.collections.delete("Article")

# ====================================
# ===== MODULE SETTINGS PROPERTY =====
# ====================================

# START PropModuleSettings
import weaviate.classes as wvc

client.collections.create(
    "Article",
    vectorizer_config=wvc.Configure.Vectorizer.text2vec_huggingface(),

    properties=[
        wvc.Property(
            name="title",
            data_type=wvc.DataType.TEXT,
            # highlight-start
            vectorize_property_name=True,  # Use "title" as part of the value to vectorize
            tokenization=wvc.Tokenization.LOWERCASE  # Use "lowecase" tokenization
            # highlight-end
        ),
        wvc.Property(
            name="body",
            data_type=wvc.DataType.TEXT,
            # highlight-start
            skip_vectorization=True,  # Don't vectorize this property
            tokenization=wvc.Tokenization.WHITESPACE  # Use "whitespace" tokenization
            # highlight-end
        ),
    ]
)
# END PropModuleSettings

# Test
collection = client.collections.get("Article")
config = collection.config.get()

assert config.vectorizer.value == "text2vec-huggingface"

# assert result["properties"][0]["moduleConfig"]["text2vec-huggingface"]["vectorizePropertyName"] is False

# Delete the collection to recreate it
client.collections.delete("Article")

# ===========================
# ===== DISTANCE METRIC =====
# ===========================

# START DistanceMetric
import weaviate.classes as wvc

client.collections.create(
    "Article",
    # highlight-start
    vector_index_config=wvc.Configure.vector_index(
        distance_metric=wvc.VectorDistance.COSINE
    ),
    # highlight-end
)
# END DistanceMetric

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.vector_index_config.distance_metric.value == "cosine"

# Delete the collection to recreate it
client.collections.delete("Article")

# =======================
# ===== REPLICATION =====
# =======================

# START ReplicationSettings
import weaviate.classes as wvc

client.collections.create(
    "Article",
    # highlight-start
    replication_config=wvc.Configure.replication(
        factor=3
    )
    # highlight-end
)
# END ReplicationSettings

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.vector_index_config.distance_metric.value == "cosine"

# Delete the collection to recreate it
client.collections.delete("Article")

# ====================
# ===== SHARDING =====
# ====================

# START ShardingSettings
import weaviate.classes as wvc

client.collections.create(
    "Article",
    # highlight-start
    sharding_config=wvc.Configure.sharding(
        virtual_per_physical=128,
        desired_count=1,
        actual_count=1,
        desired_virtual_count=128,
        actual_virtual_count=128,
    )
    # highlight-end
)
# END ShardingSettings

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.sharding_config.virtual_per_physical == 128
assert config.sharding_config.desired_count == 1
assert config.sharding_config.actual_count == 1
assert config.sharding_config.desired_virtual_count == 128
assert config.sharding_config.actual_virtual_count == 128

# Delete the collection to recreate it
client.collections.delete("Article")

# =========================
# ===== MULTI-TENANCY =====
# =========================

# START Multi-tenancy
client.collections.create(
    "Article",
    # highlight-start
    multi_tenancy_config=wvc.Configure.multi_tenancy(True)
    # highlight-end
)
# END Multi-tenancy

# ==========================
# ===== ADD A PROPERTY =====
# ==========================

# START AddProp
import weaviate.classes as wvc

# Get the Article collection object
articles = client.collections.get("Article")

# Add a new property
articles.config.add_property(
    # highlight-start
    additional_property=wvc.Property(
        name="body",
        data_type=wvc.DataType.TEXT
    )
    # highlight-end
)
# END AddProp

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert len(config.properties) == 1
assert config.properties[0].name == "body"

# ==============================
# ===== MODIFY A PARAMETER =====
# ==============================

# START ModifyParam
import weaviate.classes as wvc

# Get the Article collection object
articles = client.collections.get("Article")

# Update the collection configuration
# highlight-start
articles.config.update(
    # Note, use Reconfigure here (not Configure)
    inverted_index_config=wvc.Reconfigure.inverted_index(
        stopwords_removals=["a", "the"]
    )
)
# highlight-end
# END ModifyParam

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.inverted_index_config.stopwords.removals == ["a", "the"]

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
