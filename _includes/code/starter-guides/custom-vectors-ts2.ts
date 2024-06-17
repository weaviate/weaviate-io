// TODO - make this script run as part of the test framework

// START-ANY
// Set these environment variables
// WCD_URL - The URL for your Weaviate instance
// WCD_API_KEY - The API key for your Weaviate instance
// OPENAI_API_KEY - The API key for your OpenAI account

// END-ANY

// START create schema
import weaviate, { WeaviateClient, ObjectsBatcher, ApiKey } from 'weaviate-ts-client';

const WCD_URL=process.env["WCD_URL"];
const WCD_API_KEY=process.env["WCD_API_KEY"];
const OPENAI_API_KEY=process.env["OPENAI_API_KEY"];

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: WCD_URL,
  apiKey: new ApiKey(WCD_API_KEY),
  headers: { 'X-OpenAI-Api-Key': OPENAI_API_KEY },
});

const newCollection = {
  class: 'Question',
  description: 'What to ask',
  vectorizer: 'text2vec-openai',
  vectorizePropertyName: true,
  tokenization: 'word',
  properties: [
    {
        name: 'question',
        dataType: ['text'],
    },
    {
         name: 'answer',
         dataType: ['text'],
     },
     {
           name: 'category',
           dataType: ['text'],
       },
    ]
 }

// Add the class to the schema
await client
  .schema
  .classCreator()
  .withClass(newCollection)
  .do();

// Display schema as verification
console.log(JSON.stringify(newCollection, null, 2));
// END create schema
