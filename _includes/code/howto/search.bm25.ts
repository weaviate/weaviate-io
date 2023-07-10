// Howto: BM25 search - TypeScript examples

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'https',
  host: 'edu-demo.weaviate.network',
  apiKey: new weaviate.ApiKey('learn-weaviate'),
  headers: {
    'X-OpenAI-Api-Key': process.env['OPENAI_API_KEY'],
  },
});

let result;

// ============================
// ===== Basic BM25 Query =====
// ============================

// START Basic
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withBm25({
    query: 'food',
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer')
  .do();

console.log(JSON.stringify(result, null, 2));
// END Basic

// Tests
let questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);


// ================================
// ===== BM25 Query with Score =====
// ================================

// START Score
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    query: 'food',
  })
// highlight-start
  .withFields('question answer _additional { score }')
// highlight-end
  .withLimit(3)
  .do();

console.log(JSON.stringify(result, null, 2));
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
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    query: 'food',
    // highlight-start
    properties: ['question'],
    // highlight-end
  })
  .withLimit(3)
  .withFields('question answer _additional { score }')
  .do();

console.log(JSON.stringify(result, null, 2));
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
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    query: 'food',
    // highlight-start
    properties: ['question^2', 'answer'],
    // highlight-end
  })
  .withLimit(3)
  .withFields('question answer _additional { score }')
  .do();

console.log(JSON.stringify(result, null, 2));
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
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    query: 'food',
  })
// highlight-start
  .withWhere({
    path: ['round'],
    operator: 'Equal',
    valueText: 'Double Jeopardy!',
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round _additional { score }')
  .do();

console.log(JSON.stringify(result, null, 2));
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
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    query: 'safety',
  })
  .withFields('question answer _additional { score }')
// highlight-start
  .withLimit(3)
// highlight-end
  .do();

console.log(JSON.stringify(result, null, 2));
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
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    query: 'safety',
  })
  .withFields('question answer _additional { score }')
// highlight-start
  .withAutocut(1)
// highlight-end
  .do();

console.log(JSON.stringify(result, null, 2));
// END autocut

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 1);
assert(result.data.Get.JeopardyQuestion[0]['answer'].includes('OSHA'));
