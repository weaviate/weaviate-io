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

//////////////////////////////
// ENABLE HNSW - COLLECTION //
//////////////////////////////

// START EnableHNSW
// Add this import line
// import { vectorizer, dataType, configure } from 'weaviate-client';

async function createHNSWCollection(client: WeaviateClient, collectionName: string){
  await client.collections.create({
    name: collectionName,
    vectorizers: vectorizer.text2VecOpenAI({
     vectorIndexConfig: configure.vectorIndex.hnsw(),
    }),
  })
}
// END EnableHNSW

////////////////////
// CONFIGURE HNSW //
////////////////////

// START ConfigHNSW
// Add this import line:
// import { vectorizer, dataType, configure } from 'weaviate-client';

async function configureHNSWCollection(client: WeaviateClient, collectionName: string){
 await client.collections.create({
   name: collectionName,
   vectorizers: vectorizer.text2VecOpenAI({
     vectorIndexConfig: configure.vectorIndex.hnsw({
       distanceMetric: 'cosine',
       efConstruction: 256,         // Dynamic list size during construction
       maxConnections: 128,         // Maximum number of connections per node
       ef: -1,                      // Dynamic list size during search; -1 enables dynamic Ef
       dynamicEfFactor: 15,         // Multiplier for dynamic Ef
       dynamicEfMin: 200,           // Minimum threshold for dynamic Ef
       dynamicEfMax: 1000,          // Maximum threshold for dynamic Ef
       quantizer: configure.vectorIndex.quantizer.pq() // Compression
     }),
   }),
 })
}
// END ConfigHNSW

////////////////////
// COMPRESS HNSW //
////////////////////

// START CompressHNSW
// Add this import line:
// import { vectorizer, dataType, configure } from 'weaviate-client';

async function compressHNSWCollection(client: WeaviateClient, collectionName: string){
 await client.collections.create({
   name: collectionName,
   vectorizers: vectorizer.text2VecOpenAI({
     vectorIndexConfig: configure.vectorIndex.hnsw({
       quantizer: configure.vectorIndex.quantizer.pq() // Compression
     }),
   }),
 })
}
// END CompressHNSW

//////////////////////////////
/// ENABLE HNSW - MULTIPLE ///
//////////////////////////////

// START EnableMulti
// Add this import line
// import { vectorizer, configure } from 'weaviate-client';

async function createMultiCollection(client: WeaviateClient, collectionName: string){
  await client.collections.create({
    name: collectionName,
    vectorizers: [
      // Define a named vector
      vectorizer.text2VecCohere({
        name: "vectorForFieldOne",
        sourceProperties: ['FieldOne'],
        vectorIndexConfig: configure.vectorIndex.hnsw()
   }),
      // Define another named vector
      vectorizer.text2VecOpenAI({
        name: "vectorForFieldTwo",
        sourceProperties: ['FieldTwo'],
        vectorIndexConfig: configure.vectorIndex.flat()
   })
  ],
  // Configure properties
  })
}
// END EnableMulti

/////////////////
// ENABLE FLAT //
/////////////////

// START EnableFlat
// Add this import line
// import { vectorizer, dataType, configure } from 'weaviate-client';

async function createFlatCollection(client: WeaviateClient, collectionName: string){
  await client.collections.create({
    name: collectionName,
    vectorizers: vectorizer.text2VecOpenAI({
      vectorIndexConfig: configure.vectorIndex.flat(),
        }),
    // Configure properties
    })
}
// END EnableFlat

////////////////////
// CONFIGURE FLAT //
////////////////////

// START ConfigFlat
// Add this import line
// import { vectorizer, dataType, configure } from 'weaviate-client';

async function configureFlatCollection(client: WeaviateClient, collectionName: string){
 await client.collections.create({
   name: collectionName,
   vectorizers: vectorizer.text2VecOpenAI({
     vectorIndexConfig: configure.vectorIndex.flat({
       distanceMetric: 'cosine',
       vectorCacheMaxObjects: 1000000,
       quantizer: configure.vectorIndex.quantizer.bq(),
       }),
     })
   // Configure properties
   })
}
// END ConfigFlat

////////////////////
// COMPRESS FLAT //
///////////////////

// START CompressFlat
// Add this import line
// import { vectorizer, dataType, configure } from 'weaviate-client';

async function compressFlatCollection(client: WeaviateClient, collectionName: string){
 await client.collections.create({
   name: collectionName,
   vectorizers: vectorizer.text2VecOpenAI({
     vectorIndexConfig: configure.vectorIndex.flat({
       quantizer: configure.vectorIndex.quantizer.bq({
         rescoreLimit: 200,
         cache: true
         }),
       }),
     })
   // Configure properties
   })
}
// END CompressFlat

/////////////////////////////
/// AVOID TOP LEVEL AWAIT ///
/////////////////////////////

// Main
async function main(){
  const collectionName = "ConfigCollection";

  const client = await getClient();

  // Clean up from earlier runs
  deleteCollection(client, collectionName)

  // Only safe to run one at a time due to async code

  // // Run enable HNSW collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   createHNSWCollection(client, collectionName);
  // }

  // // Run configure HNSW collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   configureHNSWCollection(client, collectionName);
  // }

  // Run compress HNSW collection code
  deleteCollection(client, collectionName)
  if(await client.collections.get(collectionName).exists() != true){
    compressHNSWCollection(client, collectionName);
  }

  // // Run multiple named vector collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   createMultiCollection(client, collectionName);
  // }

  // // Run enable Flat collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   createFlatCollection(client, collectionName);
  // }

  // // Run configure Flat collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   configureFlatCollection(client, collectionName);
  // }

  // // Run compress Flat collection code
  // deleteCollection(client, collectionName)
  // if(await client.collections.get(collectionName).exists() != true){
  //   compressFlatCollection(client, collectionName);
  // }

}

main()
