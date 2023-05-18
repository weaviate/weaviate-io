// Howto: BM25 search - JavaScript examples

const assert = require('assert');

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

const { default: weaviate } = require('weaviate-ts-client');

const client = weaviate.client({
  scheme: 'https',
  host: 'some-endpoint.weaviate.network',  // Replace with your Weaviate URL
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // If authentication is on. Replace w/ your Weaviate instance API key
  headers: {
    'X-OpenAI-Api-Key': 'YOUR-OPENAI-API-KEY'
  }
});

// ================================
// ===== Basic BM25 Query =====
// ================================

// searchBM25Basic
async function searchBM25Basic() {
  let response = await client.graphql
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
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchBM25Basic

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);

  // searchBM25Basic
  return response;
}

searchBM25Basic();
// END searchBM25Basic


// ================================
// ===== BM25 Query with Score =====
// ================================

// searchBM25WithScore
async function searchBM25WithScore() {
  let response = await client.graphql
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
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchBM25WithScore

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
  const additionalKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['score']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);

  // searchBM25WithScore
  return response;
}

searchBM25WithScore();
// END searchBM25WithScore


// ================================
// ===== BM25 Query with Selected Properties =====
// ================================

// searchBM25withProperties
async function searchBM25withProperties() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    query: 'food',
// highlight-start
    properties: ['question']
// highlight-end
  })
  .withLimit(3)
  .withFields('question answer _additional { score }')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchBM25withProperties

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
  const additionalKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['score']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);
  for ( const question of response.data.Get.JeopardyQuestion ) {
    assert.ok(question.question.includes('food'));
  }

  // searchBM25withProperties
  return response;
}

searchBM25withProperties();
// END searchBM25withProperties


// ================================
// ===== BM25 Query with Boosted Properties =====
// ================================

// searchBM25withBoost
async function searchBM25withBoost() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    query: 'food',
// highlight-start
    properties: ['question^2', 'answer']
// highlight-end
  })
  .withLimit(3)
  .withFields('question answer _additional { score }')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchBM25withBoost

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
  const additionalKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['score']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);

  // searchBM25withBoost
  return response;
}

searchBM25withBoost();
// END searchBM25withBoost


// ================================
// ===== BM25 Query with Filter =====
// ================================

// searchBM25withFilter
async function searchBM25withFilter() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    query: 'food'
  })
// highlight-start
  .withWhere({
      'path': ['round'],
      'operator': 'Equal',
      'valueText': 'Double Jeopardy!'
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round _additional { score }')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchBM25withFilter

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', '_additional']));
  const additionalKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['score']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);
  for ( const question of response.data.Get.JeopardyQuestion ) {
    assert.deepEqual(question.round, 'Double Jeopardy!');
  }

  // searchBM25withFilter
  return response;
}

searchBM25withFilter();
// END searchBM25withFilter
