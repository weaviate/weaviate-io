# ========================================
# GraphQLGetSimple
# ========================================

# START GraphQLGetSimple  # START ConsistencyExample
import weaviate
import weaviate.classes as wvc
import os

client = weaviate.connect_to_local()

# END GraphQLGetSimple  # END ConsistencyExample


# Actual client instantiation
client.close()

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

# START GraphQLGetSimple  # START ConsistencyExample
try:
# END GraphQLGetSimple  # END ConsistencyExample

    # START GraphQLGetSimple
    collection = client.collections.get("JeopardyQuestion")
    response = collection.query.fetch_objects()

    for o in response.objects:
        print(o.properties)  # Inspect returned objects
        # END GraphQLGetSimple

        # TEST
        assert type(o.properties) == dict


    # ========================================
    # GroupByExample
    # ========================================

    # START GroupByExample
    questions = client.collections.get("JeopardyQuestion")
    response = questions.query.near_text(
        query="animals",
        distance=0.2,
        group_by=wvc.query.GroupBy(
            prop="points",
            number_of_groups=3,
            objects_per_group=5
        )
    )

    for k, v in response.groups.items():  # View by group
        print(k, v)

    for o in response.objects:  # View by object
        print(o)

    # END GroupByExample

    # TEST
    assert type(response.objects[0].properties) == dict
    assert len(response.groups.keys()) == 3

    # ========================================
    # ConsistencyExample
    # ========================================

    # START ConsistencyExample
    questions = client.collections.get("JeopardyQuestion").with_consistency_level(consistency_level=wvc.config.ConsistencyLevel.QUORUM)
    response = collection.query.fetch_objects()

    for o in response.objects:
        print(o.properties)  # Inspect returned objects
        # END ConsistencyExample

        # TEST
        assert type(o.properties) == dict


    # ========================================
    # GetCrossRefProp
    # ========================================

    # START GetCrossRefProp
    questions = client.collections.get("JeopardyQuestion")
    response = questions.query.fetch_objects(
        return_references=wvc.query.QueryReference(
            link_on="hasCategory",
            return_properties=["title"]
        )
    )

    for o in response.objects:
        print(f"References for {o.uuid}")
        for ro in o.references["hasCategory"].objects:  # Inspect returned references
            print(ro.properties)
    # END GetCrossRefProp

    # TEST
    for o in response.objects:
        assert "hasCategory" in list(o.references.keys())
        #     "title" in ro.properties.keys()
        # assert "hasCategory" in o.references[0].keys()

# START GraphQLGetSimple  # START ConsistencyExample
finally:
    client.close()
# END GraphQLGetSimple  # END ConsistencyExample
