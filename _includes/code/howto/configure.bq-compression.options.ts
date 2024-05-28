import assert from 'assert';
import weaviate from 'weaviate-client';
// START-ANY
import { configure } from 'weaviate-client';

// END-ANY
const client = await weaviate.connectToLocal();

const collectionName = 'MyCollection';

// Prep
await client.collections.delete(collectionName);

// START BQWithOptions
const collection = await client.collections.create({
  name: collectionName,
  vectorizers: weaviate.configure.vectorizer.none('default', {
    vectorIndexConfig: weaviate.configure.vectorIndex.hnsw({
      quantizer: weaviate.configure.vectorIndex.quantizer.bq({
        cache: true,     // Enable caching
        rescoreLimit: 200, // The minimum number of candidates to fetch before rescoring
      }),
      vectorCacheMaxObjects: 10000 // Cache size (used if `cache` enabled)
    })
  })
})
// END BQWithOptions

let collectionConfig = await collection.config.get();

assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer.type, "bq")

// Clean-up
await client.collections.delete(collectionName);

client.close();
