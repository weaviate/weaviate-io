import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-client';

async function main() {

  
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
      // Further options
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

// START BasicMMVectorizerCohere
await client.collections.create({
  name: "DemoCollection",
  // highlight-start
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
    {
      name: 'poster',
      dataType: weaviate.configure.dataType.BLOB,
    },
  ],
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecCohere({
      name: "title_vector",
      // Define the fields to be used for the vectorization - using imageFields, textFields
      imageFields: [{
        name: "poster",
        weight: 0.9
      }],
      textFields: [{
        name: "title",
        weight: 0.1
      }]
    })],
    // highlight-end
    // Additional parameters not shown
})
// END BasicMMVectorizerCohere

// Clean up
await client.collections.delete('DemoCollection');

// START MMVectorizerCohereCustomModel
await client.collections.create({
  name: "DemoCollection",
  // highlight-start
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
    {
      name: 'poster',
      dataType: weaviate.configure.dataType.BLOB,
    },
  ],
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecCohere({
      name: "title_vector",
      model: "embed-multilingual-v3.0",
      // Define the fields to be used for the vectorization - using imageFields, textFields
      imageFields: [{
        name: "poster",
        weight: 0.9
      }],
      textFields: [{
        name: "title",
        weight: 0.1
      }]
    })],
    // highlight-end
    // Additional parameters not shown
})
// END MMVectorizerCohereCustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullMMVectorizerCohere
await client.collections.create({
  name: "DemoCollection",
  // highlight-start
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
    {
      name: 'poster',
      dataType: weaviate.configure.dataType.BLOB,
    },
  ],
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecCohere({
      name: "title_vector",
      // Define the fields to be used for the vectorization - using imageFields, textFields
      imageFields: [{
        name: "poster",
        weight: 0.9
      }],
      textFields: [{
        name: "title",
        weight: 0.1
      }],
      // Further options
      // model: "embed-multilingual-v3.0",
      // truncate: "END",  // "NONE", "START" or "END"
      // baseURL: "<custom_cohere_url>"
    })],
    // highlight-end
    // Additional parameters not shown
})
// END FullMMVectorizerCohere

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerDatabricks
const databricksVectorizerEndpoint = process.env.DATABRICKS_VECTORIZER_ENDPOINT || '';  // If saved as an environment variable

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
    weaviate.configure.vectorizer.text2VecDatabricks({
      endpoint: databricksVectorizerEndpoint,  // Required for Databricks
      name: 'title_vector',
      sourceProperties: ['title'],
    })
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerDatabricks

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
    weaviate.configure.vectorizer.text2VecGoogle({
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
    weaviate.configure.vectorizer.text2VecGoogle({
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

// START FullVectorizerGoogleStudio
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
    weaviate.configure.vectorizer.text2VecGoogle({
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
// END FullVectorizerGoogleStudio

// START BasicMMVectorizerGoogleVertex
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
    {
      name: 'poster',
      dataType: 'blob' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecGoogle({
      name: 'title_vector',
      location: '<google-cloud-location>',
      projectId: '<google-cloud-project-id>',
      imageFields: [
        {
          name: 'poster',
          weight: 0.9,
        },
      ],
      textFields: [
        {
          name: 'title',
          weight: 0.1,
        },
      ],
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicMMVectorizerGoogleVertex

// Clean up
await client.collections.delete('DemoCollection');

// START FullMMVectorizerGoogleVertex
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
    {
      name: 'description',
      dataType: 'text' as const,
    },
    {
      name: 'poster',
      dataType: 'blob' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecGoogle({
      name: 'title_vector',
      projectId: '<google-cloud-project-id>',
      modelId: '<google-model-id>',
      location: '<google-cloud-location>',
      dimensions: 512,
      imageFields: [
        {
          name: 'poster',
          weight: 0.9,
        },
      ],
      textFields: [
        {
          name: 'title',
          weight: 0.1,
        },
      ],
      // videoFields: []
      // video_interval_seconds: 20
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullMMVectorizerGoogleVertex

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
      // endpointURL: <custom_huggingface_url>,
      // passageModel: 'sentence-transformers/facebook-dpr-ctx_encoder-single-nq-base',    // Required if using `query_model`
      // queryModel: 'sentence-transformers/facebook-dpr-question_encoder-single-nq-base', // Required if using `passage_model`
      // waitForModel: true,
      // useCache: true,
      // useGPU: true,
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
    weaviate.configure.vectorizer.text2VecJinaAI({
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
    weaviate.configure.vectorizer.text2VecJinaAI({
      name: 'title_vector',
      sourceProperties: ['title'],
      model: 'jina-embeddings-v3'
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
    weaviate.configure.vectorizer.text2VecJinaAI({
      name: 'title_vector',
      sourceProperties: ['title'],
      // model: 'jina-embeddings-v3-small-en'
      // dimensions: 512,  // e.g. 1024, 256, 64  Support for this parameter is coming soon (Only applicable for some models)
    },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerJinaAI

// Clean up
await client.collections.delete('DemoCollection');

// START BasicMMVectorizerJinaAI
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
    {
      name: 'poster',
      dataType: 'blob' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecJinaAI({
      name: 'title_vector',
      imageFields: [{
        name: "poster",
        weight: 0.9
      }],
      textFields: [{
        name: "title",
        weight: 0.1
      }]
    },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicMMVectorizerJinaAI

// Clean up
await client.collections.delete('DemoCollection');

// START MMVectorizerJinaCustomModel
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
    {
      name: 'poster',
      dataType: 'blob' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecJinaAI({
      name: 'title_vector',
      imageFields: [{
        name: "poster",
        weight: 0.9
      }],
      textFields: [{
        name: "title",
        weight: 0.1
      }],
      model: "jina-clip-v2"
    },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END MMVectorizerJinaCustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullMMVectorizerJinaAI
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
    {
      name: 'poster',
      dataType: 'blob' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecJinaAI({
      name: 'title_vector',
      imageFields: [{
        name: "poster",
        weight: 0.9
      }],
      textFields: [{
        name: "title",
        weight: 0.1
      }],
      // Further options
      // model:"jina-clip-v2",

    },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullMMVectorizerJinaAI

// Clean up
await client.collections.delete('DemoCollection');

// START BasicColBERTVectorizerJinaAI
// Coming soon
// END BasicColBERTVectorizerJinaAI

// Clean up
await client.collections.delete('DemoCollection');

// START ColBERTVectorizerJinaCustomModel
// Coming soon
// END ColBERTVectorizerJinaCustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullColBERTVectorizerJinaAI
// Coming soon
// END FullColBERTVectorizerJinaAI

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerMistral
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
    weaviate.configure.vectorizer.text2VecMistral({
      name: 'title_vector',
      sourceProperties: ['title'],
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerMistral

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerMistral
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
    weaviate.configure.vectorizer.text2VecMistral({
      name: 'title_vector',
      sourceProperties: ['title'],
      model: 'mistral-embed'
    },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});// END FullVectorizerMistral

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerNVIDIA
// Coming soon
// END BasicVectorizerNVIDIA

// Clean up
await client.collections.delete('DemoCollection');

// START VectorizerNVIDIACustomModel
// Coming soon
// END VectorizerNVIDIACustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerNVIDIA
// Coming soon
// END FullVectorizerNVIDIA

// Clean up
await client.collections.delete('DemoCollection');

// START BasicMMVectorizerNVIDIA
// Coming soon
// END BasicMMVectorizerNVIDIA

// Clean up
await client.collections.delete('DemoCollection');

// START MMVectorizerNVIDIACustomModel
// Coming soon
// END MMVectorizerNVIDIACustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullMMVectorizerNVIDIA
// Coming soon
// END FullMMVectorizerNVIDIA

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerOctoAI
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
    weaviate.configure.vectorizer.text2VecOctoAI({
      name: 'title_vector',
      sourceProperties: ['title'],
    },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
}); // END BasicVectorizerOctoAI

// Clean up
await client.collections.delete('DemoCollection');

// START VectorizerOctoAICustomModel
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
    weaviate.configure.vectorizer.text2VecOctoAI({
      name: 'title_vector',
      sourceProperties: ['title'],
      model: "thenlper/gte-large",
    },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END VectorizerOctoAICustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerOctoAI
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
    weaviate.configure.vectorizer.text2VecOctoAI({
      name: 'title_vector',
      sourceProperties: ['title'],
      // model: "thenlper/gte-large",
      // vectorizeCollectionName: true,
      // baseURL: "https://text.octoai.run",
    },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
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

// START VectorizerOpenAICustomModelV3
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
      model: 'text-embedding-3-large',
      dimensions: 1024
    },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END VectorizerOpenAICustomModelV3

// Clean up
await client.collections.delete('DemoCollection');

// START VectorizerOpenAICustomModelLegacy
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
      model: 'ada',
      modelVersion: '002',
      type: 'text'
    },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END VectorizerOpenAICustomModelLegacy

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
        // Further options
        model: 'text-embedding-3-large',
        // modelVersion: "002",   // Parameter only applicable for `ada` model family and older
        // dimensions: 1024,    // Parameter only applicable for `v3` model family and newer
        // type: 'text',
        // baseURL: '<custom_openai_url>',
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerOpenAI

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerKubeAI
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
        model: 'text-embedding-ada-002',
        baseURL: 'http://kubeai/openai',
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerKubeAI

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
      deploymentId: '<azure-deployment-id>',
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
      deploymentId: '<azure-deployment-id>',
      // Further options
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

// START VectorizerVoyageAICustomModel
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
      model: 'voyage-3-lite',
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END VectorizerVoyageAICustomModel

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
      // Further options
      // model: 'voyage-large-2',
      // baseURL: '<custom_voyageai_url>',
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

// START BasicMMVectorizerVoyageAI
await client.collections.create({
  name: "DemoCollection",
  // highlight-start
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
    {
      name: 'poster',
      dataType: weaviate.configure.dataType.BLOB,
    },
  ],
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecVoyageAI({
      name: "title_vector",
      // Define the fields to be used for the vectorization - using imageFields, textFields
      imageFields: [{
        name: "poster",
        weight: 0.9
      }],
      textFields: [{
        name: "title",
        weight: 0.1
      }]
    })],
    // highlight-end
    // Additional parameters not shown
})// END BasicMMVectorizerVoyageAI


// Clean up
await client.collections.delete('DemoCollection');

// START MMVectorizerVoyageAICustomModel
await client.collections.create({
  name: "DemoCollection",
  // highlight-start
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
    {
      name: 'poster',
      dataType: weaviate.configure.dataType.BLOB,
    },
  ],
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecVoyageAI({
      name: "title_vector",
      // Define the fields to be used for the vectorization - using imageFields, textFields
      imageFields: [{
        name: "poster",
        weight: 0.9
      }],
      textFields: [{
        name: "title",
        weight: 0.1
      }],
      model: "voyage-multimodal-3",
    })],
    // highlight-end
    // Additional parameters not shown
})
// END MMVectorizerVoyageAICustomModel


// Clean up
await client.collections.delete('DemoCollection');

// START FullMMVectorizerVoyageAI
await client.collections.create({
  name: "DemoCollection",
  // highlight-start
  properties: [
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
    },
    {
      name: 'poster',
      dataType: weaviate.configure.dataType.BLOB,
    },
  ],
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecVoyageAI({
      name: "title_vector",
      // Define the fields to be used for the vectorization - using imageFields, textFields
      imageFields: [{
        name: "poster",
        weight: 0.9
      }],
      textFields: [{
        name: "title",
        weight: 0.1
      }],
      // Further options
      model: "voyage-multimodal-3",
      truncate: true,  // or false
      // outputEncoding: "base64"  // or "null"
      // baseURL: "<custom_voyageai_url>"
    })],
    // highlight-end
    // Additional parameters not shown
})// END FullMMVectorizerVoyageAI


// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerWeaviate
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
    weaviate.configure.vectorizer.text2VecWeaviate({
        name: 'title_vector',
        sourceProperties: ['title'],
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerWeaviate

// Clean up
await client.collections.delete('DemoCollection');

// START VectorizerWeaviateCustomModel
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
    weaviate.configure.vectorizer.text2VecWeaviate({
      name: 'title_vector',
      sourceProperties: ['title'],
      model: 'Snowflake/snowflake-arctic-embed-l-v2.0',
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END VectorizerWeaviateCustomModel

// Clean up
await client.collections.delete('DemoCollection');

// START SnowflakeArcticEmbedMV15
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
    weaviate.configure.vectorizer.text2VecWeaviate({
        name: 'title_vector',
        sourceProperties: ['title'],
        model: 'Snowflake/snowflake-arctic-embed-m-v1.5',
        // Further options
        // dimensions: 256,
        // baseURL: '<custom_weaviate_embeddings_url>',
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END SnowflakeArcticEmbedMV15

// Clean up
await client.collections.delete('DemoCollection');

// START SnowflakeArcticEmbedLV20
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
    weaviate.configure.vectorizer.text2VecWeaviate({
        name: 'title_vector',
        sourceProperties: ['title'],
        model: 'Snowflake/snowflake-arctic-embed-l-v2.0',
        // Further options
        // dimensions: 256,
        // baseURL: '<custom_weaviate_embeddings_url>',
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END SnowflakeArcticEmbedLV20

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
      // Further options
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
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.text2VecOllama({
      name: 'title_vector',
      sourceProperties: ['title'],
      apiEndpoint: 'http://host.docker.internal:11434',  // If using Docker, use this to contact your local Ollama instance
      model: 'snowflake-arctic-embed',  // The model to use, e.g. "nomic-embed-text"
    }),
  ],
  // highlight-end
  // END BasicVectorizerOllama
  properties: [
    { name: 'title', dataType: 'text' }
  ],
  // START BasicVectorizerOllama
  // Additional parameters not shown
});
// END BasicVectorizerOllama

// Clean up
await client.collections.delete('DemoCollection');

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
    { name: 'title', dataType: 'text' }
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
    { name: 'title', dataType: 'text' }
  ],
  // START FullVectorizerGPT4All
  // Additional parameters not shown
});
// END FullVectorizerGPT4All

// START BasicMMVectorizerCLIP
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
    {
      name: 'poster',
      dataType: 'blob' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecClip({
      name: 'title_vector',
      imageFields: [
        {
          name: 'poster',
          weight: 0.9,
        },
      ],
      textFields: [
        {
          name: 'title',
          weight: 0.1,
        },
      ],
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicMMVectorizerCLIP

// START FullMMVectorizerCLIP
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
    {
      name: 'poster',
      dataType: 'blob' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecClip({
      name: 'title_vector',
      imageFields: [
        {
          name: 'poster',
          weight: 0.9,
        },
      ],
      textFields: [
        {
          name: 'title',
          weight: 0.1,
        },
      ],
      // inferenceUrl: '<custom_clip_url>'
    }),
  ],
  // highlight-end
});
// END FullMMVectorizerCLIP

// START BasicMMVectorizerBind
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
    {
      name: 'poster',
      dataType: 'blob' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecClip({
      name: 'title_vector',
      imageFields: [
        {
          name: 'poster',
          weight: 0.9,
        },
      ],
      textFields: [
        {
          name: 'title',
          weight: 0.1,
        },
      ],
    }),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicMMVectorizerBind

// START FullMMVectorizerBind
await client.collections.create({
  name: 'DemoCollection',
  properties: [
    {
      name: 'title',
      dataType: 'text' as const,
    },
    {
      name: 'poster',
      dataType: 'blob' as const,
    },
    {
      name: 'sound',
      dataType: 'blob' as const,
    },
    {
      name: 'video',
      dataType: 'blob' as const,
    },
  ],
  // highlight-start
  vectorizers: [
    weaviate.configure.vectorizer.multi2VecBind({
      name: 'title_vector',
      imageFields: [
        {
          name: 'poster',
          weight: 0.7,
        },
      ],
      textFields: [
        {
          name: 'title',
          weight: 0.1,
        },
      ],
      audioFields: [
        {
          name: 'sound',
          weight: 0.1,
        },
      ],
      videoFields: [
        {
          name: 'video',
          weight: 0.1,
        },
      ],
      // depth, IMU and thermal fields are also available
    }),
  ],
  // highlight-end
});
// END FullMMVectorizerBind

// Clean up
await client.collections.delete('DemoCollection');

// START BatchImportExample
let srcObjects = [
  { title: "The Shawshank Redemption", description: "A wrongfully imprisoned man forms an inspiring friendship while finding hope and redemption in the darkest of places." },
  { title: "The Godfather", description: "A powerful mafia family struggles to balance loyalty, power, and betrayal in this iconic crime saga." },
  { title: "The Dark Knight", description: "Batman faces his greatest challenge as he battles the chaos unleashed by the Joker in Gotham City." },
  { title: "Jingle All the Way", description: "A desperate father goes to hilarious lengths to secure the season's hottest toy for his son on Christmas Eve." },
  { title: "A Christmas Carol", description: "A miserly old man is transformed after being visited by three ghosts on Christmas Eve in this timeless tale of redemption." }
];

// END BatchImportExample

// START BatchImportExample  // START NearTextExample  // START HybridExample  // START MMBatchImportExample
const collectionName = 'DemoCollection'
const myCollection = client.collections.use(collectionName)

// END BatchImportExample  // END NearTextExample  // END HybridExample  // END MMBatchImportExample

// START BatchImportExample
let dataObjects = []

for (let srcObject of srcObjects) {
  dataObjects.push({
    title: srcObject.title,
    description: srcObject.description,
  });
}

const response = await myCollection.data.insertMany(dataObjects);

console.log(response);
// END BatchImportExample

let mmSrcObjects = [
  { title: "The Shawshank Redemption", description: "", poster: "<base64 encoded image>" },
  { title: "The Godfather", description: "", poster: "<base64 encoded image>" },
  { title: "The Dark Knight", description: "", poster: "<base64 encoded image>" },
  { title: "Jingle All the Way", description: "", poster: "<base64 encoded image>" },
  { title: "A Christmas Carol", description: "", poster: "<base64 encoded image>" },
];

// START MMBatchImportExample
let multiModalObjects = []

for (let mmSrcObject of mmSrcObjects) {
  multiModalObjects.push({
    title: mmSrcObject.title,
    poster: mmSrcObject.poster,  // Add the image in base64 encoding
  });
}

// The model provider integration will automatically vectorize the object
const mmInsertResponse = await myCollection.data.insertMany(dataObjects);

console.log(mmInsertResponse);
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
const base64String = 'SOME_BASE_64_REPRESENTATION';

result = await myCollection.query.nearImage(
  base64String,  // The model provider integration will automatically vectorize the query
  {
    limit: 2,
  }
)

console.log(JSON.stringify(result.objects, null, 2));
// END NearImageExample

client.close();

}

void main();