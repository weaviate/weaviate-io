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

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeAnthropic
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.anthropic()
    # highlight-end
    # Additional parameters not shown
)
# END BasicGenerativeAnthropic

# clean up
client.collections.delete("DemoCollection")

# START GenerativeAnthropicCustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.anthropic(
        model="claude-3-opus-20240229"
    )
    # highlight-end
    # Additional parameters not shown
)
# END GenerativeAnthropicCustomModel

# clean up
client.collections.delete("DemoCollection")

# START FullGenerativeAnthropic
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.anthropic(
        # # These parameters are optional
        # base_url="https://api.anthropic.com",
        # model="claude-3-opus-20240229",
        # temperature=0.7,
        # stop_sequences=["\n\n"],
        # top_p=0.9,
        # top_k=5,
    )
    # highlight-end
    # Additional parameters not shown
)
# END FullGenerativeAnthropic

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeAnyscale
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.anyscale()
    # highlight-end
    # Additional parameters not shown
)
# END BasicGenerativeAnyscale

# clean up
client.collections.delete("DemoCollection")

# START GenerativeAnyscaleCustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.anyscale(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1"
    )
    # highlight-end
    # Additional parameters not shown
)
# END GenerativeAnyscaleCustomModel

# clean up
client.collections.delete("DemoCollection")

# START FullGenerativeAnyscale
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.anyscale(
        # # These parameters are optional
        # model="meta-llama/Llama-2-70b-chat-hf",
        # temperature=0.7,
    )
    # highlight-end
    # Additional parameters not shown
)
# END FullGenerativeAnyscale

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeAWSBedrock
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.aws(
        region="us-east-1",
        service="bedrock",
        model="cohere.command-r-plus-v1:0"
    )
    # highlight-end
)
# END BasicGenerativeAWSBedrock

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeAWSSagemaker
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.aws(
        region="us-east-1",
        service="sagemaker",
        endpoint="<custom_sagemaker_url>"
    )
    # highlight-end
)
# END BasicGenerativeAWSSagemaker

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeCohere
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.cohere()
    # highlight-end
    # Additional parameters not shown
)
# END BasicGenerativeCohere

# clean up
client.collections.delete("DemoCollection")

# START GenerativeCohereCustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.cohere(
        model="command-r-plus"
    )
    # highlight-end
    # Additional parameters not shown
)
# END GenerativeCohereCustomModel

# clean up
client.collections.delete("DemoCollection")


# START FullGenerativeCohere
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.cohere(
        # # These parameters are optional
        # model="command-r",
        # temperature=0.7,
        # max_tokens=500,
        # k=5,
        # stop_sequences=["\n\n"],
        # return_likelihoods="GENERATION"
    )
    # highlight-end
    # Additional parameters not shown
)
# END FullGenerativeCohere

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeGoogleVertex
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.palm(
        project_id="<google-cloud-project-id>",  # Required for Vertex AI
        model_id="gemini-1.0-pro"
    )
    # highlight-end
    # Additional parameters not shown
)
# END BasicGenerativeGoogleVertex

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeGoogleStudio
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.palm(
        model_id="gemini-pro"
    )
    # highlight-end
    # Additional parameters not shown
)
# END BasicGenerativeGoogleStudio

# clean up
client.collections.delete("DemoCollection")

# START FullGenerativeGoogle
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.palm(
        # project_id="<google-cloud-project-id>",  # Required for Vertex AI
        # model_id="<google-model-id>",
        # api_endpoint="<google-api-endpoint>",
        # temperature=0.7,
        # top_k=5,
        # top_p=0.9,
        # vectorize_collection_name=False,
    )
    # highlight-end
    # Additional parameters not shown
)
# END FullGenerativeGoogle

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeMistral
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.mistral()
    # highlight-end
    # Additional parameters not shown
)
# END BasicGenerativeMistral

# clean up
client.collections.delete("DemoCollection")

# START GenerativeMistralCustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.mistral(
        model="mistral-large-latest"
    )
    # highlight-end
    # Additional parameters not shown
)
# END GenerativeMistralCustomModel

# clean up
client.collections.delete("DemoCollection")

# START FullGenerativeMistral
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.mistral(
        # # These parameters are optional
        # model="mistral-large",
        # temperature=0.7,
        # max_tokens=500,
    )
    # highlight-end
)
# END FullGenerativeMistral

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeOctoAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    generative_config=Configure.Generative.octoai()
    # Additional parameters not shown
)
# END BasicGenerativeOctoAI

# clean up
client.collections.delete("DemoCollection")

# START GenerativeOctoAICustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    generative_config=Configure.Generative.octoai(
        model="meta-llama-3-70b-instruct"
    )
    # Additional parameters not shown
)
# END GenerativeOctoAICustomModel

# clean up
client.collections.delete("DemoCollection")

# START FullGenerativeOctoAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    generative_config=Configure.Generative.octoai(
        # # These parameters are optional
        model = "meta-llama-3-70b-instruct",
        max_tokens = 500,
        temperature = 0.7,
        base_url = "https://text.octoai.run"
    )
)
# END FullGenerativeOctoAI

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeOpenAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.openai()
    # highlight-end
    # Additional parameters not shown
)
# END BasicGenerativeOpenAI

# clean up
client.collections.delete("DemoCollection")

# START GenerativeOpenAICustomModel
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.openai(
        model="gpt-4-1106-preview"
    )
    # highlight-end
    # Additional parameters not shown
)
# END GenerativeOpenAICustomModel

# clean up
client.collections.delete("DemoCollection")

# START FullGenerativeOpenAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.openai(
        # # These parameters are optional
        # model="gpt-4",
        # frequency_penalty=0,
        # max_tokens=500,
        # presence_penalty=0,
        # temperature=0.7,
        # top_p=0.7,
        # base_url="<custom_openai_url>"
    )
    # highlight-end
    # Additional parameters not shown
)
# END FullGenerativeOpenAI

# clean up
client.collections.delete("DemoCollection")

# START BasicGenerativeAzureOpenAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.azure_openai(
        resource_name="<azure-resource-name>",
        deployment_id="<azure-deployment-id>",
    )
    # highlight-end
    # Additional parameters not shown
)
# END BasicGenerativeAzureOpenAI

# clean up
client.collections.delete("DemoCollection")

# START FullGenerativeAzureOpenAI
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.azure_openai(
        resource_name="<azure-resource-name>",
        deployment_id="<azure-deployment-id>",
        # # These parameters are optional
        # frequency_penalty=0,
        # max_tokens=500,
        # presence_penalty=0,
        # temperature=0.7,
        # top_p=0.7,
        # base_url="<custom-azure-url>"
    )
    # highlight-end
    # Additional parameters not shown
)
# END FullGenerativeAzureOpenAI

# START BasicGenerativeOllama
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.ollama(
        api_endpoint="http://host.docker.internal:11434",  # If using Docker, use this to contact your local Ollama instance
        model="llama3"  # The model to use, e.g. "phi3", or "mistral", "command-r-plus", "gemma"
    )
    # highlight-end
    # Additional parameters not shown
)
# END BasicGenerativeOllama

# clean up
client.collections.delete("DemoCollection")

# START FullGenerativeOllama
from weaviate.classes.config import Configure

client.collections.create(
    "DemoCollection",
    # highlight-start
    generative_config=Configure.Generative.ollama(
        api_endpoint="http://host.docker.internal:11434",  # If using Docker, use this to contact your local Ollama instance
        model="llama3"  # The model to use, e.g. "phi3", or "mistral", "command-r-plus", "gemma"
    )
    # highlight-end
    # Additional parameters not shown
)
# END FullGenerativeOllama

source_objects = [
    {"title": "The Shawshank Redemption"},
    {"title": "The Godfather"},
    {"title": "The Dark Knight"},
    {"title": "Jingle All the Way"},
    {"title": "A Christmas Carol"},
]

collection = client.collections.get("DemoCollection")

with collection.batch.dynamic() as batch:
    for src_obj in source_objects:
        weaviate_obj = {
            "title": src_obj["title"],
        }
        batch.add_object(
            properties=weaviate_obj,
        )

if len(collection.batch.failed_objects) > 0:
    print(f"Failed to import {len(collection.batch.failed_objects)} objects")
    for failed in collection.batch.failed_objects:
        print(f"e.g. Failed to import object with error: {failed.message}")

# START SinglePromptExample
collection = client.collections.get("DemoCollection")

response = collection.generate.near_text(
    query="A holiday film",  # The model provider integration will automatically vectorize the query
    # highlight-start
    single_prompt="Translate this into French: {title}",
    limit=2
    # highlight-end
)

for obj in response.objects:
    print(obj.properties["title"])
    print(f"Generated output: {obj.generated}")  # Note that the generated output is per object
# END SinglePromptExample

# START GroupedTaskExample
collection = client.collections.get("DemoCollection")

response = collection.generate.near_text(
    query="A holiday film",  # The model provider integration will automatically vectorize the query
    # highlight-start
    grouped_task="Write a fun tweet to promote readers to check out these films.",
    limit=2
    # highlight-end
)

print(f"Generated output: {response.generated}")  # Note that the generated output is per query
for obj in response.objects:
    print(obj.properties["title"])
# END GroupedTaskExample

client.close()
