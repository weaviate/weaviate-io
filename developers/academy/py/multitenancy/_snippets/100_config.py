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

# BasicTenantCreation
# highlight-start
mt_collection.tenants.create("steve85")  # Create a tenant, e.g. based on a username
# highlight-end
# END BasicTenantCreation

# MultiTenantCreation
new_usernames = ["bob1", "alice2", "etienne3"]

# highlight-start
mt_collection.tenants.create(new_usernames)  # Create multiple tenants
# highlight-end
# END MultiTenantCreation

# ================================================================================
# Single object insertion
# ================================================================================

# SingleObjectInsertion
from datetime import datetime, timezone

# Start with the collection object and specify the tenant
tenant = mt_collection.with_tenant("steve85")

tenant.data.insert(
    properties={
        "text": "What amazing food we had at Quay! It was totally worth it.",
        "date": datetime(2024, 5, 15).replace(tzinfo=timezone.utc),
        "tags": ["restaurant", "experience"],
    }
)
# END SingleObjectInsertion

# ================================================================================
# Batch data insertion
# ================================================================================

# BatchDataToInsert
from datetime import datetime, timezone

journal_entries = [
    {
        "text": "The Top Gun sequel was amazing!",
        "date": datetime(2022, 5, 30).replace(tzinfo=timezone.utc),
        "tags": ["movie", "action"],
    },
    {
        "text": "Ahhh the Taylor Swift Eras concert in Denver was sooo much better than I could have hoped for!",
        "date": datetime(2023, 7, 14).replace(tzinfo=timezone.utc),
        "tags": ["music", "swifties", "concert"],
    },
    {
        "text": "After watching Kate McKinnon play Weird Barbie I totally feel seen.",
        "date": datetime(2023, 7, 25).replace(tzinfo=timezone.utc),
        "tags": ["movie", "barbie", "happy"],
    },
    {
        "text": "Spring is here and I'm loving the new flowers in the garden!",
        "date": datetime(2024, 4, 5).replace(tzinfo=timezone.utc),
        "tags": ["garden", "home"],
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
# END BatchDataToInsert

# BasicBatchInsertion
tenant = mt_collection.with_tenant("steve85")

with tenant.batch.fixed_size(100) as batch:
    for journal_entry in journal_entries:
        batch.add_object(journal_entry)
# END BasicBatchInsertion

# ================================================================================
# Auto tenant creation
# ================================================================================

# AutoTenantCreationAtInsert
nonexistent_tenant = mt_collection.with_tenant("newsteve15")

nonexistent_tenant.data.insert({
    "date": datetime(2024, 7, 7).replace(tzinfo=timezone.utc),
    "tags": ["events", "grand prix"],
    "text": "Going to Silverstone was a dream come true!",
})
# END AutoTenantCreationAtInsert

# ================================================================================
# Filtering by date range
# ================================================================================

# DateRangeQuery
from weaviate.classes.query import Filter
from datetime import datetime, timezone

tenant = mt_collection.with_tenant("steve85")

start_date = datetime(2023, 7, 1).replace(tzinfo=timezone.utc)
end_date = datetime(2023, 7, 31).replace(tzinfo=timezone.utc)

response = tenant.query.fetch_objects(
    filters=(
        Filter.by_property("date").greater_or_equal(start_date) &
        Filter.by_property("date").less_or_equal(end_date)
    ),
    limit=10
)
# END DateRangeQuery

for obj in response.objects:
    print(obj.properties)

"""
# ExampleResponseDateRange
{
    "text": "Ahhh the Taylor Swift Eras concert in Denver was sooo much better than I could have hoped for!",
    "date": datetime.datetime(2023, 7, 14, 0, 0, tzinfo=datetime.timezone.utc),
    "tags": ["music", "swifties", "concert"],
}
{
    "text": "After watching Kate McKinnon play Weird Barbie I totally feel seen.",
    "date": datetime.datetime(2023, 7, 25, 0, 0, tzinfo=datetime.timezone.utc),
    "tags": ["movie", "barbie", "happy"],
}
# END ExampleResponseDateRange
"""

# ================================================================================
# User query
# ================================================================================

# UserQuery
tenant = mt_collection.with_tenant("steve85")

response = tenant.query.hybrid(
    query="food experience",
    limit=2
)
# END UserQuery

for obj in response.objects:
    print(obj.properties)

"""
# ExampleResponseUserQuery
{
    "date": datetime.datetime(2024, 5, 15, 0, 0, tzinfo=datetime.timezone.utc),
    "tags": ["restaurant", "experience"],
    "text": "What amazing food we had at Quay! It was totally worth it.",
}
{
    "date": datetime.datetime(2024, 5, 16, 0, 0, tzinfo=datetime.timezone.utc),
    "tags": ["cooking", "hobby"],
    "text": "I went to a cooking class and learned how to make sushi!",
}
# END ExampleResponseUserQuery
"""

# ================================================================================
# Deactivate a tenant
# ================================================================================

mt_collection.tenants.create(["travis1989"])

# UpdateOneTenantStatus
from weaviate.classes.tenants import Tenant, TenantActivityStatus

mt_collection = client.collections.get(mt_collection_name)

mt_collection.tenants.update(
    Tenant(name="travis1989", activity_status=TenantActivityStatus.INACTIVE)
)
# END UpdateOneTenantStatus


# ================================================================================
# Deactivate multiple tenants
# ================================================================================

inactive_users = [f"user{100+i}" for i in range(10)]

# UpdateMultipleTenantStatuses
from weaviate.classes.tenants import Tenant, TenantActivityStatus

mt_collection = client.collections.get(mt_collection_name)

tenants_to_deactivate = [
    Tenant(name=user, activity_status=TenantActivityStatus.INACTIVE)
    for user in inactive_users
]

mt_collection.tenants.update(tenants_to_deactivate)
# END UpdateMultipleTenantStatuses

tenant_names_to_offload = []  # List of tenants to offload

# OffloadMultipleTenants
from weaviate.classes.tenants import Tenant, TenantActivityStatus

mt_collection = client.collections.get(mt_collection_name)

tenants_to_offload = [
    Tenant(name=user, activity_status=TenantActivityStatus.OFFLOADED)
    for user in tenant_names_to_offload
]

mt_collection.tenants.update(tenants_to_offload)
# END OffloadMultipleTenants

tenant_names_to_activate = []  # List of tenants to offload

# ActivateMultipleTenants
from weaviate.classes.tenants import Tenant, TenantActivityStatus

mt_collection = client.collections.get(mt_collection_name)

tenants_to_activate = [
    Tenant(name=user, activity_status=TenantActivityStatus.ACTIVE)
    for user in tenant_names_to_activate
]

mt_collection.tenants.update(tenants_to_activate)
# END ActivateMultipleTenants

# ================================================================================
# Remove tenants
# ================================================================================

# RemoveTenants
from weaviate.classes.tenants import Tenant

mt_collection = client.collections.get(mt_collection_name)

# Caution - this will remove all of the associated data for the tenants
mt_collection.tenants.remove([
    "depardieu10",
    "travis1989",
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
