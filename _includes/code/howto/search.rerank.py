# Howto: Search -> Reranking - Python examples

import weaviate
import weaviate.classes as wvc
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    }
)

try:

    # ==================================
    # ===== nearText before rerank =====
    # ==================================

    # START nearText Python
    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.query.near_text(
        query="flying",
        limit=10,
    )

    for o in response.objects:
        print(o.properties)
    # END nearText Python


    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    # End test


    # =================================
    # ===== nearText after rerank =====
    # =================================

    # START nearTextRerank Python
    jeopardy = client.collections.get("JeopardyQuestion")

    response = jeopardy.query.near_text(
        query="flying",
        limit=10,
        rerank=wvc.query.Rerank(
            prop="question",
            query="publication"
        ),
        return_metadata=wvc.query.MetadataQuery(score=True)
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.score)
    # END nearTextRerank Python


    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    assert response.objects[0].metadata.score is not None
    # End test


    # ============================
    # ===== bm25 with rerank =====
    # ============================

    # START bm25Rerank Python
    jeopardy = client.collections.get("JeopardyQuestion")

    response = jeopardy.query.bm25(
        query="paper",
        limit=10,
        rerank=wvc.query.Rerank(
            prop="question",
            query="publication"
        ),
        return_metadata=wvc.query.MetadataQuery(score=True)
    )

    for o in response.objects:
        print(o.properties)
        print(o.metadata.rerank_score)
    # END bm25Rerank Python


    # Tests
    assert response.objects[0].collection == "JeopardyQuestion"
    assert response.objects[0].metadata.score is not None
    # End test


finally:
    client.close()
