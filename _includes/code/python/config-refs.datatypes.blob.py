import weaviate

# START ConfigureDataType
from weaviate.classes.config import Property, DataType

# END ConfigureDataType

client = weaviate.connect_to_local()

# Delete collection if it exists
client.collections.delete(name="Poster")

# START ConfigureDataType
# Create collection
my_collection = client.collections.create(
    name="Poster",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="image", data_type=DataType.BLOB),
    ],
    # Other properties are omitted for brevity
)
# END ConfigureDataType

blob_string = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="

# START AddObject
# Create an object
example_object = {
    "title": "The Matrix",
    "image": blob_string
}

obj_uuid = my_collection.data.insert(example_object)
# END AddObject

returned_obj = my_collection.query.fetch_object_by_id(obj_uuid, return_properties=["title", "image"])

assert obj_uuid is not None
assert returned_obj.properties == example_object

client.close()
