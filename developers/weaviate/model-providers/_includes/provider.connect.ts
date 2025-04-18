// START-ANY
import weaviate from 'weaviate-client'

// END-ANY

// START AnthropicInstantiation
const anthropicApiKey = process.env.ANTHROPIC_APIKEY || '';  // Replace with your inference API key
// END AnthropicInstantiation
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
// START DatabricksInstantiation
const databricksToken = process.env.DATABRICKS_TOKEN || '';  // Replace with your inference API key
// END DatabricksInstantiation
// START FriendliInstantiation
const friendliApiKey = process.env.FRIENDLI_TOKEN || '';  // Replace with your inference API key
// END FriendliInstantiation
// START GoogleInstantiation  // START GoogleVertexInstantiation
const vertexApiKey = process.env.VERTEX_APIKEY || '';  // Replace with your inference API key
// START GoogleInstantiation  // END GoogleVertexInstantiation
const studioApiKey = process.env.STUDIO_APIKEY || '';  // Replace with your inference API key
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
// START NVIDIAInstantiation
const nvidiaApiKey = process.env.NVIDIA_APIKEY || '';  // Replace with your inference API key
// END NVIDIAInstantiation
// START OctoAIInstantiation
const octoaiApiKey = process.env.OCTOAI_APIKEY || '';  // Replace with your inference API key
// END OctoAIInstantiation
// START OpenAIInstantiation
const openaiApiKey = process.env.OPENAI_APIKEY || '';  // Replace with your inference API key
// END OpenAIInstantiation
// START AzureOpenAIInstantiation
const azureApiKey = process.env.AZURE_APIKEY || '';  // Replace with your inference API key
// END AzureOpenAIInstantiation
// START VoyageAIInstantiation
const voyageaiApiKey = process.env.VOYAGEAI_APIKEY || '';  // Replace with your inference API key
// END VoyageAIInstantiation
// START Xainstantiation
const xaiApiKey = process.env.XAI_APIKEY || '';  // Replace with your inference API key
// END XaiInstantiation

// START-ANY

const client = await weaviate.connectToWeaviateCloud(
  'WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_APIKEY'),
    // highlight-start
    headers: {
      // END-ANY
      // START AnthropicInstantiation
      'X-Anthropic-Api-Key': anthropicApiKey,
      'X-Anthropic-Baseurl': 'https://api.anthropic.com',  // Optional; for providing a custom base URL
      // END AnthropicInstantiation
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
      // START DatabricksInstantiation
      'X-Databricks-Token': databricksToken,
      // END DatabricksInstantiation
      // START FriendliInstantiation  // START FriendliDedicatedInstantiation
      'X-Friendli-Api-Key': friendliApiKey,
      // END FriendliInstantiation  // END FriendliDedicatedInstantiation
      // START FriendliDedicatedInstantiation
      'X-Friendli-Baseurl': 'https://inference.friendli.ai/dedicated',
      // END FriendliDedicatedInstantiation
      // START GoogleInstantiation  // START GoogleVertexInstantiation
      'X-Vertex-Api-Key': vertexApiKey,
      // START GoogleInstantiation  // END GoogleVertexInstantiation
      'X-Studio-Api-Key': studioApiKey,
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
      // START NVIDIAInstantiation
      'X-NVIDIA-Api-Key': nvidiaApiKey,
      // END NVIDIAInstantiation
      // START OctoAIInstantiation
      'X-OctoAI-Api-Key': octoaiApiKey,
      // END OctoAIInstantiation
      // START OpenAIInstantiation
      'X-OpenAI-Api-Key': openaiApiKey,
      // END OpenAIInstantiation
      // START AzureOpenAIInstantiation
      'X-Azure-Api-Key': azureApiKey,
      // END AzureOpenAIInstantiation
      // START VoyageAIInstantiation
      'X-VoyageAI-Api-Key': voyageaiApiKey,
      // END VoyageAIInstantiation
      // START XaiInstantiation
      'X-Xai-Api-Key': xaiApiKey,
      // END XaiInstantiation
      // START-ANY
    }
    // highlight-end
  }
)

// Work with Weaviate

client.close()
// END-ANY

