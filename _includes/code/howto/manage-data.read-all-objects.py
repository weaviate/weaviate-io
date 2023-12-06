import weaviate

# Instantiate the client
client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
)

# ============================
# ===== Read all objects =====
# ============================

# START ReadAllProps
collection = client.collections.get("CollectionName")

# highlight-start
for item in collection.iterator():
# highlight-end
    print(print(item.uuid, item.properties))
# END ReadAllProps

# =========================================
# ===== Read all objects with Vectors =====
# =========================================

# START ReadAllVectors
collection = client.collections.get("CollectionName")

for item in collection.iterator(
    # highlight-start
    include_vector=True
    # highlight-end
):
    print(item.properties)
    # highlight-start
    print(item.vector)
    # highlight-end
# END ReadAllVectors

# =========================================
# ===== Read all objects with Tenants =====
# =========================================

# START ReadAllTenants
multi_collection = client.collections.get("MultiTenancyCollection")

# Get a list of tenants
# highlight-start
tenants = multi_collection.tenants.get()
# highlight-end

# Iterate thourgh tenants
for tenant_name in tenants.keys():
    # Iterate through objects within each tenant
    # highlight-start
    for item in multi_collection.with_tenant(tenant_name).iterator():
    # highlight-end
        print(f"{tenant_name}: {item.properties}")
# END ReadAllTenants