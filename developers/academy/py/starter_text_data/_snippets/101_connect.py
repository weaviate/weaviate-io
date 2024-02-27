# WCSInstantiation
import weaviate
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("WCS_DEMO_ADMIN_KEY")
    ),  # Replace with your WCS key
)
# END WCSInstantiation

client.close()

# WCSAPIKeyInstantiation
import weaviate
import os

headers = {
    "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")
}  # Replace with your OpenAI API key

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("WCS_DEMO_ADMIN_KEY")
    ),  # Replace with your WCS key
    headers=headers,
)
# END WCSAPIKeyInstantiation

client.close()

# DockerInstantiation
import weaviate

client = weaviate.connect_to_local()
# END DockerInstantiation

# DockerAPIKeyInstantiation
import weaviate
import os

headers = {
    "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")
}  # Replace with your OpenAI API key

client = weaviate.connect_to_local(headers=headers)
# END DockerAPIKeyInstantiation

# PollLiveness
assert client.is_live()  # This will raise an exception if the client is not live
# END PollLiveness


# GetMeta
import json

metainfo = client.get_meta()
print(json.dumps(metainfo, indent=2))  # Print the meta information in a readable format
# END GetMeta


"""
# OutputGetMeta
{
  "hostname": "http://[::]:8080",
  "modules": {
    "backup-gcs": {
      "bucketName": "weaviate-wcs-prod-cust-europe-west2-workloads-backups",
      "rootName": "8616b69e-f8d2-4547-ad92-70b9557591c0"
    },
    "generative-aws": {
      "documentationHref": "https://docs.aws.amazon.com/bedrock/latest/APIReference/welcome.html",
      "name": "Generative Search - AWS"
    },
    "generative-cohere": {
      "documentationHref": "https://docs.cohere.com/reference/generate",
      "name": "Generative Search - Cohere"
    },
    "generative-openai": {
      "documentationHref": "https://platform.openai.com/docs/api-reference/completions",
      "name": "Generative Search - OpenAI"
    },
    "generative-palm": {
      "documentationHref": "https://cloud.google.com/vertex-ai/docs/generative-ai/chat/test-chat-prompts",
      "name": "Generative Search - Google PaLM"
    },
    "qna-openai": {
      "documentationHref": "https://platform.openai.com/docs/api-reference/completions",
      "name": "OpenAI Question & Answering Module"
    },
    "ref2vec-centroid": {},
    "reranker-cohere": {
      "documentationHref": "https://txt.cohere.com/rerank/",
      "name": "Reranker - Cohere"
    },
    "text2vec-aws": {
      "documentationHref": "https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-text-embeddings",
      "name": "AWS Module"
    },
    "text2vec-cohere": {
      "documentationHref": "https://docs.cohere.ai/embedding-wiki/",
      "name": "Cohere Module"
    },
    "text2vec-huggingface": {
      "documentationHref": "https://huggingface.co/docs/api-inference/detailed_parameters#feature-extraction-task",
      "name": "Hugging Face Module"
    },
    "text2vec-jinaai": {
      "documentationHref": "https://jina.ai/embeddings/",
      "name": "JinaAI Module"
    },
    "text2vec-openai": {
      "documentationHref": "https://platform.openai.com/docs/guides/embeddings/what-are-embeddings",
      "name": "OpenAI Module"
    },
    "text2vec-palm": {
      "documentationHref": "https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-text-embeddings",
      "name": "Google PaLM Module"
    }
  },
  "version": "1.23.8"
}
# END OutputGetMeta
"""


client.close()


# TryFinallyCloseDemo
import weaviate
import os

# END TryFinallyCloseDemo
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("WCS_DEMO_ADMIN_KEY")
    ),  # Replace with your WCS key
)
# TryFinallyCloseDemo
# Instantiate your client (not shown). e.g.:
# client = weaviate.connect_to_wcs(...) or
# client = weaviate.connect_to_local(...)

try:
    # Work with the client here - e.g.:
    assert client.is_live()
    pass

finally:  # This will always be executed, even if an exception is raised
    client.close()  # Close the connection & release resources
# END TryFinallyCloseDemo
