const assert = require('assert');

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

const { default: weaviate } = require('weaviate-ts-client');

// ===== Instantiation shown on snippet
const client = weaviate.client({
  scheme: 'https',
  host: 'some-endpoint.weaviate.network',  // Replace with your Weaviate URL
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // If authentication is on. Replace w/ your Weaviate instance API key
});

// ==============================
// ===== BASIC GET EXAMPLES =====
// ==============================

// BasicGetJS
async function basicGetQuery() {
  const res = await client
    .graphql
    .get()
    .withClassName('JeopardyQuestion')
    .withFields('question')
    .do();
  console.log(JSON.stringify(res));
  return res;
}

basicGetQuery();
// END BasicGetJS

// Test
basicGetQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  const questionKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question']));
});
// End test


// ===================================
// ===== GET WITH LIMIT EXAMPLES =====
// ===================================

// GetWithLimitJS
async function getWithLimitQuery() {
  const res = await client
    .graphql
    .get()
    .withClassName('JeopardyQuestion')
    .withFields('question')
    // highlight-start
    .withLimit(1)
    // highlight-end
    .do();
  console.log(JSON.stringify(res));
  return res;
}

getWithLimitQuery();
// END GetWithLimitJS

// Test
getWithLimitQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const questionKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question']));
});
// End test


// ===================================
// ===== GET WITH LIMIT AND OFFSET EXAMPLES =====
// ===================================

// GetWithLimitOffsetJS
async function getWithLimitOffset() {
  const res = await client
    .graphql
    .get()
    .withClassName('JeopardyQuestion')
    .withFields('question')
    // highlight-start
    .withLimit(1)
    .withOffset(1)
    // highlight-end
    .do();
  console.log(JSON.stringify(res));
  return res;
}

getWithLimitOffset();
// END GetWithLimitOffsetJS

// Test
getWithLimitQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const questionKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question']));
});
// End test


// ===================================
// ===== GET PROPERTIES EXAMPLES =====
// ===================================

// GetPropertiesJS
async function getPropertiesQuery() {
  const res = await client
    .graphql
    .get()
    .withClassName('JeopardyQuestion')
    // highlight-start
    .withFields('question answer points')
    // highlight-end
    .withLimit(1)
    .do();
  console.log(JSON.stringify(res));
  return res;
}

getPropertiesQuery();
// END GetPropertiesJS

// Test
getPropertiesQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const questionKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', 'points']));
});
// End test


// ======================================
// ===== GET OBJECT VECTOR EXAMPLES =====
// ======================================

// GetObjectVectorJS
async function getObjectVectorQuery() {
  const res = await client
    .graphql
    .get()
    .withClassName('JeopardyQuestion')
    // highlight-start
    .withFields('_additional {vector}')
    // highlight-end
    .withLimit(1)
    .do();
  console.log(JSON.stringify(res));
  return res;
}

getObjectVectorQuery();
// END GetObjectVectorJS

// Test
getObjectVectorQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const additionalKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['vector']));
});
// End test


// ==================================
// ===== GET OBJECT ID EXAMPLES =====
// ==================================

// GetObjectIdJS
async function getObjectIdQuery() {
  const res = await client
    .graphql
    .get()
    .withClassName('JeopardyQuestion')
    // highlight-start
    .withFields('_additional {id}')
    // highlight-end
    .withLimit(1)
    .do();
  console.log(JSON.stringify(res));
  return res;
}

getObjectIdQuery();
// END GetObjectIdJS

// Test
getObjectIdQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1);
  const additionalKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['id']));
});
// End test

// =======================================
// ===== GET WITH CROSS-REF EXAMPLES =====
// =======================================


// GetWithCrossRefsJS
const response = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withFields(`
  question
  hasCategory {
    ... on JeopardyCategory {
      title
    }
  }`)
  // highlight-end
  .withLimit(2)
  .do();

console.log(JSON.stringify(response, null, 2));
// END GetWithCrossRefsJS
