// How-to: Manage data -> Create objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.update.ts
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
result = await client.data
  .creator()
  .withClassName('JeopardyQuestion')
  .withProperties({
    question: 'This vector DB is OSS and supports automatic property type inference on import',
    // answer: 'Weaviate',  // schema properties can be omitted
    newProperty: 123,  // will be automatically added as a number property
  })
  .do();

console.log(JSON.stringify(result, null, 2));  // the returned value is the object
// CreateObject END

result = await client.data.getterById().withClassName(className).withId(result.id).do();
assert.equal(result.properties['newProperty'], 123);

// =======================================
// ===== Create object with a vector =====
// =======================================

// CreateObjectWithVector START
result = await client.data
  .creator()
  .withClassName('JeopardyQuestion')
  .withProperties({
    question: 'This vector DB is OSS and supports automatic property type inference on import',
    answer: 'Weaviate',
  })
  // highlight-start
  .withVector(Array(1536).fill(0.12345))
  // highlight-end
  .do();

console.log(JSON.stringify(result, null, 2));  // the returned value is the object
// CreateObjectWithVector END


// =======================================
// ===== Create object with named vectors =====
// =======================================

// CreateObjectNamedVectors START
result = await client.data
  .creator()
  .withClassName('WineReviewNV')
  .withProperties({
    title: 'A delicious Riesling',
    review_body: 'This wine is a delicious Riesling which pairs well with seafood.',
    country: 'Germany',
  })
  // highlight-start
  // Specify the named vectors, following the collection definition
  .withVectors({
    title: Array(1536).fill(0.12345),
    review_body: Array(1536).fill(0.31313),
    title_country: Array(1536).fill(0.05050),
  })
  // highlight-end
  .do();

console.log(JSON.stringify(result, null, 2));  // the returned value is the object
// CreateObjectNamedVectors END


// ===============================================
// ===== Create object with deterministic id =====
// ===============================================

// CreateObjectWithDeterministicId START
// highlight-start
import { generateUuid5 } from 'weaviate-ts-client';  // requires v1.3.2+
// highlight-end

const dataObj = {
  question: 'This vector DB is OSS and supports automatic property type inference on import',
  answer: 'Weaviate'
}

result = await client.data
  .creator()
  .withClassName('JeopardyQuestion')
  .withProperties(dataObj)
  // highlight-start
  .withId(generateUuid5(JSON.stringify(dataObj)))
  // highlight-end
  .do();

console.log(JSON.stringify(result, null, 2));  // the returned value is the object
// CreateObjectWithDeterministicId END

result = await client.data.getterById().withClassName(className).withId(result.id).do();
assert.equal(result.id, generateUuid5(JSON.stringify(dataObj)));

// ============================================
// ===== Create object with id and vector =====
// ============================================

// CreateObjectWithId START
result = await client.data
  .creator()
  .withClassName('JeopardyQuestion')
  .withProperties({
    question: 'This vector DB is OSS and supports automatic property type inference on import',
    answer: 'Weaviate',
  })
  // highlight-start
  .withId('12345678-e64f-5d94-90db-c8cfa3fc1234')
  // highlight-end
  .do();

console.log(JSON.stringify(result, null, 2));  // the returned value is the object
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
try {
  await client.data
    // highlight-start
    .validator()
    // highlight-end
    .withClassName('JeopardyQuestion')
    .withId('12345678-1234-1234-1234-123456789012')  // placeholder in UUID format (required)
    .withProperties({
      question: 'This vector DB is open-source and supports auto-schema',
      answer: 'Weaviate',
      thisPropShouldNotEndUpInTheSchema: -1,
    })
    .do();
} catch (e) {
  // "invalid object: no such prop with name 'thisPropShouldNotEndUpInTheSchema' found..."
  console.error('Expecting error about thisPropShouldNotEndUpInTheSchema:', e.message);
  // ValidateObject END
  assert.ok(e.message.includes('thisPropShouldNotEndUpInTheSchema'));
  // ValidateObject START
}
// ValidateObject END
