# THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

#####################
### Cloud connect ###
#####################

# START APIKeyWCD
# Set these environment variables
# WEAVIATE_URL       your Weaviate instance URL
# WEAVIATE_API_KEY   your Weaviate instance API key

import os
import weaviate

# Create the client
client = weaviate.Client(
    url=os.getenv("WEAVIATE_URL"),
    auth_client_secret=weaviate.auth.AuthApiKey(api_key=os.getenv("WEAVIATE_API_KEY")),
)

print(client.is_ready())
# END APIKeyWCD
client.close()

#####################
### Local no auth ###
#####################

# START LocalNoAuth
import weaviate

# Create the client
client = weaviate.Client(
    url="http:localhost:8080"
)

print(client.is_ready())
# END LocalNoAuth

##################
### Local auth ###
##################

# START LocalAuth
# Set this environment variable
# WEAVIATE_API_KEY   your Weaviate instance API key

import os
import weaviate

# Create the client
client = weaviate.Client(
    url="http://localhost:8080",
    auth_client_secret=weaviate.auth.AuthApiKey(api_key=os.getenv("WEAVIATE_API_KEY")),
)

print(client.is_ready())
# END LocalAuth

##################################
### Local third party API keys ###
##################################

# START LocalThirdPartyAPIKeys
# Set this environment variable
# COHERE_API_KEY     your Cohere API key

import os
import weaviate

client = weaviate.Client(
    url="http://localhost:8080",
    additional_headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_API_KEY")
    }
)

print(client.is_ready())
# END LocalThirdPartyAPIKeys

##############################
### Cloud third party APIs ###
##############################

# START ThirdPartyAPIKeys
# Set these environment variables
# WEAVIATE_URL       your Weaviate instance URL
# WEAVIATE_API_KEY   your Weaviate instance API key
# COHERE_API_KEY     your Cohere API key

import os
import weaviate
from weaviate.auth import AuthApiKey

# Connect to Weaviate Cloud
client = weaviate.Client(
    url=os.getenv("WEAVIATE_URL"),
    auth_client_secret=weaviate.auth.AuthApiKey(api_key=os.getenv("WEAVIATE_API_KEY")),
    additional_headers={
        "X-Cohere-Api-Key": os.getenv("COHERE_API_KEY"),
    },
)

print(client.is_ready())
# END ThirdPartyAPIKeys
