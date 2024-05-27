// How-to: Search -> Image search - TypeScript examples
// Run with: node --loader=ts-node/esm search.image.ts

// This test requires the Dogs image collection to have been imported. Check out the https://github.com/weaviate/weaviate-examples repo
// and follow the steps at https://github.com/weaviate/weaviate-examples/tree/main/nearest-neighbor-dog-searchpython create-schema.py.
// For multi2vec-clip, change in `create-schema.py` the vectorizer and its moduleConfig from `img2vec-neural` to multi2vec-clip.


import assert from 'assert';

// =================================================
// ===== Helper functions to convert to base64 =====
// =================================================

// START helper base64 functions
import { readFileSync } from 'fs'

const urlToBase64 = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const content = await response.buffer();
  return content.toString('base64');
}

urlToBase64('https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Deutsches_Museum_Portrait_4.jpg/500px-Deutsches_Museum_Portrait_4.jpg')
  .then(base64 => { console.log(base64) });

// END helper base64 functions


  // Helper function – get base64 representation from a local file
// This example is for NodeJS
const fileToBase64 = (file: string) => {
  return readFileSync(file, { encoding: 'base64' });
}
console.log(fileToBase64('./your-image-here.jpg'))

// ===========================================
// ===== Search by base64 representation =====
// ===========================================

import weaviate from 'weaviate-client';
import fetch from 'node-fetch';
import fs from 'fs';

const client = await weaviate.connectToWCD(
  'WCD-URL',
 {
   authCredentials: new weaviate.ApiKey('WEAVIATE-API-KEY'),
   headers: {
     'X-OpenAI-Api-Key': 'OPENAI-API-KEY',  // Replace with your inference API key
   }
 } 
)

const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/640px-Welchcorgipembroke.JPG'

// Fetch URL into `content` variable
const response = await fetch(imageUrl);
const content = await response.buffer();

/*
// START search with base64
const base64String = 'SOME_BASE_64_REPRESENTATION';
// END search with base64
*/
// START search with base64

// Perform query
const myCollection = client.collections.get('Dog');

const result = await myCollection.query.nearImage(base64String,{
  returnProperties: ['breed'],
  limit: 1,
})

console.log(JSON.stringify(result.objects, null, 2));
// END search with base64

// Tests
assert.deepEqual(result.data['Get']['Dog'], [{ 'breed': 'Corgi' }]);


// ====================================
// ===== Search by image filename =====
// ====================================
fs.writeFileSync('image.jpg', content);
// START ImageFileSearch
// highlight-start
// Read the file into a base-64 encoded string
const contentsBase64 = await fs.promises.readFile('image.jpg', { encoding: 'base64' });
// highlight-end
// Query based on base64-encoded image
const myCollection = client.collections.get('Dog');

const result = await myCollection.query.nearImage(contentsBase64,{
  returnProperties: ['breed'],
  limit: 1,
})

console.log(JSON.stringify(result.objects, null, 2));
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
