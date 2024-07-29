import weaviate.classes as wvc
import os

# START-ANY
import weaviate

client = weaviate.connect_to_local()

# END-ANY

client.close()

from weaviate.classes.init import Auth

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=Auth.api_key(os.getenv("WCD_DEMO_RO_KEY")),
)

try:

    # ========================================
    # GetNodes
    # ========================================

    # START GetNodes
    nodes_info = client.cluster.nodes(
        collection="JeopardyQuestion",  # If omitted, all collections will be returned
        output="verbose"  #  If omitted, will be "minimal"
    )
    print(nodes_info)
    # END GetNodes


# START-ANY

finally:
    client.close()
# END-ANY
