// NOT TESTED TO RUN AS AN END TO END SCRIPT

// START SimpleInstance
import weaviate, { EmbeddedOptions } from 'weaviate-ts-embedded';

  const client = weaviate.client(new EmbeddedOptions());

  await client.embedded.start();

  const response = await client.data
    .creator()
    .withClassName('Wine')
    .withProperties({
      name: 'Chardonnay',
      description: 'Goes with fish',
    })
    .do();

  console.log(JSON.stringify(response, null, 2));
// END SimpleInstance



// START CustomModules
import weaviate, { EmbeddedOptions } from 'weaviate-ts-embedded';

const client = weaviate.client(
  new EmbeddedOptions({
    env: {
      ENABLE_MODULES: "backup-s3,text2vec-openai,text2vec-cohere,text2vec-huggingface,ref2vec-centroid,generative-openai,qna-openai",
    },
  })
);
// END CustomModules
