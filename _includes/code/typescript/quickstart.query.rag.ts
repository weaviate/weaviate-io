// RAG
import weaviate, { WeaviateClient } from 'weaviate-client';

// Best practice: store your credentials in environment variables
const weaviateUrl = process.env.WEAVIATE_URL as string;
const weaviateApiKey = process.env.WEAVIATE_API_KEY as string;
const cohereKey = process.env.COHERE_APIKEY as string;

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  weaviateUrl, // Replace with your Weaviate Cloud URL
  {
    authCredentials: new weaviate.ApiKey(weaviateApiKey), // Replace with your Weaviate Cloud API key
    // highlight-start
    headers: {
      'X-Cohere-Api-Key': cohereKey, // Replace with your Cohere API key
    },
    // highlight-end
  }
);

// highlight-start
const questions = client.collections.get('Question');

const result = await questions.generate.nearText(
  'biology',
  {
    groupedTask: 'Write a tweet with emojis about these facts.',
  },
  {
    limit: 2,
  }
);
// highlight-end

console.log(result.generated);

client.close(); // Close the client connection
// END RAG
