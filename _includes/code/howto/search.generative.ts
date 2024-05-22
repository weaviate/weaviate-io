// Howto: Search -> Generative search - TypeScript examples
// Run with: node --loader=ts-node/esm search.generative.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate from 'weaviate-client/node';

const client = await weaviate.connectToWCS(
  'https://hha2nvjsruetknc5vxwrwa.c0.europe-west2.gcp.weaviate.cloud/',
 {
   authCredentials: new weaviate.ApiKey('nMZuw1z1zVtnjkXXOMGx9Ows7YWGsakItdus'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 }
)

let result, generatePrompt, genResults;

// ===============================================
// ===== QUERY WITH TARGET VECTOR & nearText =====
// ===============================================

// NamedVectorNearText
const myCollection = client.collections.get('WineReviewNV');

result = await myCollection.generate.nearText(
  ['a sweet German white wine'],
  {
    singlePrompt: 'Translate this into German: {review_body}',
    groupedTask: 'Summarize these review',
  },
  {
    limit: 2,
    targetVector: 'title_country',
  }
);

console.log(result.generated);
for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(object.generated);
}
// END NamedVectorNearText

// Tests
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 2);

// =====================================
// ===== SINGLE GENERATIVE EXAMPLE =====
// =====================================

// SingleGenerative TS
const generatePrompt = `Convert this quiz question: {question} and answer: {answer} into a trivia tweet.`;

const myCollection = client.collections.get('JeopardyQuestion');
const result = await myCollection.generate.nearText(['World history'],{
    singlePrompt: generatePrompt,
  },{
    limit: 2,
    returnProperties: ['round'],
})

console.log(JSON.stringify(result.objects, null, 2));
// END SingleGenerative TS

// Tests
genResults = result.data.Get.JeopardyQuestion;
assert.equal(genResults.length, 2);
for (const g of genResults) {
  assert.equal(g._additional.generate.error, null);
  assert.equal(typeof g._additional.generate.singleResult, 'string');
}


// =====================================================
// ===== SINGLE GENERATIVE EXAMPLE WITH PROPERTIES =====
// =====================================================

// SingleGenerativeProperties TS
const generatePrompt = `Convert this quiz question: {question} and answer: {answer} into a trivia tweet.`;

const myCollection = client.collections.get('JeopardyQuestion');
const result = await myCollection.generate.nearText(['World history'],{
    singlePrompt: generatePrompt,
  },{
    limit: 2,
    returnProperties: ['round'],
})

console.log(JSON.stringify(result.objects, null, 2));
// END SingleGenerativeProperties TS

// Tests
genResults = result.data.Get.JeopardyQuestion;
assert.equal(genResults.length, 2);
for (const g of genResults) {
  assert.equal(g._additional.generate.error, null);
  assert.equal(typeof g._additional.generate.singleResult, 'string');
}

// ======================================
// ===== GROUPED GENERATIVE EXAMPLE =====
// ======================================

// GroupedGenerative TS
const generatePrompt = `What do these animals have in common, if anything?`;

const myCollection = client.collections.get('JeopardyQuestion');
const result = await myCollection.generate.nearText(['Cute animals'],{
 groupedTask: generatePrompt,
  },{
  limit: 3,
  returnProperties: ['points'],
})

console.log(JSON.stringify(result.generated, null, 2));
// END GroupedGenerative TS

// Tests
genResults = result.data.Get.JeopardyQuestion;
assert.equal(genResults.length, 3);
assert.equal(genResults[0]._additional.generate.error, null);
assert.equal(typeof genResults[0]._additional.generate.groupedResult, 'string');
for (const g of genResults.slice(1)) {
  assert.equal(g._additional.generate, null);
  assert.equal(typeof g.points, 'number');
}


// ======================================================
// ===== GROUPED GENERATIVE EXAMPLE WITH PROPERTIES =====
// ======================================================

// GroupedGenerativeProperties
const generatePrompt = `What do these animals have in common, if anything?`;

const myCollection = client.collections.get('JeopardyQuestion');
const result = await myCollection.generate.nearText(['Australian animals'],{
  groupedTask: generatePrompt,
  groupedProperties: ['answer', 'question'],
    },{
  limit: 3,
  returnProperties: ['points', 'question'],
})

console.log(JSON.stringify(result, null, 2));
// END GroupedGenerativeProperties

// Tests
genResults = result.data.Get.JeopardyQuestion;
assert.equal(genResults.length, 3);
assert.equal(genResults[0]._additional.generate.error, null);
assert.ok(genResults[0]._additional.generate.groupedResult.includes('Australia'));
for (const g of genResults.slice(1)) {
  assert.equal(g._additional.generate, null);
  assert.equal(typeof g.points, 'number');
  assert.equal(typeof g.question, 'string');
}
