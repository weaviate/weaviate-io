import assert from 'assert';

// =========================
// ===== CREATE CLIENT =====
// =========================

// CompleteScript // Imports
import weaviate, { ApiKey, WeaviateClient } from 'weaviate-ts-client';
import 'dotenv/config'
// END CompleteScript // END Imports

// CompleteScript
async function main() {
  // define a collection name
  const collectionName = 'RollingStones'
// END CompleteScript
  
// CompleteScript // CreateClient  
  // connect to your Weaviate instance on WCS
  const client: WeaviateClient = weaviate.client({
    scheme: process.env.WEAVIATE_SCHEME_URL || '', 
    host: process.env.WEAVIATE_URL || '', 
    apiKey: new ApiKey(process.env.WEAVIATE_API_KEY || ''), 
    headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '' }, 
  });
// END CompleteScript // END CreateClient

// CompleteScript // CreateCollection
  const schemaDefinition = {
    class: collectionName,
    vectorizer: 'text2vec-openai',
  }

  // create a new collection
  await client.schema.classCreator().withClass(schemaDefinition).do()
// END CompleteScript // END CreateCollection

// CompleteScript
  const response = await fetch('https://raw.githubusercontent.com/weaviate/weaviate-io/tsdocs/content-fixes/_includes/clients/songs.json')
  const data = await response.json()
// END CompleteScript

// CompleteScript  // BatchInsert
  let counter = 0;
  let batcher = client.batch.objectsBatcher();

  // bulk insert data to your collection
  for (const dataObjects of data) {
    batcher = batcher.withObject({
      class: collectionName,
      properties: dataObjects,
    });

    // push a batch of 10 objects
    if (++counter > 9) {
      await batcher.do();
      batcher = client.batch.objectsBatcher();
      counter = 0;
    }
  }

  // push the remaining batch of objects
  if (counter > 0) {
    await batcher.do();
  }
// END CompleteScript  // END BatchInsert

// CompleteScript  // RunAQuery
  // run a nearText search; limit 2 results; show distance metrics
  const queryResponse = await client
  .graphql
  .get()
  .withClassName(collectionName) // define a collection to interact with 
  .withFields("title artist  _additional { distance id }")
  .withNearText({
    "concepts": ['songs about cowboys']
  })
  .withLimit(2)
  .do();

  console.log('Here are songs about cowboys:', queryResponse.data.Get.RollingStones)
// END CompleteScript  // END RunAQuery

  // delete your collection
  await client.schema.classDeleter().withClassName(collectionName).do();

  console.log('Collection Exists:', await client.schema.exists(collectionName))
}

main()
// END CompleteScript