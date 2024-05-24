// Howto: Search -> Reranking - TypeScript examples

import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCD(
  process.env.WCS_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCS_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
     'X-Cohere-Api-Key': process.env.COHERE_APIKEY
   }
 } 
)


// START nearText // START RerankNearText // START bm25Rerank
let result;
const myCollection = client.collections.get('JeopardyQuestion');
// END nearText // END RerankNearText // END bm25Rerank

// ==================================
// ===== nearText before rerank =====
// ==================================

// START nearText

result = await myCollection.query.nearText(['flying'], {
  limit: 10,
  returnMetadata: ['score']
})

console.log(result.objects)
// END nearText

// Tests
let questionKeys = new Set(Object.keys(result.objects[0].metadata));
assert.deepEqual(questionKeys, new Set(['score']));
assert.equal(result.objects.length, 10);

// =================================
// ===== nearText after rerank =====
// =================================

// START RerankNearText

result = await myCollection.query.nearText(['flying'], {
  limit: 10,
  // highlight-start
  rerank: {
    property: 'question',
    query: 'publication',
  },
  // highlight-end
  returnMetadata: ['score']
})

console.log(result.objects)
// END RerankNearText

// Tests
questionKeys = new Set(Object.keys(result.objects[0].metadata));
assert.deepEqual(questionKeys, new Set(['score']));
assert.equal(result.objects.length, 10);
for (const question of result.objects) {
  assert.ok('rerankScore' in question.metadata);
  console.log('meta, delete me',question.metadata)
}


// ============================
// ===== bm25 with rerank =====
// ============================

// START bm25Rerank

result = await myCollection.query.bm25('paper', {
  limit: 10,
  // highlight-start
  // rerank: {
  //   property: 'question',
  //   query: 'publication',
  // },
  // highlight-end
  returnMetadata: ['score']
})

console.log(result.objects)
// END bm25Rerank

// Tests
questionKeys = new Set(Object.keys(result.objects[0].metadata));
assert.deepEqual(questionKeys, new Set(['score']));
assert.equal(result.objects.length, 10);

