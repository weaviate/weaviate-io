// CreateCollection
import weaviate, { WeaviateClient, vectorizer, generative } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToLocal();

// END CreateCollection
// Delete this collection if it already exists
await client.collections.delete('Question');

// CreateCollection
// highlight-start
await client.collections.create({
  name: 'Question',
  vectorizers: vectorizer.text2VecOllama({              // Configure the Ollama embedding integration
    apiEndpoint: 'http://host.docker.internal:11434',   // Allow Weaviate from within a Docker container to contact your Ollama instance
    model: 'nomic-embed-text',                          // The model to use
  }),
  generative: generative.ollama({                       // Configure the Ollama generative integration
    apiEndpoint: 'http://host.docker.internal:11434',   // Allow Weaviate from within a Docker container to contact your Ollama instance
    model: 'llama3.2',                                  // The model to use
  }),
});
// highlight-end

client.close(); // Close the client connection
// END CreateCollection
