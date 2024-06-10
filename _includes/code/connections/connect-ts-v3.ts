// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

// START APIKeyWCD
// Set these environment variables
// WEAVIATE_URL     your WCD instance URL
// WEAVIATE_APIKEY  your WCD instance API key

import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_URL,
  {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_APIKEY),
  }
)
// END APIKeyWCD