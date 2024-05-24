// How-to: Manage data -> Delete objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.delete.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCS(
  process.env.WCS_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCS_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 } 
)

const collectionName = 'EphemeralObject';
const myCollection = client.collections.get('EphemeralObject')
let result;
let resposne


// =========================
// ===== Delete object =====
// =========================

// START DeleteObject
let idToDelete = '...';  // replace with the id of the object you want to delete
// END DeleteObject

// result = await client.data
//   .creator()
//   .withClassName('EphemeralObject')
//   .withProperties({
//     name: 'EphemeralObjectA',
//   })
//   .do();


result = await myCollection.data.insert({
  name: 'EphemeralObjectA'
})

idToDelete = result;

// START DeleteObject

    
await myCollection.data.deleteById(idToDelete)
// END DeleteObject

// Test
try {
  // result = await client.data.getterById().withClassName(className).withId(idToDelete).do();
  result = await myCollection.query.fetchObjectById(idToDelete)
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
  await myCollection.data.deleteById(idToDelete)
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
  await myCollection.data.insert({
    name: 'EphemeralObjectA' + i.toString(),
  })

// START DryRun
// const myCollection = client.collections.get('EphemeralObject')

result = await myCollection.data.deleteMany(
  myCollection.filter.byProperty('name').like('EphemeralObject'),
  {
    dryRun: true,
    verbose: true
  }
)

console.log(result);
// END DryRun


// ========================
// ===== Batch delete =====
// ========================

// START DeleteBatch
// const myCollection = client.collections.get('EphemeralObject')

// highlight-start
result = await myCollection.data.deleteMany(
  myCollection.filter.byProperty('name').like('Movie')
)
// highlight-end
// END DeleteBatch

// Test
// assert.equal(response.results.matches, N);
assert.equal(result.matches, N); //fix

// const leftovers = await client.graphql.get()
//   .withClassName(className)
//   .withFields('name')
//   .withWhere({
//     path: ['name'],
//     operator: 'Like',
//     valueText: 'EphemeralObject*',
//   }).do();

const leftovers = await myCollection.data.deleteMany(
    myCollection.filter.byProperty('name').like('EphemeralObject*')
  )

assert.equal(leftovers?.matches, 0);

// =====================================
// ===== Batch delete with Contain =====
// =====================================


// START DeleteContain
// const myCollection = client.collections.get('EphemeralObject')

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
// const myCollection = client.collections.get('EphemeralObject')
const idList = new Array

result = await myCollection.query.fetchObjects({
  limit: 2
})

for (let objectId of result.objects) {
  idList.push(objectId.uuid)
}

await myCollection.data.deleteMany(
  myCollection.filter.byId().containsAny(idList)
)
// END DeleteByIDBatch
