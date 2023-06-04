// How-to: Search -> Image search - TypeScript examples
// Run with: node --loader=ts-node/esm search.image.ts

import assert from 'assert';

// ===========================================
// ===== Search by base64 representation =====
// ===========================================

// base64 START
import weaviate from 'weaviate-ts-client';
import fetch from 'node-fetch';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',  // Replace with your Weaviate URL
  // If authentication is on. Replace w/ your Weaviate instance API key.
  // apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),
});

const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/640px-Welchcorgipembroke.JPG'

// Fetch URL into `content` variable
const response = await fetch(imageUrl);
const content = await response.buffer()
const base64String = content.toString('base64');

// Perform query
let result = await client.graphql
  .get()
  .withClassName('Dog')
  // highlight-start
  .withNearImage({
    image: base64String,
  })
  // highlight-end
  .withLimit(1)
  .withFields('breed')
  .do();

console.log(JSON.stringify(result, null, 2));
// base64 END

// Tests
assert.deepEqual(result.data['Get']['Dog'], [{ 'breed': 'Corgi' }]);


// ============================
// ===== Maximum distance =====
// ============================

// Distance START
result = await client.graphql
  .get()
  .withClassName('Dog')
  .withNearImage({
    image: base64String,
    // highlight-start
    distance: 0.2,
    // highlight-end
  })
  // highlight-start
  .withFields('breed _additional { distance }')
  // highlight-end
  .do();

console.log(JSON.stringify(result, null, 2));
// Distance END

// Tests
assert.deepEqual(result.data['Get']['Dog'], [{ 'breed': 'Corgi', '_additional': { 'distance': 0.1056757 } }]);
