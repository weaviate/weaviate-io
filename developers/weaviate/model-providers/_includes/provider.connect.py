# START-ANY
import weaviate
from weaviate.classes.init import Auth
import os

# END-ANY

weaviate_url = os.getenv("WEAVIATE_URL")
weaviate_key = os.getenv("WEAVIATE_API_KEY")

# START AnthropicInstantiation
# Recommended: save sensitive data as environment variables
anthropic_key = os.getenv("ANTHROPIC_APIKEY")
# END AnthropicInstantiation
# START AnyscaleInstantiation
# Recommended: save sensitive data as environment variables
anyscale_key = os.getenv("ANYSCALE_APIKEY")
# END AnyscaleInstantiation
# START AWSInstantiation
# Recommended: save sensitive data as environment variables
aws_access_key = os.getenv("AWS_ACCESS_KEY")
aws_secret_key = os.getenv("AWS_SECRET_KEY")
# END AWSInstantiation
# START CohereInstantiation
# Recommended: save sensitive data as environment variables
cohere_key = os.getenv("COHERE_APIKEY")
# END CohereInstantiation
# START FriendliInstantiation
# Recommended: save sensitive data as environment variables
friendli_key = os.getenv("FRIENDLI_TOKEN")
# END FriendliInstantiation
# START FriendliDedicatedInstantiation
# Recommended: save sensitive data as environment variables
friendli_key = os.getenv("FRIENDLI_TOKEN")
# END FriendliDedicatedInstantiation
# START GoogleInstantiation  # START GoogleVertexInstantiation
# Recommended: save sensitive data as environment variables
vertex_key = os.getenv("VERTEX_APIKEY")
# START GoogleInstantiation  # END GoogleVertexInstantiation
studio_key = os.getenv("STUDIO_APIKEY")
# END GoogleInstantiation
# START HuggingFaceInstantiation
# Recommended: save sensitive data as environment variables
huggingface_key = os.getenv("HUGGINGFACE_APIKEY")
# END HuggingFaceInstantiation
# START JinaAIInstantiation
# Recommended: save sensitive data as environment variables
jinaai_key = os.getenv("JINAAI_APIKEY")
# END JinaAIInstantiation
# START MistralInstantiation
# Recommended: save sensitive data as environment variables
mistral_key = os.getenv("MISTRAL_APIKEY")
# END MistralInstantiation
# START OctoAIInstantiation
# Recommended: save sensitive data as environment variables
octoai_key = os.getenv("OCTOAI_APIKEY")
# END OctoAIInstantiation
# START OpenAIInstantiation
# Recommended: save sensitive data as environment variables
openai_key = os.getenv("OPENAI_APIKEY")
# END OpenAIInstantiation
# START AzureOpenAIInstantiation
# Recommended: save sensitive data as environment variables
azure_key = os.getenv("AZURE_APIKEY")
# END AzureOpenAIInstantiation
# START VoyageAIInstantiation
# Recommended: save sensitive data as environment variables
voyageai_key = os.getenv("VOYAGEAI_APIKEY")
# END VoyageAIInstantiation


# START-ANY
# highlight-start
headers = {
# END-ANY
# START AnthropicInstantiation
    "X-Anthropic-Api-Key": anthropic_key,
    "X-Anthropic-Baseurl": "https://api.anthropic.com",  # Optional; for providing a custom base URL
# END AnthropicInstantiation
# START AnyscaleInstantiation
    "X-Anyscale-Api-Key": anyscale_key,
# END AnyscaleInstantiation
# START AWSInstantiation
    "X-AWS-Access-Key": aws_access_key,
    "X-AWS-Secret-Key": aws_secret_key,
# END AWSInstantiation
# START CohereInstantiation
    "X-Cohere-Api-Key": cohere_key,
# END CohereInstantiation
# START FriendliInstantiation
    "X-Friendli-Api-Key": friendli_key,
# END FriendliInstantiation
# START FriendliDedicatedInstantiation
    "X-Friendli-Api-Key": friendli_key,
    "X-Friendli-Baseurl": "https://inference.friendli.ai/dedicated",
# END FriendliDedicatedInstantiation
# START GoogleInstantiation  # START GoogleVertexInstantiation
    "X-Google-Vertex-Api-Key": vertex_key,
# START GoogleInstantiation  # END GoogleVertexInstantiation
    "X-Google-Studio-Api-Key": studio_key,
# END GoogleInstantiation
# START HuggingFaceInstantiation
    "X-HuggingFace-Api-Key": huggingface_key,
# END HuggingFaceInstantiation
# START JinaAIInstantiation
    "X-JinaAI-Api-Key": jinaai_key,
# END JinaAIInstantiation
# START MistralInstantiation
    "X-Mistral-Api-Key": mistral_key,
# END MistralInstantiation
# START OctoAIInstantiation
    "X-OctoAI-Api-Key": octoai_key,
# END OctoAIInstantiation
# START OpenAIInstantiation
    "X-OpenAI-Api-Key": openai_key,
# END OpenAIInstantiation
# START AzureOpenAIInstantiation
    "X-Azure-Api-Key": azure_key,
# END AzureOpenAIInstantiation
# START VoyageAIInstantiation
    "X-VoyageAI-Api-Key": voyageai_key,
# END VoyageAIInstantiation
# START-ANY
}
# highlight-end
# END-ANY

# START-ANY

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,                       # `weaviate_url`: your Weaviate URL
    auth_credentials=Auth.api_key(weaviate_key),      # `weaviate_key`: your Weaviate API key
    # highlight-start
    headers=headers
    # highlight-end
)
# END-ANY


# START-ANY

# Work with Weaviate

client.close()
# END-ANY
