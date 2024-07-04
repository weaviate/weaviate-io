# Howto: Search -> Reranking - Python examples

import weaviate
from weaviate.auth import AuthApiKey
import os

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=AuthApiKey(os.getenv("WCD_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    }
)

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
from weaviate.classes.query import Rerank, MetadataQuery

jeopardy = client.collections.get("JeopardyQuestion")

response = jeopardy.query.near_text(
    query="flying",
    limit=10,
    rerank=Rerank(
        prop="question",
        query="publication"
    ),
    return_metadata=MetadataQuery(score=True)
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
from weaviate.classes.query import Rerank, MetadataQuery

jeopardy = client.collections.get("JeopardyQuestion")

response = jeopardy.query.bm25(
    query="paper",
    limit=10,
    rerank=Rerank(
        prop="question",
        query="publication"
    ),
    return_metadata=MetadataQuery(score=True)
)

for o in response.objects:
    print(o.properties)
    print(o.metadata.rerank_score)
# END bm25Rerank Python


# Tests
assert response.objects[0].collection == "JeopardyQuestion"
assert response.objects[0].metadata.score is not None
# End test


client.close()
