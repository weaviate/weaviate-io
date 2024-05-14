// TODO - make this script run as part of the test framework

// START-ANY
// Set these environment variables
// WCS_URL - The URL for your Weaviate instance
// WCS_API_KEY - The API key for your Weaviate instance
// OPENAI_API_KEY - The API key for your OpenAI account

// END-ANY

// START create schema
import weaviate, { WeaviateClient } from 'weaviate-client';

const WCS_URL=process.env["WCS_URL"];
const WCS_API_KEY=process.env["WCS_API_KEY"];
const OPENAI_API_KEY=process.env["OPENAI_API_KEY"];

const client: WeaviateClient = await weaviate.connectToWCS(
  WCS_URL,
 {
   authCredentials: new weaviate.ApiKey(WCS_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': OPENAI_API_KEY,
   }
 } 
)

const newCollection = await client.collections.create({
 name: 'Question',
 properties: [
     {
      name: 'question',
      description: 'What to ask',
      dataType: weaviate.configure.dataType.TEXT,
      vectorizer: 'text2vec-openai',
      vectorizePropertyName: true,
      tokenization: 'word' ,
    },
    {
     name: 'answer',
     description: 'The clue',
     dataType: weaviate.configure.dataType.TEXT,
     vectorizer: 'text2vec-openai',
     tokenization: 'word',
     skipVectorization: true
     },
     {
      name: 'category',
      description: 'The subject',
      dataType: weaviate.configure.dataType.TEXT,
      vectorizer: 'text2vec-openai',
      tokenization: 'word',
      skipVectorization: true
     },
   ],
})

// Display schema as verification
const collectionDefinition = await client.collections.get('Question')
console.log(await collectionDefinition.config.get())
// END create schema
