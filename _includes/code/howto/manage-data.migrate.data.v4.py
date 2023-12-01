# START CollectionToCollection
import weaviate
import weaviate.classes as wvc
import os
from tqdm import tqdm

client_src = weaviate.connect_to_local(
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)

# END CollectionToCollection

assert client_src.is_ready()

# ================================================================================
# ================================================================================
# ================================================================================


# START CreateCollectionCollectionToCollection  # START CreateCollectionTenantToCollection
import weaviate
import weaviate.classes as wvc
import os
from tqdm import tqdm

client_tgt = weaviate.connect_to_local(
    port=8099,
    grpc_port=50099,
    headers={"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}
)

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
