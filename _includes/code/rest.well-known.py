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
