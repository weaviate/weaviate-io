// How-to: Search -> Image search - TypeScript examples
// Run with: node --loader=ts-node/esm search.image.ts

// This test requires the Dogs image collection to have been imported. Check out the https://github.com/weaviate/weaviate-examples repo
// and follow the steps at https://github.com/weaviate/weaviate-examples/tree/main/nearest-neighbor-dog-searchpython create-schema.py.
// For multi2vec-clip, change in `create-schema.py` the vectorizer and its moduleConfig from `img2vec-neural` to multi2vec-clip.


import assert from 'assert';

// ===========================================
// ===== Search by base64 representation =====
// ===========================================

// START base64
import weaviate from 'weaviate-ts-client';
import fetch from 'node-fetch';
// END base64  // START ImageFileSearch
import fs from 'fs';
// END ImageFileSearch  // START base64  // START ImageFileSearch

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',  // Replace with your Weaviate URL
  // Uncomment if authentication is on, and replace w/ your Weaviate instance API key.
  // apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),
});
// END base64  // END ImageFileSearch  // START base64

const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/640px-Welchcorgipembroke.JPG'

// Fetch URL into `content` variable
const response = await fetch(imageUrl);
const content = await response.buffer();
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
// END base64

// Tests
assert.deepEqual(result.data['Get']['Dog'], [{ 'breed': 'Corgi' }]);


// ====================================
// ===== Search by image filename =====
// ====================================

fs.writeFileSync('image.jpg', content);
// START ImageFileSearch

// highlight-start
const contentsBase64 = await fs.promises.readFile('image.jpg', { encoding: 'base64' });
// highlight-end

// Perform query
result = await client.graphql
  .get()
  .withClassName('Dog')
  .withNearImage({
    image: contentsBase64,
  })
  .withLimit(1)
  .withFields('breed')
  .do();

console.log(JSON.stringify(result, null, 2));
// END ImageFileSearch


// Tests
assert.deepEqual(result.data['Get']['Dog'], [{ 'breed': 'Corgi' }]);


// ============================
// ===== Maximum distance =====
// ============================

// START Distance
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
// END Distance

// Tests
assert.equal(result.data['Get']['Dog'][0]['breed'], 'Corgi');
