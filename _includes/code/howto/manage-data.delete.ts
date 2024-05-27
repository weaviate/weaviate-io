// How-to: Manage data -> Delete objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.delete.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCD(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 } 
)

const collectionName = 'EphemeralObject';
// START DryRun // START DeleteBatch // START DeleteByIDBatch // START DeleteContain
let result;
const myCollection = client.collections.get('EphemeralObject')
// END DryRun // END DeleteBatch // END DeleteByIDBatch // END DeleteContain


// =========================
// ===== Delete object =====
// =========================

// START DeleteObject
let idToDelete = '...';  // replace with the id of the object you want to delete
// END DeleteObject

result = await myCollection.data.insert({
  name: 'EphemeralObjectA'
})

idToDelete = result;

// START DeleteObject

await myCollection.data.deleteById(idToDelete)
// END DeleteObject

// Test
try {
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

// highlight-start
result = await myCollection.data.deleteMany(
  myCollection.filter.byProperty('name').like('Movie')
)
// highlight-end
// END DeleteBatch

// Test
assert.equal(result.matches, 0);
// assert.equal(result.matches, N); //fix

const leftovers = await myCollection.data.deleteMany(
    myCollection.filter.byProperty('name').like('EphemeralObject*')
  )

assert.equal(leftovers?.matches, N);

// =====================================
// ===== Batch delete with Contain =====
// =====================================


// START DeleteContain

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
