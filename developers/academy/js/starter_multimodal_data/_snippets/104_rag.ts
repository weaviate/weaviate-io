// START-ANY
import 'dotenv/config'
import weaviate, { WeaviateClient } from "weaviate-client";
let client: WeaviateClient;

// END-ANY

client = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL as string,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
    headers: {
      'X-Cohere-Api-Key': process.env.OPENAI_APIKEY as string,  // Replace with your inference API key
    }
  }
)

// START-ANY
// Instantiate your client (not shown). e.g.:
// headers = {"X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY")}  # Replace with your OpenAI API key
// client = weaviate.connect_to_local(headers=headers)


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

const response = await movies.generate.nearMedia(queryB64, "image",
  {
    // highlight-start
    singlePrompt: "Translate this into French: {title}"
    // highlight-end
  }, {
  limit: 5
},
)

// Inspect the response
// Inspect the response
for (let item of response.objects) {
  console.log(`${item.properties.title} - ${item.generated}`)
}
// END SinglePromptGeneration

client.close()
// END SinglePromptGeneration


console.log("\n\n")


// GroupedTaskGeneration
// Get the collection
const movies = client.collections.get("MovieMM")

// Perform query
const srcImgPath = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
const queryB64 = await urlToBase64(srcImgPath)

const response = await movies.generate.nearMedia(queryB64,"image",
    
{
    // highlight-start
    groupedTask: "What do these movies have in common?",
    groupedProperties: ["title", "overview"]  // Optional parameter; for reducing prompt length
    // highlight-end
},
    {
      limit: 5}
)

// Inspect the response
for (let item of response.objects) {
  console.log('Title: ', item.properties.title) // Print the title
}

// highlight-start
console.log(response.generated) // Print the generated text (the commonalities between them)
// highlight-end

client.close()
// END GroupedTaskGeneration