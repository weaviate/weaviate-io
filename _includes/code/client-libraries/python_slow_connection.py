# Generic imports
import weaviate, os, json
import weaviate.classes as wvc

# =================================
# === Connect with long timeout ===
# =================================

# START ConnectWithLongTimeOut
from weaviate.classes.init import AdditionalConfig, Timeout, Auth
import weaviate

# Set these environment variables
URL = os.getenv("WCD_URL")
APIKEY = os.getenv("WCD_API_KEY")

# Connect to Weaviate Cloud
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=URL,
    auth_credentials=Auth.api_key(APIKEY),
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
from weaviate.classes.init import Auth

# Set these environment variables
URL = os.getenv("WCD_URL")
APIKEY = os.getenv("WCD_API_KEY")

# Connect to Weaviate Cloud
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=URL,
    auth_credentials=Auth.api_key(APIKEY),
    skip_init_checks=True,
)

# Check connection
client.is_ready()
# END ConnectWithSkipChecks

client.close()
