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
async function deleteClass(client: WeaviateClient, className: string){
 if (await client.schema.exists(className)) {
   await client.schema.classDeleter().withClassName(className).do();
   }
}

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

////////////////////
// CONFIGURE DYNAMIC //
////////////////////

// START ConfigDynamic
async function configureDynamicCollection(client: WeaviateClient, className: string){
 const setIndexType = {
   class: className,
   // Add property definitions
   vectorizer: 'text2vec-openai',
   vectorIndexType: 'dynamic',
   vectorIndexConfig: {
    distance: 'cosine',
    vector_cache_max_objects: 100000,
    bq: { enabled: true, },
  },
  vectorIndexConfigDynamic: {
   distance: 'cosine',
   ef_construction: '256',  // Dynamic list size during construction
   max_connections: '128',  // Maximum number of connections per node
   ef: '-1',  // Dynamic list size during search; -1 enables dynamic Ef
   dynamic_ef_factor: '15',  // Multiplier for dynamic Ef
   dynamic_ef_min: '200',  // Minimum threshold for dynamic Ef
   dynamic_ef_max: '1000',  // Maximum threshold for dynamic Ef
   quantizer: 'Configure.VectorIndex.Quantizer.pq()',  // Quantizer configuration
  },
 };

 // Add the class to the schema
 await client.schema.classCreator().withClass(setIndexType).do();
}
// END ConfigDynamic

/////////////////////////////
/// AVOID TOP LEVEL AWAIT ///
/////////////////////////////

// Main
async function main(){
  const className = "ConfigCollection";

  const client = await getClient();

  // Run enable dynamic collection code
  await deleteClass(client, className)
  createDynamicCollection(client, className);

  // // Run configure dynamic collection code
  // await deleteClass(client, className)
  // configureDynamicCollection(client, className);
}

main()