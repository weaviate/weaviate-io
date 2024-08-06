// START-ANY
import weaviate from 'weaviate-client'

const client = await weaviate.connectToLocal()

// Work with Weaviate

client.close()
// END-ANY

