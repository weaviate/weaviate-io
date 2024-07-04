# How-to: Manage-Data -> Classes
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

# ================================
# ===== CREATE A COLLECTION =====
# ================================

# Clean slate
client.collections.delete("Article")

# START BasicCreateCollection
client.collections.create("Article")
# END BasicCreateCollection

# Test
assert client.collections.exists("Article")

# ===============================================
# ===== CREATE A COLLECTION WITH PROPERTIES =====
# ===============================================

# Clean slate
client.collections.delete("Article")

# START CreateCollectionWithProperties
from weaviate.classes.config import Property, DataType

# Note that you can use `client.collections.create_from_dict()` to create a collection from a v3-client-style JSON object
client.collections.create(
    "Article",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
    ]
)
# END CreateCollectionWithProperties

# Test
articles = client.collections.get("Article")
assert client.collections.exists("Article")
assert len(articles.config.get().properties) == 2

# ===============================================
# ===== CREATE A COLLECTION WITH VECTORIZER =====
# ===============================================

# Clean slate
client.collections.delete("Article")

# START Vectorizer
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    "Article",
    # highlight-start
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    # highlight-end
    properties=[  # properties configuration is optional
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
    ]
)
# END Vectorizer

# Test
collection = client.collections.get("Article")
config = collection.config.get()

assert config.vectorizer.value == "text2vec-openai"


# ===============================================
# ===== CREATE A COLLECTION WITH NAMED VECTORS =====
# ===============================================

# Clean slate
client.collections.delete("ArticleNV")

# START BasicNamedVectors
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    "ArticleNV",
    # highlight-start
    vectorizer_config=[
        # Set a named vector
        Configure.NamedVectors.text2vec_cohere(  # Use the "text2vec-cohere" vectorizer
            name="title", source_properties=["title"]       # Set the source property(ies)
        ),
        # Set another named vector
        Configure.NamedVectors.text2vec_openai(  # Use the "text2vec-openai" vectorizer
            name="body", source_properties=["body"]         # Set the source property(ies)
        ),
        # Set another named vector
        Configure.NamedVectors.text2vec_openai(  # Use the "text2vec-openai" vectorizer
            name="title_country", source_properties=["title", "country"] # Set the source property(ies)
        )
    ],
    # highlight-end
    properties=[  # Define properties
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
        Property(name="country", data_type=DataType.TEXT),
    ],
)
# END BasicNamedVectors

# Test
collection = client.collections.get("ArticleNV")
config = collection.config.get()
# TODO: change test to also include "title_country" with ["title", "country"] properties

assertion_dicts = {
    "title": ["title"],
    "body": ["body"],
    "title_country": ["title", "country"]
}
for k, v in config.vector_config.items():
    assert v.vectorizer.source_properties == assertion_dicts[k]  # Test that the source properties are correctly set

# ===========================
# ===== SET VECTOR INDEX TYPE =====
# ===========================

# Clean slate
client.collections.delete("Article")

# START SetVectorIndexType
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    "Article",
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    # highlight-start
    vector_index_config=Configure.VectorIndex.hnsw(),  # Use the HNSW index
    # vector_index_config=Configure.VectorIndex.flat(),  # Use the FLAT index
    # vector_index_config=Configure.VectorIndex.dynamic(),  # Use the DYNAMIC index
    # highlight-end
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="body", data_type=DataType.TEXT),
    ]
)
# END SetVectorIndexType

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.vectorizer.value == "text2vec-openai"
assert config.vector_index_type.name == "HNSW"


# ===========================
# ===== SET VECTOR INDEX PARAMETERS =====
# ===========================

# Clean slate
client.collections.delete("Article")

# START SetVectorIndexParams
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    "Article",
    # Additional configuration not shown
    # highlight-start
    vector_index_config=Configure.VectorIndex.flat(
        quantizer=Configure.VectorIndex.Quantizer.bq(
            rescore_limit=200,
            cache=True
        ),
        vector_cache_max_objects=100000
    ),
    # highlight-end
)
# END SetVectorIndexParams

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.vector_index_type.name == "FLAT"


# ===================================================================
# ===== CREATE A COLLECTION WITH CUSTOM INVERTED INDEX SETTINGS =====
# ===================================================================

client.collections.delete("Article")

# START SetInvertedIndexParams
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    "Article",
    # Additional settings not shown
    properties=[ # properties configuration is optional
        Property(
            name="title",
            data_type=DataType.TEXT,
            # highlight-start
            index_filterable=True,
            index_searchable=True,
            # highlight-end
        ),
    ],
    # highlight-start
    inverted_index_config=Configure.inverted_index(  # Optional
        bm25_b=0.7,
        bm25_k1=1.25,
        index_null_state=True,
        index_property_length=True,
        index_timestamps=True
    )
    # highlight-end
)
# END SetInvertedIndexParams

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.inverted_index_config.bm25.b == 0.7
assert config.inverted_index_config.bm25.k1 == 1.25

# Delete the collection to recreate it
client.collections.delete("Article")


# ===============================================
# ===== CREATE A COLLECTION WITH A GENERATIVE MODULE =====
# ===============================================

client.collections.delete("Article")

# START SetGenerative
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    "Article",
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    # highlight-start
    generative_config=Configure.Generative.openai(),
    # highlight-end
)
# END SetGenerative

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.generative_config.generative == "generative-openai"

# Delete the collection to recreate it
client.collections.delete("Article")

# =======================================================================
# ===== CREATE A COLLECTION WITH A GENERATIVE MODULE AND MODEL NAME =====
# =======================================================================

client.collections.delete("Article")

# START SetGenModel
from weaviate.classes.config import Configure, Property, DataType

client.collections.create(
    "Article",
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    # highlight-start
    generative_config=Configure.Generative.openai(
        model="gpt-4"
    ),
    # highlight-end
)
# END SetGenModel

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.generative_config.generative == "generative-openai"

# Delete the collection to recreate it
client.collections.delete("Article")


# ===========================
# ===== MODULE SETTINGS =====
# ===========================

# Clean slate
client.collections.delete("Article")

# START ModuleSettings
from weaviate.classes.config import Configure

client.collections.create(
    "Article",
    # highlight-start
    vectorizer_config=Configure.Vectorizer.text2vec_cohere(
        model="embed-multilingual-v2.0",
        vectorize_collection_name=True
    ),
    # highlight-end
)
# END ModuleSettings

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.vectorizer.value == "text2vec-cohere"
assert config.vectorizer_config.model["model"] == "embed-multilingual-v2.0"

# ====================================
# ===== MODULE SETTINGS PROPERTY =====
# ====================================

# Clean slate
client.collections.delete("Article")

# START PropModuleSettings
from weaviate.classes.config import Configure, Property, DataType, Tokenization

client.collections.create(
    "Article",
    vectorizer_config=Configure.Vectorizer.text2vec_huggingface(),

    properties=[
        Property(
            name="title",
            data_type=DataType.TEXT,
            # highlight-start
            vectorize_property_name=True,  # Use "title" as part of the value to vectorize
            tokenization=Tokenization.LOWERCASE  # Use "lowecase" tokenization
            # highlight-end
        ),
        Property(
            name="body",
            data_type=DataType.TEXT,
            # highlight-start
            skip_vectorization=True,  # Don't vectorize this property
            tokenization=Tokenization.WHITESPACE  # Use "whitespace" tokenization
            # highlight-end
        ),
    ]
)
# END PropModuleSettings

# Test
collection = client.collections.get("Article")
config = collection.config.get()

assert config.vectorizer.value == "text2vec-huggingface"
for p in config.properties:
    if p.name == "title":
        assert p.tokenization.name == "LOWERCASE"
    elif p.name == "body":
        assert p.tokenization.name == "WHITESPACE"


# ===========================
# ===== DISTANCE METRIC =====
# ===========================

# Clean slate
client.collections.delete("Article")

# START DistanceMetric
from weaviate.classes.config import Configure, VectorDistances

client.collections.create(
    "Article",
    # highlight-start
    vector_index_config=Configure.VectorIndex.hnsw(
        distance_metric=VectorDistances.COSINE
    ),
    # highlight-end
)
# END DistanceMetric

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.vector_index_config.distance_metric.value == "cosine"

client.close()

# =======================
# ===== REPLICATION =====
# =======================

# Connect to a setting with 3 replicas
client = weaviate.connect_to_local(
    port=8180  # Port for demo setup with 3 replicas
)

# Clean slate
client.collections.delete("Article")

# START ReplicationSettings
from weaviate.classes.config import Configure

client.collections.create(
    "Article",
    # highlight-start
    replication_config=Configure.replication(
        factor=3
    )
    # highlight-end
)
# END ReplicationSettings

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.replication_config.factor == 3

client.close()

# ====================
# ===== SHARDING =====
# ====================

client = weaviate.connect_to_local()

# Clean slate
client.collections.delete("Article")

# START ShardingSettings
from weaviate.classes.config import Configure

client.collections.create(
    "Article",
    # highlight-start
    sharding_config=Configure.sharding(
        virtual_per_physical=128,
        desired_count=1,
        desired_virtual_count=128,
    )
    # highlight-end
)
# END ShardingSettings

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.sharding_config.virtual_per_physical == 128
assert config.sharding_config.desired_count == 1
assert config.sharding_config.desired_virtual_count == 128

# =========================
# ===== MULTI-TENANCY =====
# =========================

# Clean slate
client.collections.delete("Article")

# START Multi-tenancy
from weaviate.classes.config import Configure

client.collections.create(
    "Article",
    # highlight-start
    multi_tenancy_config=Configure.multi_tenancy(True)
    # highlight-end
)
# END Multi-tenancy

collection = client.collections.get("Article")
config = collection.config.get()
assert config.multi_tenancy_config.enabled == True

# ==========================
# ===== ADD A PROPERTY =====
# ==========================

# START AddProp
from weaviate.classes.config import Property, DataType

# Get the Article collection object
articles = client.collections.get("Article")

# Add a new property
articles.config.add_property(
    # highlight-start
    prop=Property(
        name="body",
        data_type=DataType.TEXT
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
from weaviate.classes.config import Reconfigure

# Get the Article collection object
articles = client.collections.get("Article")

# Update the collection configuration
# highlight-start
articles.config.update(
    # Note, use Reconfigure here (not Configure)
    inverted_index_config=Reconfigure.inverted_index(
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
response = client.collections.list_all(simple=False)

print(response)
# END ReadAllCollections

assert type(response) == dict
assert "Article" in response


# ================================
# ===== UPDATE A COLLECTION =====
# ================================

# Clean slate
client.collections.delete("Article")

# Define and create a collection
from weaviate.classes.config import Configure

client.collections.create(
    name="Article",
    inverted_index_config=Configure.inverted_index(
        bm25_b=0.7,
        bm25_k1=1.2
    )
)
old_config = articles.config.get()


# Create an object to check that it remains mutable
for _ in range(5):
    articles.data.insert({
        "title": "A grand day out."
    })


# START UpdateCollection
from weaviate.classes.config import Reconfigure

articles = client.collections.get("Article")

# Update the collection definition
articles.config.update(
    inverted_index_config=Reconfigure.inverted_index(
        bm25_k1=1.5
    )
)
# END UpdateCollection

new_config = articles.config.get()

assert old_config.inverted_index_config.bm25.k1 == 1.2
assert new_config.inverted_index_config.bm25.k1 == 1.5


# ================================
# ===== DELETE A COLLECTION =====
# ================================

# START DeleteCollection
# delete collection "Article" - THIS WILL DELETE THE COLLECTION AND ALL ITS DATA
client.collections.delete("Article")  # Replace with your collection name
# END DeleteCollection

# ========================================
# AddProperty
# ========================================

client.collections.create(
    name="Article"
)

# START AddProperty
from weaviate.classes.config import Property, DataType

articles = client.collections.get("Article")

articles.config.add_property(
    Property(
        name="onHomepage",
        data_type=DataType.BOOL
    )
)
# END AddProperty

# ========================================
# InspectCollectionShards
# ========================================

# START InspectCollectionShards
articles = client.collections.get("Article")

# highlight-start
article_shards = articles.config.get_shards()
# highlight-end
print(article_shards)
# END InspectCollectionShards


# ========================================
# UpdateCollectionShards
# ========================================

shards = articles.config.get_shards()
shard_names = [s.name for s in shards]

# START UpdateCollectionShards
articles = client.collections.get("Article")

# highlight-start
article_shards = articles.config.update_shards(
    status="READONLY",
    shard_names=shard_names  # The names (List[str]) of the shard to update (or a shard name)
)
# highlight-end

print(article_shards)
# END UpdateCollectionShards


client.close()
