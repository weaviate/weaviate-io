# START SimpleInstantiationEmbedded
import weaviate
import os

client = weaviate.connect_to_embedded(
    version="<DESIRED_VERSION>",  # e.g. "1.23.3"
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")  # Replace with your API key
    }
)

# Add your client code here. 

# END SimpleInstantiationEmbedded


# START ModuleInstantiationEmbedded
import weaviate
from weaviate.embedded import EmbeddedOptions
import os

client = weaviate.WeaviateClient(
    embedded_options=EmbeddedOptions(
        additional_env_vars={
        "ENABLE_MODULES":
        "backup-s3,text2vec-openai,text2vec-cohere,text2vec-huggingface,ref2vec-centroid,generative-openai,qna-openai"}
    )
    # Add additional options here (see Python client docs for syntax)
)

# Add your client code here.

# Remember to run your client code in a context manager or call client.close()
# before exiting the client to avoid connection errors. 

# END ModuleInstantiationEmbedded


# START FullInstantiationEmbedded
import weaviate
from weaviate.embedded import EmbeddedOptions
import os

client = weaviate.WeaviateClient(
    embedded_options=EmbeddedOptions(
        additional_env_vars={
        "ENABLE_MODULES":
        "backup-s3,text2vec-openai,text2vec-cohere,text2vec-huggingface,ref2vec-centroid,generative-openai,qna-openai"}
    )
    # Add additional options here (see Python client docs for syntax)
)

# Add your client code here. 

# Uncomment the next line to exit the Embedded Weaviate server.
# client.close()

# END FullInstantiationEmbedded