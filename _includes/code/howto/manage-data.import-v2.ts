// How-to: Manage data -> (Batch) Import items - TypeScript examples
// run with: node --loader=ts-node/esm --experimental-specifier-resolution=node manage-data.import.ts
import assert from 'assert';
const MAX_ROWS_TO_IMPORT = 50;  // limit vectorization calls

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// START JSON streaming  // START CSV streaming
import weaviate from 'weaviate-ts-client';
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
const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  headers: {
    'X-OpenAI-Api-Key': process.env['OPENAI_API_KEY'],
  },
});


// ============================
// ===== Define the class =====
// ============================

const classDefinition = {
  class: 'JeopardyQuestion',
  description: 'A Jeopardy! question',
  vectorizer: 'text2vec-openai',
};

// Clean slate
try {
  await client.schema.classDeleter().withClassName('JeopardyQuestion').do();
  await client.schema.classDeleter().withClassName('YourName').do();
} catch {
  // ignore error if class doesn't exist
} finally {
  await client.schema.classCreator().withClass(classDefinition).do();
}


// ==============================
// ===== Basic batch import =====
// ==============================

// BasicBatchImportExample
let className = 'YourName';  // Replace with your class name
let dataObjs = [];
for (let i = 1; i <= 5; i++)
  dataObjs.push({ title: `Object ${i}` });  // Replace with your actual objects

// highlight-start
let batcher5 = client.batch.objectsBatcher();
for (const dataObj of dataObjs)
  batcher5 = batcher5.withObject({
    class: className,
    properties: dataObj,
    // tenant: 'tenantA'  // If multi-tenancy is enabled, specify the tenant to which the object will be added.
  });

// Flush
await batcher5.do();
// highlight-end
// END BasicBatchImportExample

let result = await client.graphql.aggregate().withClassName(className).withFields('meta { count }').do();
assert.equal(result.data['Aggregate'][className][0].meta.count, 5);

await client.schema.classDeleter().withClassName(className).do();


// =======================================
// ===== Batch import with custom ID =====
// =======================================

// BatchImportWithIDExample
// highlight-start
import { generateUuid5 } from 'weaviate-ts-client';  // requires v1.3.2+
// highlight-end
className = 'YourName';  // Replace with your class name
dataObjs = [];
for (let i = 1; i <= 5; i++)
  dataObjs.push({ title: `Object ${i}` });  // Replace with your actual objects

// highlight-start
let batcherId = client.batch.objectsBatcher();
for (const dataObj of dataObjs)
  batcherId = batcherId.withObject({
    class: className,
    properties: dataObj,
    // highlight-start
    id: generateUuid5(dataObj.title),
    // highlight-end
  });

// Flush
await batcherId.do();
// END BatchImportWithIDExample

result = await client.graphql.aggregate().withClassName(className).withFields('meta { count }').do();
assert.equal(result.data['Aggregate'][className][0].meta.count, 5);
result = await client.graphql.get().withClassName(className).withFields('title _additional { id }').do();
for (const obj of result.data.Get[className])
  assert.equal(obj['_additional']['id'], generateUuid5(obj['title']));

await client.schema.classDeleter().withClassName(className).do();


// ===========================================
// ===== Batch import with custom vector =====
// ===========================================

// BatchImportWithVectorExample
className = 'YourName';  // Replace with your class name
dataObjs = [];
const vectors = [];
for (let i = 1; i <= 5; i++) {
  dataObjs.push({ title: `Object ${i}` });  // Replace with your actual objects
  vectors.push(Array(10).fill(0.25 + i / 100));  // Replace with your actual vectors
}

// highlight-start
let batcherVectors = client.batch.objectsBatcher();
for (let i = 0; i < 5; i++)
  batcherVectors = batcherVectors.withObject({
    class: className,
    properties: dataObjs[i],
    // highlight-start
    vector: vectors[i],
    // highlight-end
  });

// Flush
await batcherVectors.do();
// END BatchImportWithVectorExample

result = await client.graphql.aggregate().withClassName(className).withFields('meta { count }').do();
assert.equal(result.data['Aggregate'][className][0].meta.count, 5);
result = await client.graphql.get().withClassName(className).withFields('_additional { vector }').do();
for (const obj of result.data.Get[className]) {
  assert.ok(obj['_additional']['vector'][0] > 0.25);
  assert.ok(obj['_additional']['vector'][9] <= 0.3);
}

await client.schema.classDeleter().withClassName(className).do();


// ===========================================
// ===== Batch import with named vectors =====
// ===========================================


const classDefinitionNV = {
  class: 'YourCollection',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
    {
      name: 'body',
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
    body: {
      vectorIndexType: 'hnsw', // Set the index type
      vectorizer: {
        'text2vec-openai': {
          properties: ['body'], // Set the source property(ies)
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

// BatchImportWithNamedVectors
className = 'YourCollection';  // Replace with your class name
dataObjs = [];
const title_vectors = [];
const body_vectors = [];
for (let i = 1; i <= 5; i++) {
  dataObjs.push({ title: `Object ${i}`, body: `Body ${i}` });  // Replace with your actual objects
  title_vectors.push(Array(10).fill(0.25 + i / 100));  // Replace with your actual vectors
  body_vectors.push(Array(10).fill(0.25 + i / 100));  // Replace with your actual vectors
}

// highlight-start
let namedVectors = client.batch.objectsBatcher();
for (let i = 0; i < 5; i++)
  namedVectors = namedVectors.withObject({
    class: className,
    properties: dataObjs[i],
    // highlight-start
    vectors: {
      title: title_vectors[i],
      body: body_vectors[i]
    },
    // highlight-end
  });

// Flush
await namedVectors.do();
// END BatchImportWithNamedVectors

// Aggregate not working with named vectors as of 2024-02-28
// result = await client.graphql.aggregate().withClassName(className).withFields('meta { count }').do();
// assert.equal(result.data['Aggregate'][className][0].meta.count, 5);

result = await client.graphql.get().withClassName(className).withFields('_additional { vectors { title body } }').do();
for (const obj of result.data.Get[className]) {
  assert.ok(obj['_additional']['vectors']['title']);
  assert.ok(obj['_additional']['vectors']['body']);
}

await client.schema.classDeleter().withClassName(className).do();


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
result = await client.graphql.aggregate().withClassName('JeopardyQuestion').withFields('meta { count }').do();
assert.deepEqual(result.data['Aggregate']['JeopardyQuestion'], [{ meta: { count: MAX_ROWS_TO_IMPORT * 2 } }]);
const tokyoRose = await client.graphql.get().withClassName('JeopardyQuestion').withWhere({
  path: ['answer'],
  operator: 'Equal',
  valueText: 'Tokyo Rose',
}).withFields('answer').do();
assert.equal(tokyoRose.data.Get['JeopardyQuestion'].length, 2);
// End test

