// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

/////////////////////
/// Cloud connect ///
/////////////////////

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

/////////////////////
/// Local no auth ///
/////////////////////

// START LocalNoAuth
import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

console.log(client)
// END LocalNoAuth

//////////////////
/// Local auth ///
//////////////////

// START LocalAuth
import weaviate, { ApiKey } from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  apiKey: new ApiKey(process.env.WEAVIATE_API_KEY),
});

console.log(client)
// END LocalAuth

//////////////////////
/// Local 3d party ///
//////////////////////

// START LocalThirdPartyAPIKeys
// Set this environment variable
// COHERE_API_KEY    your Cohere API key

import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  headers: {
   'X-Cohere-Api-Key': process.env.COHERE_API_KEY,
 },
});

console.log(client)
// END LocalThirdPartyAPIKeys

//////////////////////
/// Cloud 3d party ///
//////////////////////

// START ThirdPartyAPIKeys
// Set these environment variables
// WEAVIATE_URL      your Weaviate instance URL
// WEAVIATE_API_KEY  your Weaviate instance API key
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

////////////////
/// Embedded ///
////////////////

// START Embedded
import weaviate, { EmbeddedOptions } from 'weaviate-ts-embedded';

const client = weaviate.client(new EmbeddedOptions());

await client.embedded.start();

// Add your client code here.
// When the client exits, the embedded instance also exits

client.embedded.stop();
// END Embedded

////////////
/// OIDC ///
////////////

// START OIDCConnect
// Set these environment variables
// WEAVIATE_USER    your Weaviate OIDC username
// WEAVIATE_PWD     your Weaviate OIDC password
// WEAVIATE_URL     your Weaviate instance

import weaviate, { AuthUserPasswordCredentials } from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: "https",
  host: "WEAVIATE_URL",
  authClientSecret: new AuthUserPasswordCredentials({
   username: process.env.WEAVIATE_USER,
   password: process.env.WEAVIATE_PWD,
})
});

console.log(client)
// END OIDCConnect
