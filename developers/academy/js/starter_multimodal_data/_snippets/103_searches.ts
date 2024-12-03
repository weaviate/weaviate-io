// START-ANY
import 'dotenv/config'
import weaviate, { WeaviateClient, type Filter } from "weaviate-client";
let client: WeaviateClient;

// END-ANY

client = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL as string,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
    headers: {
      'X-Cohere-Api-Key': process.env.COHERE_APIKEY as string,  // Replace with your inference API key
    }
  }
)

// START-ANY
// Instantiate your client (not shown). e.g.:
// headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key
// client = weaviate.connect_to_local(headers=headers)

// MetadataMultimodalSearch


async function urlToBase64(imageUrl: string) {
  const response = await fetch(imageUrl);
  const content = await response.buffer();
  return content.toString('base64');
}

// END-ANY

// SinglePromptGeneration
// Get the collection
const movies = client.collections.get("MovieMM")

// Perform query
const srcImgPath = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
const queryB64 = await urlToBase64(srcImgPath)

const response = await movies.query.nearImage(queryB64,
   {
  limit: 5,
  returnMetadata: ['distance'],
  returnProperties: ["title", "tmdb_id", "release_date"]
},
)

// Inspect the response
for (let item of response.objects) {
  console.log(`${item.properties.title} - ${item.properties.release_date}`)
   // Print the title and release year (note the release date is a datetime object)
   console.log(`Distance to query: ${item.metadata?.distance}`)
   // Print the distance of the object from the query


}
client.close()
// END MetadataMultimodalSearch

console.log("\n\n")


// MetadataSemanticSearch
// Get the collection
const movies = client.collections.get("MovieMM")

// Perform query
const srcImgPath = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
const queryB64 = await urlToBase64(srcImgPath)

const response = await movies.query.nearImage(queryB64,
   {
  limit: 5,
  returnMetadata: ['distance'],
  returnProperties: ["title", "tmdb_id", "release_date"]
},
)

// Inspect the response
for (let item of response.objects) {
  console.log(`${item.properties.title} - ${item.properties.release_date}`)
   // Print the title and release year (note the release date is a datetime object)
   console.log(`Distance to query: ${item.metadata?.distance}`)
   // Print the distance of the object from the query


}
client.close()
// END MetadataSemanticSearch

// MetadataBM25Search
// Get the collection
const movies = client.collections.get("MovieMM")

// Perform query
const srcImgPath = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
const queryB64 = await urlToBase64(srcImgPath)

const response = await movies.query.bm25("history",
   {
  limit: 5,
  returnMetadata: ['score'],
},
)

// Inspect the response
for (let item of response.objects) {
  console.log(`${item.properties.title} - ${item.properties.release_date}`)
   // Print the title and release year (note the release date is a datetime object)
   console.log(`BM25 score: ${item.metadata?.score}`)
   // Print the distance of the object from the query


}
client.close()
// END MetadataBM25Search


print("\n\n")

client.connect()

// MetadataHybridSearch
// Get the collection
const movies = client.collections.get("MovieMM")

// Perform query
const srcImgPath = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
const queryB64 = await urlToBase64(srcImgPath)

const response = await movies.query.hybrid("history",
   {
  limit: 5,
  returnMetadata: ['score'],
  returnProperties: ["title", "tmdb_id", "release_date"]
},
)

// Inspect the response
for (let item of response.objects) {
  console.log(`${item.properties.title} - ${item.properties.release_date}`)
   // Print the title and release year (note the release date is a datetime object)
   console.log(`Hybrid score: ${item.metadata?.score}`)
   // Print the hybrid score of the object from the query


}
client.close()
// END MetadataHybridSearch


print("\n\n")

client.connect()

// FilteredSemanticSearch
// Get the collection
const movies = client.collections.get("MovieMM")

// Perform query
const srcImgPath = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
const queryB64 = await urlToBase64(srcImgPath)
const filterTime = new Date(2020, 5, 10)

const response = await movies.query.nearText("dystopian future",
   {
  limit: 5,
  returnMetadata: ['distance'],
  filters: movies.filter.byProperty("release_date").greaterThan(filterTime)
},
)

// Inspect the response
for (let item of response.objects) {
  console.log(`${item.properties.title} - ${item.properties.release_date}`)
   // Print the title and release year (note the release date is a datetime object)
   console.log(`Distance to query: ${item.metadata?.distance}`)
   // Print the distance of the object from the query


}
client.close()
// END FilteredSemanticSearch