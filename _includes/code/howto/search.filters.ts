// Howto: Search -> Filters - TypeScript examples

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// searchMultipleFiltersAnd // searchMultipleFiltersNested
import weaviate, { Filters } from 'weaviate-client';
// END searchMultipleFiltersAnd // END searchMultipleFiltersNested

const client = await weaviate.connectToWCS(
  '',  // Replace WEAVIATE_INSTANCE_URL with your instance URL
 {
   authCredentials: new weaviate.ApiKey('api-key'),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
   }
 } 
)

let result;

// =========================
// ===== Single Filter =====
// =========================

// searchSingleFilter
const myCollection = client.collections.get('JeopardyQuestion');
     
const result = await myCollection.query.fetchObjects({
 returnProperties: ['question','answer','round'],
 filters: myCollection.filter.byProperty('round').equal('Double Jeopardy!'),
 limit: 3,
})
console.log(JSON.stringify(result, null, 2));
// END searchSingleFilter

// Tests
let questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.deepEqual(question.round, 'Double Jeopardy!');
}
// searchSingleFilter
// END searchSingleFilter


// =======================================
// ===== Single Filter with nearText =====
// =======================================

// searchFilterNearText
const myCollection = client.collections.get('JeopardyQuestion');
     
const result = await myCollection.query.nearText(['fashion icons'],{
 returnProperties: ['question', 'answer','round', 'points'],
 filters: myCollection.filter.byProperty('points').greaterThan(200),
 limit: 3,
})

console.log(JSON.stringify(result, null, 2));
// END searchFilterNearText

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.points > 200);
}
// searchFilterNearText
// END searchFilterNearText


// ==========================================
// ===== Partial Match Filter =====
// ==========================================

// searchLikeFilter
const myCollection = client.collections.get('JeopardyQuestion');
     
const result = await myCollection.query.fetchObjects({
 returnProperties: ['question', 'answer','round'],
 filters: myCollection.filter.byProperty('answer').like('*inter*'),
 limit: 3,
})

console.log(JSON.stringify(result, null, 2));
// END searchLikeFilter

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.answer.toLowerCase().includes('inter'));
}
// searchLikeFilter
// END searchLikeFilter


// ==========================================
// ===== ContainsAnyFilter =====
// ==========================================


// ContainsAnyFilter
const tokenList = ['australia', 'india']
const myCollection = client.collections.get('JeopardyQuestion');
  
const result = await myCollection.query.fetchObjects({
 returnProperties: ['question', 'answer','round'],
 // highlight-start
 // Find objects where the `answer` property contains any of the strings in `tokenList`
 filters: myCollection.filter.byProperty('answer').containsAny(tokenList),
 // highlight-end
 limit: 3,
})

console.log(JSON.stringify(result, null, 2));
// END ContainsAnyFilter

// Tests
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.answer.toLowerCase().includes('australia') || question.answer.toLowerCase().includes('india'));
}


// ==========================================
// ===== ContainsAllFilter =====
// ==========================================

// ContainsAllFilter
const tokenList = ['blue', 'red']
const myCollection = client.collections.get('JeopardyQuestion');
  
const result = await myCollection.query.fetchObjects({
 returnProperties: ['question', 'answer','round'],
 // highlight-start
 // Find objects where the `question` property contains all of the strings in `tokenList`
 filters: myCollection.filter.byProperty('question').containsAll(tokenList),
 // highlight-end
 limit: 3,
})

console.log(JSON.stringify(result, null, 2));
// END ContainsAllFilter

// Tests
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.question.toLowerCase().includes('red') & question.question.toLowerCase().includes('blue'));
}


// ==========================================
// ===== Multiple Filters with And =====
// ==========================================


// searchMultipleFiltersAnd
const myCollection = client.collections.get('JeopardyQuestion');
     
const result = await myCollection.query.fetchObjects({
  returnProperties: ['question', 'answer','round', 'points'],
  // highlight-start
  filters: Filters.and(
     myCollection.filter.byProperty('round').equal('Double Jeopardy!'),
     myCollection.filter.byProperty('points').lessThan(600)
    ),
  // highlight-end
  limit: 3,
 })

console.log(JSON.stringify(result, null, 2));
// END searchMultipleFiltersAnd

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.deepEqual(question.round, 'Double Jeopardy!');
  assert.ok(question.points < 600);
}
// searchMultipleFiltersAnd
// END searchMultipleFiltersAnd



// ==========================================
// ===== Multiple Filters with Nesting =====
// ==========================================

// searchMultipleFiltersNested
const myCollection = client.collections.get('JeopardyQuestion');
     
const result = await myCollection.query.fetchObjects({
 // highlight-start
 filters: Filters.and(
  myCollection.filter.byProperty('answer').like('*bird*'), 
  Filters.or(
    myCollection.filter.byProperty('points').greaterThan(700)), 
    myCollection.filter.byProperty('points').lessThan(300) 
 ),
 // highlight-end
 limit: 3
})

console.log(JSON.stringify(result, null, 2));
// END searchMultipleFiltersNested

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.answer.toLowerCase().includes('bird'));
  assert.ok(question.points < 300 || question.points > 700);
}
// searchMultipleFiltersNested
// END searchMultipleFiltersNested


// ===================================================
// ===== Filters using Cross-referenced property =====
// ===================================================

// searchCrossReference
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.fetchObjects({
 limit: 3,
 // highlight-start
 filters: myCollection.filter.byRef('hasCategory').byProperty('title').like('*Sport*'),
 returnReferences: [{
    linkOn: 'hasCategory',
    returnProperties: ['title'],
  }],
 // highlight-end
})

console.log(JSON.stringify(result, null, 2));
// END searchCrossReference

// Tests
questionKeys = new Set(Object.keys(result.data.Get.JeopardyQuestion[0]));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'hasCategory']));
assert.deepEqual(result.data.Get.JeopardyQuestion.length, 3);
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.hasCategory[0].title.toLowerCase().includes('sport'));
}
// searchCrossReference
// END searchCrossReference


// ===================================================
// ===== Filters using Id =====
// ===================================================

// filterById
const myCollection = client.collections.get('Article');
const targetId = '00037775-1432-35e5-bc59-443baaef7d80'

const result = await myCollection.query.fetchObjects({
 // highlight-start
 filters: myCollection.filter.byId().equal(targetId),
 // highlight-end
})

console.log(JSON.stringify(result, null, 2));
// END filterById

// Tests
assert.equal(target_id, result.data.Get.Article[0]._additional.id);


// ===================================================
// ===== Filters using timestamps =====
// ===================================================

// FilterByTimestamp
const myCollection = client.collections.get('Article');
const creationTime = '2020-01-01T00:00:00+00:00'
  
const result = await myCollection.query.fetchObjects({
 returnProperties: ['title'],
 // highlight-start
 filters: myCollection.filter.byCreationTime().greaterOrEqual(creationTime),
 // highlight-end
 returnMetadata: ['creationTime']
})

console.log(JSON.stringify(result, null, 2));
// END FilterByTimestamp

// Tests
for (const article of result.data.Get.Article) {
  assert.ok(Number(article._additional.creationTimeUnix) > 1577836800);
}


// ===================================================
// ===== Filters using property length =====
// ===================================================

// FilterByPropertyLength
const myCollection = client.collections.get('JeopardyQuestion');
const lengthThreshold = 20     

const result = await myCollection.query.fetchObjects({
 limit: 3,
 // highlight-start
 filters: myCollection.filter.byProperty('answer', true).greaterThan(lengthThreshold),
 // highlight-end
})

console.log(JSON.stringify(result, null, 2));
// END FilterByPropertyLength

// Tests
for (const question of result.data.Get.JeopardyQuestion) {
  assert.ok(question.answer.length > 20);
}



// ===================================================
// ===== Filters with Geolocation =====
// ===================================================

// FilterbyGeolocation
const myCollection = client.collections.get('Publication');
     
const result = await myCollection.query.fetchObjects({
 // highlight-start
 filters: myCollection.filter.byProperty('headquartersGeoLocation').withinGeoRange({
   latitude: 52.39,
   longitude: 4.84,
   distance: 1000
 }),
 // highlight-end
})

console.log(JSON.stringify(result, null, 2));
// END FilterbyGeolocation
