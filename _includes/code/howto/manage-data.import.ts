// How-to: Manage data -> (Batch) Import items - TypeScript examples
// run with: node --loader=ts-node/esm --experimental-specifier-resolution=node manage-data.import.ts
import assert from 'assert';
const MAX_ROWS_TO_IMPORT = 50;  // limit vectorization calls

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// START JSON streaming  // START CSV streaming
import weaviate from 'weaviate-client';
import fs from 'fs';
// END JSON streaming  // END CSV streaming

// START JSON streaming
import parser from 'stream-json';
import StreamArray from 'stream-json/streamers/StreamArray';
import Chain from 'stream-chain';
// END JSON streaming
// START CSV streaming
import csv from 'csv-parser';
// END CSV streaming

// ===== Instantiation, not shown in snippet
const client = await weaviate.connectToWeaviateCloud(
 'WEAVIATE_INSTANCE_URL',  // Replace WEAVIATE_INSTANCE_URL with your instance URL
 {
   authCredentials: new weaviate.ApiKey('api-key'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 }
)

// ============================
// ===== Define the class =====
// ============================

const collectionDefinition = {
  name: 'JeopardyQuestion',
  description: 'A Jeopardy! question',
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI()
};

// Clean slate
try {
  await client.collections.delete('JeopardyQuestion')
  await client.collections.delete('MyCollection')
} catch {
  // ignore error if class doesn't exist
} finally {
  await client.collections.create(collectionDefinition)
}


// ==============================
// ===== Basic batch import =====
// ==============================

{
// START BasicBatchImportExample
let dataObjects = [
  { title: 'Object 1' },
  { title: 'Object 2' },
  { title: 'Object 3' }
]

// highlight-start
const myCollection = client.collections.get('MyCollection')
const response = await myCollection.data.insertMany(dataObjects);
// highlight-end

console.log(response);
// END BasicBatchImportExample

// TODO: update all tests
// let result = await client.graphql.aggregate().withClassName(className).withFields('meta { count }').do();
// assert.equal(result.data['Aggregate'][className][0].meta.count, 5);

client.collections.delete('MyCollection')
}

// =======================================
// ===== Batch import with custom ID =====
// =======================================

// START BatchImportWithIDExample
// highlight-start
import { generateUuid5 } from 'weaviate-client';  // requires v1.3.2+
// highlight-end

// END BatchImportWithIDExample


{
// START BatchImportWithIDExample
let dataObjects = [
  {
    properties: { title: 'Object 1' },
    // highlight-start
    id: generateUuid5('MyCollection', 'Object 1'), // generate uuid from collection name and the unique value(s)
    // highlight-end
  },
  {
    properties: { title: 'Object 2' },
    // highlight-start
    id: generateUuid5('MyCollection', 'Object 2'), // generate uuid from collection name and the unique value(s)
    // highlight-end
  },
  // ...
]

const myCollection = client.collections.get('MyCollection')
await myCollection.data.insertMany(dataObject)
// END BatchImportWithIDExample

// result = await client.graphql.aggregate().withClassName(className).withFields('meta { count }').do();
// assert.equal(result.data['Aggregate'][className][0].meta.count, 5);
// result = await client.graphql.get().withClassName(className).withFields('title _additional { id }').do();
// for (const obj of result.data.Get[className])
//   assert.equal(obj['_additional']['id'], generateUuid5(obj['title']));

await client.collections.delete('MyCollection');
}

// ===========================================
// ===== Batch import with custom vector =====
// ===========================================

// START BatchImportWithVectorExample
const myCollection = client.collections.get('MyCollection')

let dataObjects = [
  {
    properties: { title: 'Object 1' },
    // highlight-start
    vectors: Array(100).fill(0.1111), // provide the vector here
    // highlight-end
  },
  {
    properties: { title: 'Object 2' },
    // highlight-start
    vectors: Array(100).fill(0.2222), // provide the vector here
    // highlight-end
  },
  // ...
]

await jeopardy.data.insertMany(dataObjects)
// END BatchImportWithVectorExample

// result = await client.graphql.aggregate().withClassName(className).withFields('meta { count }').do();
// assert.equal(result.data['Aggregate'][className][0].meta.count, 5);
// result = await client.graphql.get().withClassName(className).withFields('_additional { vector }').do();
// for (const obj of result.data.Get[className]) {
//   assert.ok(obj['_additional']['vector'][0] > 0.25);
//   assert.ok(obj['_additional']['vector'][9] <= 0.3);
// }

await client.collections.delete('MyCollection');


// ===========================================
// ===== Batch import with named vectors =====
// ===========================================

// Clean slate
try {
  await client.collections.delete('MyCollection');
} catch (e) {
  // ignore error if class doesn't exist
} finally {
  await client.collections.create({
    name: 'MyCollection',
    vectorizers: [
      weaviate.configure.vectorizer.none({name: 'title'}),
      weaviate.configure.vectorizer.none({name: 'body'}),
    ]
  })
}

{
// START BatchImportWithNamedVectors
const myCollection = client.collections.get("MyCollection")
let dataObjects = [
  {
    properties: { title: 'Object 1' },
    // highlight-start
    vectors: {
      title: Array(100).fill(0.1111), // provide the vector here
      body: Array(100).fill(0.9999),  // provide the vector here
    }
    // highlight-end
  },
  {
    properties: { title: 'Object 2' },
    // highlight-start
    vectors: {
      title: Array(100).fill(0.2222), // provide the vector here
      body: Array(100).fill(0.8888),  // provide the vector here
    }
    // highlight-end
  },
  // ...
]

await myCollection.data.insertMany(dataObjects)
}
// END BatchImportWithNamedVectors

// Aggregate not working with named vectors as of 2024-02-28
// result = await client.graphql.aggregate().withClassName(className).withFields('meta { count }').do();
// assert.equal(result.data['Aggregate'][className][0].meta.count, 5);

// result = await client.graphql.get().withClassName(className).withFields('_additional { vectors { title body } }').do();
// for (const obj of result.data.Get[className]) {
//   assert.ok(obj['_additional']['vectors']['title']);
//   assert.ok(obj['_additional']['vectors']['body']);
// }

await client.collections.delete('MyCollection');

// ============================
// ===== Streaming import =====
// ============================

// START JSON streaming  // START CSV streaming

let batcher = client.batch.objectsBatcher();
let counter = 0;
const batchSize = 20;

async function addObject(obj: object): Promise<void> {
  const properties = {
    question: obj['Question'],
    answer: obj['Answer'],
  };
  // Add the object to the batch queue
  batcher = batcher.withObject({
    class: 'JeopardyQuestion',
    properties,
    // If you Bring Your Own Vectors, add the `vector` parameter here
    // vector: JSON.parse(obj['Vector']),
  });
  counter++;

  // When the batch counter reaches batchSize, push the objects to Weaviate
  if (counter % batchSize === 0) {
    // Flush the batch queue and restart it
    const response = await batcher.do();
    batcher = client.batch.objectsBatcher();

    // Handle errors
    for (const r of response)
      if (r.result.errors)
        throw r.result.errors;

    console.log(`Imported ${counter} articles...`);
  }
}
// END JSON streaming  // END CSV streaming

// START JSON streaming
async function importJson(filePath) {
  const pipeline = new Chain([
    fs.createReadStream(filePath),
    parser(),
    new StreamArray(),
  ]);

  for await (const { value } of pipeline) {
    await addObject(value);
    // END JSON streaming
    if (counter >= MAX_ROWS_TO_IMPORT)
      return;
    // START JSON streaming
  }
}

await importJson('jeopardy_1k.json');
// END JSON streaming

// START CSV streaming
async function importCSV(filePath) {
  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const row of stream) {
    await addObject(row);
    // END CSV streaming
    if (counter >= MAX_ROWS_TO_IMPORT * 2)  // CSV import runs after JSON
      return;
    // START CSV streaming
  }
}

await importCSV('jeopardy_1k.csv');
// END CSV streaming

// START JSON streaming  // START CSV streaming

// Flush any remaining objects
if (batcher.payload().objects.length > 0)
  await batcher.do();

console.log(`Finished importing ${counter} articles.`);
// END JSON streaming  // END CSV streaming

// Test
// result = await client.graphql.aggregate().withClassName('JeopardyQuestion').withFields('meta { count }').do();
// assert.deepEqual(result.data['Aggregate']['JeopardyQuestion'], [{ meta: { count: MAX_ROWS_TO_IMPORT * 2 } }]);
// const tokyoRose = await client.graphql.get().withClassName('JeopardyQuestion').withWhere({
//   path: ['answer'],
//   operator: 'Equal',
//   valueText: 'Tokyo Rose',
// }).withFields('answer').do();
// assert.equal(tokyoRose.data.Get['JeopardyQuestion'].length, 2);
// End test

// ===========================
// ===== Batch with gRPC =====
// ===========================
// START BatchGRPC
const questions = client.collections.get("CollectionName")

const batchSize = 1000; // define your batch size

async function insertBatch() {
  try {
    await questions.data.insertMany(dataBatch);
    console.log('Batch inserted successfully');
  } catch (error) {
    console.error('Error inserting batch:', error);
  }
}

async function batchInsert() {
  for (let i = 0; i < dataArray.length; i += batchSize) {
    const batch = dataArray.slice(i, i + batchSize);
    await insertBatch(batch);
  }
}

const dataObject = [...]; // your data
await batchInsert(dataObject);
// START BatchGRPC
