# Howto: Search -> Filters - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import weaviate.classes as wvc
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

# ==========================================
# ===== Single Filter =====
# ==========================================

# SingleFilterPython
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=Filter.by_property("round").equal("Double Jeopardy!"),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
# END SingleFilterPython


# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert response.objects[0].properties["round"] == "Double Jeopardy!"
# End test


# ==========================================
# ===== Single Filter with nearText =====
# ==========================================

# SingleFilterNearTextPython
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.near_text(
    query="fashion icons",
    # highlight-start
    filters=Filter.by_property("points").greater_than(200),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
# END SingleFilterNearTextPython


# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert response.objects[0].properties["points"] > 200
# End test


# ==========================================
# ===== Partial Match Filter =====
# ==========================================


# LikeFilterPython
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=Filter.by_property("answer").like("*inter*"),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
# END LikeFilterPython


# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert "inter" in response.objects[0].properties["answer"].lower()
# End test


# ==========================================
# ===== Multiple Filters with And =====
# ==========================================

# MultipleFiltersAndPython
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    # Use & as AND
    #     | as OR
    filters=Filter.by_property("round").equal("Double Jeopardy!") &
            Filter.by_property("points").less_than(600),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
# END MultipleFiltersAndPython


# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert response.objects[0].properties["round"] == "Double Jeopardy!"
assert response.objects[0].properties["points"] < 600
# End test


# ==========================================
# ===== Multiple Filters with Nesting =====
# ==========================================

# MultipleFiltersNestedPython
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=Filter.by_property("question").like("*nest*") &
            (Filter.by_property("points").greater_than(700) | Filter.by_property("points").less_than(300)),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
# END MultipleFiltersNestedPython


# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert (
    ("nest" in response.objects[0].properties["question"].lower())
    and (
        (response.objects[0].properties["points"] > 700)
        or (response.objects[0].properties["points"] < 300)
    )
)
# End test

# ===================================================
# ===== Filters using Cross-referenced property =====
# ===================================================

# CrossReferencePython
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=Filter.by_ref(link_on="hasCategory").by_property("title").like("*Sport*"),
    return_references=wvc.query.QueryReference(link_on="hasCategory", return_properties=["title"]),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
    print(o.references["hasCategory"].objects[0].properties["title"])
# END CrossReferencePython


# Tests
assert response.objects[0].collection == "JeopardyQuestion"
assert "sport" in response.objects[0].references["hasCategory"].objects[0].properties["title"].lower()
# End test


# ========================================
# FilterByID
# ========================================

# START FilterById
from weaviate.collections.classes.filters import FilterMetadata

collection = client.collections.get("Article")

target_id = "00037775-1432-35e5-bc59-443baaef7d80"
response = collection.query.fetch_objects(
    filters=Filter.by_id().equal(target_id)
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
    print(o.uuid)
# END FilterById


# Tests
assert str(response.objects[0].uuid) == target_id
# End test


# ========================================
# FilterByGeolocation
# ========================================

# Test this on a local instance with a temporary collection
client.close()

client = weaviate.connect_to_local()

for c in ["Article", "Author", "Publication"]:
    client.collections.delete(c)

publications = client.collections.create(
    "Publication",
    properties=[
        wvc.config.Property(name="title", data_type=wvc.config.DataType.TEXT),
        wvc.config.Property(name="headquartersGeoLocation", data_type=wvc.config.DataType.GEO_COORDINATES)
    ]
)

publications.data.insert(
    properties={
        "headquartersGeoLocation": {
            "latitude": 52.3932696,
            "longitude": 4.8374263
        }
    },
)

# START FilterbyGeolocation
response = publications.query.fetch_objects(
    filters=(
        wvc.query.Filter
        .by_property("headquartersGeoLocation")
        .within_geo_range(
            coordinate=wvc.data.GeoCoordinate(
                latitude=52.39,
                longitude=4.84
            ),
            distance=1000  # In meters
        )
    )
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
# END FilterbyGeolocation


# Tests
assert len(response.objects) == 1
# End test


client.close()
