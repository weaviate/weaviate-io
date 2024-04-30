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

// START VectorizerCohere
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer('default', {
      vectorizerConfig: weaviate.configure.vectorizer.text2VecCohere({
        // // These parameters are optional
        // model: 'embed-multilingual-v3.0',
        // truncate: 'END',
        // vectorizeClassName: true,
        // baseURL: '<custom_cohere_url>',
      }),
    }),
  ],
  // highlight-end
});
// START VectorizerCohere
