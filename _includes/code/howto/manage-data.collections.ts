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

// START UpdateCollection // START ReadOneCollection // START ModifyParam
let articles = client.collections.get('Article')
// END UpdateCollection // END ReadOneCollection // END ModifyParam

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
let newCollection = await client.collections.create({
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
    },
    {
      name: 'body',
      dataType: weaviate.configure.dataType.TEXT,
    },
  ],
})
// END CreateCollectionWithProperties

// ================================
// ===== READ A CLASS =====
// ================================

articles = client.collections.get('Article')
// START ReadOneCollection
// highlight-start
const collectionConfig = await articles.config.get()
// highlight-end
console.log(collectionConfig)
// END ReadOneCollection

// ==================================================
// ===== CREATE A COLLECTION WITH NAMED VECTORS =====
// ==================================================

// START BasicNamedVectors
newCollection = await client.collections.create({
  name: 'ArticleNV',

  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecCohere({
      name: 'title',
      sourceProperties: ['title']
    }),
    weaviate.configure.vectorizer.text2VecOpenAI({
      name: 'body',
      sourceProperties: ['body'],
    }),
    weaviate.configure.vectorizer.text2VecOpenAI({
      name: 'title_country',
      sourceProperties: ['title','country'],
    })
  ],
  // highlight-end

  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
    {
      name: 'body',
      dataType: weaviate.configure.dataType.TEXT,
    },
    {
      name: 'country',
      dataType: weaviate.configure.dataType.TEXT,
    },
  ],
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
  // highlight-start
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI(),
  // highlight-end
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
})
// END Vectorizer

// Test
result = await client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.vectorizer.name, 'text2vec-openai');
assert.equal(result.properties.length, 2); 

// Delete the class to recreate it
await client.collections.delete('Article')

// ===========================
// ===== SetVectorIndexType =====
// ===========================

// START SetVectorIndexType
newCollection = await client.collections.create({
  name: 'Article',
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI(),
  // highlight-start
  vectorIndex: weaviate.configure.vectorIndex.hnsw(),
  // highlight-end
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
})
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
  vectorizers: weaviate.configure.vectorizer.text2VecCohere({
    model: 'embed-multilingual-v2.0',
    vectorizeCollectionName: true,
  }),
  // highlight-end
})
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
  vectorizers: weaviate.configure.vectorizer.text2VecHuggingFace(),
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
      // highlight-start
      vectorizePropertyName: true,
      tokenization: 'lowercase'
      // highlight-end
    },
    {
      name: 'body',
      dataType: weaviate.configure.dataType.TEXT,
      // highlight-start
      skipVectorization: true,
      tokenization: 'whitespace'
      // highlight-end
    }
  ],
})
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
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI(),
  // highlight-start
  generative: weaviate.configure.generative.openAI(),
  // highlight-end
})
// END SetGenerative

// Test
Object.keys(result['moduleConfig']).includes('generative-openai');

// Delete the class to recreate it
await client.collections.delete(collectionName)

// =======================================================================
// ===== CREATE A COLLECTION WITH A GENERATIVE MODULE AND MODEL NAME =====
// =======================================================================

// START SetGenModel
newCollection = await client.collections.create({
  name: 'Article',
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI(),
  // highlight-start
  generative: weaviate.configure.generative.openAI({
    model: "gpt-4"
  }),
  // highlight-end
})
// END SetGenModel

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
    desiredVirtualCount: 128,
  })
  // highlight-end
})
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
// END Multi-tenancy

// ==========================
// ===== ADD A PROPERTY =====
// ==========================

// // START AddProp
// const prop = {
//   name: 'body',
//   dataType: ['text'],
// };

// const resultProp = await client.schema
//   .propertyCreator()
//   .withClassName('Article')
//   .withProperty(prop)
//   .do();

// // The returned value is full property definition
// console.log(JSON.stringify(resultProp, null, 2));
// // END AddProp

// // Test
// assert.equal(resultProp.name, 'body');

// ==============================
// ===== MODIFY A PARAMETER =====
// ==============================

articles = client.collections.get('Article')

// START ModifyParam

// highlight-start
articles.config.update({
  invertedIndex: {
    stopwords: { removals: ['a', 'the'] },
  }
})
// highlight-end
// END ModifyParam

// ================================
// ===== READ A CLASS =====
// ================================

// START ReadAllCollections
const allCollections = await client.collections.listAll()
console.log(JSON.stringify(allCollections, null, 2));
// END ReadAllCollections

// ================================
// ===== UPDATE A COLLECTION =====
// ================================

articles = client.collections.get('Article')

// START UpdateCollection

// highlight-start
articles.config.update({
    invertedIndex: { bm25: { k1: 1.5 } }
})
// highlight-end
// END UpdateCollection
