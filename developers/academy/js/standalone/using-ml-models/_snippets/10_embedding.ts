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

    const jeopardyCollection = client.collections.get('JeopardyQuestion');
    // Make a semantic search query to the "JeopardyQuestion" with text as query input
    const searchResults = await jeopardyCollection.query.nearText(['question about animals'], {
        limit: 3,
        returnMetadata: ['distance'], // Return the distance of results from the query vector
        includeVector: false // Change to true to include objects' vectors in your response
    })

    console.log("Near Text objects for:", "search", JSON.stringify(searchResults, null, 2));
  
