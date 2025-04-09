# START-ANY
import weaviate

client = weaviate.connect_to_local()

# END-ANY

client.close()

import weaviate.classes as wvc
import os

weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WEAVIATE_URL"),
    auth_credentials=wvc.init.Auth.api_key(weaviate_api_key),
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
