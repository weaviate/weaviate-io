// TODO: Configure as part of the test harness
// TODO: Needs tests

// Imports
import weaviate, { dataType, WeaviateClient,vectorizer, configure } from 'weaviate-client';

// Delete pre-existing collections
async function deleteCollection(client: WeaviateClient, collectionName: string){
 if(client.collections.exists(collectionName)){
   await client.collections.delete(collectionName)
  }
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

// START FilterIndex
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
// END FilterIndex

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

  // Run search code
  await deleteCollection(client, collectionName)
  await searchInvertedCollection(client, collectionName);

  // // Run filter code
  // await deleteCollection(client, collectionName)
  // await filterInvertedCollection(client, collectionName);

  // // Run range code
  // await deleteCollection(client, collectionName)
  // await rangeInvertedCollection(client, collectionName);

  // // Run bm25 code
  // await deleteCollection(client, collectionName)
  // await bm25InvertedCollection(client, collectionName);

  // // Run collection level code
  // await deleteCollection(client, collectionName)
  // await collLevInvertedCollection(client, collectionName);


}

main()
