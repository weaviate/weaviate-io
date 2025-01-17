import 'dotenv/config'
// START-ANY
import weaviate, { GenerativeReturn, WeaviateClient } from "weaviate-client";
let client: WeaviateClient;
let response: GenerativeReturn<undefined>
// END-ANY

client = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL as string,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
    headers: {
      'X-VoyageAI-Api-Key': process.env.VOYAGEAI_API_KEY as string,  // Replace with your inference API key
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

// SinglePromptGeneration // GroupedTaskGeneration
// Get the collection
const movies = client.collections.get("Movie")

// Perform query
const srcImgPath = "https://github.com/weaviate-tutorials/edu-datasets/blob/main/img/International_Space_Station_after_undocking_of_STS-132.jpg?raw=true"
const queryB64 = await urlToBase64(srcImgPath)
// END SinglePromptGeneration // END GroupedTaskGeneration

// SinglePromptGeneration

response = await movies.generate.nearMedia(queryB64, "image",{
    // highlight-start
    singlePrompt: "Translate this into French: {title}"
    // highlight-end
  }, {
  limit: 5
})

// Inspect the response
for (let item of response.objects) {
  console.log(item.properties.title)
  console.log(item.generated)
}

client.close()
// END SinglePromptGeneration


console.log("\n\n")


// GroupedTaskGeneration

response = await movies.generate.nearMedia(queryB64, "image",{
    // highlight-start
    groupedTask: "What do these movies have in common?",
    groupedProperties: ["title", "overview"]  // Optional parameter; for reducing prompt length
    // highlight-end
  },{
    limit: 5
  }
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
