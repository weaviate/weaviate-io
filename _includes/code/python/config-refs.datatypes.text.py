import weaviate

# START ConfigureDataType
from weaviate.classes.config import Property, DataType, Configure, Tokenization

# END ConfigureDataType

client = weaviate.connect_to_local()

collection_name = "TestCollection"

# Delete collection if it exists
client.collections.delete(name=collection_name)

# START ConfigureDataType
# Create collection
my_collection = client.collections.create(
    name=collection_name,
    properties=[
        Property(
            name="title", data_type=DataType.TEXT, tokenization=Tokenization.LOWERCASE
        ),
        Property(
            name="movie_id", data_type=DataType.TEXT, tokenization=Tokenization.FIELD
        ),
        Property(
            name="genres", data_type=DataType.TEXT_ARRAY, tokenization=Tokenization.WORD
        ),
    ],
    vectorizer_config=[
        Configure.NamedVectors.text2vec_ollama(
            name="main",
            source_properties=[
                "title",
                "genres",
            ],  # Note that "movie_id" is not included
            api_endpoint="http://host.docker.internal:11434",  # If using Docker, use this to contact your local Ollama instance
            model="snowflake-arctic-embed",  # The model to use, e.g. "nomic-embed-text"
        )
    ],
)
# END ConfigureDataType

# Create an object
obj_uuid = my_collection.data.insert(
    {
        "title": "Rogue One",
        "movie_id": "ro123456",
        "genres": ["Action", "Adventure", "Sci-Fi"],
    }
)

assert obj_uuid is not None

client.close()
