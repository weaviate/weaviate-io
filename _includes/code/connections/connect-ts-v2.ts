// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END


// START APIKeyWCD
// Set these environment variables
// URL     your WCD instance URL
// APIKEY  your WCD instance API key

import weaviate, { ApiKey } from 'weaviate-ts-client';

// Create the client
const client = weaviate.client({
  scheme: 'https',
  host: process.env.URL,
  apiKey: new ApiKey(process.env.APIKEY),
});
// END APIKeyWCD
