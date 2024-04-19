// How-to: Manage data -> Retrieve objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.update.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate from 'weaviate-client';

// ===== Instantiation, not shown in snippet
const client = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL',  // Replace WEAVIATE_INSTANCE_URL with your instance URL
 {
   authCredentials: new weaviate.ApiKey('api-key'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)

let result;

// =======================
// ===== Read object =====
// =======================

// ReadObject START
const myCollection = client.collections.get('JeopardyQuestion')
const response = await myCollection.query.fetchObjectById('ed89d9e7-4c9d-4a6a-8d20-095cb0026f54')

console.log(response?.properties)
// ReadObject END

// Test
assert.equal(result.properties['answer'], 'San Francisco');


// ===================================
// ===== Read object with vector =====
// ===================================

// ReadObjectWithVector START
const myCollection = client.collections.get('JeopardyQuestion')
const response = await myCollection.query.fetchObjectById('ed89d9e7-4c9d-4a6a-8d20-095cb0026f54',{
  // highlight-start
  includeVector: true
  // highlight-end
})

console.log(response?.properties)
// ReadObjectWithVector END

// Test
assert.equal(result.vector.length, 1536);


// ===================================
// ===== Read object with name vector =====
// ===================================

// TODO: Attempt not working; Waiting for response from Weaviate
// ReadObjectNamedVectors START
// Example coming soon
// ReadObjectNamedVectors END

let someObj = await client.data.getter().withLimit(1).do();
let objUUID = someObj[0].uuid;

// ReadObjectNamedVectors END
const myCollection = client.collections.get('WineReviewNV') // Collection with named vectors
const vectorNames = ['title', 'review_body']
const objectUuid = '' // Object UUID

const response = await myCollection.query.fetchObjectById(objectUuid,{
  // highlight-start
  includeVector: vectorNames
  // highlight-end
})

console.log(response?.properties)
// ReadObjectNamedVectors END

// Test
assert.equal(result.vector.length, 1536);


// ==================================
// ===== Check object existence =====
// ==================================

// CheckObject START
// TODO: broken, see https://github.com/weaviate/typescript-client/issues/63
result = await client.data
  // highlight-start
  .checker()
  // highlight-end
  .withClassName('JeopardyQuestion')
  .withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
  .do();

console.log(result);
// CheckObject END

// assert.equal(result, true);  TODO: https://github.com/weaviate/typescript-client/issues/63
