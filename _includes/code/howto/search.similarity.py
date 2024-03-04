# Howto: semantic search - Python examples

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
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    },
)

try:


    # ===============================================
    # ===== QUERY WITH TARGET VECTOR & nearText =====
    # ===============================================

    # NamedVectorNearTextPython
    import weaviate.classes as wvc

    reviews = client.collections.get("WineReviewNV")
    response = reviews.query.near_text(
        query="a sweet German white wine",
        limit=2,
        # highlight-start
        target_vector="title_country",  # Specify the target vector for named vector collections
        # highlight-end
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.distance)
    # END NamedVectorNearTextPython

    # Test results
    assert response.objects[0].collection == "WineReviewNV"
    assert len(response.objects) == 2
    assert "title" in response.objects[0].properties.keys()
    assert response.objects[0].metadata.distance is not None
    # End test


    # ===============================
    # ===== QUERY WITH nearText =====
    # ===============================

    # https://weaviate.io/developers/weaviate/api/graphql/search-operators#neartext

    # GetNearTextPython
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    # highlight-start
    response = jeopardy.query.near_text(
        query="animals in movies",
    # highlight-end
        limit=2,
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.distance)
    # END GetNearTextPython

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    assert len(response.objects) == 2
    assert "question" in response.objects[0].properties.keys()
    assert response.objects[0].metadata.distance is not None
    # End test


    # =================================
    # ===== QUERY WITH nearObject =====
    # =================================

    # https://weaviate.io/developers/weaviate/api/graphql/search-operators#nearobject

    # GetNearObjectPython
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    # highlight-start
    response = jeopardy.query.near_object(
        near_object="56b9449e-65db-5df4-887b-0a4773f52aa7",
    # highlight-end
        limit=2,
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.distance)
    # END GetNearObjectPython

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    assert len(response.objects) == 2
    assert "question" in response.objects[0].properties.keys()
    assert response.objects[0].metadata.distance is not None
    # End test


    # =================================
    # ===== QUERY WITH nearVector =====
    # =================================

    # https://weaviate.io/developers/weaviate/api/graphql/search-operators#nearvector

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(limit=1, include_vector=True)
    query_vector = response.objects[0].vector["default"]

    # GetNearVectorPython
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    # highlight-start
    response = jeopardy.query.near_vector(
        near_vector=query_vector, # your query vector goes here
    # highlight-end
        limit=2,
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.distance)
    # END GetNearVectorPython

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    assert len(response.objects) == 2
    assert "question" in response.objects[0].properties.keys()
    assert response.objects[0].metadata.distance is not None
    # End test


    # ==========================================
    # ===== QUERY WITH OFFSET AND LIMIT =====
    # ==========================================


    # Query with LimitOffset - https://weaviate.io/developers/weaviate/api/graphql/filters#limit-argument

    # GetLimitOffsetPython
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.near_text(
        query="animals in movies",
        # highlight-start
        limit=2,  # return 2 objects
        offset=1,  # With an offset of 1
        # highlight-end
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.distance)
    # END GetLimitOffsetPython

    # Test results
    no_offset_response = jeopardy.query.near_text(
        query="animals in movies",
        limit=3,
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    assert response.objects[0].collection == "JeopardyQuestion"
    assert len(response.objects) == 2
    assert "question" in response.objects[0].properties.keys()
    assert response.objects[0].metadata.distance is not None
    assert no_offset_response.objects[1].properties["question"] == response.objects[0].properties["question"]
    # End test


    # ===============================
    # ===== QUERY WITH DISTANCE =====
    # ===============================

    # http://weaviate.io/developers/weaviate/config-refs/distances

    # GetWithDistancePython
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.near_text(
        query="animals in movies",
        # highlight-start
        distance=0.18, # max accepted distance
        # highlight-end
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.distance)
    # END GetWithDistancePython

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "question" in response.objects[0].properties.keys()
    assert response.objects[0].metadata.distance is not None
    for o in response.objects:
        assert o.metadata.distance < 0.18
    # End test


    # ===============================
    # ===== Query with autocut =====
    # ===============================

    # http://weaviate.io/developers/weaviate/api/graphql/additional-operators#autocut

    # START Autocut Python
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.near_text(
        query="animals in movies",
        # highlight-start
        auto_limit=1, # number of close groups
        # highlight-end
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.distance)
    # END Autocut Python

    # Test results
    assert len(response.objects) > 0
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "question" in response.objects[0].properties.keys()
    assert response.objects[0].metadata.distance is not None
    # End test


    # ==============================
    # ===== QUERY WITH groupBy =====
    # ==============================


    # https://weaviate.io/developers/weaviate/api/graphql/get#get-groupby
    # GetWithGroupbyPython
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    # highlight-start

    group_by = wvc.query.GroupBy(
        prop="round",  # group by this property
        objects_per_group=2,  # maximum objects per group
        number_of_groups=2,  # maximum number of groups
    )

    response = jeopardy.query.near_text(
        query="animals in movies", # find object based on this query
        limit=10,  # maximum total objects
        return_metadata=wvc.query.MetadataQuery(distance=True),
        group_by=group_by
    )
    # highlight-end


    for o in response.objects:
        print(o.uuid)
        print(o.belongs_to_group)
        print(o.metadata.distance)

    for grp, grp_items in response.groups.items():
        print("=" * 10 + grp_items.name + "=" * 10)
        print(grp_items.number_of_objects)
        for o in grp_items.objects:
            print(o.properties)
            print(o.metadata)
    # END GetWithGroupbyPython

    # Test results
    assert len(response.objects) > 0
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "question" in response.objects[0].properties.keys()
    assert response.objects[0].metadata.distance is not None

    assert len(response.groups) > 0
    assert len(response.groups) <= 2
    for grp, grp_items in response.groups.items():
        assert grp_items.number_of_objects <= 2
    # End test


    # ============================
    # ===== QUERY WITH WHERE =====
    # ============================

    # https://weaviate.io/developers/weaviate/api/graphql/search-operators#neartext

    # GetWithWherePython
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.near_text(
        query="animals in movies",
        # highlight-start
        filters=wvc.query.Filter.by_property("round").equal("Double Jeopardy!"),
        # highlight-end
        limit=2,
        return_metadata=wvc.query.MetadataQuery(distance=True),
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.distance)
    # END GetWithWherePython

    # Test results
    assert len(response.objects) > 0
    assert response.objects[0].collection == "JeopardyQuestion"
    assert response.objects[0].properties["round"] == "Double Jeopardy!"
    assert "question" in response.objects[0].properties.keys()
    assert response.objects[0].metadata.distance is not None
    # End test

finally:
    client.close()
