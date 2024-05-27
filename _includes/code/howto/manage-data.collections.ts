// How-to: Manage-data -> Classes - TypeScript examples
// run with: node --loader=ts-node/esm FILENAME.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCD(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 } 
)

const collectionName = 'Article'
let result

// START BasicCreateCollection   // START UpdateCollection
let newCollection;
// END BasicCreateCollection   // END UpdateCollection

// ================================
// ===== CREATE A CLASS =====
// ================================

// Clean slate
try {
  await client.collections.delete(collectionName)

} catch (e) {
  // ignore error if class doesn't exist
}

// START BasicCreateCollection
newCollection = await client.collections.create({
  name: 'Article'
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(newCollection, null, 2));
// END BasicCreateCollection

// Test
// (await client.collections.get('ArticleNV').config.get()).vectorizer.body.vectorizer
result = await client.collections.get(collectionName).config.get()

console.assert('replication' in result);

// ====================================
// ===== CREATE A CLASS WITH PROPERTIES
// ====================================

// Clean slate
try {
  await client.collections.delete(collectionName)
} catch (e) {
  // ignore error if class doesn't exist
}

// START CreateCollectionWithProperties
newCollection = await client.collections.create({
  name: 'Article',
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
      vectorizePropertyName: true,
      tokenization: 'lowercase' ,
    },
    {
      name: 'body',
      dataType: weaviate.configure.dataType.TEXT,
      tokenization: 'whitespace',
      skipVectorization: true
    },
  ],
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(newCollection, null, 2));
// END CreateCollectionWithProperties

// ================================
// ===== READ A CLASS =====
// ================================

// START ReadOneCollection
const collection = client.collections.get('Article')
console.log(await collection.config.get())
// END ReadOneCollection

// ==================================================
// ===== CREATE A COLLECTION WITH NAMED VECTORS =====
// ==================================================

// START BasicNamedVectors
newCollection = await client.collections.create({
  name: 'ArticleNV',
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
    {
      name: 'body',
      dataType: weaviate.configure.dataType.TEXT,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecOpenAI('title',{
      vectorIndexConfig: weaviate.configure.vectorIndex.hnsw(),
      sourceProperties: ['title']
    }),
    weaviate.configure.vectorizer.text2VecCohere('body',{
      vectorIndexConfig: weaviate.configure.vectorIndex.hnsw(),
      sourceProperties: ['body'],
    }),
    weaviate.configure.vectorizer.text2VecOpenAI('title_country',{
      vectorIndexConfig: weaviate.configure.vectorIndex.hnsw(),
      sourceProperties: ['title','country'],
    })
  ],
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(newCollection, null, 2));
// END BasicNamedVectors

// Test
result = await client.collections.get(collectionName).config.get()

assert.equal(
  result.vectorizer.title.properties,
  'title'
);
assert.equal(
  result.vectorizer.body.properties,
  'body'
);

// Delete the class to recreate it
await client.collections.delete('ArticleNV')

// ===============================================
// ===== CREATE A COLLECTION WITH VECTORIZER =====
// ===============================================

// START Vectorizer
newCollection = await client.collections.create({
  name: 'Article',
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
      vectorizePropertyName: true,
      tokenization: 'lowercase' as const ,
    },
    {
      name: 'body',
      dataType: weaviate.configure.dataType.TEXT,
      tokenization: 'whitespace' as const,
      skipVectorization: true
    },
  ],
  // highlight-start
  vectorizers: weaviate.configure.vectorizer.text2VecCohere('default'),
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(newCollection, null, 2));
// END Vectorizer

// Test
result = await client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.vectorizer.name, 'text2vec-cohere');
assert.equal(result.properties.length, 2); 

// Delete the class to recreate it
await client.collections.delete('Article')

// ===========================
// ===== SetVectorIndexType =====
// ===========================

// START SetVectorIndexType
newCollection = await client.collections.create({
  name: 'Article',
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
    {
      name: 'body',
      dataType: weaviate.configure.dataType.TEXT,
    },
  ],
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI('default'),
  // highlight-start
  vectorIndex: weaviate.configure.vectorIndex.hnsw()
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));

// END SetVectorIndexType

// Test
result = await client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.vectorizer.name, 'text2vec-openai');
assert.equal(result.vectorIndexType, 'hnsw');
assert.equal(result.properties.length, 2);

// Delete the class to recreate it
await client.collections.delete(collectionName)

// ===========================
// ===== SetVectorIndexParams =====
// ===========================

// START SetVectorIndexParams
newCollection = await client.collections.create({
  name: 'Article',
  // Additional configuration not shown
  // highlight-start
  vectorIndex: weaviate.configure.vectorIndex.flat({
    quantizer: weaviate.configure.vectorIndex.quantizer.bq({
      rescoreLimit: 200,
      cache: true
    }),
    vectorCacheMaxObjects: 100000
  })
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));

// END SetVectorIndexParams

// Test
result = await client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.vectorizer.name, 'text2vec-openai');
assert.equal(result.vectorIndexType, 'flat');
assert.equal(result.properties.length, 2);

// Delete the class to recreate it
await client.collections.delete(collectionName)


// ===========================
// ===== MODULE SETTINGS =====
// ===========================

// START ModuleSettings
newCollection = await client.collections.create({
  name: 'Article',
  // highlight-start
  vectorizers: weaviate.configure.vectorizer.text2VecCohere('default', {
    model: 'embed-multilingual-v2.0',
    vectorizeCollectionName: true,
  }),
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));
// END ModuleSettings

// Test
result = await client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.vectorizer.name, 'text2vec-cohere');
assert.equal(
  result.vectorizer.default.vectorizer.config.model,
  'embed-multilingual-v2.0'
);



// Delete the class to recreate it
await client.collections.delete(collectionName)

// ====================================
// ===== MODULE SETTINGS PROPERTY =====
// ====================================

// START PropModuleSettings
newCollection = await client.collections.create({
  name: 'Article',
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
      vectorizePropertyName: true,
      tokenization: 'lowercase'
    },
    {
      name: 'body',
      dataType: weaviate.configure.dataType.TEXT,
      skipVectorization: true,
      tokenization: 'whitespace'
    },],
  vectorizers: weaviate.configure.vectorizer.text2VecCohere('default'),
})
// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(newCollection, null, 2));
// END PropModuleSettings

// Test vectorizeCollectionName
result = await client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.vectorizer.name, 'text2vec-cohere');
assert.equal(
  result.vectorizer.default.vectorizer.config.vectorizeCollectionName,
  'true'
);

// Delete the class to recreate it
await client.collections.delete(collectionName)

// ===========================
// ===== DISTANCE METRIC =====
// ===========================

// START DistanceMetric
newCollection = await client.collections.create({
  name: 'Article',
  // highlight-start
  vectorIndex: weaviate.configure.vectorIndex.hnsw({
    distanceMetric: 'cosine'
  })
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));

// END DistanceMetric

// Test
result = await client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.indexConfig.distance, 'cosine');

// Delete the class to recreate it
await client.collections.delete(collectionName)

// ===================================================================
// ===== CREATE A COLLECTION WITH CUSTOM INVERTED INDEX SETTINGS =====
// ===================================================================

// START SetInvertedIndexParams
newCollection = await client.collections.create({
  name: 'Article',
  properties: [
    {
      name: 'body',
      dataType: weaviate.configure.dataType.TEXT,
      // highlight-start
      indexFilterable: true,
      indexSearchable: true,
      // highlight-end
    },
  ],
  // highlight-start
  invertedIndex: {
    bm25: {
      b: 0.7,
      k1: 1.25
    },
    indexNullState: true,
    indexPropertyLength: true,
    indexTimestamps: true
  }
  // highlight-end
})

console.log(JSON.stringify(newCollection, null, 2));
// END SetInvertedIndexParams

// Test
assert.equal(result.vectorizer, 'text2vec-huggingface');
assert.equal(
  result.properties[0].moduleConfig['text2vec-huggingface'][
    'vectorizePropertyName'
  ],
  false
);

// Delete the class to recreate it
await client.collections.delete(collectionName)


// ===============================================
// ===== CREATE A COLLECTION WITH A GENERATIVE MODULE =====
// ===============================================

// START SetGenerative
newCollection = await client.collections.create({
  name: 'Article',
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
  ],
  // highlight-start
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI(),
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));
// END SetGenerative

// Test
Object.keys(result['moduleConfig']).includes('generative-openai');

// Delete the class to recreate it
await client.collections.delete(collectionName)

// =======================
// ===== REPLICATION =====
// =======================

// START ReplicationSettings
newCollection = await client.collections.create({
  name: 'Article',
  // highlight-start
  replication: weaviate.configure.replication({
    factor: 3
  }),
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));

// END ReplicationSettings

// Test
assert.equal(result.replicationConfig.factor, 3);

// ====================
// ===== SHARDING =====
// ====================

// START ShardingSettings
newCollection = await client.collections.create({
  name: 'Article',
  // highlight-start
  sharding: weaviate.configure.sharding({
    virtualPerPhysical: 128,
    desiredCount: 1,
    actualCount: 1,
    desiredVirtualCount: 128,
    actualVirtualCount: 128
  })
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));

// END ShardingSettings

// Test
assert.equal(result.shardingConfig.virtual_per_physical, 128);
assert.equal(result.shardingConfig.desired_count, 1);
assert.equal(result.shardingConfig.actual_count, 1);
assert.equal(result.shardingConfig.desired_virtual_count, 128);
assert.equal(result.shardingConfig.actual_virtual_count, 128);

// =========================
// ===== MULTI-TENANCY =====
// =========================

// START Multi-tenancy
newCollection = await client.collections.create({
  name: 'Article',
  // highlight-start
  multiTenancy: weaviate.configure.multiTenancy({
    enabled: true,
  })
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));

// END Multi-tenancy

// ==========================
// ===== ADD A PROPERTY =====
// ==========================

// START AddProp
const prop = {
  name: 'body',
  dataType: ['text'],
};

const resultProp = await client.schema
  .propertyCreator()
  .withClassName('Article')
  .withProperty(prop)
  .do();

// The returned value is full property definition
console.log(JSON.stringify(resultProp, null, 2));
// END AddProp

// Test
assert.equal(resultProp.name, 'body');

// ==============================
// ===== MODIFY A PARAMETER =====
// ==============================

// START ModifyParam
// Not available yet - https://github.com/weaviate/typescript-client/issues/64
// END ModifyParam

// ================================
// ===== READ A CLASS =====
// ================================

// START ReadAllCollections
await client.collections.listAll()
// END ReadAllCollections

// ================================
// ===== UPDATE A CLASS =====
// ================================

// Clean slate
try {
  await client.collections.delete(collectionName)
} catch (e) {
  // ignore error if class doesn't exist
}

// START UpdateCollection
// Define and create a class
const originalClassObj = {
  class: className,
  vectorIndexConfig: {
    distance: 'cosine', // Note the distance metric
  },
};

// Add the class to the schema
let originalClassResponse = await client.schema
  .classCreator()
  .withClass(originalClassObj)
  .do();

const UpdateCollectionObj = {
  class: className,
  vectorIndexConfig: {
    distance: 'dot', // Note the distance metric
  },
};

// Update the class definition
// Not yet available in TS
