import weaviate
import weaviate_datasets as wd
import os

# Instantiate the client
client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

try:
    for dataset in [wd.WineReviews, wd.WineReviewsMT]:
        d = dataset()
        d.upload_dataset(client, overwrite=True)

    # ============================
    # ===== Read all objects =====
    # ============================

    # START ReadAllProps
    collection = client.collections.get("WineReview")

    # highlight-start
    for item in collection.iterator():
    # highlight-end
        print(print(item.uuid, item.properties))
    # END ReadAllProps

    # =========================================
    # ===== Read all objects with Vectors =====
    # =========================================

    # START ReadAllVectors
    collection = client.collections.get("WineReview")

    for item in collection.iterator(
        # highlight-start
        include_vector=True  # If using named vectors, you can specify ones to include e.g. ['title', 'body'], or True to include all
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
    multi_collection = client.collections.get("WineReviewMT")

    # Get a list of tenants
    # highlight-start
    tenants = multi_collection.tenants.get()
    # highlight-end

    # Iterate through tenants
    for tenant_name in tenants.keys():
        # Iterate through objects within each tenant
        # highlight-start
        for item in multi_collection.with_tenant(tenant_name).iterator():
        # highlight-end
            print(f"{tenant_name}: {item.properties}")
    # END ReadAllTenants

finally:
    client.close()
