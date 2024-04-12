# Generic imports
import weaviate, os, json
import weaviate.classes as wvc

# =================================
# === Connect with long timeout ===
# =================================

# START ConnectWithLongTimeOut
# Set these environment variables
URL = os.getenv("YOUR_WCS_URL")
APIKEY = os.getenv("YOUR_WCS_API_KEY")

# Connect to a WCS instance
client = weaviate.connect_to_wcs(
    cluster_url=URL,
    auth_credentials=weaviate.auth.AuthApiKey(APIKEY),
    additional_config=wvc.init.AdditionalConfig(timeout=wvc.init.Timeout(init=10)),
)

# Check connection
client.is_ready()

# END ConnectWithLongTimeOut
client.close()

# =================================
# === Connect with skip checks ===
# =================================

# START ConnectWithSkipChecks

# Set these environment variables
URL = os.getenv("YOUR_WCS_URL")
APIKEY = os.getenv("YOUR_WCS_API_KEY")

# Connect to a WCS instance
client = weaviate.connect_to_wcs(
    cluster_url=URL,
    auth_credentials=weaviate.auth.AuthApiKey(APIKEY),
    skip_init_checks=True,
)

# Check connection
client.is_ready()

# END ConnectWithSkipChecks
client.close()
