// START WeaviateInstantiation
import weaviate from 'weaviate-client'

// Best practice: store your credentials in environment variables
const weaviateUrl = process.env.WEAVIATE_URL as string;        // Weaviate URL: "REST Endpoint" in Weaviate Cloud console
const weaviateApiKey = process.env.WEAVIATE_API_KEY as string; // Weaviate API key: "ADMIN" API key in Weaviate Cloud console

const client = await weaviate.connectToWeaviateCloud(
  weaviateUrl,  
  {
    authCredentials: new weaviate.ApiKey(weaviateApiKey),  
  }
)

// Work with Weaviate

client.close()
// END WeaviateInstantiation

