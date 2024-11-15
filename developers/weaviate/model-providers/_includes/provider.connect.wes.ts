// START WESInstantiation
import weaviate from 'weaviate-client'

// END WESInstantiation

// START WESInstantiation
const client = await weaviate.connectToWeaviateCloud(
  'WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_APIKEY'),
  }
)

// Work with Weaviate

client.close()
// END WESInstantiation

