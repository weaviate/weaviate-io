// CreateCollection
import weaviate, { WeaviateClient, vectorizer, generative } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL as string,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
  }
)

// END CreateCollection
// Delete this collection if it already exists
await client.collections.delete('Question')

// CreateCollection
// highlight-start
await client.collections.create({
  name: 'Question',
  vectorizers: vectorizer.text2VecOpenAI(),
  generative: generative.openAI(),
})
// highlight-end

client.close()
// END CreateCollection
