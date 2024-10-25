// RAG
import weaviate, { WeaviateClient } from 'weaviate-client';

// Best practice: store your credentials in environment variables
const wcdUrl = process.env.WCD_URL as string
const wcdApiKey = process.env.WCD_API_KEY as string
const openAIKey = process.env.OPENAI_APIKEY as string

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  wcdUrl,  // Replace with your Weaviate Cloud URL
  {
    authCredentials: new weaviate.ApiKey(wcdApiKey),  // Replace with your Weaviate Cloud API key
    headers: {
    'X-OpenAI-Api-Key': openAIKey,  // Replace with your OpenAI API key
    }
  }
)

// highlight-start
const questions = client.collections.get('JeopardyQuestion');

const result = await questions.generate.nearText(
  'biology',
  {
    groupedTask: 'Write a tweet with emojis about these facts.'
  },
  {
    limit: 2,
  }
)
// highlight-end

result.objects.forEach(item => {
  console.log(JSON.stringify(item.properties, null, 2))
})

client.close()  // Close the client connection
// END RAG
