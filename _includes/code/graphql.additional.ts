import weaviate, { ApiKey } from 'weaviate-ts-client';
import assert from 'assert';

const client = weaviate.client({
  scheme: 'https',
  host: 'edu-demo.weaviate.network',
  apiKey: new ApiKey('learn-weaviate'),
});


// ===================
// ===== Sorting =====
// ===================
// START Sorting
let results = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withSort([
    { path: ['answer'], order: 'asc' },
  ])
  // highlight-end
  .withFields('question answer')
  .withLimit(3)
  .do();

console.log(JSON.stringify(results, null, 2));
// END Sorting
assert.equal(results.data['Get']['JeopardyQuestion'][0]['answer'], '$5 (Lincoln Memorial in the background)');


// ==========================================
// ===== Sorting by multiple properties =====
// ==========================================
// START MultiplePropSorting
results = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withSort([
    { path: ['points'], order: 'desc' },
    { path: ['question'], order: 'asc' },
  ])
  // highlight-end
  .withFields('question answer points')
  .withLimit(3)
  .do();

console.log(JSON.stringify(results, null, 2));
// END MultiplePropSorting
assert.equal(results.data['Get']['JeopardyQuestion'][0]['points'], 10000);
assert(results.data['Get']['JeopardyQuestion'][0]['question'].startsWith('A flurry of ballerinas'));


// ===========================================
// ===== Sorting by _additional property =====
// ===========================================
// START AdditionalPropSorting
results = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withSort([{ path: ['_creationTimeUnix'] }])
  // highlight-end
  .withFields('question answer _additional { creationTimeUnix }')
  .withLimit(3)
  .do();

console.log(JSON.stringify(results, null, 2));
// END AdditionalPropSorting
assert('creationTimeUnix' in results['data']['Get']['JeopardyQuestion'][0]['_additional']);
