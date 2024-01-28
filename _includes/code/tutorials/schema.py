# START-ANY
import weaviate
import weaviate.classes as wvc
import os

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]  # Replace with your inference API key
    }
)

# END-ANY

# START BasicSchema
questions = client.collections.create(
    name="Question",
    vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(),    # Set the vectorizer to "text2vec-openai" to use the OpenAI API for vector-related operations
    generative_config=wvc.config.Configure.Generative.cohere(),             # Set the generative module to "generative-cohere" to use the Cohere API for RAG
    properties=[
        wvc.config.Property(
            name="question",
            data_type=wvc.config.DataType.TEXT,
        ),
        wvc.config.Property(
            name="answer",
            data_type=wvc.config.DataType.TEXT,
        ),
    ]
)

print(questions.config.get(simple=False))
# END BasicSchema

client.collections.delete(name="Question")

# START SchemaWithPropertyOptions
questions = client.collections.create(
    name="Question",
    vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(),    # Set the vectorizer to "text2vec-openai" to use the OpenAI API for vector-related operations
    generative_config=wvc.config.Configure.Generative.cohere(),             # Set the generative module to "generative-cohere" to use the Cohere API for RAG
    properties=[
        wvc.config.Property(
            name="question",
            data_type=wvc.config.DataType.TEXT,
            # highlight-start
            vectorize_property_name=True,  # Skip the property name ("question") when vectorizing
            tokenization=wvc.config.Tokenization.LOWERCASE  # Use "lowecase" tokenization
            # highlight-end
        ),
        wvc.config.Property(
            name="answer",
            data_type=wvc.config.DataType.TEXT,
            # highlight-start
            vectorize_property_name=False,  # Skip the property name ("answer") when vectorizing
            tokenization=wvc.config.Tokenization.WHITESPACE  # Use "whitespace" tokenization
            # highlight-end
        ),
    ]
)
# END SchemaWithPropertyOptions


# START SchemaWithMultiTenancy
questions = client.collections.create(
    name="Question",
    vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(),    # Set the vectorizer to "text2vec-openai" to use the OpenAI API for vector-related operations
    generative_config=wvc.config.Configure.Generative.cohere(),             # Set the generative module to "generative-cohere" to use the Cohere API for RAG
    properties=[
        wvc.config.Property(
            name="question",
            data_type=wvc.config.DataType.TEXT,
        ),
        wvc.config.Property(
            name="answer",
            data_type=wvc.config.DataType.TEXT,
        ),
    ],
    # highlight-start
    multi_tenancy_config=wvc.config.Configure.multi_tenancy(enabled=True),  # Enable multi-tenancy
    # highlight-end
)
# END SchemaWithMultiTenancy


# START SchemaWithIndexSettings
questions = client.collections.create(
    name="Question",
    vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(),    # Set the vectorizer to "text2vec-openai" to use the OpenAI API for vector-related operations
    generative_config=wvc.config.Configure.Generative.cohere(),             # Set the generative module to "generative-cohere" to use the Cohere API for RAG
    properties=[
        wvc.config.Property(
            name="question",
            data_type=wvc.config.DataType.TEXT,
        ),
        wvc.config.Property(
            name="answer",
            data_type=wvc.config.DataType.TEXT,
        ),
    ],
    # highlight-start
    # Configure the vector index
    vector_index_config=wvc.config.Configure.VectorIndex.hnsw(
        distance_metric=wvc.config.VectorDistance.COSINE,
        quantizer=wvc.config.Configure.VectorIndex.Quantizer.pq(segments=192),
    ),
    # Configure the inverted index
    inverted_index_config=wvc.config.Configure.inverted_index(
        index_null_state=True,
        index_property_length=True,
        index_timestamps=True,
    ),
    # highlight-end
)
# END SchemaWithIndexSettings
