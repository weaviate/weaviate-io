// START SimpleInstance
import weaviate, { EmbeddedOptions } from 'weaviate-ts-embedded';

const client = weaviate.client(new EmbeddedOptions());

await client.embedded.start();

// Add your client code here.

await client.embedded.stop();
// END SimpleInstance

