// How-to: Manage data -> Create objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.update.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate, { WeaviateClient, WeaviateNonGenericObject, WeaviateObject, WeaviateObjectType, WeaviateReturn } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCD(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 } 
)

const collectionName = 'JeopardyQuestion';
const wineRewiews = 'WineReviewNV'
let result: WeaviateNonGenericObject;

// add thing below to pages
const myCollection = client.collections.get('JeopardyQuestion')
const reviews = client.collections.get('WineReviewNV')
let uuid;

// ============================
// ===== Define the class =====
// ============================

const collectionDefinition = {
  name: 'JeopardyQuestion',
  description: 'A Jeopardy! question',
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI('default'),
  properties: [
    {
      name: 'question',
      dataType: 'text' as const,
    },
    {
      name: 'answer',
      dataType: 'text' as const,
    },
  ],
};

// Clean slate
try {
  await client.collections.delete(collectionName);
} catch (e) {
  // ignore error if class doesn't exist
} finally {
  await client.collections.create(collectionDefinition);
}


const collectionDefinitionNV = {
  name: 'WineReviewNV',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
    {
      name: 'review_body',
      dataType: 'text' as const,
    },
    {
      name: 'country',
      dataType: 'text' as const,
      skipVectorization: true,
    },
  ],
  vectorizers: [
  weaviate.configure.vectorizer.text2VecOpenAI('title',{
    vectorIndexConfig: weaviate.configure.vectorIndex.hnsw(),
    sourceProperties: ['title']
  }),
  weaviate.configure.vectorizer.text2VecOpenAI('review_body',{
    vectorIndexConfig: weaviate.configure.vectorIndex.hnsw(),
    sourceProperties: ['review_body'],
  }),
  weaviate.configure.vectorizer.text2VecOpenAI('title_country',{
    vectorIndexConfig: weaviate.configure.vectorIndex.hnsw(),
    sourceProperties: ['title','country'],
  })
]
};

// Clean slate
try {
  await client.collections.delete(wineRewiews);
} catch (e) {
  // ignore error if class doesn't exist
} finally {
  await client.collections.create(collectionDefinitionNV);
}

// =========================
// ===== Create object =====
// =========================

// CreateObject START

uuid = await myCollection.data.insert({
  'question': 'This vector DB is OSS & supports automatic property type inference on import',
  // 'answer': 'Weaviate',  // properties can be omitted
  'newProperty': 123,  // will be automatically added as a number property
})

console.log('UUID: ', uuid)
// CreateObject END
// myCollection = client.collections.get(collectionName)

result = await myCollection.query.fetchObjectById(uuid)
console.log('1')
// result = await client.data.getterById().withClassName(className).withId(result.id).do();
assert.equal(result.properties['newProperty'], 123);

// =======================================
// ===== Create object with a vector =====
// =======================================

// CreateObjectWithVector START
// myCollection = client.collections.get('JeopardyQuestion')

uuid = await myCollection.data.insert({
  properties: {
  'question': 'This vector DB is OSS & supports automatic property type inference on import',
  // 'answer': 'Weaviate',  // properties can be omitted
  'newProperty': 123,  // will be automatically added as a number property
  },
  vectors: Array(1536).fill(0.12345)
})

console.log('UUID: ', uuid)
// CreateObjectWithVector END


// =======================================
// ===== Create object with named vectors =====
// =======================================

// CreateObjectNamedVectors START

uuid = await reviews.data.insert({
  properties: {
    "title": "A delicious Riesling",
    "review_body": "This wine is a delicious Riesling which pairs well with seafood.",
    "country": "Germany",
  },
  // highlight-start
  vectors: {
    title: Array(1536).fill(0.12345),
    review_body: Array(1536).fill(0.31313),
    title_country: Array(1536).fill(0.05050),
  }
  // highlight-end
})

console.log('UUID: ', uuid)
// CreateObjectNamedVectors END


// ===============================================
// ===== Create object with deterministic id =====
// ===============================================

// CreateObjectWithDeterministicId START
// highlight-start
import { generateUuid5 } from 'weaviate-client';  
// highlight-end

// myCollection = client.collections.get('WineReviewNV')
const dataObject = {
  "title": "A delicious Riesling",
  "review_body": "This wine is a delicious Riesling which pairs well with seafood.",
  "country": "Germany",
}

uuid = await reviews.data.insert({
  properties: dataObject,
  // highlight-start
  id: generateUuid5(dataObject.title)
  // highlight-end
})

console.log('UUID: ', uuid)
// CreateObjectWithDeterministicId END

// myCollection = client.collections.get(wineRewiews)

result = await reviews.query.fetchObjectById(uuid)
assert.equal(result.uuid, generateUuid5(dataObject.title));

// ============================================
// ===== Create object with id and vector =====
// ============================================

// CreateObjectWithId START
// myCollection = client.collections.get('WineReviewNV')

uuid = await reviews.data.insert({
  properties: {
    "title": "A delicious Riesling",
    "review_body": "This wine is a delicious Riesling which pairs well with seafood.",
    "country": "Germany",
    },
  // highlight-start
  id: "12345678-e64f-5d94-90db-c8cfa3fc1234"
  // highlight-end
})

console.log('UUID: ', uuid)
// CreateObjectWithId END
// myCollection = client.collections.get(wineRewiews)

result = await reviews.query.fetchObjectById('12345678-e64f-5d94-90db-c8cfa3fc1234')
assert.deepEqual(result.properties, {
  "title": "A delicious Riesling",
  "review_body": "This wine is a delicious Riesling which pairs well with seafood.",
  "country": "Germany",
  });


// ===========================
// ===== Validate object =====
// ===========================

// ValidateObject START
// Validate is currently not supported with the Weaviate TypeScript client v3

  // ValidateObject END
  // ValidateObject START
// ValidateObject END
