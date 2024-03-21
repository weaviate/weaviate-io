import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'anon-endpoint.weaviate.network',
});

const sfId = '00ff6900-e64f-5d94-90db-c8cfa3fc851b';
const usCitiesId = '20ffc68d-986b-5e71-a680-228dba18d7ef';
const museumsId = 'fec50326-dfa1-53c9-90e8-63d0240bd933';

async function delProp(uuid: string, propName: string, className: string) {
  const objectData = await client.data.getterById().withId(uuid).withClassName(className).do();
  if (propName in objectData.properties)
    delete objectData.properties[propName];
  // Works even though "updater" semantics should only update the specified fields, and [propName] will be missing;
  // i.e. there's no client.data_object.replace equivalent in the TypeScript client. Waiting on response from Parker.
  // From https://weaviate-python-client.readthedocs.io/en/stable/weaviate.data.html#weaviate.data.DataObject.update:
  // "Overwrites only the specified fields, the unspecified ones remain unchanged." TODO rm
  await client.data.updater().withId(uuid).withClassName(className).withProperties(objectData.properties).do();
}

/* Use the Python example to load the data. Left this TS stub code here in case we want to show that part.
import jeopardy1k from './jeopardy_1k.json' assert { type: 'json' };

const categories = new Set(jeopardy1k.map(q => q.Category));

const jeopardyCategoryClass = {
  class: 'JeopardyCategory',
  description: 'A Jeopardy! category',
};
const jeopardyQuestionClass = {
  class: 'JeopardyQuestion',
  description: 'A Jeopardy! question',
  properties: [
    { name: 'question' , dataType: ['text'] },
    { name: 'answer', dataType: ['text'] },
    {
      name: 'hasCategory',
      dataType: ['JeopardyCategory'],
      description: 'The category of the question',
    },
  ],
  vectorizer: 'text2vec-openai',
};

await client
  .schema
  .classCreator()
  .withClass(jeopardyCategoryClass)
  .withClass(jeopardyQuestionClass)
  .do();

// Import the categories

// Import the questions
*/


// =================================
// ===== ObjectWithCrossRef =====
// =================================

let response;
const obj_uuid = 'f7344d30-7fe4-54dd-a233-fcccd4379d5c'

// Delete the object if it exists
try {
  await client.data.deleter().withId(obj_uuid).do();
} catch (e) {
  console.log('Object not found, skipping deletion.');
}

// ObjectWithCrossRef
response = await client.data
  .creator()
  .withClassName('JeopardyQuestion')
  .withId('f7344d30-7fe4-54dd-a233-fcccd4379d5c')
  .withProperties({
    'question': 'What tooling helps make Weaviate scalable?',
    'answer': 'Sharding, multi-tenancy, and replication',
    'hasCategory': [{  // Specify one or more cross-references
      'beacon': 'weaviate://localhost/583876f3-e293-5b5b-9839-03f455f14575',
    }],
  })
  .do();
console.log(JSON.stringify(response, null, 2));
// END ObjectWithCrossRef

// Test
let q_obj = await client.data.getterById().withClassName('JeopardyQuestion').withId(obj_uuid).do();
assert.equal(q_obj.class, 'JeopardyQuestion');
assert((q_obj.properties['hasCategory'] as object[]).find(xref => xref['href'] === `/v1/objects/JeopardyCategory/583876f3-e293-5b5b-9839-03f455f14575`));
// End test


// =================================
// ===== Add one-way cross-ref =====
// =================================

// OneWay TS
await client.data
  .referenceCreator()
  .withClassName('JeopardyQuestion').withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
  .withReferenceProperty('hasCategory')
  .withReference(
    client.data
      .referencePayloadBuilder()
      .withClassName('JeopardyCategory')
      .withId('20ffc68d-986b-5e71-a680-228dba18d7ef')
      .payload()
  )
  .do();
// END OneWay TS

// Test
let sf = await client.data.getterById().withClassName('JeopardyQuestion').withId(sfId).do();
assert.equal(sf.class, 'JeopardyQuestion');
assert((sf.properties['hasCategory'] as object[]).find(xref => xref['href'] === `/v1/objects/JeopardyCategory/${usCitiesId}`));
// End test


// =======================================
// ===== Add bidirectional cross-ref =====
// =======================================

// Delete any existing cross-references from the source and target objects
await delProp(sfId, 'hasCategory', 'JeopardyQuestion');
await delProp(usCitiesId, 'hasQuestion', 'JeopardyCategory');


// START Collections TwoWay Category1
const jeopardyCategoryClass = {
  class: 'JeopardyCategory',
};

await client
  .schema
  .classCreator()
  .withClass(jeopardyCategoryClass)
  .do();
// END Collections TwoWay Category1

// START Collections TwoWay Question
const jeopardyQuestionClass = {
  class: 'JeopardyQuestion',
  description: 'A Jeopardy! question',
  properties: [
    { name: 'question' , dataType: ['text'] },
    { name: 'answer', dataType: ['text'] },
    {
      name: 'hasCategory',
      dataType: ['JeopardyCategory'],
      description: 'The category of the question',
    },
  ],
  vectorizer: 'text2vec-openai',
};

await client
  .schema
  .classCreator()
  .withClass(jeopardyQuestionClass)
  .do();
// END Collections TwoWay Question

// START Collections TwoWay Category2
// Add the "hasQuestion" cross-reference property to the JeopardyCategory class
await client.schema
  .propertyCreator()
  .withClassName('JeopardyCategory')
  .withProperty({
    name: 'hasQuestion',
    dataType: ['JeopardyQuestion'],
  })
  .do();
// END Collections TwoWay Category2


// TwoWay TS
// For the "San Francisco" JeopardyQuestion object, add a cross-reference to the "U.S. CITIES" JeopardyCategory object
await client.data
  .referenceCreator()
  .withClassName('JeopardyQuestion').withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
  .withReferenceProperty('hasCategory')
  .withReference(
    client.data
      .referencePayloadBuilder()
      .withClassName('JeopardyCategory')
      .withId('20ffc68d-986b-5e71-a680-228dba18d7ef')
      .payload()
  )
  .do();

// For the "U.S. CITIES" JeopardyCategory object, add a cross-reference to "San Francisco"
await client.data
  .referenceCreator()
  .withClassName('JeopardyCategory').withId('20ffc68d-986b-5e71-a680-228dba18d7ef')
  .withReferenceProperty('hasQuestion')
  .withReference(
    client.data
      .referencePayloadBuilder()
      .withClassName('JeopardyQuestion')
      .withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
      .payload()
  )
  .do();
// END TwoWay TS

// Test
sf = await client.data.getterById().withClassName('JeopardyQuestion').withId(sfId).do();
const usCities = await client.data.getterById().withClassName('JeopardyCategory').withId(usCitiesId).do();
assert.equal(sf.class, 'JeopardyQuestion');
assert.equal(usCities.class, 'JeopardyCategory');
assert((sf.properties['hasCategory'] as object[]).find(xref => xref['href'] === `/v1/objects/JeopardyCategory/${usCitiesId}`));
assert((usCities.properties['hasQuestion'] as object[]).find(xref => xref['href'] === `/v1/objects/JeopardyQuestion/${sfId}`));
// End test


// ===================================
// ===== Add multiple cross-refs =====
// ===================================

// Delete any existing cross-references from the source object
await delProp(sfId, 'hasCategory', 'JeopardyQuestion');

// Multiple TS
// Add to "San Francisco" the "U.S. CITIES" category
await client.data
  .referenceCreator()
  .withClassName('JeopardyQuestion').withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
  .withReferenceProperty('hasCategory')
  .withReference(
    client.data
      .referencePayloadBuilder()
      .withClassName('JeopardyCategory')
      .withId('20ffc68d-986b-5e71-a680-228dba18d7ef')
      .payload()
  )
  .do();

// Add the "MUSEUMS" category as well
await client.data
  .referenceCreator()
  .withClassName('JeopardyQuestion').withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
  .withReferenceProperty('hasCategory')
  .withReference(
    client.data
      .referencePayloadBuilder()
      .withClassName('JeopardyCategory')
      .withId('fec50326-dfa1-53c9-90e8-63d0240bd933')
      .payload()
  )
  .withConsistencyLevel('ALL')
  .do();
// END Multiple TS

// Test
sf = await client.data.getterById().withClassName('JeopardyQuestion').withId(sfId).do();
assert.equal(sf.class, 'JeopardyQuestion');
// .withConsistencyLevel('ALL') above prevents test flakiness
assert((sf.properties['hasCategory'] as object[]).find(xref => xref['href'] === `/v1/objects/JeopardyCategory/${usCitiesId}`));
assert((sf.properties['hasCategory'] as object[]).find(xref => xref['href'] === `/v1/objects/JeopardyCategory/${museumsId}`));
// End test

// =============================
// ===== Delete cross-refs =====
// =============================

// Delete TS
// From the "San Francisco" JeopardyQuestion object, delete the "MUSEUMS" category cross-reference
await client.data
  .referenceDeleter()
  .withClassName('JeopardyQuestion').withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
  .withReferenceProperty('hasCategory')
  .withReference(
    client.data
      .referencePayloadBuilder()
      .withClassName('JeopardyCategory')
      .withId('fec50326-dfa1-53c9-90e8-63d0240bd933')
      .payload()
  )
  .do();
// END Delete TS

// Test
sf = await client.data.getterById().withClassName('JeopardyQuestion').withId(sfId).do();
console.log(JSON.stringify(sf, null, 2));
assert.equal(sf.class, 'JeopardyQuestion');
assert.deepEqual(sf.properties['hasCategory'], [{
  beacon: `weaviate://localhost/JeopardyCategory/${usCitiesId}`,
  href: `/v1/objects/JeopardyCategory/${usCitiesId}`,
}]);
// End test

// =============================
// ===== Update cross-refs =====
// =============================

// Update TS
// In the "San Francisco" JeopardyQuestion object, set the "hasCategory" cross-reference only to "MUSEUMS"
await client.data
  .referenceReplacer()
  .withClassName('JeopardyQuestion').withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
  .withReferenceProperty('hasCategory')
  .withReferences([
    client.data
      .referencePayloadBuilder()
      .withClassName('JeopardyCategory')
      .withId('fec50326-dfa1-53c9-90e8-63d0240bd933')
      .payload(),
  ])
  .do();
// END Update TS

// Test
sf = await client.data.getterById().withClassName('JeopardyQuestion').withId(sfId).do();
console.log(JSON.stringify(sf, null, 2));
assert.equal(sf.class, 'JeopardyQuestion');
assert.deepEqual(sf.properties['hasCategory'], [{
  beacon: `weaviate://localhost/JeopardyCategory/${museumsId}`,
  href: `/v1/objects/JeopardyCategory/${museumsId}`,
}]);
// End test
