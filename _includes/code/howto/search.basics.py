# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation
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

    # ==============================
    # ===== BASIC GET EXAMPLES =====
    # ==============================

    # BasicGetPython
    jeopardy = client.collections.get("JeopardyQuestion")
    # highlight-start
    response = jeopardy.query.fetch_objects()
    # highlight-end

    for o in response.objects:
        print(o.properties)
    # END BasicGetPython

    # TESTS IN THIS FILE NOT CHECKED OR EXPECTED TO RUN YET

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "question" in response.objects[0].properties.keys()
    # End test

    # ====================================
    # ===== BASIC GET LIMIT EXAMPLES =====
    # ====================================

    # GetWithLimitPython
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # highlight-start
        limit=1
        # highlight-end
    )

    for o in response.objects:
        print(o.properties)
    # END GetWithLimitPython

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "question" in response.objects[0].properties.keys()
    assert len(response.objects) == 1
    # End test


    # ==========================================
    # ===== GET LIMIT WITH OFFSET EXAMPLES =====
    # ==========================================

    # GetWithLimitOffsetPython
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # highlight-start
        limit=1,
        offset=1
        # highlight-end
    )

    for o in response.objects:
        print(o.properties)
    # END GetWithLimitOffsetPython

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "question" in response.objects[0].properties.keys()
    assert len(response.objects) == 1
    # End test


    # ==========================================
    # ===== GET OBJECT PROPERTIES EXAMPLES =====
    # ==========================================

    # GetPropertiesPython
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # highlight-start
        limit=1,
        return_properties=["question", "answer", "points"]
        # highlight-end
    )

    for o in response.objects:
        print(o.properties)
    # END GetPropertiesPython

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    for prop_name in ["question", "answer", "points"]:
        assert prop_name in response.objects[0].properties.keys()
    # End test


    # ======================================
    # ===== GET OBJECT VECTOR EXAMPLES =====
    # ======================================

    # GetObjectVectorPython
    # highlight-start
    import weaviate.classes as wvc
    # highlight-end

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # highlight-start
        include_vector=True,
        # highlight-end
        limit=1
    )

    print(response.objects[0].vector["default"])
    # END GetObjectVectorPython

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    assert type(response.objects[0].vector["default"]) == list
    assert len(response.objects[0].vector["default"]) >= 100
    # End test


    # ==================================
    # ===== GET OBJECT ID EXAMPLES =====
    # ==================================

    # GetObjectIdPython
    # highlight-start
    import weaviate.classes as wvc
    # highlight-end

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # Object IDs are included by default with the `v4` client! :)
        limit=1
    )

    for o in response.objects:
        print(o.uuid)
    # END GetObjectIdPython


    # Test results
    from weaviate.collections.queries.base import _WeaviateUUIDInt

    assert response.objects[0].collection == "JeopardyQuestion"
    assert type(response.objects[0].uuid) == _WeaviateUUIDInt
    # End test


    # ==============================
    # ===== GET WITH CROSS-REF EXAMPLES =====
    # ==============================

    # GetWithCrossRefsPython
    # highlight-start
    import weaviate.classes as wvc
    # highlight-end

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        # highlight-start
        return_references=[
            wvc.query.QueryReference(
                link_on="hasCategory",
                return_properties=["title"]
            ),
        ],
        # highlight-end
        limit=2
    )

    for o in response.objects:
        print(o.properties["question"])
        # print referenced objects
        for ref_obj in o.references["hasCategory"].objects:
            print(ref_obj.properties)
    # END GetWithCrossRefsPython

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    assert len(response.objects[0].references["hasCategory"].objects) > 0
    # END Test


    # ====================================
    # ===== GET WITH METADATA EXAMPLE =====
    # ====================================

    # GetWithMetadataPython
    # highlight-start
    import weaviate.classes as wvc
    # highlight-end

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.fetch_objects(
        limit=1,
        # highlight-start
        return_metadata=wvc.query.MetadataQuery(creation_time=True)
        # highlight-end
    )

    for o in response.objects:
        print(o.properties)  # View the returned properties
        print(o.metadata.creation_time)  # View the returned creation time
    # END GetWithMetadataPython

    # Test results
    assert response.objects[0].collection == "JeopardyQuestion"
    assert response.objects[0].metadata.creation_time is not None
    # END Test results


    # =========================
    # ===== MULTI-TENANCY =====
    # =========================

    # MultiTenancy
    import weaviate.classes as wvc

    # Connect to the collection
    mt_collection = client.collections.get("WineReviewMT")

    # Get the specific tenant's version of the collection
    # highlight-start
    collection_tenant_a = mt_collection.with_tenant("tenantA")
    # highlight-end

    # Query tenantA's version
    response = collection_tenant_a.query.fetch_objects(
        return_properties=["review_body", "title"],
        limit=1,
    )

    print(response.objects[0].properties)
    # END MultiTenancy


    # Test results
    assert len(response.objects) > 0
    assert response.objects[0].collection == "WineReviewMT"
    # End test


finally:
    client.close()
