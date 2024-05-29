// How-to: Manage data -> Retrieve objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.update.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate from 'weaviate-client';

// ===== Instantiation, not shown in snippet
const client = await weaviate.connectToWCD(
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
{
// ReadObject START
const jeopardy = client.collections.get('JeopardyQuestion')

const response = await jeopardy.query.fetchObjectById('ed89d9e7-4c9d-4a6a-8d20-095cb0026f54')

console.log(response?.properties)
// ReadObject END

// Test
assert.equal(result.properties['answer'], 'San Francisco');
}

// ===================================
// ===== Read object with vector =====
// ===================================
{
// ReadObjectWithVector START
const jeopardy = client.collections.get('JeopardyQuestion')

const response = await jeopardy.query.fetchObjectById('ed89d9e7-4c9d-4a6a-8d20-095cb0026f54',{
  // highlight-start
  includeVector: true
  // highlight-end
})

console.log(response?.properties)
// ReadObjectWithVector END

// Test
assert.equal(result.vector.length, 1536);
}

// ===================================
// ===== Read object with name vector =====
// ===================================

// let someObj = await client.data.getter().withLimit(1).do();
// let objUUID = someObj[0].uuid;

// TODO: Attempt not working; Waiting for response from Weaviate
// ReadObjectNamedVectors START
const reviews = client.collections.get('WineReviewNV') // Collection with named vectors
const objectUuid = '' // Object UUID

const response = await reviews.query.fetchObjectById(objectUuid,{
  // highlight-start
  includeVector: ['title', 'review_body']
  // highlight-end
})

console.log(response?.vectors.title)       // print the title vector
console.log(response?.vectors.review_body) // print the review_body vector
// ReadObjectNamedVectors END

// Test
// assert.equal(result.vector.length, 1536);


// ==================================
// ===== Check object existence =====
// ==================================

// CheckObject START
import { generateUuid5 } from 'weaviate-client';

// generate uuid based on the key properties used during data insert
// highlight-start
const object_uuid = generateUuid5(
  JSON.stringify({ name: 'Author to fetch'})
)
// highlight-end

const authors = await client.collections.get('Author')
// highlight-start
const authorExists = await authors.data.exists(object_uuid)
// highlight-end

console.log('Author exists: ' + authorExists)
// CheckObject END

assert.equal(authorExists, true)
