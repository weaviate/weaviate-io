# START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection  # START CreateCollectionCollectionToTenant  # START CreateCollectionTenantToTenant
import weaviate
import weaviate.classes as wvc
from weaviate import Collection

# END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection  # END CreateCollectionCollectionToTenant  # END CreateCollectionTenantToTenant
from tqdm import tqdm
# ===== Load demo dataset for testing =====
import weaviate_datasets as wd
import os

client_src = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)

for dataset in [wd.WineReviews, wd.WineReviewsMT]:
    d = dataset()
    d.upload_dataset(client_src, overwrite=True)
DATASET_SIZE = 50  # For assertions


# START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection  # START CreateCollectionCollectionToTenant  # START CreateCollectionTenantToTenant
client_src = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)

# END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection  # END CreateCollectionCollectionToTenant  # END CreateCollectionTenantToTenant


# ============================================================
# TEST - CHECK CLIENT CONNECTION
# ============================================================
assert client_src.is_ready()


# START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection  # START CreateCollectionCollectionToTenant  # START CreateCollectionTenantToTenant
client_tgt = weaviate.connect_to_local(
    port=8099,
    grpc_port=50099,
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)

# END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection  # END CreateCollectionCollectionToTenant  # END CreateCollectionTenantToTenant

# ================================================================================
# ================================================================================
# ================================================================================


# START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection  # START CreateCollectionCollectionToTenant  # START CreateCollectionTenantToTenant
def create_collection(collection_name: str, enable_mt=False):
    reviews = client_tgt.collections.create(
        name=collection_name,
        multi_tenancy_config=wvc.Configure.multi_tenancy(enabled=enable_mt),
        # Additional settings not shown
        # END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection  # END CreateCollectionCollectionToTenant  # END CreateCollectionTenantToTenant
        vectorizer_config=wvc.Configure.Vectorizer.text2vec_openai(),
        generative_config=wvc.Configure.Generative.openai(),
        properties=[
            wvc.Property(
                name="review_body",
                data_type=wvc.DataType.TEXT,
                description="Review body"
            ),
            wvc.Property(
                name="title",
                data_type=wvc.DataType.TEXT,
                description="Name of the wine"
            ),
            wvc.Property(
                name="country",
                data_type=wvc.DataType.TEXT,
                description="Originating country"
            ),
            wvc.Property(
                name="points",
                data_type=wvc.DataType.INT,
                description="Review score in points"
            ),
            wvc.Property(
                name="price",
                data_type=wvc.DataType.NUMBER,
                description="Listed price"
            )
        ]
        # START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection  # START CreateCollectionCollectionToTenant  # START CreateCollectionTenantToTenant
    )

    return reviews


    # END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection  # END CreateCollectionCollectionToTenant  # END CreateCollectionTenantToTenant


# ================================================================================
# ================================================================================
# ================================================================================


# START CollectionToCollection  # START TenantToCollection  # START CollectionToTenant  # START TenantToTenant
def migrate_data(collection_src: Collection, collection_tgt: Collection):
    obj_buffer = list()
    batch_size = 100

    for i, q in enumerate(tqdm(collection_src.iterator(include_vector=True))):
        new_obj = wvc.DataObject(
            properties=q.properties,
            vector=q.vector,
            uuid=q.uuid
        )
        obj_buffer.append(new_obj)
        if i != 0 and i % batch_size == 0:
            collection_tgt.data.insert_many(obj_buffer)
            obj_buffer = list()

    if len(obj_buffer) != 0:
        collection_tgt.data.insert_many(obj_buffer)

    return True


# END CollectionToCollection  # END TenantToCollection  # END CollectionToTenant  # END TenantToTenant

# Delete existing collection at target if any
client_tgt.collections.delete("WineReview")


# ============================================================
# TEST - CHECK CLASS DELETION
# ============================================================
assert not client_tgt.collections.exists("WineReview")


# START CreateCollectionCollectionToCollection
reviews_tgt = create_collection("WineReview", enable_mt=False)
# END CreateCollectionCollectionToCollection


# ============================================================
# TEST - CHECK EMPTY CLASS CREATION
# ============================================================
assert client_tgt.collections.exists("WineReview")
agg_resp = reviews_tgt.aggregate.over_all(total_count=True)
assert agg_resp.total_count == 0

# START CollectionToCollection
reviews_src = client_src.collections.get("WineReview")
reviews_tgt = client_tgt.collections.get("WineReview")

migrate_data(reviews_src, reviews_tgt)

# END CollectionToCollection


# ============================================================
# TEST - CHECK DATA MIGRATION
# ============================================================
agg_resp = reviews_tgt.aggregate.over_all(total_count=True)
assert agg_resp.total_count == DATASET_SIZE

coll_list = [reviews_src, reviews_tgt]
resps = [r.query.near_text("Earthy but very drinkable", limit=1) for r in coll_list]
assert resps[0].objects[0].uuid == resps[1].objects[0].uuid

# Delete existing collection at target if any
client_tgt.collections.delete("WineReview")


# ============================================================
# TEST - CHECK CLASS DELETION
# ============================================================
assert not client_tgt.collections.exists("WineReview")


# START CreateCollectionTenantToCollection
reviews_tgt = create_collection("WineReview", enable_mt=False)
# END CreateCollectionTenantToCollection


# ============================================================
# TEST - CHECK EMPTY CLASS CREATION
# ============================================================
assert client_tgt.collections.exists("WineReview")
agg_resp = reviews_tgt.aggregate.over_all(total_count=True)
assert agg_resp.total_count == 0


# START TenantToCollection
reviews_src = client_src.collections.get("WineReviewMT")
reviews_src_tenant_a = reviews_src.with_tenant("tenantA")
reviews_tgt = client_tgt.collections.get("WineReview")

migrate_data(reviews_src_tenant_a, reviews_tgt)

# END TenantToCollection


# ============================================================
# TEST - CHECK DATA MIGRATION
# ============================================================
agg_resp = reviews_tgt.aggregate.over_all(total_count=True)
assert agg_resp.total_count == DATASET_SIZE

coll_list = [reviews_src_tenant_a, reviews_tgt]
resps = [r.query.near_text("Earthy but very drinkable", limit=1) for r in coll_list]
assert resps[0].objects[0].uuid == resps[1].objects[0].uuid


# Delete existing collection at target if any
client_tgt.collections.delete("WineReviewMT")


# ============================================================
# TEST - CHECK CLASS DELETION
# ============================================================
assert not client_tgt.collections.exists("WineReviewMT")


# START CreateCollectionCollectionToTenant
reviews_mt_tgt = create_collection("WineReviewMT", enable_mt=True)
# END CreateCollectionCollectionToTenant


# START CreateTenants
tenants_tgt = [wvc.Tenant(name="tenantA"), wvc.Tenant(name="tenantB")]

reviews_mt_tgt = client_tgt.collections.get("WineReviewMT")
reviews_mt_tgt.tenants.create(tenants_tgt)
# END CreateTenants


# ============================================================
# TEST - CHECK EMPTY CLASS CREATION
# ============================================================
assert client_tgt.collections.exists("WineReviewMT")
reviews_tgt_tenant_a = reviews_mt_tgt.with_tenant(tenants_tgt[0].name)
agg_resp = reviews_tgt_tenant_a.aggregate.over_all(total_count=True)
assert agg_resp.total_count == 0


# START CollectionToTenant
reviews_src = client_src.collections.get("WineReview")
reviews_mt_tgt = client_tgt.collections.get("WineReviewMT")
reviews_tgt_tenant_a = reviews_mt_tgt.with_tenant(tenants_tgt[0].name)

migrate_data(reviews_src, reviews_tgt_tenant_a)

# END CollectionToTenant


# ============================================================
# TEST - CHECK DATA MIGRATION
# ============================================================
agg_resp = reviews_tgt_tenant_a.aggregate.over_all(total_count=True)
assert agg_resp.total_count == DATASET_SIZE

coll_list = [reviews_src, reviews_tgt_tenant_a]
resps = [r.query.near_text("Earthy but very drinkable", limit=1) for r in coll_list]
assert resps[0].objects[0].uuid == resps[1].objects[0].uuid


# Delete existing collection at target if any
client_tgt.collections.delete("WineReviewMT")


# ============================================================
# TEST - CHECK CLASS DELETION
# ============================================================
assert not client_tgt.collections.exists("WineReviewMT")


# START CreateCollectionTenantToTenant
reviews_mt_tgt = create_collection("WineReviewMT", enable_mt=True)
# END CreateCollectionTenantToTenant


# Re-create tenants
tenants_tgt = [wvc.Tenant(name="tenantA"), wvc.Tenant(name="tenantB")]

reviews_mt_tgt = client_tgt.collections.get("WineReviewMT")
reviews_mt_tgt.tenants.create(tenants_tgt)
# END Re-create tenants


# ============================================================
# TEST - CHECK EMPTY CLASS CREATION
# ============================================================
assert client_tgt.collections.exists("WineReviewMT")
reviews_tgt_tenant_a = reviews_mt_tgt.with_tenant(tenants_tgt[0].name)
agg_resp = reviews_tgt_tenant_a.aggregate.over_all(total_count=True)
assert agg_resp.total_count == 0


# START TenantToTenant
reviews_mt_src = client_src.collections.get("WineReviewMT")
reviews_src_tenant_a = reviews_mt_src.with_tenant("tenantA")
reviews_mt_tgt = client_tgt.collections.get("WineReviewMT")
reviews_tgt_tenant_a = reviews_mt_tgt.with_tenant(tenants_tgt[0].name)

migrate_data(reviews_src_tenant_a, reviews_tgt_tenant_a)

# END TenantToTenant


# ============================================================
# TEST - CHECK DATA MIGRATION
# ============================================================
agg_resp = reviews_tgt_tenant_a.aggregate.over_all(total_count=True)
assert agg_resp.total_count == DATASET_SIZE

coll_list = [reviews_src_tenant_a, reviews_tgt_tenant_a]
resps = [r.query.near_text("Earthy but very drinkable", limit=1) for r in coll_list]
assert resps[0].objects[0].uuid == resps[1].objects[0].uuid

