import assert from 'assert';
import weaviate from 'weaviate-client';
// START-ANY
import { configure } from 'weaviate-client';

// END-ANY
const client = await weaviate.connectToLocal();

const collectionName = 'MyCollection';

// Prep
await client.collections.delete(collectionName);

// START SQWithOptions
const collection = await client.collections.create({
  name: 'MyCollection',
  vectorizers: configure.vectorizer.text2VecOpenAI({
    vectorIndexConfig: weaviate.configure.vectorIndex.hnsw({
      quantizer: weaviate.configure.vectorIndex.quantizer.sq({
        rescoreLimit: 200, // The minimum number of candidates to fetch before rescoring
      }),
      vectorCacheMaxObjects: 10000 
    })
  })
})
// END SQWithOptions

const collectionConfig = await collection.config.get();

assert.equal(collectionConfig.vectorizers.default.indexConfig.type, "SQ")

// Clean-up
await client.collections.delete(collectionName);

client.close();

