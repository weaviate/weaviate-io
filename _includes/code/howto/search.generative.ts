// Howto: Search -> Generative search - TypeScript examples
// Run with: node --loader=ts-node/esm search.generative.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'https',
  host: 'edu-demo.weaviate.network',
  apiKey: new weaviate.ApiKey('learn-weaviate'),
  headers: {
    'X-OpenAI-Api-Key': process.env['OPENAI_API_KEY'],
  },
});

let result, generatePrompt, genResults;

// =====================================
// ===== SINGLE GENERATIVE EXAMPLE =====
// =====================================

// SingleGenerative TS
generatePrompt = `Convert the following into a question for twitter.
Include emojis for fun, but do not include the answer: {question}.`;

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withGenerate({
    singlePrompt: generatePrompt,
  })
  .withNearText({
    concepts: ['World history'],
  })
  .withLimit(2)
  .withFields('question')
  .do();

// console.log(JSON.stringify(result, null, 2));
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
generatePrompt = 'Convert this quiz question: {question} and answer: {answer} into a trivia tweet.';

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withGenerate({
    singlePrompt: generatePrompt,
  })
  .withNearText({
    concepts: ['World history'],
  })
  // highlight-start
  .withFields('round')
  // highlight-end
  .withLimit(2)
  .do();

// console.log(JSON.stringify(result, null, 2));
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
generatePrompt = 'What do these animals have in common, if anything?';

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  // highlight-start
  .withGenerate({
    groupedTask: generatePrompt,
  })
  // highlight-end
  .withNearText({
    concepts: ['Cute animals'],
  })
  .withFields('points')
  .withLimit(3)
  .do();

// console.log(JSON.stringify(result, null, 2));
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
generatePrompt = 'What do these animals have in common, if anything?';

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withGenerate({
    groupedTask: generatePrompt,
    // highlight-start
    groupedProperties: ['answer', 'question'],  // available since client version 1.3.2
    // highlight-end
  })
  .withNearText({
    concepts: ['Australian animals'],
  })
  .withFields('question points')
  .withLimit(3)
  .do();

// console.log(JSON.stringify(result, null, 2));
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
