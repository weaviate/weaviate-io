// NearText
import weaviate, { WeaviateClient } from 'weaviate-client';

// Best practice: store your credentials in environment variables
const wcdUrl = process.env.WCD_URL as string;
const wcdApiKey = process.env.WCD_API_KEY as string;
const cohereKey = process.env.COHERE_APIKEY as string;

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  wcdUrl, // Replace with your Weaviate Cloud URL
  {
    authCredentials: new weaviate.ApiKey(wcdApiKey), // Replace with your Weaviate Cloud API key
    // highlight-start
    headers: {
      'X-Cohere-Api-Key': cohereKey, // Replace with your Cohere API key
    },
    // highlight-end
  }
);

// highlight-start
const questions = client.collections.get('Question');

const result = await questions.query.nearText('biology', {
  limit: 2,
});
// highlight-end

result.objects.forEach((item) => {
  console.log(JSON.stringify(item.properties, null, 2));
});

client.close(); // Close the client connection
// END NearText
