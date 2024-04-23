---
title: Client (v3 Beta)
sidebar_position: 20
image: og/docs/client-libraries.jpg
# tags: ['typescript', 'javascript', 'client library', 'experimental']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note TypeScript client version
The current TypeScript client version is `v||site.typescript_client_version||`.
:::

The Weaviate TypeScript client supports JavaScript and TypeScript. The TypeScript client v3 is currently in beta.

The upcoming v3 client currently supports server side development (Node.js hosted). See [v3 packages](#node-support-only) for details. If your application is browser based, consider using the TypeScript client v2.

If you are migrating a project from the Weaviate TypeScript client v2 to the v3 client, see the [migration page](/developers.weaviate.client-libraries/typescript/v2_v3_migration) for additional details.

## Client configuration

This section details how install and configure the v3 TypeScript client.

### Install the package

Use [npm](https://www.npmjs.com/) to install the TypeScript client library package:

```bash
npm install weaviate-client --tag beta
```

### Import the Client

The v3 client uses `ES Modules`. Most of the sample code follows `ES Module` style. If your code requires `CommonJS` compatibility, use the `CommonJS` import style:

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

### TypeScript configuration

Update your configuration files. 

- Add `"type": "module"` to `package.json` 
- Add the following code to [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

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

To pass custom headers to the client, use the `headers` field.

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

The client adds the custom headers to every request.

## Changes in v3

This section highlights some features of the v3 TypeScript client.

### Design philosophy

The v3 client interacts with collections as the primary way to work with objects in your Weaviate database.

Your application code creates an object that represents a collection. This object enables search and CRUD operations to be performed against it.

This example returns objects from the JeopardyQuestion collection.

```js
const myCollection = client.collections.get('JeopardyQuestion');


const result = await myCollection.query.fetchObjects()

console.log(JSON.stringify(result, null, 2));
```

### Node support only 

The gRPC protocol is fast and provides other internal benefits. Unfortunately, it does not support web client based development.

The v3 client supports Node.js, server based development. It does not support browser-based web client development.

To develop a browser-based application, use the v2 client.


### Batch Inserts

The `insertMany()` method makes it easier to bulk insert a large number of objects.

For inserts of over 5000 objects, use `insertMany()` as part of a batch process:

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

TypeScript users can define custom Generics. Generics make it easier to manipulate objects and their properties. Compile time type checks help to ensure that operations like `insert()` and `create()` are safe and error free.

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

### Async operations

All client v3 methods, with the exception of `collection.use()`, use ES6 Promises with asynchronous code. This means you have to use `.then()` after function calls, or wrap your code `async/await` blocks.

When there is an asynchronous code error, a promise returns the specific error message. If you use `async` and `await`, a rejected promises acts like a thrown exception

### Type Safety

The v3 client enables strong typing with custom TypeScript types and user-defined generics. You can find the type definitions in the folder that stores your Weaviate client package. The package is stored in a folder under the `node/` directory. Custom type definitions are stored in sub-folder for each bundle. 

For example, the `index.d.ts` file stores type definitions for the `cjs` bundle:

```bash 
node/cjs/index.d.ts
```

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

