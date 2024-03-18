// How-to: Manage-data -> Classes - TypeScript examples
// run with: node --loader=ts-node/esm FILENAME.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'anon-endpoint.weaviate.network',
  headers: {
    'X-OpenAI-Api-Key': process.env['OPENAI_API_KEY'],
  },
});

// START BasicCreateCollection  // START ReadOneCollection  // START UpdateCollection
const className = 'Article';

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
const emptyClassDefinition = {
  class: className,
};

// Add the class to the schema
let result = await client.schema
  .classCreator()
  .withClass(emptyClassDefinition)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
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
const classWithProps = {
  class: 'Article',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
    {
      name: 'body',
      dataType: ['text'],
    },
  ],
};

// Add the class to the schema
result = await client.schema.classCreator().withClass(classWithProps).do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END CreateCollectionWithProperties

// ================================
// ===== READ A CLASS =====
// ================================

// START ReadOneCollection
let classDefinition = await client.schema
  .classGetter()
  .withClassName(className)
  .do();

console.log(JSON.stringify(classDefinition, null, 2));
// END ReadOneCollection

// ==================================================
// ===== CREATE A COLLECTION WITH NAMED VECTORS =====
// ==================================================

// START BasicNamedVectors
const classWithNamedVectors = {
  class: 'ArticleNV',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
    {
      name: 'body',
      dataType: ['text'],
    },
  ],
  // highlight-start
  vectorConfig: {
    // Set a named vector
    title: {
      vectorIndexType: 'hnsw', // Set the index type
      vectorizer: {
        'text2vec-cohere': {
          properties: ['title'], // Set the source property(ies)
        },
      },
    },
    // Set another named vector
    body: {
      vectorIndexType: 'hnsw', // Set the index type
      vectorizer: {
        'text2vec-openai': {
          properties: ['body'], // Set the source property(ies)
        },
      },
    },
  },
  // highlight-end
};

// Add the class to the schema
result = await client.schema
  .classCreator()
  .withClass(classWithNamedVectors)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
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
await client.schema.classDeleter().withClassName('ArticleNV').do();

// ===============================================
// ===== CREATE A COLLECTION WITH VECTORIZER =====
// ===============================================

// START Vectorizer
const classWithVectorizer = {
  class: 'Article',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
  ],
  // highlight-start
  vectorizer: 'text2vec-openai', // this could be any vectorizer
  // highlight-end
};

// Add the class to the schema
result = await client.schema.classCreator().withClass(classWithVectorizer).do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END Vectorizer

// Test
assert.equal(result['vectorizer'], 'text2vec-openai');
assert.equal(result['properties'].length, 1); // no 'body' from the previous example

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();

// ===========================
// ===== SetVectorIndex =====
// ===========================

// START SetVectorIndex
const classWithIndexType = {
  class: 'Article',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
  ],
  vectorizer: 'text2vec-openai', // this could be any vectorizer
  // highlight-start
  vectorIndexType: 'flat', // or `hnsw`
  vectorIndexConfig: {
    bq: {
      enabled: true, // Enable BQ compression. Default: False
      rescoreLimit: 200, // The minimum number of candidates to fetch before rescoring. Default: -1 (No limit)
      cache: true, // Enable use of vector cache. Default: False
    },
    vectorCacheMaxObjects: 100000, // Cache size if `cache` enabled. Default: 1000000000000
  },
  // highlight-end
};

// Add the class to the schema
result = await client.schema.classCreator().withClass(classWithIndexType).do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
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
const classWithModuleSettings = {
  class: 'Article',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
  ],
  vectorizer: 'text2vec-cohere', // this could be any vectorizer
  // highlight-start
  moduleConfig: {
    'text2vec-cohere': {
      // this must match the vectorizer used
      vectorizeClassName: true,
      model: 'embed-multilingual-v2.0',
    },
  },
  // highlight-end
};

// Add the class to the schema
result = await client.schema
  .classCreator()
  .withClass(classWithModuleSettings)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
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
const classWithPropModuleSettings = {
  class: 'Article',
  vectorizer: 'text2vec-huggingface', // this could be any vectorizer
  properties: [
    {
      name: 'title',
      dataType: ['text'],
      // highlight-start
      moduleConfig: {
        'text2vec-huggingface': {
          // this must match the vectorizer used
          vectorizePropertyName: true,
          tokenization: 'lowercase', // Use "lowercase" tokenization
        },
      },
      // highlight-end
    },
    {
      name: 'body',
      dataType: ['text'],
      // highlight-start
      moduleConfig: {
        'text2vec-huggingface': {
          // this must match the vectorizer used
          skip: true, // Don't vectorize this property
          tokenization: 'whitespace', // Use "whitespace" tokenization
        },
      },
      // highlight-end
    },
  ],
};

// Add the class to the schema
result = await client.schema
  .classCreator()
  .withClass(classWithPropModuleSettings)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
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
const classWithDistance = {
  class: 'Article',
  // highlight-start
  vectorIndexConfig: {
    distance: 'cosine',
  },
  // highlight-end
};

// Add the class to the schema
result = await client.schema.classCreator().withClass(classWithDistance).do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END DistanceMetric

// Test
assert.equal(result.vectorIndexConfig.distance, 'cosine');

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();

// ===============================================
// ===== CREATE A COLLECTION WITH A GENERATIVE MODULE =====
// ===============================================

// START SetGenerative
const classWithGenerative = {
  class: 'Article',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
  ],
  vectorizer: 'text2vec-openai', // this could be any vectorizer
  // highlight-start
  moduleConfig: {
    'generative-openai': {}, // set your generative module
  },
  // highlight-end
};

// Add the class to the schema
result = await client.schema.classCreator().withClass(classWithGenerative).do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END SetGenerative

// Test
Object.keys(result['moduleConfig']).includes('generative-openai');

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();

// =======================
// ===== REPLICATION =====
// =======================

// START ReplicationSettings
const classWithReplication = {
  class: 'Article',
  // highlight-start
  replicationConfig: {
    factor: 3,
  },
  // highlight-end
};

// Add the class to the schema
result = await client.schema
  .classCreator()
  .withClass(classWithReplication)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END ReplicationSettings

// Test
assert.equal(result.replicationConfig.factor, 3);

// ====================
// ===== SHARDING =====
// ====================

// START ShardingSettings
const classWithSharding = {
  class: 'Article',
  // highlight-start
  vectorIndexConfig: {
    distance: 'cosine',
  },
  shardingConfig: {
    virtualPerPhysical: 128,
    desiredCount: 1,
    actualCount: 1,
    desiredVirtualCount: 128,
    actualVirtualCount: 128,
  },
  // highlight-end
};

// Add the class to the schema
result = await client.schema.classCreator().withClass(classWithSharding).do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
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
await client.schema
  .classCreator()
  .withClass({
    class: 'Article',
    // highlight-start
    multiTenancyConfig: { enabled: true },
    // highlight-end
  })
  .do();
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
let allClassDefinitions = await client.schema.getter().do();

console.log(JSON.stringify(allClassDefinitions, null, 2));
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
