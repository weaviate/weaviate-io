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

This guide highlights the major changes in the new client. The guide also makes suggestions about how to migrate your v2 code to v3.

The v3 client supports Node.js server based development. It does not support web client development.

To develop a web client based application, use the [v2 client](/developers/weaviate/client-libraries/typescript/typescript-v2) or the v3 web client when it is available.

## Install 

To install the TypeScript client `v3`, follow these steps: 

1. Update your version of Node.js.
    - The minimum version of Node supported by the `v3` client is Node 18. 

2. Install the new client package.
    
  ```bash
  npm install weaviate-client --tag beta
  ```

3. Upgrade Weaviate to a compatible version
    - Weaviate `1.23.7` is required for `v3.0` of the client. Whenever possible, use the latest versions of Weaviate core and the Weaviate client.

4. Open a gRPC port for Weaviate.
    - The default port is 50051.
	
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
Once it has been instantiated, you will notice that the client API is different from `v2`.
## Major changes

From a user's perspective, major changes with the `v3` client include:

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
















































1. Install the new client package
    - Depending on your use case, i.e. web or node, the client name changes. 

    For Web, the new TypeScript client is usable under the `weaviate-client-web` package. 

    For Node.js, new TypeScript client is usable under the `weaviate-client` package. 

    The previous client had a single package for both use cases.

    ```bash
     npm install weaviate-ts-client
    ```

2. Upgrade Weaviate to a compatible version
    - Weaviate `1.23.7` is required for `v4.4.1`. Generally, we recommend you use the latest versions of Weaviate and the client.

3. Make sure you have the correct TypeScript configuration if you're using TypeScript
    - 

<details>
      <summary> tsconfig.json file</summary>

    To properly use the client, add the following to your `tsconfig.json` file:

    ```json
  {
      "compilerOptions": {
        ...
        "target": "esnext",
        "module": "esnext", 
        "moduleResolution": "Node16",
        "include": ["*.ts"], 
        "esModuleInterop": true,
        "lib": [ "es2018" ],
        ...
     }
  }
    ```
</details>

4. Update your version on Node.

    - The minimum version of Node supported by the client is 16. 

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

The `v3` client is instantiated through the `WeaviateClient` object, which is the main entry point for all API operations.

You can directly instantiate the client, but in most cases you can use helper functions starting with `connectTo`, such as `connectToLocal`, `connectToWCS`. 

<Tabs groupId="languages">
<TabItem value="wcs" label="WCS">

```ts
import weaviate, { WeaviateClient } from 'weaviate-client'

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
import weaviate, { WeaviateClient } from 'weaviate-client'

const client: WeaviateClient = await weaviate.connectToLocal({
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
 

### Better TypeScript Support

  - generics, functions and methods

The `v3` client introduces an extensive set of helper classes to interact with Weaviate. These classes are used to provide strong typing, and to make the client more user-friendly such as through IDE autocompletion.

Take a look at the examples below.

import QuickStartCode from '!!raw-loader!/_includes/code/graphql.filters.nearText.generic.py';

<Tabs groupId="languages">
<TabItem value="create" label="Create a collection">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START CreateCollectionExample"
    endMarker="# END CreateCollectionExample"
    language="py"
  />

</TabItem>
<TabItem value="query" label="NearText query">

  <FilteredTextBlock
    text={QuickStartCode}
    startMarker="# NearTextExample"
    endMarker="# END NearTextExample"
    language="py"
  />

</TabItem>
</Tabs>

In both of these examples, you can see how the helper classes and methods abstract away the need for manual JSONs or strings.

### Interaction with collections

Interacting with the `client` object for CRUD and search operations have been replaced with the use of collection objects.

This conveniently removes the need to specify the collection for each operation, and reduces potential for errors.

import ManageDataCode from '!!raw-loader!/_includes/code/howto/manage-data.read.py';
import ManageDataCodeV3 from '!!raw-loader!/_includes/code/howto/manage-data.read-v3.py';

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={ManageDataCode}
      startMarker="# ReadObject START"
      endMarker="# ReadObject END"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={ManageDataCodeV3}
      startMarker="# ReadObject START"
      endMarker="# ReadObject END"
      language="py"
    />
  </TabItem>
</Tabs>

Note here that the collection object can be re-used throughout the codebase.

### Collection creation from JSON

You can still create a collection from a JSON definition. This may be a useful way to migrate your existing data, for example. You could [fetch an existing definition](../../manage-data/collections.mdx#read-a-single-collection-definition) and then use it to create a new collection.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START CreateCollectionFromJSON"
  endMarker="# END CreateCollectionFromJSON"
  language="py"
/>

### Removal of builder patterns

The builder patterns for constructing queries as been removed, as they could be confusing and potentially lead to invalid queries.

In `v4`, queries are constructed using specific methods and its parameters.

import SearchSimilarityCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import SearchSimilarityCodeV3 from '!!raw-loader!/_includes/code/howto/search.similarity-v3.py';

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={SearchSimilarityCode}
      startMarker="# GetNearTextPython"
      endMarker="# END GetNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={SearchSimilarityCodeV3}
      startMarker="# GetNearTextPython"
      endMarker="# END GetNearTextPython"
      language="python"
    />
  </TabItem>
</Tabs>

This makes it easier to understand and use. Additionally, some parameters typed (e.g. `MetadataQuery`) which makes it easier to use and reduces errors.

### Separate packages for Web and Node platforms

  - talk a bit more about this and package specifics 
  - Introduction of gRPC?

### Improved Functionality

(with examples)

#### InsertMany
#### Migration?
#### Client.close()
#### Filters
#### Named vectors? 
#### cleaner return object 
#### Error handling 

## How to migrate your code

To get started, review the TypeScript client [documentation](/developers/weaviate/client-libraries/typescript/typescript-v3). For code examples, review these pages:

- [Search](/developers/weaviate/search)
- [Data management](/developers/weaviate/manage-data)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
