// How-to: Manage data -> Create objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.update.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-client';

const client = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL',  // Replace WEAVIATE_INSTANCE_URL with your instance URL
 {
   authCredentials: new weaviate.ApiKey('api-key'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)

const className = 'JeopardyQuestion';
let result;

// ============================
// ===== Define the class =====
// ============================

const classDefinition = {
  class: 'JeopardyQuestion',
  description: 'A Jeopardy! question',
  vectorizer: 'text2vec-openai',
  properties: [
    {
      name: 'question',
      dataType: ['text'],
    },
    {
      name: 'answer',
      dataType: ['text'],
    },
  ],
};

// Clean slate
try {
  await client.schema.classDeleter().withClassName(classDefinition.class).do();
} catch (e) {
  // ignore error if class doesn't exist
} finally {
  await client.schema.classCreator().withClass(classDefinition).do();
}


const classDefinitionNV = {
  class: 'WineReviewNV',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
    {
      name: 'review_body',
      dataType: ['text'],
    },
    {
      name: 'country',
      dataType: ['text'],
    },
  ],
  vectorConfig: {
    // Set a named vector
    title: {
      vectorIndexType: 'hnsw', // Set the index type
      vectorizer: {
        'text2vec-openai': {
          properties: ['title'], // Set the source property(ies)
        },
      },
    },
    // Set another named vector
    review_body: {
      vectorIndexType: 'hnsw', // Set the index type
      vectorizer: {
        'text2vec-openai': {
          properties: ['review_body'], // Set the source property(ies)
        },
      },
    },
    // Set another named vector
    title_country: {
      vectorIndexType: 'hnsw', // Set the index type
      vectorizer: {
        'text2vec-openai': {
          properties: ['title', 'country'], // Set the source property(ies)
        },
      },
    },
  },
};

// Clean slate
try {
  await client.schema.classDeleter().withClassName(classDefinitionNV.class).do();
} catch (e) {
  // ignore error if class doesn't exist
} finally {
  await client.schema.classCreator().withClass(classDefinitionNV).do();
}

// =========================
// ===== Create object =====
// =========================

// CreateObject START
const myCollection = client.collections.get('JeopardyQuestion')

const uuid = await myCollection.data.insert({
  'question': 'This vector DB is OSS & supports automatic property type inference on import',
  // 'answer': 'Weaviate',  // properties can be omitted
  'newProperty': 123,  // will be automatically added as a number property
})

console.log('UUID: ', uuid)
// CreateObject END

result = await client.data.getterById().withClassName(className).withId(result.id).do();
assert.equal(result.properties['newProperty'], 123);

// =======================================
// ===== Create object with a vector =====
// =======================================

// CreateObjectWithVector START
const myCollection = client.collections.get('JeopardyQuestion')

const uuid = await myCollection.data.insert({
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
const myCollection = client.collections.get('WineReviewNV')

const uuid = await myCollection.data.insert({
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

const myCollection = client.collections.get('WineReviewNV')
const dataObject = {
  "title": "A delicious Riesling",
  "review_body": "This wine is a delicious Riesling which pairs well with seafood.",
  "country": "Germany",
}

const uuid = await myCollection.data.insert({
  properties: dataObject,
  // highlight-start
  id: generateUuid5(dataObject.title)
  // highlight-end
})

console.log('UUID: ', uuid)
// CreateObjectWithDeterministicId END

result = await client.data.getterById().withClassName(className).withId(result.id).do();
assert.equal(result.id, generateUuid5(JSON.stringify(dataObj)));

// ============================================
// ===== Create object with id and vector =====
// ============================================

// CreateObjectWithId START
const myCollection = client.collections.get('WineReviewNV')

const uuid = await myCollection.data.insert({
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

result = await client.data.getterById().withClassName(className).withId('12345678-e64f-5d94-90db-c8cfa3fc1234').do();
assert.deepEqual(result.properties, {
  question: 'This vector DB is OSS and supports automatic property type inference on import',
  answer: 'Weaviate',
});


// ===========================
// ===== Validate object =====
// ===========================

// ValidateObject START
// Validate is currently not supported with the Weaviate TypeScript client v3

  // ValidateObject END
  assert.ok(e.message.includes('thisPropShouldNotEndUpInTheSchema'));
  // ValidateObject START
// ValidateObject END
