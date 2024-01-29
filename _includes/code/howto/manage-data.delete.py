# How-to: Manage-data -> Update objects - Python examples
import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

client = weaviate.connect_to_local()

try:
    client.collections.delete("EphemeralObject")
    client.collections.create("EphemeralObject")

    # =========================
    # ===== Delete object =====
    # =========================

    # START DeleteObject
    uuid_to_delete = "..."  # replace with the id of the object you want to delete
    # END DeleteObject

    collection = client.collections.get("EphemeralObject")
    uuid_to_delete = collection.data.insert({
        "name": "EphemeralObjectA",
    })

    # Test insertion
    assert collection.query.fetch_object_by_id(uuid_to_delete)  # Should not fail if object exists

    # START DeleteObject

    collection = client.collections.get("EphemeralObject")
    collection.data.delete_by_id(
        uuid_to_delete
    )
    # END DeleteObject

    # Test
    response = collection.query.fetch_object_by_id(uuid_to_delete)  # Should return None
    assert response == None


    # # ==========================
    # # ===== Error handling =====
    # # ==========================

    # # START DeleteError
    # try:
    #     client.data_object.delete(
    #         uuid=uuid_to_delete,
    #         collection_name="EphemeralObject",
    #     )
    #     # Returns None on success
    # except weaviate.exceptions.UnexpectedStatusCodeException as e:
    #     # 404 error if the id was not found
    #     print(e)
    # # END DeleteError
    #     # Test
    #     assert e.status_code == 404


    # ========================
    # ===== Batch delete =====
    # ========================
    N = 5
    for i in range(N):
        collection.data.insert({
            "name": f"EphemeralObject_{i}",
        })

    # Test insertion
    response = collection.aggregate.over_all(total_count=True)
    assert response.total_count == 5

    # START DeleteBatch
    import weaviate.classes as wvc

    collection = client.collections.get("EphemeralObject")
    collection.data.delete_many(
        # highlight-start
        where=wvc.query.Filter.by_property("name").like("EphemeralObject*")
        # highlight-end
    )
    # END DeleteBatch

    # Test deletion
    response = collection.aggregate.over_all(total_count=True)
    assert response.total_count == 0


    # ============================
    # ====== Delete Contains =====
    # ============================

    collection.data.insert_many([{
        "name": "asia",
    },{
        "name": "europe"
    }])

    # START DeleteContains
    import weaviate.classes as wvc

    collection = client.collections.get("EphemeralObject")
    collection.data.delete_many(
        # highlight-start
        where=wvc.query.Filter.by_property("name").contains_any(["europe", "asia"])
        # highlight-end
    )
    # END DeleteContains


    # ===================
    # ===== Dry run =====
    # ===================

    client.collections.delete("EphemeralObject")
    client.collections.create("EphemeralObject")

    collection = client.collections.get("EphemeralObject")

    N = 5
    for i in range(N):
        collection.data.insert({
            "name": f"EphemeralObject_{i}",
        })

    # START DryRun
    import weaviate.classes as wvc

    collection = client.collections.get("EphemeralObject")
    result = collection.data.delete_many(
        where=wvc.query.Filter.by_property("name").like("EphemeralObject*"),
        # highlight-start
        dry_run=True,
        verbose=True
        # highlight-end
    )

    print(result)
    # END DryRun

    assert result.matches == N
    assert collection.aggregate.over_all(total_count=True).total_count == N

    # =================================
    # ===== Batch delete with IDs =====
    # =================================
    client.collections.delete("EphemeralObject")
    client.collections.create("EphemeralObject")

    N = 5
    for i in range(N):
        collection.data.insert({
            "name": f"EphemeralObject_{i}",
        })

    # Test insertion
    response = collection.aggregate.over_all(total_count=True)
    assert response.total_count == 5

    collection = client.collections.get("EphemeralObject")
    response = collection.query.fetch_objects(limit=3)
    ids = [o.uuid for o in response.objects]

    # START DeleteByIDBatch
    import weaviate.classes as wvc

    collection = client.collections.get("EphemeralObject")

    response = collection.query.fetch_objects(limit=3)  # Fetch 3 object IDs
    ids = [o.uuid for o in response.objects]  # These can be lists of strings, or `UUID` objects

    collection.data.delete_many(
        # highlight-start
        where=wvc.query.Filter.by_id().contains_any(ids)  # Delete the 3 objects
        # highlight-end
    )
    # END DeleteByIDBatch

    # Test deletion
    response = collection.aggregate.over_all(total_count=True)
    assert response.total_count == 2

finally:
    client.close()
