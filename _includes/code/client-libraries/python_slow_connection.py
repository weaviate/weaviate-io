# Generic imports
import weaviate, os, json
import weaviate.classes as wvc

# =================================
# === Connect with long timeout ===
# =================================

# START ConnectWithLongTimeOut
from weaviate.classes.init import AdditionalConfig, Timeout
from weaviate.auth import AuthApiKey
import weaviate

# Set these environment variables
URL = os.getenv("WCS_URL")
APIKEY = os.getenv("WCS_API_KEY")

# Connect to Weaviate Cloud
client = weaviate.connect_to_wcs(
    cluster_url=URL,
    auth_credentials=AuthApiKey(APIKEY),
    additional_config=AdditionalConfig(timeout=Timeout(init=10)),
)

# Check connection
client.is_ready()
# END ConnectWithLongTimeOut

client.close()

# =================================
# === Connect with skip checks ===
# =================================

# START ConnectWithSkipChecks
import weaviate
from weaviate.auth import AuthApiKey

# Set these environment variables
URL = os.getenv("WCS_URL")
APIKEY = os.getenv("WCS_API_KEY")

# Connect to Weaviate Cloud
client = weaviate.connect_to_wcs(
    cluster_url=URL,
    auth_credentials=AuthApiKey(APIKEY),
    skip_init_checks=True,
)

# Check connection
client.is_ready()
# END ConnectWithSkipChecks

client.close()
