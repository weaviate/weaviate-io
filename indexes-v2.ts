// TODO: Configure as part of the test harness
// TODO: Needs tests


var DEBUG = true;

// Imports
import weaviate, { WeaviateClient } from 'weaviate-ts-client';

// Create client connection
function getClient(){
  const client: WeaviateClient = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
  });

  return client;
}

// Delete pre-existing collections
function deleteClass(client, className: string){
  try {
    client.schema.classDeleter().withClassName(className).do();
  } catch (e) {
    // ignore error if class doesn't exist
  }
  return true
}

//////////////////////////////
// ENABLE HNSW - COLLECTION //
//////////////////////////////

async function createHNSWCollection(client, className: string){
 if(DEBUG) console.log("START HNSW: " + await client.schema.exists(className))
// START EnableHNSW
// Add this import line
// import { vectorizer, dataType, configure } from 'weaviate-client';

 if(DEBUG) console.log("END HNSW: " + await client.schema.exists(className))
}

/////////////////////////////
/// AVOID TOP LEVEL AWAIT ///
/////////////////////////////

// Main
async function main(){
 const className = "ConfigCollection";

 const client = await getClient();
 if(DEBUG) console.log(client) ;

 if(DEBUG) console.log("START: " + await client.schema.exists(className))
 deleteClass(client, className)
 if(DEBUG) console.log("START +1: " + await client.schema.exists(className))

 // Only one create can run at a time due to aynsc code
 // Run enable HNSW collection code
 deleteClass(client, className)
 if(await client.schema.exists(className) != true){
   createHNSWCollection(client, className);
  }

 // // Run multiple named vector collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //   createMultiCollection(client, className);
 //   }
}

main()