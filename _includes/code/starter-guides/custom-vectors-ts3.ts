// TODO - make this script run as part of the test framework

// START-ANY
// Set these environment variables
// WCD_URL - The URL for your Weaviate instance
// WCD_API_KEY - The API key for your Weaviate instance
// OPENAI_API_KEY - The API key for your OpenAI account

// END-ANY

// START create schema
import weaviate, { WeaviateClient } from 'weaviate-client';

const WCD_URL=process.env["WCD_URL"];
const WCD_API_KEY=process.env["WCD_API_KEY"];
const OPENAI_API_KEY=process.env["OPENAI_API_KEY"];

const client: WeaviateClient = await weaviate.connectToWCD(
  WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': OPENAI_API_KEY,
   }
 }
)

await client.collections.create({
 name: 'Question',
 vectorizers: weaviate.configure.vectorizer.text2VecOpenAI(),
 properties: [
     {
      name: 'question',
      description: 'What to ask',
      dataType: weaviate.configure.dataType.TEXT,
      vectorizePropertyName: true,
      tokenization: 'word',
    },
    {
     name: 'answer',
     description: 'The clue',
     dataType: weaviate.configure.dataType.TEXT,
     tokenization: 'word',
     skipVectorization: true
     },
     {
      name: 'category',
      description: 'The subject',
      dataType: weaviate.configure.dataType.TEXT,
      tokenization: 'word',
      skipVectorization: true
     },
   ],
})

// Display schema as verification
const collectionDefinition = client.collections.get('Question')
console.log(await collectionDefinition.config.get())
// END create schema
