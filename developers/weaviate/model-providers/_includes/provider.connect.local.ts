// START-ANY
import weaviate from 'weaviate-client'
// END-ANY

// START-ANY

const client = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_APIKEY'),
  }
)

// Work with Weaviate

client.close()
// END-ANY

