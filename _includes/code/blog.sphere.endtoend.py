# START SphereEndToEnd
import time
import json
import weaviate
from weaviate.classes.config import Configure, Property, DataType
from tqdm import tqdm


WEAVIATE_URL     = '<YOUR-WEAVIATE-URL>' # replace with actual url
WEAVIATE_API_KEY = 'super-secret-key' # replace with actual api key
BATCH_SIZE       = 100
SPHERE_DATASET   = 'sphere.100k.jsonl' # update to match your filename

# END SphereEndToEnd

# Actual instance details for testing - not shown in blog
import os

WEAVIATE_URL     = os.getenv('WEAVIATE_URL')     # replace with actual url
WEAVIATE_API_KEY = os.getenv('WEAVIATE_API_KEY') # replace with actual api key

# START SphereEndToEnd
try:
    client = weaviate.connect_to_weaviate_cloud(
        WEAVIATE_URL,
        WEAVIATE_API_KEY,
    )

    collection = client.collections.create(
        'Sphere',
        vector_config=Configure.Vectors.text2vec_huggingface(
            model='sentence-transformers/facebook-dpr-ctx_encoder-single-nq-base',
            query_model='sentence-transformers/facebook-dpr-question_encoder-single-nq-base',
            wait_for_model=True,
            use_gpu=False,  # Set to True if your account allows GPU usage
            use_cache=True,
        ),
        properties=[
            Property(name="url", data_type=DataType.TEXT),
            Property(name="title", data_type=DataType.TEXT),
            Property(name="raw", data_type=DataType.TEXT),
            Property(name="sha", data_type=DataType.TEXT),
        ]
        # Note we don't define properties here and rely on auto-schema
        # For this to work, your instance must have auto-schema enabled
    )

    # Import the data
    start = time.time()
    with open(SPHERE_DATASET) as jsonl_file:
        with collection.batch.fixed_size(batch_size=BATCH_SIZE) as batch:
            for jsonl in tqdm(jsonl_file):
                json_parsed = json.loads(jsonl)
                json_parsed = json.loads(jsonl)
                batch.add_object(
                    properties={
                        "url": json_parsed["url"],
                        "title": json_parsed["title"],
                        "raw": json_parsed["raw"],
                        "sha": json_parsed["sha"],
                    },
                    uuid=json_parsed["id"],
                    vector=json_parsed["vector"],
                )

    assert len(collection.batch.failed_objects) == 0
    assert len(collection) == len(jsonl_file)
    print(f"Imported {len(jsonl_file)} objects in {time.time() - start}")
finally:
    client.close()
# END SphereEndToEnd
