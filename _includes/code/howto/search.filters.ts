// Howto: Search -> Filters - TypeScript examples

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

// =========================
// ===== Single Filter =====
// =========================

// searchSingleFilter
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withWhere({
    path: ['round'],
    operator: 'Equal',
    valueText: 'Double Jeopardy!',
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round')
  .do();

console.log(JSON.stringify(result, null, 2));
// END searchSingleFilter

// Tests
let questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.deepEqual(question.round, 'Double Jeopardy!');
}
// searchSingleFilter
// END searchSingleFilter


// =======================================
// ===== Single Filter with nearText =====
// =======================================

// searchFilterNearText
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withWhere({
    path: ['points'],
    operator: 'GreaterThan',
    valueInt: 200,
  })
  .withNearText({
    concepts: ['fashion icons'],
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round points')
  .do();

console.log(JSON.stringify(result, null, 2));
// END searchFilterNearText

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.points > 200);
}
// searchFilterNearText
// END searchFilterNearText


// ==========================================
// ===== Partial Match Filter =====
// ==========================================

// searchLikeFilter
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withWhere({
    path: ['answer'],
    operator: 'Like',
    valueText: '*inter*',
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round')
  .do();

console.log(JSON.stringify(result, null, 2));
// END searchLikeFilter

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.answer.toLowerCase().includes('inter'));
}
// searchLikeFilter
// END searchLikeFilter


// ==========================================
// ===== Multiple Filters with And =====
// ==========================================


// searchMultipleFiltersAnd
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withWhere({
    operator: 'And',
    operands: [
      {
        path: ['round'],
        operator: 'Equal',
        valueText: 'Double Jeopardy!',
      },
      {
        path: ['points'],
        operator: 'LessThan',
        valueInt: 600,
      },
    ],
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round points')
  .do();

console.log(JSON.stringify(result, null, 2));
// END searchMultipleFiltersAnd

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.deepEqual(question.round, 'Double Jeopardy!');
  assert.ok(question.points < 600);
}
// searchMultipleFiltersAnd
// END searchMultipleFiltersAnd



// ==========================================
// ===== Multiple Filters with Nesting =====
// ==========================================

// searchMultipleFiltersNested
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withWhere({
    operator: 'And',
    operands: [
      {
        path: ['answer'],
        operator: 'Like',
        valueText: '*nest*',
      },
      {
        operator: 'Or',
        operands: [
          {
            path: ['points'],
            operator: 'GreaterThan',
            valueInt: 700,
          },
          {
            path: ['points'],
            operator: 'LessThan',
            valueInt: 300,
          },
        ],
      },
    ],
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round points')
  .do();

console.log(JSON.stringify(result, null, 2));
// END searchMultipleFiltersNested

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.answer.toLowerCase().includes('nest'));
  assert.ok(question.points < 300 || question.points > 700);
}
// searchMultipleFiltersNested
// END searchMultipleFiltersNested


// ===================================================
// ===== Filters using Cross-referenced property =====
// ===================================================

// searchCrossReference
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  .withWhere({
    path: ['hasCategory', 'JeopardyCategory', 'title'],
    operator: 'Like',
    valueText: '*Sport*',
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round hasCategory {... on JeopardyCategory { title } }')
  .do();

console.log(JSON.stringify(result, null, 2));
// END searchCrossReference

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'hasCategory']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.hasCategory[0].title.toLowerCase().includes('sport'));
}
// searchCrossReference
// END searchCrossReference


// ===================================================
// ===== Filters using Id =====
// ===================================================

// filterById
let target_id = '00037775-1432-35e5-bc59-443baaef7d80'
result = await client.graphql
  .get()
  .withClassName('Article')
// highlight-start
  .withWhere({
    path: ['id'],
    operator: 'Equal',
    valueText: target_id,
  })
// highlight-end
  .withFields('title _additional { id }')
  .do();

console.log(JSON.stringify(result, null, 2));
// END filterById

// Tests
result.data.Get.JeopardyQuestion[0]._additional.id;
assert.equal(target_id, result.data.Get.JeopardyQuestion[0]._additional.id);
