// START WeaviateInstantiation
import weaviate from 'weaviate-client'

// END WeaviateInstantiation

// START WeaviateInstantiation
const client = await weaviate.connectToWeaviateCloud(
  'WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_APIKEY'),
  }
)

// Work with Weaviate

client.close()
// END WeaviateInstantiation

