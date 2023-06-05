import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// EndToEndExample  // InstantiationExample  // NearTextExample  // CustomVectorExample
import weaviate, { WeaviateClient, ObjectsBatcher, ApiKey } from 'weaviate-ts-client';
import fetch from 'node-fetch';

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: 'some-endpoint.weaviate.network',  // Replace with your endpoint
  apiKey: new ApiKey('YOUR-WEAVIATE-API-KEY'),  // Replace w/ your Weaviate instance API key
  headers: {'X-HuggingFace-Api-Key': 'YOUR-HUGGINGFACE-API-KEY'},  // Replace with your inference API key
});

// END EndToEndExample  // END InstantiationExample  // END NearTextExample  // END CustomVectorExample

// ================================
// ===== END-TO-END EXAMPLE =====
// ================================

// EndToEndExample  // CustomVectorExample
// Add the schema
let classObj = {
  'class': 'Question',
  'vectorizer': 'text2vec-huggingface',  // If set to "none" you must always provide vectors yourself. Could be any other "text2vec-*" also.
  'moduleConfig': {
    'text2vec-huggingface': {
        'model': 'sentence-transformers/all-MiniLM-L6-v2',  // Can be any public or private Hugging Face model.
        'options': {
            'waitForModel': true
        }
    }
  }
}

async function addSchema() {
  const res = await client.schema.classCreator().withClass(classObj).do();
  console.log(res);
}

// END Add the schema

// Import data function
async function getJsonData() {
  const file = await fetch('https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json');
  return file.json();
}

async function importQuestions() {
  // Get the questions directly from the URL
  const data = await getJsonData();

  // Prepare a batcher
  let batcher: ObjectsBatcher = client.batch.objectsBatcher();
  let counter = 0;
  let batchSize = 100;

  for (const question of data) {
    // Construct an object with a class and properties 'answer' and 'question'
    const obj = {
      class: 'Question',
      properties: {
        answer: question.Answer,
        question: question.Question,
        category: question.Category,
      },
    }

    // add the object to the batch queue
    batcher = batcher.withObject(obj);

    // When the batch counter reaches batchSize, push the objects to Weaviate
    if (counter++ == batchSize) {
      // flush the batch queue
      const res = await batcher.do();
      console.log(res);

      // restart the batch queue
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }

  // Flush the remaining objects
  const res = await batcher.do();
  console.log(res);
}

// END EndToEndExample  // END Import data function

// NearTextExample
async function nearTextQuery() {
  const res = await client.graphql
    .get()
    .withClassName('Question')
    .withFields('question answer category')
    .withNearText({concepts: ['biology']})
    .withLimit(2)
    .do();

  console.log(JSON.stringify(res, null, 2));
  return res
}

// END NearTextExample

// Define test functions
async function getNumObjects() {
  const res = await client.graphql
    .aggregate()
    .withClassName('Question')
    .withFields('meta { count }').do();
  return res.data.Aggregate.Question[0].meta.count;
}

async function cleanup() {
  client.schema.classDeleter().withClassName('Question').do();
}
// END Define test functions


/* ================================================================================
Actually populate the instance and run the query
================================================================================ */

// EndToEndExample
async function run() {
  await addSchema();
  await importQuestions();
  // END EndToEndExample
  const res = await nearTextQuery();

  // Test
  assert.deepEqual(res.data.Get.Question.length, 2);
  // assert.deepEqual(res.data.Get.Question[0].answer, 'DNA');  // Commenting out as it may change according to any model changes
  const count = await getNumObjects();
  assert.deepEqual(count, 10);
  await cleanup();
// EndToEndExample
}

// END EndToEndExample  // END NearTextExample

// EndToEndExample
await run();
// END EndToEndExample


/* ================================================================================
Writing modular code for display in the docs is a little trickier due to the
asynchronous nature of JavaScript/TypeScript.

To show examples of these functions being run in the doc,
the below sections call the functions within commented snippet.
This is to prevent the functions from being run out of order
(e.g. prevent query being called before the DB is populated),
or prevent it from populating the instance when it should not.
================================================================================ */

/*
// NearTextExample
await nearTextQuery();
// END NearTextExample
*/


/*
// Add the schema
await addSchema();
// END Add the schema
*/


/*
// Import data function
await importQuestions();
// END Import data function
*/


/*
// Import data function with custom vectors
async function getJsonData() {
  const fname = 'jeopardy_tiny_with_vectors_all-MiniLM-L6-v2.json';
  const url = 'https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/' + fname
  const file = await fetch(url);
  return file.json();
}

async function importQuestions() {
  // Get the questions directly from the URL
  const data = await getJsonData();  // Each question object here would include vector data

  // Prepare a batcher
  let batcher: ObjectsBatcher = client.batch.objectsBatcher();
  let counter = 0;
  let batchSize = 100;

  for (const question of data) {
    // Construct an object with a class and properties 'answer' and 'question'
    const obj = {
      class: 'Question',
      properties: {
        answer: question.Answer,
        question: question.Question,
        category: question.Category,
      },
      // highlight-start
      vector: question.vector  // Add the vector data to the object,
      // highlight-end
    }

    // add the object to the batch queue
    batcher = batcher.withObject(obj);

    // When the batch counter reaches batchSize, push the objects to Weaviate
    if (counter++ == batchSize) {
      // flush the batch queue
      const res = await batcher.do();
      console.log(res);

      // restart the batch queue
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }

  // Flush the remaining objects
  const res = await batcher.do();
  console.log(res);
}
// END Import data function with custom vectors
*/
