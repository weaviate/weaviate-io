// ======================
// ====== Connection
// ======================

// ConnectCloud
import weaviate from 'weaviate-client'

const client = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL', { // Replace WEAVIATE_INSTANCE_URL with your instance URL
    authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_API_KEY'), 
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
    }
  } 
)

console.log(client)
// END ConnectCloud

// ConnectLocal
import weaviate from 'weaviate-client'

const client = await weaviate.connectToLocal({
    httpHost: 'localhost',
    httpPort: 8080,
    grpcHost: 'localhost',
    grpcPort: 50051,
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || ''
    }
  }
)
 
console.log(client)
// END ConnectLocal

// ConnectCustom
import weaviate from 'weaviate-client'

const client = await weaviate.client({
    rest: {
      host: 'WEAVIATE_INSTANCE_HOST_NAME',
      port: 8080,
      secure: true
    },
    grpc: {
      host: 'WEAVIATE_INSTANCE_HOST_NAME',
      port: 50051,
      secure: true
    },
    auth: {
      apiKey: process.env.WEAVIATE_API_KEY || ''
    },
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || ''
    }
  }
)
 
console.log(client)
// END ConnectCustom

// =============================
// === WORK WITH COLLECTIONS
// =============================

// CollectionEx
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.fetchObjects({
  returnProperties: ['question'],
})

console.log(JSON.stringify(result.objects, null, 2));
// END CollectionEx

// =============================
// === BUILDER PATTERN
// =============================

// BuilderEx
let result 
const myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.nearText(['animals in movies'],{
  limit: 2,
  returnProperties: ['question', 'answer'],
  returnMetadata: ['distance']
})

console.log(JSON.stringify(result.objects, null, 2));
// END BuilderEx

// =============================
// === BATCH INSERTS
// =============================

// BatchEx
const questions = client.collections.get("CollectionName")
const dataObject = [...]; // your data

await questions.data.insertMany(dataBatch);
// END BatchEx

// =============================
// === FILTER DATA
// =============================

// FilterDataEx
import weaviate, { Filters } from 'weaviate-client';
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.fetchObjects({
  returnProperties: ['question', 'answer','round', 'points'],
  filters: Filters.and(
     myCollection.filter.byProperty('round').equal('Double Jeopardy!'),
     myCollection.filter.byProperty('points').lessThan(600)
    ),
  limit: 3,
 })

console.log(JSON.stringify(result, null, 2));
// END FilterDataEx

// =============================
// === GENERATE NAMESPACE
// =============================

// GenerateNamespaceEx
const generatePrompt = `Convert this quiz question: {question} and answer: {answer} into a trivia tweet.`;

const myCollection = client.collections.get('JeopardyQuestion');
const result = await myCollection.generate.nearText(['World history'],{
    singlePrompt: generatePrompt,
  },{
    limit: 2,
    returnProperties: ['round'],
})

console.log(JSON.stringify(result.objects, null, 2));
// END GenerateNamespaceEx
