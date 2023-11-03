# LocalInstantiationBasic
import weaviate

client = weaviate.connect_to_local(port=8080, grpc_port=50051)
# END LocalInstantiationBasic

assert client.is_ready()

"""
# WCSInstantiation
import weaviate

client = weaviate.connect_to_wcs(cluster_id="edu-demo", api_key="learn-weaviate")
# END WCSInstantiation

assert client.is_ready()
"""

# DirectInstantiationBasic
import weaviate

client = weaviate.WeaviateClient(
    weaviate.ConnectionParams.from_url("http://localhost:8080", 50051)
)
# END DirectInstantiationBasic

assert client.is_ready()

# LocalInstantiationWithHeaders
import weaviate
import os

headers = {"X-OpenAI-Api": os.environ["OPENAI_APIKEY"]}
client = weaviate.connect_to_local(port=8080, grpc_port=50051, headers=headers)
# END LocalInstantiationWithHeaders

assert client.is_ready()

# LocalInstantiationWithTimeout
import weaviate

client = weaviate.connect_to_local(port=8080, grpc_port=50051, timeout=(5, 15))
# END LocalInstantiationWithTimeout

assert client.is_ready()

"""
# DirectInstantiationWithOIDC
import weaviate
import os

client = weaviate.WeaviateClient(
    weaviate.ConnectionParams.from_url("https://edu-demo.weaviate.network", 50051),
    auth_client_secret=weaviate.AuthClientPassword(
        username=os.environ["WCS_USERNAME"],
        password=os.environ["WCS_PASSWORD"]
    )
)
# END DirectInstantiationWithOIDC
"""

"""
# DirectInstantiationWithAPIKey
import weaviate

client = weaviate.WeaviateClient(
    weaviate.ConnectionParams.from_url("https://edu-demo.weaviate.network", 50051),
    auth_client_secret=weaviate.AuthApiKey("learn-weaviate")
)
# END DirectInstantiationWithAPIKey
"""
