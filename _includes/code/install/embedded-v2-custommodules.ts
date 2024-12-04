// START CustomModules
import weaviate, { EmbeddedOptions } from 'weaviate-ts-embedded';

const client = weaviate.client(
  new EmbeddedOptions({
    env: {
      ENABLE_MODULES: "backup-s3,text2vec-openai,text2vec-cohere,text2vec-huggingface,ref2vec-centroid,generative-openai,qna-openai",
    },
  })
);

await client.embedded.start();

// Add your client code here.

await client.embedded.stop();
// END CustomModules
