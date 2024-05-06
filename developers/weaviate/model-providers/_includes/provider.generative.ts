import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-client';

const client = await weaviate.connectToLocal({
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY || '',
    'X-Cohere-Api-Key': process.env.COHERE_APIKEY || '',
  },
});

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeAnyscale
// Code example coming soon
// END BasicGenerativeAnyscale

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeAnyscale
// Code example coming soon
// END FullGenerativeAnyscale

// Clean up
await client.collections.delete('DemoCollection');

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
    // model: 'command-r',
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

// START BasicGenerativeGoogle
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.palm({
    projectId: '<google-cloud-project-id>',  // Required for Vertex AI
  }),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeGoogle

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeGoogle
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.palm({
    projectId: '<google-cloud-project-id>',  // Required for Vertex AI
    // model_id="<google-model-id>",
    // api_endpoint="<google-api-endpoint>",
    // temperature=0.7,
    // top_k=5,
    // top_p=0.9,
    // vectorize_collection_name=False,
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeGoogle

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeMistral
// Code example coming soon
// END BasicGenerativeMistral

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeMistral
// Code example coming soon
// END FullGenerativeMistral

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeOpenAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.openAI(),
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
  generative: weaviate.configure.generative.openAI({
    // // These parameters are optional
    // model: 'gpt-4',
    // frequencyPenaltyProperty: 0,
    // maxTokensProperty: 500,
    // presencePenaltyProperty: 0,
    // temperatureProperty: 0.7,
    // topPProperty: 0.7,
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeOpenAI

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeAzureOpenAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.azureOpenAI({
    resourceName: '<azure-resource-name>',
    deploymentId: '<azure-deployment-id>',
  }),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeAzureOpenAI

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeAzureOpenAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.azureOpenAI({
    resourceName: '<azure-resource-name>',
    deploymentId: '<azure-deployment-id>',
    // // These parameters are optional
    // frequencyPenaltyProperty: 0,
    // maxTokensProperty: 500,
    // presencePenaltyProperty: 0,
    // temperatureProperty: 0.7,
    // topPProperty: 0.7,
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeAzureOpenAI

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
