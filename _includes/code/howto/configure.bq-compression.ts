import assert from 'assert';
import weaviate from 'weaviate-client';
// START-ANY
import { configure } from 'weaviate-client';

// END-ANY

const client = await weaviate.connectToLocal();

const collectionName = 'MyCollection';

// Prep
await client.collections.delete(collectionName);

// START EnableBQ
const collection = await client.collections.create({
  name: collectionName,
  vectorizers: weaviate.configure.vectorizer.none('default', {
    name: '',
    vectorIndexConfig: weaviate.configure.vectorIndex.hnsw({
      quantizer: weaviate.configure.vectorIndex.quantizer.bq(),
    })
  })
  // vectorizer: [
  //   configure.namedVectorizer(
  //     "default",
  //     {
  //       vectorIndexConfig: configure.vectorIndex.hnsw({
  //         quantizer: configure.vectorIndex.quantizer.bq()
  //       })
  //     }
  //   )
  // ]
})
// END EnableBQ

let collectionConfig = await collection.config.get();

assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer.type, "bq")

// Clean-up
await client.collections.delete(collectionName);

client.close();
