// InstantiationExample
import weaviate, { WeaviateClient } from 'weaviate-client';

// Best practice: store your credentials in environment variables
const wcdUrl = process.env.WCD_URL as string;
const wcdApiKey = process.env.WCD_API_KEY as string;

// highlight-start
const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  wcdUrl, // Replace with your Weaviate Cloud URL
  {
    authCredentials: new weaviate.ApiKey(wcdApiKey), // Replace with your Weaviate Cloud API key
  }
);
// highlight-end

var clientReadiness = await client.isReady();
console.log(clientReadiness); // Should return `true`

client.close(); // Close the client connection
// END InstantiationExample
