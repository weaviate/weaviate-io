const assert = require('assert');

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// BasicGetJS
const { default: weaviate } = require('weaviate-ts-client');

// END BasicGetJS
// ===== Instantiation shown on snippet
// BasicGetJS
const client = weaviate.client({
  scheme: 'https',
  host: 'some-endpoint.weaviate.network',  // Replace with your Weaviate URL
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // If authentication is on. Replace w/ your Weaviate instance API key
});
// END BasicGetJS

// ==============================
// ===== BASIC GET EXAMPLES =====
// ==============================

// BasicGetJS
async function basicGetQuery() {
  try {
    const res = await client
      .graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withFields('question')
      .do();
    console.log(JSON.stringify(res));
    return res;
  } catch (err) {
    console.error(err);
  }
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
  try {
    const res = await client
      .graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withFields('question')
      .withLimit(1)
      .do();
    console.log(JSON.stringify(res));
    return res;
  } catch (err) {
    console.error(err);
  }
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
// ===== GET PROPERTIES EXAMPLES =====
// ===================================

// GetPropertiesJS
async function getPropertiesQuery() {
  try {
    const res = await client
      .graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withFields('question answer points')
      .withLimit(1)
      .do();
    console.log(JSON.stringify(res));
    return res;
  } catch (err) {
    console.error(err);
  }
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
  try {
    const res = await client
      .graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withFields('_additional {vector}')
      .withLimit(1)
      .do();
    console.log(JSON.stringify(res));
    return res;
  } catch (err) {
    console.error(err);
  }
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
  try {
    const res = await client
      .graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withFields('_additional {id}')
      .withLimit(1)
      .do();
    console.log(JSON.stringify(res));
    return res;
  } catch (err) {
    console.error(err);
  }
}

getObjectIdQuery();
// END GetObjectIdJS

// Test
getObjectIdQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const additionalKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['id']));
});
// End test

