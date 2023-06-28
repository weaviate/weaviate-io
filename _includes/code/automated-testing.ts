// Blog: Automated testing for Weaviate applications - TypeScript code
// run with: node --loader=ts-node/esm --experimental-specifier-resolution=node automated-testing.ts
import assert from 'assert';
const MAX_ROWS_TO_IMPORT = 50;  // limit vectorization calls

// START JSON streaming
import weaviate, { EmbeddedOptions } from 'weaviate-ts-embedded';
import fs from 'fs';
import parser from 'stream-json';
import StreamArray from 'stream-json/streamers/StreamArray';
import Chain from 'stream-chain';

const client = weaviate.client(new EmbeddedOptions(
  {
    env: {
      'OPENAI_APIKEY': process.env['OPENAI_API_KEY'],
    },
  }
));


// ============================
// ===== Define the class =====
// ============================
const className = 'JeopardyQuestion';
const classDefinition = {
  class: className,
  description: 'A Jeopardy! question',
  vectorizer: 'text2vec-openai',
};

// Clean slate for local testing (GitHub Actions VMs start fresh) because Weaviate data is persisted in embedded mode.
try {
  await client.schema.classDeleter().withClassName(className).do();
} catch {
  // ignore error if class doesn't exist
} finally {
  await client.schema.classCreator().withClass(classDefinition).do();
}


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
    class: className,
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

async function importJson(filePath) {
  const pipeline = new Chain([
    fs.createReadStream(filePath),
    parser(),
    new StreamArray(),
  ]);

  for await (const { value } of pipeline) {
    await addObject(value);
    if (counter >= MAX_ROWS_TO_IMPORT)
      return;
  }
}

await importJson('jeopardy_1k.json');

// Flush any remaining objects
if (batcher.payload().objects.length > 0)
  await batcher.do();

console.log(`Finished importing ${counter} articles.`);
// END JSON streaming

// Test all objects were imported
const result = await client.graphql.aggregate().withClassName(className).withFields('meta { count }').do();
assert.deepEqual(result.data['Aggregate'][className], [{ meta: { count: MAX_ROWS_TO_IMPORT } }]);

// Export all objects
const classPropertiesToExport = 'question answer';
let cursor;
while (true) {
  // From the SOURCE instance, get the next group of objects
  let query = client.graphql.get()
    .withClassName(className)
    // Retrieve the id (cursor) and the vector embedding by adding them to the _additional fields
    .withFields(classPropertiesToExport + ' _additional { id vector }')
    .withLimit(batchSize);

  if (cursor)
    query = query.withAfter(cursor);

  const results = await query.do();

  // If empty, we're finished
  if (results.data.Get[className].length === 0)
    break;

  // TODO: append to JSON/CSV
  console.log(results);

  // Update the cursor to the id of the last retrieved object
  cursor = results.data.Get[className].at(-1)['_additional']['id'];
}

await client.embedded.stop();
