// Howto: BM25 search - TypeScript examples

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate from 'weaviate-client/node';

const client = await weaviate.connectToWCS(
  'https://hha2nvjsruetknc5vxwrwa.c0.europe-west2.gcp.weaviate.cloud/',
 {
   authCredentials: new weaviate.ApiKey('nMZuw1z1zVtnjkXXOMGx9Ows7YWGsakItdus'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)

let result;

// ============================
// ===== Basic BM25 Query =====
// ============================

// START Basic
const myCollection = client.collections.get('JeopardyQuestion');
// highlight-start
const result = await myCollection.query.bm25('food',{
// highlight-start
 limit: 3,
})

console.log(JSON.stringify(result.objects, null, 2));
// END Basic

// Tests
let questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);


// ================================
// ===== BM25 Query with Score =====
// ================================

// START Score
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.bm25('food',{
 limit: 3,
 // highlight-start
 returnMetadata: ['score']
 // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END Score

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
let additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);


// ===============================================
// ===== BM25 Query with Selected Properties =====
// ===============================================

// START Properties
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.bm25('safety',{
 limit: 3,
 // highlight-start
 queryProperties: ['question^2', 'answer'],
  // highlight-end
 returnMetadata: ['score']
})

console.log(JSON.stringify(result.objects, null, 2));
// END Properties

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.question.includes('food'));
}


// ==============================================
// ===== BM25 Query with Boosted Properties =====
// ==============================================

// START Boost
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.bm25('food',{
 limit: 3,
 returnMetadata: ['score'],
  // highlight-start
 queryProperties: ['question^2', 'answer']
  // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END Boost

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);


// ==================================
// ===== BM25 multiple keywords =====
// ==================================

// START MultipleKeywords
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    // highlight-start
    query: 'food wine',
    // highlight-end
    properties: ['question'],
  })
  .withLimit(5)
  .withFields('question _additional { score }')
  .do();

console.log(JSON.stringify(result, null, 2));
// END MultipleKeywords

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', '_additional']));
additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 5);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.question.match(/food|wine/i));
}


// ==================================
// ===== BM25 Query with Filter =====
// ==================================

// START Filter
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.bm25('food',{
 limit: 3,
 returnMetadata: ['score'],
     // highlight-start
 filters: myCollection.filter.byProperty('round').equal('Double Jeopardy!'),
     // highlight-end
 returnProperties: ['question', 'answer', 'round'],
})

console.log(JSON.stringify(result.objects, null, 2));
// END Filter

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', '_additional']));
additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.deepEqual(question.round, 'Double Jeopardy!');
}

// searchBM25withFilter
// END searchBM25withFilter


// =================================
// ===== BM25 Query with limit =====
// =================================

// START limit
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.bm25('safety',{
  // highlight-start
 limit: 3,
  // highlight-end
 returnMetadata: ['score']
})

console.log(JSON.stringify(result.objects, null, 2));
// END limit

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.equal(result.data.Get.JeopardyQuestion.length, 3);
assert(result.data.Get.JeopardyQuestion[0]['answer'].includes('OSHA'));


// ===================================
// ===== BM25 Query with autocut =====
// ===================================

// START autocut

const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.bm25('safety',{
  // highlight-start
 autoLimit: 1,
   // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END autocut

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 1);
assert(result.data.Get.JeopardyQuestion[0]['answer'].includes('OSHA'));

