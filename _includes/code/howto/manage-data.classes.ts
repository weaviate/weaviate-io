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

// START CreateClass  // START ReadOneClass  // START UpdateClass
const className = 'Article';

// END CreateClass  // END ReadOneClass  // END UpdateClass

// ================================
// ===== CREATE A CLASS =====
// ================================

// Clean slate
try {
  await client.schema.classDeleter().withClassName(className).do();
} catch (e) {
  // ignore error if class doesn't exist
}

// START CreateClass
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
// END CreateClass

// Test
console.assert('invertedIndexConfig' in result);

// ================================
// ===== READ A CLASS =====
// ================================

// START ReadOneClass
let classDefinition = await client
  .schema
  .classGetter()
  .withClassName(className)
  .do();

console.log(JSON.stringify(classDefinition, null, 2));
// END ReadOneClass

// ================================
// ===== READ A CLASS =====
// ================================

// START ReadAllClasses
let allClassDefinitions = await client
  .schema
  .getter()
  .do();

console.log(JSON.stringify(allClassDefinitions, null, 2));
// END ReadAllClasses


// ================================
// ===== UPDATE A CLASS =====
// ================================

// Clean slate
try {
    await client.schema.classDeleter().withClassName(className).do();
  } catch (e) {
    // ignore error if class doesn't exist
  }

// START UpdateClass
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

const updateClassObj = {
    'class': className,
    'vectorIndexConfig': {
        'distance': 'dot'  // Note the distance metric
    }
}

// Update the class definition
// Not yet available in TS
