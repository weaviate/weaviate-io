# START-ANY
import weaviate
from weaviate.auth import AuthApiKey
import os

# END-ANY

weaviate_url = os.getenv("WEAVIATE_URL")
weaviate_key = os.getenv("WEAVIATE_API_KEY")


# START AWSInstantiation
# Recommended: save sensitive data as environment variables
aws_access_key = os.getenv("AWS_ACCESS_KEY")
aws_secret_key = os.getenv("AWS_SECRET_KEY")
# END AWSInstantiation
# START CohereInstantiation
# Recommended: save sensitive data as environment variables
cohere_key = os.getenv("COHERE_API_KEY")
# END CohereInstantiation
# START OpenAIInstantiation
# Recommended: save sensitive data as environment variables
openai_key = os.getenv("OPENAI_API_KEY")
# END OpenAIInstantiation


# START-ANY
# highlight-start
headers = {
# END-ANY
# START AWSInstantiation
    "X-AWS-Access-Key": aws_access_key,
    "X-AWS-Secret-Key": aws_secret_key,
# END AWSInstantiation
# START CohereInstantiation
    "X-Cohere-Api-Key": cohere_key,
# END CohereInstantiation
# START OpenAIInstantiation
    "X-OpenAI-Api-Key": openai_key,
# END OpenAIInstantiation
# START-ANY
}
# highlight-end
# END-ANY

# START-ANY

client = weaviate.connect_to_wcs(
    cluster_url=weaviate_url,                       # `weaviate_url`: your Weaviate URL
    auth_credentials=AuthApiKey(weaviate_key),      # `weaviate_key`: your Weaviate API key
    # highlight-start
    headers=headers
    # highlight-end
)
# END-ANY


# START-ANY

# Work with Weaviate

client.close()
# END-ANY
