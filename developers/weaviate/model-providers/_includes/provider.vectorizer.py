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

# START BasicVectorizerAWSBedrock
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_aws(
            name="title_vector",
            region="us-east-1",
            source_properties=["title"],
            service="bedrock",
            model="cohere.embed-multilingual-v3",
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerAWSBedrock

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerAWSSagemaker
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_aws(
            name="title_vector",
            region="us-east-1",
            source_properties=["title"],
            service="sagemaker",
            endpoint="<custom_sagemaker_url>",
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerAWSSagemaker

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerAWS
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_aws(
            name="title_vector",
            region="us-east-1",
            source_properties=["title"],
            service="bedrock",                      # `bedrock` or `sagemaker`
            model="cohere.embed-multilingual-v3",   # If using `bedrock`, this is required
            # endpoint="<sagemaker_endpoint>",        # If using `sagemaker`, this is required
            # vectorize_collection_name=False,
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerAWS

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerCohere
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_cohere(
            name="title_vector",
            source_properties=["title"]
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerCohere

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerCohere
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_cohere(
            name="title_vector",
            source_properties=["title"],
            # Further options
            # model="embed-multilingual-v3.0",
            # truncate="END",  # "NONE", "START" or "END"
            # base_url="<custom_cohere_url>"
            # vectorize_collection_name=False,
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerCohere

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerGoogle
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_palm(
            name="title_vector",
            source_properties=["title"],
            # project_id="<google-cloud-project-id>"  # Required for Vertex AI
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerGoogle

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerGoogle
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_palm(
            name="title_vector",
            source_properties=["title"],
            # project_id="<google-cloud-project-id>",  # Required for Vertex AI
            # # Further options
            # model_id="<google-model-id>",
            # api_endpoint="<google-api-endpoint>",
            # vectorize_collection_name=False,
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerGoogle

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerHuggingFace
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_huggingface(
            name="title_vector",
            source_properties=["title"],
            model="sentence-transformers/all-MiniLM-L6-v2",
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerHuggingFace

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerHuggingFace
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_huggingface(
            name="title_vector",
            source_properties=["title"],
            # NOTE: Use only one of (`model`), (`passage_model` and `query_model`), or (`endpoint_url`)
            model="sentence-transformers/all-MiniLM-L6-v2",
            # passage_model="sentence-transformers/facebook-dpr-ctx_encoder-single-nq-base",    # Required if using `query_model`
            # query_model="sentence-transformers/facebook-dpr-question_encoder-single-nq-base", # Required if using `passage_model`
            # endpoint_url="<custom_huggingface_url>",
            #
            # wait_for_model=True,
            # use_cache=True,
            # use_gpu=True,
            # vectorize_collection_name=False,
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerHuggingFace

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerJinaAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_jinaai(
            name="title_vector",
            source_properties=["title"]
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerJinaAI

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerJinaAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_jinaai(
            name="title_vector",
            source_properties=["title"],
            # Further options
            # model="jina-embeddings-v2-base-en"
            # vectorize_collection_name=False,
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerJinaAI

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerOpenAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_openai(
            name="title_vector",
            source_properties=["title"]
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerOpenAI

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerOpenAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_openai(
            name="title_vector",
            source_properties=["title"],
            # # Further options
            # model="text-embedding-3-large",
            # model_version="002",  # Parameter only applicable for `ada` model family and older
            # dimensions=1024,      # Parameter only applicable for `v3` model family and newer
            # type="text",
            # base_url="<custom_openai_url>",
            # vectorize_collection_name=False,
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerOpenAI

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerVoyageAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_voyageai(
            name="title_vector",
            source_properties=["title"]
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerVoyageAI

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerVoyageAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_voyageai(
            name="title_vector",
            source_properties=["title"],
            # Further options
            # model="voyage-large-2"
            # base_url="<custom_voyageai_url>",
            # truncate=True,
            # vectorize_collection_name=False,
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerVoyageAI


source_objects = [
    {"title": "The Shawshank Redemption", "description": ""},
    {"title": "The Godfather", "description": ""},
    {"title": "The Dark Knight", "description": ""},
    {"title": "Jingle All the Way", "description": ""},
    {"title": "A Christmas Carol", "description": ""},
]

# START BatchImportExample
collection = client.collections.get("DemoCollection")

with collection.batch.dynamic() as batch:
    for src_obj in source_objects:
        weaviate_obj = {
            "title": src_obj["title"],
            "description": src_obj["description"],
        }

        # highlight-start
        # The model provider integration will automatically vectorize the object
        batch.add_object(
            properties=weaviate_obj,
            # vector=vector  # Optionally provide a pre-obtained vector
        )
        # highlight-end
# END BatchImportExample

# START NearTextExample
collection = client.collections.get("DemoCollection")

# highlight-start
response = collection.query.near_text(
    query="A holiday film",  # The model provider integration will automatically vectorize the query
    limit=2
)
# highlight-end

for obj in response.objects:
    print(obj.properties["title"])
# END NearTextExample

# START HybridExample
collection = client.collections.get("DemoCollection")

# highlight-start
response = collection.query.hybrid(
    query="A holiday film",  # The model provider integration will automatically vectorize the query
    limit=2
)
# highlight-end

for obj in response.objects:
    print(obj.properties["title"])
# END HybridExample

client.close()
