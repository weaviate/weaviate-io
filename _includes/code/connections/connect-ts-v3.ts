// THIS FILE HASN'T BEEN TESTED TO RUN END-TO-END

////////////////////////
/// Connect to cloud ///
////////////////////////

// START APIKeyWCD
// Set these environment variables
// WEAVIATE_URL      your WCD instance URL
// WEAVIATE_API_KEY  your WCD instance API key

import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_URL,
  {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),
  }
)
// END APIKeyWCD

//////////////////////////
/// WCD with a timeout ///
//////////////////////////

// START TimeoutWCD
// Set these environment variables
// WEAVIATE_URL       your Weaviate instance URL
// WEAVIATE_API_KEY   your Weaviate instance API key

import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_URL,
  {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),
    timeout: { init: 30, query: 60, insert: 120 } // Values in seconds
  }
)

console.log(client)
// END TimeoutWCD

/////////////////////
/// Local no auth ///
/////////////////////

// START LocalNoAuth
import weaviate from 'weaviate-client'

const client = await weaviate.connectToLocal()

console.log(client)
// END LocalNoAuth

//////////////////
/// Local auth ///
//////////////////

// START LocalAuth
// Set this environment variable
// WEAVIATE_API_KEY   your Weaviate instance API key

import weaviate from 'weaviate-client'

const client = await weaviate.connectToLocal(
   {  authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),}
)

console.log(client)
// END LocalAuth

//////////////////////
/// Local 3d party ///
//////////////////////

// START LocalThirdPartyAPIKeys
// Set this environment variable
// COHERE_API_KEY    your Cohere API key

import weaviate from 'weaviate-client'

const client = await weaviate.connectToLocal(
  {
    headers: {
     'X-Cohere-Api-Key': process.env.COHERE_API_KEY || '',
    }
  }
)

console.log(client)
// END LocalThirdPartyAPIKeys


//////////////////////////
/// Local with a timeout ///
//////////////////////////

// START TimeoutLocal

import weaviate from 'weaviate-client'

const client = await weaviate.connectToLocal(
   {  timeout: { init: 30, query: 60, insert: 120 }, } // Values in seconds
)

console.log(client)
// END TimeoutLocal


//////////////////////
/// Cloud 3d party ///
//////////////////////

// START ThirdPartyAPIKeys
// Set these environment variables
// WEAVIATE_URL      your Weaviate instance URL
// WEAVIATE_API_KEY  your Weaviate instance API key
// COHERE_API_KEY    your Cohere API key

import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_URL,
  {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),
    headers: {
     'X-Cohere-Api-Key': process.env.COHERE_API_KEY || '',
   }
  }
)
// END ThirdPartyAPIKeys

//////////////////////
/// Custom connect ///
//////////////////////

// START CustomConnect
// Set these environment variables
// WEAVIATE_URL       your Weaviate instance URL
// WEAVIATE_GPC_URL   your Weaviate instance GPC URL
// WEAVIATE_API_KEY   your Weaviate instance API key

import weaviate, { WeaviateClient } from 'weaviate-client';

const client = await weaviate.connectToCustom(
 {
    httpHost: process.env.WEAVIATE_URL,  // URL only, no http prefix
    httpPort: 443,
    grpcHost: process.env.WEAVIATE_GPC_URL,
    grpcPort: 443,        // Default is 50051, WCD uses 443
    grpcSecure: true,
    httpSecure: true,
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),
    headers: {
      'X-Cohere-Api-Key': process.env.COHERE_API_KEY || ''
    }
  })

console.log(client)
// END CustomConnect

/////////////////////////////
/// Custom with a timeout ///
/////////////////////////////

// START TimeoutCustom
// Set these environment variables
// WEAVIATE_URL       your Weaviate instance URL
// WEAVIATE_API_KEY   your Weaviate instance API key

import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToCustom(
  process.env.WEAVIATE_URL,
  {
   httpHost: process.env.WEAVIATE_URL,  // URL only, no http prefix
   httpPort: 443,
   grpcHost: process.env.WEAVIATE_GPC_URL,
   grpcPort: 443,        // Default is 50051, WCD uses 443
   grpcSecure: true,
   httpSecure: true,
   authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),
   timeout: { init: 30, query: 60, insert: 120 } // Values in seconds
  }
)

console.log(client)
// END TimeoutCustom