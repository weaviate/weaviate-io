// not yet supported in client 3.0.8

import assert from 'assert';
import weaviate from 'weaviate-client';
// START-ANY
import { configure } from 'weaviate-client';

// END-ANY

const client = await weaviate.connectToLocal();

const collectionName = 'MyCollection';

// Prep
await client.collections.delete(collectionName);

// START EnableSQ
const collection = await client.collections.create({
  name: 'MyCollection',
  vectorizers: weaviate.configure.vectorizer.none({
    vectorIndexConfig: weaviate.configure.vectorIndex.hnsw({
      quantizer: weaviate.configure.vectorIndex.quantizer.sq(),
    })
  })
})
// END EnableSQ

let collectionConfig = await collection.config.get();

assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer.type, "SQ")

// Clean-up
await client.collections.delete(collectionName);

client.close();


// IMPORT WITH OPTIONS
const client = await weaviate.connectToLocal();

const collectionName = 'MyCollection';

// Prep
await client.collections.delete(collectionName);

// START SQWithOptions
const collection = await client.collections.create({
  name: 'MyCollection',
  vectorizers: weaviate.configure.vectorizer.none({
    vectorIndexConfig: weaviate.configure.vectorIndex.hnsw({
      quantizer: weaviate.configure.vectorIndex.quantizer.sq({
        cache: true,     // Enable caching
        rescoreLimit: 200, // The minimum number of candidates to fetch before rescoring
      }),
      vectorCacheMaxObjects: 10000 // Cache size (used if `cache` enabled)
    })
  })
})
// END SQWithOptions

let collectionConfig = await collection.config.get();

assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer.type, "SQ")

// Clean-up
await client.collections.delete(collectionName);

client.close();
