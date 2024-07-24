// Howto: Multiple target vectors search - TypeScript examples

// TODO: Needs tests

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================



import weaviate from 'weaviate-client'

const client = await weaviate.connectToLocal(
 {
   headers: { 'X-Openai-Api-Key': process.env.OPENAI_API_KEY || '',  }
})

// ========================
// ===== Basic search =====
// ========================

// START MultiBasic
const jeopardy = client.collections.get('Jeopardy_Tiny_Dataset');

const result = await jeopardy.query.nearText('animals in movies', {
  limit: 2,
  targetVector: jeopardy.multiTargetVector.sum(['jeopardy_questions_vector', 'jeopardy_answers_vector']),
})

result.objects.forEach(item => {
  console.log(JSON.stringify(item.properties, null, 2))
})
// END MultiBasic


// ========================
// ===== Set Weights =====
// ========================

// START MultiWeights
const jeopardy = client.collections.get('Jeopardy_Tiny_Dataset');

const result = await jeopardy.query.nearText('animals in movies', {
 limit: 2,
 targetVector: jeopardy.multiTargetVector.manualWeights(
  {
    'jeopardy_questions_vector': .5,
    'jeopardy_answers_vector': 10
  }),
})

result.objects.forEach(item => {
 console.log(JSON.stringify(item.properties, null, 2))
})
// END MultiWeights
