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

// ===============================
// ===== meta count EXAMPLES =====
// ===============================

// MetaCount JS
async function metaCountQuery() {
  const res = await client
    .graphql
    .get()
    .withClassName('JeopardyQuestion')
    .withFields('question')
    .do();
  console.log(JSON.stringify(res));
  return res;
}

metaCountQuery();
// END MetaCount JS

// Test
metaCountQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  const questionKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question']));
});
// End test


// ==================================
// ===== Text property EXAMPLES =====
// ==================================

// TextProp JS
async function textPropQuery() {
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

textPropQuery();
// END TextProp JS

// Test
textPropQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const questionKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question']));
});
// End test


// ====================================
// ===== Number property EXAMPLES =====
// ====================================

// NumberProp JS
async function numberPropQuery() {
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

numberPropQuery();
// END NumberProp JS

// Test
textPropQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const questionKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question']));
});
// End test


// ============================
// ===== nearXXX EXAMPLES =====
// ============================

// nearXXX JS
async function nearXXXQuery() {
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

nearXXXQuery();
// END nearXXX JS

// Test
nearXXXQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const questionKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]));
  assert.deepEqual(questionKeys, new Set(['question', 'answer', 'points']));
});
// End test


// =========================================
// ===== nearText.objectLimit EXAMPLES =====
// =========================================

// objectLimit JS
async function objectLimit() {
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

objectLimit();
// END objectLimit JS

// Test
objectLimit().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const additionalKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['vector']));
});
// End test


// ============================
// ===== groupBy EXAMPLES =====
// ============================

// groupBy JS
async function groupBy() {
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

groupBy();
// END groupBy JS

// Test
groupBy().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const additionalKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['id']));
});
// End test


// =================================
// ===== where filter EXAMPLES =====
// =================================

// whereFilter JS
async function whereFilter() {
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

whereFilter();
// END whereFilter JS

// Test
whereFilter().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const additionalKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['id']));
});
// End test
