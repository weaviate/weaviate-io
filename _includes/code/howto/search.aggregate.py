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

    # ===============================
    # ===== meta count EXAMPLES =====
    # ===============================

    # MetaCount Python
    jeopardy = client.collections.get("JeopardyQuestion")
    # highlight-start
    response = jeopardy.aggregate.over_all(total_count=True)
    # highlight-end

    print(response.total_count)
    # END MetaCount Python

    # Tests
    assert response.total_count > 0
    # End test


    # ==================================
    # ===== Text property EXAMPLES =====
    # ==================================

    # TextProp Python
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.aggregate.over_all(
        # highlight-start
        return_metrics=wvc.query.Metrics("answer").text(
            top_occurrences_count=True,
            top_occurrences_value=True
        )
        # highlight-end
    )

    print(response.properties["answer"].top_occurrences)
    # END TextProp Python

    # Tests
    assert type(response.properties["answer"].top_occurrences) == list
    assert response.properties["answer"].top_occurrences[0].count > 0
    # End test


    # ====================================
    # ===== int property EXAMPLES =====
    # ====================================

    # IntProp Python
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.aggregate.over_all(
        # highlight-start
        # Use `.number` for floats (`NUMBER` datatype in Weaviate)
        return_metrics=wvc.query.Metrics("points").integer(sum_=True, maximum=True, minimum=True),
        # highlight-end
    )

    print(response.properties["points"].sum_)
    print(response.properties["points"].minimum)
    print(response.properties["points"].maximum)
    # END IntProp Python


    # Tests
    assert response.properties["points"].sum_ > 0
    assert response.properties["points"].maximum > 0
    # End test


    # ============================
    # ===== groupBy EXAMPLES =====
    # ============================

    # groupBy Python
    from weaviate.classes.aggregate import GroupByAggregate

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.aggregate.over_all(
        # highlight-start
        group_by=GroupByAggregate(prop="round")
        # highlight-end
    )

    # print rounds names and the count for each
    for group in response.groups:
        print(f"Value: {group.grouped_by.value} Count: {group.total_count}")
    # END groupBy Python


    # Tests
    assert response.groups[0].grouped_by.prop == "round"
    assert response.groups[0].total_count > 0
    # End test


    # =========================================
    # ===== nearTextWithLimit EXAMPLES =====
    # =========================================

    # nearTextWithLimit Python
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.aggregate.near_text(
        query="animals in space",
        # highlight-start
        object_limit=10,
        # highlight-end
        return_metrics=wvc.query.Metrics("points").number(sum_=True),
    )

    print(response.properties["points"].sum_)
    # END nearTextWithLimit Python


    # Tests
    assert response.properties["points"].sum_ > 0
    # End test


    # ============================
    # ===== nearTextWithDistance EXAMPLES =====
    # ============================

    # nearTextWithDistance Python
    import weaviate.classes as wvc

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.aggregate.near_text(
        query="animals in space",
        # highlight-start
        distance=0.19,
        # highlight-end
        return_metrics=wvc.query.Metrics("points").number(sum_=True),
    )

    print(response.properties["points"].sum_)
    # END nearTextWithDistance Python


    # Tests
    assert response.properties["points"].sum_ > 0
    # End test


    # =================================
    # ===== where filter EXAMPLES =====
    # =================================

    # whereFilter Python
    # highlight-start
    from weaviate.classes.query import Filter
    # highlight-end

    jeopardy = client.collections.get("JeopardyQuestion")
    response = jeopardy.aggregate.over_all(
        # highlight-start
        filters=Filter.by_property("round").equal("Final Jeopardy!"),
        # highlight-end
    )

    print(response.total_count)
    # END whereFilter Python


    # Tests
    assert response.total_count is not None
    # End test


finally:
    client.close()
