import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================
import weaviate from 'weaviate-client';

const client = await weaviate.connectToLocal({
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',
    'X-Cohere-Api-Key': process.env.COHERE_API_KEY || '',
  },
});

// START BasicVectorizerCohere
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecCohere(),
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END BasicVectorizerCohere

// Clean up
await client.collections.delete('DemoCollection');

// START FullVectorizerCohere
await client.collections.create({
  name: 'DemoCollection',
  // highlight-start
  vectorizer: [
    weaviate.configure.namedVectorizer(
      'title_vector',
      {
        properties: ['title'],
        vectorizerConfig: weaviate.configure.vectorizer.text2VecCohere({
          // // Further options
          // model: 'embed-multilingual-v3.0',
          // truncate: 'END',
          // baseURL: '<custom_cohere_url>',
          // vectorizeClassName: true,
        }),
      },
    ),
  ],
  // highlight-end
  // Additional parameters not shown
});
// END FullVectorizerCohere

let srcObjects = [
  {"title": "The Shawshank Redemption", "description": ""},
  {"title": "The Godfather", "description": ""},
  {"title": "The Dark Knight", "description": ""},
  {"title": "Jingle All the Way", "description": ""},
  {"title": "A Christmas Carol", "description": ""},
];

// START BatchImportExample  // START NearTextExample  // START HybridExample
const collectionName = 'DemoCollection'
const myCollection = client.collections.get(collectionName)

// END BatchImportExample  // END NearTextExample  // END HybridExample

// START BatchImportExample
let dataObject = []

for (let srcObject of srcObjects) {
  dataObject.push({
    title: srcObject.title,
    description: srcObject.description,
  });
}

const response = await myCollection.data.insertMany(dataObject);

console.log(response);
// END BatchImportExample

// START NearTextExample
let result;

result = await myCollection.query.nearText(
  'A holiday film',  // The model provider integration will automatically vectorize the query
  {
    limit: 2,
  }
)

console.log(JSON.stringify(result.objects, null, 2));
// END NearTextExample


// START HybridExample
result = await myCollection.query.hybrid(
  'A holiday film',  // The model provider integration will automatically vectorize the query
  {
    limit: 2,
  }
)

console.log(JSON.stringify(result.objects, null, 2));
// END HybridExample

client.close();
