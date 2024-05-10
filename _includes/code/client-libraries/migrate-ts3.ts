// CompleteScript // Imports
import weaviate from 'weaviate-client'
import 'dotenv/config';
// END CompleteScript // END Imports

// CompleteScript // Connect
async function main() {
  // define a collection name
  const collectionName = 'RollingStones'
// END CompleteScript
  
// CompleteScript // CreateClient  
  // connect to your Weaviate instance on WCS
  const client = await weaviate.connectToWCS(
    process.env.WEAVIATE_URL || '',
    {
      authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || ''),
      headers: {
        'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  
      }
    }
  )
// END CompleteScript // END CreateClient

  // create a new collection
  await client.collections.create({
    name: collectionName,
    vectorizer: weaviate.configure.vectorizer.text2VecOpenAI(),
  })

  const response = await fetch('https://raw.githubusercontent.com/weaviate/weaviate-io/tsdocs/content-fixes/_includes/clients/songs.json')

  // define a collection to interact with 
  const myCollection = client.collections.get(collectionName)

  // bulk insert data to your collection
  await myCollection.data.insertMany(await response.json())

  // run a nearText search that limits results to two items and shows the distance metric of the results
  const queryResponse = await myCollection.query.nearText('songs about cowboys',{
    limit: 2,
    returnMetadata: ['distance']
  })

  console.log('Here are songs about cowboys: ', queryResponse.objects)

  // delete your collection
  await client.collections.delete(collectionName)

  console.log('Collection Exists:', await client.collections.exists(collectionName))
}

main()
// END CompleteScript