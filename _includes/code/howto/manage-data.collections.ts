// How-to: Manage-data -> Classes - TypeScript examples
// run with: node --loader=ts-node/esm FILENAME.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-client';

const client = await weaviate.connectToWCS(
  'some-endpoint.weaviate.network',
 {
   authCredentials: new weaviate.ApiKey('api-key'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)

// START BasicCreateCollection  // START ReadOneCollection  // START UpdateCollection
// END BasicCreateCollection  // END ReadOneCollection  // END UpdateCollection

// ================================
// ===== CREATE A CLASS =====
// ================================

// Clean slate
try {
  await client.schema.classDeleter().withClassName(className).do();
} catch (e) {
  // ignore error if class doesn't exist
}

// START BasicCreateCollection
const newCollection = await client.collections.create({
  name: 'Article'
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(newCollection, null, 2));
// END BasicCreateCollection

// Test
console.assert('invertedIndexConfig' in result);

// ====================================
// ===== CREATE A CLASS WITH PROPERTIES
// ====================================

// Clean slate
try {
  await client.schema.classDeleter().withClassName(className).do();
} catch (e) {
  // ignore error if class doesn't exist
}

// START CreateCollectionWithProperties
const newCollection = await client.collections.create({
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
      skipVectorisation: true
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
const collectionDefinition = await client.collections.get('Article')
console.log(await collectionDefinition.config.get())  
// END ReadOneCollection

// ==================================================
// ===== CREATE A COLLECTION WITH NAMED VECTORS =====
// ==================================================

// START BasicNamedVectors
const newCollection = await client.collections.create({
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
  vectorizer: [
    weaviate.configure.namedVectorizer('title', {
      properties: ['title'],
      vectorizerConfig: weaviate.configure.vectorizer.text2VecOpenAI(),
      vectorIndexConfig: weaviate.configure.vectorIndex.hnsw()
    }),
    weaviate.configure.namedVectorizer('body', {
      properties: ['body'],
      vectorizerConfig: weaviate.configure.vectorizer.text2VecCohere(),
      vectorIndexConfig: weaviate.configure.vectorIndex.hnsw(),
 })],
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(newCollection, null, 2));
// END BasicNamedVectors

// Test
assert.equal(
  result['vectorConfig']['title']['vectorizer']['text2vec-cohere'][
    'properties'
  ][0],
  'title'
);
assert.equal(
  result['vectorConfig']['body']['vectorizer']['text2vec-openai'][
    'properties'
  ][0],
  'body'
);

// Delete the class to recreate it
await client.collections.delete('ArticleNV')

// ===============================================
// ===== CREATE A COLLECTION WITH VECTORIZER =====
// ===============================================

// START Vectorizer
const newCollection = await client.collections.create({
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
      skipVectorisation: true
    },
  ],
  // highlight-start
  vectorizer: weaviate.configure.vectorizer.text2VecHuggingFace(),
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(newCollection, null, 2));
// END Vectorizer

// Test
assert.equal(result['vectorizer'], 'text2vec-openai');
assert.equal(result['properties'].length, 1); // no 'body' from the previous example

// Delete the class to recreate it
await client.collections.delete('Article')

// ===========================
// ===== SetVectorIndex =====
// ===========================

// START SetVectorIndex
const newCollection = await client.collections.create({
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
  vectorizer: weaviate.configure.vectorizer.text2VecOpenAI(),
  // highlight-start
  vectorIndex: weaviate.configure.vectorIndex.hnsw()
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));

// END SetVectorIndex

// Test
assert.equal(result['vectorizer'], 'text2vec-openai');
assert.equal(result['vectorIndexType'], 'flat');
assert.equal(result['properties'].length, 1); // no 'body' from the previous example

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();

// ===========================
// ===== MODULE SETTINGS =====
// ===========================

// START ModuleSettings
const newCollection = await client.collections.create({
  name: 'Article',
  // highlight-start
  vectorizer: weaviate.configure.vectorizer.text2VecCohere({
    model: 'embed-multilingual-v2.0',
    vectorizeClassName: true,
  }),
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));
// END ModuleSettings

// Test
assert.equal(result.vectorizer, 'text2vec-cohere');
assert.equal(
  result.moduleConfig['text2vec-cohere']['model'],
  'embed-multilingual-v2.0'
);

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();

// ====================================
// ===== MODULE SETTINGS PROPERTY =====
// ====================================

// START PropModuleSettings
const newCollection = await client.collections.create({
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
      skipVectorisation: true,
      tokenization: 'whitespace'
    },],
  vectorizer: weaviate.configure.vectorizer.text2VecHuggingFace(),
})
// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(newCollection, null, 2));
// END PropModuleSettings

// Test
assert.equal(result.vectorizer, 'text2vec-huggingface');
assert.equal(
  result.properties[0].moduleConfig['text2vec-huggingface'][
    'vectorizePropertyName'
  ],
  false
);

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();

// ===========================
// ===== DISTANCE METRIC =====
// ===========================

// START DistanceMetric
const newCollection = await client.collections.create({
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
assert.equal(result.vectorIndexConfig.distance, 'cosine');

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();

// ===============================================
// ===== CREATE A COLLECTION WITH A GENERATIVE MODULE =====
// ===============================================

// START SetGenerative
const newCollection = await client.collections.create({
  name: 'Article',
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
  ],
  // highlight-start
  vectorizer: weaviate.configure.vectorizer.text2VecOpenAI(),
  // highlight-end
})
// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(await newCollection.config.get(), null, 2));
// END SetGenerative

// Test
Object.keys(result['moduleConfig']).includes('generative-openai');

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();

// =======================
// ===== REPLICATION =====
// =======================

// START ReplicationSettings
const newCollection = await client.collections.create({
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
const newCollection = await client.collections.create({
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
const newCollection = await client.collections.create({
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
  await client.schema.classDeleter().withClassName(className).do();
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
