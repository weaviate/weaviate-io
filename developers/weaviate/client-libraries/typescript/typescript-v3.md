---
title: Typescript / JavaScript (v3 Beta)
sidebar_position: 20
image: og/docs/client-libraries.jpg
# tags: ['typescript', 'javascript', 'client library', 'experimental']
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note TypeScript client version
The current Typescript client version is `v||site.typescript_client_version||`.
:::



The Weaviate TypeScript client supports Javascript and Typescript. The Typescript client v3 is currently in beta. This page covers the Weaviate TypeScript client; `weaviate-client` on the npm registry. 

This client is meant for server development and will not work for web client development. If you need to develop a web client application, please use the `weaviate-ts-client` package or use our [web client](#).

:::note Client Migration
If you are migrating from the Weaviate Typescript client `v2` to the `v3` client, see the [migration page](../../client-libraries/typescript/v2_v3_migration.md) for additional details.
:::

For usage information not specific to the TypeScript client, such as code examples, see the relevant pages in the Weaviate documentation.

## Client Setup

### Install

Use [npm](https://www.npmjs.com/) to install the TypeScript client library package:

```bash
npm install weaviate-client --tag beta
```

### Import the Client

The `v3` client uses `ES Modules`. Most of the sample code follows `ES Module` style.

If your code requires `CommonJS` compatibility, use the `CommonJS` import style:

<Tabs groupId="languages">
<TabItem value="esm" label="ES Modules">

```ts
import weaviate from 'weaviate-client'
```

</TabItem>
<TabItem value="cjs" label="CommonJS">

```ts
const weaviate = require('weaviate-client').default;
```

</TabItem>
</Tabs>


### Typescript Setup

Add the following code to your `tsconfig.json`file. 

<details>
    <summary>tsconfig.json file</summary>
Change or add the following properties.

```json
{
    "compilerOptions": {
      ...
      "target": "esnext",
      "module": "esnext", 
      "moduleResolution": "Node16",
      "esModuleInterop": true,
      "lib": [ "es2018" ],
      ...
  }
}
```
   
</details>


## Connect a client

Consider:

The v3 client provides helper functions to connect your application to your Weaviate instance..

### Connect to Weaviate

<Tabs groupId="platforms">
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

## Usage

### Design philosophy

The `v3` client interacts with collections as the primary way to work with objects in your Weaviate database.

Your application code creates a connection to a collection. Then, the code defines data operations on that collection. This example returns objects from the JeopardyQuestion collection.

```js
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.fetchObjects()

console.log(JSON.stringify(result, null, 2));
```


### Batch Inserts

We've added an `insertMany()` method makes it easier to insert a large number of objects. For inserts over 5000 objects, use a batch insert like this:

```js
const questions = client.collections.get("CollectionName")

const batchSize = 1000; // define your batch size

async function insertBatch() {
  try {
    await questions.data.insertMany(dataBatch);
    console.log('Batch inserted successfully');
  } catch (error) {
    console.error('Error inserting batch:', error);
  }
}

async function batchInsert() {
  for (let i = 0; i < dataArray.length; i += batchSize) {
    const batch = dataArray.slice(i, i + batchSize);
    await insertBatch(batch);
  }
}

const dataObject = [...]; // your data
await batchInsert(dataObject);
```

### Iterator Method

The cursor API has a new iterator method. To repeat an action over an entire collection, use `iterator()`.

```js
const articles = client.collections.get('Article')

for await (const article of articles.iterator()) {
  // do something with article. 
  console.log(article) // we print each object in the collection
}
```

### Generics

TypeScript users can define custom Generics

```js
import weaviate from 'weaviate-client';

type Article = {
  title: string;
  body: string;
  wordcount: number;
}

const collection = client.collections.get<Article>('Article');
await collection.insert({ // compiler error since 'body' field is missing in '.insert'
  title: 'TS is awesome!',
  wordcount: 9001
})
```

Generics make it easier to manipulate objects and their properties. Compile time type checks help to ensure that operations like `insert()` and `create()` are safe and error free.  

### Close client method 

The v3 client uses gRPC to communicate with your Weaviate instance. As a result, the client may keep its connection with Weaviate open longer that you're used to. To save on resources, use the `client.close()` method to explicitly close the connection when an operation finishes
	
### Async operations

It's worth knowing that all methods with the exception of `collection.use()` use ES6 Promises to deal with asynchronous code, so you need to use `.then()` after function calls, or have `async`/`await` support.

When there is an asynchronous code error, a promise returns the specific error message. If you use `async` and `await`, a rejected promises acts like a thrown exception

### Type Safety

We've also utilized strong typing through custom Typescript types and user-defined generics. The type definitions can be found under each bundles respective folder; the subdirectory of `node/cjs` and `node/esm` in the `*.d.ts` files, for example as shown on the [npm package page](https://www.npmjs.com/package/weaviate-client/v/3.0.0-beta.17?activeTab=code).


Beyond Typescript, we've added a few features to make Javascript development a little bit more type-safe.

### Authentication

import ClientAuthIntro from '/developers/weaviate/client-libraries/_components/client.auth.introduction.mdx'

<ClientAuthIntro clientName="TypeScript"/>

### WCS authentication

import ClientAuthWCS from '/developers/weaviate/client-libraries/_components/client.auth.wcs.mdx'

<ClientAuthWCS />

### API key authentication

import ClientAuthApiKey from '/developers/weaviate/client-libraries/_components/client.auth.api.key.mdx'

<ClientAuthApiKey />

<Tabs groupId="languages">
<TabItem value="js" label="JavaScript">

```js
const { default: weaviate } = require('weaviate-client');

// Instantiate the client with the auth config
const client = await weaviate.connectToWCS(
  'some-endpoint.weaviate.network', {
    authCredentials: new weaviate.ApiKey('api-key'), // Add your WCS API KEK here
  } 
)
 
console.log(client)
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';

// Instantiate the client with the auth config
const client: WeaviateClient = await weaviate.connectToWCS(
  'some-endpoint.weaviate.network', {
    authCredentials: new weaviate.ApiKey('api-key'), // Add your WCS API KEK here
  } 
)

console.log(client)
```

</TabItem>
</Tabs>

You can pass custom headers to the client, which are added at initialization:

<Tabs groupId="languages">
<TabItem value="js" label="JavaScript">

```js
const { default: weaviate } = require('weaviate-client');

const client = await weaviate.connectToWCS(
  'https://some-endpoint.weaviate.network',
  {
    authCredentials: new weaviate.ApiKey('some-api-key'),
    headers: {
      someHeaderName: 'header-value', 
    }
  } 
)
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCS(
  'https://some-endpoint.weaviate.network',
  {
    authCredentials: new weaviate.ApiKey('some-api-key'),
    headers: {
      someHeaderName: 'header-value', 
    }
  } 
)
```

</TabItem>
</Tabs>

These headers will then be included in every request that the client makes.

### Node support only 

We've chosen to break up the new TypeScript client into Node and Web versions. With the addition of gRPC to Weaviate, we now have the HTTP/2 protocol to contend with and we quickly discovered that gRPC and HTTP/2 don't play nicely with browsers. 

In this beta, you only have access to the Node version of the client. We will use the beta period to work on the Web version of the client.

:::note What can you do with the Node Bundle?
All CRUD (Create, Read, Update and Delete) operations powered by gRPC and REST.
:::

:::note What will you be able to do with the Web bundle?
Only Read operations powered by GraphQL.
:::


## What's Next

Here are some resources to help you get started using the client.

### Recipes

The [recipes repository](https://github.com/weaviate/recipes-ts) on Github has sample code for common use cases.

### Demo Applications

There are demo applications written in TypeScript and JavaScript here:

- [QuoteFinder](https://github.com/weaviate/quote-finder/tree/main)
- [NuxtVectorSearch](https://github.com/malgamves/nuxt-typescript-vector-search)

:::note v2 → v3 client documentation migration
We are in the process of migrating our v2 client code examples to v3 as necessary. Please be patient as we work on documenting the rest.
:::

At the moment, we've covered the following pages. 

- [Introduction](https://weaviate.io/developers/weaviate/introduction)
- [Quickstart](https://weaviate.io/developers/weaviate/quickstart)
- [Starter Guides](https://weaviate.io/developers/weaviate/starter-guides)
- [How-to: Search](https://weaviate.io/developers/weaviate/search)
- [How-to: Manage Data](https://weaviate.io/developers/weaviate/manage-data)


Our [RESTful endpoints](../../api/rest/index.md) and [GraphQL functions](../../api/graphql/index.md) covered by the TypeScript client currently have JavaScript examples in the code blocks.

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
