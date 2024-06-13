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
        timeout=Timeout(init=2, query=45, insert=120)  # Values in seconds
    )
)

print(client.is_ready())
# END TimeoutLocal
client.close()


##########################
### WCD with a timeout ###
##########################

# START TimeoutWCD
# Set these environment variables
# WEAVIATE_URL       your Weaviate instance URL
# WEAVIATE_API_KEY   your Weaviate instance API key

import weaviate, os
import weaviate.classes as wvc

# Connect to a WCD instance
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WEAVIATE_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WEAVIATE_API_KEY")),
    # skip_init_checks=True,
    additional_config=wvc.init.AdditionalConfig(
        timeout=wvc.init.Timeout(init=10,insert=20,query=20)
        )
    )

print(client.is_ready())
# END TimeoutWCD
client.close()

#########################
### Custom connection ###
#########################

# START CustomConnect
# Set these environment variables
# WEAVIATE_URL       your Weaviate instance URL
# WEAVIATE_GPC_URL   your Weaviate GPC connection URL
# WEAVIATE_API_KEY   your Weaviate instance API key

import weaviate, os
import weaviate.classes as wvc

client = weaviate.connect_to_custom(
    http_host=os.getenv("WEAVIATE_URL"),  # URL only, no http prefix
    http_port=443,
    http_secure=True,   # Set to True if https
    grpc_host=os.getenv("WEAVIATE_GPC_URL"),
    grpc_port=443,      # Default is 50051, WCD uses 443
    grpc_secure=True,   # Edit as needed
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WEAVIATE_API_KEY")),
)

print(client.is_ready())
# END CustomConnect
client.close()

######################################
### Custom connection with timeout ###
######################################

# START TimeoutCustom
# Set these environment variables
# WEAVIATE_URL       your Weaviate instance URL
# WEAVIATE_GPC_URL   your Weaviate GPC connection URL
# WEAVIATE_API_KEY   your Weaviate instance API key

import weaviate, os
import weaviate.classes as wvc

client = weaviate.connect_to_custom(
    http_host=os.getenv("WEAVIATE_URL"),  # URL only, no http prefix
    http_port=443,
    http_secure=True,   # Set to True if https
    grpc_host=os.getenv("WEAVIATE_GPC_URL"),
    grpc_port=443,      # Default is 50051, WCD uses 443
    grpc_secure=True,   # Edit as needed
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WEAVIATE_API_KEY")),
    additional_config=wvc.init.AdditionalConfig(
        timeout=wvc.init.Timeout(init=10,insert=20,query=20)
    )
)

print(client.is_ready())
# END TimeoutCustom
client.close()

#########################
### Connection to WCD ###
#########################

# START APIKeyWCD
# Set these environment variables
# WEAVIATE_URL       your Weaviate instance URL
# WEAVIATE_API_KEY   your Weaviate instance API key

import weaviate
from weaviate.auth import AuthApiKey

# Connect to Weaviate Cloud
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WEAVIATE_URL"),
    auth_credentials=AuthApiKey(os.getenv("WEAVIATE_API_KEY")),
)

print(client.is_ready())
# END APIKeyWCD
client.close()

################################
### Local connection no auth ###
################################

# START LocalNoAuth
import weaviate

client = weaviate.connect_to_local()

print(client.is_ready())
# END LocalNoAuth
client.close()

#############################
### Local connection auth ###
#############################

# START LocalAuth
# Set this environment variable
# WEAVIATE_API_KEY   your Weaviate instance API key

import weaviate
import weaviate.classes as wvc

client = weaviate.connect_to_local(
    auth_credentials=(
        wvc.init.Auth.api_key(os.getenv("WEAVIATE_API_KEY"))
    )
)

print(client.is_ready())
# END LocalAuth

##################################
### Cloud third party API keys ###
##################################

# START ThirdPartyAPIKeys
# Set these environment variables
# WEAVIATE_URL       your Weaviate instance URL
# WEAVIATE_API_KEY   your Weaviate instance API key
# COHERE_API_KEY     your Cohere API key

import os
import weaviate
from weaviate.auth import AuthApiKey

# Connect to Weaviate Cloud
client = weaviate.connect_to_wcs(
    cluster_url=os.getenv("WEAVIATE_URL"),
    auth_credentials=AuthApiKey(os.getenv("WEAVIATE_API_KEY")),
    headers={"X-Cohere-Api-Key": os.getenv("COHERE_API_KEY")}
)

print(client.is_ready())
# END ThirdPartyAPIKeys
client.close()