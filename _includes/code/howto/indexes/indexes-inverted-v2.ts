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

 // // Run inverted collection code
 // deleteClass(client, className)
 // if(await client.schema.exists(className) != true){
 //  createInvertedCollection(client, className);
 // }
}

main()