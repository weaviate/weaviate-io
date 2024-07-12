# START-ANY
import weaviate

client = weaviate.connect_to_local()

# END-ANY

client.close()

import weaviate.classes as wvc
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCD_DEMO_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCD_DEMO_RO_KEY")),
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
