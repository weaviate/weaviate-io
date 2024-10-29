// Import
import weaviate, { WeaviateClient } from 'weaviate-client';

// Best practice: store your credentials in environment variables
const wcdUrl = process.env.WCD_URL as string;
const wcdApiKey = process.env.WCD_API_KEY as string;
const openAIKey = process.env.OPENAI_APIKEY as string;

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  wcdUrl, // Replace with your Weaviate Cloud URL
  {
    authCredentials: new weaviate.ApiKey(wcdApiKey), // Replace with your Weaviate Cloud API key
    // highlight-start
    headers: {
      'X-OpenAI-Api-Key': openAIKey, // Replace with your OpenAI API key
    },
    // highlight-end
  }
);

// Load data
async function getJsonData() {
  const file = await fetch(
    'https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json'
  );
  return file.json();
}

// highlight-start
// Note: The TS client does not have a `batch` method yet
// We use `insertMany` instead, which sends all of the data in one request
async function importQuestions() {
  const questions = client.collections.get('Question');
  const data = await getJsonData();
  const result = await questions.data.insertMany(data);
  console.log('Insertion response: ', result);
}

await importQuestions();
// highlight-end

client.close(); // Close the client connection
// END Import
