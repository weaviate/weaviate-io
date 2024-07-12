import assert from 'assert';

// ===== Instantiation, not shown in snippet
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 } 
)

// MetaCount TS // TextProp TS // IntProp TS // groupBy TS // nearTextWithLimit TS // nearTextWithDistance TS // whereFilter TS
const jeopardy = client.collections.get('JeopardyQuestion');
// END MetaCount TS // END TextProp TS // END IntProp TS // END groupBy TS // END nearTextWithLimit TS // END nearTextWithDistance TS // END whereFilter TS



// ===============================
// ===== meta count EXAMPLES =====
// ===============================
{
// MetaCount TS

// highlight-start
const result = await jeopardy.aggregate.overAll()
// highlight-end

console.log(result.totalCount);
// END MetaCount TS

// Test
// assert('JeopardyQuestion' in result.data['Aggregate']);
// assert.deepEqual(result.data['Aggregate']['JeopardyQuestion'], [{ meta: { count: 10000 } }]);
// End test
}

// ==================================
// ===== Text property EXAMPLES =====
// ==================================

{
// TextProp TS

const result = await jeopardy.aggregate.overAll({
  // highlight-start
  returnMetrics: jeopardy.metrics.aggregate('answer')
  .text(
    ['topOccurrencesValue', 'topOccurrencesOccurs'],
    5 // minOccurrences - threshold minimum count
  )
 // highlight-end
})

console.log(JSON.stringify(result.properties, null, 2));
// END TextProp TS

// Test
// assert('JeopardyQuestion' in result.data.Aggregate);
// assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
// const questionKeys = new Set(Object.keys(result.data.Aggregate.JeopardyQuestion[0]['answer']));
// assert.deepEqual(questionKeys, new Set(['count', 'type', 'topOccurrences']));
// End test
}

// ====================================
// ===== Int/Number property EXAMPLES =====
// ====================================
{
// IntProp TS

const result = await jeopardy.aggregate.overAll({
  // highlight-start
  returnMetrics: jeopardy.metrics.aggregate('points')
  .integer(['sum','maximum','minimum'])
  // highlight-end
})

console.log(JSON.stringify(result.properties, null, 2));
// END IntProp TS

// Test
// assert('JeopardyQuestion' in result.data.Aggregate);
// assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
// assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { points: { count: 10000, sum: 6324100 } });
// End test
}

// ============================
// ===== groupBy EXAMPLES =====
// ============================
{
// groupBy TS
     
const result = await jeopardy.aggregate.groupBy.overAll({
  // highlight-start
  groupBy: { property: 'round' }
  // highlight-end
})

console.log(JSON.stringify(result, null, 2));
// END groupBy TS

// Test
// assert('JeopardyQuestion' in result.data.Aggregate);
// assert.equal(result.data.Aggregate.JeopardyQuestion.length, 3);
// assert.deepEqual(new Set(result.data.Aggregate.JeopardyQuestion), new Set([
//   { groupedBy: { value: 'Double Jeopardy!' }, meta: { count: 5193 } },
//   { groupedBy: { value: 'Jeopardy!' }, meta: { count: 4522 } },
//   { groupedBy: { value: 'Final Jeopardy!' }, meta: { count: 285 } },
// ]));
// End test
}

// =========================================
// ===== nearTextWithLimit EXAMPLES =====
// =========================================
{
// nearTextWithLimit TS
     
const result = await jeopardy.aggregate.nearText('animals in space', {
  // highlight-start
  objectLimit: 10,
  // highlight-end
  returnMetrics: jeopardy.metrics.aggregate('points').number(['sum'])
})

console.log(result.properties['points'].sum);
// END nearTextWithLimit TS

// Test
// assert('JeopardyQuestion' in result.data.Aggregate);
// assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
// assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { points: { sum: 4600 } });
// End test
}

// ============================
// ===== nearTextWithDistance EXAMPLES =====
// ============================
{
// nearTextWithDistance TS
     
const result = await jeopardy.aggregate.nearText(['animals in space'],{
  // highlight-start
  distance: 0.19,
  // highlight-end
  returnMetrics: jeopardy.metrics.aggregate('points').number(['sum'])
})

console.log(result.properties['points'].sum);
// END nearTextWithDistance TS

// Test
// assert('JeopardyQuestion' in result.data.Aggregate);
// assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
// assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { points: { sum: 3000 } });
// End test
}

// =================================
// ===== where filter EXAMPLES =====
// =================================
{
// whereFilter TS
     
const result = await jeopardy.aggregate.overAll({
  // highlight-start
  filters: jeopardy.filter.byProperty('round').equal('Final Jeopardy!')
  // highlight-end
})

console.log(JSON.stringify(result.totalCount, null, 2));
// END whereFilter TS

// Test
// assert('JeopardyQuestion' in result.data.Aggregate);
// assert.equal(result.data.Aggregate.JeopardyQuestion.length, 1);
// assert.deepEqual(result.data.Aggregate.JeopardyQuestion[0], { meta: { count: 285 } });
// End test
}
