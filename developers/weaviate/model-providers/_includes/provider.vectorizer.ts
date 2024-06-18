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

// START BasicVectorizerAWSBedrock
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecAWS({
      name: 'title_vector',
      sourceProperties: ['title'],
      region: 'us-east-1',
      service: 'bedrock', // default service
      model: 'amazon.titan-embed-text-v1',
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerAWSBedrock

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerAWSSagemaker
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecAWS({
      name: 'title_vector',
      sourceProperties: ['title'],
      region: 'us-east-1',
      service: 'sagemaker',
      model: '<custom_sagemaker_url>',
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerAWSSagemaker

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerAWS
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecAWS({
      name: 'title_vector',
      sourceProperties: ['title'],
      region: 'us-east-1',
      service: 'bedrock',
      model: 'cohere.embed-multilingual-v3', // If using Bedrock
      // endpoint: '<custom_sagemaker_url>',  // If using SageMaker
      // vectorizeClassName: true,
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerAWS

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerCohere
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecCohere({
      name: 'title_vector',
      sourceProperties: ['title'],
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerCohere

// Clean up
await client.collections.delete('DemoCollection');

// START VectorizerCohereCustomModel
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  vectorizers: [
    weaviate.configure.vectorizer.text2VecCohere({
      name: 'title_vector',
      sourceProperties: ['title'],
      // highlight-start
      model: 'embed-multilingual-light-v3.0'
      // highlight-end
    }),
  ],
  // Additional parameters not shown
});
// END VectorizerCohereCustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerCohere
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecCohere({
      name: 'title_vector',
      sourceProperties: ['title'],
      // // Further options
      // model: 'embed-multilingual-v3.0',
      // truncate: 'END',
      // baseURL: '<custom_cohere_url>',
      // vectorizeClassName: true,
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerCohere

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerGoogleVertex
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecPalm({
      name: 'title_vector',
      sourceProperties: ['title'],
      projectId: '<google-cloud-project-id>',
      // (Optional) To manually set the model ID
      modelId: 'textembedding-gecko@latest'
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerGoogleVertex

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerGoogleStudio
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecPalm({
      name: 'title_vector',
      sourceProperties: ['title'],
      // (Optional) To manually set the model ID
      modelId: 'text-embedding-004'
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerGoogleStudio

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerGoogle
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecPalm({
      name: 'title_vector',
      sourceProperties: ['title'],
      projectId: '<google-cloud-project-id>', // Required for Vertex AI
      modelId: '<google-model-id>',
      // modelId: '<google-model-id>',
      // apiEndpoint: '<google-api_endpoint>',
      // vectorizeClassName: false,
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerGoogle

// START BasicMMVectorizerGoogle
// Code example coming soon
// END BasicMMVectorizerGoogle

await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecPalm({
      name: 'title_vector',
      location: 'location',
      projectId: 'project-id',
      imageFields: [{
        name: "poster",
        weight: 0.9
      }]
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});

// Clean up
await client.collections.delete('DemoCollection');

// START FullMMVectorizerGoogle
// Code example coming soon
// END FullMMVectorizerGoogle

// Placeholder code for the FullMMVectorizerGoogle example
// await client.collections.create({
//   name: 'DemoCollection',
//   // highlight-start
//   vectorizer: [
//     weaviate.configure.namedVectorizer(
//       'title_vector',
//       {
//         properties: ['title'],
//         vectorizerConfig: weaviate.configure.vectorizer.multi2VecPalm({
//           projectId: '<google-cloud-project-id>',  // Required for Vertex AI
//           // modelId: '<google-model-id>',
//           // apiEndpoint: '<google-api_endpoint>',
//           // vectorizeClassName: false,
//         }),
//       },
//     ),
//   ],
//   // highlight-end
//   // Additional parameters not shown
// });

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerHuggingFace
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecHuggingFace({
      name: 'title_vector',
      sourceProperties: ['title'],
      model: 'sentence-transformers/all-MiniLM-L6-v2',
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerHuggingFace

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerHuggingFace
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecHuggingFace({
      name: 'title_vector',
      sourceProperties: ['title'],
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      // passage_model: 'sentence-transformers/facebook-dpr-ctx_encoder-single-nq-base',    // Required if using `query_model`
      // query_model: 'sentence-transformers/facebook-dpr-question_encoder-single-nq-base', // Required if using `passage_model`
      // endpoint_url: '<custom_huggingface_url>',
      //
      // wait_for_model: true,
      // use_cache: true,
      // use_gpu: true,
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerHuggingFace

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerJinaAI
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecJina({
      name: 'title_vector',
      sourceProperties: ['title'],
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerJinaAI

// Clean up
await client.collections.delete('DemoCollection');

// START VectorizerJinaCustomModel
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecJina({
      name: 'title_vector',
      sourceProperties: ['title'],
      model: 'jina-embeddings-v2-small-en'
    }),
  ],
  // highlight-end
});
// END VectorizerJinaCustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerJinaAI
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecJina({
        name: 'title_vector',
        sourceProperties: ['title'],
        // model: 'text-embedding-3-large'
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerJinaAI

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerOctoAI
// Code example coming soon
// END BasicVectorizerOctoAI

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerOctoAI
// Code example coming soon
// END FullVectorizerOctoAI

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerOpenAI
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecOpenAI({
      name: 'title_vector',
      sourceProperties: ['title'],
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerOpenAI

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerOpenAI
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecOpenAI(
      {
        name: 'title_vector',
        sourceProperties: ['title'],
        // // Further options
        // model: 'text-embedding-3-large',
        // model_version: "002",   // Parameter only applicable for `ada` model family and older
        // dimensions: 1024,       //Parameter only applicable for `v3` model family and newer
        // type: 'text',
        // base_url: '<custom_openai_url>',
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerOpenAI

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerAzureOpenAI
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecAzureOpenAI({
        name: 'title_vector',
        sourceProperties: ['title'],
        resourceName: '<azure-resource-name>',
        deploymentID: '<azure-deployment-id>',
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerAzureOpenAI

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerAzureOpenAI
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecAzureOpenAI({
        name: 'title_vector',
        sourceProperties: ['title'],
        resourceName: '<azure-resource-name>',
        deploymentID: '<azure-deployment-id>',
        // // Further options
        // baseURL: '<custom_azure_url>'
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerAzureOpenAI

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerVoyageAI
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecVoyageAI({
        name: 'title_vector',
        sourceProperties: ['title'],
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerVoyageAI

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerVoyageAI
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecVoyageAI({
        name: 'title_vector',
        sourceProperties: ['title'],
        // // Further options
        // model: 'voyage-large-2',
        // base_url: '<custom_voyageai_url>',
        // truncate: true
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerVoyageAI

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerTransformers
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecTransformers({
      name: 'title_vector',
      sourceProperties: ['title'],
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerTransformers

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerTransformers
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
  ],
  vectorizers: [
    weaviate.configure.vectorizer.text2VecTransformers({
      name: 'title_vector',
      sourceProperties: ['title'],
       // // Further options
      // poolingStrategy: 'masked_mean',
      // inferenceUrl: '<custom_transformers_url>',          // For when using multiple inference containers
      // passageInferenceUrl: `<custom_transformers_url>`,  // For when using DPR models
      // queryInferenceUrl: `<custom_transformers_url>`,    // For when using DPR models
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerTransformers

// START BasicVectorizerOllama
// Coming soon
// END BasicVectorizerOllama

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerOllama
// Coming soon
// END FullVectorizerOllama

// START BasicVectorizerGPT4All
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecGPT4All({
      name: 'title_vector',
      sourceProperties: ['title'],
    }),
  ],
  // highlight-end
  // END BasicVectorizerGPT4All
  properties: [
    {name: 'title', dataType: 'text'}
  ],
  // START BasicVectorizerGPT4All
  // Additional parameters not shown
});
// END BasicVectorizerGPT4All

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerGPT4All
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecGPT4All({
      name: 'title_vector',
      sourceProperties: ['title'],
    }),
  ],
  // highlight-end
  // END FullVectorizerGPT4All
  properties: [
    {name: 'title', dataType: 'text'}
  ],
  // START FullVectorizerGPT4All
  // Additional parameters not shown
});
// END FullVectorizerGPT4All

// START BasicMMVectorizerCLIP
// Code example coming soon
// END BasicMMVectorizerCLIP

// START FullMMVectorizerCLIP
// Code example coming soon
// END FullMMVectorizerCLIP

// START BasicMMVectorizerBind
// Code example coming soon
// END BasicMMVectorizerBind

// START FullMMVectorizerBind
// Code example coming soon
// END FullMMVectorizerBind

// Clean up
await client.collections.delete('DemoCollection');

// Clean up
await client.collections.delete('DemoCollection');

let srcObjects = [
  {"title": "The Shawshank Redemption", "description": ""},
  {"title": "The Godfather", "description": ""},
  {"title": "The Dark Knight", "description": ""},
  {"title": "Jingle All the Way", "description": ""},
  {"title": "A Christmas Carol", "description": ""},
];

// START BatchImportExample  // START NearTextExample  // START HybridExample
const collectionName = 'DemoCollection'
const myCollection = client.collections.get(collectionName)

// END BatchImportExample  // END NearTextExample  // END HybridExample

// START BatchImportExample
let dataObject = []

for (let srcObject of srcObjects) {
  dataObject.push({
    title: srcObject.title,
    description: srcObject.description,
  });
}

const response = await myCollection.data.insertMany(dataObject);

console.log(response);
// END BatchImportExample

// START MMBatchImportExample
// Code example coming soon
// END MMBatchImportExample

// START NearTextExample
let result;

result = await myCollection.query.nearText(
  'A holiday film',  // The model provider integration will automatically vectorize the query
  {
    limit: 2,
  }
)

console.log(JSON.stringify(result.objects, null, 2));
// END NearTextExample


// START HybridExample
result = await myCollection.query.hybrid(
  'A holiday film',  // The model provider integration will automatically vectorize the query
  {
    limit: 2,
  }
)

console.log(JSON.stringify(result.objects, null, 2));
// END HybridExample

// START NearImageExample
// Code example coming soon
// END NearImageExample

client.close();
