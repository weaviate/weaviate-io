# How-to: Configure -> Schema - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]
    }
)

# Clean slate
if client.collections.exists("Article"):
    client.collections.delete("Article")


# START CreateCollection
client.collections.create("Article")
# END CreateCollection

# Test
assert (client.collections.exists("Article"))

# Delete the collection to recreate it
client.collections.delete("Article")


# START PropertyDefinition
# highlight-start
import weaviate.classes as wvc
# highlight-end

client.collections.create(
    "Article",
    # highlight-start
    properties=[
        wvc.Property(name="title", data_type=wvc.DataType.TEXT),
        wvc.Property(name="body", data_type=wvc.DataType.TEXT),
    ]
    # highlight-end
)
# END PropertyDefinition

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert (client.collections.exists("Article"))
assert len(config.properties) == 2


# Delete the collection to recreate it
client.collections.delete("Article")


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


# START IndexReplicationSettings
import weaviate.classes as wvc

client.collections.create(
    "Article",
    # highlight-start
    vector_index_config=wvc.Configure.vector_index(
        distance_metric=wvc.VectorDistance.COSINE
    ),
    # highlight-end

    # highlight-start
    replication_config=wvc.Configure.replication(
        factor=3
    )
    # highlight-end
)
# END IndexReplicationSettings

# Test
collection = client.collections.get("Article")
config = collection.config.get()
assert config.vector_index_config.distance_metric.value == "cosine"

# Delete the collection to recreate it
client.collections.delete("Article")


# START Multi-tenancy
client.collections.create(
    "Article",
    # highlight-start
    multi_tenancy_config=wvc.Configure.multi_tenancy(True)
    # highlight-end
)
# END Multi-tenancy


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


# TODOv4 we need to update this part of the example
# It seemed to be broken when I worked on this example
# stopwords_preset="en",

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

# DON'T delete the collection yet

# START SchemaGet
collection = client.collections.get("Article")
# highlight-start
config = collection.config.get()
# highlight-end

# print some of the config properties
print(config.vectorizer)
print(config.inverted_index_config)
print(config.inverted_index_config.stopwords.removals)
print(config.multi_tenancy_config)
print(config.vector_index_config)
print(config.vector_index_config.distance_metric)
# END SchemaGet

# Delete the collection to recreate it
client.collections.delete("Article")