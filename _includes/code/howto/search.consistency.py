# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# ===== Instantiation
import weaviate
from weaviate.auth import AuthApiKey
import os
# START QueryWithReplication
from weaviate.classes.config import ConsistencyLevel

# END QueryWithReplication

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=AuthApiKey(os.getenv("WCD_DEMO_RO_KEY")),
    headers={
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
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
