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

try:

    # ==========================================
    # ===== Single Filter =====
    # ==========================================

    # SingleFilterPython
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # highlight-start
        filters=wvc.query.Filter.by_property("round").equal("Double Jeopardy!"),
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
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.near_text(
        query="fashion icons",
        # highlight-start
        filters=wvc.query.Filter.by_property("points").greater_than(200),
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
    jeopardy = client.collections.get("JeopardyQuestion")

    # highlight-start
    token_list = ["australia", "india"]
    # highlight-end
    response = jeopardy.query.fetch_objects(
        # highlight-start
        # Find objects where the `answer` property contains any of the strings in `token_list`
        filters=wvc.query.Filter.by_property("answer").contains_any(token_list),
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
    jeopardy = client.collections.get("JeopardyQuestion")

    # highlight-start
    token_list = ["blue", "red"]
    # highlight-end

    response = jeopardy.query.fetch_objects(
        # highlight-start
        # Find objects where the `question` property contains all of the strings in `token_list`
        filters=wvc.query.Filter.by_property("question").contains_all(token_list),
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
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # highlight-start
        filters=wvc.query.Filter.by_property("answer").like("*inter*"),
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
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # highlight-start
        # Use & as AND
        #     | as OR
        filters=wvc.query.Filter.by_property("round").equal("Double Jeopardy!") &
                wvc.query.Filter.by_property("points").less_than(600),
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
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # highlight-start
        filters=wvc.query.Filter.by_property("question").like("*nest*") &
                (wvc.query.Filter.by_property("points").greater_than(700) | wvc.query.Filter.by_property("points").less_than(300)),
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
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # highlight-start
        filters=wvc.query.Filter.by_ref(link_on="hasCategory").by_property("title").like("*Sport*"),
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
    collection = client.collections.get("Article")

    target_id = "00037775-1432-35e5-bc59-443baaef7d80"
    response = collection.query.fetch_objects(
        filters=wvc.query.Filter.by_id().equal(target_id)
    )

    for o in response.objects:
        print(o.properties)  # Inspect returned objects
        print(o.uuid)
    # END FilterById


    # Tests
    assert str(response.objects[0].uuid) == target_id
    # End test

    # ========================================
    # FilterByID
    # ========================================

    # START FilterById
    collection = client.collections.get("Article")

    target_id = "00037775-1432-35e5-bc59-443baaef7d80"
    response = collection.query.fetch_objects(
        filters=wvc.query.Filter.by_id().equal(target_id)
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

    collection = client.collections.get("Article")

    # highlight-start
    # Set the timezone for avoidance of doubt (otherwise the client will emit a warning)
    filter_time = datetime(2020, 1, 1).replace(tzinfo=timezone.utc)
    # highlight-end

    response = collection.query.fetch_objects(
        limit=3,
        # highlight-start
        filters=wvc.query.Filter.by_creation_time().greater_than(filter_time),
        return_metadata=wvc.query.MetadataQuery(creation_time=True)
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


    # ========================================
    # FilterByPropertyLength
    # ========================================

    # START FilterByPropertyLength
    collection = client.collections.get("JeopardyQuestion")

    # highlight-start
    length_threshold = 20
    # highlight-end

    response = collection.query.fetch_objects(
        limit=3,
        # highlight-start
        filters=wvc.query.Filter.by_property("answer", length=True).greater_than(length_threshold),
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


finally:
    client.close()
