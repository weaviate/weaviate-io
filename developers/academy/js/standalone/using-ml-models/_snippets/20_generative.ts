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
// START Collection  
await client.collections.create({
  name: 'JeopardyQuestion',
  properties: [
    { name: 'Category', dataType: configure.dataType.TEXT },
    { name: 'Question', dataType: configure.dataType.TEXT },
    { name: 'Answer', dataType: configure.dataType.TEXT}
  ],
  // Define your Cohere vectorizer and generative model  
  vectorizers: weaviate.configure.vectorizer.text2VecCohere(),
  // highlight-start
  generative: weaviate.configure.generative.cohere()
  // highlight-start
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

console.log('Data Imported');
// END Importing
    } catch (e) {
      console.error(e);
    }

    const myCollection = client.collections.get('JeopardyQuestion');
// START SingleGenerative  
const genResult = await myCollection.generate.nearText("african elephant in savanna", {
  singlePrompt: "translate {answer} into french for me",
})

for (const item of genResult.objects) {
  console.log("Single generated concept:", item.generated);
}
// END SingleGenerative  

// START GroupedGenerative  
const groupedGenResult = await myCollection.generate.nearText("african elephant in savanna", {
  groupedTask: "Summarize all the results received into a single informational paragraph?",
  groupedProperties: ["answer"]
})

console.log("Grouped generated concept:", groupedGenResult.generated);
// END GroupedGenerative  
