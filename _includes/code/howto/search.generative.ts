// Howto: Search -> Generative search - TypeScript examples
// Run with: node --loader=ts-node/esm search.generative.ts
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

let genResults;

// START SingleGenerative TS // GroupedGenerativeProperties // GroupedGenerative TS // SingleGenerativeProperties TS
let result, generatePrompt;
const myCollection = client.collections.get('JeopardyQuestion');
// END SingleGenerative TS // END GroupedGenerativeProperties // END GroupedGenerative TS // END SingleGenerativeProperties TS


// ===============================================
// ===== QUERY WITH TARGET VECTOR & nearText =====
// ===============================================

// NamedVectorNearText
let NVResult;
const myNVCollection = client.collections.get('WineReviewNV');

NVResult = await myNVCollection.generate.nearText(
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

console.log(NVResult.generated);
for (let object of NVResult.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(object.generated);
}
// END NamedVectorNearText

// Tests
assert.deepEqual(result.objects.length, 2);

// =====================================
// ===== SINGLE GENERATIVE EXAMPLE =====
// =====================================

// START SingleGenerative TS

generatePrompt = `Convert this quiz question: {question} and answer: {answer} into a trivia tweet.`;

result = await myCollection.generate.nearText(['World history'],{
    singlePrompt: generatePrompt,
  },{
    limit: 2,
    returnProperties: ['round'],
})

console.log(JSON.stringify(result.objects, null, 2));
// END SingleGenerative TS

// Tests
genResults = result.objects;
assert.equal(genResults.length, 2);
for (const g of genResults) {
  console.log(g)
  assert.equal(typeof g.generated, 'string');
}


// =====================================================
// ===== SINGLE GENERATIVE EXAMPLE WITH PROPERTIES =====
// =====================================================

// SingleGenerativeProperties TS

generatePrompt = `Convert this quiz question: {question} and answer: {answer} into a trivia tweet.`;

result = await myCollection.generate.nearText(['World history'],{
    singlePrompt: generatePrompt,
  },{
    limit: 2,
    returnProperties: ['round'],
})

console.log(JSON.stringify(result.objects, null, 2));
// END SingleGenerativeProperties TS

// Tests
genResults = result.objects;
assert.equal(genResults.length, 2);
for (const g of genResults) {
  assert.equal(typeof g.generated, 'string');
}

// ======================================
// ===== GROUPED GENERATIVE EXAMPLE =====
// ======================================

// GroupedGenerative TS

generatePrompt = `What do these animals have in common, if anything?`;

result = await myCollection.generate.nearText(['Cute animals'],{
 groupedTask: generatePrompt,
  },{
  limit: 3,
  returnProperties: ['points'],
})

console.log(JSON.stringify(result.generated, null, 2));
// END GroupedGenerative TS

// Tests
genResults = result;
assert.equal(genResults.objects.length, 3);
assert.equal(typeof genResults[0]._additional.generate.groupedResult, 'string');
for (const g of genResults.objects.slice(1)) {
  assert.equal(g.generated, null);
  assert.equal(typeof g.points, 'number');
}


// ======================================================
// ===== GROUPED GENERATIVE EXAMPLE WITH PROPERTIES =====
// ======================================================

// GroupedGenerativeProperties

generatePrompt = `What do these animals have in common, if anything?`;

result = await myCollection.generate.nearText(['Australian animals'],{
  groupedTask: generatePrompt,
  groupedProperties: ['answer', 'question'],
    },{
  limit: 3,
  returnProperties: ['points', 'question'],
})

console.log(JSON.stringify(result, null, 2));
// END GroupedGenerativeProperties

// Tests
genResults = result;
assert.equal(genResults.objects.length, 3);
// assert.equal(genResults[0]._additional.generate.error, null);
assert.ok(genResults.generated.includes('Australia'));
for (const g of genResults.objects.slice(1)) {
  assert.equal(g.generated, null);
  assert.equal(typeof g.points, 'number');
  assert.equal(typeof g.question, 'string');
}
