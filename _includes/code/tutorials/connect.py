# =====================================
# === Connect without authorization ===
# =====================================

# APIKeys
import os

weaviate_url = os.getenv("WEAVIATE_URL")        # Recommended: save to an environment variable
weaviate_key = os.getenv("WEAVIATE_API_KEY")    # Recommended: save to an environment variable

# Uncomment and use these lines if you want to hardcode (not recommended for production)
# weaviate_url = "<your-weaviate-url>"          # Plaintext url
# weaviate_key = "<your-weaviate-apikey>"       # Plaintext key - not safe for deployment
# END APIKeys

# START WithoutAuth
import weaviate

client = weaviate.connect_to_local()
# END WithoutAuth

# =============================================
# === Connect with Weaviate API key (custom)===
# =============================================

# START WeaviateAPIKeyCustom
import weaviate
from weaviate.auth import AuthApiKey

# Connect to a local Weaviate instance
client = weaviate.connect_to_custom(
    http_host="localhost",
    http_port=8080,
    http_secure=False,
    grpc_host="localhost",
    grpc_port=50051,
    grpc_secure=False,
    auth_credentials=AuthApiKey(weaviate_key),   # `weaviate_key`: your Weaviate API key
)
# END WeaviateAPIKeyCustom

# ==========================================
# === Connect with Weaviate API key (WCD)===
# ==========================================

# START WeaviateAPIKeyWCD
import weaviate
from weaviate.auth import AuthApiKey

# Connect to Weaviate Cloud
client = weaviate.connect_to_wcs(
    cluster_url=weaviate_url,                    # `weaviate_url`: your Weaviate URL
    auth_credentials=AuthApiKey(weaviate_key),   # `weaviate_key`: your Weaviate API key
)
# END WeaviateAPIKeyWCD


# =========================
# === Connect with OIDC ===
# =========================

# START ConnectWithOIDC
import weaviate

wcd_username = os.getenv("WCD_USERNAME")    # Recommended: save to an environment variable
wcd_password = os.getenv("WCD_PASSWORD")    # Recommended: save to an environment variable

client = weaviate.connect_to_wcs(
    cluster_url="https://your-wcs-endpoint.weaviate.network",
    auth_credentials=weaviate.AuthClientPassword(
        username=wcd_username,  # `wcd_username`: your WCD username
        password=wcd_password,  # `wcd_password`: your WCD password
    ),
)
# END ConnectWithOIDC


# ===================================
# === Connect to third party APIs ===
# ===================================

# START AuthThirdPartyAPIKey
import weaviate
from weaviate.auth import AuthApiKey

cohere_key = os.getenv("Cohere_API_KEY")    # Recommended: save to an environment variable

client = weaviate.connect_to_wcs(
    cluster_url=weaviate_url,                       # `weaviate_url`: your Weaviate URL
    auth_credentials=AuthApiKey(weaviate_key),      # `weaviate_key`: your Weaviate API key
    headers={"X-Cohere-Api-Key": cohere_key}        # `cohere_key`: your Cohere key
)
# END AuthThirdPartyAPIKey

# ====================================
# === Connect to embedded Weaviate ===
# ====================================

# START ConnectEmbedded
import weaviate

client = weaviate.connect_to_embedded()
# END ConnectEmbedded
