# START SimpleInstantiationEmbedded
import weaviate
import os

client = weaviate.connect_to_embedded(
    version="<DESIRED_VERSION>",  # e.g. "1.23.3"
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")  # <-- Replace with your API key
    }
)

# DO SOMETHING
client.close()

# Optionally, stop the server:
# client._connection.embedded_db.stop()
# END SimpleInstantiationEmbedded


# START VerboseInstantiationEmbedded
import weaviate
from weaviate.embedded import EmbeddedOptions
import os

client = weaviate.WeaviateClient(
    embedded_options=EmbeddedOptions(
        additional_env_vars={
        "ENABLE_MODULES":
        "backup-s3,text2vec-openai,text2vec-cohere,text2vec-huggingface,ref2vec-centroid,generative-openai,qna-openai"}
    )
    # Add additional options here if desired (see Python client docs for more info)
)

# DO SOMETHING
client.close()

# Optionally, stop the server:
# client._connection.embedded_db.stop()
# END VerboseInstantiationEmbedded