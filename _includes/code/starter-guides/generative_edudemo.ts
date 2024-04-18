// Starter-guides: Generative search (RAG)

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// Instantiation
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCS(
  'https://',  // Replace with your Weaviate endpoint
 {
   authCredentials: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // Replace with your Weaviate instance API key
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)
// END Instantiation

// const is_ready = await client.getMeta() ✨ make work with new client
// assert.equal(is_ready, true, 'Weaviate is not ready')


// DataRetrieval
const myCollection = client.collections.get('GitBookChunk');

const dataRetrievalResult = await myCollection.query.nearText(['states in git'], {
  returnProperties: ['chunk', 'chapter_title', 'chunk_index'],
  limit: 2, })

console.log(JSON.stringify(dataRetrievalResult, null, 2));
// END DataRetrieval

assert(dataRetrievalResult.data.Get['GitBookChunk'].length == 2, "Wrong number of objects returned.")


// TransformResultSets
const groupedTaskResponse = await myCollection.generate.nearText("history of git",{
  singlePrompt: `translate a summary of {chunk} into french`
},
{
  returnProperties: ['chunk', 'chapter_title', 'chunk_index'],
  limit: 2,
})

console.log(groupedTaskResponse.generated);
// END TransformResultSets

assert(typeof groupedTaskResponse.data.Get['GitBookChunk'][0]._additional.generate.groupedResult === 'string', 'The generated object is not a string')


// TransformIndividualObjects
const myWineCollection = await client.collections.get('WineReview');

const singlePromptresult = await myWineCollection.generate.nearText("fruity white wine",{
  singlePrompt: `Translate this review into French, using emojis:
  ===== Country of origin: {country}, Title: {title}, Review body: {review_body}`
},{
  returnProperties: ['review_body','title','country','points'],
  limit: 5,
})

console.log(JSON.stringify(singlePromptresult.objects, null, 2));
// END TransformIndividualObjects

for (const r of singlePromptresult.data.Get['WineReview']) {
  assert(typeof r._additional.generate.singleResult === 'string', 'The generated object is not a string')
}

// ListModules
const metaResponse = await client.getMeta()
console.log(metaResponse)

// END ListModules
