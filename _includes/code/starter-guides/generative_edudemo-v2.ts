// Starter-guides: Generative search (RAG)

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// Instantiation
import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: 'https://hha2nvjsruetknc5vxwrwa.c0.europe-west2.gcp.weaviate.cloud',
  apiKey: new ApiKey('nMZuw1z1zVtnjkXXOMGx9Ows7YWGsakItdus'),
  headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY },  // Replace with your inference API key
});
// END Instantiation

const is_ready = await client.misc.liveChecker().do()
assert.equal(is_ready, true, 'Weaviate is not ready')


// DataRetrieval
const dataRetrievalResult = await client.graphql
  .get()
  .withClassName('GitBookChunk')
  .withNearText({ concepts: ['history of git'] })
  .withFields('chunk chapter_title chunk_index')
  .withLimit(2)
  .do();

console.log(JSON.stringify(dataRetrievalResult, null, 2));
// END DataRetrieval

assert(dataRetrievalResult.data.Get['GitBookChunk'].length == 2, "Wrong number of objects returned.")


// TransformResultSets
const groupedTaskResponse = await client.graphql
  .get()
  .withClassName('GitBookChunk')
  .withNearText({ concepts: ['history of git'] })
  .withFields('chunk chapter_title chunk_index')
  .withLimit(2)
  .withGenerate({
    groupedTask: 'Summarize the key information here in bullet points'
  })
  .do();

console.log(groupedTaskResponse.data.Get['GitBookChunk'][0]._additional.generate.groupedResult);
// END TransformResultSets

assert(typeof groupedTaskResponse.data.Get['GitBookChunk'][0]._additional.generate.groupedResult === 'string', 'The generated object is not a string')


// TransformIndividualObjects
const singlePromptresult = await client.graphql
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

for (const r of singlePromptresult.data.Get['WineReview']) {
  console.log(r._additional.generate.singleResult)
}
// END TransformIndividualObjects

for (const r of singlePromptresult.data.Get['WineReview']) {
  assert(typeof r._additional.generate.singleResult === 'string', 'The generated object is not a string')
}

// ListModules
const metaResponse = await client.misc
  .metaGetter().do();
console.log(metaResponse)
// END ListModules
