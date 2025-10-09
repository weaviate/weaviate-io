# START SphereEndToEnd
import time
import json
import weaviate
from weaviate.classes.config import Configure, Property, DataType


WEAVIATE_URL     = '<YOUR-WEAVIATE-URL>' # replace with actual url
WEAVIATE_API_KEY = 'super-secret-key' # replace with actual api key
BATCH_SIZE       = 100
SPHERE_DATASET   = 'sphere.100k.jsonl' # update to match your filename

# END SphereEndToEnd

# Actual instance details for testing - not shown in blog
import os

WEAVIATE_URL     = os.getenv('WEAVIATE_URL')     # replace with actual url
WEAVIATE_API_KEY = os.getenv('WEAVIATE_API_KEY') # replace with actual api key
MAX_LINES        = 10000  # Actually only read this many lines before breaking

# START SphereEndToEnd
try:
    client = weaviate.connect_to_weaviate_cloud(
        WEAVIATE_URL,
        WEAVIATE_API_KEY,
    )

    # END SphereEndToEnd
    client.collections.delete('Sphere')  # Clean up before running

    # START SphereEndToEnd
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
    )

    # Import the data
    start = time.time()
    with open(SPHERE_DATASET) as jsonl_file:
        with collection.batch.fixed_size(batch_size=BATCH_SIZE) as batch:
            for i, jsonl in enumerate(jsonl_file):
                # Note this is a JSONL file, so only one object is loaded into memory at a time
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
                if i+1 % 1000 == 0:
                    print(f"Processed {i+1} objects")
                # END SphereEndToEnd

                if MAX_LINES and i >= MAX_LINES - 1:
                    print(f"Breaking after {MAX_LINES} lines")
                    break
                # START SphereEndToEnd

    assert len(collection.batch.failed_objects) == 0
    assert len(collection) == i + 1
    print(f"Imported {i + 1} objects in {time.time() - start:.3f} seconds")
finally:
    client.close()
# END SphereEndToEnd
