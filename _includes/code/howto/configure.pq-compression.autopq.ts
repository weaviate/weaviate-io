import assert from 'assert';
import weaviate from 'weaviate-client';
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
  vectorizer: [
    configure.namedVectorizer(
      "default",
      {
        properties: ["title"],
        vectorizerConfig: configure.vectorizer.text2VecOpenAI(),
        vectorIndexConfig: configure.vectorIndex.hnsw({
          quantizer: configure.vectorIndex.quantizer.pq({
            trainingLimit: 50000
          })
        })
      }
    )
  ]
})
// END CollectionWithAutoPQ

let collectionConfig = await collection.config.get();

assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer.type, "pq")
assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer.trainingLimit, 50000)

// Clean-up
await client.collections.delete(collectionName);

client.close();
