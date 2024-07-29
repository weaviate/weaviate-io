# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation
import weaviate
from weaviate.classes.init import Auth
import os
# START QueryWithReplication
from weaviate.classes.config import ConsistencyLevel

# END QueryWithReplication

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_DEMO_URL"]
wcd_api_key = os.environ["WCD_DEMO_RO_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,
    auth_credentials=Auth.api_key(wcd_api_key),
    headers={
        "X-OpenAI-Api-Key": openai_api_key,
    }
)

collection_name = "JeopardyQuestion"
collection = client.collections.get(collection_name)

# ========================================
# ConsistencyExample
# ========================================

# START QueryWithReplication
questions = client.collections.get(collection_name).with_consistency_level(
    # highlight-start
    consistency_level=ConsistencyLevel.QUORUM
    # highlight-end
)
response = collection.query.fetch_object_by_id("36ddd591-2dee-4e7e-a3cc-eb86d30a4303")

# The parameter passed to `withConsistencyLevel` can be one of:
# * 'ALL',
# * 'QUORUM' (default), or
# * 'ONE'.
#
# It determines how many replicas must acknowledge a request
# before it is considered successful.

for o in response.objects:
    print(o.properties)  # Inspect returned objects
    # END QueryWithReplication

    # TEST
    assert type(o.properties) == dict

client.close()
