import weaviate, { WeaviateClient, WeaviateReturn } from "weaviate-client"
// START connectionCode
let client: WeaviateClient


client = await weaviate.connectToWeaviateCloud(process.env.WCD_URL as string, {
  authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY as string),
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,  // Replace with your inference API key
  }
}
)
// END connectionCode


// START nearTextExample // START nearVectorExample // START nearObjectExample // START bm25Example // START hybridExample
type NonGenericReturn = WeaviateReturn<undefined>
let response: NonGenericReturn

const questions = client.collections.get("JeopardyQuestion")

// END nearTextExample // END nearVectorExample // END nearObjectExample // END bm25Example // END hybridExample

// START nearTextExample 
response = questions.query.nearText("space travel", // Your query string
  {
    limit: 2
  }
)

for (const item of response.objects) {
  console.log(item.uuid)
  console.log(item.properties)
}
// END nearTextExample
// assert len(response.objects) == 2
// assert "question" in response.objects[0].properties.keys()

response = questions.query.nearText("space travel", {
  limit: 1,
  includeVector: true
}
)
let vectorInput = response.objects[0].vectors
let objectInput = response.objects[0].uuid

// START nearVectorExample
response = questions.query.nearVector(vectorInput, // Your vectors
  {
    limit: 2
  }
)

for (const item of response.objects) {
  console.log(item.uuid)
  console.log(item.properties)
}
// END nearVectorExample

// assert len(response.objects) == 2
// assert "question" in response.objects[0].properties.keys()

// START nearObjectExample
response = questions.query.nearObject(objectInput, // Your object UUID
  {
    limit: 2
  }
)

for (const item of response.objects) {
  console.log(item.uuid)
  console.log(item.properties)
}
// END nearObjectExample


// assert len(response.objects) == 2
// assert "question" in response.objects[0].properties.keys()

// START bm25Example
response = questions.query.bm25("space travel", // Your query string
  {
    limit: 2
  }
)

for (const item of response.objects) {
  console.log(item.uuid)
  console.log(item.properties)
}
// END bm25Example

// assert len(response.objects) == 2
// assert "question" in response.objects[0].properties.keys()


// START hybridExample
response = questions.query.hybrid("space travel", // Your query string
  {
    limit: 2
  }
)

for (const item of response.objects) {
  console.log(item.uuid)
  console.log(item.properties)
}

// END hybridExample

// assert len(response.objects) == 2
// assert "question" in response.objects[0].properties.keys()
