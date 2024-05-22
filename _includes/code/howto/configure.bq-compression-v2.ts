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

if (client.schema.exists('YourCollection')) {
  console.log('Deleting class');
  await client.schema.classDeleter().withClassName('YourCollection').do();
}

// ==============================
// =====  EnableBQ =====
// ==============================

// START EnableBQ
async function enableBQ() {
  const classObj = {
    class: 'YourCollection',
    vectorizer: 'text2vec-openai', // Can be any vectorizer
    // highlight-start
    vectorIndexType: 'flat',
    vectorIndexConfig: {
      bq: {
        enabled: true,
      },
    },
    // highlight-end
    //  Remainder not shown
  };
  const res = await client.schema.classCreator().withClass(classObj).do();
  console.log(res);
}

await enableBQ();
// END EnableBQ

if (client.schema.exists('YourCollection')) {
  console.log('Deleting class');
  await client.schema.classDeleter().withClassName('YourCollection').do();
}

// ==============================
// =====  EnableBQ =====
// ==============================

// START BQWithOptions
async function bqWithOptions() {
  const classObj = {
    class: 'YourCollection',
    vectorizer: 'text2vec-openai', // Can be any vectorizer
    vectorIndexType: 'flat',
    vectorIndexConfig: {
      // highlight-start
      bq: {
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

await bqWithOptions();
// END BQWithOptions
