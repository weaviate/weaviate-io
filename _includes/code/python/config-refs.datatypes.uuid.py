import weaviate

# START ConfigureDataType
from weaviate.classes.config import Property, DataType
from weaviate.util import generate_uuid5

# END ConfigureDataType

client = weaviate.connect_to_local()

# Delete collection if it exists
client.collections.delete(name="Movie")

# START ConfigureDataType
# Create collection
my_collection = client.collections.create(
    name="Movie",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="movie_uuid", data_type=DataType.UUID),
        Property(name="related_movie_uuids", data_type=DataType.UUID_ARRAY),
    ],
    # Other properties are omitted for brevity
)
# END ConfigureDataType

# START AddObject
# Create an object
example_object = {
    "title": "The Matrix",
    "movie_uuid": generate_uuid5("The Matrix"),
    "related_movie_uuids": [
        generate_uuid5("The Matrix Reloaded"),
        generate_uuid5("The Matrix Revolutions"),
        generate_uuid5("Matrix Resurrections"),
    ],
}

obj_uuid = my_collection.data.insert(example_object)
# END AddObject

returned_obj = my_collection.query.fetch_object_by_id(obj_uuid)

assert obj_uuid is not None
assert [str(i) for i in returned_obj.properties["related_movie_uuids"]] == example_object["related_movie_uuids"]

client.close()
