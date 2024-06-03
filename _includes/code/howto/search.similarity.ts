// How-to: Search -> Similarity search - TypeScript examples

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

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

// add let result later
// GetNearText  // GetNearVector  // GetNearObject  // GetLimitOffset  // GetWithDistance  // START Autocut  // GetWithGroupBy  // GetWithFilter 
const jeopardy = client.collections.get('JeopardyQuestion');
// END GetNearText  // END GetNearVector  // END GetNearObject  // END GetLimitOffset  // END GetWithDistance  // END Autocut  // END GetWithGroupBy  // END GetWithFilter 


// ===============================================
// ===== QUERY WITH TARGET VECTOR & nearText =====
// ===============================================
{
// NamedVectorNearText
const myNVCollection = client.collections.get('WineReviewNV');

const result = await myNVCollection.query.nearText(['a sweet German white wine'],{
  limit: 2,
  // highlight-start
  targetVector: 'title_country',
  // highlight-end
  returnMetadata: ['distance']
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(JSON.stringify(object.metadata?.distance, null, 2));
}
// END NamedVectorNearText

// Tests
// assert.deepEqual(result.objects.length, 2);
}

// =========================
// ===== With NearText =====
// =========================
{
// https://weaviate.io/developers/weaviate/api/graphql/search-operators#neartext
// GetNearText

// highlight-start
const result = await jeopardy.query.nearText('animals in movies', {
// highlight-end
  limit: 2,
  returnMetadata: ['distance']
})

result.objects.forEach(item => {
  console.log(JSON.stringify(item.properties, null, 2))
  console.log(item.metadata?.distance)
})
// END GetNearText

// Tests
// let questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer']));
// assert.deepEqual(result.objects.length, 2);
}

// ================================
// ===== With NearVector =====
// ================================
{
const tempResp = await jeopardy.query.fetchObjects({limit:1, includeVector:true})
const queryVector = tempResp.objects[0].vectors.default

// https://weaviate.io/developers/weaviate/api/graphql/search-operators#neartext
// GetNearVector

// highlight-start
const result = await jeopardy.query.nearVector(queryVector, {
// highlight-end
  limit: 2,
  returnMetadata: ['distance']
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(JSON.stringify(object.metadata?.distance, null, 2));
}
// END GetNearVector

// Tests
// let questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer']));
// assert.deepEqual(result.objects.length, 2);
}

// ================================
// ===== With NearObject =====
// ================================
{
// https://weaviate.io/developers/weaviate/api/graphql/search-operators#nearobject
// GetNearObject

// highlight-start
const result = await jeopardy.query.nearObject('56b9449e-65db-5df4-887b-0a4773f52aa7', {
// highlight-end
  limit: 2,
  returnMetadata: ['distance']
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(JSON.stringify(object.metadata?.distance, null, 2));
}
// END GetNearObject

// Tests
// let questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer']));
// assert.deepEqual(result.objects.length, 2);
}

{
// Limit - https://weaviate.io/developers/weaviate/api/graphql/filters#limit-argument
// GetLimitOffset

const result = await jeopardy.query.nearText('animals in movies', {
  // highlight-start
  limit: 2,
  offset: 1,
  // highlight-end
  returnMetadata: ['distance']
})

console.log(JSON.stringify(result.objects, null, 2));
// END GetLimitOffset

// Tests
// let questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer']));
// assert.deepEqual(result.objects.length, 2);
}

// =========================
// ===== With Distance =====
// =========================
{
// Distance - http://weaviate.io/developers/weaviate/config-refs/distances
// GetWithDistance
// highlight-start
const maxDistance = 0.18;
// highlight-end

const result = await jeopardy.query.nearText('animals in movies', {
  // highlight-start
  distance: maxDistance,
  returnMetadata: ['distance'],
  // highlight-end
})

result.objects.forEach(item => {
  console.log(JSON.stringify(item.properties, null, 2))
  console.log(item.metadata?.distance)
})
// END GetWithDistance
}
// Tests
// questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer']));


// ========================
// ===== With Autocut =====
// ========================

// # http://weaviate.io/developers/weaviate/api/graphql/additional-operators#autocut
{
// START Autocut

const result = await jeopardy.query.nearText('animals in movies', {
  // highlight-start
  autoLimit: 1,
  // highlight-end
  returnMetadata: ['distance'],
})

result.objects.forEach(item => {
  console.log(JSON.stringify(item.properties, null, 2))
  console.log(item.metadata?.distance)
})
// END Autocut

// Tests
// questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer']));
}

// ========================
// ===== With GroupBy =====
// ========================
{
// groupBy - https://weaviate.io/developers/weaviate/api/graphql/get#get-groupby
// GetWithGroupBy

const result = await jeopardy.query.nearText('animals in movies', {
  limit: 10,
  returnMetadata: ['distance'],
  // highlight-start
  groupBy: {
    property: 'round',
    objectsPerGroup: 2,
    numberOfGroups: 2
  }
  // highlight-end
})

for (let group of result.objects) {
  console.log(group.uuid);
  console.log(JSON.stringify(group.belongsToGroup, null, 2));
  console.log(group.metadata?.distance);
}

// END GetWithGroupBy

// Tests
// questionKeys = new Set(Object.keys(result.objects[0].properties['_additional']));
// assert.deepEqual(questionKeys, new Set(['group']));
// assert.deepEqual(result.objects[0].properties['_additional']['group']['hits'].length, 2);
// assert.deepEqual(result.objects.length, 2);
}

// =======================
// ===== With Filter =====
// =======================

// GetWithFilter

const result = await jeopardy.query.nearText('animals in movies', {
  limit: 2,
  returnMetadata: ['distance'],
  // highlight-start
  filters: jeopardy.filter.byProperty('round').equal('Double Jeopardy!')
  // highlight-end
})

result.objects.forEach(item => {
  console.log(JSON.stringify(item.properties, null, 2))
  console.log(item.metadata?.distance)
})
// END GetWithFilter

// Tests
// questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
// assert.deepEqual(result.objects[0].properties['round'], 'Double Jeopardy!');
// assert.deepEqual(result.objects.length, 2);
