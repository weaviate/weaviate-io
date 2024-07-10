# START-ANY
# Note - The V4 Python client uses gRPC for object-related operations.
# The snippets shown are for the same functionality as the REST call.

import weaviate
# END-ANY

# START CreateSimpleCollection  # START CreateCollectionElaborate
import weaviate.classes as wvc
# END CreateSimpleCollection  # END CreateCollectionElaborate
# START-ANY

client = weaviate.connect_to_local()

try:
    # END-ANY


    from weaviate.util import generate_uuid5

    for c in ["Article", "Author", "Publication"]:
        client.collections.delete(c)

    client.collections.create(
        "Publication",
        properties=[
            wvc.config.Property(name="title", data_type=wvc.config.DataType.TEXT),
            wvc.config.Property(name="headquartersGeoLocation", data_type=wvc.config.DataType.GEO_COORDINATES)
        ],
    )

    client.collections.create(
        "Author",
        properties=[
            wvc.config.Property(name="name", data_type=wvc.config.DataType.TEXT),
        ],
        references=[
            wvc.config.ReferenceProperty(
                name="writesFor",
                target_collection="Publication"
            )
        ]
    )

    client.collections.create(
        "Article",
        properties=[
            wvc.config.Property(name="title", data_type=wvc.config.DataType.TEXT),
        ],
    )

    c = client.collections.get("Article")
    for i in range(50):
        c.data.insert(
            properties={"title": f"Article {i}"},
        )


    # ========================================
    # BasicFetchObjects
    # ========================================

    # START BasicFetchObjects
    articles = client.collections.get("Article")
    response = articles.query.fetch_objects()

    for o in response.objects:
        print(o.properties)
    # END BasicFetchObjects


    # ========================================
    # CreateObject
    # ========================================

    publications = client.collections.get("Publication")
    publications.data.insert(
        properties={"title": "TempPub"},
        uuid="f81bfe5e-16ba-4615-a516-46c2ae2e5a80",
    )

    # START CreateObject
    authors = client.collections.get("Author")
    obj_uuid = "36ddd591-2dee-4e7e-a3cc-eb86d30a4303"
    # articles = articles.with_consistency_level(wvc.config.ConsistencyLevel.ALL)  # If you want to set the consistency level

    authors.data.insert(
        properties={"name": "Jodi Kantor"},
        uuid=obj_uuid,
        # If you want to add a reference (and configured in the collection definition)
        # references={"writesFor": "f81bfe5e-16ba-4615-a516-46c2ae2e5a80"}
    )

    for o in response.objects:
        print(o.properties)
    # END CreateObject

    response = authors.query.fetch_object_by_id(obj_uuid)
    assert response.properties["name"] == "Jodi Kantor"
    authors.data.delete_by_id(obj_uuid)


    # ========================================
    # WithGeoCoordinates
    # ========================================

    # START WithGeoCoordinates
    publications = client.collections.get("Publication")

    publications.data.insert(
        properties={
            "headquartersGeoLocation": {
                "latitude": 52.3932696,
                "longitude": 4.8374263
            }
        },
    )
    # END WithGeoCoordinates

    response = publications.query.fetch_objects(
        filters=(
            wvc.query.Filter
            .by_property("headquartersGeoLocation")
            .within_geo_range(
                coordinate=wvc.data.GeoCoordinate(
                    latitude=52.39,
                    longitude=4.84
                ),
                distance=1000  # In meters
            )
        )
    )

    assert len(response.objects) == 1


    # ========================================
    # SpecifyVectorInObject
    # ========================================


    custom_uuid = generate_uuid5("CustomVectorObj")

    # START SpecifyVectorInObject
    authors = client.collections.get("Author")
    # authors = authors.with_consistency_level(wvc.config.ConsistencyLevel.ALL)  # If you want to set the consistency level

    authors.data.insert(
        properties={"name": "Custom Vector Author"},
        vector=[0.3] * 1536,  # If you want to specify a vector
        # END SpecifyVectorInObject
        uuid=custom_uuid,  # Custom UUID for testing
        # START SpecifyVectorInObject
        # references=wvc.data.Reference("f81bfe5e-16ba-4615-a516-46c2ae2e5a80"),  # If you want to add a reference (if configured in the collection definition)
    )

    for o in response.objects:
        print(o.properties)
    # END SpecifyVectorInObject

    response = authors.query.fetch_object_by_id(custom_uuid)
    assert response.properties["name"] == "Custom Vector Author"
    authors.data.delete_by_id(custom_uuid)


    # ========================================
    # GetAnObject
    # ========================================

    # START GetAnObject  # START CheckForAnObject
    object_uuid = generate_uuid5("SomeUUIDSeed")

    # END GetAnObject  # END CheckForAnObject

    authors.data.insert(
        properties={"name": "Author to fetch"},
        vector=[0.3] * 1536,  # If you want to specify a vector
        uuid=object_uuid,  # Custom UUID for testing
    )

    # START GetAnObject  # START CheckForAnObject
    authors = client.collections.get("Author")
    # authors = authors.with_consistency_level(wvc.config.ConsistencyLevel.ALL)  # If you want to set the consistency level

    fetched_obj = authors.query.fetch_object_by_id(uuid=object_uuid)  # If it does not exist, it will return None

    if fetched_obj is None:
        print("Object does not exist")
    else:
        print(fetched_obj.properties)
    # END GetAnObject  # END CheckForAnObject

    assert fetched_obj.properties["name"] == "Author to fetch"
    authors.data.delete_by_id(object_uuid)
    assert authors.query.fetch_object_by_id(object_uuid) is None


    # ========================================
    # CheckForAnObject
    # ========================================

    # TODO - check if a separate method exist for this. Reusing the code from GetAnObject for now.


    # ========================================
    # UpdateAnObject
    # ========================================

    client.collections.delete("Actor")
    client.collections.create(
        "Actor",
        properties=[
            wvc.config.Property(name="first_name", data_type=wvc.config.DataType.TEXT),
            wvc.config.Property(name="last_name", data_type=wvc.config.DataType.TEXT),
        ],
    )

    # START UpdateAnObject
    object_uuid = generate_uuid5("SomeUUIDSeed")

    actors = client.collections.get("Actor")
    # actors = actors.with_consistency_level(wvc.config.ConsistencyLevel.ALL)  # If you want to set the consistency level

    # ===== Insert the original object =====
    actors.data.insert(
        properties={
            "first_name": "Gary",
            "last_name": "Oldman",
        },
        vector=[0.3] * 1536,  # If you want to specify a vector
        uuid=object_uuid,
    )
    # END UpdateAnObject


    # Test insert
    my_actor = actors.query.fetch_object_by_id(uuid=object_uuid, include_vector=True)
    assert my_actor.properties["first_name"] == "Gary"
    assert my_actor.properties["last_name"] == "Oldman"
    assert round(my_actor.vector["default"][0], 1) == 0.3
    # END test


    # START UpdateAnObject

    # ===== To update an object =====
    actors.data.update(
        uuid=object_uuid,
        vector=[0.4] * 1536,  # If you want to specify a vector
        properties={"first_name": "Randy"},  # Only the first name will be updated
    )
    # END UpdateAnObject

    # Test update
    my_actor = actors.query.fetch_object_by_id(uuid=object_uuid, include_vector=True)
    assert my_actor.properties["first_name"] == "Randy"
    assert my_actor.properties["last_name"] == "Oldman"
    assert round(my_actor.vector["default"][0], 1) == 0.4
    # END test


    # START UpdateAnObject

    # ===== To replace an object =====
    actors.data.replace(  # This will replace the entire object
        uuid=object_uuid,
        vector=[0.5] * 1536,  # If you want to specify a vector
        properties={
            "first_name": "Randy",
            "last_name": "Newman",
        },
    )
    # END UpdateAnObject


    # Test replace
    my_actor = actors.query.fetch_object_by_id(uuid=object_uuid, include_vector=True)
    assert my_actor.properties["first_name"] == "Randy"
    assert my_actor.properties["last_name"] == "Newman"
    assert round(my_actor.vector["default"][0], 1) == 0.5
    # END test


    # ========================================
    # DeleteAnObject
    # ========================================

    assert actors.query.fetch_object_by_id(uuid=object_uuid) is not None

    # START DeleteAnObject
    actors = client.collections.get("Actor")
    # actors = actors.with_consistency_level(wvc.config.ConsistencyLevel.ALL)  # If you want to set the consistency level

    object_uuid = generate_uuid5("SomeUUIDSeed")

    actors.data.delete_by_id(object_uuid)
    # END DeleteAnObject

    assert actors.query.fetch_object_by_id(uuid=object_uuid) is None


    # ========================================
    # ValidateAnObject
    # ========================================

    # START ValidateAnObject
    # Coming soon
    # END ValidateAnObject


    # ========================================
    # AddReferenceToObject
    # ========================================


    authors = client.collections.get("Author")
    publications = client.collections.get("Publication")

    pub_uuid = generate_uuid5("SomePublication")
    publications.data.insert(
        properties={"name": "SomePublication"},
        uuid=pub_uuid,
        vector=[0.3] * 1536,  # If you want to specify a vector
    )
    author_uuid = generate_uuid5("SomeAuthor")
    authors.data.insert(
        properties={"name": "SomeAuthor"},
        uuid=author_uuid,
        vector=[0.3] * 1536,  # If you want to specify a vector
    )

    # START AddReferenceToObject
    authors = client.collections.get("Author")
    # authors = authors.with_consistency_level(wvc.config.ConsistencyLevel.ALL)  # If you want to set the consistency level

    authors.data.reference_add(
        from_uuid=author_uuid,
        from_property="writesFor",
        to=pub_uuid,
    )
    # END AddReferenceToObject


    # Test
    author_obj = authors.query.fetch_object_by_id(
        uuid=author_uuid,
        return_references=wvc.query.QueryReference(link_on="writesFor", return_properties=["name"])
    )
    assert author_obj.references["writesFor"].objects[0].properties["name"] == "SomePublication"
    # End test


    # ========================================
    # UpdateReferenceToObject
    # ========================================

    new_pub_names = ["AnotherPublication", "AnotherAnotherPublication"]
    new_uuids = list()
    for n in new_pub_names:
        p = generate_uuid5(n)
        new_uuids.append(p)

        publications.data.insert(
            properties={"name": n},
            uuid=p,
            vector=[0.3] * 1536,  # If you want to specify a vector
        )

    # START UpdateReferenceToObject
    authors = client.collections.get("Author")
    # authors = authors.with_consistency_level(wvc.config.ConsistencyLevel.ALL)  # If you want to set the consistency level

    authors.data.reference_replace(
        from_uuid=author_uuid,
        from_property="writesFor",
        to=new_uuids,  # Replace all references attached to the author_uuid
    )
    # END UpdateReferenceToObject


    # Test
    author_obj = authors.query.fetch_object_by_id(
        uuid=author_uuid,
        return_references=wvc.query.QueryReference(link_on="writesFor", return_properties=["name"])
    )
    for i, n in enumerate(new_pub_names):
        assert author_obj.references["writesFor"].objects[i].properties["name"] == n

    for n in new_uuids:
        authors.data.reference_delete(
            from_uuid=author_uuid,
            from_property="writesFor",
            to=n,
        )
        publications.data.delete_by_id(n)
    # End test



    # ========================================
    # DeleteReferenceToObject
    # ========================================


    # Test
    authors.data.reference_add(
        from_uuid=author_uuid,
        from_property="writesFor",
        to=pub_uuid,
    )
    author_obj = authors.query.fetch_object_by_id(
        uuid=author_uuid,
        return_references=wvc.query.QueryReference(link_on="writesFor", return_properties=["name"])
    )
    assert len(author_obj.references["writesFor"].objects) == 1
    # End test

    # START DeleteReferenceToObject
    pub_uuid = generate_uuid5("SomePublication")

    authors = client.collections.get("Author")
    # authors = authors.with_consistency_level(wvc.config.ConsistencyLevel.ALL)  # If you want to set the consistency level

    authors.data.reference_delete(
        from_uuid=author_uuid,
        from_property="writesFor",
        to=pub_uuid,  # Replace all references attached to the author_uuid
    )
    # END DeleteReferenceToObject


    # Test
    author_obj = authors.query.fetch_object_by_id(
        uuid=author_uuid,
        return_references=wvc.query.QueryReference(link_on="writesFor", return_properties=["name"])
    )
    assert len(author_obj.references["writesFor"].objects) == 0
    # End test


# START-ANY

finally:
    client.close()
# END-ANY
