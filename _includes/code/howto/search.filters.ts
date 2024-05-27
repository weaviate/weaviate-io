// Howto: Search -> Filters - TypeScript examples

import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// searchMultipleFiltersAnd // searchMultipleFiltersNested
import weaviate, { Filters } from 'weaviate-client';

// END searchMultipleFiltersAnd // END searchMultipleFiltersNested

const client = await weaviate.connectToWCD(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 } 
)

// searchSingleFilter // searchLikeFilter // ContainsAnyFilter // ContainsAllFilter // searchMultipleFiltersNested // searchMultipleFiltersAnd // searchFilterNearText // FilterByPropertyLength // searchCrossReference // filterById // searchCrossReference // searchMultipleFiltersNested
let result;
const myCollection = client.collections.get('JeopardyQuestion');
// END searchSingleFilter // END searchLikeFilter // END ContainsAnyFilter // END ContainsAllFilter // END searchMultipleFiltersNested // END searchMultipleFiltersAnd // END searchFilterNearText // END FilterByPropertyLength // END searchCrossReference // END filterById // END searchCrossReference // END searchMultipleFiltersNested


// ContainsAllFilter // ContainsAnyFilter
let tokenList;
// END ContainsAllFilter // END ContainsAnyFilter 

// FilterByTimestamp
const myArticleCollection = client.collections.get('Article');
// END FilterByTimestamp


// =========================
// ===== Single Filter =====
// =========================

// searchSingleFilter
     
result = await myCollection.query.fetchObjects({
 returnProperties: ['question','answer','round'],
 filters: myCollection.filter.byProperty('round').equal('Double Jeopardy!'),
 limit: 3,
})
console.log(JSON.stringify(result, null, 2));
// END searchSingleFilter

// Tests
let questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
assert.deepEqual(result.objects.length, 3);
for (const question of result.objects) {
  assert.deepEqual(question.round, 'Double Jeopardy!');
}
// searchSingleFilter
// END searchSingleFilter


// =======================================
// ===== Single Filter with nearText =====
// =======================================

// searchFilterNearText
     
result = await myCollection.query.nearText(['fashion icons'],{
 returnProperties: ['question', 'answer','round', 'points'],
 filters: myCollection.filter.byProperty('points').greaterThan(200),
 limit: 3,
})

console.log(JSON.stringify(result, null, 2));
// END searchFilterNearText

// Tests
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
assert.deepEqual(result.objects.length, 3);
for (const question of result.objects) {
  assert.ok(question.points > 200);
}
// searchFilterNearText
// END searchFilterNearText


// ==========================================
// ===== Partial Match Filter =====
// ==========================================

// searchLikeFilter     

result = await myCollection.query.fetchObjects({
 returnProperties: ['question', 'answer','round'],
 filters: myCollection.filter.byProperty('answer').like('*inter*'),
 limit: 3,
})

console.log(JSON.stringify(result, null, 2));
// END searchLikeFilter

// Tests
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
assert.deepEqual(result.objects.length, 3);
for (const question of result.objects) {
  assert.ok(question.answer.toLowerCase().includes('inter'));
}
// searchLikeFilter
// END searchLikeFilter


// ==========================================
// ===== ContainsAnyFilter =====
// ==========================================


// ContainsAnyFilter
tokenList = ['australia', 'india']
  
result = await myCollection.query.fetchObjects({
 returnProperties: ['question', 'answer','round'],
 // Find objects where the `answer` property contains any of the strings in `tokenList`
 // highlight-start
 filters: myCollection.filter.byProperty('answer').containsAny(tokenList),
 // highlight-end
 limit: 3,
})

console.log(JSON.stringify(result, null, 2));
// END ContainsAnyFilter

// Tests
for (const question of result.objects) {
  assert.ok(question.answer.toLowerCase().includes('australia') || question.answer.toLowerCase().includes('india'));
}


// ==========================================
// ===== ContainsAllFilter =====
// ==========================================

// ContainsAllFilter
tokenList = ['blue', 'red']
  
result = await myCollection.query.fetchObjects({
 returnProperties: ['question', 'answer','round'],
 // Find objects where the `question` property contains all of the strings in `tokenList`
 // highlight-start
 filters: myCollection.filter.byProperty('question').containsAll(tokenList),
 // highlight-end
 limit: 3,
})

console.log(JSON.stringify(result, null, 2));
// END ContainsAllFilter

// Tests
for (const question of result.objects) {
  assert.ok(question.question.toLowerCase().includes('red') & question.question.toLowerCase().includes('blue'));
}


// ==========================================
// ===== Multiple Filters with And =====
// ==========================================


// searchMultipleFiltersAnd
     
result = await myCollection.query.fetchObjects({
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
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
assert.deepEqual(result.objects.length, 3);
for (const question of result.objects) {
  assert.deepEqual(question.round, 'Double Jeopardy!');
  assert.ok(question.points < 600);
}
// searchMultipleFiltersAnd
// END searchMultipleFiltersAnd



// ==========================================
// ===== Multiple Filters with Nesting =====
// ==========================================

// searchMultipleFiltersNested
     
result = await myCollection.query.fetchObjects({
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
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
assert.deepEqual(result.objects.length, 3);
for (const question of result.objects) {
  assert.ok(question.answer.toLowerCase().includes('bird'));
  assert.ok(question.points < 300 || question.points > 700);
}
// searchMultipleFiltersNested
// END searchMultipleFiltersNested


// ===================================================
// ===== Filters using Cross-referenced property =====
// ===================================================

// searchCrossReference

result = await myCollection.query.fetchObjects({
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
questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'hasCategory']));
assert.deepEqual(result.objects.length, 3);
for (const question of result.objects) {
  assert.ok(question.properties.hasCategory[0].title.toLowerCase().includes('sport'));
}
// searchCrossReference
// END searchCrossReference


// ===================================================
// ===== Filters using Id =====
// ===================================================

// filterById
const targetId = '00037775-1432-35e5-bc59-443baaef7d80'

result = await myCollection.query.fetchObjects({
 // highlight-start
 filters: myCollection.filter.byId().equal(targetId),
 // highlight-end
})

console.log(JSON.stringify(result, null, 2));
// END filterById

// Tests
assert.equal(targetId, result.objects[0].uuid);


// ===================================================
// ===== Filters using timestamps =====
// ===================================================

// FilterByTimestamp
const creationTime = '2020-01-01T00:00:00+00:00'
  
result = await myArticleCollection.query.fetchObjects({
 returnProperties: ['title'],
 // highlight-start
 filters: myCollection.filter.byCreationTime().greaterOrEqual(creationTime),
 // highlight-end
 returnMetadata: ['creationTime']
})

console.log(JSON.stringify(result, null, 2));
// END FilterByTimestamp

// Tests
for (const article of result.objects) {
  assert.ok(Number(article.metadata.creationTime) > 1577836800);
}


// ===================================================
// ===== Filters using property length =====
// ===================================================

// FilterByPropertyLength
const lengthThreshold = 20     

result = await myCollection.query.fetchObjects({
 limit: 3,
 // highlight-start
 filters: myCollection.filter.byProperty('answer', true).greaterThan(lengthThreshold),
 // highlight-end
})

console.log(JSON.stringify(result, null, 2));
// END FilterByPropertyLength

// Tests
for (const question of result.objects) {
  assert.ok(question.properties.answer.length > 20);
}



// ===================================================
// ===== Filters with Geolocation =====
// ===================================================

// FilterbyGeolocation
let geoResult;
const myPublicationCollection = client.collections.get('Publication');
     
geoResult = await myPublicationCollection.query.fetchObjects({
 // highlight-start
 filters: myCollection.filter.byProperty('headquartersGeoLocation').withinGeoRange({
   latitude: 52.39,
   longitude: 4.84,
   distance: 1000
 }),
 // highlight-end
})

console.log(JSON.stringify(geoResult.objects, null, 2));
// END FilterbyGeolocation
