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

## Overview

The Weaviate TypeScript client can be used for development in both JavaScript and TypeScript. This page covers the Weaviate TypeScript client; `weaviate-client` on the npm registry. This version is currently in beta.  

This client is meant for server developement and will not work for web client developement. If you need to develop a web client application, please use the `weaviate-ts-client` package or use our [web client](#).

:::note Client Migration
If you are migrating from the `v2` Weaviate Typescript Client - `weaviate-ts-client` to the `v3` Weaviate Typescript Client - `weavaite-cleint`, please refer to our [**migration page**](../../client-libraries/typescript/v2_v3_migration.md) for support on your migration.
:::

For usage information not specific to the Typescript client, such as code examples, see the relevant pages in the Weaviate documentation.

## Client Setup

### Installation

The client library package can be installed using [npm](https://www.npmjs.com/).

```bash
npm install weaviate-client --tag beta
```

### Importing the Client

This client was built with `ES Modules` in mind and extends this to include `CommonJS` compatibilty.

<Tabs groupId="languages">
<TabItem value="esm" label="ES Modules">

```ts
import weaviate from 'weaviate-client'
```

</TabItem>
<TabItem value="cjs" label="CommonJS">

```ts
const { default: weaviate } = require('weaviate-client')
```

</TabItem>
</Tabs>


:::note ES Modules vs CommonJS
A lot of our examples follow an ES Modules syntax. Despite this, the client is `CommonJS` compatible.
:::

### Typescript Setup

To properly use the client in your existing Typescript application, add the following to your `tsconfig.json`. 

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


## Client Connection

Once installed, you can use the client in your Typescript and Javascript applications, as shown in the following examples.

### Connecting to Weaviate

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

:::tip Troubleshooting imports with Typescript
If you are having any issues with the import statement in TypeScript (e.g. if `weaviate` is `undefined`), try adding `"esModuleInterop": true` to your `"compilerOptions"` in `tsconfig.json`.
:::

## Usage and Design

### A Collection first Approach

With the new v3 client, we've opted focus on collections as primary method of interaction with your Weaviate database. Fetching objects from your database would look like this. 


```js
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.fetchObjects()

console.log(JSON.stringify(result, null, 2));
```

All data operations are now collection first.


### Batching

We've added an `insertMany()` method to help make batch insertions easier.  For insertions over 5000 objects, we advise batching these bulk insertions as shown below.

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

### Iterator 

We've simplified the cursor API with a more intuitive iterator. This functionalit lets us terating through an entire collection. The example below shows us how to use it.

```js
const articles = client.collections.get('Article')

for await (const article of articles.iterator()) {
  // do something with article
}
```

### Generics

For Typescript users, you can now provide your own Generics as follows.

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

This makes it easier to manipulate objects and their properties. This gives you additional safety as you have type checkss at compile time, making sure operations like insert or creation go on error free.  

### Close Client Method 

Using gRPC for operations, this client tends to keep its connection with Weaviate open longer that you're used to. We recommend closing this connection to save on resources with our `client.close()` method.

	
### Async operations

It's worth knowing that a number of methods use ES6 Promises to deal with asynchronous code, so you need to use `.then()` after function calls, or have `async`/`await` support.

A none exhaustive list includes 
- `collection.exists()`
- `collection.create()`
- `collection.insertMany()`


In the case of an error, the Promise rejects with the specific error message. (If using `async`/`await`, a rejected promises acts like a thrown exception).


### Type Safety

We've also utilized strong typing through custom Typescript types and user-defined generics. The type definitions can be found under each bundles respective folder; the subdirectory of `node/cjs` and `node/esm` in the `*.d.ts` files, for example as shown on the [npm package page](https://www.npmjs.com/package/weaviate-client/v/3.0.0-beta.17?activeTab=code).


Beyond Typescript, we've added a few featrues to make Javascript development a little bit more type-safe.

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

### Separated Node and Web Versions

We've chosen to break up the new TypeScript client into Node and Web versions. With the addition of gRPC to Weaviate, we now have the HTTP/2 protocol to contend with and we quickly discovered that gRPC and HTTP/2 don't play nicely with browsers. 

In this beta, you only have access to the Node version of the client. We will use the beta period to work on the Web version of the client.

:::note What can you do with the Node Bundle?
All CRUD (Create, Read, Update and Delete) operations powered by gRPC and REST.
:::

:::note What will you be able to do with the Web bundle?
Only Read operations powered by GraphQL.
:::


## What's Next

We have curated some resources to help you get started using the client. 


### Recipes

We have a repository of code recipes that follow popular Weaviate use cases. 
You can run these on the [recipes-ts](https://github.com/weaviate/recipes-ts) Github repository.

### Demo Applications

We have a few demo applications writtten in Typescript and Javascript 

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
