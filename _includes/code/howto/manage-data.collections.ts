// How-to: Manage-data -> Classes - TypeScript examples
// run with: node --loader=ts-node/esm FILENAME.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate, { WeaviateClient, vectorIndex } from 'weaviate-client';
import { vectorizer, generative, dataType, tokenization, configure, reconfigure, vectorDistances } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
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
{
// START BasicCreateCollection
const newCollection = await client.collections.create({
  name: 'Article'
})

// The returned value is the full collection definition, showing all defaults
console.log(JSON.stringify(newCollection, null, 2));
// END BasicCreateCollection

// Test
// (client.collections.get('ArticleNV').config.get()).vectorizer.body.vectorizer
result = client.collections.get(collectionName).config.get()

console.assert('replication' in result);
}
// ====================================
// ===== CREATE A CLASS WITH PROPERTIES
// ====================================

// Clean slate
try {
  await client.collections.delete(collectionName)
} catch (e) {
  // ignore error if class doesn't exist
}

/*
// START CreateCollectionWithProperties
import { dataType } from 'weaviate-client';

// END CreateCollectionWithProperties
*/

// START CreateCollectionWithProperties
await client.collections.create({
  name: 'Article',
  properties: [
    {
      name: 'title',
      dataType: dataType.TEXT,
    },
    {
      name: 'body',
      dataType: dataType.TEXT,
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

/*
// START BasicNamedVectors
import { vectorizer, dataType } from 'weaviate-client';

// END BasicNamedVectors
*/

// START BasicNamedVectors
await client.collections.create({
  name: 'ArticleNV',

  // highlight-start
  vectorizers: [
    vectorizer.text2VecCohere({
      name: 'title',
      sourceProperties: ['title']
    }),
    vectorizer.text2VecOpenAI({
      name: 'body',
      sourceProperties: ['body'],
    }),
    vectorizer.text2VecOpenAI({
      name: 'title_country',
      sourceProperties: ['title','country'],
    })
  ],
  // highlight-end

  properties: [
    { name: 'title', dataType: dataType.TEXT },
    { name: 'body', dataType: dataType.TEXT },
    { name: 'country', dataType: dataType.TEXT },
  ],
})
// END BasicNamedVectors

// Test
result = client.collections.get(collectionName).config.get()

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

/*
// START Vectorizer
import { vectorizer, dataType } from 'weaviate-client';

// END Vectorizer
*/

// START Vectorizer
await client.collections.create({
  name: 'Article',
  // highlight-start
  vectorizers: vectorizer.text2VecOpenAI(),
  // highlight-end
  properties: [
    { name: 'title', dataType: dataType.TEXT },
    { name: 'body', dataType: dataType.TEXT },
  ],
})
// END Vectorizer

// Test
result = client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.vectorizer.name, 'text2vec-openai');
assert.equal(result.properties.length, 2); 

// Delete the class to recreate it
await client.collections.delete('Article')

// ===========================
// ===== SetVectorIndexType =====
// ===========================

/*
// START SetVectorIndexType
import { vectorizer, dataType, configure } from 'weaviate-client';

// END SetVectorIndexType
*/

// START SetVectorIndexType
await client.collections.create({
  name: 'Article',
  vectorizers: vectorizer.text2VecOpenAI({
    // highlight-start
    vectorIndexConfig: configure.vectorIndex.hnsw(),
    // highlight-end
  }),
  properties: [
    { name: 'title', dataType: dataType.TEXT },
    { name: 'body', dataType: dataType.TEXT },
  ],
})
// END SetVectorIndexType

// Test
result = client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.vectorizer.name, 'text2vec-openai');
assert.equal(result.vectorIndexType, 'hnsw');
assert.equal(result.properties.length, 2);

// Delete the class to recreate it
await client.collections.delete(collectionName)

// ===========================
// ===== SetVectorIndexParams =====
// ===========================

/*
// START SetVectorIndexParams
import { configure, vectorizer } from 'weaviate-client';

// END SetVectorIndexParams
*/

// START SetVectorIndexParams
await client.collections.create({
  name: 'Article',
  // Additional configuration not shown
  vectorizers: vectorizer.text2VecCohere({
    // highlight-start
    vectorIndexConfig: configure.vectorIndex.flat({
      quantizer: configure.vectorIndex.quantizer.bq({
        rescoreLimit: 200,
        cache: true
      }),
      vectorCacheMaxObjects: 100000
    })
    // highlight-end
  })
})
// END SetVectorIndexParams

// Test
result = client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.vectorizer.name, 'text2vec-openai');
assert.equal(result.vectorIndexType, 'flat');
assert.equal(result.properties.length, 2);

// Delete the class to recreate it
await client.collections.delete(collectionName)

// ===========================
// ===== MODULE SETTINGS =====
// ===========================

/*
// START ModuleSettings
import { vectorizer } from 'weaviate-client';

// END ModuleSettings
*/


// START ModuleSettings
await client.collections.create({
  name: 'Article',
  // highlight-start
  vectorizers: vectorizer.text2VecCohere({
    model: 'embed-multilingual-v2.0',
    vectorizeCollectionName: true,
  }),
  // highlight-end
})
// END ModuleSettings

// Test
result = client.collections.get(collectionName).config.get()

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

/*
// START PropModuleSettings
import { vectorizer, dataType, tokenization } from 'weaviate-client';

// END PropModuleSettings
*/
{
// START PropModuleSettings
const newCollection = await client.collections.create({
  name: 'Article',
  vectorizers: vectorizer.text2VecHuggingFace(),
  properties: [
    {
      name: 'title',
      dataType: dataType.TEXT,
      // highlight-start
      vectorizePropertyName: true,
      tokenization: tokenization.LOWERCASE // or 'lowercase'
      // highlight-end
    },
    {
      name: 'body',
      dataType: dataType.TEXT,
      // highlight-start
      skipVectorization: true,
      tokenization: tokenization.WHITESPACE // or 'whitespace'
      // highlight-end
    },
  ],
})
// END PropModuleSettings

// Test vectorizeCollectionName
result = client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.vectorizer.name, 'text2vec-cohere');
assert.equal(
  result.vectorizer.default.vectorizer.config.vectorizeCollectionName,
  'true'
);

// Delete the class to recreate it
await client.collections.delete(collectionName)
}

// ===========================
// ===== DISTANCE METRIC =====
// ===========================

/*
// START DistanceMetric
import { configure, vectorizer, vectorDistances } from 'weaviate-client';

// END DistanceMetric
*/

// START DistanceMetric
await client.collections.create({
  name: 'Article',
  vectorizers: vectorizer.text2VecOllama({
    // highlight-start
    vectorIndexConfig: configure.vectorIndex.hnsw({
      distanceMetric: vectorDistances.COSINE // or 'cosine'
    })
    // highlight-end
  })
})
// END DistanceMetric

// Test
result = client.collections.get(collectionName).config.get()

assert.equal(result.vectorizer.default.indexConfig.distance, 'cosine');

// Delete the class to recreate it
await client.collections.delete(collectionName)

// ===================================================================
// ===== CREATE A COLLECTION WITH CUSTOM INVERTED INDEX SETTINGS =====
// ===================================================================

/*
// START SetInvertedIndexParams
import { dataType } from 'weaviate-client';

// END SetInvertedIndexParams
*/

// START SetInvertedIndexParams
await client.collections.create({
  name: 'Article',
  properties: [
    {
      name: 'title',
      dataType: dataType.TEXT,
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

/*
// START SetGenerative
import { vectorizer, generative } from 'weaviate-client';

// END SetGenerative
*/

// START SetGenerative
await client.collections.create({
  name: 'Article',
  vectorizers: vectorizer.text2VecOpenAI(),
  // highlight-start
  generative: generative.openAI(),
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

/*
// START SetGenModel
import { vectorizer, generative } from 'weaviate-client';

// END SetGenModel
*/

// START SetGenModel
await client.collections.create({
  name: 'Article',
  vectorizers: vectorizer.text2VecOpenAI(),
  // highlight-start
  generative: generative.openAI({
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

/*
// START ReplicationSettings
import { configure } from 'weaviate-client';

// END ReplicationSettings
*/

// START ReplicationSettings
await client.collections.create({
  name: 'Article',
  // highlight-start
  replication: configure.replication({
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

/*
// START ShardingSettings
import { configure } from 'weaviate-client';

// END ShardingSettings
*/

// START ShardingSettings
await client.collections.create({
  name: 'Article',
  // highlight-start
  sharding: configure.sharding({
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
await client.collections.create({
  name: 'Article',
  // highlight-start
  multiTenancy: { enabled: true }
  // multiTenancy: configure.multiTenancy({ enabled: true }) // alternatively use helper function
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

/*
// START ModifyParam
import { reconfigure } from 'weaviate-client';

// END ModifyParam
*/

// START ModifyParam
// highlight-start
articles.config.update({
  invertedIndex: reconfigure.invertedIndex({
    stopwordsRemovals: ['a', 'the'],
  })
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


/*
// START UpdateCollection
import { reconfigure } from 'weaviate-client';

// END UpdateCollection
*/

// START UpdateCollection
// highlight-start
articles.config.update({
  invertedIndex: reconfigure.invertedIndex({ 
    bm25k1: 1.5
  })
})
// highlight-end
// END UpdateCollection
