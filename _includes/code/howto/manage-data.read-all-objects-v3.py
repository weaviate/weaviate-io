import weaviate

# Instantiate the client
client = weaviate.Client(
    url="https://",  # Replace with your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # If auth enabled. Replace with your Weaviate instance API key
)

# ============================
# ===== Read all objects =====
# ============================

# START ReadAllProps
# STEP 1 - Prepare a helper function to iterate through data in batches
def get_batch_with_cursor(collection_name, batch_size, cursor=None):
    # First prepare the query to run through data
    query = (
        client.query.get(
            collection_name,         # update with your collection name
            ["title", "description"] # update with the required properties
        )
        # highlight-start
        .with_additional(["id"])
        # highlight-end
        .with_limit(batch_size)
    )

    # Fetch the next set of results
    # highlight-start
    if cursor is not None:
        result = query.with_after(cursor).do()
    # highlight-end
    # Fetch the first set of results
    # highlight-start
    else:
        result = query.do()
    # highlight-end

    return result["data"]["Get"][collection_name]

# STEP 2 - Iterate through the data
cursor = None
while True:
    # Get the next batch of objects
    next_batch = get_batch_with_cursor("CollectionName", 100, cursor)

    # Break the loop if empty – we are done
    if len(next_batch) == 0:
        break

    # Here is your next batch of objects
    print(next_batch)

    # Move the cursor to the last returned uuid
    cursor=next_batch[-1]["_additional"]["id"]
# END ReadAllProps

# =========================================
# ===== Read all objects with Vectors =====
# =========================================

# START ReadAllVectors
# STEP 1 - Prepare a helper function to iterate through data in batches
def get_batch_with_cursor(collection_name, batch_size, cursor=None):
    # First prepare the query to run through data
    query = (
        client.query.get(
            collection_name,         # update with your collection name
            ["title", "description"] # update with the required properties
        )
        # highlight-start
        .with_additional(["id vector"])
        # highlight-end
        .with_limit(batch_size)
    )

    # Fetch the next set of results
    if cursor is not None:
        result = query.with_after(cursor).do()
    # Fetch the first set of results
    else:
        result = query.do()

    return result["data"]["Get"][collection_name]

# STEP 2 - Iterate through the data
cursor = None
while True:
    # Get the next batch of objects
    next_batch = get_batch_with_cursor("CollectionName", 100, cursor)

    # Break the loop if empty – we are done
    if len(next_batch) == 0:
        break

    # Here is your next batch of objects
    print(next_batch)

    # Move the cursor to the last returned uuid
    cursor=next_batch[-1]["_additional"]["id"]
# END ReadAllVectors

# =========================================
# ===== Read all objects with Tenants =====
# =========================================

# START ReadAllTenants
# STEP 1 - Prepare a helper function to iterate through data in batches
def get_batch_with_cursor(collection_name, tenant_name, batch_size, cursor):
    # First prepare the query to run through data
    query = (
        client.query.get(
            collection_name,         # update with your collection name
            ["title", "description"] # update with the required properties
        )
        # highlight-start
        .with_tenant(tenant_name)     # tenant name goes here
        # highlight-end
        .with_additional(["id"])
        .with_limit(batch_size)
    )

    # Fetch the next set of results
    if cursor is not None:
        result = query.with_after(cursor).do()
    # Fetch the first set of results
    else:
        result = query.do()

    return result["data"]["Get"]["MultiTenancyCollection"]

# Get Tenants
# highlight-start
tenants = client.schema.get_class_tenants(
    class_name="MultiTenancyCollection"  # The class from which the tenants will be retrieved
)
# highlight-end

# STEP 2 - Iterate through Tenants
for tenant in tenants:
    # Reset the cursor to the beginning
    cursor = None
    while True:
        # Get the next batch of objects
        # highlight-start
        next_batch = get_batch_with_cursor("MultiTenancyCollection", tenant.name, 100, cursor)
        # highlight-end

        # Break the loop if empty – we are done
        if len(next_batch) == 0:
            break

        # Here is your next batch of objects
        print(next_batch)

        # Move the cursor to the last returned uuid
        cursor=next_batch[-1]["_additional"]["id"]
# END ReadAllTenants