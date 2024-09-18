// TODO: Configure as part of the test harness
// TODO: Needs tests

// Imports
import weaviate, { dataType, WeaviateClient,vectorizer, configure } from 'weaviate-client';

// Delete pre-existing collections
function deleteCollection(client: WeaviateClient, collectionName: string){
 try {
   client.collections.delete(collectionName)
} catch (e) {
  // ignore error if class doesn't exist
}

return true
}

// Create client connection
async function getClient(){
  const client: WeaviateClient = weaviate.connectToLocal();

  return client;
}

////////////////////
// ENABLE DYNAMIC //
////////////////////

// START EnableDynamic
// Add this import line
// import { vectorizer, dataType, configure } from 'weaviate-client';

async function createDynamicCollection(client: WeaviateClient, collectionName: string){
 await client.collections.create({
   name: collectionName,
   vectorizers: vectorizer.text2VecOpenAI({
     vectorIndexConfig: configure.vectorIndex.dynamic(),
       }),
     })
}
// END EnableDynamic


///////////////////////
// CONFIGURE DYNAMIC //
///////////////////////

// START ConfigDynamic
// Add this import line
// import { vectorizer, dataType, configure } from 'weaviate-client';

async function configureDynamicCollection(client: WeaviateClient, collectionName: string){
 await client.collections.create({
   name: collectionName,
   vectorizers: vectorizer.text2VecOpenAI({
     vectorIndexConfig: configure.vectorIndex.dynamic(),
       }),
     })
}
// END ConfigDynamic

/////////////////////////////
/// AVOID TOP LEVEL AWAIT ///
/////////////////////////////

// Main
async function main(){
  const collectionName = "ConfigCollection";

  const client = await getClient();

  // Clean up from earlier runs
  deleteCollection(client, collectionName)

  // Only safe to run one at a time due to aynsc code

  // // Run enable dynamic collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   createDynamicCollection(client, collectionName);
  // }

  // // Run configure dynamic collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   createDynamicCollection(client, collectionName);
  // }
 }

main()
