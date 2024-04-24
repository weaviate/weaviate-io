---
title: Typescript / JavaScript (v3 Beta)
sidebar_position: 20
image: og/docs/client-libraries.jpg
# tags: ['typescript', 'javascript', 'client library', 'experimental']
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note TypeScript client version
The current TypeScript client version is `v||site.typescript_client_version||`.
:::


The Weaviate TypeScript client supports JavaScript and TypeScript. The TypeScript client v3 is currently in beta. This page covers the Weaviate TypeScript client; `weaviate-client` on the npm registry. 

The v3 client currently supports server side development (Node.js hosted). See [v3 packages](#node-support-only) for details.

If your application is browser based, consider using the TypeScript client v2.

:::note Client Migration
If you are migrating from the Weaviate TypeScript client `v2` to the `v3` client, see the [migration page](../../client-libraries/typescript/v2_v3_migration.md) for additional details.
:::

For usage information not specific to the TypeScript client, such as code examples, see the relevant pages in the Weaviate documentation.

## Client Setup

This section details how to set up the `v3` TypeScript client.

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

### Node support only 

We've chosen to break up the new TypeScript client into Node and Web versions. With the addition of gRPC to Weaviate, we now have the HTTP/2 protocol to contend with and we quickly discovered that gRPC and HTTP/2 don't play nicely with browsers. 

In this beta, you only have access to the Node version of the client. We will use the beta period to work on the Web version of the client.

:::note What can you do with the Node Bundle?
All CRUD (Create, Read, Update and Delete) operations powered by gRPC and REST.
:::

:::note What will you be able to do with the Web bundle?
Only Read operations powered by GraphQL.
:::

### TypeScript setup

Add `"type": "module"` to your `package.json` file and add the following code to your [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file. 

<details>
    <summary>tsconfig.json file</summary>

```json
{
    "compilerOptions": {
      "target": "esnext",
      "module": "esnext", 
      "moduleResolution": "Node16",
      "esModuleInterop": true,
      "lib": [ "es2018" ],
  }
}
```
   
</details>



## Connect a client

The v3 client provides helper functions to connect your application to your Weaviate instance.

### Connect to Weaviate

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

### Close client method 

import TSClientClose from '/_includes/clients/ts-client-close.mdx'; 

<TSClientClose />

### Authentication

import ClientAuthIntro from '/developers/weaviate/client-libraries/_components/client.auth.introduction.mdx'

<ClientAuthIntro clientName="TypeScript"/>

### WCS authentication

import ClientAuthWCS from '/developers/weaviate/client-libraries/_components/client.auth.wcs.mdx'

<ClientAuthWCS />

### API key authentication

import ClientAuthApiKey from '/developers/weaviate/client-libraries/_components/client.auth.api.key.mdx'

<ClientAuthApiKey />


```ts
import weaviate, { WeaviateClient } from 'weaviate-client';

// Instantiate the client with the auth config
const client: WeaviateClient = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL', // Replace WEAVIATE_INSTANCE_URL with your instance URL
  {
    authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_API_KEY'), // Add your WCS API KEY here
  } 
)

console.log(client)
```

You can pass custom headers to the client that are added at initialization:

```ts
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL', // Replace WEAVIATE_INSTANCE_URL with your instance URL
  {
    authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_API_KEY'), // Add your WCS API KEY here
    headers: {
      someHeaderName: 'header-value', 
    }
  } 
)
```

These headers will then be included in every request that the client makes.



## Working with data

This section details the functioning of different data operations available in the `v3` TypeScript client.

### Design philosophy

The `v3` client interacts with collections as the primary way to work with objects in your Weaviate database.

Your application code creates an object that represents a collection. This object enables search and CRUD operations to be performed against it. This example returns objects from the JeopardyQuestion collection.

```js
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.fetchObjects()

console.log(JSON.stringify(result, null, 2));
```


### Batch Inserts

The `insertMany()` method makes it easier to bulk insert a large number of objects without having to batch them. For inserts over 5000 objects, use a batching mechanism in conjunction with `insertMany()` like this:

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

## Best practices

This section details best practices working with the  `v3` TypeScript client.

### Generics

TypeScript users can define custom Generics.

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

### Async operations

All methods with the exception of `collection.use()` use ES6 Promises to deal with asynchronous code, so you need to use `.then()` after function calls, or have `async`/`await` support.

When there is an asynchronous code error, a promise returns the specific error message. If you use `async` and `await`, a rejected promises acts like a thrown exception

### Type Safety

The v3 client enables strong typing with custom TypeScript types and user-defined generics. You can find the type definitions in the folder that stores your Weaviate client package. The package is stored in a folder under the `node/` directory. Custom type definitions are stored in sub-folder for each bundle. 

For example, the `cjs/index.d.ts` file stores type definitions for the `cjs` bundle:


The v3 client also adds internal features that make JavaScript development more type-safe.

## Example code

Here are some resources to help you get started using the client.

### Recipes

The [recipes repository](https://github.com/weaviate/recipes-ts) on Github has sample code for common use cases.

### Demo applications

There are demo applications written in TypeScript and JavaScript here:

- [QuoteFinder](https://github.com/weaviate/quote-finder/tree/main)
- [NuxtVectorSearch](https://github.com/malgamves/nuxt-typescript-vector-search)

## Client releases

import MatrixIntro from '/_includes/clients/matrix-intro.md';

<MatrixIntro />

## Client change logs

See the client [change logs on GitHub](https://github.com/weaviate/typescript-client/releases).

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />