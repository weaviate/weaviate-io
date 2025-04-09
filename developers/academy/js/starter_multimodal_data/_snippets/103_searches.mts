import 'dotenv/config'
// START-ANY
import weaviate, { WeaviateClient, WeaviateReturn } from "weaviate-client";
let client: WeaviateClient;
let response: WeaviateReturn<undefined>
// END-ANY

client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL as string,{
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY as string),
    headers: {
      'X-VoyageAI-Api-Key': process.env.VOYAGEAI_API_KEY as string,   // Replace with your inference API key
      'X-Cohere-Api-Key': process.env.COHERE_API_KEY as string,  // Replace with your inference API key
     
    }
  }
)

// START-ANY

// Instantiate your client (not shown). e.g.:
// const requestHeaders = {'X-VoyageAI-Api-Key': process.env.VOYAGEAI_API_KEY as string,}
// client = weaviate.connectToWeaviateCloud(..., headers: requestHeaders) or
// client = weaviate.connectToLocal(..., headers: requestHeaders)

async function urlToBase64(imageUrl: string) {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const content = Buffer.from(arrayBuffer);
  return content.toString('base64');
}
// END-ANY

// MetadataMultimodalSearch // SinglePromptGeneration // MetadataSemanticSearch // MetadataBM25Search // MetadataHybridSearch // FilteredSemanticSearch

// Get the collection
const movies = client.collections.get("Movie")

// Perform query
const srcImgPath = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
const queryB64 = await urlToBase64(srcImgPath)
// END MetadataMultimodalSearch // END SinglePromptGeneration // END MetadataSemanticSearch // END MetadataBM25Search // END MetadataHybridSearch // END FilteredSemanticSearch

// MetadataMultimodalSearch

response = await movies.query.nearImage(queryB64, {
    limit: 5,
    returnMetadata: ['distance'],
    returnProperties: ["title", "tmdb_id", "release_date", "poster"]
  },
)

// Inspect the response
for (let item of response.objects) {
  // Print the title and release year (note the release date is a datetime object)
  console.log(`${item.properties.title} - ${item.properties.release_date}`)
  // Print the distance of the object from the query
  console.log(`Distance to query: ${item.metadata?.distance}`)
}

client.close()
// END MetadataMultimodalSearch

console.log("\n\n")


// MetadataSemanticSearch
response = await movies.query.nearText("red", {
    limit: 5,
    returnMetadata: ['distance'],
    returnProperties: ["title", "tmdb_id", "release_date"]
  },
)

// Inspect the response
for (let item of response.objects) {
  // Print the title and release year (note the release date is a datetime object)
  console.log(`${item.properties.title} - ${item.properties.release_date}`)
  // Print the distance of the object from the query
  console.log(`Distance to query: ${item.metadata?.distance}`)
}

client.close()
// END MetadataSemanticSearch

// MetadataBM25Search

response = await movies.query.bm25("history", {
  limit: 5,
  returnMetadata: ['score'],
},
)

// Inspect the response
for (let item of response.objects) {
  // Print the title and release year (note the release date is a datetime object)
  console.log(`${item.properties.title} - ${item.properties.release_date}`)
  // Print the distance of the object from the query
  console.log(`BM25 score: ${item.metadata?.score}`)
}

client.close()
// END MetadataBM25Search


console.log("\n\n")

// client.connect()

// MetadataHybridSearch

response = await movies.query.hybrid("history", {
  limit: 5,
  returnMetadata: ['score'],
  returnProperties: ["title", "tmdb_id", "release_date"]
},
)

// Inspect the response
for (let item of response.objects) {
  // Print the title and release year (note the release date is a datetime object)
  console.log(`${item.properties.title} - ${item.properties.release_date}`)
  // Print the hybrid score of the object from the query
  console.log(`Hybrid score: ${item.metadata?.score}`)
}

client.close()
// END MetadataHybridSearch


console.log("\n\n")

// client.connect()

// FilteredSemanticSearch

const filterTime = new Date(2010, 1, 1)

response = await movies.query.nearText("dystopian future", {
    limit: 5,
    returnMetadata: ['distance'],
    filters: movies.filter.byProperty("release_date").greaterThan(filterTime)
  }
)

// Inspect the response
for (let item of response.objects) {
  // Print the title and release year (note the release date is a datetime object)
  console.log(`${item.properties.title} - ${item.properties.release_date}`)
  // Print the distance of the object from the query
  console.log(`Distance to query: ${item.metadata?.distance}`)
}

client.close()
// END FilteredSemanticSearch
