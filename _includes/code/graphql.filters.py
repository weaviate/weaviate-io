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
    auth_credentials=weaviate.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
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
    filters=wvc.Filter("wordCount").greater_than(1000),
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
    filters=wvc.Filter("title").like("New *"),
    limit=5
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
# END FilterWithLike


# ========================================
# FilterByID
# ========================================

# START FilterByID
collection = client.collections.get("Article")
response = collection.query.fetch_objects(
    filters=wvc.Filter("id").equal("00037775-1432-35e5-bc59-443baaef7d80"),
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
# END FilterWithLike

assert len(response.objects) == 1
