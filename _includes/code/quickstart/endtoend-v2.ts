import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

/*
// DockerInstantiationExample
import weaviate, { WeaviateClient, ObjectsBatcher } from 'weaviate-ts-client';
import fetch from 'node-fetch';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  headers: { 'X-OpenAI-Api-Key': 'YOUR-OPENAI-API-KEY' },  // Replace with your inference API key
});
// END DockerInstantiationExample
*/

// EndToEndExample  // InstantiationExample  // NearTextExample  // GenerativeSearchExample  // CustomVectorExample
import weaviate, { WeaviateClient, ObjectsBatcher, ApiKey } from 'weaviate-ts-client';
import fetch from 'node-fetch';

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: '',  // Replace with your endpoint
  apiKey: new ApiKey('YOUR-WEAVIATE-API-KEY'),  // Replace w/ your Weaviate instance API key
  headers: { 'X-OpenAI-Api-Key': 'YOUR-OPENAI-API-KEY' },  // Replace with your inference API key
});

// END EndToEndExample  // END InstantiationExample  // END NearTextExample  // END GenerativeSearchExample  // END CustomVectorExample

// ================================
// ===== END-TO-END EXAMPLE =====
// ================================

// EndToEndExample  // CustomVectorExample
// Add the schema
const classObj = {
  'class': 'Question',
  'vectorizer': 'text2vec-openai',  // If set to "none" you must always provide vectors yourself. Could be any other "text2vec-*" also.
  'moduleConfig': {
    'text2vec-openai': {},
    'generative-openai': {}  // Ensure the `generative-openai` module is used for generative queries
  },
};

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
  const batchSize = 100;

  for (const question of data) {
    // Construct an object with a class and properties 'answer' and 'question'
    const obj = {
      class: 'Question',
      properties: {
        answer: question.Answer,
        question: question.Question,
        category: question.Category,
      },
    };

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
  return res;
}

// END NearTextExample

// NearTextWhereExample
async function nearTextWhereQuery() {
  const res = await client.graphql
    .get()
    .withClassName('Question')
    .withFields('question answer category')
    .withNearText({concepts: ['biology']})
    .withWhere({
      'path': ['category'],
      'operator': 'Equal',
      'valueText': 'ANIMALS',
    })
    .withLimit(2)
    .do();

  console.log(JSON.stringify(res, null, 2));
  return res;
}

// END NearTextWhereExample

// GenerativeSearchExample
async function generativeSearchQuery() {
  const res = await client.graphql
    .get()
    .withClassName('Question')
    .withFields('question answer category')
    .withNearText({concepts: ['biology']})
    .withGenerate({singlePrompt: 'Explain {answer} as you might to a five-year-old.'})
    .withLimit(2)
    .do();

  console.log(JSON.stringify(res, null, 2));
  return res;
}

// END GenerativeSearchExample

// GenerativeSearchGroupedTaskExample
async function generativeSearchGroupedQuery() {
  const res = await client.graphql
    .get()
    .withClassName('Question')
    .withFields('question answer category')
    .withNearText({concepts: ['biology']})
    .withGenerate({groupedTask: 'Write a tweet with emojis about these facts.'})
    .withLimit(2)
    .do();

  console.log(res.data.Get.Question[0]._additional.generate.groupedResult);
  return res;
}

// END GenerativeSearchGroupedTaskExample



// Define test functions
async function getNumObjects() {
  const res = await client.graphql
    .aggregate()
    .withClassName('Question')
    .withFields('meta { count }').do();
  return res.data.Aggregate.Question[0].meta.count;
}

async function cleanup() {
  await client.schema.classDeleter().withClassName('Question').do();
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
// NearTextExample
await nearTextWhereQuery();
// END NearTextExample
*/

/*
// GenerativeSearchExample
await generativeSearchQuery();
// END GenerativeSearchExample
*/

/*
// GenerativeSearchGroupedTaskExample
await generativeSearchGroupedQuery();
// END GenerativeSearchGroupedTaskExample
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
// Import data with custom vectors
async function getJsonData() {
  const fname = 'jeopardy_tiny_with_vectors_all-OpenAI-ada-002.json';
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
// END Import data with custom vectors
*/
