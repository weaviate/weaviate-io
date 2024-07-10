import assert from 'assert';
import weaviate from 'weaviate-client';

const client = await weaviate.connectToLocal();

const collectionName = 'MyCollection';

// Prep
await client.collections.delete(collectionName);
{
// START InitClassDef
const collection = await client.collections.create({
  name: 'Question',
  vectorizer: weaviate.configure.vectorizer.text2VecOpenAI({
    sourceProperties: ["title"],
  })
})
// END InitClassDef

let collectionConfig = await collection.config.get();

console.log(JSON.stringify(collectionConfig))

assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer, undefined)
}

{
// START UpdateSchema  // START ViewConfig
const collection = client.collections.get(collectionName);
// START UpdateSchema  // END ViewConfig

await collection.config.update({
  vectorizers: weaviate.reconfigure.vectorizer.update({
    vectorIndexConfig: weaviate.reconfigure.vectorIndex.hnsw({
      quantizer: weaviate.reconfigure.vectorIndex.quantizer.pq({
        trainingLimit: 50000
      })
    })
  })
})
// END UpdateSchema

// START ViewConfig
let collectionConfig = await collection.config.get();
// END ViewConfig

console.log(JSON.stringify(collectionConfig))

// START ViewConfig

console.log(collectionConfig.vectorizer['default'].indexConfig.quantizer)
// END ViewConfig

assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer.type, "pq")
assert.equal(collectionConfig.vectorizer.default.indexConfig.quantizer.trainingLimit, 50000)
}

// Clean-up
await client.collections.delete(collectionName);

client.close();
