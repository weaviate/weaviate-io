// TODO: Configure as part of the test harness
// TODO: Needs tests

// Enable debug statements
var DEBUG = true;
// var DEBUG = false;

// Imports
import weaviate from 'weaviate-client';
import { vectorizer, dataType, configure } from 'weaviate-client';

// Delete pre-existing collections
function deletePrior(client, collectionName){
 if (client.collections.get(collectionName))
   client.collections.delete(collectionName);

 if(DEBUG) console.log("Deleted: " + collectionName);
}

// Create client connection
async function getClient(){
 const client: WeaviateClient = weaviate.connectToLocal();

 return client;
}

//////////////////////////////
// ENABLE HNSW - COLLECTION //
//////////////////////////////

// START EnableHNSW
// Add this import line
// import { vectorizer, dataType, configure } from 'weaviate-client';

async function createHNSWCollection(client, collectionName){
  if(DEBUG) console.log("Create HNSW: " + collectionName);

  await client.collections.create({
    name: collectionName,
    vectorizers: vectorizer.text2VecOpenAI({
     vectorIndexConfig: configure.vectorIndex.hnsw(),
    }),
  })
}
// END EnableHNSW

//////////////////////////////
/// ENABLE HNSW - MULTIPLE ///
//////////////////////////////

// START EnableMulti
async function createMultiCollection(client, collectionName){
  if(DEBUG) console.log("Create Multi: " + collectionName);

  const c = client;
  const cn = collectionName;

  console.log("Multi no-op: " + cn);
}
// END EnableMulti

/////////////////////////////
/// AVOID TOP LEVEL AWAIT ///
/////////////////////////////

// Main
async function main(){
 const collectionName = "ConfigCollection";

 const client = await getClient();
 if(DEBUG) console.log(client);

 // Run enable HNSW collection code
 deletePrior(client, collectionName);
 createHNSWCollection(client, collectionName);

 // Run multiple named vector collection code
 deletePrior(client, collectionName);
 createMultiCollection(client, collectionName);
}

main()
