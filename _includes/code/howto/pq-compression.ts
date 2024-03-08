import assert from 'assert';

// TODO - needs confirmation & test

// START FetchData
async function getJsonData() {
  const file = await fetch(
    'https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/jeopardy_1k.json'
  );
  return file.json();
}

await getJsonData();
// END FetchData

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// START DockerInstantiationExample
import weaviate, { WeaviateClient, ObjectsBatcher } from 'weaviate-ts-client';
import fetch from 'node-fetch';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY }, // Replace with your inference API key
});
// END DockerInstantiationExample

if (client.schema.exists('Question')) {
  console.log('Deleting Question class');
  await client.schema.classDeleter().withClassName('Question').do();
}

// ==============================
// =====  AUTOPQ =====
// ==============================

// START CollectionWithAutoPQ
async function addSchemaAutoPQ() {
  const classObj = {
    class: 'Question',
    vectorizer: 'text2vec-openai',
    // highlight-start
    vectorIndexConfig: {
      pq: {
        enabled: true,  // Enable PQ
        trainingLimit: 50000,  // Set the training limit
      },
    },
    // highlight-end
    properties: [
      { name: 'question', dataType: ['text'] },
      { name: 'answer', dataType: ['text'] },
    ],
  };
  const res = await client.schema.classCreator().withClass(classObj).do();
  console.log(res);
}

await addSchemaAutoPQ();
// END CollectionWithAutoPQ



// ================================
// ===== END-TO-END EXAMPLE =====
// ================================

if (client.schema.exists('Question')) {
  console.log('Deleting Question class');
  await client.schema.classDeleter().withClassName('Question').do();
}

// START InitClassDef
async function addSchema() {
  const classObj = {
    class: 'Question',
    vectorizer: 'text2vec-openai',
    properties: [
      { name: 'question', dataType: ['text'] },
      { name: 'answer', dataType: ['text'] },
    ],
  };
  const res = await client.schema.classCreator().withClass(classObj).do();
  console.log(res);
}

await addSchema();
// END InitClassDef

// START LoadData
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
      },
    };

    // add the object to the batch queue
    batcher = batcher.withObject(obj);

    // When the batch counter reaches batchSize, push the objects to Weaviate
    if (counter++ == batchSize) {
      // flush the batch queue
      const res = await batcher.do();
      console.log(res); // To view the response

      // restart the batch queue
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }

  // Flush the remaining objects
  const res = await batcher.do();
  console.log(res); // To view the response
}

await importQuestions();
// END LoadData

// START UpdateSchema

// Note: This is carried out using the REST endpoint directly,
// as the JS/TS client cannot currently update the schema.
async function updateSchema() {
  let url = 'http://localhost:8080/v1/schema/Question';
  let pqUpdateDefinition = {
    class: 'Question',
    vectorizer: 'text2vec-openai',
    properties: [
      { name: 'question', dataType: ['text'] },
      { name: 'answer', dataType: ['text'] },
    ],
    vectorIndexConfig: {
      pq: {
        enabled: true,
        trainingLimit: 100000,
        segments: 96,
      },
    },
  };

  let response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pqUpdateDefinition),
  });
  console.log(await response.json());
}

await updateSchema();
// END UpdateSchema

// START GetSchema
const schema = await client.schema.classGetter().withClassName('Question').do();

// Inspect the PQ configuration
console.log(JSON.stringify(schema.vectorIndexConfig.pq, null, 2));
// END GetSchema
