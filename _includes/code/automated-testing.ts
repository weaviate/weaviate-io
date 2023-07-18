// Blog: Automated testing for Weaviate applications - TypeScript code
// run with: node --loader=ts-node/esm automated-testing.ts

// START Connect  // START ConnectAndCleanup
import weaviate, { EmbeddedOptions } from 'weaviate-ts-embedded';
import assert from 'assert';

// Instantiate the embedded Weaviate client and pass the OpenAI API key
const client = weaviate.client(new EmbeddedOptions(
  {
    env: {
      OPENAI_APIKEY: process.env['OPENAI_API_KEY'],
    },
  }
));

await client.embedded.start();
// Client is now ready to accept requests

const className = 'JeopardyQuestion';

// Clean slate for local testing (GitHub Actions VMs start fresh) because Weaviate data is persisted in embedded mode.
try {
  await client.schema.classDeleter().withClassName(className).do();
} catch {
  // ignore error if class doesn't exist
}
// Client connected and schema cleared


// Create the class
const classDefinition = {
  class: className,
  vectorizer: 'text2vec-openai',
};

// The return value is the class, as returned by client.schema.classGetter().withClassName(className).do();
const retrievedDefinition = await client.schema.classCreator().withClass(classDefinition).do();
// Test
assert.equal(retrievedDefinition.moduleConfig['text2vec-openai']['model'], 'ada');
// Class created successfully

// Import objects from the JSON file
import data from './jeopardy_100.json' assert { type: 'json' };

let batcher = client.batch.objectsBatcher();
let counter = 0;
const batchSize = 20;

async function addObject(obj: object): Promise<void> {
  // Add the object to the batch queue
  batcher = batcher.withObject({
    class: className,
    properties: {
      question: obj['Question'],
      answer: obj['Answer'],
    },
  });

  // When the batch counter reaches batchSize, push the objects to Weaviate
  if (++counter % batchSize === 0) {
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

for (const object of data) {
  await addObject(object);
}

// Flush any remaining objects
if (batcher.payload().objects.length > 0)
  await batcher.do();

console.log(`Finished importing ${counter} objects.`);

// Test all objects were imported
const result = await client.graphql.aggregate().withClassName(className).withFields('meta { count }').do();
assert.deepEqual(result.data['Aggregate'][className], [{ meta: { count: 100 } }]);
// Import completed successfully

// Run a test query
const results = await client.graphql
  .get()
  .withClassName(className)
  .withNearText({ concepts: ['chemistry'] })
  .withLimit(1)
  .withFields('question answer')
  .do();

// Test
assert(results.data.Get[className][0]['answer'].includes('sodium'));
// Query test completed

await client.embedded.stop();
// END all
