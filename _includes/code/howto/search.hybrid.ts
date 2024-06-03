// Howto: hybrid search - TypeScript examples

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// searchHybridWithFusionType
import weaviate from 'weaviate-client';

// END searchMultipleFiltersAnd // END searchMultipleFiltersNested // END searchHybridWithFusionType




const client = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 } 
)

// searchHybridBasic  // searchHybridWithScore  // searchHybridWithAlpha  // searchHybridWithFusionType  // searchHybridWithProperties  // searchHybridWithVector  // searchHybridWithFilter  // START limit  // START autocut // searchHybridWithPropertyWeighting
let result;
const myCollection = client.collections.get('JeopardyQuestion');
// END searchHybridBasic  // END searchHybridWithScore  // END searchHybridWithAlpha  // END searchHybridWithFusionType  // END searchHybridWithProperties  // END searchHybridWithVector  // END searchHybridWithFilter  // END limit  // END autocut // END searchHybridWithPropertyWeighting



// ===============================================
// ===== QUERY WITH TARGET VECTOR & Hybrid =====
// ===============================================

// NamedVectorHybrid
const myNVCollection = client.collections.get('WineReviewNV');

const result = await myNVCollection.query.hybrid('a sweet German white wine',{
 limit: 2,
 returnProperties: ['title', 'country', 'review_body'],
 // highlight-start
 targetVector: 'title_country',
 // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END NamedVectorHybrid

// Tests
assert.deepEqual(result.objects.length, 2);


// ==============================
// ===== Basic Hybrid Query =====
// ==============================

// searchHybridBasic

result = await myCollection.query.hybrid('food',{
 limit: 2,
 returnProperties: ['question', 'answer'],
})

console.log(JSON.stringify(result.objects, null, 2));
// END searchHybridBasic

// Tests
let questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.equal(result.objects.length, 3);


// ===================================
// ===== Hybrid Query with Score =====
// ===================================

// searchHybridWithScore

result = await myCollection.query.hybrid('food',{
 limit: 2,
 returnProperties: ['question', 'answer'],
   // highlight-start
 returnMetadata: ['score','explainScore']
   // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END searchHybridWithScore

// Tests
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
const additionalKeys = new Set(Object.keys(result.objects[0].metadata));
assert.deepEqual(additionalKeys, new Set(['score', 'explainScore']));
assert.equal(result.objects.length, 3);


// ===================================
// ===== Hybrid Query with Alpha =====
// ===================================

// searchHybridWithAlpha

result = await myCollection.query.hybrid('food',{
 limit: 2,
 returnProperties: ['question', 'answer'],
   // highlight-start
   alpha: 0.25
   // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END searchHybridWithAlpha

// Tests
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.equal(result.objects.length, 3);



// ============================================
// ===== Hybrid Query with Fusion Methods =====
// ============================================

// searchHybridWithFusionType

result = await myCollection.query.hybrid('food',{
 limit: 2,
 returnProperties: ['question', 'answer'],
   // highlight-start
 fusionType: 'RelativeScore', // can also be 'Ranked'
   // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END searchHybridWithFusionType

// Tests
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.equal(result.objects.length, 3);


// ========================================
// ===== Hybrid Query with Properties =====
// ========================================

// searchHybridWithProperties

result = await myCollection.query.hybrid('food',{
 limit: 3,
 alpha: 0.25,
   // highlight-start
 queryProperties: ['question']
   // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END searchHybridWithProperties

// Test
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.equal(result.objects.length, 3);


// ================================================
// ===== Hybrid Query with Property Weighting =====
// ================================================

// searchHybridWithPropertyWeighting

result = await myCollection.query.hybrid('food',{
 limit: 3,
 alpha: 0.25,
   // highlight-start
 queryProperties: ['question^2', 'answer']
   // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END searchHybridWithPropertyWeighting

// Tests
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.equal(result.objects.length, 3);

// ====================================
// ===== Hybrid Query with Vector =====
// ====================================

// searchHybridWithVector
let queryVector = Array(1536).fill(0.12345) // Query vector [0.12345, 0.12345, 0.12345...]

result = await myCollection.query.hybrid('food',{
  limit: 3,
  returnProperties: ['question', 'answer'],
  alpha: 0.25,
  // highlight-start
  vector: queryVector
  // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END searchHybridWithVector

// Tests
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.equal(result.objects.length, 3);


// ====================================
// ===== Hybrid Query with Filter =====
// ====================================

// searchHybridWithFilter

result = await myCollection.query.hybrid('food',{
    // highlight-start
    filters: myCollection.filter.byProperty('round').equal('Double Jeopardy!'),
    // highlight-end
    limit: 3,
})

console.log(JSON.stringify(result.objects, null, 2));
// END searchHybridWithFilter

// Tests
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
assert.equal(result.objects.length, 3);
result.objects.map((question) => {
  assert.deepEqual(question.properties.round, 'Double Jeopardy!');
  console.log(question)
})
// for (const question of result.objects) {
//   assert.deepEqual(question.round, 'Double Jeopardy!');
// }


// ===================================
// ===== Hybrid Query with limit =====
// ===================================

// START limit

result = await myCollection.query.hybrid('safety',{
 returnProperties: ['question', 'answer'],
 returnMetadata: ['score'],
   // highlight-start
   limit: 3,
   // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END limit

// Tests
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.deepEqual(Object.keys(result.objects[0].metadata), ['score']);
assert.equal(result.objects.length, 3);
// assert(result.objects[0].properties['answer'].includes('OSHA'));


// =====================================
// ===== Hybrid Query with autocut =====
// =====================================

// START autocut

result = await myCollection.query.hybrid('safety',{
 returnProperties: ['question', 'answer'],
 returnMetadata: ['score'],
   // highlight-start
   autoLimit: 1
   // highlight-end
})

console.log(JSON.stringify(result.objects, null, 2));
// END autocut

// Tests
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer']));
assert.deepEqual(Object.keys(result.objects[0].metadata), ['score']);
// assert.equal(result.objects[0].properties['answer'], 'Guards');
// TODO: too many results if autocut logic changes? assert.equal(result.objects.length, 1);
