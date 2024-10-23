import weaviate

# START ConfigureDataType
from weaviate.classes.config import Property, DataType
from datetime import datetime, timezone

# END ConfigureDataType

client = weaviate.connect_to_local()

# Delete collection if it exists
client.collections.delete(name="ConcertTour")

# START ConfigureDataType
# Create collection
my_collection = client.collections.create(
    name="ConcertTour",
    properties=[
        Property(name="artist", data_type=DataType.TEXT),
        Property(name="tour_name", data_type=DataType.TEXT),
        Property(name="tour_start", data_type=DataType.DATE),
        Property(name="tour_dates", data_type=DataType.DATE_ARRAY),
    ],
    # Other properties are omitted for brevity
)
# END ConfigureDataType

# START AddObject
# Create an object
# In Python, you can use the RFC 3339 format or a datetime object (preferably with a timezone)
example_object = {
    "artist": "Taylor Swift",
    "tour_name": "Eras Tour",
    "tour_start": datetime(2023, 3, 17).replace(tzinfo=timezone.utc),
    "tour_dates": [
        # Use `datetime` objects with a timezone
        datetime(2023, 3, 17).replace(tzinfo=timezone.utc),
        datetime(2023, 3, 18).replace(tzinfo=timezone.utc),
        # .. more dates
        # Or use RFC 3339 format
        "2024-12-07T00:00:00Z",
        "2024-12-08T00:00:00Z",
    ],
}

obj_uuid = my_collection.data.insert(example_object)
# END AddObject

returned_obj = my_collection.query.fetch_object_by_id(obj_uuid)

assert obj_uuid is not None
assert returned_obj.properties["tour_start"] == example_object["tour_start"]
# Only testing the `tour_start` date for simplicity (the `tour_dates` array has mixed date formats)

client.close()
