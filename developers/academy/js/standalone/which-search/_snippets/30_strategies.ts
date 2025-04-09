import weaviate, { CollectionConfig, CollectionConfigCreate, WeaviateClient, WeaviateReturn } from "weaviate-client"

let client: WeaviateClient

client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL as string,{
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY as string),
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY as string,  // Replace with your inference API key
    }
  }
)

client.collections.delete("Product")

// START skipVectorizationExample // START tokenizationExample
let products: CollectionConfigCreate
// END skipVectorizationExample // END tokenizationExample

// START skipVectorizationExample
products = await client.collections.create({
  name: "Product",
  vectorizers: weaviate.configure.vectorizer.text2VecOpenAI({
    // highlight-start
    vectorizeCollectionName: true
    // highlight-end
  }),
  properties: [{
    name: "name",
    dataType: weaviate.configure.dataType.TEXT,
    // highlight-start
    vectorizePropertyName: true
    // highlight-end
  },
  {
    name: "description",
    dataType: weaviate.configure.dataType.TEXT,
  },
  {
    name: "manufacturing_process",
    dataType: weaviate.configure.dataType.TEXT,
    // highlight-start
    skipVectorization: true,  // Skip unwanted property
    //highlight-end
  }]
})
// END skipVectorizationExample

client.collections.delete("Product")

client.collections.delete("SomeCollection")

// START tokenizationExample

products = await client.collections.create({
  name: "SomeCollection",
  properties: [{
    name: "name",
    dataType: weaviate.configure.dataType.TEXT,
    // highlight-start
    tokenization: weaviate.configure.tokenization.WORD // Default
    // highlight-end
  },
  {
    name: "description",
    dataType: weaviate.configure.dataType.TEXT,
    tokenization: weaviate.configure.tokenization.WHITESPACE // Will keep case & special characters
  },
  {
    name: "email",
    dataType: weaviate.configure.dataType.TEXT,
    // highlight-start
    tokenization: weaviate.configure.tokenization.FIELD // Do not tokenize at all
    // highlight-end
  }]
})
// END tokenizationExample


client.collections.delete("SomeCollection")

// START selectAndBoostExample // START adjustAlpha // START changeFusionType
type NonGenericReturn = WeaviateReturn<undefined>
let response: NonGenericReturn

const questions = client.collections.get("JeopardyQuestion")

// END selectAndBoostExample // END adjustAlpha // END changeFusionType


// START selectAndBoostExample
response = questions.query.bm25("animal",{ // Your query string
    limit: 5,
    queryProperties: ["question^3", "answer"] // Boost the impact of "question" property by 3
  }
)

for (const item of response.objects) {
  console.log(item.properties)
}
// END selectAndBoostExample

// START adjustAlpha
response = questions.query.hybrid("imaging",{ // Your query string
    limit: 5,
    alpha: 0.1, // Mostly a vector search (Try it with alpha=0.9)
  }
)

for (const item of response.objects) {
  console.log(item.properties)
}
// END adjustAlpha



// START changeFusionType
response = questions.query.hybrid("imaging",{ // Your query string
    limit: 5,
    fusionType: "RelativeScore",
    alpha: 0.1, // Mostly a vector search (Try it with alpha=0.9)
  }
)

for (const item of response.objects) {
  console.log(item.properties)
}
// END changeFusionType
