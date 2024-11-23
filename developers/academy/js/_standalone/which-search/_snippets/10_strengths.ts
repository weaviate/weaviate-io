import weaviate,  {  WeaviateClient, WeaviateReturn } from "weaviate-client"

let client: WeaviateClient
type NonGenericReturn = WeaviateReturn<undefined>
let response: NonGenericReturn
// # END-ANY

client = await weaviate.connectToWeaviateCloud(process.env.WCD_URL as string,{
      authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
      headers: {
        'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,  // Replace with your inference API key
      }
    } 
  )

// START robustnessExampleWords
for (const query of ["cat", "kitten"]) {
  const question = client.collections.get("JeopardyQuestion")

  response = await question.query.nearText(query,{
    limit: 1,
    returnMetadata: ['distance'],
    returnProperties: ["question", "answer"]
  })

  for (const item of response.objects) {
    console.log(`\n===== Search results for ${query} =====`)
    console.log("Distance:", item.metadata?.distance)
    console.log(item.properties)
  }
}
// END robustnessExampleWords
// assert length(response.objects) == 1
// assert "question" in response.objects[0].properties.keys()


const example = `
// START responseRobustnessExampleWords
===== Search results for cat =====
Distance: 0.170
{
  "answer": "Fat cat",
  "question": "A flabby tabby"
}

===== Search results for kitten =====
Distance: 0.150
{
  "answer": "Fat cat",
  "question": "A flabby tabby"
}
// END responseRobustnessExampleWords
`

// START robustnessExampleSpelling
for (const query of ["cat", "catt", "caat"]) {
  const question = client.collections.get("JeopardyQuestion")

  response = await question.query.nearText(query,{
    limit: 1,
    returnMetadata: ['distance'],
    returnProperties: ["question", "answer"]
  })

  for (const item of response.objects) {
    console.log(`\n===== Search results for ${query} =====`)
    console.log("Distance:", item.metadata?.distance)
    console.log(item.properties)
  }
}

// END robustnessExampleSpelling

// assert len(response.objects) == 1
// assert "question" in response.objects[0].properties.keys()


const example2 = `
// START responseRobustnessExampleSpelling
===== Search results for cat =====
Distance: 0.170
{
  "answer": "Fat cat",
  "question": "A flabby tabby"
}

===== Search results for catt =====
Distance: 0.177
{
  "answer": "Fat cat",
  "question": "A flabby tabby"
}

===== Search results for caat =====
Distance: 0.184
{
  "answer": "Fat cat",
  "question": "A flabby tabby"
}
// END responseRobustnessExampleSpelling
`

// START bm25Example // START hybridExample
const question = client.collections.get("JeopardyQuestion")
// END bm25Example // END hybridExample

// START bm25Example

response = await question.query.bm25("imaging",{ // Your query string
    limit: 2,
    returnProperties: ["question", "answer"]
  })

for (const item of response.objects) {
  console.log(item.uuid)
  console.log(item.properties)
}
// END bm25Example

// assert "question" in response.objects[0].properties.keys()

const example3 = `
// START bm25Results
49fe3d7c-61a5-5916-99bb-052d07c7c251
{
  "answer": "magnetic resonance imaging",
  "question": "MRI, which stands for this, cannot be used on patients with pacemakers or artificial metal joints"
}
// END bm25Results
`

// START hybridExample

response = await question.query.hybrid("imaging", { // Your query string
    limit: 2,
    returnMetadata: ["score"],
    returnProperties: ["question", "answer"]
  })

for (const item of response.objects) {
  console.log(item.uuid)
  console.log(item.metadata?.score)
  console.log(item.properties)
}

// END hybridExample

// assert "question" in response.objects[0].properties.keys()


`
// START hybridResults
49fe3d7c-61a5-5916-99bb-052d07c7c251
{
  "answer": "magnetic resonance imaging",
  "question": "MRI, which stands for this, cannot be used on patients with pacemakers or artificial metal joints"
}
9041bce6-b5d1-5637-bcbe-2ebb8a689fe0
{
  "answer": "X-rays",
  "question": "These electromagnetic rays used to take pictures of your insides were originally known as Roentgen rays"
}
// END hybridResults
`
