// Howto: Search -> Filters - TypeScript examples

import assert from 'assert';
import { vectorizer, dataType } from 'weaviate-client';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// searchMultipleFiltersAnd // searchMultipleFiltersNested
import weaviate, { Filters } from 'weaviate-client';

// END searchMultipleFiltersAnd // END searchMultipleFiltersNested

const client = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL,
 {
   authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY),
   headers: {
     'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY,  // Replace with your inference API key
   }
 }
)

// searchSingleFilter // searchLikeFilter // ContainsAnyFilter // ContainsAllFilter // searchMultipleFiltersNested // searchMultipleFiltersAnd // searchFilterNearText // FilterByPropertyLength // searchCrossReference // filterById // searchCrossReference // searchMultipleFiltersNested
const jeopardy = client.collections.get('JeopardyQuestion');

// END searchSingleFilter // END searchLikeFilter // END ContainsAnyFilter // END ContainsAllFilter // END searchMultipleFiltersNested // END searchMultipleFiltersAnd // END searchFilterNearText // END FilterByPropertyLength // END searchCrossReference // END filterById // END searchCrossReference // END searchMultipleFiltersNested

// FilterByTimestamp
const myArticleCollection = client.collections.get('Article');
// END FilterByTimestamp


// =========================
// ===== Single Filter =====
// =========================
{
// searchSingleFilter
const result = await jeopardy.query.fetchObjects({
  // highlight-start
  filters: jeopardy.filter.byProperty('round').equal('Double Jeopardy!'),
  // highlight-end
  limit: 3,
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END searchSingleFilter

// Tests
// let questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
// assert.deepEqual(result.objects.length, 3);
// for (const question of result.objects) {
//   assert.deepEqual(question.round, 'Double Jeopardy!');
// }
}

// =======================================
// ===== Single Filter with nearText =====
// =======================================
{
// searchFilterNearText
// highlight-start
const result = await jeopardy.query.nearText('fashion icons', {
  filters: jeopardy.filter.byProperty('points').greaterThan(200),
// highlight-end
  limit: 3,
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END searchFilterNearText

// Tests
// questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
// assert.deepEqual(result.objects.length, 3);
// for (const question of result.objects) {
//   assert.ok(question.points > 200);
// }
}

// ==========================================
// ===== Partial Match Filter =====
// ==========================================
{
// searchLikeFilter
const result = await jeopardy.query.fetchObjects({
  // highlight-start
  filters: jeopardy.filter.byProperty('answer').like('*inter*'),
  // highlight-end
  limit: 3,
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END searchLikeFilter

// Tests
// questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round']));
// assert.deepEqual(result.objects.length, 3);
// for (const question of result.objects) {
//   assert.ok(question.answer.toLowerCase().includes('inter'));
// }
}

// ==========================================
// ===== ContainsAnyFilter =====
// ==========================================

{
// ContainsAnyFilter
// highlight-start
const tokenList = ['australia', 'india']
// highlight-end

const result = await jeopardy.query.fetchObjects({
  // Find objects where the `answer` property contains any of the strings in `tokenList`
  // highlight-start
  filters: jeopardy.filter.byProperty('answer').containsAny(tokenList),
  // highlight-end
  limit: 3,
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END ContainsAnyFilter

// Tests
// for (const question of result.objects) {
//   assert.ok(question.answer.toLowerCase().includes('australia') || question.answer.toLowerCase().includes('india'));
// }
}

// ==========================================
// ===== ContainsAllFilter =====
// ==========================================
{
// ContainsAllFilter
// highlight-start
const tokenList = ['australia', 'india']
// highlight-end

const result = await jeopardy.query.fetchObjects({
  // Find objects where the `question` property contains all of the strings in `tokenList`
  // highlight-start
  filters: jeopardy.filter.byProperty('question').containsAll(tokenList),
  // highlight-end
  limit: 3,
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END ContainsAllFilter

// Tests
// for (const question of result.objects) {
//   assert.ok(question.question.toLowerCase().includes('red') & question.question.toLowerCase().includes('blue'));
// }
}

// ==========================================
// ===== Multiple Filters with And =====
// ==========================================

{
// searchMultipleFiltersAnd
const result = await jeopardy.query.fetchObjects({
  // highlight-start
  filters: Filters.and(
    jeopardy.filter.byProperty('round').equal('Double Jeopardy!'),
    jeopardy.filter.byProperty('points').lessThan(600)
  ),
  // highlight-end
  limit: 3,
 })

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END searchMultipleFiltersAnd

// Tests
// questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
// assert.deepEqual(result.objects.length, 3);
// for (const question of result.objects) {
//   assert.deepEqual(question.round, 'Double Jeopardy!');
//   assert.ok(question.points < 600);
// }
}


// ==========================================
// ===== Multiple Filters with Nesting =====
// ==========================================
{
// searchMultipleFiltersNested
const result = await jeopardy.query.fetchObjects({
 // highlight-start
  filters: Filters.and(
    jeopardy.filter.byProperty('answer').like('*bird*'),

    Filters.or(
      jeopardy.filter.byProperty('points').greaterThan(700),
      jeopardy.filter.byProperty('points').lessThan(300)
    )
  ),
  // highlight-end
  limit: 3
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END searchMultipleFiltersNested

// Tests
// questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'points']));
// assert.deepEqual(result.objects.length, 3);
// for (const question of result.objects) {
//   assert.ok(question.answer.toLowerCase().includes('bird'));
//   assert.ok(question.points < 300 || question.points > 700);
// }
}

// ===================================================
// ===== Filters using Cross-referenced property =====
// ===================================================
{
// searchCrossReference
const result = await jeopardy.query.fetchObjects({
  // highlight-start
  filters: jeopardy.filter.byRef('hasCategory').byProperty('title').like('*Sport*'),
  returnReferences: [{
    linkOn: 'hasCategory',
    returnProperties: ['title'],
  }],
  // highlight-end
  limit: 3
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END searchCrossReference

// Tests
// questionKeys = new Set(Object.keys(result.objects[0].properties));
// assert.deepEqual(questionKeys, new Set(['question', 'answer', 'round', 'hasCategory']));
// assert.deepEqual(result.objects.length, 3);
// for (const question of result.objects) {
//   assert.ok(question.properties.hasCategory[0].title.toLowerCase().includes('sport'));
// }
}

// ===================================================
// ===== Filters using Id =====
// ===================================================
{
// filterById
const targetId = '00037775-1432-35e5-bc59-443baaef7d80'

result = await jeopardy.query.fetchObjects({
  // highlight-start
  filters: jeopardy.filter.byId().equal(targetId),
  // highlight-end
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END filterById

// Tests
assert.equal(targetId, result.objects[0].uuid);
}

// ===================================================
// ===== Filters using timestamps =====
// ===================================================

// FilterByTimestamp
const creationTime = '2020-01-01T00:00:00+00:00'

result = await myArticleCollection.query.fetchObjects({
  // highlight-start
  filters: jeopardy.filter.byCreationTime().greaterOrEqual(creationTime),
  // highlight-end
  returnMetadata: ['creationTime']
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END FilterByTimestamp

// Tests
for (const article of result.objects) {
  assert.ok(Number(article.metadata.creationTime) > 1577836800);
}


// ===================================================
// ===== FilterByDateDatatype =====
// ===================================================

const collectionWithDate = await client.collections.create({
  name: "CollectionWithDate",
  properties: [
    {
      name: "title",
      dataType: dataType.TEXT,
    },
    {
      name: "some_date",
      dataType: dataType.DATE,
    },
  ],
  vectorizers: vectorizer.none()
})

const insertYears = [2020, 2021, 2022, 2023, 2024]
const insertMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const insertDays = [1, 6, 11, 16]

let dataObjects = []
insertYears.forEach(year => {
  insertMonths.forEach(month => {
    insertDays.forEach(day => {
      dataObjects.push({
        properties: {
          title: `Object: ${year}/${month}/${day}`,
          some_date: new Date(year, month, day)
        }
      })
    })
  })
})

const dateObjInsertResponse = await collectionWithDate.data.insertMany(dataObjects);
// highlight-end


// FilterByDateDatatype
const filterTime = new Date(2020, 5, 10)  // Note that the month is 0-indexed
// The filter threshold could also be an RFC 3339 timestamp, e.g.:
// filterTime = '2022-06-10T00:00:00.00Z'

result = await collectionWithDate.query.fetchObjects({
  limit: 3,
  // highlight-start
  filters: jeopardy.filter.byProperty('some_date').greaterThan(filterTime),
  // highlight-end
})

result.objects.forEach((object) =>
  console.log(JSON.stringify(object.properties, null, 2))
);
// END FilterByDateDatatype


// Tests
assert.ok(result.objects.length > 0);


// ===================================================
// ===== Filters using property length =====
// ===================================================
{
// FilterByPropertyLength
const result = await jeopardy.query.fetchObjects({
  // highlight-start
  filters: jeopardy.filter.byProperty('answer', true).greaterThan(20),
  // highlight-end
  limit: 3
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
}
// END FilterByPropertyLength

// Tests
// for (const question of result.objects) {
//   assert.ok(question.properties.answer.length > 20);
// }
}


// ===================================================
// ===== Filters with Geolocation =====
// ===================================================
{
// FilterbyGeolocation
const publications = client.collections.get('Publication');

const geoResult = await publications.query.fetchObjects({
  // highlight-start
  filters: publications.filter.byProperty('headquartersGeoLocation').withinGeoRange({
    latitude: 52.39,
    longitude: 4.84,
    distance: 1000
  }),
  // highlight-end
})

console.log(JSON.stringify(geoResult.objects, null, 2));
// END FilterbyGeolocation
}
