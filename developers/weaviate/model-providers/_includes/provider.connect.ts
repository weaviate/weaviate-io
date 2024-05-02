// START-ANY
import weaviate from 'weaviate-client'

// END-ANY

// START AWSInstantiation
const aws_access_key = process.env.AWS_ACCESS_KEY || '';  // Replace with your AWS access key
const aws_secret_key = process.env.AWS_SECRET_KEY || '';  // Replace with your AWS secret key
// END AWSInstantiation
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
      // START AWSInstantiation
      'X-AWS-Access-Key': aws_access_key,
      'X-AWS-Secret-Key': aws_secret_key,
      // END AWSInstantiation
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

