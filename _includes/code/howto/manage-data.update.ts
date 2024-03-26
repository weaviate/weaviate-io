// How-to: Manage data -> Update objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.update.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate, { WeaviateClient } from 'weaviate-client';

const client = await weaviate.connectToWCS(
  'some-endpoint.weaviate.network',
 {
   authCredentials: new weaviate.ApiKey('api-key'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)

const className = 'JeopardyQuestion';
let result;

// ============================
// ===== Define the class =====
// ============================

const classDefinition = {
  class: 'JeopardyQuestion',
  description: 'A Jeopardy! question',
  vectorizer: 'text2vec-openai',
};

// Clean slate
try {
  await client.schema.classDeleter().withClassName(className).do();
} catch {
  // Ignore error if class didn't exist
} finally {
  await client.schema.classCreator().withClass(classDefinition).do();
}


// =============================
// ===== Update properties =====
// =============================

result = await client.data
  .creator()
  .withClassName('JeopardyQuestion')
  .withProperties({
    question: 'Test question',
    answer: 'Test answer',
    points: -1,
  })
  .do();

// UpdateProps START
const myCollection = client.collections.get('JeopardyQuestion') 
let id = '...'

const response = await myCollection.data.update({
  id: id,
  properties: {
    'points': 100,
  },
})

console.log(response)
// UpdateProps END

// Test
result = await client.data.getterById().withId(id).withClassName(className).do();
assert.equal(result.properties['points'], 100);
assert.equal(result.properties['question'], 'Test question');  // make sure we didn't REPLACE the object


// =========================
// ===== Update vector =====
// =========================
// UpdateVector START
// Vote for the feature - https://github.com/weaviate/typescript-client/issues/64
// UpdateVector END


// ==========================
// ===== Replace object =====
// ==========================

// Replace START
const myCollection = client.collections.get('JeopardyQuestion') 
let id = '...'

const response = await myCollection.data.replace({
  id: id,
  properties: {
    'answer': 'Replaced',
    // The other properties will be deleted
  },
})

console.log(response)
// Replace END

// Test
result = await client.data.getterById().withId(id).withClassName(className).do();
assert.deepEqual(result.properties, { answer: 'Replaced' });  // ensure the other props were deleted


// =============================
// ===== Delete properties =====
// =============================

// DelProps START
async function deleteProperties(client: WeaviateClient, uuidToUpdate: string, collectionName: string, propNames: string[]) {
  const collection = client.collections.get(collectionName);
  const objectData = await collection.query.fetchObjectById(uuidToUpdate);
  const propertiesToUpdate = objectData?.properties;
  
  if (propertiesToUpdate) {
    for (let propName of propNames) {
        if (propName in propertiesToUpdate) {
          delete propertiesToUpdate[propName];
        }
    }
  
    const response = await collection.data.replace({
      id: uuidToUpdate,
      properties: propertiesToUpdate
    })
  }
}
  
let id = '...'
deleteProperties(client, id, 'JeopardyQuestion', ['answer'])
// DelProps END

// Test
result = await client.data.getterById().withId(id).withClassName(className).do();
assert.deepEqual(result.properties, {});
