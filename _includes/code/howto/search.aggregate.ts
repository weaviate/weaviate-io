import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate from 'weaviate-ts-client';

// ===== Instantiation shown on snippet
const client = weaviate.client({
  scheme: 'https',
  host: 'your-cluster.weaviate.network',  // Replace with your Weaviate URL
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-KEY'),  // # If auth is on, replace w/ your Weaviate instance API key
  headers: {
    'X-OpenAI-API-Key': 'YOUR-OPENAI-API-KEY',  // for the nearText example
  },
});

let result;

// ===============================
// ===== meta count EXAMPLES =====
// ===============================

// MetaCount TS
result = await client
  .graphql
  .aggregate()
  .withClassName('JeopardyQuestion')
  .withFields('meta { count }')
  .do();
console.log(result.data['Aggregate']['JeopardyQuestion'][0]['meta']['count']);
// END MetaCount TS

// Test
assert('JeopardyQuestion' in result.data['Aggregate']);
assert.deepEqual(result.data['Aggregate']['JeopardyQuestion'], [{ meta: { count: 10000 } }]);
// End test


// ==================================
// ===== Text property EXAMPLES =====
// ==================================

// TextProp TS
result = await client
  .graphql
  .aggregate()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withFields('question { count type topOccurrences { occurs value } }')
  // highlight-end
  .do();
console.log(result.data['Aggregate']['JeopardyQuestion']);
// END TextProp TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
const questionKeys = new Set(Object.keys(result.data.Aggregate.JeopardyQuestion[0]['question']));
assert.deepEqual(questionKeys, new Set(['count', 'type', 'topOccurrences']));
// End test


// ====================================
// ===== Number property EXAMPLES =====
// ====================================

// NumberProp TS
result = await client
  .graphql
  .aggregate()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withFields('points { count sum }')
  // highlight-end
  .do();
console.log(result.data['Aggregate']['JeopardyQuestion']);
// END NumberProp TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { points: { count: 10000, sum: 6324100 } });
// End test


// ============================
// ===== nearXXX EXAMPLES =====
// ============================

// nearXXX TS
result = await client
  .graphql
  .aggregate()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withNearText({
    concepts: ['animals in space'],
    distance: 0.19,
  })
  // highlight-end
  .withFields('meta { count }')
  .do();
console.log(result.data['Aggregate']['JeopardyQuestion']);
// END nearXXX TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { meta: { count: 6 } });
// End test


// =========================================
// ===== nearText.objectLimit EXAMPLES =====
// =========================================

// objectLimit TS
result = await client
  .graphql
  .aggregate()
  .withClassName('JeopardyQuestion')
  .withNearText({
    concepts: ['animals in space'],
  })
  // highlight-start
  .withObjectLimit(10)
  // highlight-end
  .withFields('points { sum }')
  .do();
console.log(result.data['Aggregate']['JeopardyQuestion']);
// END objectLimit TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { points: { sum: 4600 } });
// End test


// ============================
// ===== groupBy EXAMPLES =====
// ============================

// groupBy TS
result = await client
  .graphql
  .aggregate()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withGroupBy(['round'])
  .withFields('groupedBy { value } meta { count }')
  // highlight-end
  .do();
console.log(result.data['Aggregate']['JeopardyQuestion']);
// END groupBy TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 3);
assert.deepEqual(new Set(result.data.Aggregate.JeopardyQuestion), new Set([
  { groupedBy: { value: 'Double Jeopardy!' }, meta: { count: 5193 } },
  { groupedBy: { value: 'Jeopardy!' }, meta: { count: 4522 } },
  { groupedBy: { value: 'Final Jeopardy!' }, meta: { count: 285 } },
]));
// End test


// =================================
// ===== where filter EXAMPLES =====
// =================================

// whereFilter TS
result = await client
  .graphql
  .aggregate()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withWhere({
    path: ['round'],
    operator: 'Equal',
    valueText: 'Final Jeopardy!',
  })
  // highlight-end
  .withFields('meta { count }')
  .do();
console.log(result.data['Aggregate']['JeopardyQuestion']);
// END whereFilter TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { meta: { count: 285 } });
// End test
