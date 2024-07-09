import assert from 'assert';

// TODO - needs confirmation & test

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// START DockerInstantiationExample
import weaviate, { WeaviateClient, ObjectsBatcher } from 'weaviate-ts-client';
import fetch from 'node-fetch';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY }, // Replace with your inference API key
});
// END DockerInstantiationExample

if (client.schema.exists('MyCollection')) {
  console.log('Deleting class');
  await client.schema.classDeleter().withClassName('MyCollection').do();
}

// ==============================
// =====  EnableSQ =====
// ==============================

// START EnableSQ
async function enableSQ() {
  const classObj = {
    class: 'MyCollection',
    vectorizer: 'text2vec-openai', // Can be any vectorizer
    // highlight-start
    vectorIndexType: 'hnsw',
    vectorIndexConfig: {
      SQ: {
        enabled: true,
      },
    },
    // highlight-end
    //  Remainder not shown
  };
  const res = await client.schema.classCreator().withClass(classObj).do();
  console.log(res);
}

await enableSQ();
// END EnableSQ

if (client.schema.exists('MyCollection')) {
  console.log('Deleting class');
  await client.schema.classDeleter().withClassName('MyCollection').do();
}

// ==============================
// =====  EnableSQ =====
// ==============================

// START SQWithOptions
async function SQWithOptions() {
  const classObj = {
    class: 'MyCollection',
    vectorizer: 'text2vec-openai', // Can be any vectorizer
    vectorIndexType: 'hnsw',
    vectorIndexConfig: {
      // highlight-start
      SQ: {
        enabled: true,
        rescoreLimit: 200, // The minimum number of candidates to fetch before rescoring
        cache: true, // Default: false
      },
      // highlight-end
      vectorCacheMaxObjects: 100000, // Cache size (used if `cache` enabled)
    },
    //  Remainder not shown
  };
  const res = await client.schema.classCreator().withClass(classObj).do();
  console.log(res);
}

await SQWithOptions();
// END SQWithOptions
