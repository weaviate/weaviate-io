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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecAWS({
          region: 'us-east-1',
          service: 'bedrock',
          model: 'cohere.embed-multilingual-v3',
        }),
      },
    ),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecAWS({
          region: 'us-east-1',
          service: 'sagemaker',
          endpoint: '<custom_sagemaker_url>',
        }),
      },
    ),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecAWS({
          region: 'us-east-1',
          service: 'bedrock',
          model: 'cohere.embed-multilingual-v3',  // If using Bedrock
          // endpoint: '<custom_sagemaker_url>',  // If using SageMaker
          // vectorizeClassName: true,
        }),
      },
    ),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecCohere(),
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerCohere

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerCohere
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecCohere({
          // // Further options
          // model: 'embed-multilingual-v3.0',
          // truncate: 'END',
          // baseURL: '<custom_cohere_url>',
          // vectorizeClassName: true,
        }),
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerCohere

// Clean up
await client.collections.delete('DemoCollection');

// START BasicVectorizerGoogle
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecPalm({
          projectId: '<google-cloud-project-id>',  // Required for Vertex AI
        }),
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerGoogle

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerGoogle
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecPalm({
          projectId: '<google-cloud-project-id>',  // Required for Vertex AI
          // modelId: '<google-model-id>',
          // apiEndpoint: '<google-api_endpoint>',
          // vectorizeClassName: false,
        }),
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerGoogle

// START BasicMMVectorizerGoogle
// Code example coming soon
// END BasicMMVectorizerGoogle

// Placeholder code for the BasicMMVectorizerGoogle example
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
//         }),
//       },
//     ),
//   ],
//   // highlight-end
//   // Additional parameters not shown
// });

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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecHuggingFace({
          model: 'sentence-transformers/all-MiniLM-L6-v2',
        }),
      },
    ),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecHuggingFace({
          // NOTE: Use only one of (`model`), (`passage_model` and `query_model`), or (`endpoint_url`)
          model: 'sentence-transformers/all-MiniLM-L6-v2',
          // passage_model: 'sentence-transformers/facebook-dpr-ctx_encoder-single-nq-base',    // Required if using `query_model`
          // query_model: 'sentence-transformers/facebook-dpr-question_encoder-single-nq-base', // Required if using `passage_model`
          // endpoint_url: '<custom_huggingface_url>',
          //
          // wait_for_model: true,
          // use_cache: true,
          // use_gpu: true,
        }),
      },
    ),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecJina(),
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerJinaAI

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerJinaAI
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecJina({
          // // Further options
          // model: 'text-embedding-3-large'
        }),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecOpenAI(),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecOpenAI({
          // // Further options
          // model: 'text-embedding-3-large',
          // model_version: "002",   // Parameter only applicable for `ada` model family and older
          // dimensions: 1024,       //Parameter only applicable for `v3` model family and newer
          // type: 'text',
          // base_url: '<custom_openai_url>',
        }),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecAzureOpenAI({
          resourceName: '<azure-resource-name>',
          deploymentID: '<azure-deployment-id>',
        }),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecAzureOpenAI({
          resourceName: '<azure-resource-name>',
          deploymentID: '<azure-deployment-id>',
          // // Further options
          // baseURL: '<custom_azure_url>'
        }),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecVoyage(),
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
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecVoyage({
          // // Further options
          // model: 'voyage-large-2',
          // base_url: '<custom_voyageai_url>',
          // truncate: true
        }),
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerVoyageAI

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
