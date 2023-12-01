# START CollectionToCollection
from typing import List, Optional
from tqdm import tqdm

# END CollectionToCollection
# START CollectionToCollection
from weaviate import Client

# END CollectionToCollection
# START CollectionToTenant # START TenantToCollection # START TenantToTenant
from weaviate import Client, Tenant

# END CollectionToTenant # END TenantToCollection # END TenantToTenant


# START CollectionToCollection # START CollectionToTenant # START TenantToCollection # START TenantToTenant
def migrate_data_from_weaviate_to_weaviate(
    source_wv: Client,
    target_wv: Client,
    from_class_name: str,
    to_class_name: str,
    from_tenant: Optional[str] = None,
    to_tenant: Optional[str] = None,
    limit: int = 500,
    batch_size: int = 50,
    after_uuid: Optional[str] = None,
    count: int = 0,
) -> None:
    """
    Migrate Weaviate data from a Source Weaviate to a Target Weaviate. This function
    allows to migrate data in 4 different configs:
            1. Class -> Class
            2. Class -> Tenant
            3. Tenant -> Class
            4. Tenant -> Tenant
    Note that this is mean to migrate data that has no cross-references properties, if
    you have cross-references for the class to migrate some changes might be needed for
    this script.

    Parameters
    ----------
    source_wv: Client
            The Source Weaviate Client object instance from which to query the data
            (including the UUID and the underlying vector, if one is present.)
    target_wv: Client
            The Target Weaviate Client object instance to which to ingest the data.
            NOTE: The batch config is going to be overridden in this function. If you want
            to keep your previous config of the batch, you can remove the `batch.configure`
            call in this function.
    from_class_name: str
            The Source Weaviate class that should be migrated.
    to_class_name: str
            The Target Weaviate class that should host the Source Weaviate data.
    from_tenant: Optional[str] = None
            The Source Weaviate class tenant that that should be migrated. If it is None,
            then it means that the Source class has no Multi-Tenancy enabled and the whole
            class needs to be migrated.
            By default None
    to_tenant: Optional[str] = None
            The Target Weaviate class tenant that should host the migrated data.mIf it is
            None then it means that Target Weaviate has no Multi-Tenancy enabled and the
            data from the Source Weaviate will be in non-Multi-Tenancy class.
            By default None
    limit: int = 500
            The limit used for quering data from Source Weaviate.
            NOTE: Do not set to high value to avoid long requests.
    batch_size: int = 50
            The batch size configured for the Target Weaviate.
            NOTE: Do not set to high value to avoid long requests.
    after_uuid: Optional[str] = None
            The after UUID to be used in cursor API. It is meant to be used in case the script
            faild in the middle of the process of migration. Leave it to None on first run.
            By default None
    count: int = 0
            The number of objects that were already ingested in the Target Weaviate. It is
            meant to be used in case the script faild in the middle of the process of migration,
            and is used ONLY for the progress bar. Can be ignored.
    """

    # get source class properties
    properties = [
        prop["name"] for prop in source_wv.schema.get(from_class_name)["properties"]
    ]

    # get number of items in the class/tenant
    obj_count_query = source_wv.query.aggregate(
        class_name=from_class_name
    ).with_meta_count()
    if from_tenant is not None:
        obj_count_query = obj_count_query.with_tenant(from_tenant)
    num_objects = obj_count_query.do()["data"]["Aggregate"][from_class_name][0]["meta"][
        "count"
    ]

    try:
        # configure Target Weaviate Batch
        target_wv.batch.configure(
            batch_size=batch_size,
        )
        additional_item_config = {"tenant": to_tenant}
        with target_wv.batch as target_batch, tqdm(total=(num_objects - count)) as pbar:
            # helper function to ingest data into Target Weaviate
            def ingest_data_in_batches(objects: List[dict]) -> str:
                """
                Ingest data into Target Weaviate using Batch API.

                Parameters
                ----------
                objects: List[dict]
                        A list of Waviate objects from the Source Weaviate, the list conatins
                        all objects of the current Source Weaviate page.
                        Cannot be empty list!!!

                Returns
                -------
                str
                        The last UUID in the Page to be used with cursor API feature.
                """

                for obj in objects:
                    weaviate_obj = obj.copy()
                    vector = weaviate_obj["_additional"]["vector"]
                    uuid = weaviate_obj["_additional"]["id"]
                    del weaviate_obj["_additional"]

                    if len(vector) == 0:
                        target_batch.add_data_object(
                            data_object=weaviate_obj,
                            class_name=to_class_name,
                            uuid=uuid,
                            **additional_item_config,
                        )
                    else:
                        target_batch.add_data_object(
                            data_object=weaviate_obj,
                            class_name=to_class_name,
                            uuid=uuid,
                            vector=vector,
                            **additional_item_config,
                        )
                return uuid

            # migrate data
            while True:
                query = (
                    source_wv.query.get(
                        class_name=from_class_name, properties=properties
                    )
                    .with_additional(["vector", "id"])
                    .with_limit(limit)
                )
                if after_uuid:
                    query = query.with_after(after_uuid)
                if from_tenant:
                    query = query.with_tenant(from_tenant)
                source_data = query.do()

                if "errors" in source_data:
                    raise Exception(
                        f"Failed to get data after object UUID '{after_uuid}' for class '{from_class_name}'",
                        f" from '{from_tenant}'!\n" if from_tenant else "\n",
                        source_data["errors"],
                    )
                page_object = source_data["data"]["Get"][from_class_name]

                if len(page_object) == 0:
                    break
                after_uuid = ingest_data_in_batches(objects=page_object)
                pbar.update(limit)
    except:
        print(
            f"Something went wrong. The last after_uuid was: '{after_uuid}' for Source Weaviate "
            f"class {from_class_name}"
            f" from tenant {from_tenant}! "
            if from_tenant
            else ". "
            f"The Target Weaviate class was {to_class_name}"
            f" with tenant {to_tenant}!\n"
            if to_tenant
            else "!\n"
        )
        raise
    finally:
        # The migration function uses the batch API in a context manager and when it exits
        # the context manager it also shuts down the BatchExecutor, so we can re-start it here.
        # It gets automatically started when entering a new context manager but prints a warning.
        # It is started in 'finally' in case there is a re-try mechanism on errors
        target_wv.batch.start()


# END CollectionToCollection # END CollectionToTenant # END TenantToCollection # END TenantToTenant


# ================================================================================
# ================================================================================
# ================================================================================


# START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection
from weaviate import Client

target_client = Client(url="http://localhost:8099")  # Your target endpoint

target_client.schema.create(
    {
        "classes": [
            {
                "class": "WineReview",
                "multiTenancyConfig": {"enabled": False},  # This is also the default
                # Additional settings not shown
                # END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection
                "vectorizer": "text2vec-openai",
                "moduleConfig": {
                    "generative-openai": {
                        "model": "gpt-3.5-turbo",
                    }
                },
                "properties": [
                    {
                        "name": "review_body",
                        "dataType": ["text"],
                        "description": "Review body",
                    },
                    {
                        "name": "title",
                        "dataType": ["text"],
                        "description": "Name of the wine",
                    },
                    {
                        "name": "country",
                        "dataType": ["text"],
                        "description": "Originating country",
                    },
                    {
                        "name": "points",
                        "dataType": ["int"],
                        "description": "Review score in points",
                    },
                    {
                        "name": "price",
                        "dataType": ["number"],
                        "description": "Listed price",
                    },
                ],
                # START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection
            }
        ]
    }
)

# END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection


# ================================================================================
# ================================================================================
# ================================================================================


# START CollectionToCollection
SOURCE_WEAVIATE_URL = "http://localhost:8080"  # Your source endpoint
TARGET_WEAVIATE_URL = "http://localhost:8099"  # Your target endpoint

source_client = Client(url=SOURCE_WEAVIATE_URL)
target_client = Client(url=TARGET_WEAVIATE_URL)

# Migrate the data with the `migrate_data_from_weaviate_to_weaviate` function defined above

source_class = "WineReview"
target_class = "WineReview"

print(f"Start migration for class '{source_class}'")
migrate_data_from_weaviate_to_weaviate(
    source_wv=source_client,
    target_wv=target_client,
    from_class_name=source_class,
    to_class_name=target_class,
)
print(f"Class '{source_class}' migrated to '{target_class}' in '{TARGET_WEAVIATE_URL}'")

# END CollectionToCollection


# ================================================================================
# ================================================================================
# ================================================================================


# START CreateCollectionCollectionToTenant  # START CreateCollectionTenantToTenant
from weaviate import Client

target_client = Client(url="http://localhost:8099")  # Your target endpoint

target_client.schema.create(
    {
        "classes": [
            {
                "class": "WineReview",
                "multiTenancyConfig": {  # Multi-tenancy must be enabled at the collection level
                    "enabled": True
                },
                # Additional settings not shown
                # END CreateCollectionCollectionToTenant  # END CreateCollectionTenantToTenant
                "vectorizer": "text2vec-openai",
                "moduleConfig": {
                    "generative-openai": {
                        "model": "gpt-3.5-turbo",
                    }
                },
                "properties": [
                    {
                        "name": "review_body",
                        "dataType": ["text"],
                        "description": "Review body",
                    },
                    {
                        "name": "title",
                        "dataType": ["text"],
                        "description": "Name of the wine",
                    },
                    {
                        "name": "country",
                        "dataType": ["text"],
                        "description": "Originating country",
                    },
                    {
                        "name": "points",
                        "dataType": ["int"],
                        "description": "Review score in points",
                    },
                    {
                        "name": "price",
                        "dataType": ["number"],
                        "description": "Listed price",
                    },
                ],
                # START CreateCollectionCollectionToTenant  # START CreateCollectionTenantToTenant
            }
        ]
    }
)

# END CreateCollectionCollectionToTenant  # END CreateCollectionTenantToTenant


# ================================================================================
# ================================================================================
# ================================================================================


# START CreateTenants
from weaviate import Client, Tenant

target_client = Client(url="http://localhost:8099")  # Your target endpoint

target_tenants = [Tenant("newTenantA"), Tenant("newTenantB")]  # Tenants to add to the target
target_client.schema.add_class_tenants(target_tenants)

# END CreateTenants


# ================================================================================
# ================================================================================
# ================================================================================


# START CollectionToTenant
from weaviate import Client, Tenant

SOURCE_WEAVIATE_URL = "http://localhost:8080"  # Your source endpoint
TARGET_WEAVIATE_URL = "http://localhost:8099"  # Your target endpoint

source_client = Client(url=SOURCE_WEAVIATE_URL)
target_client = Client(url=TARGET_WEAVIATE_URL)

# Migrate the data with the `migrate_data_from_weaviate_to_weaviate` function defined above

source_class = "WineReview"
target_class = "WineReview"
target_tenant = target_tenants[0]  # Pick a target tenant

print(f"Start migration for class '{source_class}'")
migrate_data_from_weaviate_to_weaviate(
    source_wv=source_client,
    target_wv=target_client,
    from_class_name=source_class,
    to_class_name=target_class,
    to_tenant=target_tenant.name,
)

print(f"Class '{source_class}' migrated to '{target_class}' and tenant '{target_tenant}' in '{TARGET_WEAVIATE_URL}'")
# END CollectionToTenant


# ================================================================================
# ================================================================================
# ================================================================================

source_tenants = [Tenant("tenantA"), Tenant("tenantB")]  # Tenants to add to the target

# START TenantToCollection
from weaviate import Client, Tenant

SOURCE_WEAVIATE_URL = "http://localhost:8080"  # Your source endpoint
TARGET_WEAVIATE_URL = "http://localhost:8099"  # Your target endpoint

source_client = Client(url=SOURCE_WEAVIATE_URL)
target_client = Client(url=TARGET_WEAVIATE_URL)

# Migrate the data with the `migrate_data_from_weaviate_to_weaviate` function defined above

source_class = "WineReview"
source_tenant = source_tenants[0]  # Pick a source tenant
target_class = "WineReview"

print(f"Start migration for class '{source_class}'")
migrate_data_from_weaviate_to_weaviate(
    source_wv=source_client,
    target_wv=target_client,
    from_class_name=source_class,
    from_tenant=source_tenant.name,
    to_class_name=target_class,
)

print(f"Tenant '{source_tenant}' in class '{source_class}' migrated to '{target_class}' in '{TARGET_WEAVIATE_URL}'")
# END TenantToCollection


# ================================================================================
# ================================================================================
# ================================================================================


# START TenantToTenant
from weaviate import Client, Tenant

SOURCE_WEAVIATE_URL = "http://localhost:8080"  # Your source endpoint
TARGET_WEAVIATE_URL = "http://localhost:8099"  # Your target endpoint

source_client = Client(url=SOURCE_WEAVIATE_URL)
target_client = Client(url=TARGET_WEAVIATE_URL)

# Migrate the data with the `migrate_data_from_weaviate_to_weaviate` function defined above

source_class = "WineReview"
source_tenant = source_tenants[0]  # Pick a source tenant
target_class = "WineReview"
target_tenant = target_tenants[0]  # Pick a target tenant

print(f"Start migration for class '{source_class}'")
migrate_data_from_weaviate_to_weaviate(
    source_wv=source_client,
    target_wv=target_client,
    from_class_name=source_class,
    from_tenant=source_tenant.name,
    to_class_name=target_class,
    to_tenant=target_tenant.name
)

print(f"Tenant '{source_tenant}' in class '{source_class}' migrated to tenant '{target_tenant}' in '{target_class}' in '{TARGET_WEAVIATE_URL}'")
# END TenantToCollection
