// ==============================
// ===== BASIC GET EXAMPLES =====
// ==============================
const assert = require('assert');

// BasicGet JS Example
const { default: weaviate } = require('weaviate-ts-client');

// END BasicGet JS Example

// Actual instantiation for testing
const client = weaviate.client({
  scheme: 'https',
  host: 'edu-demo.weaviate.network',
  apiKey: new weaviate.ApiKey('learn-weaviate'),  // If authentication is on. Replace w/ your Weaviate instance API key
});

`
// BasicGet JS Example
const client = weaviate.client({
  scheme: 'https',
  host: 'https://some-endpoint.weaviate.network',
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // If authentication is on. Replace w/ your Weaviate instance API key
});

// END BasicGet JS Example
`

// BasicGet JS Example
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
// END BasicGet JS Example

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
`
// GetWithLimit JS Example
const client = weaviate.client({
  scheme: 'https',
  host: 'https://some-endpoint.weaviate.network',
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // If authentication is on. Replace w/ your Weaviate instance API key
});

// END GetWithLimit JS Example
`

// GetWithLimit JS Example
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
// END GetWithLimit JS Example

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
`
// GetProperties JS Example
const client = weaviate.client({
  scheme: 'https',
  host: 'https://some-endpoint.weaviate.network',
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // If authentication is on. Replace w/ your Weaviate instance API key
});

// END GetProperties JS Example
`

// GetProperties JS Example
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
// END GetProperties JS Example

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
`
// GetObjectVector JS Example
const client = weaviate.client({
  scheme: 'https',
  host: 'https://some-endpoint.weaviate.network',
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // If authentication is on. Replace w/ your Weaviate instance API key
});

// END GetObjectVector JS Example
`

// GetObjectVector JS Example
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
// END GetObjectVector JS Example

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
`
// GetObjectId JS Example
const client = weaviate.client({
  scheme: 'https',
  host: 'https://some-endpoint.weaviate.network',
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // If authentication is on. Replace w/ your Weaviate instance API key
});

// END GetObjectId JS Example
`

// GetObjectId JS Example
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
// END GetObjectId JS Example

// Test
getObjectIdQuery().then(res => {
  assert('JeopardyQuestion' in res.data.Get);
  assert.deepEqual(res.data.Get.JeopardyQuestion.length, 1)
  const additionalKeys = new Set(Object.keys(res.data.Get.JeopardyQuestion[0]._additional));
  assert.deepEqual(additionalKeys, new Set(['id']));
});
// End test

