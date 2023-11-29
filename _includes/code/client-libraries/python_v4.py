# LocalInstantiationBasic
import weaviate

client = weaviate.connect_to_local(port=8080, grpc_port=50051)
# END LocalInstantiationBasic

assert client.is_ready()

# WCSInstantiation
import weaviate

client = weaviate.connect_to_wcs(
    cluster_url="YOUR_WCS_URL",
    auth_credentials=weaviate.AuthApiKey("YOUR_API_KEY")
)
# END WCSInstantiation

assert client.is_ready()

# WCSwOIDCInstantiation
import weaviate

client = weaviate.connect_to_wcs(
    cluster_url="YOUR_WCS_URL",
    auth_credentials=weaviate.AuthClientPassword(
        username=os.environ["MY_USERNAME"],
        password=os.environ["MY_PASSWORD"]
    )
)
# END WCSwOIDCInstantiation

assert client.is_ready()

# CustomInstantiationBasic
import weaviate

client = weaviate.connect_to_custom(
    http_host="YOUR_HTTP_HOST",
    http_port="YOUR_HTTP_PORT",
    http_secure=True,
    grpc_host="YOUR_gRPC_HOST",
    grpc_port="YOUR_gRPC_PORT",
    grpc_secure=True,
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]  # Or any other inference API keys
    }
)

# END CustomInstantiationBasic

assert client.is_ready()

# DirectInstantiationFull
import weaviate

client = weaviate.WeaviateClient(
    connection_params=weaviate.ConnectionParams.from_params(
        http_host="YOUR_HTTP_HOST",
        http_port="YOUR_HTTP_PORT",
        http_secure=True,
        grpc_host="YOUR_gRPC_HOST",
        grpc_port="YOUR_gRPC_PORT",
        grpc_secure=True,
    ),
    auth_client_secret=weaviate.AuthApiKey("YOUR_APIKEY"),
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]
    },
    additional_config=weaviate.AdditionalConfig(
        startup_period=10,
        timeout=(5, 15)
    ),
)
# END DirectInstantiationFull

assert client.is_ready()

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

client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    headers={"X-OpenAI-Api": os.environ["OPENAI_APIKEY"]}
)
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
    weaviate.ConnectionParams.from_url("http://localhost:8080", 50051),
    auth_client_secret=weaviate.AuthClientPassword(
        username=os.environ["MY_USERNAME"],
        password=os.environ["MY_PASSWORD"]
    )
)
# END DirectInstantiationWithOIDC
"""

"""
# DirectInstantiationWithAPIKey
import weaviate

client = weaviate.WeaviateClient(
    weaviate.ConnectionParams.from_url("http://localhost:8080", 50051),
    auth_client_secret=weaviate.AuthApiKey("YOUR_API_KEY")
)
# END DirectInstantiationWithAPIKey
"""
