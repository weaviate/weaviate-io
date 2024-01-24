# ========================================
# Filters
# ========================================

# START-ANY
import weaviate
import weaviate.classes as wvc
import os
# END-ANY
# START FilterByTimestamps
from datetime import datetime
# END FilterByTimestamps

# START-ANY

client = weaviate.connect_to_local()

# END-ANY


# Actual client instantiation
client.close()

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)


# ========================================
# SingleConditionFilter
# ========================================

# START SingleConditionFilter
collection = client.collections.get("Article")
response = collection.query.fetch_objects(
    filters=wvc.query.Filter.by_property("wordCount").greater_than(1000),
    limit=5
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
# END SingleConditionFilter


# ========================================
# FilterWithLike
# ========================================

# START FilterWithLike
collection = client.collections.get("Article")
response = collection.query.fetch_objects(
    filters=wvc.query.Filter.by_property("title").like("New *"),
    limit=5
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
# END FilterWithLike


# ========================================
# FilterByID
# ========================================

# START FilterById
collection = client.collections.get("Article")
response = collection.query.fetch_objects(
    filters=wvc.query.Filter.by_id().equal("00037775-1432-35e5-bc59-443baaef7d80")
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
# END FilterById

# TEST
assert len(response.objects) == 1


# ========================================
# FilterByTimestamps
# ========================================

# START FilterByTimestamps
collection = client.collections.get("Article")
year2k = datetime.strptime("2000-01-01T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")

response = collection.query.fetch_objects(
    filters=wvc.query.Filter.by_creation_time().greater_or_equal(year2k),
    return_metadata=wvc.query.MetadataQuery(creation_time=True),
    limit=2
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
    print(o.metadata)  # Inspect returned creation time
# END FilterByTimestamps


# ========================================
# FilterByReference
# ========================================

# START FilterByReference
collection = client.collections.get("Article")

response = collection.query.fetch_objects(
    filters=wvc.query.Filter.by_ref(link_on="inPublication").by_property("name").like("*New*"),
    return_references=wvc.query.QueryReference(link_on="inPublication", return_properties=["name"]),
    limit=2
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
    for ref_o in o.references["inPublication"].objects:
        print(ref_o.properties)
# END FilterByReference


# ========================================
# FilterByCountOfReferences
# ========================================

# START FilterByCountOfReferences
# Coming soon
# END FilterByCountOfReferences


# ========================================
# FilterByGeoCoordinates
# ========================================

# START FilterByGeoCoordinates
# Coming soon
# END FilterByGeoCoordinates

# TEST

# START-ANY

client.close()
# END-ANY