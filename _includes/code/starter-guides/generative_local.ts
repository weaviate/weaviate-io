// Starter-guides: Generative search (RAG)

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// Instantiation
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCS(
    'https://',  // Replace with your Weaviate endpoint
  {
    authCredentials: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),  // Replace with your Weaviate instance API key
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
    }
});
// END Instantiation

let tempResponse;
// const is_ready = await client.misc.liveChecker().do()
// assert.equal(is_ready, true, 'Weaviate is not ready')


// ChunkText
async function downloadAndChunk(srcUrl: string, chunkSize: number, overlapSize: number) {
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
const schemaDefinition = {
  name: 'GitBookChunk',
  properties: [
    {
      name: 'Chunk',
      dataType: 'text' as const,
    },
    {
      name: 'chapter_title',
      dataType: 'text' as const,
    },
    {
      name: 'chunk_index',
      dataType: 'int' as const,
    }
  ],
    // highlight-start
  vectorizer: weaviate.configure.vectorizer.text2VecOpenAI(),
  generative: weaviate.configure.generative.openAI()
    // highlight-end
}
// END CreateClass

const classExists = await client.collections.exists(`GitBookChunk`);

if (classExists) {
  await client.collections.delete(`GitBookChunk`)
  .do();
}
// CreateClass

const newCollection = await client.collections.create(schemaDefinition) 
console.log('We have a new class!', newCollection['name']);

// END CreateClass

tempResponse = await client.collections.exists(`GitBookChunk`);
assert(tempResponse == true, "The 'GitBookChunk' class does not exist")


// ImportData
const gitCollection = client.collections.get('GitBookChunkTest');

async function importData(chunkData: Array<string>) {
  const list:Array<any> = [];

  for (const [index, chunk] of chunkData.entries()) {
    const obj = {
      class: 'GitBookChunk',
      properties: {
        chunk: chunk,
        chunk_index: index,
        chapter_title: 'What is Git',
      },
    };

    list.push(obj);
    }
  const result = await gitCollection.data.insertMany(list)
  console.log('just bulk inserted',result);
};

await importData(chunks);
// END ImportData

// CountObjects
const objectCount =  await gitCollection.aggregate.overAll()
console.log(JSON.stringify(objectCount.totalCount));

// END CountObjects

assert(objectCount.totalCount > 0, "The 'GitBookChunk' class has no data")


// SinglePrompt
const haikuResponse = await gitCollection.generate.fetchObjects({
  singlePrompt: `Write the following as a haiku: ===== {chunk}`
},{
  returnProperties: ['chunk','chunk_index'],
  limit: 2,
})

if (haikuResponse) {
  for (const result of haikuResponse.objects) {
    console.log(`\n===== Object index: [${result.properties['chunk_index']}] =====`)
    console.log(result.generated)
  }
}
// END SinglePrompt

for (const r of haikuResponse.data.Get['GitBookChunk']) {
  assert(typeof r._additional.generate.singleResult === 'string', 'The generated object is not a string')
}


// GroupedTask
const triviaResponse = await gitCollection.generate.fetchObjects({
  groupedTask: `Write a trivia tweet based on this text. Use emojis and make it succinct and cute.`
},{
  limit: 2,
})

console.log(triviaResponse.generated)

// END GroupedTask

assert(typeof triviaResponse.generated === 'string', 'The generated object is not a string')


// NearTextGroupedTask
const searchResponse = await gitCollection.generate.nearText("states of git",{
  groupedTask: "Write a trivia tweet based on this text. Use emojis and make it succinct and cute."
},{
  limit: 2,
})

console.log('concept',JSON.stringify(searchResponse.generated, null, 2));
// END NearTextGroupedTask

assert(typeof searchResponse.generated === 'string', 'The generated object is not a string')


// SecondNearTextGroupedTask
const anotherSearchResponse = await gitCollection.generate.nearText("how git saves data",{
  groupedTask: "Write a trivia tweet based on this text. Use emojis and make it succinct and cute."
},{
  limit: 2,
})

console.log('concept',JSON.stringify(anotherSearchResponse.generated, null, 2));
// END SecondNearTextGroupedTask

assert(typeof anotherSearchResponse.generated === 'string', 'The generated object is not a string')
