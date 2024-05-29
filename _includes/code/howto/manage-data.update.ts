// How-to: Manage data -> Update objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.update.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate, { WeaviateClient } from 'weaviate-client';

const client = await weaviate.connectToWCD(
  'WEAVIATE_INSTANCE_URL',  // Replace WEAVIATE_INSTANCE_URL with your instance URL
 {
   authCredentials: new weaviate.ApiKey('api-key'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)

const collectionName = 'JeopardyQuestion';

// UpdateProps START // Replace START
const myCollection = client.collections.get('JeopardyQuestion') 
// UpdateProps END // Replace END

// ============================
// ===== Define the class =====
// ============================

const collectionDefinition = {
  name: 'JeopardyQuestion',
  description: 'A Jeopardy! question',
  vectorizers: weaviate.configure.vectorizer.text2VecCohere(),
};

// Clean slate
try {
  await client.collections.delete(collectionName)
} catch {
  // Ignore error if class didn't exist
} finally {
  await client.collections.create(collectionDefinition)
}


// =============================
// ===== Update properties =====
// =============================
{
// UpdateProps START
// highlight-start
const response = await myCollection.data.update({
  id: 'ed89d9e7-4c9d-4a6a-8d20-095cb0026f54',
  properties: {
    'points': 100,
  },
})
// highlight-end

console.log(response)
// UpdateProps END
}
// Test
// result = await client.data.getterById().withId(id).withClassName(className).do();
// assert.equal(result.properties['points'], 100);
// assert.equal(result.properties['question'], 'Test question');  // make sure we didn't REPLACE the object


// =========================
// ===== Update vector =====
// =========================
{
// UpdateVector START
const jeopardy = await client.collections.get('Jeopardy')
const response = await jeopardy.data.update({
  id: 'ed89d9e7-4c9d-4a6a-8d20-095cb0026f54',
  // highlight-start
  vectors: Array(1536).fill(0.12345), // new vector value
  // highlight-end
})

console.log(response)
// UpdateVector END
}

// ==========================
// ===== Replace object =====
// ==========================

// Replace START
// highlight-start
const response = await myCollection.data.replace({
  // highlight-end
  id: 'ed89d9e7-4c9d-4a6a-8d20-095cb0026f54',
  // highlight-start
  properties: {
    'answer': 'Replaced',
    // The other properties will be deleted
  },
  // highlight-end
})

console.log(response)
// Replace END

// Test
// result = await client.data.getterById().withId(id).withClassName(className).do();
// assert.deepEqual(result.properties, { answer: 'Replaced' });  // ensure the other props were deleted


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
  
    result = await collection.data.replace({
      id: uuidToUpdate,
      properties: propertiesToUpdate
    })
  }
}
  
let id = 'ed89d9e7-4c9d-4a6a-8d20-095cb0026f54'
deleteProperties(client, id, 'JeopardyQuestion', ['answer'])
// DelProps END

// Test
// result = await client.data.getterById().withId(id).withClassName(className).do();
// assert.deepEqual(result.properties, {});
