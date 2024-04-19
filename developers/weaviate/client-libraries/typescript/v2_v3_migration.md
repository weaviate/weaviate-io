---
title: v2 to v3 migration guide
sidebar_position: 12
image: og/docs/client-libraries.jpg
# tags: ['typescript', 'client library']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';


:::note Typescript client version
The current Typescript client version is `v||site.typescript_client_version||`
:::

The `v3` Weaviate Typescript client API is very different to the `v2` API. This guide will help you understand the major changes and how to migrate your code at a high level. 
To start, `v3` refers to the client with the package name `weaviate-client` and `v2` refers to the package name `weaviate-ts-client`. 

The `v3` client is meant for server development and will not work for web client development. If you need to develop a web client application, please use the `v2` client or use the `v3` [web client](#).

## Installation

To go from `v2` to `v3`, you must

1. Update your version of Node.js.
    - The minimum version of Node supported by the `v3` client is Node 18. 


2. Install the new client package.
    
  ```bash
  npm install weaviate-client --tag beta
  ```

2. Upgrade Weaviate to a compatible version
    - Weaviate `1.23.7` is required for `v3.0` of the client. Generally, we recommend you use the latest versions of Weaviate and the client.


3. Make sure a port for gRPC is open to Weaviate.
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

## Instantiation

The `v3` client is instantiated through the `weaviate` object, which is the main entry point for all API operations.

You can directly instantiate the client, but in most cases you can use helper functions starting with `connectTo`, such as `connectToLocal`, `connectToWCS`. 

<Tabs groupId="languages">
<TabItem value="wcs" label="WCS">

```ts
import weaviate from 'weaviate-client'

const client = await weaviate.connectToWCS(
  'some-endpoint.weaviate.network', {
    authCredentials: new weaviate.ApiKey('api-key'),
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
  })
 
console.log(client)
```

</TabItem>
</Tabs>

Once it has been instantiated, you will notice that the client API is different from `v2`.

## Major changes

From a user's perspective, major changes with the `v3` client include:

### Better Typescript Support

The `v3` client introduces better Typescript support. A lot of these benefits are visible with better IDE intellisense and type-safety. To add to this, we've made it possible for users to define their own Generics.

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

As in the example above, we can extend the use of Generics to create type-safe operations around collection creation, querying and deletion to mention a few. 

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

The builder patterns for constructing queries as been removed, as they could be confusing and potentially lead to invalid queries.

In `v3`, queries are constructed using specific methods and its parameters.

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

This makes it easier to understand and use. Additionally, some parameters typed (e.g. `MetadataQuery`) which makes it easier to use and reduces errors.

### Node only Support

To support gRPC, we've chosen to break up the new TypeScript client into Node and Web versions. The addition of gRPC to Weaviate means we now have the HTTP/2 protocol to contend with and we quickly discovered that gRPC and HTTP/2 don't play nicely with browser. That said, the `v3` client leverages Node.js-specific capabilities for building server applications, APIs, and CLIs, with the full gRPC functionality available.

For Web use, we recommend using the `v2` client or use the `v3` [web client](#).

### Improved Functionality

#### Improved Bulk Insertion
We've added an `insertMany()` method as a replacement for `objectBatcher()` to help make batch insertions easier. 

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

For more information on batching, I recommend looking at the [batching section](typescript-v3.md#) of our client page.


#### Client Close Method

Using gRPC for CRUD operations, this client tends to keep its connection with Weaviate open longer that you're used to. We recommend closing this connection to save on resources with our `client.close()` method.

#### Better Filter System

We've made it easier to use filters with conditions by adding a `Filter` helper class. The overall experience of filters has been streamlined for cleaner more concise development. 

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

#### New Generate Namespace

To perform generative queries, we have included a new `generate` namespace in the `v3` client. Through this namespace you have make queries as you would with the `query` namespace. 

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

#### Cleaner Return object 

The new client has made its return object cleaner by making it easier to access important information like your UUID, results of generative queries and object metadata. 


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

The migration will likely involve significant changes to your codebase. Review the [Typescript client library documentation](./index.mdx) to get started, including instantiation details and various submodules.

Then, take a look at the how-to guides for [Managing data](../../manage-data/index.md) and [Queries](../../search/index.md).

In particular, check out the pages for:

- [Client instantiation](./index.mdx#installation-and-setup),
- [Manage collections](../../manage-data/collections.mdx),
- [Batch import](../../manage-data/import.mdx)
- [Cross-reference](../../manage-data/cross-references.mdx)
- [Basic search](../../search/basics.md)
- [Similarity search](../../search/similarity.md)
- [Filters](../../search/filters.md)

## Can we help?

If you have any questions, please don't hesitate to reach out to us on the [Weaviate Community Forum](https://forum.weaviate.io/c/support/6).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
