# Howto: BM25 search - Python examples

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

    # ============================
    # ===== Basic BM25 Query =====
    # ============================

    # BM25BasicPython
    jeopardy = client.collections.get("JeopardyQuestion")
    # highlight-start
    response = jeopardy.query.bm25(
    # highlight-end
        query="food",
        limit=3
    )

    for o in response.objects:
        print(o.properties)
    # END BM25BasicPython


    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "food" in str(response.objects[0].properties).lower()
    # End test


    # ================================================
    # ===== BM25 Query with score / explainScore =====
    # ================================================

    # BM25WithScorePython
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.bm25(
        query="food",
        return_metadata=wvc.query.MetadataQuery(score=True),
        limit=3
    )

    for o in response.objects:
        print(o.properties)
        # highlight-start
        print(o.metadata.score)
        # highlight-end
    # END BM25WithScorePython

    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "food" in str(response.objects[0].properties).lower()
    assert response.objects[0].metadata.score is not None
    # End test


    # =================================
    # ===== BM25 Query with limit =====
    # =================================

    # START limit Python
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.bm25(
        query="safety",
        # highlight-start
        limit=3
        # highlight-end
    )

    for o in response.objects:
        print(o.properties)
    # END limit Python

    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "safety" in str(response.objects[0].properties).lower()
    assert len(response.objects) == 3
    # End test


    # ===================================
    # ===== BM25 Query with autocut =====
    # ===================================

    # START autocut Python
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.bm25(
        query="safety",
        # highlight-start
        auto_limit=1
        # highlight-end
    )

    for o in response.objects:
        print(o.properties)
    # END autocut Python

    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "safety" in str(response.objects[0].properties).lower()
    # End test


    # ===============================================
    # ===== BM25 Query with Selected Properties =====
    # ===============================================


    # BM25WithPropertiesPython
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.bm25(
        query="safety",
        # highlight-start
        query_properties=["question"],
        # highlight-end
        return_metadata=wvc.query.MetadataQuery(score=True),
        limit=3
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.score)
    # END BM25WithPropertiesPython

    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "safety" in response.objects[0].properties["question"].lower()
    # End test


    # ==============================================
    # ===== BM25 Query with Boosted Properties =====
    # ==============================================


    # BM25WithBoostedPropertiesPython
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.bm25(
        query="food",
        # highlight-start
        query_properties=["question^2", "answer"],
        # highlight-end
        limit=3
    )

    for o in response.objects:
        print(o.properties)
    # END BM25WithBoostedPropertiesPython

    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "food" in str(response.objects[0].properties).lower()
    # End test


    # ==================================
    # ===== BM25 multiple keywords =====
    # ==================================

    # START MultipleKeywords Python
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.bm25(
        # highlight-start
        query="food wine", # search for food or wine
        # highlight-end
        query_properties=["question"],
        limit=5
    )

    for o in response.objects:
        print(o.properties["question"])
    # END MultipleKeywords Python

    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    assert (
        ("food" in str(response.objects[0].properties).lower())
        or ("wine" in str(response.objects[0].properties).lower())
        )
    # End test


    # ==================================
    # ===== Basic BM25 With Filter =====
    # ==================================

    # BM25WithFilterPython
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.bm25(
        query="food",
        # highlight-start
        filters=wvc.query.Filter.by_property("round").equal("Double Jeopardy!"),
        # highlight-end
        return_properties=["answer", "question", "round"], # return these properties
        limit=3
    )

    for o in response.objects:
        print(o.properties)
    # END BM25WithFilterPython

    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    assert "food" in str(response.objects[0].properties).lower()
    assert response.objects[0].properties["round"] == "Double Jeopardy!"
    # End test

finally:
    client.close()
