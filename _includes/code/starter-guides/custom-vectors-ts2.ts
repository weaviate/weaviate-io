// TODO - make this script run as part of the test framework

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
        description: 'What to ask',
        dataType: ['text'],
    },
    {
         name: 'answer',
         description: 'The clue',
         dataType: ['text'],
     },
     {
         name: 'category',
         description: 'The subject',
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
