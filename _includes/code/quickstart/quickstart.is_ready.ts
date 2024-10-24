// InstantiationExample
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
  }
)

var clientReadiness = await client.isReady();
console.log(clientReadiness);  // Should return `true`
// END InstantiationExample
