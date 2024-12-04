import weaviate

# START ConfigureDataType
from weaviate.classes.config import Property, DataType

# END ConfigureDataType

client = weaviate.connect_to_local()

# Delete collection if it exists
client.collections.delete(name="Product")

# START ConfigureDataType
# Create collection
my_collection = client.collections.create(
    name="Product",
    properties=[
        Property(name="name", data_type=DataType.TEXT),
        Property(name="price", data_type=DataType.NUMBER),
        Property(name="stock_quantity", data_type=DataType.INT),
        Property(name="is_on_sale", data_type=DataType.BOOL),
        Property(name="customer_ratings", data_type=DataType.NUMBER_ARRAY),
    ],
    # Other properties are omitted for brevity
)
# END ConfigureDataType

# START AddObject
# Create an object
example_object = {
    "name": "Wireless Headphones",
    "price": 95.50,
    "stock_quantity": 100,
    "is_on_sale": True,
    "customer_ratings": [4.5, 4.8, 4.2],
}

obj_uuid = my_collection.data.insert(example_object)
# END AddObject

returned_obj = my_collection.query.fetch_object_by_id(obj_uuid)

assert obj_uuid is not None
assert returned_obj.properties == example_object

client.close()
