import weaviate

# START ConfigureDataType
from weaviate.classes.config import Property, DataType
from weaviate.classes.data import GeoCoordinate

# END ConfigureDataType

client = weaviate.connect_to_local()

# Delete collection if it exists
client.collections.delete(name="City")

# START ConfigureDataType
# Create collection
my_collection = client.collections.create(
    name="City",
    properties=[
        Property(name="name", data_type=DataType.TEXT),
        Property(name="location", data_type=DataType.GEO_COORDINATES),
    ],
    # Other properties are omitted for brevity
)
# END ConfigureDataType

# START AddObject
# Create an object
example_object = {
    "name": "Sydney",
    "location": GeoCoordinate(latitude=-33.8688, longitude=151.2093),
}

obj_uuid = my_collection.data.insert(example_object)
# END AddObject

returned_obj = my_collection.query.fetch_object_by_id(obj_uuid)

assert obj_uuid is not None
assert [str(i) for i in returned_obj.properties["related_movie_uuids"]] == example_object["related_movie_uuids"]

client.close()
