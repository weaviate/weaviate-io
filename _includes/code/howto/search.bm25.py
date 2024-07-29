# Howto: BM25 search - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_DEMO_URL"]
wcd_apikey = os.environ["WCD_DEMO_RO_KEY"]
openai_apikey = os.environ["OPENAI_APIKEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,
    auth_credentials=wcd_apikey,
    headers={
        "X-OpenAI-Api-Key": openai_apikey,
    }
)

# client = weaviate.connect_to_local(
#     headers={
#         "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
#     }
# )

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
from weaviate.classes.query import MetadataQuery

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.bm25(
    query="food",
    return_metadata=MetadataQuery(score=True),
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
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.bm25(
    query="safety",
    # highlight-start
    limit=3,
    offset=1
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
from weaviate.classes.query import MetadataQuery

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.bm25(
    query="safety",
    # highlight-start
    query_properties=["question"],
    # highlight-end
    return_metadata=MetadataQuery(score=True),
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
from weaviate.classes.query import Filter

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.bm25(
    query="food",
    # highlight-start
    filters=Filter.by_property("round").equal("Double Jeopardy!"),
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

# ==================================
# ===== BM25 groupBy  =====
# ==================================

# START BM25GroupByPy4
from weaviate.classes.query import GroupBy

jeopardy = client.collections.get("JeopardyQuestion")

# Grouping parameters
group_by = GroupBy(
    prop="round",  # group by this property
    objects_per_group=3,  # maximum objects per group
    number_of_groups=2,  # maximum number of groups
)

# Query
response = jeopardy.query.bm25(
    query="California",
    group_by=group_by
)

for grp_name, grp_content in response.groups.items():
    print(grp_name, grp_content.objects)
# END BM25GroupByPy4

assert len(response.groups) > 0
assert len(response.groups) <= 2
for grp_name, grp_content in response.groups.items():
    assert grp_content.number_of_objects <= 3
    assert grp_content.number_of_objects > 0

client.close()
