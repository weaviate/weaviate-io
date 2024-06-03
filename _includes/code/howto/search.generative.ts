// Howto: Search -> Generative search - TypeScript examples
// Run with: node --loader=ts-node/esm search.generative.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
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
const jeopardy = client.collections.get('JeopardyQuestion');
// END SingleGenerative TS // END GroupedGenerativeProperties // END GroupedGenerative TS // END SingleGenerativeProperties TS


// ===============================================
// ===== QUERY WITH TARGET VECTOR & nearText =====
// ===============================================
{
// NamedVectorNearText
const myNVCollection = client.collections.get('WineReviewNV');

const result = await myNVCollection.generate.nearText(
  'a sweet German white wine',
  {
    singlePrompt: 'Translate this into German: {review_body}',
    groupedTask: 'Summarize these review',
  },
  {
    limit: 2,
    // highlight-start
    targetVector: 'title_country',
    // highlight-end
  }
);

console.log(result.generated); // print groupedTask result

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(object.generated); // print singlePrompt result
}
// END NamedVectorNearText

// Tests
// assert.deepEqual(result.objects.length, 2);
}

// =====================================================
// ===== SINGLE GENERATIVE EXAMPLE WITH PROPERTIES =====
// =====================================================
{
// SingleGenerativeProperties TS

const prompt = `Convert this quiz question: {question} and answer: {answer} into a trivia tweet.`

const result = await jeopardy.generate.nearText('World history', 
  { singlePrompt: prompt },
  { limit: 2 }
)

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(object.generated); // print singlePrompt result
}
// END SingleGenerativeProperties TS

// Tests
// genResults = result.objects;
// assert.equal(genResults.length, 2);
// for (const g of genResults) {
//   assert.equal(typeof g.generated, 'string');
// }
}

// ======================================
// ===== GROUPED GENERATIVE EXAMPLE =====
// ======================================
{
// GroupedGenerative TS

const generatePrompt = `What do these animals have in common, if anything?`;

const result = await jeopardy.generate.nearText('Cute animals',
  { groupedTask: generatePrompt },
  { limit: 3 }
)

console.log(result.generated);
// END GroupedGenerative TS

// Tests
// genResults = result;
// assert.equal(genResults.objects.length, 3);
// assert.equal(typeof genResults[0]._additional.generate.groupedResult, 'string');
// for (const g of genResults.objects.slice(1)) {
//   assert.equal(g.generated, null);
//   assert.equal(typeof g.points, 'number');
// }
}

// ======================================================
// ===== GROUPED GENERATIVE EXAMPLE WITH PROPERTIES =====
// ======================================================
{
// GroupedGenerativeProperties

const generatePrompt = `What do these animals have in common, if anything?`;

const result = await jeopardy.generate.nearText('Australian animals',
  {
    groupedTask: generatePrompt,
    groupedProperties: ['answer', 'question'],
  },
  { limit: 3 }
)

console.log(result.generated);
// END GroupedGenerativeProperties

// Tests
// genResults = result;
// assert.equal(genResults.objects.length, 3);
// // assert.equal(genResults[0]._additional.generate.error, null);
// assert.ok(genResults.generated.includes('Australia'));
// for (const g of genResults.objects.slice(1)) {
//   assert.equal(g.generated, null);
//   assert.equal(typeof g.points, 'number');
//   assert.equal(typeof g.question, 'string');
// }
}
