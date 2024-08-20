import weaviate
import os
from weaviate.classes.config import Configure, Property, DataType

client = weaviate.connect_to_local(
    port=8180,
    grpc_port=50151,
    headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
    },
)

mt_collection_name = "MyPrivateJournal"

# ================================================================================
# "MyPrivateJournal" multi-tenancy configuration
# ================================================================================

client.collections.delete(mt_collection_name)

# MyPrivateJournalMTConfig
mt_collection = client.collections.create(
    name="MyPrivateJournal",
    multi_tenancy_config=Configure.multi_tenancy(
        enabled=True,
        auto_tenant_creation=True,
        auto_tenant_activation=True,
    ),
    replication_config=Configure.replication(
        factor=3
    ),  # Replicate tenants for high availability
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
    generative_config=Configure.Generative.cohere(),
)
# END MyPrivateJournalMTConfig

# MyPrivateJournalNewUser
from fastapi import FastAPI
from weaviate.collections.collection import Collection

app = FastAPI()


def onboarding(collection: Collection, username: str) -> bool:
    # Onboarding logic

    # Create a new tenant
    collection.tenants.create(username)

    # Follow-up onboarding logic
    return True


notes = client.collections.get("MyPrivateJournal")


# When a new user has signed up, run the onboarding logic (FastAPI example)
@app.post("/onboard/{username}")
def onboard(username: str):
    onboarding(notes, username)
    return {"message": f"User {username} onboarded"}


# END MyPrivateJournalNewUser


# MyPrivateJournalOffboardUser
from fastapi import FastAPI
from weaviate.collections.collection import Collection

app = FastAPI()


def offboarding(collection: Collection, username: str) -> bool:
    # Offboarding logic

    # Delete the tenant
    collection.tenants.remove(username)

    # Follow-up offboarding logic
    return True


notes = client.collections.get("MyPrivateJournal")


# When a new user has signed up, run the onboarding logic (FastAPI example)
@app.post("/offboard/{username}")
def offboard(username: str):
    offboarding(notes, username)
    return {"message": f"User {username} offboarded"}


# END MyPrivateJournalOffboardUser


notes = client.collections.get("MyPrivateJournal")

notes.tenants.create(["bob1", "alice1", "alice2", "etienne1"])

inactive_users = ["bob1", "alice2"]

# MyPrivateJournalSetUsersInactive
from weaviate.collections.collection import Collection
from weaviate.classes.tenants import Tenant, TenantActivityStatus
from typing import List


def set_inactive(collection: Collection, tenants: List[Tenant]) -> bool:
    # Onboarding logic

    # Update tenant status
    collection.tenants.update(tenants)

    # Follow-up onboarding logic
    return True


notes = client.collections.get("MyPrivateJournal")

# Get a list of users (`inactive_users`) to set as inactive
tenants_to_set_inactive = [
    Tenant(name=user, activity_status=TenantActivityStatus.INACTIVE)
    for user in inactive_users
]

set_inactive(notes, tenants_to_set_inactive)
# END MyPrivateJournalSetUsersInactive
