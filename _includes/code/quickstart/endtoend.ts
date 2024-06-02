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

// EndToEndExample  // InstantiationExample // NearTextWhereExample   // NearTextExample  // GenerativeSearchExample  // CustomVectorExample
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 } 
)

// END EndToEndExample  // END InstantiationExample // END NearTextWhereExample // END NearTextExample  // END GenerativeSearchExample  // END CustomVectorExample

// ================================
// ===== END-TO-END EXAMPLE =====
// ================================

// EndToEndExample  // CustomVectorExample
// Add the schema
const schema = {
  name: 'Question',
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI(),
  generative: weaviate.configure.generative.openAI(),
}

async function addSchema() {
  const newCollection = await client.collections.create(schema)
  console.log('We have a new class!', newCollection['name']);
}

// END Add the schema

// Import data function
async function getJsonData() {
  const file = await fetch('https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json');
  return file.json();
}

async function importQuestions() {
  // Get the questions directly from the URL
  const myCollection = client.collections.get('Question');
  const data = await getJsonData();
  const result = await myCollection.data.insertMany(data)
  console.log('We just bulk inserted',result);
}

// END EndToEndExample  // END Import data function

// NearTextExample
async function nearTextQuery() {  
  const myCollection = client.collections.get('Question');

  const result = await myCollection.query.nearText(['biology'],{
    returnProperties: ['question', 'answer', 'category'],
    limit:2
  });

  console.log(JSON.stringify(result.objects, null, 2));
  return result;
}

// END NearTextExample

// NearTextWhereExample
async function nearTextWhereQuery() {  
  const myCollection = client.collections.get('Question');

  const result = await myCollection.query.nearText(['biology'],{
    returnProperties: ['question', 'answer', 'category'],
    filters: client.collections.get('Question').filter.byProperty('category').equal('ANIMALS'),
    limit:2
  });

  console.log(JSON.stringify(result.objects, null, 2));
  return result;
}

// END NearTextWhereExample

// GenerativeSearchExample
async function generativeSearchQuery() {
  const myCollection = client.collections.get('Question');

  const result = await myCollection.generate.nearText(['biology'],{
    singlePrompt: `Explain {answer} as you might to a five-year-old.`,
  },{
    limit: 2,
    returnProperties: ['question', 'answer', 'category'],
  });

  console.log(JSON.stringify(result.objects, null, 2));
  return result;
}

// END GenerativeSearchExample

// GenerativeSearchGroupedTaskExample
async function generativeSearchGroupedQuery() {
  const myCollection = client.collections.get('Question');

  const result = await myCollection.generate.nearText(['biology'],{
    groupedTask: `Write a tweet with emojis about these facts.`,
  },{
    returnProperties: ['question', 'answer', 'category'],
    limit: 2,
  });

  console.log(JSON.stringify(result.generated, null, 2));
  return result;
}

// END GenerativeSearchGroupedTaskExample



// Define test functions
async function getNumObjects() {
  const myCollection = client.collections.get('Question');    
  const objectCount =  await myCollection.aggregate.overAll()
  console.log(JSON.stringify(objectCount.totalCount));
  return objectCount.totalCount
}

async function cleanup() {
  await client.collections.delete('Question');
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
  assert.deepEqual(res.objects.length, 2);
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
// NearTextWhereExample
await nearTextWhereQuery();
// END NearTextWhereExample
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
