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
     name: 'title',
     dataType: weaviate.configure.dataType.TEXT,
     vectorizePropertyName: true,
     tokenization: 'lowercase' ,
   },
   {
     name: 'body',
     dataType: weaviate.configure.dataType.TEXT,
     tokenization: 'whitespace',
     skipVectorization: true
   },
 ],
})

// Display schema as verification
console.log(JSON.stringify(newCollection, null, 2));
// END create schema
