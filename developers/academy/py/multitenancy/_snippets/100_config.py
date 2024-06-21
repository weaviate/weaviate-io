import weaviate
import os
from weaviate.classes.config import Configure, Property, DataType

client = weaviate.connect_to_local(
    headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    }
)

mt_collection_name = "MultiTenantCollection"

client.collections.delete(mt_collection_name)

# ================================================================================
# Basic multi-tenany configuration
# ================================================================================

# BasicMTEnable
mt_collection = client.collections.create(
    name=mt_collection_name,  # e.g. "UserNote"
    # highlight-start
    multi_tenancy_config=Configure.multi_tenancy(),
    # highlight-end
    # Additional settings not shown
    # END BasicMTEnable
    properties=[
        Property(name="note", data_type=DataType.TEXT)
    ],
    vectorizer_config=[
        Configure.NamedVectors.text2vec_ollama(
            name="note",
            source_properties=["note"],
            api_endpoint="http://host.docker.internal:11434",  # If using Docker, use this to contact your local Ollama instance
            model="snowflake-arctic-embed:22m",  # The model to use, e.g. "nomic-embed-text"
        )
    ]
    # BasicMTEnable
)
# END BasicMTEnable

assert mt_collection.config.get().multi_tenancy_config.enabled is True

# ================================================================================
# Basic tenant creation
# ================================================================================

# BasicTenantCreation
mt_collection.tenants.create(["bob1", "alice2", "etienne3"])
# END BasicTenantCreation

# ================================================================================
# Basic tenant interaction
# ================================================================================

# BasicTenantInteraction
mt_collection_bob = mt_collection.with_tenant("bob1")  # Collection object with tenant specified

# Example query. Note that it is identical to a single tenant query
response = mt_collection_bob.query.near_text("pasta recipe")
# END BasicTenantInteraction

# ================================================================================
# More verbose multi-tenancy configuration
# ================================================================================

client.close()

client = weaviate.connect_to_local(
    port=8180,
    grpc_port=50151,
    headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    }
)

client.collections.delete(mt_collection_name)

# VerboseMTEnable
mt_collection = client.collections.create(
    name=mt_collection_name,  # e.g. "UserNote"
    # highlight-start
    multi_tenancy_config=Configure.multi_tenancy(
        enabled=True,
        auto_tenant_creation=True,
        auto_tenant_activation=True,
    ),
    # highlight-end
    replication_config=Configure.replication(factor=3),  # Replicate tenants
    # Additional settings not shown
    # END VerboseMTEnable
    properties=[
        Property(name="note", data_type=DataType.TEXT)
    ],
    vectorizer_config=[
        Configure.NamedVectors.text2vec_ollama(
            name="note",
            source_properties=["note"],
            api_endpoint="http://host.docker.internal:11434",  # If using Docker, use this to contact your local Ollama instance
            model="snowflake-arctic-embed:22m",  # The model to use, e.g. "nomic-embed-text"
        )
    ]
    # VerboseMTEnable
)
# END VerboseMTEnable

# ================================================================================
# Tenant creation and status
# ================================================================================

client.close()

client = weaviate.connect_to_local(
    headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    }
)

# TenantCaseSensitivity
mt_collection = client.collections.get(mt_collection_name)

mt_collection.tenants.create(["Bob", "bob"])  # This will create two distinct tenants
# END TenantCaseSensitivity

assert mt_collection.tenants.exists("Bob") is True
assert mt_collection.tenants.exists("bob") is True

# TenantCreationWithStatus
from weaviate.classes.tenants import Tenant, TenantActivityStatus

mt_collection = client.collections.get(mt_collection_name)

mt_collection.tenants.create([
    "HotBob",
    Tenant(name="AlsoHotBob"),
    Tenant(name="AnotherHotBob", activity_status=TenantActivityStatus.HOT),
    Tenant(name="ColdBob", activity_status=TenantActivityStatus.COLD),
])
# END TenantCreationWithStatus

for t in ["HotBob", "AlsoHotBob", "AnotherHotBob"]:
    assert mt_collection.tenants.get_by_name(t).activity_status == TenantActivityStatus.HOT
assert mt_collection.tenants.get_by_name("ColdBob").activity_status == TenantActivityStatus.COLD

client.close()
