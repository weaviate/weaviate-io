# THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

############################
### Local with a timeout ###
############################

# START TimeoutLocal
import weaviate
from weaviate.classes.init import AdditionalConfig, Timeout

client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    additional_config=AdditionalConfig(
        timeout=Timeout(init=30, query=60, insert=120)  # Values in seconds
    )
)

print(client.is_ready())
# END TimeoutLocal

assert client.is_ready()

client.close()


##########################
### WCD with a timeout ###
##########################

# START TimeoutWCD
import weaviate, os
from weaviate.classes.init import Auth
from weaviate.classes.init import AdditionalConfig, Timeout

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

# Connect to a WCD instance
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
    # skip_init_checks=True,
    additional_config=AdditionalConfig(
        timeout=Timeout(init=30, query=60, insert=120)  # Values in seconds
    )
)

print(client.is_ready())
# END TimeoutWCD

assert client.is_ready()

client.close()

#########################
### Custom connection ###
#########################

# START CustomConnect  # START TimeoutCustom
import weaviate, os
from weaviate.classes.init import Auth

# Best practice: store your credentials in environment variables
http_host = os.environ["WCD_HTTP_HOST"]
grpc_host = os.environ["WCD_GRPC_HOST"]
weaviate_api_key = os.environ["WCD_DEMO_RO_KEY"]

client = weaviate.connect_to_custom(
    http_host=http_host,        # Hostname for the HTTP API connection
    http_port=443,              # Default is 80, WCD uses 443
    http_secure=True,           # Whether to use https (secure) for the HTTP API connection
    grpc_host=grpc_host,        # Hostname for the gRPC API connection
    grpc_port=443,              # Default is 50051, WCD uses 443
    grpc_secure=True,           # Whether to use a secure channel for the gRPC API connection
    auth_credentials=Auth.api_key(weaviate_api_key),  # API key for authentication
    # END CustomConnect  # START TimeoutCustom
    additional_config=AdditionalConfig(
        timeout=Timeout(init=30, query=60, insert=120)  # Values in seconds
    )
    # START CustomConnect  # START TimeoutCustom
)

print(client.is_ready())
# END CustomConnect  # END TimeoutCustom

assert client.is_ready()

client.close()

#########################
### Connection to WCD ###
#########################

# START APIKeyWCD
import weaviate
from weaviate.classes.init import Auth

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

# Connect to Weaviate Cloud
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
)

print(client.is_ready())
# END APIKeyWCD

assert client.is_ready()

client.close()

################################
### Local connection no auth ###
################################

# START LocalNoAuth
import weaviate

client = weaviate.connect_to_local()

print(client.is_ready())
# END LocalNoAuth

assert client.is_ready()

client.close()

#############################
### Local connection auth ###
#############################

# START LocalAuth
import weaviate
from weaviate.classes.init import Auth

# Best practice: store your credentials in environment variables
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

# END LocalAuth
weaviate_api_key = os.environ["WEAVIATE_LOCAL_API_KEY"]

# START LocalAuth
client = weaviate.connect_to_local(
    # END LocalAuth
    port=8099,
    grpc_port=50052,
    # START LocalAuth
    auth_credentials=Auth.api_key(weaviate_api_key)
)

print(client.is_ready())

assert client.is_ready()

# END LocalAuth

##################################
### Local third party API keys ###
##################################

# START LocalThirdPartyAPIKeys
import os
import weaviate

# Best practice: store your credentials in environment variables
cohere_api_key = os.environ["COHERE_API_KEY"]

client = weaviate.connect_to_local(
    headers={
        "X-Cohere-Api-Key": cohere_api_key
    }
)

print(client.is_ready())
# END LocalThirdPartyAPIKeys

assert client.is_ready()

client.close()

##################################
### Cloud third party API keys ###
##################################

# START ThirdPartyAPIKeys
import os
import weaviate
from weaviate.classes.init import Auth

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]
cohere_api_key = os.environ["COHERE_API_KEY"]

# Connect to Weaviate Cloud
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
    headers={
        "X-Cohere-Api-Key": cohere_api_key
    }
)

print(client.is_ready())
# END ThirdPartyAPIKeys

assert client.is_ready()

client.close()

#########################
### Embedded weaviate ###
#########################

# START Embedded
import weaviate
import os

# Best practice: store your credentials in environment variables
openai_api_key = os.environ["OPENAI_API_KEY"]

client = weaviate.connect_to_embedded(
    version="1.26.1",
    headers={
        "X-OpenAI-Api-Key": openai_api_key
    },
)

# Add your client code here.
# When the client exits, the embedded instance also exits
# END Embedded

assert client.is_ready()

client.close()

############
### OIDC ###
############

# START OIDCConnect
import os
import weaviate
from weaviate.classes.init import Auth

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_username = os.environ["WCD_USERNAME"]
weaviate_password = os.environ["WCD_PASSWORD"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,   # Replace with your Weaviate Cloud URL
    auth_credentials=Auth.client_password(
        username=weaviate_username,  # Your Weaviate Cloud username
        password=weaviate_password   # Your Weaviate Cloud password
    )
)
# END OIDCConnect

assert client.is_ready()

client.close()
