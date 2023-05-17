// Howto: hybrid search - TypeScript examples

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
// ===== Basic Hybrid Query =====
// ================================

// searchHybridBasic
async function searchHybridBasic() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withHybrid({
    query: 'food',
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchHybridBasic

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);

  // searchHybridBasic
  return response;
}

searchHybridBasic();
// END searchHybridBasic


// ================================
// ===== Hybrid Query with Score =====
// ================================

// searchHybridWithScore
async function searchHybridWithScore() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withHybrid({
    query: 'food',
  })
  .withFields('question answer _additional { score explainScore }')
// highlight-end
  .withLimit(3)
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchHybridWithScore

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
  const additionalKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['score', 'explainScore']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);

  // searchHybridWithScore
  return response;
}

searchHybridWithScore();
// END searchHybridWithScore


// ================================
// ===== Hybrid Query with Alpha =====
// ================================

// searchHybridWithAlpha
async function searchHybridWithAlpha() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withHybrid({
    query: 'food',
    alpha: 0.25
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchHybridWithAlpha

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);

  // searchHybridWithAlpha
  return response;
}

searchHybridWithAlpha();
// END searchHybridWithAlpha



// ================================
// ===== Hybrid Query with Properties =====
// ================================

// searchHybridWithProperties
async function searchHybridWithProperties() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withHybrid({
    query: 'food',
    properties: ['question'],
    alpha: 0.25,
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchHybridWithProperties

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);

  // searchHybridWithProperties
  return response;
}

searchHybridWithProperties();
// END searchHybridWithProperties



// ================================
// ===== Hybrid Query with Filter =====
// ================================

// searchHybridWithFilter
async function searchHybridWithFilter() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withBm25({
    query: 'food'
  })
  .withWhere({
      'path': ['round'],
      'operator': 'Equal',
      'valueText': 'Double Jeopardy!'
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchHybridWithFilter

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);
  for ( const question of response.data.Get.JeopardyQuestion ) {
    assert.deepEqual(question.round, 'Double Jeopardy!');
  }

  // searchHybridWithFilter
  return response;
}

searchHybridWithFilter();
// END searchHybridWithFilter
