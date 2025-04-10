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

// START RerankerTransformersBasic
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  reranker: weaviate.configure.reranker.transformers(),
  // highlight-end
});
// END RerankerTransformersBasic

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

// START RerankerJinaAIBasic
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  reranker: weaviate.configure.reranker.jinaai(),
  // highlight-end
});
// END RerankerJinaAIBasic

// START RerankerJinaAICustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  reranker: weaviate.configure.reranker.jinaai({
    model: 'jina-reranker-v2-base-multilingual',
  }),
  // highlight-end
});
// END RerankerJinaAICustomModel

// START RerankerNVIDIABasic
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  reranker: weaviate.configure.reranker.nvidia(),
  // highlight-end
});
// END RerankerNVIDIABasic

// START RerankerNVIDIACustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  reranker: weaviate.configure.reranker.nvidia({
    model: "nvidia/llama-3.2-nv-rerankqa-1b-v2",
    baseURL: "https://integrate.api.nvidia.com/v1",
  }),
  // highlight-end
});// END RerankerNVIDIACustomModel

// START RerankerVoyageAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  reranker: weaviate.configure.reranker.voyageAI({
    model: 'rerank-lite-1',
  }),
  // highlight-end
});
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
