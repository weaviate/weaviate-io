# THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

# START TimeoutLocal
import weaviate
from weaviate.classes.init import AdditionalConfig, Timeout

client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    additional_config=AdditionalConfig(
        timeout=Timeout(init=2, query=45, insert=120)  # Values in seconds
    )
)
# END TimeoutLocal
client.close()


# START TimeoutWCD
import weaviate, os
import weaviate.classes as wvc

# Set these environment variables
URL = os.getenv("WCD_URL")
APIKEY = os.getenv("WCD_API_KEY")

# Connect to a WCD instance
client = weaviate.connect_to_WCD(
    cluster_url=URL,
    auth_credentials=weaviate.auth.AuthApiKey(APIKEY),
    # skip_init_checks=True,
    additional_config=wvc.init.AdditionalConfig(
        timeout=wvc.init.Timeout(init=10,insert=20,query=20)
        )
    )

# END TimeoutWCD
client.close()


# START TimeoutCustom
import weaviate, os
import weaviate.classes as wvc

# Set these environment variables
URL = os.getenv("WCD_URL")
GPC_URL = os.getenv("WCD_GPC_URL")
APIKEY = os.getenv("WCD_API_KEY")

# Connect to a WCD instance
client = weaviate.connect_to_custom(
    http_host=URL,
    http_port=8080,
    http_secure=False,
    grpc_host=GPC_URL,
    grpc_port=50051,
    grpc_secure=False,
    additional_config=wvc.init.AdditionalConfig(
        timeout=wvc.init.Timeout(init=10,insert=20,query=20)
    )
)

# END TimeoutCustom
client.close()
