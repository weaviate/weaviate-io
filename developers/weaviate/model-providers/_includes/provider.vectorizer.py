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

# START VectorizerCohereCustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_cohere(
            name="title_vector",
            source_properties=["title"],
            model="embed-multilingual-light-v3.0"
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END VectorizerCohereCustomModel

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
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerCohere

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerGoogleVertex
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_palm(
            name="title_vector",
            source_properties=["title"],
            project_id="<google-cloud-project-id>",
            # (Optional) To manually set the model ID
            model_id="textembedding-gecko@latest"
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerGoogleVertex

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerGoogleStudio
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_palm(
            name="title_vector",
            source_properties=["title"],
            # (Optional) To manually set the model ID
            model_id="text-embedding-004"
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerGoogleStudio

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
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerGoogle

# clean up
client.collections.delete("DemoCollection")

# START BasicMMVectorizerGoogle
from weaviate.classes.config import Property, DataType, Configure, Multi2VecField

client.collections.create(
    "DemoCollection",
    # highlight-start
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="poster", data_type=DataType.BLOB),
    ],
    vectorizer_config=[
        Configure.NamedVectors.multi2vec_palm(
            name="title_vector",
            # Define the fields to be used for the vectorization - using image_fields, text_fields, video_fields
            image_fields=[
                Multi2VecField(name="poster", weight=0.9)
            ],
            text_fields=[
                Multi2VecField(name="title", weight=0.1)
            ],
            # video_fields=[],
            project_id="<google-cloud-project-id>",  # Required for Vertex AI
            location="<google-cloud-location>",  # Required for Vertex AI
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicMMVectorizerGoogle

# clean up
client.collections.delete("DemoCollection")

# START FullMMVectorizerGoogle
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="description", data_type=DataType.TEXT),
        Property(name="poster", data_type=DataType.BLOB),
    ],
    vectorizer_config=[
        Configure.NamedVectors.multi2vec_palm(
            name="title_vector",
            # Define the fields to be used for the vectorization - using image_fields, text_fields, video_fields
            image_fields=[
                Multi2VecField(name="poster", weight=0.9)
            ],
            text_fields=[
                Multi2VecField(name="title", weight=0.1)
            ],
            # video_fields=[]
            # project_id="<google-cloud-project-id>"  # Required for Vertex AI
            # model_id="<google-model-id>",
            # location="us-central1",
            # dimensions=512,
            # video_interval_seconds=20
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullMMVectorizerGoogle

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

# START VectorizerJinaCustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_jinaai(
            name="title_vector",
            source_properties=["title"],
            model="jina-embeddings-v2-small-en"
        )
    ],
    # highlight-end
)
# END VectorizerJinaCustomModel

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
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerJinaAI

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerOctoAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    vectorizer_config=[
        Configure.NamedVectors.text2vec_octoai(
            name="title_vector",
            source_properties=["title"]
        )
    ],
    # Additional parameters not shown
)
# END BasicVectorizerOctoAI

# clean up
client.collections.delete("DemoCollection")

# START VectorizerOctoAICustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    vectorizer_config=[
        Configure.NamedVectors.text2vec_octoai(
            name="title_vector",
            source_properties=["title"],
            model="thenlper/gte-large"
        )
    ],
    # Additional parameters not shown
)
# END VectorizerOctoAICustomModel

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerOctoAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    vectorizer_config=[
        Configure.NamedVectors.text2vec_octoai(
            name="title_vector",
            source_properties=["title"],
            # # Further options
            # model="thenlper/gte-large",
            # vectorize_collection_name=True
            # base_url="https://text.octoai.run",
        )
    ],
)
# END FullVectorizerOctoAI

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

# START VectorizerOpenAICustomModelV3
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_openai(
            name="title_vector",
            source_properties=["title"],
            # If using `text-embedding-3` model family
            model="text-embedding-3-large",
            dimensions=1024
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END VectorizerOpenAICustomModelV3

# clean up
client.collections.delete("DemoCollection")

# START VectorizerOpenAICustomModelLegacy
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_openai(
            name="title_vector",
            source_properties=["title"],
            # If using older model family e.g. `ada`
            model="ada",
            model_version="002",
            type="text"
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END VectorizerOpenAICustomModelLegacy

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
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerOpenAI

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerAzureOpenAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_azure_openai(
            name="title_vector",
            source_properties=["title"],
            resource_name="<azure-resource-name>",
            deployment_id="<azure-deployment-id>"
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerAzureOpenAI

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerAzureOpenAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_azure_openai(
            name="title_vector",
            source_properties=["title"],
            resource_name="<azure-resource-name>",
            deployment_id="<azure-deployment-id>",
            # # Further options
            # base_url="<custom_azure_url>",
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerAzureOpenAI

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
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerVoyageAI

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerTransformers
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_transformers(
            name="title_vector",
            source_properties=["title"]
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerTransformers

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerTransformers
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_transformers(
            name="title_vector",
            source_properties=["title"],
            # Further options
            pooling_strategy="masked_mean",
            inference_url="<custom_transformers_url>",          # For when using multiple inference containers
            passage_inference_url="<custom_transformers_url>",  # For when using DPR models
            query_inference_url="<custom_transformers_url>",    # For when using DPR models
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerTransformers

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerOllama
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_ollama(
            name="title_vector",
            source_properties=["title"],
            api_endpoint="http://host.docker.internal:11434",  # If using Docker, use this to contact your local Ollama instance
            model="snowflake-arctic-embed",  # The model to use, e.g. "nomic-embed-text"
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerOllama

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerOllama
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_ollama(
            name="title_vector",
            source_properties=["title"],
            # Further options
            api_endpoint="http://host.docker.internal:11434",  # If using Docker, use this to contact your local Ollama instance
            model="snowflake-arctic-embed",  # The model to use, e.g. "nomic-embed-text"
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerOllama

# clean up
client.collections.delete("DemoCollection")

# START BasicVectorizerGPT4All
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_gpt4all(
            name="title_vector",
            source_properties=["title"],
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicVectorizerGPT4All

# clean up
client.collections.delete("DemoCollection")

# START FullVectorizerGPT4All
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.text2vec_gpt4all(
            name="title_vector",
            source_properties=["title"],
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullVectorizerGPT4All

# clean up
client.collections.delete("DemoCollection")

# START BasicMMVectorizerCLIP
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="poster", data_type=DataType.BLOB),
    ],
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.multi2vec_clip(
            name="title_vector",
            # Define the fields to be used for the vectorization - using image_fields, text_fields, video_fields
            image_fields=[
                Multi2VecField(name="poster", weight=0.9)
            ],
            text_fields=[
                Multi2VecField(name="title", weight=0.1)
            ]
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicMMVectorizerCLIP

# clean up
client.collections.delete("DemoCollection")

# START FullMMVectorizerCLIP
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="poster", data_type=DataType.BLOB),
    ],
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.multi2vec_clip(
            name="title_vector",
            # Define the fields to be used for the vectorization - using image_fields, text_fields, video_fields
            image_fields=[
                Multi2VecField(name="poster", weight=0.9)
            ],
            text_fields=[
                Multi2VecField(name="title", weight=0.1)
            ],
            # inference_url="<custom_clip_url>"
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullMMVectorizerCLIP

# clean up
client.collections.delete("DemoCollection")

# START BasicMMVectorizerBind
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="poster", data_type=DataType.BLOB),
    ],
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.multi2vec_bind(
            name="title_vector",
            # Define the fields to be used for the vectorization - using image_fields, text_fields, video_fields
            image_fields=[
                Multi2VecField(name="poster", weight=0.9)
            ],
            text_fields=[
                Multi2VecField(name="title", weight=0.1)
            ]
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END BasicMMVectorizerBind

# clean up
client.collections.delete("DemoCollection")

# START FullMMVectorizerBind
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="poster", data_type=DataType.BLOB),
        Property(name="sound", data_type=DataType.BLOB),
        Property(name="video", data_type=DataType.BLOB),
    ],
    # highlight-start
    vectorizer_config=[
        Configure.NamedVectors.multi2vec_bind(
            name="title_vector",
            # Define the fields to be used for the vectorization
            image_fields=[
                Multi2VecField(name="poster", weight=0.7)
            ],
            text_fields=[
                Multi2VecField(name="title", weight=0.1)
            ],
            audio_fields=[
                Multi2VecField(name="sound", weight=0.1)
            ],
            video_fields=[
                Multi2VecField(name="video", weight=0.1)
            ],
            # depth, IMU and thermal fields are also available
        )
    ],
    # highlight-end
    # Additional parameters not shown
)
# END FullMMVectorizerBind

# clean up
client.collections.delete("DemoCollection")

source_objects = [
    {"title": "The Shawshank Redemption", "description": ""},
    {"title": "The Godfather", "description": ""},
    {"title": "The Dark Knight", "description": ""},
    {"title": "Jingle All the Way", "description": ""},
    {"title": "A Christmas Carol", "description": ""},
]


# START NearImageExample
def url_to_base64(url):
    import requests
    import base64

    image_response = requests.get(url)
    content = image_response.content
    return base64.b64encode(content).decode("utf-8")


# END NearImageExample


src_img_path = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"

for i in range(len(source_objects)):
    source_objects[i]["poster_path"] = src_img_path

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

# START MMBatchImportExample
collection = client.collections.get("DemoCollection")

with collection.batch.dynamic() as batch:
    for src_obj in source_objects:
        poster_b64 = url_to_base64(src_obj["poster_path"])
        weaviate_obj = {
            "title": src_obj["title"],
            "description": src_obj["description"],
            "poster": poster_b64  # Add the image in base64 encoding
        }

        # highlight-start
        # The model provider integration will automatically vectorize the object
        batch.add_object(
            properties=weaviate_obj,
            # vector=vector  # Optionally provide a pre-obtained vector
        )
        # highlight-end
# END MMBatchImportExample

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


# START NearImageExample
collection = client.collections.get("DemoCollection")

# highlight-start
query_b64 = url_to_base64(src_img_path)

response = collection.query.near_image(
    near_image=query_b64,
    limit=2,
    return_properties=["title", "release_date", "tmdb_id", "poster"]  # To include the poster property in the response (`blob` properties are not returned by default)
)
# highlight-end

for obj in response.objects:
    print(obj.properties["title"])
# END NearImageExample

client.close()
