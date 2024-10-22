import weaviate

# START ConfigureDataType
from weaviate.classes.config import Property, DataType, Configure, Tokenization

# END ConfigureDataType

client = weaviate.connect_to_local()

# Delete collection if it exists
client.collections.delete(name="Movie")

# START ConfigureDataType
# Create collection
my_collection = client.collections.create(
    name="Movie",
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
    # END ConfigureDataType
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
    # START ConfigureDataType
    # Other properties are omitted for brevity
)
# END ConfigureDataType

# START AddObject
# Create an object
example_object = {
    "title": "Rogue One",
    "movie_id": "ro123456",
    "genres": ["Action", "Adventure", "Sci-Fi"],
}

obj_uuid = my_collection.data.insert(example_object)
# END AddObject

returned_obj = my_collection.query.fetch_object_by_id(obj_uuid)

assert obj_uuid is not None
assert returned_obj.properties == example_object

client.close()
