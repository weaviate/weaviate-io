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

////////////
// SEARCH //
///////////

// START SearchIndex
async function searchInvertedCollection(client: WeaviateClient, className: string){
 const invertedIndexSettings = {
  class: className,
  vectorizer: 'text2vec-huggingface',
  properties: [
    {
      name: 'textProperty',
      dataType: ['text'],
      indexSearchable: true,
    },
  ],
};

// Add the class to the schema
const result = await client.schema
  .classCreator()
  .withClass(invertedIndexSettings)
  .do();
}
// END SearchIndex

////////////
// FILTER //
////////////

// START FilterIndex
async function filterInvertedCollection(client: WeaviateClient, className: string){
 const invertedIndexSettings = {
  class: className,
  vectorizer: 'text2vec-huggingface',
  properties: [
    {
      name: 'textProperty',
      dataType: ['text'],
      indexFilterable: true,
    },
  ],
};

// Add the class to the schema
const result = await client.schema
  .classCreator()
  .withClass(invertedIndexSettings)
  .do();
}
// END FilterIndex

///////////
// RANGE //
///////////

// START RangeIndex
async function rangeInvertedCollection(client: WeaviateClient, className: string){
 const invertedIndexSettings = {
  class: className,
  vectorizer: 'text2vec-huggingface',
  properties: [
    {
      name: 'numericProperty',
      dataType: ['int'],
      indexRangeFilters: true,
    },
  ],
};

// Add the class to the schema
const result = await client.schema
  .classCreator()
  .withClass(invertedIndexSettings)
  .do();
}
// END RangeIndex

//////////
// BM25 //
//////////

// START BM25Index
async function bm25InvertedCollection(client: WeaviateClient, className: string){
 const invertedIndexSettings = {
  class: className,
  vectorizer: 'text2vec-huggingface',
  invertedIndexConfig: {
    bm25: {
        b: 0.7,
        k1: 1.25
    },
};

// Add the class to the schema
const result = await client.schema
  .classCreator()
  .withClass(invertedIndexSettings)
  .do();
}
// END BM25Index

//////////////////////
// COLLECTION LEVEL //
//////////////////////

// START CollLevIndex
async function collLevInvertedCollection(client: WeaviateClient, className: string){
 const invertedIndexSettings = {
  class: className,
  vectorizer: 'text2vec-huggingface',
  invertedIndexConfig: {
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
// END CollLevIndex

/////////////////////////////
/// AVOID TOP LEVEL AWAIT ///
/////////////////////////////

// Main
async function main(){
 const className = "ConfigCollection";

 const client = await getClient();
 deleteClass(client, className)

 // Only safe to run one at a time due to aynsc code

 // Run search code
 deleteCollection(client, collectionName)
 if(await client.collections.get(collectionName).exists() != true){
   searchInvertedCollection(client, collectionName);
 }

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

 // // Run collection level code
 // deleteCollection(client, collectionName)
 // if(await client.collections.get(collectionName).exists() != true){
 //   collLevInvertedCollection(client, collectionName);
 // }

}

main()