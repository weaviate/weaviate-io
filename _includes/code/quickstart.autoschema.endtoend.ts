const assert = require('assert');

/*
// Instantiate client
import weaviate, { WeaviateClient, ObjectsBatcher } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: 'some-endpoint.weaviate.network',  // Replace with your endpoint
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // Replace w/ your Weaviate instance API key
  headers: {'X-OpenAI-Api-Key': 'YOUR-OPENAI-API-KEY'},  // Replace with your inference API key
});
// END Instantiate client
*/

// EndToEnd TS
import weaviate, { WeaviateClient, ObjectsBatcher } from 'weaviate-ts-client';
import fetch from 'node-fetch';

// END EndToEnd TS

// Actual instantiation for testing
const client: WeaviateClient = weaviate.client({
    scheme: 'http',
    host: 'localhost:8090',
});

/*
// EndToEnd TS
const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: 'some-endpoint.weaviate.network',  // Replace with your endpoint
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // Replace w/ your Weaviate instance API key
  headers: {'X-OpenAI-Api-Key': 'YOUR-OPENAI-API-KEY'},  // Replace with your inference API key
});

// END EndToEnd TS
*/

// EndToEnd TS
// Add the schema
let classObj = {
    'class': 'Question',
    'vectorizer': 'text2vec-openai'
}

async function addSchema() {
  try {
    const res = await client.schema.classCreator().withClass(classObj).do();
    console.log(res);
  } catch(err) {
    console.error(err);
  }
}

// Import data function
async function getJsonData() {
  const file = await fetch('https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json');
  return file.json();
}

async function importQuestions() {
  try {
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
  } catch(err) {
    console.error(err);
  }
}
// END Import data function

async function populateWeaviate() {
  await addSchema();
  await importQuestions();
}

// END EndToEnd TS

/*
// EndToEnd TS
populateWeaviate();
// END EndToEnd TS
*/

/*
// NearText TS
import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: 'some-endpoint.weaviate.network',  // Replace with your endpoint
  apiKey: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // Replace w/ your Weaviate instance API key
  headers: {'X-OpenAI-Api-Key': 'YOUR-OPENAI-API-KEY'},  // Replace with your inference API key
});

// END NearText TS
*/

// NearText TS
async function nearTextQuery() {
  try {
    const res = await client.graphql
      .get()
      .withClassName('Question')
      .withFields('question answer category')
      .withNearText({concepts: ['biology']})
      .withLimit(2)
      .do();

    console.log(JSON.stringify(res, null, 2));
    return res
  } catch (err) {
    console.error(err);
  }
}

nearTextQuery();
// END NearText TS

// Test
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

async function testNearTextQuery() {
  await populateWeaviate();
  const res = await nearTextQuery();
  assert.deepEqual(res.data.Get.Question.length, 2);
  assert.deepEqual(res.data.Get.Question[0].answer, 'DNA');
  const count = await getNumObjects();
  assert.deepEqual(count, 10);
  await cleanup()
}

testNearTextQuery();
// End test
