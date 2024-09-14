// TODO: Configure as part of the test harness
// TODO: Needs tests

// Imports
import weaviate, { WeaviateClient,vectorizer, configure } from 'weaviate-client';

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

// START EnableMulti
// Add this import line
// import { vectorizer, configure } from 'weaviate-client';

async function createMultiCollection(client: WeaviateClient, collectionName: string){
  await client.collections.create({
    name: collectionName,
    vectorizers: [
      // Define a named vector
      vectorizer.text2VecCohere({
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
}
// END EnableMulti

/////////////////
// ENABLE FLAT //
/////////////////

// START EnableFlat
// Add this import line
// import { vectorizer, dataType, configure } from 'weaviate-client';

async function createFlatCollection(client: WeaviateClient, collectionName: string){
  await client.collections.create({
    name: collectionName,
    vectorizers: vectorizer.text2VecOpenAI({
      vectorIndexConfig: configure.vectorIndex.flat({
        quantizer: configure.vectorIndex.quantizer.bq({
          rescoreLimit: 200,
          cache: true
          }),
        }),
      })
    })
}
// END EnableFlat

/////////////////////////////
/// AVOID TOP LEVEL AWAIT ///
/////////////////////////////

// Main
async function main(){
  const collectionName = "ConfigCollection";

  const client = await getClient();

  // Clean up from earlier runs
  deleteCollection(client, collectionName)

  // Only one create can run at a time due to aynsc code

  // Run enable HNSW collection code
  deleteCollection(client, collectionName)
  if(await client.collections.get(collectionName).exists() != true){
    createHNSWCollection(client, collectionName);
  }

  // // Run multiple named vector collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   createMultiCollection(client, collectionName);
  // }

  // // Run enable Flat collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   createFlatCollection(client, collectionName);
  // }
}

main()
