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
 deleteClass(client, className)

 // Only safe to run one at a time due to aynsc code

 // // Run enable dynamic collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //  createDynamicCollection(client, className);
 // }

 // // Run configure dynamic collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //  configureDynamicCollection(client, className);
 // }

}

main()