# TESTS NEED TO BE UPDATED

import json

# START-ANY
import os
import weaviate
import weaviate.classes as wvc
from weaviate.collections.classes.grpc import Sort

client = weaviate.connect_to_local()

# END-ANY

# Actual client instantiation
client.close()

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
    }
)

def test_gqlresponse(response_in, gqlresponse_in):
    for i, result in enumerate(response_in['data']['Get']['JeopardyQuestion']):
        assert result['question'] == gqlresponse_in['data']['Get']['JeopardyQuestion'][i]['question']


# START-ANY
try:
# END-ANY


    # ===================
    # ===== Limit =====
    # ===================

    # START LimitOnly
    articles = client.collections.get("Article")
    response = articles.query.fetch_objects(
        # highlight-start
        limit=5
        # highlight-end
    )

    for o in response.objects:
        print(f"Answer: {o.properties['title']}")
    # END LimitOnly

    assert len(response.objects) <= 5

    # ===================
    # ===== Limit with Offset =====
    # ===================

    # START LimitWithOffset
    articles = client.collections.get("Article")
    response = articles.query.fetch_objects(
        # highlight-start
        limit=5,
        offset=2
        # highlight-end
    )

    for o in response.objects:
        print(f"Answer: {o.properties['title']}")
    # END LimitWithOffset

    assert len(response.objects) <= 5

    # ===================
    # ===== Limit with After =====
    # ===================

    # START LimitWithAfter
    articles = client.collections.get("Article")
    response = articles.query.fetch_objects(
        # highlight-start
        limit=5,
        after="002d5cb3-298b-380d-addb-2e026b76c8ed"
        # highlight-end
    )

    for o in response.objects:
        print(f"Answer: {o.properties['title']}")
    # END LimitWithAfter

    assert len(response.objects) <= 5

    # ===================
    # ===== Sorting =====
    # ===================

    # START Sorting Python
    article=client.collections.get("JeopardyQuestion")
    response = article.query.fetch_objects(
        # highlight-start
        sort=Sort.by_property(name="answer", ascending=True),
        # highlight-end
        limit=3
    )

    for o in response.objects:
        print(f"Answer: {o.properties['answer']}")
        print(f"Points: {o.properties['points']}")
        print(f"Question: {o.properties['question']}")
    # END Sorting Python

    assert response.objects[0].properties['answer'] == '$5 (Lincoln Memorial in the background)'


    # ==========================================
    # ===== Sorting by multiple properties =====
    # ==========================================

    # START MultiplePropSorting Python
    questions=client.collections.get("JeopardyQuestion")
    response = questions.query.fetch_objects(
        # Note: To sort by multiple properties, chain the relevant `by_xxx` methods.
        sort=Sort.by_property(name="points", ascending=False).by_property(name="answer", ascending=True),
        limit=3
    )

    for o in response.objects:
        print(f"Answer: {o.properties['answer']}")
        print(f"Points: {o.properties['points']}")
        print(f"Question: {o.properties['question']}")
    # END MultiplePropSorting Python

    # TODO FIX TEST
    assert response.objects[0].properties["points"] == 10000
    # assert response['data']['Get']['JeopardyQuestion'][0]['question'].startswith('A flurry of ballerinas')


    # ===========================================
    # ===== Sorting by _additional property =====
    # ===========================================

    # START AdditionalPropSorting Python
    article=client.collections.get("JeopardyQuestion")
    response = article.query.fetch_objects(
        return_metadata=wvc.query.MetadataQuery(creation_time=True),
        sort=Sort.by_property(name="_creationTimeUnix", ascending=True),
        limit=3
    )

    for o in response.objects:
        print(f"Answer: {o.properties['answer']}")
        print(f"Points: {o.properties['points']}")
        print(f"Question: {o.properties['question']}")
        print(f"Creation time: {o.metadata.creation_time}")
    # END AdditionalPropSorting Python

    assert response.objects[0].metadata.creation_time != None

    # ===========================================
    # ===== Grouping similar objects =====
    # ===========================================

    # START MergingEntities
    article=client.graphql_raw_query(
    """
    {
        Get {
        Publication(
            group:{
            type: merge,
            force:0.05
            }
        ) {
            name
        }
        }
    }
    """
    )

    for a in article.get["Publication"]:
        print(a)
    # END MergingEntities

# START-ANY

finally:
    client.close()
# END-ANY