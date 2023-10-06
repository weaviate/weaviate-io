// Starter-guides: Generative search (RAG)

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// Instantiation
import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: 'edu-demo.weaviate.network',
  apiKey: new ApiKey('learn-weaviate'),
  headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY },  // Replace with your inference API key
});
// END Instantiation

const is_ready = await client.misc.liveChecker().do()
assert.equal(is_ready, true, 'Weaviate is not ready')


// DataRetrieval  // TransformResultSets  // TransformIndividualObjects  // ListModules
let result;

// END DataRetrieval  // END TransformResultSets  // END TransformIndividualObjects  // END ListModules

// DataRetrieval
result = await client.graphql
  .get()
  .withClassName('GitBookChunk')
  .withNearText({ concepts: ['history of git'] })
  .withFields('chunk chapter_title chunk_index')
  .withLimit(2)
  .do();

console.log(JSON.stringify(result, null, 2));
// END DataRetrieval

assert(result.data.Get['GitBookChunk'].length == 2, "Wrong number of objects returned.")


// TransformResultSets
result = await client.graphql
  .get()
  .withClassName('GitBookChunk')
  .withNearText({ concepts: ['history of git'] })
  .withFields('chunk chapter_title chunk_index')
  .withLimit(2)
  .withGenerate({
    groupedTask: 'Summarize the key information here in bullet points'
  })
  .do();

console.log(result.data.Get['GitBookChunk'][0]._additional.generate.groupedResult);
// END TransformResultSets

assert(typeof result.data.Get['GitBookChunk'][0]._additional.generate.groupedResult === 'string', 'The generated object is not a string')


// TransformIndividualObjects
result = await client.graphql
  .get()
  .withClassName('WineReview')
  .withNearText({ concepts: ['fruity white wine'] })
  .withFields('review_body title country points')
  .withLimit(5)
  .withGenerate({
    singlePrompt:
    `Translate this review into French, using emojis:
    ===== Country of origin: {country}, Title: {title}, Review body: {review_body}`
  })
  .do();

for (const r of result.data.Get['WineReview']) {
  console.log(r._additional.generate.singleResult)
}
// END TransformIndividualObjects

for (const r of result.data.Get['WineReview']) {
  assert(typeof r._additional.generate.singleResult === 'string', 'The generated object is not a string')
}

// ListModules
result = await client.misc
  .metaGetter().do();
console.log(result)
// END ListModules
