// How-to: Manage data -> Delete objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.delete.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-client';

const client = await weaviate.connectToWCS(
  'some-endpoint.weaviate.network',
 {
   authCredentials: new weaviate.ApiKey('api-key'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)

const className = 'EphemeralObject';
let result;


// =========================
// ===== Delete object =====
// =========================

// START DeleteObject
let idToDelete = '...';  // replace with the id of the object you want to delete
// END DeleteObject

result = await client.data
  .creator()
  .withClassName('EphemeralObject')
  .withProperties({
    name: 'EphemeralObjectA',
  })
  .do();

idToDelete = result.id;

// START DeleteObject

const myCollection = client.collections.get('EphemeralObject')
    
await myCollection.data.deleteById(idToDelete)
// END DeleteObject

// Test
try {
  result = await client.data.getterById().withClassName(className).withId(idToDelete).do();
  assert.equal(result, null);  // execution should not reach this point
} catch (e) {
  // This 404 error is EXPECTED, because the object was deleted
  // TODO: this behavior is inconsistent with the Python client, which returns None
  assert(e.message.includes(404));  // TODO: this should be a proper code - https://github.com/weaviate/weaviate/issues/2708#issuecomment-1582430931
}


// ==========================
// ===== Error handling =====
// ==========================

// START DeleteError
try {
  await client.data
    .deleter()
    .withClassName('EphemeralObject')
    .withId(idToDelete)
    .do();
  // Returns undefined on success
} catch (e) {
  // 404 error if the id was not found
  console.error(e);
  // END DeleteError
  assert(e.message.includes('404'));
  // START DeleteError
}
// END DeleteError


// ===================
// ===== Dry run =====
// ===================
const N = 5;
for (let i = 1; i <= N; i++)
  await client.data
    .creator()
    .withClassName(className)
    .withProperties({
      name: 'EphemeralObject' + i.toString(),
    })
    .do();

// START DryRun
const myCollection = client.collections.get('EphemeralObject')

const response = await myCollection.data.deleteMany(
  myCollection.filter.byProperty('name').like('EphemeralObject'),
  {
    dryRun: true,
    verbose: true
  }
)

console.log(response);
// END DryRun


// ========================
// ===== Batch delete =====
// ========================

// START DeleteBatch
const myCollection = client.collections.get('EphemeralObject')

// highlight-start
await myCollection.data.deleteMany(
  myCollection.filter.byProperty('name').like('EphemeralObject')
)
// highlight-end
// END DeleteBatch

// Test
assert.equal(response.results.matches, N);
const leftovers = await client.graphql.get()
  .withClassName(className)
  .withFields('name')
  .withWhere({
    path: ['name'],
    operator: 'Like',
    valueText: 'EphemeralObject*',
  }).do();
assert.equal(leftovers.data['Get'][className].length, 0);

// =====================================
// ===== Batch delete with Contain =====
// =====================================


// START DeleteContain
const myCollection = client.collections.get('EphemeralObject')

// highlight-start
await myCollection.data.deleteMany(
  myCollection.filter.byProperty('name').containsAny(['europe', 'asia'])
)
// highlight-end
// END DeleteContain

// ==============================
// ===== Batch delete by ID =====
// ==============================

// START DeleteByIDBatch
const myCollection = client.collections.get('EphemeralObject')
const idList = new Array

const response = await myCollection.query.fetchObjects({
  limit: 2
})

for (let objectId in response.objects) {
  idList.push(objectId)
}

await myCollection.data.deleteMany(
  myCollection.filter.byId().containsAny(idList)
)
// END DeleteByIDBatch
