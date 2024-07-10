// Blog: 2023-06-06, embedded-local-weaviate
// run with: node --loader=ts-node/esm embedded.ts
// START 10lines  // START TestExample
import weaviate, { EmbeddedOptions } from 'weaviate-ts-embedded';

const client = weaviate.client(new EmbeddedOptions(
  // END 10lines  // START TestExample
  {
    env: {
      'OPENAI_APIKEY': 'YOUR-OPENAI-API-KEY',
    },
  }
  // END TestExample  // START 10lines
));

await client.embedded.start();

const createdObject = await client.data
  .creator()
  .withClassName('MyClass')
  .withProperties({
    hello: 'World!',
  })
  .do();

console.log(JSON.stringify(createdObject, null, 2));

// END 10lines

// Test
import assert from 'assert';
assert.equal(createdObject?.properties?.['hello'], 'World!');

// START TestExample

await client.schema.classCreator().withClass({
  class: 'Wine',
  vectorizer: 'text2vec-openai',
}).do();

await client.data.creator()
  .withClassName('Wine')
  .withProperties({
    name: 'Chardonnay',
    review: 'Goes well with fish!',
  })
  .do();

const response = await client.graphql
  .get()
  .withClassName('Wine')
  .withNearText({
    concepts: ['great for seafood'],
  })
  .withFields('name review')
  .do();

test('Test nearText', function () {
  assert.equal(
    response.data.Get['Wine'][0]['review'],
    'Goes well with fish!'
  );
});

// END TestExample  // START 10lines  // START TestExample
await client.embedded.stop();
// END 10lines  // END TestExample
