import weaviate.classes as wvc
import os

# START-ANY
import weaviate

client = weaviate.connect_to_local()

# END-ANY

client.close()

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY")),
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
