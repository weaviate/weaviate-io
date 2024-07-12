// Howto: Search -> Reranking - TypeScript examples

import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
     'X-Cohere-Api-Key': process.env.COHERE_APIKEY
   }
 } 
)


// START RerankNearText // START bm25Rerank
const jeopardy = client.collections.get('JeopardyQuestion');
// END RerankNearText // END bm25Rerank

// =================================
// ===== nearText after rerank =====
// =================================
{
// START RerankNearText

const result = await jeopardy.query.nearText('flying', {
  limit: 10,
  // highlight-start
  rerank: {
    property: 'question',
    query: 'publication',
  },
  // highlight-end
  returnMetadata: ['score']
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(object.metadata?.score);
}
// END RerankNearText

// Tests
// questionKeys = new Set(Object.keys(result.objects[0].metadata));
// assert.deepEqual(questionKeys, new Set(['score']));
// assert.equal(result.objects.length, 10);
// for (const question of result.objects) {
//   assert.ok('rerankScore' in question.metadata);
//   console.log('meta, delete me',question.metadata)
// }
}

// ============================
// ===== bm25 with rerank =====
// ============================
{
// START bm25Rerank

const result = await jeopardy.query.bm25('paper', {
  limit: 10,
  // highlight-start
  rerank: {
    property: 'question',
    query: 'publication',
  },
  // highlight-end
  returnMetadata: ['score']
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(object.metadata?.score);
}
// END bm25Rerank

// Tests
// questionKeys = new Set(Object.keys(result.objects[0].metadata));
// assert.deepEqual(questionKeys, new Set(['score']));
// assert.equal(result.objects.length, 10);
}
