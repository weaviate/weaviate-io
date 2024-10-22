import weaviate

# START ConfigureDataType
from weaviate.classes.config import Property, DataType

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
        Property(
            name="home_address",
            data_type=DataType.OBJECT,
            nested_properties=[
                Property(
                    name="street",
                    data_type=DataType.OBJECT,
                    nested_properties=[
                        Property(name="number", data_type=DataType.INT),
                        Property(name="name", data_type=DataType.TEXT),
                    ],
                ),
                Property(name="city", data_type=DataType.TEXT),
            ],
        ),
        Property(
            name="office_addresses",
            data_type=DataType.OBJECT_ARRAY,
            nested_properties=[
                Property(name="office_name", data_type=DataType.TEXT),
                Property(
                    name="street",
                    data_type=DataType.OBJECT,
                    nested_properties=[
                        Property(name="name", data_type=DataType.TEXT),
                        Property(name="number", data_type=DataType.INT),
                    ],
                ),
            ],
        ),
    ],
    # Other properties are omitted for brevity
)
# END ConfigureDataType

# START AddObject
# Create an object
example_object = {
    "name": "John Smith",
    "home_address": {
        "street": {
            "number": 123,
            "name": "Main Street",
        },
        "city": "London",
    },
    "office_addresses": [
        {
            "office_name": "London HQ",
            "street": {"number": 456, "name": "Oxford Street"},
        },
        {
            "office_name": "Manchester Branch",
            "street": {"number": 789, "name": "Piccadilly Gardens"},
        },
    ],
}

obj_uuid = my_collection.data.insert(example_object)
# END AddObject

returned_obj = my_collection.query.fetch_object_by_id(obj_uuid)

assert obj_uuid is not None
assert returned_obj.properties == example_object

client.close()
