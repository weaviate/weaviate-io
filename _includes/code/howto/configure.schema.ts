// How-to: Configure -> Schema - TypeScript examples
// run with: node --loader=ts-node/esm configure.schema.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  headers: {
    'X-OpenAI-Api-Key': process.env['OPENAI_API_KEY'],
  },
});

const className = 'Article';

// Clean slate
try {
  await client.schema.classDeleter().withClassName(className).do();
} catch (e) {
  // ignore error if class doesn't exist
}

// START CreateClass
const emptyClassDefinition = {
  class: 'Article',
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

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();

// START PropertyDefinition
const classWithProps = {
  class: 'Article',
  // highlight-start
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
    {
      name: 'body',
      dataType: ['text'],
    },
  ],
  // highlight-end
};

// Add the class to the schema
result = await client
  .schema
  .classCreator()
  .withClass(classWithProps)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END PropertyDefinition

// Test
assert('invertedIndexConfig' in result);

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();

// START Vectorizer
const classWithVectorizer = {
  class: 'Article',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
  ],
  // highlight-start
  vectorizer: 'text2vec-openai',  // this could be any vectorizer
  // highlight-end
};

// Add the class to the schema
result = await client
  .schema
  .classCreator()
  .withClass(classWithVectorizer)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END Vectorizer

// Test
assert.equal(result['vectorizer'], 'text2vec-openai');
assert.equal(result['properties'].length, 1);  // no 'body' from the previous example

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();


// START ModuleSettings
const classWithModuleSettings = {
  class: 'Article',
  properties: [
    {
      name: 'title',
      dataType: ['text'],
    },
  ],
  vectorizer: 'text2vec-cohere',  // this could be any vectorizer
  // highlight-start
  moduleConfig: {
    'text2vec-cohere': {  // this must match the vectorizer used
      vectorizeClassName: true,
      model: 'embed-multilingual-v2.0',
    },
  },
  // highlight-end
};

// Add the class to the schema
result = await client
  .schema
  .classCreator()
  .withClass(classWithModuleSettings)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END ModuleSettings

// Test
assert.equal(result.vectorizer, 'text2vec-cohere');
assert.equal(result.moduleConfig['text2vec-cohere']['model'], 'embed-multilingual-v2.0');

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();


// START PropModuleSettings
const classWithPropModuleSettings = {
  class: 'Article',
  vectorizer: 'text2vec-huggingface',  // this could be any vectorizer
  properties: [
    {
      name: 'title',
      dataType: ['text'],
      // highlight-start
      moduleConfig: {
        'text2vec-huggingface': {  // this must match the vectorizer used
          skip: false,
          vectorizePropertyName: false,
        },
      },
      // highlight-end
    },
  ],
};

// Add the class to the schema
result = await client
  .schema
  .classCreator()
  .withClass(classWithPropModuleSettings)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END PropModuleSettings

// Test
assert.equal(result.vectorizer, 'text2vec-huggingface');
assert.equal(result.properties[0].moduleConfig['text2vec-huggingface']['vectorizePropertyName'], false);

// Delete the class to recreate it
await client.schema.classDeleter().withClassName(className).do();


// START IndexReplicationSettings
const classWithIndexReplication = {
  class: 'Article',
  // highlight-start
  vectorIndexConfig: {
    distance: 'cosine',
  },
  replicationConfig: {
    factor: 3,
  },
  // highlight-end
};

// Add the class to the schema
result = await client
  .schema
  .classCreator()
  .withClass(classWithIndexReplication)
  .do();

// The returned value is the full class definition, showing all defaults
console.log(JSON.stringify(result, null, 2));
// END IndexReplicationSettings

// Test
assert.equal(result.replicationConfig.factor, 3);


// START AddProp
const prop = {
  name: 'body',
  dataType: ['text'],
};

const resultProp = await client
  .schema
  .propertyCreator()
  .withClassName('Article')
  .withProperty(prop)
  .do();

// The returned value is full property definition
console.log(JSON.stringify(resultProp, null, 2));
// END AddProp

// Test
assert.equal(resultProp.name, 'body');


// START ModifyParam
// Not available yet - https://github.com/weaviate/typescript-client/issues/64
// END ModifyParam


// START SchemaGet
const schema = await client
  .schema
  .getter()
  .do();

// The returned value is the entire schema
console.log(JSON.stringify(schema, null, 2));
// END SchemaGet

// Test
assert.equal(schema.classes[0].class, 'Article');
