# THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

# START APIKeyWCD
# Set these environment variables
# WEAVIATE_URL     your WCD instance URL
# WEAVIATE_APIKEY  your WCD instance API key

curl https://WEAVIATE_URL/v1/meta -H "Authorization: Bearer ${WEAVIATE_APIKEY}" | jq
# END APIKeyWCD