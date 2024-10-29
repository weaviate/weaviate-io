import weaviate, { WeaviateClient } from 'weaviate-client'
import axios from 'axios';
import 'dotenv/config'


  const weaviateURL = process.env.WEAVIATE_URL as string
  const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string
  const cohereKey = process.env.COHERE_API_KEY as string

  // Connect to your Weaviate instance  
  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(weaviateURL,{
      authCredentials: new weaviate.ApiKey(weaviateKey),
      headers: {
        'X-Cohere-Api-Key': cohereKey,  // Replace with your inference API key
      }
    }
  )

  // Delete the "JeopardyQuestion" collection if it exists
  await client.collections.delete('JeopardyQuestion');

  if (await client.collections.exists('JeopardyQuestion') == false) {
    
    // Create a collection with both a vectorizer and generative model
    await client.collections.create({
      name: 'JeopardyQuestion',
      properties: [
        {
          name: 'Category',
          dataType: 'text' as const,
          description: 'Category of the question',
        },
        {
          name: 'Question',
          dataType: 'text' as const,
          description: 'The question',
        },
        {
          name: 'Answer',
          dataType: 'text' as const,
          description: 'The answer',
        }
      ],
      // Define your Cohere vectorizer and generative model  
      vectorizers: weaviate.configure.vectorizer.text2VecCohere(),
      generative: weaviate.configure.generative.cohere()
    });
}

    try {
      let jeopardyCollection = client.collections.get('JeopardyQuestion');
      
      // Download data to import into the "JeopardyQuestion" collection
      const url = 'https://raw.githubusercontent.com/weaviate/weaviate-examples/main/jeopardy_small_dataset/jeopardy_tiny.json'
      const jeopardyQuestions = await axios.get(url);

      // Bulk insert downloaded data into the "JeopardyQuestion" collection
      await jeopardyCollection.data.insertMany(jeopardyQuestions.data)

      console.log('Data Imported');
    } catch (e) {
      console.error(e);
    }

    const myCollection = client.collections.get('JeopardyQuestion');

  // Make a generative search with a single prompt
  const genResult = await myCollection.generate.nearText("african elephant in savanna", {
    singlePrompt: "tell me a quick story about this {question} or {answer}",
  })

  for (const item of genResult.objects) {
    console.log("Single generated concept:", item.generated);
  }

  // Make a generative search with a grouped task
  const groupedGenResult = await myCollection.generate.nearText("african elephant in savanna", {
    groupedTask: "Summarize all the results received into a single informational paragraph?",
  })

  console.log("Grouped generated concept:", groupedGenResult.generated);
  
