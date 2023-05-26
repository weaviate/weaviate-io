// How-to: Manage data -> Import objects - TypeScript examples
// run with: node --loader=ts-node/esm --experimental-specifier-resolution=node manage-data.imports.ts
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

// ===== Instantiation shown on snippet
const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',  // Replace with your Weaviate URL
  // Replace w/ your Weaviate instance API key. Delete if authentication is disabled.
  // apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),  // If auth is on. Replace w/ your Weaviate instance API key.
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY,  // Replace w/ your OPENAI API key
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
} catch { }
finally {
  await client.schema.classCreator().withClass(classDefinition).do();
}


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
    console.log(`Imported ${counter} articles...`);

    // Flush the batch queue and restart it
    const response = await batcher.do();
    batcher = client.batch.objectsBatcher();

    // Handle errors
    for (const r of response)
      if (r.result.errors)
        throw r.result.errors;
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
const result = await client.graphql.aggregate().withClassName('JeopardyQuestion').withFields('meta { count }').do();
assert.deepEqual(result.data['Aggregate']['JeopardyQuestion'], [{ meta: { count: MAX_ROWS_TO_IMPORT * 2 } }]);
const tokyoRose = await client.graphql.get().withClassName('JeopardyQuestion').withWhere({
  path: ['answer'],
  operator: 'Equal',
  valueText: 'Tokyo Rose',
}).withFields('answer').do();
assert.equal(tokyoRose.data.Get['JeopardyQuestion'].length, 2);
// End test
