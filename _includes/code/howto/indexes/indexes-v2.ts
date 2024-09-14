// TODO: Configure as part of the test harness
// TODO: Needs tests

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

// START EnableHNSW
async function createHNSWCollection(client: WeaviateClient, className: string){

  const setIndexType = {
    class: className,
    // Add property definitions
    vectorizer: 'text2vec-openai',
    vectorIndexType: 'hnsw',
    vectorIndexConfig: {
      distance: 'cosine',
      ef_construction: '256',  // Dynamic list size during construction
      max_connections: '128',  // Maximum number of connections per node
      quantizer: 'Configure.VectorIndex.Quantizer.pq()',  // Quantizer configuration
      ef: '-1',  // Dynamic list size during search; -1 enables dynamic Ef
      dynamic_ef_factor: '15',  // Multiplier for dynamic Ef
      dynamic_ef_min: '200',  // Minimum threshold for dynamic Ef
      dynamic_ef_max: '1000',  // Maximum threshold for dynamic Ef
      pq: {
        enabled: true,
        trainingLimit: 100000,
        segments: 96,
      },
    },
  };

  // Add the class to the schema
  await client.schema.classCreator().withClass(setIndexType).do();
}
// END EnableHNSW

//////////////////////////////
/// ENABLE HNSW - MULTIPLE ///
//////////////////////////////

// START EnableMulti
async function createMultiCollection(client: WeaviateClient, className: string){

 const classWithNamedVectors = {
    class: className,
    vectorConfig: {
     // Define a named vector
     vectorForFieldOne: {
       vectorizer: {
         'text2vec-cohere': {
           properties: ['FieldOne'],
         },
       },
       vectorIndexType: 'hnsw',
     },
     // Define another named vector
     vectorForFieldTwo: {
       vectorizer: {
         'text2vec-openai': {
           properties: ['FieldTwo'],
         },
       },
       vectorIndexType: 'flat'
      },
    }
  // Configure properties
  }

  // Add the class to the schema
  await client.schema.classCreator().withClass(classWithNamedVectors).do();
}
// END EnableMulti

/////////////////
// ENABLE FLAT //
/////////////////

// START EnableFlat
async function createFlatCollection(client: WeaviateClient, className: string){

 const setIndexType = {
   class: className,
   // Add property definitions
   vectorizer: 'text2vec-openai',
   vectorIndexType: 'flat',
   vectorIndexConfig: {
     distance: 'cosine',
     vector_cache_max_objects: 100000,
     bq: { enabled: true, },
   },
 };

 // Add the class to the schema
 await client.schema.classCreator().withClass(setIndexType).do();
}
// END EnableFlat

////////////////////
// ENABLE DYNAMIC //
////////////////////

// START EnableDynamic
async function createDynamicCollection(client: WeaviateClient, className: string){

 const setIndexType = {
   class: className,
   // Add property definitions
   vectorizer: 'text2vec-openai',
   vectorIndexType: 'dynamic',
 };

 // Add the class to the schema
 await client.schema.classCreator().withClass(setIndexType).do();
}
// END EnableDynamic

/////////////////////////////
/// AVOID TOP LEVEL AWAIT ///
/////////////////////////////

// Main
async function main(){
 const className = "ConfigCollection";

 const client = await getClient();
 deleteClass(client, className)

 // Only one create can run at a time due to aynsc code

 // Run enable HNSW collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //   createHNSWCollection(client, className);
 // }

 // // Run multiple named vector collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //   createMultiCollection(client, className);
 // }

 // // Run enable flat collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //  createFlatCollection(client, className);
 // }

  // Run enable dynamic collection code
  deleteClass(client, className)
  if(await client.schema.exists(className) != true){
   createDynamicCollection(client, className);
  }
}

main()