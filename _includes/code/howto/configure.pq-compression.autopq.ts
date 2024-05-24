import assert from 'assert';
import weaviate, { BQConfig, PQConfig, VectorIndexConfigHNSW } from 'weaviate-client';
// START CollectionWithAutoPQ
import { configure } from 'weaviate-client';

// END CollectionWithAutoPQ
const client = await weaviate.connectToLocal();

const collectionName = 'YourCollection';

// Prep
await client.collections.delete(collectionName);

// START CollectionWithAutoPQ
const collection = await client.collections.create({
  name: collectionName,
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI('default', {
    vectorIndexConfig: weaviate.configure.vectorIndex.hnsw({
      quantizer: weaviate.configure.vectorIndex.quantizer.pq({
        trainingLimit: 50000,     
      }),
    })
  })
})
// END CollectionWithAutoPQ

let collectionConfig = await collection.config.get();

assert.equal((collectionConfig.vectorizer.default.indexConfig as VectorIndexConfigHNSW).quantizer.type, "pq")
assert.equal(((collectionConfig.vectorizer.default.indexConfig as VectorIndexConfigHNSW).quantizer as PQConfig).trainingLimit, 50000)

// Clean-up
await client.collections.delete(collectionName);

client.close();
