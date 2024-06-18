import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-client';

const client = await weaviate.connectToLocal({
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY || '',
    'X-Cohere-Api-Key': process.env.COHERE_APIKEY || '',
  },
});

// START RerankerCohereBasic
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  reranker: weaviate.configure.reranker.cohere(),
  // highlight-end
});
// END RerankerCohereBasic

// START RerankerCohereCustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  reranker: weaviate.configure.reranker.cohere({
    model: 'rerank-english-v3.0',
  }),
  // highlight-end
});
// END RerankerCohereCustomModel

// START RerankerVoyageAI
// Code example coming soon
// END RerankerVoyageAI

// START RerankerQueryExample
let myCollection = client.collections.get('DemoCollection');

const results = await myCollection.query.nearText(
  ['A holiday film'],
  // highlight-start
  {
    limit: 2,
    rerank: {
      property: 'title',                // The property to rerank on
      query: 'A melodic holiday film'   // If not provided, the original query will be used
    }
  }
  // highlight-end
);

for (const obj of results.objects) {
  console.log(obj.properties['title']);
}
// END RerankerQueryExample

client.close();
