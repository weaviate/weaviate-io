import assert from 'assert';

// ===== Instantiation, not shown in snippet
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCD(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 } 
)

// MetaCount TS // TextProp TS // IntProp TS // groupBy TS // nearTextWithLimit TS // nearTextWithDistance TS // whereFilter TS
let result;
const myCollection = client.collections.get('JeopardyQuestion');
// END MetaCount TS // END TextProp TS // END IntProp TS // END groupBy TS // END nearTextWithLimit TS // END nearTextWithDistance TS // END whereFilter TS



// ===============================
// ===== meta count EXAMPLES =====
// ===============================

// MetaCount TS

result = await myCollection.aggregate.overAll()

console.log(JSON.stringify(result.totalCount, null, 2));
// END MetaCount TS

// Test
assert('JeopardyQuestion' in result.data['Aggregate']);
assert.deepEqual(result.data['Aggregate']['JeopardyQuestion'], [{ meta: { count: 10000 } }]);
// End test


// ==================================
// ===== Text property EXAMPLES =====
// ==================================

// TextProp TS
     
result = await myCollection.aggregate.overAll({
 returnMetrics: myCollection.metrics.aggregate('answer').text(['topOccurrencesValue', 'count'])
})

console.log(JSON.stringify(result.properties, null, 2));
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
     
result = await myCollection.aggregate.overAll({
 returnMetrics: myCollection.metrics.aggregate('points').integer(['sum','maximum','minimum'])
})

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
     
result = await myCollection.aggregate.groupBy.overAll({
 groupBy: {
   property: 'round'
 }
})

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
     
result = await myCollection.aggregate.nearText(['animals in space'],{
 objectLimit: 10,
 returnMetrics: myCollection.metrics.aggregate('points').number(['sum'])
})

console.log(JSON.stringify(result.properties['points'].sum, null, 2));
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
     
result = await myCollection.aggregate.nearText(['animals in space'],{
 distance: 0.19,
 returnMetrics: myCollection.metrics.aggregate('points').number(['sum'])
})

console.log(JSON.stringify(result.properties['points'].sum, null, 2));
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
     
result = await myCollection.aggregate.overAll({
 filters: myCollection.filter.byProperty('round').equal('Final Jeopardy!')
})

console.log(JSON.stringify(result.totalCount, null, 2));
// END whereFilter TS

// Test
assert('JeopardyQuestion' in result.data.Aggregate);
assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { meta: { count: 285 } });
// End test