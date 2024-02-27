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
// ===== ContainsAnyFilter =====
// ==========================================

// ContainsAnyFilter  // ContainsAllFilter
let token_list
// END ContainsAnyFilter  // END ContainsAllFilter


// ContainsAnyFilter
// highlight-start
token_list = ['australia', 'india']
// highlight-end

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  // Find objects where the `answer` property contains any of the strings in `token_list`
  .withWhere({
    path: ['answer'],
    operator: 'ContainsAny',
    valueTextArray: token_list,
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round')
  .do();

console.log(JSON.stringify(result, null, 2));
// END ContainsAnyFilter

// Tests
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.answer.toLowerCase().includes('australia') || question.answer.toLowerCase().includes('india'));
}


// ==========================================
// ===== ContainsAllFilter =====
// ==========================================

// ContainsAllFilter
// highlight-start
token_list = ['blue', 'red']
// highlight-end

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
// highlight-start
  // Find objects where the `question` property contains all of the strings in `token_list`
  .withWhere({
    path: ['question'],
    operator: 'ContainsAll',
    valueTextArray: token_list,
  })
// highlight-end
  .withLimit(3)
  .withFields('question answer round')
  .do();

console.log(JSON.stringify(result, null, 2));
// END ContainsAllFilter

// Tests
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.question.toLowerCase().includes('red') & question.question.toLowerCase().includes('blue'));
}


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
assert.equal(target_id, result.data.Get.Article[0]._additional.id);


// ===================================================
// ===== Filters using timestamps =====
// ===================================================

// FilterByTimestamp
result = await client.graphql
  .get()
  .withClassName('Article')
  .withFields('title _additional { creationTimeUnix }')
  .withWhere({
    operator: 'GreaterThan',
    path: ['_creationTimeUnix'],
    valueDate: '2020-01-01T00:00:00+00:00',
    // Can use either `valueDate` with a `RFC3339` datetime or `valueText` as Unix epoch milliseconds
    // valueText: '1577836800',
  })
  .withLimit(3)
  .do();

console.log(JSON.stringify(result, null, 2));
// END FilterByTimestamp

// Tests
for (const article of result.data.Get.Article) {
  assert.ok(Number(article._additional.creationTimeUnix) > 1577836800);
}


// ===================================================
// ===== Filters using property length =====
// ===================================================

// FilterByPropertyLength
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withFields('answer')
  .withWhere({
    operator: 'GreaterThan',
    path: ['len(answer)'],
    valueInt: 20,
  })
  .withLimit(3)
  .do();

console.log(JSON.stringify(result, null, 2));
// END FilterByPropertyLength

// Tests
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.answer.length > 20);
}



// ===================================================
// ===== Filters with Geolocation =====
// ===================================================

// FilterbyGeolocation
const response = await client.graphql
  .get()
  .withClassName('Publication')
  .withFields('name headquartersGeoLocation {latitude longitude}')
  .withWhere({
    operator: 'WithinGeoRange',
    path: ['headquartersGeoLocation'],
    valueGeoRange: {
      geoCoordinates: {
        latitude: 52.3932696,
        longitude: 4.8374263,
      },
      distance: {
        max: 1000,
      },
    },
  })
  .do();
console.log(response);
// END FilterbyGeolocation
