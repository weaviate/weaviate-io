import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-client';

// START RuntimeModelSelectionAnthropic  // START WorkingWithImagesAnthropic // START WorkingWithImagesAWS // START WorkingWithImagesGoogle // START WorkingWithImagesOpenAI // START RuntimeModelSelectionAnyscale // START RuntimeModelSelectionMistral // START RuntimeModelSelectionOpenAI // START RuntimeModelSelectionAWS // START RuntimeModelSelectionCohere // START RuntimeModelSelectionDatabricks // START RuntimeModelSelectionFriendliAI // START RuntimeModelSelectionGoogle // START RuntimeModelSelectionNVIDIA // START RuntimeModelSelectionKubeAI // START RuntimeModelSelectionAzureOpenAI // START RuntimeModelSelectionOllama
import { generativeParameters } from 'weaviate-client';

// END RuntimeModelSelectionAnthropic  // END WorkingWithImagesAnthropic // END WorkingWithImagesAWS // END WorkingWithImagesGoogle // END WorkingWithImagesOpenAI // END RuntimeModelSelectionAnyscale // END RuntimeModelSelectionMistral // END RuntimeModelSelectionOpenAI // END RuntimeModelSelectionAWS // END RuntimeModelSelectionCohere // END RuntimeModelSelectionDatabricks // END RuntimeModelSelectionFriendliAI // END RuntimeModelSelectionGoogle // END RuntimeModelSelectionNVIDIA // END RuntimeModelSelectionKubeAI // END RuntimeModelSelectionAzureOpenAI // END RuntimeModelSelectionOllama

// START WorkingWithImagesAnthropic // START WorkingWithImagesAWS // START WorkingWithImagesGoogle // START WorkingWithImagesOpenAI
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 1024; // Process in chunks to avoid call stack issues

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.slice(i, Math.min(i + chunkSize, bytes.length));
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }

  return btoa(binary);
}

// END WorkingWithImagesAnthropic // END WorkingWithImagesAWS // END WorkingWithImagesGoogle // END WorkingWithImagesOpenAI

async function main() {

  const client = await weaviate.connectToLocal({
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,
      'X-Cohere-Api-Key': process.env.COHERE_APIKEY as string,
    },
  });

  // Clean up
  await client.collections.delete('DemoCollection');

// START BasicGenerativeAnthropic
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.anthropic(),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeAnthropic

// Clean up
await client.collections.delete('DemoCollection');

// START GenerativeAnthropicCustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.anthropic({
    model: 'claude-3-opus-20240229'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END GenerativeAnthropicCustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeAnthropic
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.anthropic({
    // These parameters are optional
    // baseURL: 'https://api.anthropic.com',
    // model: 'claude-3-opus-20240229',
    // maxTokens: 512,
    // temperature: 0.7,
    // stopSequences: ['\n\n'],
    // topP: 0.9,
    // topK: 5,
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeAnthropic

// Clean up
await client.collections.delete('DemoCollection');


// START RuntimeModelSelectionAnthropic  // START WorkingWithImagesAnthropic // START WorkingWithImagesAWS // START WorkingWithImagesGoogle // START WorkingWithImagesOpenAI // START RuntimeModelSelectionAnyscale // START RuntimeModelSelectionMistral // START RuntimeModelSelectionOpenAI // START RuntimeModelSelectionAWS // START RuntimeModelSelectionCohere // START RuntimeModelSelectionDatabricks // START RuntimeModelSelectionFriendliAI // START RuntimeModelSelectionGoogle // START RuntimeModelSelectionNVIDIA // START RuntimeModelSelectionKubeAI // START RuntimeModelSelectionAzureOpenAI // START RuntimeModelSelectionOllama // START SinglePromptExample  // START GroupedTaskExample
let response;
const myCollection = client.collections.use("DemoCollection");

// END RuntimeModelSelectionAnthropic  // END WorkingWithImagesAnthropic // END WorkingWithImagesAWS // END WorkingWithImagesGoogle // END WorkingWithImagesOpenAI // END RuntimeModelSelectionAnyscale // END RuntimeModelSelectionMistral // END RuntimeModelSelectionOpenAI // END RuntimeModelSelectionAWS // END RuntimeModelSelectionCohere // END RuntimeModelSelectionDatabricks // END RuntimeModelSelectionFriendliAI // END RuntimeModelSelectionGoogle // END RuntimeModelSelectionNVIDIA // END RuntimeModelSelectionKubeAI // END RuntimeModelSelectionAzureOpenAI // END RuntimeModelSelectionOllama // END SinglePromptExample  // END GroupedTaskExample


// START RuntimeModelSelectionAnthropic
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.anthropic({
    // These parameters are optional
    // baseURL: "https://api.anthropic.com",
    // model: "claude-3-opus-20240229",
    // maxTokens: 512,
    // temperature: 0.7,
    // stopSequences: ["\n\n"],
    // topP: 0.9,
    // topK: 5,
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
);
// END RuntimeModelSelectionAnthropic
(async () => {
// START WorkingWithImagesAnthropic
const srcImgPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Winter_forest_silver.jpg/960px-Winter_forest_silver.jpg"
const responseImg = await fetch(srcImgPath);
const image = await responseImg.arrayBuffer();

const base64String = arrayBufferToBase64(image);

const prompt = {
  // highlight-start
  prompt: "Which movie is closest to the image in terms of atmosphere",
  images: [base64String],      // A list of base64 encoded strings of the image bytes
  // imageProperties: ["img"], // Properties containing images in Weaviate
  // highlight-end
}

response = await myCollection.generate.nearText("Movies", {
  // highlight-start
  groupedTask: prompt,
  // highlight-end
  config: generativeParameters.anthropic({
    maxTokens: 1000
  }),
}, {
  limit: 5,
})

// Print the source property and the generated response
for (const item of response.objects) {
  console.log("Title property:", item.properties['title'])
}

console.log("Grouped task result:", response.generative?.text)
// END WorkingWithImagesAnthropic
})();
// START BasicGenerativeAnyscale
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.anyscale(),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeAnyscale

// Clean up
await client.collections.delete('DemoCollection');

// START GenerativeAnyscaleCustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.anyscale({
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END GenerativeAnyscaleCustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeAnyscale
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.anyscale({
    // These parameters are optional
    // model: 'meta-llama/Llama-2-70b-chat-hf',
    // temperature: 0.7,
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeAnyscale

// START RuntimeModelSelectionAnyscale
response = myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.anthropic({
    // These parameters are optional
    // baseURL: "https://api.anthropic.com",
    // model: "claude-3-opus-20240229",
    // maxTokens: 512,
    // temperature: 0.7,
    // stopSequences: ["\n\n"],
    // topP: 0.9,
    // topK: 5,
  }),
  // highlight-end

}, {
  limit: 2,
}
  // Additional parameters not shown
)

// END RuntimeModelSelectionAnyscale

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeAWSBedrock
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.aws({
    region: 'us-east-1',
    service: 'bedrock',
    model: 'cohere.command-r-plus-v1:0',
  }),
  // highlight-end
})
// END BasicGenerativeAWSBedrock

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeAWSSagemaker
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.aws({
    region: 'us-east-1',
    service: 'sagemaker',
    endpoint: '<custom_sagemaker_url>'
  }),
  // highlight-end
})
// END BasicGenerativeAWSSagemaker

// START RuntimeModelSelectionAWS
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.aws({
    region: 'us-east-1',
    service: 'bedrock', // You can also use sagemaker
    model: 'cohere.command-r-plus-v1:0',
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
);
// END RuntimeModelSelectionAWS

(async () => {
// START WorkingWithImagesAWS
const srcImgPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Winter_forest_silver.jpg/960px-Winter_forest_silver.jpg"
const responseImg = await fetch(srcImgPath);
const image = await responseImg.arrayBuffer();

const base64String = arrayBufferToBase64(image);

const prompt = {
  // highlight-start
  prompt: "Which movie is closest to the image in terms of atmosphere",
  images: [base64String],      // A list of base64 encoded strings of the image bytes
  // imageProperties: ["img"], // Properties containing images in Weaviate
  // highlight-end
}

response = await myCollection.generate.nearText("Movies", {
  // highlight-start
  groupedTask: prompt,
  // highlight-end
  config: generativeParameters.aws({
    region: 'us-east-1',
    service: 'bedrock', // You can also use sagemaker
    model: 'cohere.command-r-plus-v1:0',
  }),
}, {
  limit: 5,
})

// Print the source property and the generated response
for (const item of response.objects) {
  console.log("Title property:", item.properties['title'])
}

console.log("Grouped task result:", response.generative?.text)
// END WorkingWithImagesAWS
})();

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

// START GenerativeCohereCustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.cohere({
    model: 'command-r-plus'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END GenerativeCohereCustomModel

// Clean up
await client.collections.delete('DemoCollection');


// START FullGenerativeCohere
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.cohere({
    // These parameters are optional
    model: 'command-r',
    // temperature: 0.7,
    // maxTokens: 500,
    // k: 5,
    // stopSequences: ['\n\n'],
    // returnLikelihoods: 'GENERATION'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeCohere

// START RuntimeModelSelectionCohere
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.cohere({
    // These parameters are optional
    // model: 'command-r',
    // temperature: 0.7,
    // maxTokens: 500,
    // k: 5,
    // stopSequences: ['\n\n'],
    // returnLikelihoods: 'GENERATION' // coming soon

  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
)
// END RuntimeModelSelectionCohere


// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeDatabricks // START FullGenerativeDatabricks
const databricksGenerativeEndpoint = process.env.DATABRICKS_VECTORIZER_ENDPOINT || '';  // If saved as an environment variable
// START BasicGenerativeDatabricks // END FullGenerativeDatabricks

await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.databricks({
    endpoint: databricksGenerativeEndpoint,  // Required for Databricks
  }),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeDatabricks

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeDatabricks
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.databricks({
    endpoint: databricksGenerativeEndpoint,  // Required for Databricks
    // These parameters are optional
    // maxTokens: 500,
    // temperature: 0.7,
    // topP: 0.7,
    // topK: 0.1
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeDatabricks

// START RuntimeModelSelectionDatabricks
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.databricks({
    // These parameters are optional
    // maxTokens: 500,
    // temperature: 0,
    // topP: 0.7,
    // topK: 0.1,
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
)
// END RuntimeModelSelectionDatabricks

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeFriendliAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.friendliai(),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeFriendliAI

// Clean up
await client.collections.delete('DemoCollection');

// START GenerativeFriendliAICustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.friendliai({
    model: 'meta-llama-3.1-70b-instruct'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END GenerativeFriendliAICustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeFriendliAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.friendliai({
    model: 'meta-llama-3.1-70b-instruct',
    maxTokens: 500,
    temperature: 0.7,
    baseURL: 'https://inference.friendli.ai'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeFriendliAI

// START RuntimeModelSelectionFriendliAI
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.friendliai({
    // These parameters are optional
    // model: 'meta-llama-3.1-70b-instruct',
    // maxTokens: 500,
    // temperature: 0.7,
    // baseURL: 'https://inference.friendli.ai'
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
)
// END RuntimeModelSelectionFriendliAI

// Clean up
await client.collections.delete('DemoCollection');

// START DedicatedGenerativeFriendliAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.friendliai({
    model: 'YOUR_ENDPOINT_ID',
  }),
  // highlight-end
  // Additional parameters not shown
});
// END DedicatedGenerativeFriendliAI

// Clean up
await client.collections.delete('DemoCollection');


// START BasicGenerativeGoogleVertex
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.google({
    projectId: '<google-cloud-project-id>',  // Required for Vertex AI
    modelId: 'gemini-1.0-pro'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeGoogleVertex

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeGoogleStudio
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.google({
    modelId: 'gemini-pro',
  }),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeGoogleStudio

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeGoogle
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.google({
    projectId: '<google-cloud-project-id>',  // Required for Vertex AI
    modelId: '<google-model-id>',
    apiEndpoint: '<google-api-endpoint>',
    temperature: 0.7,
    topK: 5,
    topP: 0.9,
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeGoogle

// START RuntimeModelSelectionGoogle
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.google({
    // These parameters are optional
    // projectId: '<google-cloud-project-id>',  // Required for Vertex AI
    // modelId: '<google-model-id>',
    // apiEndpoint: '<google-api-endpoint>',
    // temperature: 0.7,
    // topK: 5,
    // topP: 0.9,
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
);
// END RuntimeModelSelectionGoogle

(async () => {
// START WorkingWithImagesGoogle
const srcImgPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Winter_forest_silver.jpg/960px-Winter_forest_silver.jpg"
const responseImg = await fetch(srcImgPath);
const image = await responseImg.arrayBuffer();

const base64String = arrayBufferToBase64(image);

const prompt = {
  // highlight-start
  prompt: "Which movie is closest to the image in terms of atmosphere",
  images: [base64String],      // A list of base64 encoded strings of the image bytes
  // imageProperties: ["img"], // Properties containing images in Weaviate
  // highlight-end
}

response = await myCollection.generate.nearText("Movies", {
  // highlight-start
  groupedTask: prompt,
  // highlight-end
  config: generativeParameters.google({
    maxTokens: 1000,
  }),
}, {
  limit: 5,
})

// Print the source property and the generated response
for (const item of response.objects) {
  console.log("Title property:", item.properties['title'])
}

console.log("Grouped task result:", response.generative?.text)
// END WorkingWithImagesGoogle
})();
// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeMistral
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.mistral(),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeMistral

// Clean up
await client.collections.delete('DemoCollection');

// START GenerativeMistralCustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.mistral({
    model: 'mistral-large-latest'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END GenerativeMistralCustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeMistral
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.mistral({
    // These parameters are optional
    // model: 'mistral-large',
    // temperature: 0.7,
    // maxTokens: 500
  }),
  // highlight-end
});
// END FullGenerativeMistral

// START RuntimeModelSelectionMistral
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.mistral({
    // These parameters are optional
    // model: 'mistral-large',
    // temperature: 0.7,
    // maxTokens: 0.7,
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
)
// END RuntimeModelSelectionMistral

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeNVIDIA
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.nvidia(),
  // highlight-end
  // Additional parameters not shown
});// END BasicGenerativeNVIDIA

// Clean up
await client.collections.delete('DemoCollection');

// START GenerativeNVIDIACustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.nvidia({
    model: 'nvidia/llama-3.1-nemotron-70b-instruct'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END GenerativeNVIDIACustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeNVIDIA
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.nvidia({
    // These parameters are optional
    // model: 'nvidia/llama-3.1-nemotron-70b-instruct'
    // baseURL: "https://integrate.api.nvidia.com/v1",
    // temperature: 0.7,
    // maxTokens: 1024
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeNVIDIA


// START RuntimeModelSelectionNVIDIA
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.nvidia({
    // These parameters are optional
    // baseURL: "https://integrate.api.nvidia.com/v1",
    // model: 'nvidia/llama-3.1-nemotron-70b-instruct',
    // temperature: 0.7,
    // maxTokens: 1000,
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
)
// END RuntimeModelSelectionNVIDIA

// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeOctoAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.octoai(),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeOctoAI

// Clean up
await client.collections.delete('DemoCollection');

// START GenerativeOctoAICustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.octoai({
    model: 'meta-llama-3-70b-instruct'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END GenerativeOctoAICustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeOctoAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.octoai({
    model: 'meta-llama-3-70b-instruct',
    maxTokens: 500,
    temperature: 0.7,
    baseURL: 'https://text.octoai.run'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeOctoAI

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

// START GenerativeOpenAICustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.openAI({
    model: 'gpt-4-1106-preview',
  }),
  // highlight-end
  // Additional parameters not shown
});
// END GenerativeOpenAICustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeOpenAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.openAI({
    // These parameters are optional
    // model: 'gpt-4',
    // frequencyPenalty: 0,
    // maxTokens: 500,
    // presencePenalty: 0,
    // temperature: 0.7,
    // topP: 0.7,
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeOpenAI

// START RuntimeModelSelectionOpenAI
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.openAI({
    // These parameters are optional
    // model: 'gpt-4',
    // frequencyPenalty: 0,
    // maxTokens: 500,
    // presencePenalty: 0,
    // temperature: 0.7,
    // topP: 0.7,
    // baseURL: "<custom-openai-url>",
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
);
// END RuntimeModelSelectionOpenAI

(async () => {
// START WorkingWithImagesOpenAI
const srcImgPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Winter_forest_silver.jpg/960px-Winter_forest_silver.jpg"
const responseImg = await fetch(srcImgPath);
const image = await responseImg.arrayBuffer();

const base64String = arrayBufferToBase64(image);

const prompt = {
  // highlight-start
  prompt: "Which movie is closest to the image in terms of atmosphere",
  images: [base64String],      // A list of base64 encoded strings of the image bytes
  // imageProperties: ["img"], // Properties containing images in Weaviate
  // highlight-end
}

response = await myCollection.generate.nearText("Movies", {
  // highlight-start
  groupedTask: prompt,
  // highlight-end
  config: generativeParameters.openAI({
    maxTokens: 1000,
  }),
}, {
  limit: 5,
})

// Print the source property and the generated response
for (const item of response.objects) {
  console.log("Title property:", item.properties['title'])
}

console.log("Grouped task result:", response.generative?.text)
// END WorkingWithImagesOpenAI
})();
// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeKubeAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.openAI({
    // Setting the model and base_url is required
    model: 'gpt-3.5-turbo',
    baseURL: 'http://kubeai/openai',
    // These parameters are optional
    // frequencyPenalty: 0,
    // maxTokens: 500,
    // presencePenalty: 0,
    // temperature: 0.7,
    // topP: 0.7,
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeKubeAI

// START RuntimeModelSelectionKubeAI
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.openAI({
    // Setting the model and baseURL is required
    model: 'gpt-3.5-turbo',
    baseURL: 'http://kubeai/openai',
    // These parameters are optional
    // frequencyPenalty: 0,
    // maxTokens: 500,
    // presencePenalty: 0,
    // temperature: 0.7,
    // topP: 0.7,
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
)
// END RuntimeModelSelectionKubeAI

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
    // These parameters are optional
    // frequencyPenalty: 0,
    // maxTokens: 500,
    // presencePenalty: 0,
    // temperature: 0.7,
    // topP: 0.7,
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeAzureOpenAI

// START RuntimeModelSelectionAzureOpenAI
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.azureOpenAI({
    resourceName: '<azure-resource-name>',
    deploymentId: '<azure-deployment-id>',
    // These parameters are optional
    // frequencyPenalty: 0,
    // maxTokens: 500,
    // presencePenalty: 0,
    // temperature: 0.7,
    // topP: 0.7,
    // baseURL: "<custom-azure-url>",
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
)
// END RuntimeModelSelectionAzureOpenAI
// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativeOllama
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.ollama({
    apiEndpoint: 'http://host.docker.internal:11434',  // If using Docker, use this to contact your local Ollama instance
    model: 'llama3',  // The model to use, e.g. 'phi3', or 'mistral', 'command-r-plus', 'gemma'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativeOllama

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativeOllama
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.ollama({
    apiEndpoint: 'http://host.docker.internal:11434',  // If using Docker, use this to contact your local Ollama instance
    model: 'llama3',  // The model to use, e.g. 'phi3', or 'mistral', 'command-r-plus', 'gemma'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativeOllama

// START RuntimeModelSelectionOllama
response = await myCollection.generate.nearText("A holiday film", {
  // highlight-start
  groupedTask: "Write a tweet promoting these two movies",
  config: generativeParameters.ollama({
    apiEndpoint: 'http://host.docker.internal:11434',  // If using Docker, use this to contact your local Ollama instance
    model: 'llama3',  // The model to use, e.g. 'phi3', or 'mistral', 'command-r-plus', 'gemma'
  }),
  // highlight-end
}, {
  limit: 2,
}
  // Additional parameters not shown
)
// END RuntimeModelSelectionOllama


// Clean up
await client.collections.delete('DemoCollection');

// START BasicGenerativexAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.xai(),
  // highlight-end
  // Additional parameters not shown
});
// END BasicGenerativexAI

// Clean up
await client.collections.delete('DemoCollection');

// START GenerativexAICustomModel
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.xai({
    model: 'grok-2-latest'
  }),
  // highlight-end
  // Additional parameters not shown
});
// END GenerativexAICustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullGenerativexAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  generative: weaviate.configure.generative.xai({
    // // These parameters are optional
    // baseURL: 'https://api.x.ai/v1',
    // model: 'grok-2-latest',
    // maxTokens: 512,
    // temperature: 0.7,
  }),
  // highlight-end
  // Additional parameters not shown
});
// END FullGenerativexAI

// Clean up
await client.collections.delete('DemoCollection');

// START SinglePromptExample  // START GroupedTaskExample
let myCollection = client.collections.get('DemoCollection');

// START SinglePromptExample  // END GroupedTaskExample
const singlePromptResults = await myCollection.generate.nearText('A holiday film', {
  // highlight-start
  singlePrompt: `Translate this into French: {title}`,
  // highlight-end
}, {
  limit: 2,
});

for (const obj of singlePromptResults.objects) {
  console.log(obj.properties['title']);
  console.log(`Generated output: ${obj.generative?.text}`);  // Note that the generated output is per object
}
// END SinglePromptExample

// START GroupedTaskExample
const groupedTaskResults = await myCollection.generate.nearText('A holiday film', {
  // highlight-start
  groupedTask: `Write a fun tweet to promote readers to check out these films.`,
  // highlight-end
}, {
  limit: 2,
});

console.log(`Generated output: ${groupedTaskResults.generative?.text}`);  // Note that the generated output is per query
for (const obj of groupedTaskResults.objects) {
  console.log(obj.properties['title']);
}
// END GroupedTaskExample

client.close();

}
void main()