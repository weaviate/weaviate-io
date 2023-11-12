// How-to: Manage-data -> Classes - TypeScript examples
// run with: node --loader=ts-node/esm FILENAME.ts
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

// START CreateCollection  // START ReadOneCollection  // START UpdateCollection
const className = 'Article';

// END CreateCollection  // END ReadOneCollection  // END UpdateCollection

// ================================
// ===== CREATE A CLASS =====
// ================================

// Clean slate
try {
  await client.schema.classDeleter().withClassName(className).do();
} catch (e) {
  // ignore error if class doesn't exist
}

// START CreateCollection
const emptyClassDefinition = {
  class: className,
};

// Add the class to the schema
let result = await client
  .schema
  .classCreator()
  .withClass(emptyClassDefinition)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END CreateCollection

// Test
console.assert('invertedIndexConfig' in result);

// ================================
// ===== READ A CLASS =====
// ================================

// START ReadOneCollection
let classDefinition = await client
  .schema
  .classGetter()
  .withClassName(className)
  .do();

console.log(JSON.stringify(classDefinition, null, 2));
// END ReadOneCollection

// ================================
// ===== READ A CLASS =====
// ================================

// START ReadAllCollections
let allClassDefinitions = await client
  .schema
  .getter()
  .do();

console.log(JSON.stringify(allClassDefinitions, null, 2));
// END ReadAllCollections


// ================================
// ===== UPDATE A CLASS =====
// ================================

// Clean slate
try {
    await client.schema.classDeleter().withClassName(className).do();
  } catch (e) {
    // ignore error if class doesn't exist
  }

// START UpdateCollection
// Define and create a class
const originalClassObj = {
    'class': className,
    'vectorIndexConfig': {
        'distance': 'cosine'  // Note the distance metric
    }
}

// Add the class to the schema
let originalClassResponse = await client
  .schema
  .classCreator()
  .withClass(originalClassObj)
  .do();

const UpdateCollectionObj = {
    'class': className,
    'vectorIndexConfig': {
        'distance': 'dot'  // Note the distance metric
    }
}

// Update the class definition
// Not yet available in TS
