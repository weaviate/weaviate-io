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

// BasicGetJS // GetWithLimitJS // GetWithLimitOffsetJS // GetPropertiesJS // GetObjectVectorJS // GetObjectIdJS // GetWithCrossRefsJS // GetWithMetadataJS 
let result;
const myCollection = client.collections.get('JeopardyQuestion');
// END BasicGetJS // END GetWithLimitJS // END GetWithLimitOffsetJS // END GetPropertiesJS // END GetObjectVectorJS // END GetObjectIdJS // END GetWithCrossRefsJS // END GetWithMetadataJS


// ==============================
// ===== BASIC GET EXAMPLES =====
// ==============================

// BasicGetJS

result = await myCollection.query.fetchObjects({
  returnProperties: ['question'],
})

console.log(JSON.stringify(result, null, 2));

// END BasicGetJS

// Test
assert('JeopardyQuestion' in result.data.Get);
let questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question']));
// End test


// ===================================
// ===== GET WITH LIMIT EXAMPLES =====
// ===================================

// GetWithLimitJS

result = await myCollection.query.fetchObjects({
  returnProperties: ['question'],
  limit: 1,
})
     
console.log(JSON.stringify(result, null, 2));
// END GetWithLimitJS

// Test
assert('JeopardyQuestion' in result.data.Get);
assert.equal(result.objects.length, 1);
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question']));
// End test


// ===================================
// ===== GET WITH LIMIT AND OFFSET EXAMPLES =====
// ===================================

// GetWithLimitOffsetJS

result = await myCollection.query.fetchObjects({
  returnProperties: ['question'],
  limit: 1,
  offset: 1,
})

console.log(JSON.stringify(result, null, 2));
// END GetWithLimitOffsetJS

// Test
assert.deepEqual(result.data.Get, {
  JeopardyQuestion: [
    {
      question: 'Pythons are oviparous, meaning they do this',
    },
  ],
});
// End test


// ===================================
// ===== GET PROPERTIES EXAMPLES =====
// ===================================

// GetPropertiesJS

result = await myCollection.query.fetchObjects({
// highlight-start
  returnProperties: ['question', 'answer', 'points'],
// highlight-end

  limit: 1,
  offset: 1,
})

console.log(JSON.stringify(result, null, 2));
// END GetPropertiesJS

// Test
assert('JeopardyQuestion' in result.data.Get);
assert.equal(result.objects.length, 1);
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(result.data.Get, {
  JeopardyQuestion: [
    {
      answer: 'Jonah',
      points: 100,
      question: 'This prophet passed the time he spent inside a fish offering up prayers',
    },
  ],
});
// End test


// ======================================
// ===== GET OBJECT VECTOR EXAMPLES =====
// ======================================

// GetObjectVectorJS

result = await myCollection.query.fetchObjects({
  returnProperties: ['question', 'answer', 'points'],
  limit: 1,
  offset: 1,
  // highlight-start
  includeVector: true
  // highlight-end

})

console.log(JSON.stringify(result, null, 2));
// END GetObjectVectorJS

// Test
assert('JeopardyQuestion' in result.data.Get);
assert.equal(result.objects.length, 1);
let additionalKeys = new Set(Object.keys(result.objects[0].properties._additional));
assert.deepEqual(additionalKeys, new Set(['vector']));
// End test


// ==================================
// ===== GET OBJECT ID EXAMPLES =====
// ==================================

// GetObjectIdJS

result = await myCollection.query.fetchObjects({
  limit: 1,
})

for (let object of result.objects) {
   console.log(JSON.stringify(object.uuid, null, 2));
}
// END GetObjectIdJS

// Test
assert('JeopardyQuestion' in result.data.Get);
assert.equal(result.objects.length, 1);
additionalKeys = new Set(Object.keys(result.objects[0].properties._additional));
assert.deepEqual(additionalKeys, new Set(['id']));
// End test

// =======================================
// ===== GET WITH CROSS-REF EXAMPLES =====
// =======================================


// GetWithCrossRefsJS

result = await myCollection.query.fetchObjects({
  limit: 2,
  // highlight-start
  returnReferences: [{
  linkOn: 'hasCategory',
  returnProperties: ['title'],
}]
// highlight-end
})

console.log(JSON.stringify(result, null, 2));
// END GetWithCrossRefsJS

// Test
assert('JeopardyQuestion' in result.data.Get);
assert.equal(result.objects.length, 2);
const questionValues = new Set(result.data.Get.JeopardyQuestion.map(q => q.question));
assert.deepEqual(questionValues, new Set([
  'This prophet passed the time he spent inside a fish offering up prayers',
  'Pythons are oviparous, meaning they do this',
]));
// End test


// ===================================
// ===== GET WITH METADATA EXAMPLES =====
// ===================================

// GetWithMetadataJS

result = await myCollection.query.fetchObjects({
  limit: 2,
  returnMetadata: ['creationTime']
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(JSON.stringify(object.metadata?.creationTime, null, 2));
}
// END GetWithMetadataJS

// Test
assert('JeopardyQuestion' in result.data.Get);
assert.equal(result.objects.length, 1);
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question']));
assert('creationTimeUnix' in result.objects[0].metadata.creationTime);
// End test


// =========================
// ===== MULTI-TENANCY =====
// =========================

// <!-- NEEDS TESTS -->

// MultiTenancy
// let multiTenantResult;
const myMTCollection = client.collections.get('WineReviewMT');
const collectionTenantA = myMTCollection.withTenant('tenantA');

const multiTenantResult = await collectionTenantA.query.fetchObjects({
  limit: 1,
  returnProperties: ['review_body','title']
})

console.log(JSON.stringify(multiTenantResult.objects[0].properties, null, 2));
// END MultiTenancy

// Test results
true
// End test
