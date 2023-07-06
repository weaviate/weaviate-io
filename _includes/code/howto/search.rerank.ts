// Howto: Search -> Reranking - TypeScript examples

import assert from 'assert';
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',  // TODO: https
  host: 'localhost:8080', // TODO: edu-demo.weaviate.network
  // apiKey: new weaviate.ApiKey('learn-weaviate'),
  headers: {
    'X-OpenAI-Api-Key': process.env['OPENAI_API_KEY'],
  },
});

let result;

// ==================================
// ===== nearText before rerank =====
// ==================================

// START nearText
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withNearText({
    concepts: ['flying'],
  })
  .withLimit(10)
  .withFields('question answer _additional { distance }')
  .do();

console.log(JSON.stringify(result, null, 2));
// END nearText

// Tests
let questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
assert.equal(result.data.Get.JeopardyQuestion.length, 10);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok('distance' in question['_additional']);
}

/*
// =================================
// ===== nearText after rerank =====
// =================================

// START RerankNearText
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withNearText({
    concepts: ['flying'],
  })
  // highlight-start
  .withRerank({
    property: 'answer',
    query: 'floating',
  })
  // highlight-end
  .withLimit(10)
  .withFields('question answer _additional { distance }')
  .do();

console.log(JSON.stringify(result, null, 2));
// END RerankNearText

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
assert.equal(result.data.Get.JeopardyQuestion.length, 10);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok('distance' in question['_additional']);
}


// ============================
// ===== bm25 with rerank =====
// ============================

// START bm25Rerank
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withBm25({
    query: 'paper',
  })
  // highlight-start
  .withRerank({
    property: 'answer',
    query: 'floating',
  })
  // highlight-end
  .withLimit(10)
  .withFields('question answer _additional { distance }')
  .do();

console.log(JSON.stringify(result, null, 2));
// END bm25Rerank

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', '_additional']));
assert.equal(result.data.Get.JeopardyQuestion.length, 10);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok('distance' in question['_additional']);
}
*/
