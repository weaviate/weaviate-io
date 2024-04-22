import assert from 'assert';
// START-ANY
import weaviate from 'weaviate-client';

const client = await weaviate.connectToLocal();

const collectionName = 'YourCollection';

// END-ANY

// Prep
await client.collections.delete(collectionName);

// START InitClassDef  // START UpdateSchema  // START ViewConfig
let collection;
// START InitClassDef  // END UpdateSchema  // END ViewConfig
collection = await client.collections.create({
  name: collectionName,
  vectorizer: [
    weaviate.configure.namedVectorizer(
      "default",
      {
        properties: ["title"],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecOpenAI(),
      }
    )
  ]
})
// END InitClassDef

let collectionConfig = await collection.config.get();

console.log(JSON.stringify(collectionConfig))

assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer, undefined)

// START UpdateSchema  // START ViewConfig
collection = client.collections.get(collectionName);
// START UpdateSchema  // END ViewConfig

await collection.config.update({
  vectorizer: [
    weaviate.reconfigure.namedVectorizer(
      "default",
      {
        vectorIndexConfig: weaviate.reconfigure.vectorIndex.hnsw({
          quantizer: weaviate.reconfigure.vectorIndex.quantizer.pq({
            trainingLimit: 50000
          })
        })
      }
    )
  ]
})
// END UpdateSchema

// START ViewConfig
collectionConfig = await collection.config.get();
// END ViewConfig

console.log(JSON.stringify(collectionConfig))

// START ViewConfig

console.log(collectionConfig.vectorizer['default'].indexConfig.quantizer)
// END ViewConfig

assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer.type, "pq")
assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer.trainingLimit, 50000)

// Clean-up
await client.collections.delete(collectionName);

client.close();
