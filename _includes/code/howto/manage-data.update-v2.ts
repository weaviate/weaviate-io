// How-to: Manage data -> Update objects - TypeScript examples
// run with: node --loader=ts-node/esm manage-data.update.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'anon-endpoint.weaviate.network',
  headers: {
    'X-OpenAI-Api-Key': process.env['OPENAI_API_KEY'],
  },
});

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
let id = '...';  // replace with the id of the object you want to update
// UpdateProps END
id = result.id;
// UpdateProps START
await client.data
  // highlight-start
  .merger()  // merges properties into the object
  // highlight-end
  .withId(id).withClassName('JeopardyQuestion')
  .withProperties({
    points: 100,
  })
  .do();
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
id = '...';  // the id of the object you want to replace
// Replace END
id = result.id;
// Replace START
await client.data
  // highlight-start
  .updater()  // replaces the entire object
  // highlight-end
  .withId(id).withClassName('JeopardyQuestion')
  .withProperties({
    answer: 'Replaced',
    // The other properties will be deleted
  })
  .do();
// Replace END

// Test
result = await client.data.getterById().withId(id).withClassName(className).do();
assert.deepEqual(result.properties, { answer: 'Replaced' });  // ensure the other props were deleted


// =============================
// ===== Delete properties =====
// =============================

// DelProps START
async function delProps(uuid: string, className: string, propNames: string[]) {
  const objectData = await client.data.getterById().withId(uuid).withClassName(className).do();
  for (const propName of propNames)
    if (propName in objectData.properties)
      delete objectData.properties[propName];
  // Replace the object
  return await client.data
    .updater()
    .withId(uuid).withClassName(className)
    .withProperties(objectData.properties)
    .do();
}

id = '...';  // replace with the id of the object you want to delete properties from
// DelProps END
id = result.id;
// DelProps START
await delProps(id, 'JeopardyQuestion', ['answer']);
// DelProps END

// Test
result = await client.data.getterById().withId(id).withClassName(className).do();
assert.deepEqual(result.properties, {});
