// Blog: 2023-06-06, embedded-local-weaviate
// run with: node --loader=ts-node/esm embedded.ts
import assert from 'assert';

// START example
import weaviate, { EmbeddedOptions } from 'weaviate-ts-embedded';

const client = weaviate.client(new EmbeddedOptions());

await client.embedded.start();

const createdObject = await client.data
  .creator()
  .withClassName('MyClass')
  .withProperties({
    hello: 'World!',
  })
  .do();

console.log(JSON.stringify(createdObject, null, 2));

await client.embedded.stop();
// END example

// Test
assert.equal(createdObject.properties['hello'], 'World!');
