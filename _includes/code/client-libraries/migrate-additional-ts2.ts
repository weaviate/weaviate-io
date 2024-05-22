// =============================
// === WORK WITH COLLECTIONS
// =============================

// CollectionEx
result = await client
  .graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withFields('question')
  .do();

console.log(JSON.stringify(result, null, 2));
// END CollectionEx

// =============================
// === BUILDER PATTERN
// =============================

// BuilderEx
let result;

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withNearText({ concepts: ['animals in movies'] })
  .withLimit(2)
  .withFields('question answer _additional { distance }')
  .do();

console.log(JSON.stringify(result, null, 2));
// END BuilderEx

// =============================
// === BATCH INSERTS
// =============================

// BatchEx
let className = 'CollectionName';  // Replace with your collection name
let dataObject = [...];

let batcher5 = client.batch.objectsBatcher();
for (const dataObj of dataObject)
  batcher5 = batcher5.withObject({
    class: className,
    properties: dataObj,
  });

// Flush
await batcher5.do();
// END BatchEx

// =============================
// === FILTER DATA
// =============================

// FilterDataEx
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withWhere({
    operator: 'And',
    operands: [
      {
        path: ['round'],
        operator: 'Equal',
        valueText: 'Double Jeopardy!',
      },
      {
        path: ['points'],
        operator: 'LessThan',
        valueInt: 600,
      },
    ],
  })
  .withLimit(3)
  .withFields('question answer round points')
  .do();

console.log(JSON.stringify(result, null, 2));
// END FilterDataEx

// =============================
// === GENERATE NAMESPACE
// =============================

// GenerateNamespaceEx
let result;
generatePrompt = 'Convert this quiz question: {question} and answer: {answer} into a trivia tweet.';

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withGenerate({
    singlePrompt: generatePrompt,
  })
  .withNearText({
    concepts: ['World history'],
  })
  .withFields('round')
  .withLimit(2)
  .do();

console.log(JSON.stringify(result, null, 2));
// END GenerateNamespaceEx

// =============================
// === RETURN OBJECT
// =============================

// ReturnObjectEx
response.data?.Get?.Article?.[0].title  // Get the `title` property of the first object
response.data?.Get?.Article?.[0]['_additional']?.id  // Get the ID of the first object
response.data?.Get?.Article?.[0]['_additional']?.generate?.singleResult  // Get the generated text from a `singlePrompt` request
response.data?.Get?.Article?.[0]['_additional']?.generate.groupedResult  // Get the generated text from a `groupedTask` request
response.data?.Get?.Article?.[0]['_additional']?.creationTimeUnix // Get the timestamp when the object was created
// END ReturnObjectEx