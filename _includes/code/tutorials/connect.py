#=====================================
#=== Connect without authorization ===
#=====================================

# START WithoutAuth
import weaviate

client = weaviate.connect_to_local()
# END WithoutAuth

#=====================================
#=== Connect with Weaviate API key ===
#=====================================

# START WeaviateAPIKey
import weaviate
import os

# Connect to a local Weaviate instance
client = weaviate.connect_to_custom( 
    http_host="localhost",
    http_port=8080,
    http_secure=False,
    grpc_host="localhost",
    grpc_port=50051,
    grpc_secure=False,
    auth_credentials=weaviate.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY"))  # Set this environment variable
)

# Alternative: Connect to a WCS instance
# client = weaviate.connect_to_wcs(
#     cluster_url=os.getenv("WCS_DEMO_URL"),  # Set this environment variable
#     auth_credentials=weaviate.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY"))  # Set this environment variable
# )
# END WeaviateAPIKey

#=========================
#=== Connect with OIDC ===
#=========================

# START ConnectWithOIDC
import weaviate
import os

client = weaviate.connect_to_wcs(
    cluster_url="https://some-endpoint.weaviate.network",
    auth_credentials=weaviate.AuthClientPassword(
        username=os.getenv("WCS_USER_NAME"),  # Set this environment variable 
        password=os.getenv("WCS_PASSWORD")  # Set this environment variable
    )
)
# END ConnectWithOIDC


#===================================
#=== Connect to third party APIs ===
#===================================

# START AuthOpenAIAPIKey
import weaviate
import os

client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]  # Replace with your inference API key
    }
)
# END AuthOpenAIAPIKey

#====================================
#=== Connect to embedded Weaviate ===
#====================================

# START ConnectEmbedded
import weaviate

client = weaviate.connect_to_embedded()

# END ConnectEmbedded
