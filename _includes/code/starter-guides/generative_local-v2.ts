// Starter-guides: Generative search (RAG)

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// Instantiation
import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY },  // Replace with your inference API key
});
// END Instantiation

let tempResponse;
const is_ready = await client.misc.liveChecker().do()
assert.equal(is_ready, true, 'Weaviate is not ready')


// ChunkText
import fetch from 'node-fetch';

async function downloadAndChunk(srcUrl, chunkSize, overlapSize) {
    const response = await fetch(srcUrl);
    const sourceText = await response.text();
    const textWords = sourceText.replace(/\s+/g, ' ').split(' ');

    let chunks = [];
    for (let i = 0; i < textWords.length; i += chunkSize) {
        let chunk = textWords.slice(Math.max(i - overlapSize, 0), i + chunkSize).join(' ');
        chunks.push(chunk);
    }
    return chunks;
}

const proGitChapterUrl = 'https://raw.githubusercontent.com/progit/progit2/main/book/01-introduction/sections/what-is-git.asc';
const chunks = await downloadAndChunk(proGitChapterUrl, 150, 25)
// END ChunkText

assert(Array.isArray(chunks), 'Returned object is not an array')
assert(typeof chunks[0] === 'string', 'Chunk is not a string')


// CreateClass
const classDefinition = {
  class: `GitBookChunk`,
  properties: [
    {
        name: 'Chunk',
        dataType: ['text']
    },
    {
        name: 'chapter_title',
        dataType: ['text']
    },
    {
        name: 'chunk_index',
        dataType: ['int']
    },
  ],
  // highlight-start
  vectorizer: 'text2vec-openai',  // Use `text2vec-openai` as the vectorizer
  moduleConfig: {
    'generative-openai': {}  // Use `generative-openai` with default parameters
  }
  // highlight-end
};

// END CreateClass

const classExists = await client.schema.exists(`GitBookChunk`);

if (classExists) {
  await client.schema
  .classDeleter()
  .withClassName(`GitBookChunk`)
  .do();
}
// CreateClass

const returnedClassDefinition = await client
  .schema
  .classCreator()
  .withClass(classDefinition)
  .do();

console.log(JSON.stringify(returnedClassDefinition, null, 2));
// END CreateClass

tempResponse = await client.schema.exists(`GitBookChunk`);
assert(tempResponse == true, "The 'GitBookChunk' class does not exist")


// ImportData
async function importData(chunkData) {
  // Prepare a batcher
  let batcher = client.batch.objectsBatcher();
  let counter = 0;
  const batchSize = 100;

  for (const [index, c] of chunkData.entries()) {
    const obj = {
      class: 'GitBookChunk',
      properties: {
        chunk: c,
        chunk_index: index,
        chapter_title: 'What is Git',
      },
    };
    batcher.withObject(obj);
    if (counter++ == batchSize) {
      // flush the batch queue
      const res = await batcher.do();
      console.log(res);

      // restart the batch queue
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }

  // Flush the remaining objects
  const res = await batcher.do();
  console.log(res);
};

await importData(chunks);
// END ImportData

// CountObjects
const objCount = await client
  .graphql
  .aggregate()
  .withClassName('GitBookChunk')
  .withFields('meta { count }')
  .do();

console.log(JSON.stringify(objCount, null, 2));
// END CountObjects

assert(objCount.data.Aggregate['GitBookChunk'][0]['meta']['count'] > 0, "The 'GitBookChunk' class has no data")


// SinglePrompt
let haikuResponse = await client.graphql
  .get()
  .withClassName('GitBookChunk')
  .withFields('chunk chunk_index')
  .withLimit(5)
  .withGenerate({
    singlePrompt: `Write the following as a haiku: ===== {chunk}`
  })
  .do();

for (const r of haikuResponse.data.Get['GitBookChunk']) {
  console.log(`\n===== Object index: [${r['chunk_index']}] =====`)
  console.log(r._additional.generate.singleResult)
}
// END SinglePrompt

for (const r of haikuResponse.data.Get['GitBookChunk']) {
  assert(typeof r._additional.generate.singleResult === 'string', 'The generated object is not a string')
}


// GroupedTask
const triviaResponse = await client.graphql
  .get()
  .withClassName('GitBookChunk')
  .withFields('chunk chunk_index')
  .withLimit(2)
  .withGenerate({
    groupedTask: 'Write a trivia tweet based on this text. Use emojis and make it succinct and cute.s'
  })
  .do();

console.log(triviaResponse.data.Get['GitBookChunk'][0]._additional.generate.groupedResult);
// END GroupedTask

assert(typeof triviaResponse.data.Get['GitBookChunk'][0]._additional.generate.groupedResult === 'string', 'The generated object is not a string')


// NearTextGroupedTask
const nearTextTriviaResponse = await client.graphql
  .get()
  .withClassName('GitBookChunk')
  .withFields('chunk chunk_index')
  // highlight-start
  .withNearText({concepts: ['states of git']})
  // highlight-end
  .withLimit(2)
  .withGenerate({
    groupedTask: 'Write a trivia tweet based on this text. Use emojis and make it succinct and cute.'
  })
  .do();

console.log(nearTextTriviaResponse.data.Get['GitBookChunk'][0]._additional.generate.groupedResult);
// END NearTextGroupedTask

assert(typeof nearTextTriviaResponse.data.Get['GitBookChunk'][0]._additional.generate.groupedResult === 'string', 'The generated object is not a string')


// SecondNearTextGroupedTask
const anotherNearTextResponse = await client.graphql
  .get()
  .withClassName('GitBookChunk')
  .withFields('chunk chunk_index')
  // highlight-start
  .withNearText({concepts: ['how git saves data']})
  // highlight-end
  .withLimit(2)
  .withGenerate({
    groupedTask: 'Write a trivia tweet based on this text. Use emojis and make it succinct and cute.'
  })
  .do();

console.log(anotherNearTextResponse.data.Get['GitBookChunk'][0]._additional.generate.groupedResult);
// END SecondNearTextGroupedTask

assert(typeof anotherNearTextResponse.data.Get['GitBookChunk'][0]._additional.generate.groupedResult === 'string', 'The generated object is not a string')
