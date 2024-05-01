import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-client';

const client = await weaviate.connectToLocal({
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',
    'X-Cohere-Api-Key': process.env.COHERE_API_KEY || '',
  },
});

// START BasicGenerativeCohere
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.cohere(),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeCohere

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeCohere
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.cohere({
    // // These parameters are optional
    // model: "command-xlarge-nightly",
    // temperatureProperty: 0.7,
    // maxTokensProperty: 500,
    // kProperty: 5,
    // stopSequencesProperty: ["\n\n"],
    // returnLikelihoodsProperty: "GENERATION"
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeCohere

// START SinglePromptExample  // START GroupedTaskExample
let myCollection = client.collections.get('DemoCollection');
// START SinglePromptExample  // END GroupedTaskExample

const singlePromptResults = await myCollection.generate.nearText(
  ['A holiday film'],
  // highlight-start
  {
    singlePrompt: `Translate this into French: {title}`,
  },
  // highlight-end
  {
    limit: 2,
  }
);

for (const obj of singlePromptResults.objects) {
  console.log(obj.properties['title']);
  console.log(`Generated output: ${obj.generated}`);  // Note that the generated output is per object
}
// END SinglePromptExample

// START GroupedTaskExample
const groupedTaskResults = await myCollection.generate.nearText(
  ['A holiday film'],
  // highlight-start
  {
    groupedTask: `Write a fun tweet to promote readers to check out these films.`,
  },
  // highlight-end
  {
    limit: 2,
  }
);

console.log(`Generated output: ${groupedTaskResults.generated}`);  // Note that the generated output is per query
for (const obj of groupedTaskResults.objects) {
  console.log(obj.properties['title']);
}
// END GroupedTaskExample

client.close();
