# Howto: Search -> Filters - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
from weaviate.auth import AuthApiKey
import os

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=AuthApiKey(os.getenv("WCD_DEMO_RO_KEY")),
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
# ===== ContainsAny Filter =====
# ==========================================

# ContainsAnyFilter
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")

# highlight-start
token_list = ["australia", "india"]
# highlight-end
response = jeopardy.query.fetch_objects(
    # highlight-start
    # Find objects where the `answer` property contains any of the strings in `token_list`
    filters=Filter.by_property("answer").contains_any(token_list),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
# END ContainsAnyFilter


# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert (token_list[0] in response.objects[0].properties["answer"].lower() or token_list[1] in response.objects[0].properties["answer"].lower())
# End test


# ==========================================
# ===== ContainsAllFilter =====
# ==========================================

# ContainsAllFilter
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")

# highlight-start
token_list = ["blue", "red"]
# highlight-end

response = jeopardy.query.fetch_objects(
    # highlight-start
    # Find objects where the `question` property contains all of the strings in `token_list`
    filters=Filter.by_property("question").contains_all(token_list),
    # highlight-end
    limit=3
)

for o in response.objects:
    print(o.properties)
# END ContainsAllFilter

# Test results
assert response.objects[0].collection == "JeopardyQuestion"
assert (token_list[0] in response.objects[0].properties["question"].lower() and token_list[1] in response.objects[0].properties["question"].lower())
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
    filters=(
        Filter.by_property("round").equal("Double Jeopardy!") &
        Filter.by_property("points").less_than(600)
    ),
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
# ===== Multiple Filters with Any of =====
# ==========================================

# MultipleFiltersAnyOfPython
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=(
        Filter.any_of([  # Combines the below with `|`
            Filter.by_property("points").greater_or_equal(700),
            Filter.by_property("points").less_than(500),
            Filter.by_property("round").equal("Double Jeopardy!"),
        ])
    ),
    # highlight-end
    limit=5
)

for o in response.objects:
    print(o.properties)
# END MultipleFiltersAnyOfPython


# Test results
assert (
    (response.objects[0].properties["points"] <= 700) |
    (response.objects[0].properties["points"] < 500) |
    (response.objects[0].properties["round"] == "Double Jeopardy!")
)
# End test


# ==========================================
# ===== Multiple Filters with All of =====
# ==========================================

# MultipleFiltersAllOfPython
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=(
        Filter.all_of([  # Combines the below with `&`
            Filter.by_property("points").greater_than(300),
            Filter.by_property("points").less_than(700),
            Filter.by_property("round").equal("Double Jeopardy!"),
        ])
    ),
    # highlight-end
    limit=5
)

for o in response.objects:
    print(o.properties)
# END MultipleFiltersAllOfPython


# Test results
assert (
    (response.objects[0].properties["points"] > 300) &
    (response.objects[0].properties["points"] < 700) &
    (response.objects[0].properties["round"] == "Double Jeopardy!")
)
# End test


# ==========================================
# ===== Multiple Filters with Nesting =====
# ==========================================

# MultipleFiltersNestedPython
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=Filter.by_property("answer").like("*bird*") &
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
    ("bird" in response.objects[0].properties["answer"].lower())
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
from weaviate.classes.query import Filter, QueryReference

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    # highlight-start
    filters=Filter.by_ref(link_on="hasCategory").by_property("title").like("*Sport*"),
    return_references=QueryReference(link_on="hasCategory", return_properties=["title"]),
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
from weaviate.classes.query import Filter

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
# FilterByTimestamp
# ========================================

# START FilterByTimestamp
from datetime import datetime, timezone
from weaviate.classes.query import Filter, MetadataQuery

collection = client.collections.get("Article")

# highlight-start
# Set the timezone for avoidance of doubt (otherwise the client will emit a warning)
filter_time = datetime(2020, 1, 1).replace(tzinfo=timezone.utc)
# highlight-end

response = collection.query.fetch_objects(
    limit=3,
    # highlight-start
    filters=Filter.by_creation_time().greater_than(filter_time),
    return_metadata=MetadataQuery(creation_time=True)
    # highlight-end
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
    print(o.metadata.creation_time)  # Inspect object creation time
# END FilterByTimestamp


# Tests
for o in response.objects:
    assert o.metadata.creation_time > filter_time
# End test

client.close()

# ========================================
# FilterByDateDatatype
# ========================================

from weaviate.classes.config import Property, DataType, Configure
from datetime import datetime, timezone

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

client.collections.delete("CollectionWithDate")

collection = client.collections.create(
    "CollectionWithDate",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="some_date", data_type=DataType.DATE),
    ],
    vectorizer_config=Configure.Vectorizer.none()
)

with collection.batch.dynamic() as batch:
    for year in range(2020, 2025):
        for month in range(1, 13, 2):
            for day in range(1, 21, 5):
                date = datetime(year, month, day).replace(tzinfo=timezone.utc)
                batch.add_object(
                    properties={
                        "title": f"Object: yr/month/day:{year}/{month}/{day}",
                        "some_date": date
                    }
                )


# START FilterByDateDatatype
from datetime import datetime, timezone
from weaviate.classes.query import Filter, MetadataQuery

# highlight-start
# Set the timezone for avoidance of doubt
filter_time = datetime(2022, 6, 10).replace(tzinfo=timezone.utc)
# The filter threshold could also be an RFC 3339 timestamp, e.g.:
# filter_time = "2022-06-10T00:00:00.00Z"
# highlight-end

response = collection.query.fetch_objects(
    limit=3,
    # highlight-start
    # This property (`some_date`) is a `DATE` datatype
    filters=Filter.by_property("some_date").greater_than(filter_time),
    # highlight-end
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
# END FilterByDateDatatype


# Tests
assert len(response.objects) > 0
for o in response.objects:
    assert o.properties["some_date"] > filter_time
# End test

client.close()

# ========================================
# FilterByPropertyLength
# ========================================

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=AuthApiKey(os.getenv("WCD_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

length_threshold = 20

# START FilterByPropertyLength
from weaviate.classes.query import Filter

collection = client.collections.get("JeopardyQuestion")

response = collection.query.fetch_objects(
    limit=3,
    # highlight-start
    filters=Filter.by_property("answer", length=True).greater_than(length_threshold),
    # highlight-end
)

for o in response.objects:
    print(o.properties)  # Inspect returned objects
    print(len(o.properties["answer"]))  # Inspect property length
# END FilterByPropertyLength


# Tests
for o in response.objects:
    assert len(o.properties["answer"]) > length_threshold
# End test


# ========================================
# FilterByGeolocation
# ========================================

# Test this on a local instance with a temporary collection
client.close()

client = weaviate.connect_to_local()

for c in ["Article", "Author", "Publication"]:
    client.collections.delete(c)

from weaviate.classes.config import Property, DataType

publications = client.collections.create(
    "Publication",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="headquartersGeoLocation", data_type=DataType.GEO_COORDINATES)
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
from weaviate.classes.query import Filter
from weaviate.classes.query import GeoCoordinate

response = publications.query.fetch_objects(
    filters=(
        Filter
        .by_property("headquartersGeoLocation")
        .within_geo_range(
            coordinate=GeoCoordinate(
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
