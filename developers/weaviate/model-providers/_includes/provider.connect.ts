// START-ANY
import weaviate from 'weaviate-client'

// END-ANY

// START CohereInstantiation
const cohereApiKey = process.env.COHERE_API_KEY || '';  // Replace with your inference API key
// END CohereInstantiation
// START OpenAIInstantiation
const openaiApiKey = process.env.OPENAI_API_KEY || '';  // Replace with your inference API key
// END OpenAIInstantiation

// START-ANY

const client = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_API_KEY'),
    // highlight-start
    headers: {
      // END-ANY
      // START CohereInstantiation
      'X-Cohere-Api-Key': cohereApiKey,
      // END CohereInstantiation
      // START OpenAIInstantiation
      'X-OpenAI-Api-Key': openaiApiKey,
      // END OpenAIInstantiation
      // START-ANY
    }
    // highlight-end
  }
)

// Work with Weaviate

client.close()
// END-ANY

