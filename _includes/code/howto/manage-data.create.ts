// How-to: Manage data -> Create objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.update.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',  // Replace with your Weaviate URL
  // apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),  // If auth is on. Replace w/ your Weaviate instance API key.
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY,  // Replace w/ your OPENAI API key
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
  await client.schema.classDeleter().withClassName(className).do();
} catch (e) {
  // ignore error if class doesn't exist
} finally {
  await client.schema.classCreator().withClass(classDefinition).do();
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
    somePropNotInTheSchema: 123,  // will be automatically added as a number property
  })
  .do();

console.log(JSON.stringify(result, null, 2));  // the returned value is the object
// CreateObject END

result = await client.data.getterById().withClassName(className).withId(result.id).do();
assert.equal(result.properties['somePropNotInTheSchema'], 123);


// ============================================
// ===== Create object with id and vector =====
// ============================================

// CreateObjectWithIdAndVector START
result = await client.data
  .creator()
  .withClassName('JeopardyQuestion')
  .withProperties({
    question: 'This vector DB is OSS and supports automatic property type inference on import',
    answer: 'Weaviate',
  })
  // highlight-start
  .withId('12345678-e64f-5d94-90db-c8cfa3fc1234')
  .withVector(Array(1536).fill(0.12345))
  // highlight-end
  .do();

console.log(JSON.stringify(result, null, 2));  // the returned value is the object
// CreateObjectWithIdAndVector END

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
