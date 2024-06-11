# THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

# START APIKeyWCD
import os
import weaviate

# Set these environment variables
WEAVIATE_URL = os.getenv("WCD_URL")
WEAVIATE_APIKEY = os.getenv("WCD_API_KEY")

# Create the client
client = weaviate.Client(
    url=WEAVIATE_URL,
    auth_client_secret=weaviate.auth.AuthApiKey(api_key=WEAVIATE_APIKEY),
)
# END APIKeyWCD
client.close()

# START LocalNoAuth
import weaviate

# Create the client
client = weaviate.Client(
    url="http:localhost:8080"
)
# END LocalNoAuth
