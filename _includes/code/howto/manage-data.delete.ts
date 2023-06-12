// How-to: Manage data -> Delete objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.delete.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',  // Replace with your Weaviate URL
  // apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),  // If auth is on. Replace w/ your Weaviate instance API key.
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY,  // Replace w/ your OPENAI API key
  },
});

const className = 'EphemeralObject';
let result;


// =========================
// ===== Delete object =====
// =========================

// START DeleteObject
let id = '...';  // replace with the id of the object you want to delete
// END DeleteObject

result = await client.data
  .creator()
  .withClassName('EphemeralObject')
  .withProperties({
    name: 'Goodbye Cruel World',
  })
  .do();

id = result.id;

// START DeleteObject

try {
  const status = await client.data
    .deleter()
    .withClassName('EphemeralObject')
    .withId(id)
    .do();
  // Returns undefined on success
  // END DeleteObject
  assert.equal(status, undefined);
  // START DeleteObject
} catch (e) {
  // 404 error if the id was not found
  console.error(e);
  // END DeleteObject
  assert.equal(e, null);  // execution should not reach this point
  // START DeleteObject
}
// END DeleteObject

// Test
try {
  result = await client.data.getterById().withClassName(className).withId(id).do();
  assert.equal(result, null);  // execution should not reach this point
} catch (e) {
  // This 404 error is EXPECTED, because the object was deleted
  // TODO: this behavior is inconsistent with the Python client, which returns None
  assert(e.message.includes(404));  // TODO: this should be a proper code - https://github.com/weaviate/weaviate/issues/2708#issuecomment-1582430931
}
