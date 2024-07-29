# START-ANY
import weaviate

client = weaviate.connect_to_local()

# END-ANY

client.close()

import weaviate.classes as wvc
import os

wcd_apikey = os.environ["WCD_DEMO_RO_KEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=wvc.init.Auth.api_key(wcd_api_key),
)

# START-ANY
try:
# END-ANY

    # ========================================
    # GetServerMeta
    # ========================================

    # START GetServerMeta
    meta_info = client.get_meta()
    print(meta_info)
    # END GetServerMeta


# START-ANY

finally:
    client.close()
# END-ANY
