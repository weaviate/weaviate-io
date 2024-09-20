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
  }
}

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

 // // Run search code
 // await deleteClass(client, className)
 // searchInvertedCollection(client, className);

 // // Run filter code
 // await deleteClass(client, className)
 // filterInvertedCollection(client, className);

 // // Run range code
 // await deleteClass(client, className)
 // rangeInvertedCollection(client, className);

 // Run bm25 code
 await deleteClass(client, className)
 bm25InvertedCollection(client, className);

 // // Run collection level code
 // await deleteClass(client, className)
 // collLevInvertedCollection(client, className);

}

main()