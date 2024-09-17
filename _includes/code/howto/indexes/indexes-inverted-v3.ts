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

////////////
// SEARCH //
////////////

// START SearchIndex
// Add this import line
// import { dataType } from 'weaviate-client';

async function searchInvertedCollection(client: WeaviateClient, collectionName: string){
  await client.collections.create({
    name: collectionName,
    properties: [
      {
        name: 'TextProperty',
        dataType: dataType.TEXT,
        indexSearchable: true,
      },
    ],
  })
}
// END SearchIndex

////////////
// FILTER //
////////////

// START FilerIndex
// Add this import line
// import { dataType } from 'weaviate-client';

async function filterInvertedCollection(client: WeaviateClient, collectionName: string){
 await client.collections.create({
   name: collectionName,
   properties: [
     {
       name: 'TextProperty',
       dataType: dataType.TEXT,
       indexFilterable: true,
     },
   ],
 })
}
// END PropIndex

///////////
// RANGE //
///////////

// START RangeIndex
// Add this import line
// import { dataType } from 'weaviate-client';

async function rangeInvertedCollection(client: WeaviateClient, collectionName: string){
 await client.collections.create({
   name: collectionName,
   properties: [
     {
       name: 'NumericProperty',
       dataType: dataType.INT,
       indexRangeFilters: true,
     },
   ],
 })
}
// END RangeIndex

//////////
// BM25 //
//////////

// START BM25Index
// Add this import line
// import { dataType } from 'weaviate-client';

async function bm25InvertedCollection(client: WeaviateClient, collectionName: string){
 await client.collections.create({
   name: collectionName,
   invertedIndex: {
     bm25: {
       b: 0.7,
       k1: 1.25
     },
   }
 })
}
// END BM25Index

//////////////////////
// COLLECTION LEVEL //
//////////////////////

// START CollLevIndex
// Add this import line
// import { dataType } from 'weaviate-client';

async function collLevInvertedCollection(client: WeaviateClient, collectionName: string){
 await client.collections.create({
   name: collectionName,
   invertedIndex: {
     indexNullState: true,
     indexPropertyLength: true,
     indexTimestamps: true
   }
 })
}
// END CollLevIndex

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

  // // Run search code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   searchInvertedCollection(client, collectionName);
  // }

  // // Run filter code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   filterInvertedCollection(client, collectionName);
  // }

  // // Run range code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   rangeInvertedCollection(client, collectionName);
  // }

  // // Run bm25 code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   bm25InvertedCollection(client, collectionName);
  // }

  // Run collection level code
  deleteCollection(client, collectionName)
  if(await client.collections.get(collectionName).exists() != true){
    collLevInvertedCollection(client, collectionName);
  }

}

main()
