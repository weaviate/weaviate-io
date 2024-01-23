# ========================================
# Filters
# ========================================

# START-ANY
import weaviate
import weaviate.classes as wvc
import os

client = weaviate.connect_to_local()

# END-ANY


# Actual client instantiation
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")
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

from weaviate.collections.classes.filters import FilterMetadata

# TODO - Review this for V4 client
# START FilterById
collection = client.collections.get("Article")
response = collection.query.fetch_objects(
    filters=FilterMetadata.ById.equal("00037775-1432-35e5-bc59-443baaef7d80")
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
# Coming soon
# END FilterByTimestamps

# TEST


# ========================================
# FilterByReference
# ========================================

# START FilterByReference
# Coming soon
# END FilterByReference

# TEST


# ========================================
# FilterByCountOfReferences
# ========================================

# START FilterByCountOfReferences
# Coming soon
# END FilterByCountOfReferences

# TEST


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