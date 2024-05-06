// START-ANY
import weaviate from 'weaviate-client'

// END-ANY

// START AnyscaleInstantiation
const anyscaleApiKey = process.env.ANYSCALE_APIKEY || '';  // Replace with your inference API key
// END AnyscaleInstantiation
// START AWSInstantiation
const aws_access_key = process.env.AWS_ACCESS_KEY || '';  // Replace with your AWS access key
const aws_secret_key = process.env.AWS_SECRET_KEY || '';  // Replace with your AWS secret key
// END AWSInstantiation
// START CohereInstantiation
const cohereApiKey = process.env.COHERE_APIKEY || '';  // Replace with your inference API key
// END CohereInstantiation
// START GoogleInstantiation
const googleApiKey = process.env.GOOGLE_APIKEY || '';  // Replace with your inference API key
// END GoogleInstantiation
// START HuggingFaceInstantiation
const huggingFaceApiKey = process.env.HUGGINGFACE_APIKEY || '';  // Replace with your inference API key
// END HuggingFaceInstantiation
// START JinaAIInstantiation
const jinaaiApiKey = process.env.JINAAI_APIKEY || '';  // Replace with your inference API key
// END JinaAIInstantiation
// START MistralInstantiation
const mistralApiKey = process.env.MISTRAL_APIKEY || '';  // Replace with your inference API key
// END MistralInstantiation
// START OpenAIInstantiation
const openaiApiKey = process.env.OPENAI_APIKEY || '';  // Replace with your inference API key
// END OpenAIInstantiation
// START AzureOpenAIInstantiation
const azureApiKey = process.env.AZURE_APIKEY || '';  // Replace with your inference API key
// END AzureOpenAIInstantiation
// START VoyageAIInstantiation
const voyageaiApiKey = process.env.VOYAGEAI_APIKEY || '';  // Replace with your inference API key
// END VoyageAIInstantiation

// START-ANY

const client = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_APIKEY'),
    // highlight-start
    headers: {
      // END-ANY
      // START AnyscaleInstantiation
      'X-Anyscale-Api-Key': anyscaleApiKey,
      // END AnyscaleInstantiation
      // START AWSInstantiation
      'X-AWS-Access-Key': aws_access_key,
      'X-AWS-Secret-Key': aws_secret_key,
      // END AWSInstantiation
      // START CohereInstantiation
      'X-Cohere-Api-Key': cohereApiKey,
      // END CohereInstantiation
      // START GoogleInstantiation
      'X-Google-Api-Key': googleApiKey,
      // END GoogleInstantiation
      // START JinaAIInstantiation
      'X-JinaAI-Api-Key': jinaaiApiKey,
      // END JinaAIInstantiation
      // START HuggingFaceInstantiation
      'X-HuggingFace-Api-Key': huggingFaceApiKey,
      // END HuggingFaceInstantiation
      // START MistralInstantiation
      'X-Mistral-Api-Key': mistralApiKey,
      // END MistralInstantiation
      // START OpenAIInstantiation
      'X-OpenAI-Api-Key': openaiApiKey,
      // END OpenAIInstantiation
      // START AzureOpenAIInstantiation
      'X-Azure-Api-Key': azureApiKey,
      // END AzureOpenAIInstantiation
      // START VoyageAIInstantiation
      'X-VoyageAI-Api-Key': voyageaiApiKey,
      // END VoyageAIInstantiation
      // START-ANY
    }
    // highlight-end
  }
)

// Work with Weaviate

client.close()
// END-ANY

