import weaviate

# START ConfigureDataType
from weaviate.classes.config import Property, DataType
from weaviate.classes.data import PhoneNumber

# END ConfigureDataType

client = weaviate.connect_to_local()

# Delete collection if it exists
client.collections.delete(name="Person")

# START ConfigureDataType
# Create collection
my_collection = client.collections.create(
    name="Person",
    properties=[
        Property(name="name", data_type=DataType.TEXT),
        Property(name="phone", data_type=DataType.PHONE_NUMBER),
    ],
    # Other properties are omitted for brevity
)
# END ConfigureDataType

# START AddObject
# Create an object
example_object = {
    "name": "Ray Stantz",
    "phone": PhoneNumber(number="212 555 2368", default_country="us"),
}

obj_uuid = my_collection.data.insert(example_object)
# END AddObject

returned_obj = my_collection.query.fetch_object_by_id(obj_uuid)

assert obj_uuid is not None
assert returned_obj.properties["phone"].national == 2125552368

client.close()
