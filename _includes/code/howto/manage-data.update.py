# How-to: Manage-data -> Update objects - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import weaviate.classes as wvc
import weaviate_datasets as wd

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

d = wd.WineReviewsNV()
d.upload_dataset(client, overwrite=True)

try:

    # ============================
    # ===== Define the class =====
    # ============================

    # Clean slate
    if client.collections.exists("JeopardyQuestion"):
        client.collections.delete("JeopardyQuestion")

    client.collections.create(
        name="JeopardyQuestion",
        description="A Jeopardy! question",
        vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai()
    )

    # =============================
    # ===== Update properties =====
    # =============================

    # UpdateProps START
    uuid = "..."  # replace with the id of the object you want to update

    # UpdateProps END

    # Actually get the ID for testing
    jeopardy = client.collections.get("JeopardyQuestion")

    uuid = jeopardy.data.insert({
        "question": "Test question",
        "answer": "Test answer",
        "points": -1,
    })

    # UpdateProps START
    jeopardy = client.collections.get("JeopardyQuestion")
    jeopardy.data.update(
        uuid=uuid,
        # highlight-start
        properties={
            "points": 100,
        }
        # highlight-end
    )
    # UpdateProps END

    # Test
    result = jeopardy.query.fetch_object_by_id(uuid)
    assert result.properties["points"] == 100

    # =========================
    # ===== Update vector =====
    # =========================
    # UpdateVector START
    jeopardy = client.collections.get("JeopardyQuestion")
    jeopardy.data.update(
        uuid=uuid,
        properties={
            "points": 100,
        },
        # highlight-start
        vector=[0.12345] * 1536
        # highlight-end
    )
    # UpdateVector END

    # Test
    result = jeopardy.query.fetch_object_by_id(uuid, include_vector=True)
    assert len(result.vector["default"]) == 1536
    assert str(result.vector["default"][0])[:5] == str(0.123)


    # ================================
    # ===== Update named vectors =====
    # ================================

    # Commented as updating named vectors is not yet available in the Python client
    # reviews = client.collections.get("WineReviewNV")
    # review_uuid = reviews.query.fetch_objects(limit=1).objects[0].uuid


    # # UpdateNamedVector START
    # reviews = client.collections.get("WineReviewNV")
    # reviews.data.update(
    #     uuid=review_uuid,
    #     properties={
    #         "title": "A delicious wine",
    #         "review_body": "This mystery wine is a delight to the senses.",
    #         "country": "Mordor"
    #     },
    #     # highlight-start
    #     vector={
    #         "title": [0.12345] * 1536,
    #         "review_body": [0.54321] * 1536,
    #         "title_country": [0.050505] * 1536,
    #     }
    #     # highlight-end
    # )
    # # UpdateVector END

    # # Test
    # result = jeopardy.query.fetch_object_by_id(uuid, include_vector=True)
    # for vn in ["title", "review_body", "title_country"]:
    #     assert len(result.vector[vn]) == 1536
    # assert str(result.vector["title_country"][0])[:5] == str(0.050)


    # ==========================
    # ===== Replace object =====
    # ==========================
    # Replace START
    jeopardy = client.collections.get("JeopardyQuestion")
    # highlight-start
    jeopardy.data.replace(
    # highlight-end
        uuid=uuid,
        properties={
            "answer": "Replaced",
            # The other properties will be deleted
        },
    )
    # Replace END

    # Test
    result = jeopardy.query.fetch_object_by_id(uuid)
    assert result.properties["answer"] == "Replaced"
    assert result.properties["points"] == None  # ensure the other props were deleted
    assert result.properties["question"] == None  # ensure the other props were deleted


    # =============================
    # ===== Delete properties =====
    # =============================

    # DelProps START
    from typing import List
    from weaviate import WeaviateClient

    def del_props(client: WeaviateClient, uuid_to_update: str, collection_name: str, prop_names: List[str]) -> None:
        collection = client.collections.get(collection_name)

        # fetch the object to update
        object_data = collection.query.fetch_object_by_id(uuid_to_update)
        properties_to_update = object_data.properties

        # remove unwanted properties
        for prop_name in prop_names:
            if prop_name in properties_to_update:
                del properties_to_update[prop_name]

        # replace the properties
        collection.data.replace(
            uuid=uuid_to_update,
            properties=properties_to_update
        )


    uuid = "..."  # replace with the id of the object you want to delete properties from
    # DelProps END

    uuid = result.uuid  # Get the ID for testing

    # DelProps START
    del_props(client, uuid, "JeopardyQuestion", ["answer"])
    # DelProps END

    # Test
    result = jeopardy.query.fetch_object_by_id(uuid)
    assert result.properties["answer"] == None

finally:
    client.close()
