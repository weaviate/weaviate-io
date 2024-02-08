# How-to: Manage-data -> Multi-tenancy operations - Python examples

import weaviate
import os

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

try:
    if client.collections.exists("MultiTenancyCollection"):
        client.collections.delete("MultiTenancyCollection")


    # =====================
    # ===== Enable MT =====
    # =====================

    # START EnableMultiTenancy
    import weaviate.classes as wvc

    multi_collection = client.collections.create(
        name="MultiTenancyCollection",
        # Enable multi-tenancy on the new collection
        # highlight-start
        multi_tenancy_config=wvc.config.Configure.multi_tenancy(True)
        # highlight-end
    )
    # END EnableMultiTenancy

    assert client.collections.exists("MultiTenancyCollection")


    # ================================
    # ===== Add tenants to class =====
    # ================================

    # START AddTenantsToClass
    import weaviate.classes as wvc

    # Add two tenants to the collection
    # highlight-start
    multi_collection.tenants.create(
        tenants=[
            wvc.tenants.Tenant(name="tenantA"),
            wvc.tenants.Tenant(name="tenantB"),
        ]
    )
    # highlight-end
    # END AddTenantsToClass

    # Test
    multi_collection = client.collections.get("MultiTenancyCollection")
    multi_config=multi_collection.config.get()
    assert multi_config.multi_tenancy_config.enabled == True


    # ===================================
    # ===== List tenants of a class =====
    # ===================================

    # START ListTenants
    multi_collection = client.collections.get("MultiTenancyCollection")
    # highlight-start
    tenants = multi_collection.tenants.get()
    # highlight-end

    print(tenants)
    # END ListTenants

    # Test
    assert "tenantA" in tenants
    assert "tenantB" in tenants

    # =======================================
    # ===== Remove tenants from a class =====
    # =======================================

    # START RemoveTenants
    multi_collection = client.collections.get("MultiTenancyCollection")

    # Remove a list of tenants - tenantX will be ignored.
    # highlight-start
    multi_collection.tenants.remove(["tenantB", "tenantX"])
    # highlight-end
    # END RemoveTenants

    # Test
    tenants = multi_collection.tenants.get()
    assert "tenantA" in tenants
    assert ("tenantB" in tenants) == False


    # =======================================
    # ===== Update tenant status =====
    # =======================================

    # START UpdateTenants
    multi_collection = client.collections.get("MultiTenancyCollection")
    # highlight-start
    multi_collection.tenants.update(tenants=[
        wvc.tenants.Tenant(
            name="tenantA",
            activity_status=weaviate.schema.TenantActivityStatus.COLD
        )
    ])
    # highlight-end

    # END UpdateTenants
    tenants = multi_collection.tenants.get()

    # Test
    tenants = multi_collection.tenants.get()
    assert tenants["tenantA"].activity_status.name == "COLD"

    # Change the status back
    multi_collection.tenants.update(tenants=[
        wvc.tenants.Tenant(
            name="tenantA",
            activity_status=weaviate.schema.TenantActivityStatus.HOT
        )
    ])
    tenants = multi_collection.tenants.get()
    assert tenants["tenantA"].activity_status.name == "HOT"


    # ============================
    # ===== Create MT object =====
    # ============================

    # START CreateMtObject
    multi_collection = client.collections.get("MultiTenancyCollection")

    # Get collection specific to the required tenant
    # highlight-start
    multi_tenantA = multi_collection.with_tenant("tenantA")
    # highlight-end

    # Insert an object to tenantA
    object_id = multi_tenantA.data.insert(
        properties={
            "question": "This vector DB is OSS & supports automatic property type inference on import"
        }
    )
    # END CreateMtObject

    # Test
    result = multi_tenantA.query.fetch_object_by_id(object_id)
    assert result != None


    # =====================
    # ===== Search MT =====
    # =====================

    # START Search
    import weaviate.classes as wvc

    multi_collection = client.collections.get("MultiTenancyCollection")

    # Get collection specific to the required tenant
    # highlight-start
    multi_tenantA = multi_collection.with_tenant("tenantA")
    # highlight-end

    # Query tenantA
    # highlight-start
    result = multi_tenantA.query.fetch_objects(
        limit=2,
    )
    # highlight-end

    print(result.objects[0].properties)
    # END Search

    # Test
    assert 'question' in result.objects[0].properties


    # ===============================
    # ===== Add cross-reference =====
    # ===============================

    jeopardy = client.collections.get("JeopardyCategory")
    category_id = jeopardy.data.insert(
        properties={
            "category": "Software"
        }
    )

    # START AddCrossRef
    import weaviate.classes as wvc

    multi_collection = client.collections.get("MultiTenancyCollection")
    # Add the cross-reference property to the multi-tenancy class
    multi_collection.config.add_reference(
        wvc.config.ReferenceProperty(
            name="hasCategory",
            target_collection="JeopardyCategory"
        )
    )

    # Get collection specific to the required tenant
    # highlight-start
    multi_tenantA = multi_collection.with_tenant(tenant="tenantA")
    # highlight-end

    # Add reference from MultiTenancyCollection object to a JeopardyCategory object
    # highlight-start
    multi_tenantA.data.reference_add(
    # highlight-end
        from_uuid=object_id,  # MultiTenancyCollection object id (a Jeopardy question)
        from_property="hasCategory",
        to=category_id # JeopardyCategory id
    )
    # END AddCrossRef

    # Test
    result = multi_tenantA.query.fetch_object_by_id(object_id)

    # TODO - investigate whether the code above is wrong or this is related to the client
    # assert result.references["hasCategory"][0]["href"] == f"/v1/objects/JeopardyCategory/{category_id}"

finally:
    client.close()
