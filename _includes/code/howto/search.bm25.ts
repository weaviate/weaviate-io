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

// ================================
// ===== Basic BM25 Query =====
// ================================

// searchBM25Basic
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
// END searchBM25Basic

// Tests
let questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);

// searchBM25Basic
// END searchBM25Basic


// ================================
// ===== BM25 Query with Score =====
// ================================

// searchBM25WithScore
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
// END searchBM25WithScore

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
let additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);

// searchBM25WithScore
// END searchBM25WithScore


// ================================
// ===== BM25 Query with Selected Properties =====
// ================================

// searchBM25withProperties
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
// END searchBM25withProperties

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.question.includes('food'));
}

// searchBM25withProperties
// END searchBM25withProperties


// ================================
// ===== BM25 Query with Boosted Properties =====
// ================================

// searchBM25withBoost
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
// END searchBM25withBoost

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
additionalKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]._additional));
assert.deepEqual(additionalKeys, new Set(['score']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);

// searchBM25withBoost
// END searchBM25withBoost


// ================================
// ===== BM25 Query with Filter =====
// ================================

// searchBM25withFilter
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
// END searchBM25withFilter

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
