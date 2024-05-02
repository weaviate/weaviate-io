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
// START BasicGenerativeAWSBedrock
// Code example coming soon
// END BasicGenerativeAWSBedrock

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeAWSSagemaker
// Code example coming soon
// END BasicGenerativeAWSSagemaker

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeAWS
// Code example coming soon
// END FullGenerativeAWS

// Clean up
await client.collections.delete('DemoCollection');

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
    // model: 'command-xlarge-nightly',
    // temperatureProperty: 0.7,
    // maxTokensProperty: 500,
    // kProperty: 5,
    // stopSequencesProperty: ['\n\n'],
    // returnLikelihoodsProperty: 'GENERATION'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeCohere

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeOpenAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.openai(),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeOpenAI

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeOpenAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.openai({
    // // These parameters are optional
    // model='gpt-4',
    // frequency_penalty=0,
    // max_tokens=500,
    // presence_penalty=0,
    // temperature=0.7,
    // top_p=0.7,
    // base_url='<custom_openai_url>'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeOpenAI

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
