// Howto: Search -> Retreval augmented generation - TypeScript examples
// Run with: node --loader=ts-node/esm search.generative.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

import weaviate, { GenerateOptions, WeaviateClient } from 'weaviate-client';

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateKey = process.env.WEAVIATE_API_KEY as string;
const openaiKey = process.env.OPENAI_APIKEY as string;

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(weaviateURL,{
   authCredentials: new weaviate.ApiKey(weaviateKey),
   headers: {
     'X-OpenAI-Api-Key': openaiKey,  // Replace with your inference API key
   }
 }
)

let genResults;

// START SingleGenerativeParametersTS // START GroupedGenerativeParametersTS // START WorkingWithImages // START DynamicRag
import { generativeParameters } from 'weaviate-client';

// END SingleGenerativeParametersTS // END GroupedGenerativeParametersTS // END WorkingWithImages // END DynamicRag


// START SingleGenerativeParametersTS // START GroupedGenerativeParametersTS // START SingleGenerativePropertiesTS // START GroupedGenerativeProperties // START GroupedGenerativeTS // START SingleGenerativePropertiesTS // START WorkingWithImages
let response;
const jeopardy = client.collections.use('JeopardyQuestion');
// END SingleGenerativeParametersTS // END GroupedGenerativeParametersTS // END SingleGenerativePropertiesTS // END GroupedGenerativeProperties // END GroupedGenerativeTS // END SingleGenerativePropertiesTS // END WorkingWithImages


// ==============================
// ===== Dynamic RAG syntax =====
// ==============================

// START DynamicRag
const reviews = client.collections.use("WineReviewNV")

const searchResponse = await reviews.generate.nearText("a sweet German white wine", {
  singlePrompt: {
    prompt: "Translate this into German: {review_body}"
  },
  groupedTask: { 
    prompt: "Summarize these review"
  },
  // highlight-start
  config: generativeParameters.openAI({
    model: "gpt-3.5-turbo",
  }),
  // highlight-end
},{ 
  limit: 2,
  targetVector: "title_country",
})

for (const result of searchResponse.objects) {
    console.log("Properties:", result.properties)
    console.log("Single prompt result:", result.generative?.text )
    console.log("Grouped task result:", searchResponse.generative?.text)
  }
// END DynamicRag

// Test results
assert.equal(searchResponse.objects[0].collection, "WineReviewNV")
//assert "title" in response.objects[0].properties.keys()
// End test

// ===============================================
// ===== QUERY WITH TARGET VECTOR & nearText =====
// ===============================================
{
// NamedVectorNearText
const myNVCollection = client.collections.use('WineReviewNV');

const result = await myNVCollection.generate.nearText('a sweet German white wine', {
    singlePrompt: 'Translate this into German: {review_body}',
    groupedTask: 'Summarize these review',
  }, {
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
assert.deepEqual(result.objects.length, 2);
}

// =====================================================
// ===== SINGLE GENERATIVE EXAMPLE WITH PROPERTIES =====
// =====================================================
{
// START SingleGenerativePropertiesTS

const prompt = `Convert this quiz question: {question} and answer: {answer} into a trivia tweet.`

response = await jeopardy.generate.nearText('World history', { 
  singlePrompt: prompt 
},{ 
  limit: 2 
})

for (let object of response.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(object.generative?.text); // print singlePrompt result
}
// END SingleGenerativePropertiesTS

// Tests
const genResults = response.objects;
assert.equal(genResults.length, 2);
for (const g of genResults) {
  assert.equal(typeof g.generative?.text, 'string');
}
}

// =====================================================
// ===== SINGLE GENERATIVE EXAMPLE WITH PARAMETERS =====
// =====================================================

// START SingleGenerativeParametersTS

// highlight-start
const singlePromptConfig = {
    prompt: "Convert this quiz question: {question} and answer: {answer} into a trivia tweet.",
    metadata: true,
    debug: true,
}
// highlight-end

response = await jeopardy.generate.nearText("World history", {
    // highlight-start
    singlePrompt: singlePromptConfig,
    // highlight-end
    config : generativeParameters.openAI()
}, {
  limit: 2, 
})

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
assert.equal(((response.generative?.text?.length) > 0), true)
// End test


// ======================================
// ===== GROUPED GENERATIVE EXAMPLE =====
// ======================================
{
// START GroupedGenerativeTS

const groupedTaskPrompt = `What do these animals have in common, if anything?`;

response = await jeopardy.generate.nearText('Cute animals',{ 
  groupedTask: groupedTaskPrompt 
},{ 
  limit: 3 }
)

console.log(response.generative?.text);
// END GroupedGenerativeTS

// Tests
genResults = response;
assert.equal(genResults.objects.length, 3);
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

// highlight-start
const groupedTaskPrompt = {
  prompt: "What do these animals have in common, if anything?",
  metadata: true,
}
// highlight-end

response = await jeopardy.generate.nearText("Cute animals", {
    // highlight-start
    groupedTask: groupedTaskPrompt,
    // highlight-end
    config: generativeParameters.openAI()
  }, {
    limit: 3,
})

// print the generated response
console.log("Grouped task result:", response.generative?.text)
console.log("Metadata:", response.generative?.metadata)
// END GroupedGenerativeParametersTS

// Test results
assert.equal(response.objects[0].collection, "JeopardyQuestion")
assert.equal(((response?.generative?.text?.length) > 0), true)
// End test

// ======================================================
// ===== GROUPED GENERATIVE EXAMPLE WITH PROPERTIES =====
// ======================================================
{
// START GroupedGenerativeProperties

const generatePrompt = `What do these animals have in common, if anything?`;

response = await jeopardy.generate.nearText('Australian animals', {
    groupedTask: generatePrompt,
    groupedProperties: ['answer', 'question'],
},{ 
    limit: 3 
})

console.log(response.generative?.text);
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



(async () => {
// START WorkingWithImages

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 1024; // Process in chunks to avoid call stack issues

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.slice(i, Math.min(i + chunkSize, bytes.length));
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }

  return btoa(binary);
}

const srcImgPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/500px-Koala_climbing_tree.jpg"
const responseImg = await fetch(srcImgPath);
const image = await responseImg.arrayBuffer();

const base64String = arrayBufferToBase64(image);

const prompt = {
  // highlight-start
  prompt: "Formulate a Jeopardy!-style question about this image",
  images: [base64String],      // A list of base64 encoded strings of the image bytes
  // imageProperties: ["img"], // Properties containing images in Weaviate
  // highlight-end
}

response = await jeopardy.generate.nearText("Movies", {
  // highlight-start
  groupedTask: prompt,
  // highlight-end
  groupedProperties: ["answer", "question"],
  config: generativeParameters.anthropic({
    maxTokens: 1000
  }),
}, {
  limit: 3,
})

// Print the source property and the generated response
for (const item of response.objects) {
  console.log("Title property:", item.properties['title'])
}

console.log("Grouped task result:", response.generative?.text)
// END WorkingWithImages
})();


// Test results
assert.equal(response.objects[0].collection, "JeopardyQuestion")
if (response) {
  assert.equal((response.generative?.text?.length > 0), true)
}
// End test

client.close()