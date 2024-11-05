// InstantiationExample
import weaviate, { WeaviateClient } from 'weaviate-client';

// highlight-start
const client: WeaviateClient = await weaviate.connectToLocal();
// highlight-end

var clientReadiness = await client.isReady();

console.log(clientReadiness); // Should return `true`

client.close(); // Close the client connection
// END InstantiationExample
