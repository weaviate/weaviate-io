import assert from 'assert';

// ===== Instantiation, not shown in snippet
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'https',
  host: 'edu-demo.weaviate.network',  // Replace with your Weaviate URL
  apiKey: new weaviate.ApiKey('learn-weaviate'),  // If auth is on. Replace w/ your Weaviate instance API key.
  headers: {
    'X-OpenAI-Api-Key': process.env['OPENAI_API_KEY'],  // for the nearText example
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

console.log(JSON.stringify(result, null, 2));
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
  .withFields('answer { count type topOccurrences (limit: 5) { occurs value } }')  // `limit` here sets a minimum count threshold
  // highlight-end
  .do();

console.log(JSON.stringify(result, null, 2));
// END TextProp TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
const questionKeys = new Set(Object.keys(result.data.Aggregate.JeopardyQuestion[0]['answer']));
assert.deepEqual(questionKeys, new Set(['count', 'type', 'topOccurrences']));
// End test


// ====================================
// ===== Int/Number property EXAMPLES =====
// ====================================

// IntProp TS
result = await client
  .graphql
  .aggregate()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withFields('points { count sum }')
  // highlight-end
  .do();

console.log(JSON.stringify(result, null, 2));
// END IntProp TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { points: { count: 10000, sum: 6324100 } });
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

console.log(JSON.stringify(result, null, 2));
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


// =========================================
// ===== nearTextWithLimit EXAMPLES =====
// =========================================

// nearTextWithLimit TS
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

console.log(JSON.stringify(result, null, 2));
// END nearTextWithLimit TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { points: { sum: 4600 } });
// End test


// ============================
// ===== nearTextWithDistance EXAMPLES =====
// ============================

// nearTextWithDistance TS
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
  .withFields('points { sum }')
  .do();

console.log(JSON.stringify(result, null, 2));
// END nearTextWithDistance TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { points: { sum: 3000 } });
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

console.log(JSON.stringify(result, null, 2));
// END whereFilter TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { meta: { count: 285 } });
// End test
