// TODO - make this script run as part of the test framework

// START-ANY
// Set these environment variables
// WCS_URL - The URL for your Weaviate instance
// WCS_API_KEY - The API key for your Weaviate instance
// OPENAI_API_KEY - The API key for your OpenAI account

// END-ANY

// START create schema
import weaviate, { WeaviateClient, ObjectsBatcher, ApiKey } from 'weaviate-ts-client';

const WCS_URL=process.env["WCS_URL"];
const WCS_API_KEY=process.env["WCS_API_KEY"];
const OPENAI_API_KEY=process.env["OPENAI_API_KEY"];

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: WCS_URL,
  apiKey: new ApiKey(WCS_API_KEY),
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

let collectionSchema = await client.schema
   .classGetter()
   .withClassName("Question")
   .do();

console.log(JSON.stringify(collectionSchema, null, 2));

// Display schema as verification
console.log(JSON.stringify(newCollection, null, 2));
// END create schema
