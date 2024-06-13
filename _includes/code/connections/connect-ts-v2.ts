// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END


// START APIKeyWCD
// Set these environment variables
// WEAVIATE_URL      your WCD instance URL
// WEAVIATE_API_KEY  your WCD instance API key

import weaviate, { ApiKey } from 'weaviate-ts-client';

// Create the client
const client = weaviate.client({
  scheme: 'https',
  host: process.env.WEAVIATE_URL,
  apiKey: new ApiKey(process.env.WEAVIATE_API_KEY),
});

console.log(client)
// END APIKeyWCD


// START LocalNoAuth
import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

console.log(client)
// END LocalNoAuth


// START ThirdPartyAPIKeys
// Set these environment variables
// WEAVIATE_URL      your WCD instance URL
// WEAVIATE_API_KEY  your WCD instance API key
// COHERE_API_KEY    your Cohere API key

import weaviate, { ApiKey } from 'weaviate-ts-client';

// Create the client
const client = weaviate.client({
  scheme: 'https',
  host: process.env.WEAVIATE_URL,
  apiKey: new ApiKey(process.env.WEAVIATE_API_KEY),
  headers: {
    'X-Cohere-Api-Key': process.env.COHERE_API_KEY,
  },
});

console.log(client)
// END ThirdPartyAPIKeys
