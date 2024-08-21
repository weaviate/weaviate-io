# FullBasicMT
import weaviate
import os
from weaviate.classes.config import Configure, Property, DataType

client = weaviate.connect_to_local(
    headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    }
)

mt_collection_name = "JournalEntry"

# END FullBasicMT

client.collections.delete(mt_collection_name)

# ================================================================================
# MyPrivateJournal multi-tenancy configuration
# ================================================================================

client.close()

client = weaviate.connect_to_local(
    headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    }
)

client.collections.delete(mt_collection_name)

# MTConfig # MTFullCollectionCreation
from weaviate.classes.config import Configure, Property, DataType

mt_collection = client.collections.create(
    name=mt_collection_name,  # e.g. "JournalEntry"
    # highlight-start
    multi_tenancy_config=Configure.multi_tenancy(
        enabled=True,
        auto_tenant_creation=True,
        auto_tenant_activation=True,
    ),
    # highlight-end
    # END MTConfig # MTFullCollectionCreation
    properties=[
        Property(name="text", data_type=DataType.TEXT),
        Property(name="date", data_type=DataType.DATE),
        Property(name="tags", data_type=DataType.TEXT_ARRAY),
    ],
    # DynamicIndexConfig # MTFullCollectionCreation
    vectorizer_config=[
        Configure.NamedVectors.text2vec_cohere(
            name="text",
            source_properties=["text"],
            # highlight-start
            vector_index_config=Configure.VectorIndex.dynamic(
                hnsw=Configure.VectorIndex.hnsw(
                    quantizer=Configure.VectorIndex.Quantizer.sq(training_limit=50000)
                ),
                flat=Configure.VectorIndex.flat(
                    quantizer=Configure.VectorIndex.Quantizer.bq()
                ),
                threshold=10000
            )
            # highlight-end
        )
    ],
    # END DynamicIndexConfig # END MTVectorIndexConfig # MTFullCollectionCreation
    generative_config=Configure.Generative.cohere(model="command-r-plus")
    # MTConfig
)
# END MTConfig # END MTFullCollectionCreation














# ================================================================================
# Basic tenant creation
# ================================================================================

# FullBasicMT  # <--- Adds a blank line below for better readability

# BasicTenantCreation # FullBasicMT
# highlight-start
mt_collection.tenants.create(["bob1", "bob2", "alice1", "etienne1"])
# highlight-end
# END BasicTenantCreation # END FullBasicMT

# ================================================================================
# Basic data insertion
# ================================================================================

# BasicDataInsertion
from datetime import datetime, timezone

bob = mt_collection.with_tenant("bob1")

bob.data.insert(
    properties={
        "text": "I had a great cooking class experience today!",
        "date": datetime(2024, 5, 15).replace(tzinfo=timezone.utc),
        "tags": ["cooking", "hobby"],
    }
)
# END BasicDataInsertion

# ================================================================================
# Basic tenant interaction
# ================================================================================

# BasicTenantInteraction
bob = mt_collection.with_tenant("bob1")  # Collection object with tenant specified

# Example query.
# Note that it is identical to a single tenant query
response = bob.query.near_text(
    query="cooking class experience",  # Find journal entries about cooking classes
    limit=3,
)
# END BasicTenantInteraction

# ================================================================================
# Basic batch data insertion
# ================================================================================

from datetime import datetime, timezone

journal_entries = [
    {
        "text": "The Top Gun sequel was amazing!",
        "date": datetime(2022, 5, 30).replace(tzinfo=timezone.utc),
        "tags": ["movie", "action"],
    },
    {
        "text": "I went to a cooking class and learned how to make sushi!",
        "date": datetime(2024, 5, 16).replace(tzinfo=timezone.utc),
        "tags": ["cooking", "hobby"],
    },
    {
        "text": "The new taco place in town is amazing!",
        "date": datetime(2024, 7, 20).replace(tzinfo=timezone.utc),
        "tags": ["food", "restaurant"],
    },
]

# BasicBatchInsertion
from datetime import datetime

bob = mt_collection.with_tenant("bob1")

with bob.batch.fixed_size(100) as batch:
    for journal_entry in journal_entries:
        batch.add_object(journal_entry)
# END BasicBatchInsertion

# ================================================================================
# Basic query
# ================================================================================

# BasicMTQuery
bob = mt_collection.with_tenant("bob1")

response = bob.query.near_text(query="food experience", limit=2)

for obj in response.objects:
    print(obj.properties)
# END BasicMTQuery

"""
# ExampleResponseBasicMTQuery
{
    "date": datetime.datetime(2024, 5, 15, 0, 0, tzinfo=datetime.timezone.utc),
    "tags": ["cooking", "hobby"],
    "text": "I had a great cooking class experience today!",
}
{
    "date": datetime.datetime(2024, 5, 16, 0, 0, tzinfo=datetime.timezone.utc),
    "tags": ["cooking", "hobby"],
    "text": "I went to a cooking class and learned how to make sushi!",
}
# END ExampleResponseBasicMTQuery
"""




# ================================================================================
# Tenant creation and status
# ================================================================================

# TenantCreationWithStatus
from weaviate.classes.tenants import Tenant, TenantActivityStatus

mt_collection = client.collections.get(mt_collection_name)

mt_collection.tenants.create([
    "activeBob",
    Tenant(name="alsoActiveBob"),
    Tenant(name="anotherActiveBob", activity_status=TenantActivityStatus.ACTIVE),
    Tenant(name="inactiveBob", activity_status=TenantActivityStatus.INACTIVE),
])
# END TenantCreationWithStatus

for t in ["activeBob", "alsoActiveBob", "anotherActiveBob"]:
    assert mt_collection.tenants.get_by_name(t).activity_status == TenantActivityStatus.ACTIVE
assert mt_collection.tenants.get_by_name("inactiveBob").activity_status == TenantActivityStatus.INACTIVE

# ================================================================================
# Update tenant status
# ================================================================================

mt_collection.tenants.create(["bob1", "alice1", "etienne1"])

# UpdateTenantStatus
from weaviate.classes.tenants import Tenant, TenantActivityStatus

mt_collection = client.collections.get(mt_collection_name)

mt_collection.tenants.update([
    Tenant(name="bob1", activity_status=TenantActivityStatus.INACTIVE),
    Tenant(name="alice1", activity_status=TenantActivityStatus.OFFLOADED),
    Tenant(name="etienne1", activity_status=TenantActivityStatus.ACTIVE),
])
# END UpdateTenantStatus

# ================================================================================
# Remove tenants
# ================================================================================

# RemoveTenants
from weaviate.classes.tenants import Tenant

mt_collection = client.collections.get(mt_collection_name)

# Caution - this will remove all of the associated data for the tenants
mt_collection.tenants.remove([
    "bob1",
    Tenant(name="alice1"),
])
# END RemoveTenants

# ================================================================================
# Misc methods
# ================================================================================

#
mt_collection = client.collections.get(mt_collection_name)

all_tenants = mt_collection.tenants.get()
for k, v in all_tenants.items():
    print(k, v)

tenants = mt_collection.tenants.get_by_names(["bob1", "alice1"])
for k, v in tenants.items():
    print(k, v)

tenant = mt_collection.tenants.get_by_name("bob1")
print(tenant)

print(mt_collection.tenants.exists("etienne1"))

client.close()
