# How-to: Manage-data -> Multi-tenancy operations - Python examples

import weaviate
import os

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

if client.collections.exists("MultiTenancyCollection"):
    client.collections.delete("MultiTenancyCollection")

# =====================
# ===== Enable MT =====
# =====================

# START EnableMultiTenancy
from weaviate.classes.config import Configure

multi_collection = client.collections.create(
    name="MultiTenancyCollection",
    # Enable multi-tenancy on the new collection
    # highlight-start
    multi_tenancy_config=Configure.multi_tenancy(enabled=True)
    # highlight-end
)
# END EnableMultiTenancy

assert client.collections.exists("MultiTenancyCollection")

# ==========================
# ===== Enable Auto MT =====
# ==========================

if (client.collections.exists("CollectionWithAutoMTEnabled")):
    client.collections.delete("CollectionWithAutoMTEnabled")

# START EnableAutoMT
from weaviate.classes.config import Configure

multi_collection = client.collections.create(
    name="CollectionWithAutoMTEnabled",
    # Enable automatic tenant creation
    # highlight-start
    multi_tenancy_config=Configure.multi_tenancy(
        enabled=True,
        auto_tenant_creation=True
    )
    # highlight-end
)
# END EnableAutoMT

assert multi_collection.config.get().multi_tenancy_config.auto_tenant_creation == True

# ==========================
# ===== Update Auto MT =====
# ==========================

collection_name = "MTCollectionNoAutoMT"
client.collections.delete(collection_name)

collection = client.collections.create(
    name=collection_name,
    multi_tenancy_config=Configure.multi_tenancy(enabled=True, auto_tenant_creation=False)
)

assert collection.config.get().multi_tenancy_config.auto_tenant_creation == False

# START UpdateAutoMT
from weaviate.classes.config import Reconfigure

collection = client.collections.get(collection_name)

# highlight-start
collection.config.update(
    multi_tenancy_config=Reconfigure.multi_tenancy(auto_tenant_creation=True)
)
# highlight-end
# END UpdateAutoMT

assert collection.config.get().multi_tenancy_config.auto_tenant_creation == True

# =====================================
# ===== Add tenants to collection =====
# =====================================

multi_collection = client.collections.get("MultiTenancyCollection")

# START AddTenantsToClass
from weaviate.classes.tenants import Tenant

# Add two tenants to the collection
# highlight-start
multi_collection.tenants.create(
    tenants=[
        Tenant(name="tenantA"),
        Tenant(name="tenantB"),
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

# ===================================
# ===== Get tenants by name =====
# ===================================

# START GetTenantsByName
multi_collection = client.collections.get("MultiTenancyCollection")

# highlight-start
tenant_names = ["tenantA", "tenantB", "nonExistentTenant"]  # `nonExistentTenant`` does not exist and will be ignored
tenants_response = multi_collection.tenants.get_by_names(tenant_names)
# highlight-end

for k, v in tenants_response.items():
    print(k, v)
# END GetTenantsByName

# Test
for k, v in tenants_response.items():
    assert k in tenant_names

# ===================================
# ===== Get a tenant =====
# ===================================

tenant_name = "tenantA"

# START GetOneTenant
multi_collection = client.collections.get("MultiTenancyCollection")

# highlight-start
tenant_obj = multi_collection.tenants.get_by_name(tenant_name)
# highlight-end

print(tenant_obj.name)
# END GetOneTenant

# Test
assert tenant_obj.name == tenant_name

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
from weaviate.classes.tenants import Tenant, TenantActivityStatus

multi_collection = client.collections.get("MultiTenancyCollection")
# highlight-start
multi_collection.tenants.update(tenants=[
    Tenant(
        name="tenantA",
        activity_status=TenantActivityStatus.INACTIVE
    )
])
# highlight-end

# END UpdateTenants
tenants = multi_collection.tenants.get()

# Test
tenants = multi_collection.tenants.get()
assert tenants["tenantA"].activity_status.name == "INACTIVE"

# Change the status back
multi_collection.tenants.update(tenants=[
    Tenant(
        name="tenantA",
        activity_status=TenantActivityStatus.ACTIVE
    )
])
tenants = multi_collection.tenants.get()
assert tenants["tenantA"].activity_status.name == "ACTIVE"

# ==========================
# ===== Enable Auto Tenant Activation =====
# ==========================

client.collections.delete("CollectionWithAutoTenantActivation")

# START EnableAutoActivation
from weaviate.classes.config import Configure

multi_collection = client.collections.create(
    name="CollectionWithAutoTenantActivation",
    # highlight-start
    multi_tenancy_config=Configure.multi_tenancy(
        enabled=True,
        auto_tenant_activation=True  # Enable automatic tenant activation
    )
    # highlight-end
)
# END EnableAutoActivation

assert multi_collection.config.get().multi_tenancy_config.auto_tenant_activation == True

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
from weaviate.classes.config import ReferenceProperty

multi_collection = client.collections.get("MultiTenancyCollection")
# Add the cross-reference property to the multi-tenancy class
multi_collection.config.add_reference(
    ReferenceProperty(
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

client.close()
