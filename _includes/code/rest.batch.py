# START-ANY
import weaviate
import weaviate.classes as wvc
from weaviate.util import generate_uuid5

client = weaviate.connect_to_local()

try:
# END-ANY

    client.collections.delete(["Author", "Publication"])
    client.collections.create("Author")
    client.collections.create("Publication")

    authors = client.collections.get("Author")
    publications = client.collections.get("Publication")

    first_target_uuid = "36ddd591-2dee-4e7e-a3cc-eb86d30a4303"
    second_target_uuid = "36ddd591-2dee-4e7e-a3cc-eb86d30a4304"

    publications.data.insert(
        properties={"title": "New York Times"},
        uuid=first_target_uuid
    )
    publications.data.insert(
        properties={"title": "Wired"},
        uuid=second_target_uuid
    )


    # START BatchCreateObject
    first_object_props = {"name": "Jane Doe"}
    first_object_uuid = generate_uuid5(first_object_props)

    with client.batch.fixed_size(  # client.batch.dynamic() or client.batch.rate_limit() also possible
        batch_size=100,
        consistency_level=wvc.ConsistencyLevel.QUORUM
    ) as batch:
        # Add objects to the batch, e.g.
        batch.add_object(
            collection="Author",
            properties=first_object_props,
            uuid=first_object_uuid,
            # tenant="tenantA"  # Optional; specify the tenant in multi-tenancy collections
        )
    # END BatchCreateObject


    # START BatchCreateReference
    first_object_props = {"name": "Jane Doe"}
    first_object_uuid = generate_uuid5(first_object_props)

    with client.batch.fixed_size(  # client.batch.dynamic() or client.batch.rate_limit(requests_per_minute=<N>) also possible
        batch_size=100,
        consistency_level=wvc.ConsistencyLevel.QUORUM
    ) as batch:
        # Add references to the batch, e.g.
        batch.add_reference(
            from_collection="Author",
            from_property="writesFor",
            from_uuid=first_object_uuid,
            to=first_target_uuid,
            # tenant="tenantA"  # Optional; specify the tenant in multi-tenancy collections
        )
    # END BatchCreateReference


    # START BatchDeleteObjects
    authors = client.collections.get("Author")
    # authors = authors.with_tenant("tenantA")  # Optional; specify the tenant in multi-tenancy collections
    # authors = authors.with_consistency_level(wvc.config.ConsistencyLevel.QUORUM)  # Optional; specify the consistency level

    response = authors.data.delete_many(
        where=wvc.query.Filter.by_property("name").equal("Jane Doe"),
        verbose=True,
        dry_run=False,
    )

    print(f"Matched {response.matches} objects.")
    print(f"Deleted {response.successful} objects.")
    # END BatchDeleteObjects

    # Test
    assert response.matches > 0
    # End test

    # Cleanup
    client.collections.delete(["Author", "Publication"])


# START-ANY

finally:
    client.close()
# END-ANY
