# Howto: Search -> Reranking - Python examples

import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]
cohere_apikey = os.environ["COHERE_APIKEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
    headers={
        "X-OpenAI-Api-Key": openai_api_key,
        "X-Cohere-Api-Key": cohere_apikey,
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
