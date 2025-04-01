// Howto: Search -> Retreval augmented generation - TypeScript examples
// Run with: node --loader=ts-node/esm search.generative.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate, { GenerateOptions, WeaviateClient, generativeConfigRuntime } from 'weaviate-client';

const weaviateURL = process.env.WCD_URL as string;
const weaviateKey = process.env.WCD_API_KEY as string;
const openaiKey = process.env.OPENAI_APIKEY as string;

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(weaviateURL,{
   authCredentials: new weaviate.ApiKey(weaviateKey),
   headers: {
     'X-OpenAI-Api-Key': openaiKey,  // Replace with your inference API key
   }
 }
)

let genResults;

// SingleGenerativeParametersTS // START GroupedGenerativeParametersTS // START SingleGenerative TS // GroupedGenerativeProperties // GroupedGenerative TS // SingleGenerativeProperties TS // START WorkingWithImages

const jeopardy = client.collections.use('JeopardyQuestion');
// END SingleGenerativeParametersTS // START GroupedGenerativeParametersTS // END SingleGenerative TS // END GroupedGenerativeProperties // END GroupedGenerative TS // END SingleGenerativeProperties TS // END WorkingWithImages


// ==============================
// ===== Dynamic RAG syntax =====
// ==============================

// START DynamicRag
const { generative } = weaviate.configure

const reviews = client.collections.use("WineReviewNV")

const response = await reviews.generate.nearText("a sweet German white wine", 
  {
    singlePrompt: {
      prompt: "Translate this into German: {review_body}"
    },
    groupedTask: { 
      prompt: "Summarize these review"
    },
    // highlight-start
    config: {
      name: 'generative-openai',
      config: {
        model: 'gpt-4o-mini',
      },
    },
    // highlight-end
  },{ 
      limit: 2,
      targetVector: "title_country",
  })

for (const result of response.objects) {
    console.log("Properties:", result.properties)
    console.log("Single prompt result:", result.generative?.text )
    console.log("Grouped task result:", response.generative?.text)
  }
// END DynamicRag

// Test results
assert.equal(response.objects[0].collection, "WineReviewNV")
//assert "title" in response.objects[0].properties.keys()
// End test

// ===============================================
// ===== QUERY WITH TARGET VECTOR & nearText =====
// ===============================================
{
// NamedVectorNearText
const myNVCollection = client.collections.use('WineReviewNV');

const result = await myNVCollection.generate.nearText(
  'a sweet German white wine',
  {
    singlePrompt: 'Translate this into German: {review_body}',
    groupedTask: 'Summarize these review',
  },
  {
    limit: 2,
    // highlight-start
    targetVector: 'title_country',
    // highlight-end
  }
);

console.log(result.generative?.text); // print groupedTask result

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(object.generative?.text); // print singlePrompt result
}
// END NamedVectorNearText

// Tests
// assert.deepEqual(result.objects.length, 2);
}

// =====================================================
// ===== SINGLE GENERATIVE EXAMPLE WITH PROPERTIES =====
// =====================================================
{
// SingleGenerativeProperties TS

const prompt = `Convert this quiz question: {question} and answer: {answer} into a trivia tweet.`

const result = await jeopardy.generate.nearText('World history',
  { singlePrompt: prompt },
  { limit: 2 }
)

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(object.generative?.text); // print singlePrompt result
}
// END SingleGenerativeProperties TS

// Tests
// genResults = result.objects;
// assert.equal(genResults.length, 2);
// for (const g of genResults) {
//   assert.equal(typeof g.generated, 'string');
// }
}

// =====================================================
// ===== SINGLE GENERATIVE EXAMPLE WITH PARAMETERS =====
// =====================================================

// SingleGenerativeParametersTS
// highlight-start
//from weaviate.classes.generate import GenerativeConfig, GenerativeParameters

const prompt = {
    prompt: "Convert this quiz question: {question} and answer: {answer} into a trivia tweet.",
    metadata: true,
    debug: true,
}
// highlight-end

const responset = await jeopardy.generate.nearText("World history", 
{
    // highlight-start
    singlePrompt: prompt,
    // highlight-end
    config : generativeConfigRuntime.openAI()
}, {
  limit: 2, 

}
)

// print source properties and generated responses
for ( const object of response.objects) {
    console.log("Properties:", object.properties)
    console.log("Single prompt result:", object.generative?.text)
    console.log("Debug:", object.generative?.debug)
    console.log("Metadata:", object.generative?.metadata)
}
// END SingleGenerativeParametersTS

// Test results
assert.equal(response.objects[0].collection, "JeopardyQuestion")
assert.equal(((responsex?.generative?.text?.length) > 0), true)
// End test


// ======================================
// ===== GROUPED GENERATIVE EXAMPLE =====
// ======================================
{
// GroupedGenerative TS

const generatePrompt = `What do these animals have in common, if anything?`;

const result = await jeopardy.generate.nearText('Cute animals',
  { groupedTask: generatePrompt },
  { limit: 3 }
)

console.log(result.generative?.text);
// END GroupedGenerative TS

// Tests
// genResults = result;
// assert.equal(genResults.objects.length, 3);
// assert.equal(typeof genResults[0]._additional.generate.groupedResult, 'string');
// for (const g of genResults.objects.slice(1)) {
//   assert.equal(g.generated, null);
//   assert.equal(typeof g.points, 'number');
// }
}

// =====================================================
// ===== GROUPED GENERATIVE EXAMPLE WITH PARAMETERS =====
// =====================================================

// START GroupedGenerativeParametersTS
// from weaviate.classes.generate import GenerativeConfig, GenerativeParameters

// highlight-start
const grouped_task = {
  prompt: "What do these animals have in common, if anything?",
    metadata: true,
}
// highlight-end

const responsex = await jeopardy.generate.nearText("Cute animals",
   {
    // highlight-start
    groupedTask: grouped_task,
    // highlight-end
    config: generativeConfigRuntime.openAI()
   }, {
    limit: 3,
   }
)

// print the generated response
console.log("Grouped task result:", responsex.generative?.text)
console.log("Metadata:", responsex.generative?.metadata)
// END GroupedGenerativeParametersTS

// Test results
assert.equal(response.objects[0].collection, "JeopardyQuestion")
assert.equal(((responsex?.generative?.text?.length) > 0), true)
// End test

// ======================================================
// ===== GROUPED GENERATIVE EXAMPLE WITH PROPERTIES =====
// ======================================================
{
// GroupedGenerativeProperties

const generatePrompt = `What do these animals have in common, if anything?`;

const result = await jeopardy.generate.nearText('Australian animals',
  {
    groupedTask: generatePrompt,
    groupedProperties: ['answer', 'question'],
  },
  { limit: 3 }
)

console.log(result.generative?.text);
// END GroupedGenerativeProperties

// Tests
// genResults = result;
// assert.equal(genResults.objects.length, 3);
// // assert.equal(genResults[0]._additional.generate.error, null);
// assert.ok(genResults.generated.includes('Australia'));
// for (const g of genResults.objects.slice(1)) {
//   assert.equal(g.generated, null);
//   assert.equal(typeof g.points, 'number');
//   assert.equal(typeof g.question, 'string');
// }
}

// ==========================================
// ===== GENERATIVE EXAMPLE WITH IMAGES =====
// ==========================================

// START WorkingWithImages
// import base64
//import requests
// from weaviate.classes.generate import GenerativeConfig, GenerativeParameters

//const srcImgPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/500px-Koala_climbing_tree.jpg"
// const base64Image = base64.b64encode(requests.get(srcImgPath).content).decode('utf-8')

const prompt: GenerateOptions = {
    // highlight-start
    prompt: "Formulate a Jeopardy!-style question about this image",
    images: [base64Image],      // A list of base64 encoded strings of the image bytes
    // image_properties=["img"], # Properties containing images in Weaviate
    // highlight-end
}

const responsec = await jeopardy.generate.nearText("Australian animals", 
    {
      // highlight-start
      groupedTask: prompt,
      // highlight-end
      groupedProperties: ["answer", "question"],
      config: generativeConfigRuntime.anthropic({
        maxTokens: 1000
      })
    }, {
      limit:3, 
    }
)

// Print the source property and the generated response
for (const object of responsec.objects) {
    console.log("Properties:", object.properties)
    console.log("Grouped task result:", response.generative?.text)
}
// END WorkingWithImages

// Test results
assert.equal(responsec.objects[0].collection, "JeopardyQuestion")
if (responsec) {
  assert.equal((responsec.generative?.text?.length > 0), true)
}
// End test

client.close()