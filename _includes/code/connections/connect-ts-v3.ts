// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END


// START APIKeyWCD

// Set these environment variables
// URL     your WCD instance URL
// APIKEY  your WCD instance API key

import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.URL,
  {
    authCredentials: new weaviate.ApiKey(process.env.APIKEY),
  }
)