// # START-ANY
import weaviate, { WeaviateClient } from "weaviate-client"
let client: WeaviateClient
let response
// # END-ANY

client = await weaviate.connectToWeaviateCloud(
    process.env.WCD_URL as string,
    {
      authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
      headers: {
        'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,  // Replace with your inference API key
      }
    } 
  )
// # START-ANY
// Instantiate your client (not shown). e.g.:
// const requestHeaders = {'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,}
// client = weaviate.connectToWeaviateCloud(..., headers: requestHeaders) or
// client = weaviate.connectToLocal(..., headers: requestHeaders)

// # END-ANY

// # SinglePromptGeneration // # GroupedTaskGeneration
// Get the collection 
let movies = client.collections.get("Movie")

// # Perform query
response = await movies.generate.nearText("dystopian future", {
    //# highlight-start
    singlePrompt: "Translate this into French: {title}"
    // # highlight-end
},{
    limit: 5 }

)

// # Inspect the response
for (let item of response.objects) {
    console.log(`${item.properties.title} - ${item.generated}`)
}
 
// # END SinglePromptGeneration


// # Perform query
response = await movies.generate.nearText("dystopian future", {
  //# highlight-start
  groupedTask: "What do these movies have in common?"
  // # highlight-end
  ,groupedProperties: ['title', 'overview']
},{
  limit: 5 }

)

// # Inspect the response
for (let item of response.objects) {
  console.log('Title: ', item.properties.title) // Print the title
}
// # highlight-start
console.log(response.generated) // Print the generated text (the commonalities between them)
// # highlight-end

client.close()
// # END GroupedTaskGeneration
