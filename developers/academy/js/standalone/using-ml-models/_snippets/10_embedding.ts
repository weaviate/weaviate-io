// START Connect
import weaviate, { WeaviateClient, configure } from 'weaviate-client'

// END Connect
import 'dotenv/config'

// START Connect
const weaviateURL = process.env.WEAVIATE_URL as string
const weaviateKey = process.env.WEAVIATE_API_KEY as string
const cohereKey = process.env.COHERE_API_KEY as string

// Connect to your Weaviate instance  
const client: WeaviateClient = await weaviate.connectToWeaviateCloud(weaviateURL,{
    authCredentials: new weaviate.ApiKey(weaviateKey),
    headers: {
      'X-Cohere-Api-Key': cohereKey,  // Replace with your inference API key
    }
  }
)
// END Connect
  // Delete the "JeopardyQuestion" collection if it exists
  await client.collections.delete('JeopardyQuestion');

  if (await client.collections.exists('JeopardyQuestion') == false) {
    
    // Create a collection with both a vectorizer and generative model
// START Collection
await client.collections.create({
  name: 'JeopardyQuestion',
  properties: [
    { name: 'Category', dataType: configure.dataType.TEXT },
    { name: 'Question', dataType: configure.dataType.TEXT },
    { name: 'Answer', dataType: configure.dataType.TEXT}
  ],
  // Define your Cohere vectorizer and generative model  
  vectorizers: weaviate.configure.vectorizer.text2VecCohere({
    sourceProperties: ["Question", "Answer"]
  }),
});
// END Collection

  }

    try {
// START Importing
let jeopardyCollection = client.collections.get('JeopardyQuestion');
// Download data to import into the "JeopardyQuestion" collection
const url = 'https://raw.githubusercontent.com/weaviate/weaviate-examples/main/jeopardy_small_dataset/jeopardy_tiny.json'
const response = await fetch(url);
const jeopardyQuestions = await response.json();

// Bulk insert downloaded data into the "JeopardyQuestion" collection
await jeopardyCollection.data.insertMany(jeopardyQuestions.data)
// END Importing
      console.log('Data Imported');
    } catch (e) {
      console.error(e);
    }
// START Search
const jeopardyCollection = client.collections.get('JeopardyQuestion');

const searchResults = await jeopardyCollection.query.nearText(['question about animals'], {
    limit: 3,
    returnMetadata: ['distance'], // Return the distance of results from the query vector
    includeVector: false // Change to true to include objects' vectors in your response
})

console.log("Near Text objects for:", JSON.stringify(searchResults, null, 2));
// END Search

  
