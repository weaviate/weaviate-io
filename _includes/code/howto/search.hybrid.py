# Howto: Hybrid search - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
from weaviate.auth import AuthApiKey
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=AuthApiKey(os.getenv("WCD_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    },
)

# client = weaviate.connect_to_local(
#     headers={
#         "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
#     }
# )

# ==============================
# ===== Named Vector Hybrid Query =====
# ==============================

# NamedVectorHybridPython
reviews = client.collections.get("WineReviewNV")
# highlight-start
response = reviews.query.hybrid(
    query="A French Riesling",
    target_vector="title_country",
    limit=3
)
# highlight-end

for o in response.objects:
    print(o.properties)
# END NamedVectorHybridPython

# Tests
assert response.objects[0].collection == "WineReviewNV"
# End test


# ==============================
# ===== Basic Hybrid Query =====
# ==============================

# HybridBasicPython
jeopardy = client.collections.get("JeopardyQuestion")
# highlight-start
response = jeopardy.query.hybrid(query="food", limit=3)
# highlight-end

for o in response.objects:
    print(o.properties)
# END HybridBasicPython

# Tests
assert response.objects[0].collection == "JeopardyQuestion"
# End test


# =======================================
# ===== Hybrid Query with the Score =====
# =======================================

# HybridWithScorePython
from weaviate.classes.query import MetadataQuery

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
    alpha=0.5,
    # highlight-start
    return_metadata=MetadataQuery(score=True, explain_score=True),
    # highlight-end
    limit=3,
)

for o in response.objects:
    print(o.properties)
    # highlight-start
    print(o.metadata.score, o.metadata.explain_score)
    # highlight-end
# END HybridWithScorePython

# Tests
assert response.objects[0].collection == "JeopardyQuestion"
assert response.objects[0].metadata.score is not None
assert response.objects[0].metadata.explain_score is not None
# End test


# ===================================
# ===== Hybrid Query with limit =====
# ===================================

# START limit Python
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
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
assert len(response.objects) == 3
# End test


# =====================================
# ===== Hybrid Query with autocut =====
# =====================================

# START autocut Python
from weaviate.classes.query import HybridFusion

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
    # highlight-start
    fusion_type=HybridFusion.RANKED,
    auto_limit=1
    # highlight-end
)

for o in response.objects:
    print(o.properties)
# END autocut Python

# Tests
assert response.objects[0].collection == "JeopardyQuestion"
# End test


# ===================================
# ===== Hybrid Query with Alpha =====
# ===================================

# HybridWithAlphaPython
client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
    # highlight-start
    alpha=0.25,
    # highlight-end
    limit=3,
)

for o in response.objects:
    print(o.properties)
# END HybridWithAlphaPython

# Tests
assert response.objects[0].collection == "JeopardyQuestion"
# End test


# ========================================
# ===== Hybrid Query with FusionType =====
# ========================================

# HybridWithFusionTypePython
# highlight-start
from weaviate.classes.query import HybridFusion
# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
    # highlight-start
    fusion_type=HybridFusion.RELATIVE_SCORE,
    # highlight-end
    limit=3,
)

for o in response.objects:
    print(o.properties)
# END HybridWithFusionTypePython

# Tests
assert response.objects[0].collection == "JeopardyQuestion"
# End test


# ==================================================
# ===== Hybrid Query with Properties Specified =====
# ==================================================

# HybridWithPropertiesPython
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
    # highlight-start
    query_properties=["question"],
    # highlight-end
    alpha=0.25,
    limit=3,
)

for o in response.objects:
    print(o.properties)
# END HybridWithPropertiesPython

# Tests
assert response.objects[0].collection == "JeopardyQuestion"
# End test


# ====================================================
# ===== Hybrid Query with Properties & Weighting =====
# ====================================================

# HybridWithPropertyWeightingPython
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
    # highlight-start
    query_properties=["question^2", "answer"],
    # highlight-end
    alpha=0.25,
    limit=3,
)

for o in response.objects:
    print(o.properties)
# END HybridWithPropertyWeightingPython

# Tests
assert response.objects[0].collection == "JeopardyQuestion"
# End test


# ====================================
# ===== Hybrid Query With Vector =====
# ====================================

# HybridWithVectorPython
query_vector = [-0.02] * 1536  # Some vector that is compatible with object vectors

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
    # highlight-start
    vector=query_vector,
    # highlight-end
    alpha=0.25,
    limit=3,
)

for o in response.objects:
    print(o.properties)
# END HybridWithVectorPython

# Tests
assert response.objects[0].collection == "JeopardyQuestion"
# End test


# ===================================
# ===== Hybrid Query with Where =====
# ===================================

# HybridWithFilterPython
# highlight-start
from weaviate.classes.query import Filter

# highlight-end

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="food",
    # highlight-start
    filters=Filter.by_property("round").equal("Double Jeopardy!"),
    # highlight-end
    limit=3,
)

for o in response.objects:
    print(o.properties)
# END HybridWithFilterPython

# Tests
assert response.objects[0].collection == "JeopardyQuestion"
assert response.objects[0].properties["round"] == "Double Jeopardy!"
# End test

# =========================================
# ===== Hybrid with vector similarity =====
# =========================================

# START VectorSimilarityPython
from weaviate.classes.query import HybridVector, Move, HybridFusion

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    query="California",
    # highlight-start
    vector=HybridVector.near_text(
        query="large animal",
        move_away=Move(force=0.5, concepts=["mammal", "terrestrial"]),
    ),
    # highlight-end
    alpha=0.75,
    limit=5,
)
# END VectorSimilarityPython

assert len(response.objects) <= 5
assert len(response.objects) > 0

# =========================================
# ===== Hybrid with groupBy =====
# =========================================

from weaviate.classes.query import GroupBy

# START HybridGroupByPy4
# Grouping parameters
group_by = GroupBy(
    prop="round",  # group by this property
    objects_per_group=3,  # maximum objects per group
    number_of_groups=2,  # maximum number of groups
)

# Query
jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.hybrid(
    alpha=0.75,
    query="California",
    group_by=group_by
)

for grp_name, grp_content in response.groups.items():
    print(grp_name, grp_content.objects)
# END HybridGroupByPy4

assert len(response.groups) <= 2
assert len(response.groups) > 0
for grp_name, grp_content in response.groups.items():
    assert grp_content.number_of_objects <= 3
    assert grp_content.number_of_objects > 0

client.close()
