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

//////////////////////
// Inverted Indexes //
//////////////////////

// START PropIndex
// Add this import line
// import { dataType } from 'weaviate-client';

async function createInvertedCollection(client: WeaviateClient, collectionName: string){
  await client.collections.create({
    name: collectionName,
    properties: [
      {
        name: 'TextProperty',
        dataType: dataType.TEXT,
        indexFilterable: true,
        indexSearchable: true,
      },
      {
        name: 'NumericProperty',
        dataType: dataType.INT,
        indexRangeFilters: true,
      },
    ],
    invertedIndex: {
      bm25: {
        b: 0.7,
        k1: 1.25
      },
      indexNullState: true,
      indexPropertyLength: true,
      indexTimestamps: true
    }
  })
}
// END PropIndex

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

  // // Run inverted collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   createInvertedCollection(client, collectionName);
  // }
}

main()
