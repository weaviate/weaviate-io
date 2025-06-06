import os

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"],
        "X-Cohere-Api-Key": os.environ["COHERE_APIKEY"],
    }
)

# START RerankerTransformersBasic
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    reranker_config=Configure.Reranker.transformers()
    # highlight-end
    # Additional parameters not shown
)
# END RerankerTransformersBasic

# Clean up
client.collections.delete("DemoCollection")

# START RerankerCohereBasic
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    reranker_config=Configure.Reranker.cohere()
    # highlight-end
    # Additional parameters not shown
)
# END RerankerCohereBasic

# Clean up
client.collections.delete("DemoCollection")

# START RerankerCohereCustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    reranker_config=Configure.Reranker.cohere(
        model="rerank-english-v3.0"
    )
    # highlight-end
    # Additional parameters not shown
)
# END RerankerCohereCustomModel

# Clean up
client.collections.delete("DemoCollection")

# START RerankerJinaAIBasic
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    reranker_config=Configure.Reranker.jinaai()
    # highlight-end
    # Additional parameters not shown
)
# END RerankerJinaAIBasic

# Clean up
client.collections.delete("DemoCollection")

# START RerankerJinaAICustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    reranker_config=Configure.Reranker.jinaai(
        model="jina-reranker-v2-base-multilingual"
    )
    # highlight-end
    # Additional parameters not shown
)
# END RerankerJinaAICustomModel

# Clean up
client.collections.delete("DemoCollection")

# START RerankerNVIDIABasic
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    reranker_config=Configure.Reranker.nvidia()
    # highlight-end
    # Additional parameters not shown
)
# END RerankerNVIDIABasic

# Clean up
client.collections.delete("DemoCollection")

# START RerankerNVIDIACustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    reranker_config=Configure.Reranker.nvidia(
        model="nvidia/llama-3.2-nv-rerankqa-1b-v2",
        base_url="https://integrate.api.nvidia.com/v1",
    )
    # highlight-end
    # Additional parameters not shown
)
# END RerankerNVIDIACustomModel

# Clean up
client.collections.delete("DemoCollection")

# START RerankerVoyageAI
client.collections.create(
    "DemoCollection",
    # highlight-start
    reranker_config=Configure.Reranker.voyageai(
        # # This parameter is optional
        # model="rerank-lite-1"
    )
    # highlight-end
    # Additional parameters not shown
)
# END RerankerVoyageAI

source_objects = [
    {"title": "The Shawshank Redemption"},
    {"title": "The Godfather"},
    {"title": "The Dark Knight"},
    {"title": "Jingle All the Way"},
    {"title": "A Christmas Carol"},
]

collection = client.collections.get("DemoCollection")

with collection.batch.fixed_size(batch_size=200) as batch:
    for src_obj in source_objects:
        weaviate_obj = {
            "title": src_obj["title"],
        }

        # highlight-start
        # The model provider integration will automatically vectorize the object
        batch.add_object(
            properties=weaviate_obj,
            # vector=vector  # Optional, if you want to manually provide the vector
        )
        # highlight-end

# Check for failed objects
if len(collection.batch.failed_objects) > 0:
    print(f"Failed to import {len(collection.batch.failed_objects)} objects")
    for failed in collection.batch.failed_objects:
        print(f"e.g. Failed to import object with error: {failed.message}")

# START RerankerQueryExample
from weaviate.classes.query import Rerank

collection = client.collections.get("DemoCollection")

# highlight-start
response = collection.query.near_text(
    query="A holiday film",  # The model provider integration will automatically vectorize the query
    limit=2,
    rerank=Rerank(
        prop="title",                   # The property to rerank on
        query="A melodic holiday film"  # If not provided, the original query will be used
    )
)
# highlight-end

for obj in response.objects:
    print(obj.properties["title"])
# END RerankerQueryExample

client.close()
