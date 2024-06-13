# THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

# START APIKeyWCD
# Set these environment variables
# WEAVIATE_URL      your Weaviate instance URL
# WEAVIATE_API_KEY  your Weaviate instance API key

curl https://${WEAVIATE_URL}/v1/meta -H "Authorization: Bearer ${WEAVIATE_API_KEY}" | jq
# END APIKeyWCD

# START ThirdPartyAPIKeys
# Set these environment variables
# WEAVIATE_URL      your Weaviate instance URL
# WEAVIATE_API_KEY  your Weaviate instance API key
# COHERE_API_KEY    your Cohere API key

curl https://${WEAVIATE_URL}/v1/meta \
-H 'Content-Type: application/json' \
-H "X-Cohere-Api-Key: ${COHERE_API_KEY}" \
-H "Authorization: Bearer ${WEAVIATE_API_KEY}" | jq
# END ThirdPartyAPIKeys