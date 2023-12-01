# START CollectionToCollection  # START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection  # START CreateTenants
import weaviate
import weaviate.classes as wvc

# END CollectionToCollection  # END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection  # END CreateTenants
from tqdm import tqdm
# ===== Load demo dataset for testing =====
import weaviate_datasets as wd
import os

client_src = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)

for dataset in [wd.WineReviews, wd.WineReviewsMT]:
    d = dataset()
    d.upload_dataset(client_src)

# START CollectionToCollection
client_src = weaviate.connect_to_local()

# END CollectionToCollection

assert client_src.is_ready()

# START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection  # START CreateTenants
client_tgt = weaviate.connect_to_local(
    port=8099,
    grpc_port=50099,
)

# END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection  # END CreateTenants

# ================================================================================
# ================================================================================
# ================================================================================


# Delete existing collection at target if any
client_tgt.collections.delete("WineReview")

# START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection
reviews_tgt = client_tgt.collections.create(
    name="WineReview",
    multi_tenancy_config=wvc.Configure.multi_tenancy(enabled=False),
    # Additional settings not shown
    # END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection
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
    # START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection
)
# END CreateCollectionCollectionToCollection  # END CreateCollectionTenantToCollection


# ================================================================================
# ================================================================================
# ================================================================================


# START CollectionToCollection
reviews_src = client_src.collections.get("WineReview")

obj_buffer = list()
batch_size = 100
for i, q in enumerate(tqdm(reviews_src.iterator(include_vector=True))):
    new_obj = wvc.DataObject(
        properties=q.properties,
        vector=q.vector
    )
    obj_buffer.append(new_obj)
    if i != 0 and i % batch_size == 0:
        reviews_tgt.data.insert_many(obj_buffer)
        obj_buffer = list()

if len(obj_buffer) != 0:
    reviews_tgt.data.insert_many(obj_buffer)

# END CollectionToCollection


# START TenantToCollection
reviews_src = client_src.collections.get("WineReviewMT")
reviews_src_tenant_a = reviews_src.with_tenant("tenantA")

obj_buffer = list()
batch_size = 100
for i, q in enumerate(tqdm(reviews_src_tenant_a.iterator(include_vector=True))):
    new_obj = wvc.DataObject(
        properties=q.properties,
        vector=q.vector
    )
    obj_buffer.append(new_obj)
    if i != 0 and i % batch_size == 0:
        reviews_tgt.data.insert_many(obj_buffer)
        obj_buffer = list()

if len(obj_buffer) != 0:
    reviews_tgt.data.insert_many(obj_buffer)

# END TenantToCollection


# ================================================================================
# ================================================================================
# ================================================================================


# Delete existing collection at target if any
client_tgt.collections.delete("WineReviewMT")

# START CreateCollectionCollectionToTenant  # START CreateCollectionTenantToTenant
reviews_mt_tgt = client_tgt.collections.create(
    name="WineReviewMT",
    multi_tenancy_config=wvc.Configure.multi_tenancy(enabled=True),
    # Additional settings not shown
    # END CreateCollectionCollectionToTenant  # END CreateCollectionTenantToTenant
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
    # START CreateCollectionCollectionToTenant  # START CreateCollectionTenantToTenant
)
# END CreateCollectionCollectionToTenant  # END CreateCollectionTenantToTenant


# START CreateTenants

tenants_tgt = [wvc.Tenant(name="tenantA"), wvc.Tenant(name="tenantB")]

reviews_mt_tgt.tenants.create(tenants_tgt)
# END CreateTenants


# START CollectionToTenant
reviews_src = client_src.collections.get("WineReview")
reviews_tgt_tenant_a = reviews_mt_tgt.with_tenant(tenants_tgt[0])

obj_buffer = list()
batch_size = 100
for i, q in enumerate(tqdm(reviews_src.iterator(include_vector=True))):
    new_obj = wvc.DataObject(
        properties=q.properties,
        vector=q.vector
    )
    obj_buffer.append(new_obj)
    if i != 0 and i % batch_size == 0:
        reviews_tgt_tenant_a.data.insert_many(obj_buffer)
        obj_buffer = list()

if len(obj_buffer) != 0:
    reviews_tgt_tenant_a.data.insert_many(obj_buffer)

# END CollectionToTenant


# START TenantToTenant
reviews_mt_src = client_src.collections.get("WineReviewMT")
reviews_src_tenant_a = reviews_mt_src.with_tenant("tenantA")
reviews_tgt_tenant_a = reviews_mt_tgt.with_tenant(tenants_tgt[0])

obj_buffer = list()
batch_size = 100
for i, q in enumerate(tqdm(reviews_src_tenant_a.iterator(include_vector=True))):
    new_obj = wvc.DataObject(
        properties=q.properties,
        vector=q.vector
    )
    obj_buffer.append(new_obj)
    if i != 0 and i % batch_size == 0:
        reviews_tgt_tenant_a.data.insert_many(obj_buffer)
        obj_buffer = list()

if len(obj_buffer) != 0:
    reviews_tgt_tenant_a.data.insert_many(obj_buffer)

# END TenantToTenant
