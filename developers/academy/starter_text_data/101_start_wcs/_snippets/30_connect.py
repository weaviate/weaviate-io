# WCSInstantiation
import weaviate
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY"))  # Replace with your WCS key
)
# END WCSInstantiation


# PollLiveness
assert client.is_live()  # This will raise an exception if the client is not live
# END PollLiveness


# GetMeta
metainfo = client.get_meta()
print(metainfo)
# END GetMeta

client.close()


# TryFinallyCloseDemo
import weaviate
import os

client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY"))  # Replace with your WCS key
)

try:
    # Work with the client here - e.g.:
    assert client.is_live()
    pass

finally:  # This will always be executed, even if an exception is raised
    client.close()  # Close the connection & release resources
# END TryFinallyCloseDemo


# ContextManagerCloseDemo
import weaviate
import os

with weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_DEMO_URL"),  # Replace with your WCS URL
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_DEMO_RO_KEY"))  # Replace with your WCS key
) as client:  # Use this context manager to ensure the connection is closed
    # Work with the client here - e.g.:
    assert client.is_live()
    pass
    # The connection is automatically closed at the end of the block
# END ContextManagerCloseDemo