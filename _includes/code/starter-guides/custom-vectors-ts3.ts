// TODO - make this script run as part of the test framework

// START-ANY
// Set these environment variables
// WEAVIATE_URL - The URL for your Weaviate instance
// WEAVIATE_API_KEY - The API key for your Weaviate instance
// OPENAI_API_KEY - The API key for your OpenAI account

// END-ANY

// START create schema
import weaviate, { WeaviateClient } from 'weaviate-client';

const WEAVIATE_URL=process.env["WEAVIATE_URL"];
const WEAVIATE_API_KEY=process.env["WEAVIATE_API_KEY"];
const OPENAI_API_KEY=process.env["OPENAI_API_KEY"];

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  WEAVIATE_URL as string,
 {
   authCredentials: new weaviate.ApiKey(WEAVIATE_API_KEY as string),
   headers: {
     'X-OpenAI-Api-Key': OPENAI_API_KEY as string,
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
