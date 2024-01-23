# How-to: Manage-data -> Multi-tenancy operations - Python examples

import weaviate
import os

client = weaviate.Client(
    "http://localhost:8080",
    # auth_client_secret=weaviate.auth.AuthApiKey("learn-weaviate"),
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]
    }
)

class_name = "MultiTenancyCollection"  # aka JeopardyQuestion

if client.schema.exists(class_name):
    client.schema.delete_class(class_name)


# =====================
# ===== Enable MT =====
# =====================

# START EnableMultiTenancy
client.schema.create_class({
    "class": "MultiTenancyCollection",
    # highlight-start
    "multiTenancyConfig": {"enabled": True}
    # highlight-end
})
# END EnableMultiTenancy


# ================================
# ===== Add tenants to class =====
# ================================

# START AddTenantsToClass
from weaviate import Tenant

client.schema.add_class_tenants(
  class_name="MultiTenancyCollection",  # The class to which the tenants will be added
  tenants=[Tenant(name="tenantA"), Tenant(name="tenantB")]
)
# END AddTenantsToClass

# Test
the_class = client.schema.get(class_name)
assert the_class["multiTenancyConfig"] == {"enabled": True}


# ===================================
# ===== List tenants of a class =====
# ===================================

# START ListTenants
tenants = client.schema.get_class_tenants(
    class_name="MultiTenancyCollection"  # The class from which the tenants will be retrieved
)
# END ListTenants

# Test
assert Tenant(name="tenantA") in tenants
assert Tenant(name="tenantB") in tenants

# =======================================
# ===== Remove tenants from a class =====
# =======================================

# START RemoveTenants
client.schema.remove_class_tenants(
    class_name="MultiTenancyCollection",  # The class from which the tenants will be removed
    # highlight-start
    tenants=["tenantB", "tenantX"]  # The tenants to be removed. tenantX will be ignored.
    # highlight-end
)
# END RemoveTenants

# Test
tenants = client.schema.get_class_tenants(class_name)
assert tenants == [Tenant(name="tenantA")]


# ============================
# ===== Create MT object =====
# ============================

# START CreateMtObject
object_id = client.data_object.create(
      class_name="MultiTenancyCollection",  # The class to which the object will be added
      data_object={
          "question": "This vector DB is OSS & supports automatic property type inference on import"
      },
      # highlight-start
      tenant="tenantA"  # The tenant to which the object will be added
      # highlight-end
)
# END CreateMtObject

# Test
result = client.data_object.get(object_id, class_name=class_name, tenant="tenantA")
assert result["tenant"] == "tenantA"


# =====================
# ===== Search MT =====
# =====================

# START Search
result = (
    client.query.get("MultiTenancyCollection", ["question"])
    # highlight-start
    .with_tenant("tenantA")
    # highlight-end
    .do()
)
# END Search

# Test
assert "question" in result["data"]["Get"][class_name][0]


# ===============================
# ===== Add cross-reference =====
# ===============================

category_id = client.data_object.create(
      class_name="JeopardyCategory",
      data_object={
          "category": "Software"
      },
)

# START AddCrossRef
# Add the cross-reference property to the multi-tenancy class
client.schema.property.create("MultiTenancyCollection", {
    "name": "hasCategory",
    "dataType": ["JeopardyCategory"],
})

client.data_object.reference.add(
    from_uuid=object_id,  # MultiTenancyCollection object id (a Jeopardy question)
    from_class_name="MultiTenancyCollection",
    from_property_name="hasCategory",
    tenant="tenantA",
    to_class_name="JeopardyCategory",
    to_uuid=category_id
)
# END AddCrossRef

# Test
result = client.data_object.get(object_id, class_name=class_name, tenant="tenantA")
assert result["properties"]["hasCategory"][0]["href"] == f"/v1/objects/JeopardyCategory/{category_id}"
