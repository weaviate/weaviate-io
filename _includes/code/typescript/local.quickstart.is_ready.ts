// InstantiationExample
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToLocal();

var clientReadiness = await client.isReady();
console.log(clientReadiness); // Should return `true`

client.close(); // Close the client connection
// END InstantiationExample
