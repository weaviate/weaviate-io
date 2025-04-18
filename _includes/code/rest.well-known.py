import weaviate.classes as wvc
import os

# START-ANY
import weaviate

client = weaviate.connect_to_local()

# END-ANY

client.close()

from weaviate.classes.init import Auth

# Best practice: store your credentials in environment variables
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.getenv("WEAVIATE_URL"),
    auth_credentials=Auth.api_key(weaviate_api_key),
)

try:
    # ========================================
    # GetOIDCInfo
    # ========================================

    # START GetOIDCInfo
    open_id_configuration = client.get_open_id_configuration()

    print(open_id_configuration)
    # END GetOIDCInfo

    # ========================================
    # GetLiveness
    # ========================================

    # START GetLiveness
    print(client.is_live())
    # END GetLiveness

    # ========================================
    # GetReadiness
    # ========================================

    # START GetReadiness
    print(client.is_ready())
    # END GetReadiness


# START-ANY

finally:
    client.close()
# END-ANY
