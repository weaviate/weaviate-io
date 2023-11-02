// How-to: Manage data -> Read all objects - TypeScript examples
// run with: node --loader=ts-node/esm read-all-objects.ts
import assert from 'assert';

// CursorExample  // Retrieve data
import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';

const sourceClient = weaviate.client({
  scheme: 'https',
  host: 'some-endpoint.weaviate.network',  // Replace with your Weaviate URL
  apiKey: new ApiKey('YOUR-WEAVIATE-API-KEY'),  // If auth enabled. Replace w/ your Weaviate instance API key.
});

const batchSize = 20;
const className = 'WineReview';
const classProperties = ['title'];

async function getBatchWithCursor(
  client: WeaviateClient,
  className: string, classProperties: string[],
  batchSize: number, cursor?: string
): Promise<{ data: any }> {
  const query = client.graphql.get()
    .withClassName(className)
    // highlight-start
    // Optionally retrieve the vector embedding by adding `vector` to the _additional fields
    .withFields(classProperties.join(' ') + ' _additional { id vector }')
    // highlight-end
    .withLimit(batchSize);

  if (cursor) {
    return await query.withAfter(cursor).do();
  } else {
    return await query.do();
  }
}
// Use this function to retrieve data


// START FetchClassDefinition
const classDef = await sourceClient.schema.classGetter().withClassName(className).do();
// END FetchClassDefinition

// Restore to a new (target) instance
const targetClient = weaviate.client({
  scheme: 'https',
  host: 'anon-endpoint.weaviate.network',  // Replace with your endpoint
});

await targetClient.schema.classCreator().withClass(classDef).do();

// Finished restoring to the target instance  // END CursorExample

// ===== Tests - pre-population =====
let result = await targetClient.graphql.aggregate().withClassName('WineReview').withFields('meta { count }').do();
assert.deepEqual(result.data.Aggregate['WineReview'], [{ meta: { count: 0 } }]);
// ===== END Tests - pre-population =====

let aggregateCount = 0;

// Restore to a new (target) instance  // CursorExample
let targetBatcher = targetClient.batch.objectsBatcher();
let results, cursor;

// Batch import all objects to the target instance
while (true) {
  // From the SOURCE instance, get the next group of objects
  results = await getBatchWithCursor(sourceClient, className, classProperties, batchSize, cursor);

  // If empty, we're finished
  if (results.data.Get[className].length === 0)
    break;

  // Otherwise, add the objects to the batch to be added to the target instance
  for (const retrievedObject of results.data.Get[className]) {
    const newObject = {};
    for (const prop of classProperties)
      newObject[prop] = retrievedObject[prop];
    targetBatcher = targetBatcher.withObject({
      class: className,
      properties: newObject,
      // highlight-start
      // Can update the vector if it was included in _additional above
      vector: retrievedObject['_additional']['vector'],
      // highlight-end
    });

    // When the batch counter reaches batchSize, push the objects to Weaviate
    if (++aggregateCount % batchSize === 0) {
      console.log(`Imported ${aggregateCount} objects...`);

      // Flush the batch queue and restart it
      const response = await targetBatcher.do();
      targetBatcher = targetClient.batch.objectsBatcher();

      // Handle errors
      for (const r of response)
        if (r.result.errors)
          throw r.result.errors;
    }
  }

  // Update the cursor to the id of the last retrieved object
  cursor = results.data.Get[className].at(-1)['_additional']['id'];
}

// Flush any remaining objects
if (targetBatcher.payload().objects.length > 0)
  await targetBatcher.do();
// Finished restoring to the target instance  // END CursorExample

// ===== Tests - post-population =====
result = await targetClient.graphql.aggregate().withClassName('WineReview').withFields('meta { count }').do();
assert.deepEqual(result.data.Aggregate['WineReview'], [{ meta: { count: aggregateCount } }]);
// ===== END Tests - post-population =====
