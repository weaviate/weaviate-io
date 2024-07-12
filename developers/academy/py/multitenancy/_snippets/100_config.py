import weaviate
import os
from weaviate.classes.config import Configure, Property, DataType

client = weaviate.connect_to_local(
    headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    }
)

mt_collection_name = "WeaviNote"

client.collections.delete(mt_collection_name)

# ================================================================================
# Basic multi-tenany configuration
# ================================================================================

# BasicMTEnable
mt_collection = client.collections.create(
    name=mt_collection_name,  # e.g. "Note"
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
    name=mt_collection_name,  # e.g. "Note"
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
    port=8180,
    grpc_port=50151,
    headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    }
)

# TenantCaseSensitivity
mt_collection = client.collections.get(mt_collection_name)

mt_collection.tenants.create(["Bob", "bob"])  # Beware: tenant names are case-sensitive; this will create two distinct tenants
# END TenantCaseSensitivity

assert mt_collection.tenants.exists("Bob") is True
assert mt_collection.tenants.exists("bob") is True

# TenantCreationWithStatus
from weaviate.classes.tenants import Tenant, TenantActivityStatus

mt_collection = client.collections.get(mt_collection_name)

mt_collection.tenants.create([
    "ActiveBob",
    Tenant(name="AlsoActiveBob"),
    Tenant(name="AnotherActiveBob", activity_status=TenantActivityStatus.ACTIVE),
    Tenant(name="InactiveBob", activity_status=TenantActivityStatus.INACTIVE),
])
# END TenantCreationWithStatus

for t in ["ActiveBob", "AlsoActiveBob", "AnotherActiveBob"]:
    assert mt_collection.tenants.get_by_name(t).activity_status == TenantActivityStatus.ACTIVE
assert mt_collection.tenants.get_by_name("InactiveBob").activity_status == TenantActivityStatus.INACTIVE

# ================================================================================
# "WeaviNotes" multi-tenancy configuration
# ================================================================================

client.collections.delete(mt_collection_name)

# WeaviNotesMTConfig
mt_collection = client.collections.create(
    name="WeaviNote",
    multi_tenancy_config=Configure.multi_tenancy(
        enabled=True,
        auto_tenant_creation=True,
        auto_tenant_activation=True,
    ),
    replication_config=Configure.replication(factor=3),  # Replicate tenants for high availability
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="note", data_type=DataType.TEXT),
        Property(name="tags", data_type=DataType.TEXT_ARRAY),
    ],
    vectorizer_config=[
        Configure.NamedVectors.text2vec_cohere(
            name="title",
            source_properties=["title"],
        ),
        Configure.NamedVectors.text2vec_cohere(
            name="all_text",
            source_properties=["title", "note", "tags"],
        ),
        Configure.NamedVectors.text2vec_cohere(
            name="tags",
            source_properties=["tags"],
        ),
    ],
    generative_config=Configure.Generative.cohere()
)
# END WeaviNotesMTConfig

# WeaviNotesNewUser
from fastapi import FastAPI
from weaviate.collections.collection import Collection

app = FastAPI()

def onboarding(collection: Collection, username: str) -> bool:
    # Onboarding logic

    # Create a new tenant
    collection.tenants.create(username)

    # Follow-up onboarding logic
    return True

notes = client.collections.get("WeaviNote")

# When a new user has signed up, run the onboarding logic (FastAPI example)
@app.post("/onboard/{username}")
def onboard(username: str):
    onboarding(notes, username)
    return {"message": f"User {username} onboarded"}
# END WeaviNotesNewUser


# WeaviNotesOffboardUser
from fastapi import FastAPI
from weaviate.collections.collection import Collection

app = FastAPI()

def offboarding(collection: Collection, username: str) -> bool:
    # Offboarding logic

    # Delete the tenant
    collection.tenants.remove(username)

    # Follow-up offboarding logic
    return True

notes = client.collections.get("WeaviNote")

# When a new user has signed up, run the onboarding logic (FastAPI example)
@app.post("/offboard/{username}")
def offboard(username: str):
    offboard(notes, username)
    return {"message": f"User {username} offboarded"}
# END WeaviNotesOffboardUser


inactive_users = ['bob1', 'alice2']

# WeaviNotesSetUsersInactive
from weaviate.collections.collection import Collection
from weaviate.classes.tenants import Tenant
from typing import List

def set_inactive(collection: Collection, tenants: List[Tenant]) -> bool:
    # Onboarding logic

    # Update tenant status
    collection.tenants.update(tenants)

    # Follow-up onboarding logic
    return True

notes = client.collections.get("WeaviNote")

# Get a list of users (`inactive_users`) to set as inactive
tenants_to_set_inactive = [
    Tenant(name=user, activity_status=TenantActivityStatus.INACTIVE)
    for user in inactive_users
]

set_inactive(tenants_to_set_inactive)
# END WeaviNotesSetUsersInactive

client.close()
