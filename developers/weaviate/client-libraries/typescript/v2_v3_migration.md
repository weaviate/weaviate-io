---
title: Migrate from v2 to v3
sidebar_position: 70
image: og/docs/client-libraries.jpg
# tags: ['typescript', 'client library']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

import RCNote from '/_includes/clients/ts-client-rc-note.mdx';

<RCNote />

import TSClientIntro from '/_includes/clients/ts-client-intro.mdx';

<TSClientIntro />

## Install 

To install the TypeScript client v3, follow these steps: 

1. **Update Node.js**

   The v3 client requires `Node v18` or higher. 

1. **Install the new client package**
    
  ```bash
  npm install weaviate-client --tag next
  ```

1. **Upgrade Weaviate**

   The v3 client requires Weaviate core `1.23.7` or higher. Whenever possible, use the latest versions of Weaviate core and the Weaviate client.

1. **Open a gRPC port**

   The default gRPC port is 50051.

    <details>
      <summary>docker-compose.yml</summary>

    To map the Weaviate gRPC port in your Docker container to a local port, add this code to your `docker-compose.yml` file:

    ```yaml
        ports:
        - 8080:8080
        - 50051:50051
    ```
    </details>

## Instantiate a client
 
The weaviate object is the main entry point for all API operations. The v3 client instantiates the weaviate object and [creates a connection](/developers/weaviate/starter-guides/connect) to your Weaviate instance.

In most cases, you should use one of the connection helper functions to connect to your Weaviate instance: 

- `connectToWCS`
- `connectToLocal`

You can also use a custom configuration to instantiate the client directly:

<Tabs groupId="platforms">
<TabItem value="wcs" label="WCS">

```ts
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
```

</TabItem>
<TabItem value="local" label="Local">

```ts
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
```

</TabItem>
<TabItem value="custom" label="Custom">

```ts
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
```

</TabItem>
</Tabs>

## Changes in v3

The v3 client introduces a new way to work with your data. Here are some of the important changes:

- [Collection object replaces client object](#work-with-collections)
- [Builder pattern is removed](#builder-pattern-is-removed)
- [Bulk inserts](#bulk-inserts)
- [Close clients explicitly](#client-close-method)
- [Data filtering](#filter-data)
- [Namespace for generative models](#generate-namespace)
- [Update return object](#return-object)

### Work with collections

The v2 client uses the `client` object for CRUD and search operations. In the v3 client, the `collection` object replaces the `client` object.

After you create a connection, you do not have to specify the collection for each operation. This helps to reduce errors.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS Client (v3)">

```ts
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.fetchObjects({
  returnProperties: ['question'],
})

console.log(JSON.stringify(result.objects, null, 2));
```

</TabItem>
<TabItem value="jsv2" label="JS/TS Client (v2)">

```ts
result = await client
  .graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withFields('question')
  .do();

console.log(JSON.stringify(result, null, 2));
```

</TabItem>
</Tabs>

Note here that the collection object can be re-used throughout the codebase.

### Builder Pattern is removed

The v2 client uses builder patterns to construct queries. Builder patterns can be confusing and can lead to invalid queries. The v3 client doesn't use the builder pattern. The v3 client uses specific methods and method parameters instead.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS Client (v3)">

```ts
let result 
const myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.nearText(['animals in movies'],{
  limit: 2,
  returnProperties: ['question', 'answer'],
  returnMetadata: ['distance']
})

console.log(JSON.stringify(result.objects, null, 2));
```

</TabItem>
<TabItem value="jsv2" label="JS/TS Client (v2)">

```ts
let result;

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withNearText({ concepts: ['animals in movies'] })
  .withLimit(2)
  .withFields('question answer _additional { distance }')
  .do();

console.log(JSON.stringify(result, null, 2));
```

</TabItem>
</Tabs>

### Bulk Inserts

The `insertMany()` method replaces `objectBatcher()` to make batch insertions easier.

For more information on batch processing, see [Batch Inserts](/developers/weaviate/client-libraries/typescript/typescript-v3#batch-inserts).

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS Client (v3)">

```ts
const questions = client.collections.get("CollectionName")
const dataObject = [...]; // your data

await questions.data.insertMany(dataBatch);
```

</TabItem>
<TabItem value="jsv2" label="JS/TS Client (v2)">

```ts
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
```

</TabItem>
</Tabs>

### Client Close Method

import TSClientClose from '/_includes/clients/ts-client-close.mdx'; 

<TSClientClose />

### Filter data

The `Filter` helper class makes it easier to use filters with conditions. The v3 client streamlines how you use `Filter` so your code is cleaner and more concise.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS Client (v3)">

```ts
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
```

</TabItem>
<TabItem value="jsv2" label="JS/TS Client (v2)">

```ts
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
```

</TabItem>
</Tabs>

### Generate Namespace

The v3 client adds a new namespace, `generate` for generative queries. This makes it easier to distinguish between generative queries and vector searches. 

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS Client (v3)">

```ts
const generatePrompt = `Convert this quiz question: {question} and answer: {answer} into a trivia tweet.`;

const myCollection = client.collections.get('JeopardyQuestion');
const result = await myCollection.generate.nearText(['World history'],{
    singlePrompt: generatePrompt,
  },{
    limit: 2,
    returnProperties: ['round'],
})

console.log(JSON.stringify(result.objects, null, 2));
```

</TabItem>
<TabItem value="jsv2" label="JS/TS Client (v2)">

```ts
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
```

</TabItem>
</Tabs>

### Return object 

The new client has a cleaner return object. It is easier to access important information like object UUIDs, object metadata, and generative query results.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS Client (v3)">

```ts
response.objects[0].properties.title  // Get the `title` property of the first object
response.objects[0].uuid  // Get the ID of the first object
response.objects[0].generated  // Get the generated text from a `singlePrompt` request
response.generated  // Get the generated text from a `groupedTask` request
response.metadata?.creationTime // Get the creation time as a native JS Date value
```

</TabItem>
<TabItem value="jsv2" label="JS/TS Client (v2)">

```ts
response.data?.Get?.Article?.[0].title  // Get the `title` property of the first object
response.data?.Get?.Article?.[0]['_additional']?.id  // Get the ID of the first object
response.data?.Get?.Article?.[0]['_additional']?.generate?.singleResult  // Get the generated text from a `singlePrompt` request
response.data?.Get?.Article?.[0]['_additional']?.generate.groupedResult  // Get the generated text from a `groupedTask` request
response.data?.Get?.Article?.[0]['_additional']?.creationTimeUnix // Get the timestamp when the object was created
```

</TabItem>
</Tabs>

## Code comparison

Consider these code samples. The samples compare v2 client code and v3 client code. The complete v2 and v3 client scripts follow the examples.

### Imports

v2 client code:

```
import weaviate, { ApiKey, WeaviateClient } from 'weaviate-ts-client';
import 'dotenv/config'
```

v3 client code:

```
import weaviate from 'weaviate-client'
import 'dotenv/config';
```

### Connect to Weaviate Cloud

v2 client code:

```
const client: WeaviateClient = weaviate.client({
  scheme: process.env.WEAVIATE_SCHEME_URL || '', 
  host: process.env.WEAVIATE_URL || '', 
  apiKey: new ApiKey(process.env.WEAVIATE_API_KEY || ''), 
  headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '' }, 
});
```

v3 client code:

```
const client = await weaviate.connectToWCS(
  process.env.WEAVIATE_URL || '',
  {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || ''),
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  
    }
  }
)
```

### Create a collection

v2 client code:

```
await client.schema.classCreator().withClass(schemaDefinition).do()
```

v3 client code:

```
await client.collections.create({
  name: collectionName,
  vectorizer: weaviate.configure.vectorizer.text2VecOpenAI(),
})
```

### Batch insert

v2 client code:

```
let counter = 0;
let batcher = client.batch.objectsBatcher();

// bulk insert data to your collection
for (const dataObjects of data) {
  batcher = batcher.withObject({
    class: collectionName,
    properties: dataObjects,
  });

  // push a batch of 10 objects
  if (++counter > 9) {
    await batcher.do();
    batcher = client.batch.objectsBatcher();
    counter = 0;
  }
}

// push the remaining batch of objects
if (counter > 0) {
  await batcher.do();
}
```

v3 client code:

```
// define a collection to interact with 
const myCollection = client.collections.get(collectionName)

// bulk insert data to your collection
await myCollection.data.insertMany(await response.json())
```

### Query your data

v2 client code:

```
const queryResponse = await client
.graphql
.get()
.withClassName(collectionName) // define a collection to interact with 
.withFields("title artist  _additional { distance id }")
.withNearText({
  "concepts": ['songs about cowboys']
})
.withLimit(2)
.do();
```

v3 client code:

```
// run a nearText search that limits results to two items and shows the distance metric of the results
const queryResponse = await myCollection.query.nearText('songs about cowboys',{
  limit: 2,
  returnMetadata: ['distance']
})
```

### Delete a collection

v2 client code:

```
// delete your collection
await client.schema.classDeleter().withClassName(collectionName).do();
```

v3 client code:

```
// delete your collection
await client.collections.delete(collectionName)

console.log('Collection Exists:', await client.collections.exists(collectionName))
```

### Sample scripts

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS Client v3">

```ts
import weaviate from 'weaviate-client'
import 'dotenv/config';

async function main() {
  // define a collection name
  const collectionName = 'RollingStones'

  // connect to your Weaviate instance on WCS
  const client = await weaviate.connectToWCS(
    process.env.WEAVIATE_URL || '',
    {
      authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || ''),
      headers: {
        'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  
      }
    }
  )

  // create a new collection
  await client.collections.create({
    name: collectionName,
    vectorizer: weaviate.configure.vectorizer.text2VecOpenAI(),
  })

  const response = await fetch('https://raw.githubusercontent.com/weaviate/weaviate-io/tsdocs/content-fixes/_includes/clients/songs.json')

  // define a collection to interact with 
  const myCollection = client.collections.get(collectionName)

  // bulk insert data to your collection
  await myCollection.data.insertMany(await response.json())

  // run a nearText search that limits results to two items and shows the distance metric of the results
  const queryResponse = await myCollection.query.nearText('songs about cowboys',{
    limit: 2,
    returnMetadata: ['distance']
  })

  console.log('Here are songs about cowboys: ', queryResponse.objects)

  // delete your collection
  await client.collections.delete(collectionName)

  console.log('Collection Exists:', await client.collections.exists(collectionName))
}

main()
```

</TabItem>
<TabItem value="jsv2" label="JS/TS Client v2">

```ts
import weaviate, { ApiKey, WeaviateClient } from 'weaviate-ts-client';
import 'dotenv/config'

async function main() {
  // define a collection name
  const collectionName = 'RollingStones'

  // connect to your Weaviate instance on WCS
  const client: WeaviateClient = weaviate.client({
    scheme: process.env.WEAVIATE_SCHEME_URL || '', 
    host: process.env.WEAVIATE_URL || '', 
    apiKey: new ApiKey(process.env.WEAVIATE_API_KEY || ''), 
    headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '' }, 
  });

  const schemaDefinition = {
    class: collectionName,
    vectorizer: 'text2vec-openai',
  }
  
  // create a new collection
  await client.schema.classCreator().withClass(schemaDefinition).do()

  const response = await fetch('https://raw.githubusercontent.com/weaviate/weaviate-io/tsdocs/content-fixes/_includes/clients/songs.json')
  const data = await response.json()

  let counter = 0;
  let batcher = client.batch.objectsBatcher();

  // bulk insert data to your collection
  for (const dataObjects of data) {
    batcher = batcher.withObject({
      class: collectionName,
      properties: dataObjects,
    });

    // push a batch of 10 objects
    if (++counter > 9) {
      await batcher.do();
      batcher = client.batch.objectsBatcher();
      counter = 0;
    }
  }

  // push the remaining batch of objects
  if (counter > 0) {
    await batcher.do();
  }

  // run a nearText search that limits results to two items and shows the distance metric of the results
  const queryResponse = await client
  .graphql
  .get()
  .withClassName(collectionName) // define a collection to interact with 
  .withFields("title artist  _additional { distance id }")
  .withNearText({
    "concepts": ['songs about cowboys']
  })
  .withLimit(2)
  .do();

  console.log('Here are songs about cowboys:', queryResponse.data.Get.RollingStones)

  // delete your collection
  await client.schema.classDeleter().withClassName(collectionName).do();

  console.log('Collection Exists:', await client.schema.exists(collectionName))
}

main()
```

</TabItem>
</Tabs>

For more code examples, see the following:

- [Search](/developers/weaviate/search)
- [Data management](/developers/weaviate/manage-data)
- [Connect to Weaviate](/developers/weaviate/starter-guides/connect)

## How to migrate your code

To update v2 client code to v3, follow these steps:

1. Install the [v3 client package](https://www.npmjs.com/package/weaviate-client). 
1. Edit your v2 code to [import](./typescript-v3.md#import-the-client) the v3 client package. 
1. Edit your v2 [client instantiation](./typescript-v3.md#connect-to-weaviate) code.
1. Edit your code to reflect the [collection first](./typescript-v3.md#design-philosophy) client orientation. 

Continue to update the v2 code until all of the old code is replace with the v3 equivalent.

## Client change logs

The client [change logs](https://github.com/weaviate/typescript-client/releases) for each release are available on GitHub.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
