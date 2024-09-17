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
    vectorIndexType: 'hnsw',
    // Configure properties, vectorizer
  };

  // Add the class to the schema
  await client.schema.classCreator().withClass(setIndexType).do();
}
// END EnableHNSW


////////////////////
// CONFIGURE HNSW //
////////////////////

// START ConfigHNSW
async function configHNSWCollection(client: WeaviateClient, className: string){

 const setIndexType = {
   class: className,
   vectorIndexType: 'hnsw',
   vectorIndexConfig: {
     distance: 'cosine',
     ef_construction: '256',  // Dynamic list size during construction
     max_connections: '128',  // Maximum number of connections per node
     ef: '-1',  // Dynamic list size during search; -1 enables dynamic Ef
     dynamic_ef_factor: '15',  // Multiplier for dynamic Ef
     dynamic_ef_min: '200',  // Minimum threshold for dynamic Ef
     dynamic_ef_max: '1000',  // Maximum threshold for dynamic Ef
     quantizer: 'Configure.VectorIndex.Quantizer.pq()',  // Quantizer configuration
   },
   // Configure properties, vectorizer
 };

 // Add the class to the schema
 await client.schema.classCreator().withClass(setIndexType).do();
}
// END ConfigHNSW

///////////////////
// COMPRESS HNSW //
///////////////////

// START CompressHNSW
async function compressHNSWCollection(client: WeaviateClient, className: string){
 const setIndexType = {
   class: className,
   vectorIndexConfig: {
     quantizer: 'Configure.VectorIndex.Quantizer.pq()',
   },
   // Configure properties, vectorizer
 };

 // Add the class to the schema
 await client.schema.classCreator().withClass(setIndexType).do();
}
// END CompressHNSW

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
    },
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
   vectorIndexType: 'flat',
   // Configure properties, vectorizer
 };

 // Add the class to the schema
 await client.schema.classCreator().withClass(setIndexType).do();
}
// END EnableFlat

////////////////////
// CONFIGURE FLAT //
////////////////////

// START ConfigFlat
async function configureFlatCollection(client: WeaviateClient, className: string){

 const setIndexType = {
   class: className,
   vectorIndexType: 'flat',
   vectorIndexConfig: {
     distance: 'cosine',
     vector_cache_max_objects: 100000,
     bq: { enabled: true, },
   },
   // Configure properties, vectorizer
 };

 // Add the class to the schema
 await client.schema.classCreator().withClass(setIndexType).do();
}
// END ConfigFlat

///////////////////
// COMPRESS FLAT //
///////////////////

// START CompressFlat
async function compressFlatCollection(client: WeaviateClient, className: string){

 const setIndexType = {
   class: className,
   vectorIndexType: 'flat',
   vectorIndexConfig: {
     bq: { enabled: true, },
   },
   // Configure properties, vectorizer
 };

 // Add the class to the schema
 await client.schema.classCreator().withClass(setIndexType).do();
}
// END CompressFlat

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

//////////////////////
// Inverted Indexes //
//////////////////////

// START PropIndex
async function createInvertedCollection(client: WeaviateClient, className: string){
 const invertedIndexSettings = {
  class: className,
  vectorizer: 'text2vec-huggingface',
  properties: [
    {
      name: 'textProperty',
      dataType: ['text'],
      indexFilterable: true,
      indexSearchable: true,
      moduleConfig: {
        'text2vec-huggingface': {},
      },
    },
    {
      name: 'numericProperty',
      dataType: ['int'],
      indexRangeFilters: true,
    },
  ],
  invertedIndexConfig: {
    bm25: {
        b: 0.7,
        k1: 1.25
    },
    indexTimestamps: true,
    indexNullState: true,
    indexPropertyLength: true
  }
};

// Add the class to the schema
const result = await client.schema
  .classCreator()
  .withClass(invertedIndexSettings)
  .do();
}
// END PropIndex

/////////////////////////////
/// AVOID TOP LEVEL AWAIT ///
/////////////////////////////

// Main
async function main(){
 const className = "ConfigCollection";

 const client = await getClient();
 deleteClass(client, className)

 // Only safe to run one at a time due to aynsc code

 // // Run enable HNSW collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //   createHNSWCollection(client, className);
 // }

 // Run configure HNSW collection code
 deleteClass(client, className)
 if(await client.schema.exists(className) != true){
   configHNSWCollection(client, className);
 }

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

 // // Run configure flat collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //  configureFlatCollection(client, className);
 // }

 // // Run compress flat collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //  compressFlatCollection(client, className);
 // }

 // // Run enable dynamic collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //  createDynamicCollection(client, className);
 // }

 // // Run inverted collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //  createInvertedCollection(client, className);
 // }
}

main()