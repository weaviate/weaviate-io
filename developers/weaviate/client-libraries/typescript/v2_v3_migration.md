---
title: Migrate from v2 to v3
sidebar_position: 70
image: og/docs/client-libraries.jpg
# tags: ['typescript', 'client library']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/client-libraries/python_v4.py';

:::note TypeScript client version
The current TypeScript client version is `v||site.typescript_client_version||`
:::

import TSClientIntro from '/_includes/clients/ts-client-intro.mdx';

<TSClientIntro />

## Install 

To install the TypeScript client v3, follow these steps: 

1. Update your version of Node.js.
    - The minimum version of Node supported by the v3 client is Node 18. 

2. Install the new client package.
    
  ```bash
  npm install weaviate-client --tag beta
  ```

3. Upgrade Weaviate to a compatible version
    - Weaviate `1.23.7` is required for `v3.0` of the client. Whenever possible, use the latest versions of Weaviate core and the Weaviate client.

4. Open a gRPC port for Weaviate.
    - The default port is 50051.

    <details>
      <summary>docker-compose.yml example</summary>
    If you are running Weaviate with Docker, you can map the default port (`50051`) by adding the following to your `docker-compose.yml` file:
    ```yaml
        ports:
        - 8080:8080
        - 50051:50051
    ```
    </details>

## Instantiate a client
 
The weaviate object is the main entry point for all API operations. The v3 client instantiates the weaviate object.

You can instantiate the client directly, but in most cases you should use one of the helper functions:

- [`connectToLocal`](#NEEDS_LINK)
- [`connectToWCS`](#NEEDS_LINK)
- [`connectToCustom`](#NEEDS_LINK)

<Tabs groupId="languages">
<TabItem value="wcs" label="WCS">

```ts
import weaviate from 'weaviate-client'

const client = await weaviate.connectToWCS(
  'some-endpoint.weaviate.network', {
	@@ -106,9 +78,9 @@ console.log(client)
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
  })
 
console.log(client)
```
</TabItem>
</Tabs>
Once it has been instantiated, you will notice that the client API is different from v2.
## Major changes

From a user's perspective, major changes with the v3 client include:

### Better Typescript Support

The v3 client has better Typescript support. The user-facing benefits include better IDE intellisense, improved type-safety, and user-defined generics.

<Tabs groupId="languages">
<TabItem value="generics" label="Define Generics">

```ts
import weaviate from 'weaviate-client';

type Article = {
  title: string;
  body: string;
  wordcount: number;
}

const collection = client.collections.get<Article>('Article');
```

</TabItem>
<TabItem value="query" label="Insert Data">

```ts
const collection = client.collections.get<Article>('Article');

await collection.insert({ // compiler error since 'body' field is missing in '.insert'
  title: 'TS is awesome!',
  wordcount: 9001
})
```

</TabItem>
</Tabs>

The example uses generics to create type-safe operations. Use generics to write type-safe methods for other operations such as collection creation, querying, and deletion 

### Interaction with collections

Interacting with the `client` object for CRUD and search operations have been replaced with the use of collection objects.

This conveniently removes the need to specify the collection for each operation, and reduces potential for errors.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

```ts
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.fetchObjects({
  returnProperties: ['question'],
})

console.log(JSON.stringify(result.objects, null, 2));
```

</TabItem>
<TabItem value="jsv2" label="JS/TS (v2)">

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


### Removal of Builder Pattern

The builder patterns for constructing queries can be confusing and can lead to invalid queries. The v3 client doesn't use the builder pattern. The v3 client uses specific methods and method parameters instead.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

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
<TabItem value="jsv2" label="JS/TS (v2)">

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

Types make code safer and easier to understand. Typed method parameters also make the client library easier to use and reduce errors.

The gRPC protocol is fast and provides other internal benefits. Unfortunately, it does not support web client based development.

The v3 client supports Node.js, server based development. It does not support web client development.

To develop a browser based application, use the [v2 client](/developers/weaviate/client-libraries/typescript/typescript-v2).

### Improved Functionality

The TypeScript client v3 has additional improved functionality. 

#### Bulk Inserts

The insertMany() method replaces objectBatcher() to make batch insertions easier.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

```ts
const questions = client.collections.get("CollectionName")
const dataObject = [...]; // your data

await questions.data.insertMany(dataBatch);
```

</TabItem>
<TabItem value="jsv2" label="JS/TS (v2)">

```ts
let className = 'CollectionName';  // Replace with your collection name
let dataObjs = [...];

let batcher5 = client.batch.objectsBatcher();
for (const dataObj of dataObjs)
  batcher5 = batcher5.withObject({
    class: className,
    properties: dataObj,
  });

// Flush
await batcher5.do();
```

</TabItem>
</Tabs>

For more information on batch processing, see [Batch Inserts](/developers/weaviate/client-libraries/typescript/typescript-v3#batch-inserts).

#### Client Close Method

import TSClientClose from '/_includes/clients/ts-client-close.mdx'; 

<TSClientClose />

#### Filter data

The Filter helper class makes it easier to use filters with conditions. The v3 client streamlines how you use Filter so your code is cleaner and more concise.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

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
<TabItem value="jsv2" label="JS/TS (v2)">

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

#### Generate Namespace

The v3 client adds a new namespace, generate. Use the generate like the query namespace to make queries.


<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

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
<TabItem value="jsv2" label="JS/TS (v2)">

```ts
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

#### Return object 

The new client has a cleaner return object. It is easier to access important information like object UUIDs, object metadata, and generative query results.


<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

```ts
response.objects[0].properties.title  // Get the `title` property of the first object
response.objects[0].uuid  // Get the ID of the first object
response.objects[0].generated  // Get the generated text from a `singlePrompt` request
response.generated  // Get the generated text from a `groupedTask` request
response.metadata?.creationTime // Get the creation time as a native JS Date value
```


</TabItem>
<TabItem value="jsv2" label="JS/TS (v2)">

```ts
response.data?.Get?.Article?.[0].title  // Get the `title` property of the first object
response.data?.Get?.Article?.[0]['_additional']?.id  // Get the ID of the first object
response.data?.Get?.Article?.[0]['_additional']?.generate?.singleResult  // Get the generated text from a `singlePrompt` request
response.data?.Get?.Article?.[0]['_additional']?.generate.groupedResult  // Get the generated text from a `groupedTask` request
response.data?.Get?.Article?.[0]['_additional']?.creationTimeUnix // Get the timestamp when the object was created
```

</TabItem>
</Tabs>

## How to migrate your code

To get started, see the TypeScript client [documentation](/developers/weaviate/client-libraries/typescript/typescript-v3).

For code examples, see these pages:

- [Search](/developers/weaviate/search)
- [Data management](/developers/weaviate/manage-data)

## Client change logs

See the client [change logs on GitHub](https://github.com/weaviate/typescript-client/releases).

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
