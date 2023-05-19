// Howto: Filters - JavaScript examples

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
// ===== Single Filter =====
// ================================

// searchSingleFilter
async function searchSingleFilter() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
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
  // END searchSingleFilter

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);
  for ( const question of response.data.Get.JeopardyQuestion ) {
    assert.deepEqual(question.round, 'Double Jeopardy!');
  }
  // searchSingleFilter
  return response;
}

searchSingleFilter();
// END searchSingleFilter


// ==========================================
// ===== Single Filter with nearText =====
// ==========================================



// searchFilterNearText
async function searchFilterNearText() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withWhere({
    'path': ['points'],
    'operator': 'GreaterThan',
    'valueInt': 200
  })
  .withNearText({
    'concepts': ['fashion icons'],
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round points')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchFilterNearText

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);
  for ( const question of response.data.Get.JeopardyQuestion ) {
    assert.ok(question.points > 200);
  }
  // searchFilterNearText
  return response;
}

searchFilterNearText();
// END searchFilterNearText


// ==========================================
// ===== Partial Match Filter =====
// ==========================================


// searchLikeFilter
async function searchLikeFilter() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withWhere({
    'path': ['answer'],
    'operator': 'Like',
    'valueText': '*inter*'
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchLikeFilter

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);
  for ( const question of response.data.Get.JeopardyQuestion ) {
    assert.ok(question.answer.toLowerCase().includes('inter'));
  }
  // searchLikeFilter
  return response;
}

searchLikeFilter();
// END searchLikeFilter


// ==========================================
// ===== Multiple Filters with And =====
// ==========================================


// searchMultipleFiltersAnd
async function searchMultipleFiltersAnd() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withWhere({
    'operator': 'And',
    'operands': [
      {
        'path': ['round'],
        'operator': 'Equal',
        'valueText': 'Double Jeopardy!'
      },
      {
        'path': ['points'],
        'operator': 'LessThan',
        'valueInt': 600
      },
    ]
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round points')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchMultipleFiltersAnd

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);
  for ( const question of response.data.Get.JeopardyQuestion ) {
    assert.deepEqual(question.round, 'Double Jeopardy!');
    assert.ok(question.points < 600);
  }
  // searchMultipleFiltersAnd
  return response;
}

searchMultipleFiltersAnd();
// END searchMultipleFiltersAnd



// ==========================================
// ===== Multiple Filters with Nesting =====
// ==========================================


// searchMultipleFiltersNested
async function searchMultipleFiltersNested() {
  let response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withWhere({
    'operator': 'And',
    'operands': [
      {
        'path': ['answer'],
        'operator': 'Like',
        'valueText': '*nest*'
      },
      {
        'operator': 'Or',
        'operands': [
          {
            'path': ['points'],
            'operator': 'GreaterThan',
            'valueInt': 700
          },
          {
            'path': ['points'],
            'operator': 'LessThan',
            'valueInt': 300
          },
        ]
      },
    ]
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round points')
  .do();
  console.log(response['data']['Get']['JeopardyQuestion']);
  // END searchMultipleFiltersNested

  // Tests
  const questionKeys = new Set(Object.keys(response.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
  assert.deepEqual(response.data.Get.JeopardyQuestion.length, 3);
  for ( const question of response.data.Get.JeopardyQuestion ) {
    assert.ok(question.answer.toLowerCase().includes('nest'));
    assert.ok(question.points < 300 | question.points > 700);
  }
  // searchMultipleFiltersNested
  return response;
}

searchMultipleFiltersNested();
// END searchMultipleFiltersNested
