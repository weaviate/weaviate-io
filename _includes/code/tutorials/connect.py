# =====================================
# === Connect without authorization ===
# =====================================

# START WithoutAuth
import weaviate

client = weaviate.connect_to_local()
# END WithoutAuth

# =============================================
# === Connect with Weaviate API key (custom)===
# =============================================

# START WeaviateAPIKeyCustom
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
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("WEAVIATE_API_KEY")
    ),  # Set this environment variable
)
# END WeaviateAPIKeyCustom

# ==========================================
# === Connect with Weaviate API key (WCS)===
# ==========================================

# START WeaviateAPIKeyWCS
import weaviate
import os

# Connect to a WCS instance
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("YOUR_WCS_URL"),  # Set this environment variable
    auth_credentials=weaviate.auth.AuthApiKey(
        os.getenv("YOUR_WCS_AUTH_KEY")
    ),  # Set this environment variable
)
# END WeaviateAPIKeyWCS


# =========================
# === Connect with OIDC ===
# =========================

# START ConnectWithOIDC
import weaviate
import os

client = weaviate.connect_to_wcs(
    cluster_url="https://your-wcs-endpoint.weaviate.network",
    auth_credentials=weaviate.AuthClientPassword(
        username=os.getenv("YOUR_WCS_USER_NAME"),  # Set this environment variable
        password=os.getenv("YOUR_WCS_PASSWORD"),  # Set this environment variable
    ),
)
# END ConnectWithOIDC


# ===================================
# === Connect to third party APIs ===
# ===================================

# START AuthOpenAIAPIKey
import weaviate
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("YOUR_WCS_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("YOUR_WCS_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.environ[
            "YOUR_OPENAI_API_KEY"
        ]  # Replace with your inference API key
    },
)
# END AuthOpenAIAPIKey

# ====================================
# === Connect to embedded Weaviate ===
# ====================================

# START ConnectEmbedded
import weaviate

client = weaviate.connect_to_embedded()

# END ConnectEmbedded
