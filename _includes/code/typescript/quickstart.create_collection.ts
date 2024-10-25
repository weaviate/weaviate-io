// CreateCollection
import weaviate, { WeaviateClient, vectorizer, generative } from 'weaviate-client';

// Best practice: store your credentials in environment variables
const wcdUrl = process.env.WCD_URL as string;
const wcdApiKey = process.env.WCD_API_KEY as string;

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  wcdUrl, // Replace with your Weaviate Cloud URL
  {
    authCredentials: new weaviate.ApiKey(wcdApiKey), // Replace with your Weaviate Cloud API key
  }
);

// END CreateCollection
// Delete this collection if it already exists
await client.collections.delete('Question');

// CreateCollection
// highlight-start
await client.collections.create({
  name: 'Question',
  vectorizers: vectorizer.text2VecOpenAI(),
  generative: generative.openAI(),
});
// highlight-end

client.close(); // Close the client connection
// END CreateCollection
