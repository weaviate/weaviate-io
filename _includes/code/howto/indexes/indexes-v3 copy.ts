// TODO: Configure as part of the test harness
// TODO: Needs tests

// Imports
import weaviate, { WeaviateClient,vectorizer, configure } from 'weaviate-client';

// Delete pre-existing collections
function deleteCollection(client: WeaviateClient, collectionName: string){
  console.log("DEBUG 1")

  try {
    client.collections.delete(collectionName)
    console.log("DEBUG 2")
  } catch (e) {
    // ignore error if class doesn't exist
  }

  console.log("DEBUG 3")
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

async function createHNSWCollection(client: WeaviateClient, collectionName: string){
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

async function createMultiCollection(client: WeaviateClient, collectionName: string){
// START EnableMulti

 // Add this import line
 // import { vectorizer, configure } from 'weaviate-client';

  await client.collections.create({
    name: collectionName,
    vectorizers: [
      // Define a named vector
      vectorizer.text2VecOpenAI({
        name: "vectorForFieldOne",
        sourceProperties: ['FieldOne'],
        vectorIndexConfig: configure.vectorIndex.hnsw()
   }),
      // Define another named vector
      vectorizer.text2VecOpenAI({
        name: "vectorForFieldTwo",
        sourceProperties: ['FieldTwo'],
        vectorIndexConfig: configure.vectorIndex.flat()
   })
  ],
  // Configure properties
  })
// END EnableMulti
}

/////////////////////////////
/// AVOID TOP LEVEL AWAIT ///
/////////////////////////////

// Main
async function main(){
 const collectionName = "ConfigCollection";

 const client = await getClient();

 // Only run one of these at a time. Async code causes race condition crashes
 // // Run enable HNSW collection code
 // deleteCollection(client, collectionName);
 // createHNSWCollection(client, collectionName);

 // Run multiple named vector collection code
 console.log("DEBUG 0")
 deleteCollection(client, collectionName);
 console.log("DEBUG 4")
 createMultiCollection(client, collectionName);
 console.log("DEBUG 5")
}

main()
