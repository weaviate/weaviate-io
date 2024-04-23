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

The TypeScript client can be used for both JavaScript and TypeScript scripts. This page covers the Weaviate TypeScript client; `weaviate-client` on npm. This version is currently in beta. For usage information not specific to the Typescript client, such as code examples, see the relevant pages in the Weaviate documentation.

## Installation and setup

- Add web cleint initialisation 
- link to other TS packages and resoruces? like embedded
- add example queries
- link to weaviate recipes and example apps

The TypeScript client library package can be installed using [npm](https://www.npmjs.com/).

```bash
npm install weaviate-client --tag beta
```

Some packages, like the Weaviate TypeScript client, require extra configuration. The root directory of a TypeScript project has a `tsconfig.json` file. Add the following to your `tsconfig.json`.

<details>
    <summary> tsconfig.json file</summary>
    To properly use the client, add the following to your tsconfig.json file:

<<<<<<< HEAD
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
=======
  - `"target": "esnext"`
  - `"module": "esnext"` (requires at least **Node16**)
  - `"moduleResolution": "Node16"`

- `"include": ["*.ts"]`  (Or specific files)
- `"lib": [ "es2018" ]`
>>>>>>> 70f44bbd8b199798392e1a84d0dae9db541ab528

Don't specify filenames on the command line when you use `tsconfig.json`. Specify the TypeScript files in `tsconfig.json` instead. `tsc` only reads `tsconfig.json` when you run it by itself.


## References

:::note v2 → v3 client documentation migration
We are in the process of migrating our v2 client code examples to v3 as necessary. Please be patient as we work on documenting the rest.
:::

At the moment, we've covered the following pages.

- [Introduction](https://weaviate.io/developers/weaviate/introduction)
- [Quickstart](https://weaviate.io/developers/weaviate/quickstart)
- [Start Guides](https://weaviate.io/developers/weaviate/starter-guides)
- [How-to: Search](https://weaviate.io/developers/weaviate/search)
- [How-to: Manage Data](https://weaviate.io/developers/weaviate/manage-data)


Our [RESTful endpoints](/developers/weaviate/api/rest) and [GraphQL functions](../../api/graphql/index.md) covered by the TypeScript client currently have JavaScript examples in the code blocks.

## Design

### A Collection first Approach

With the new v3 client, we've opted focus on collections as primary method of interaction with your Weaviate database. We've also utilized strong typing through custom Typescript types and user-defined generics.

// show query 
// change order 
// pick common js or esm for format 


## Client Connection

Once installed, you can use the client in your TypeScript and JavaScript scripts, as shown in the following examples.

### Connecting to Weaviate

<Tabs groupId="languages">
<TabItem value="wcs" label="WCS">

```ts
import weaviate, { WeaviateClient } from 'weaviate-client'

const client = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL', {
    authCredentials: new weaviate.ApiKey('api-key'),
  }
)

console.log(client)
```

</TabItem>
<TabItem value="local" label="Local">

```ts
import weaviate, { WeaviateClient } from 'weaviate-client'

<<<<<<< HEAD
const client: WeaviateClient = await weaviate.connectToLocal({
    httpHost: 'localhost',
    httpPort: 8080,
    grpcHost: 'localhost',
    grpcPort: 50051,
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || ''
    }
  })
 
=======
const client: WeaviateClient = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL', {
    authCredentials: new weaviate.ApiKey('api-key'),
  }
)

>>>>>>> 70f44bbd8b199798392e1a84d0dae9db541ab528
console.log(client)
```

</TabItem>
</Tabs>

:::tip Troubleshooting imports with TypeScript
If you are having any issues with the import statement in TypeScript (e.g. if `weaviate` is `undefined`), try adding `"esModuleInterop": true` to your `"compilerOptions"` in `tsconfig.json`.
:::

### Type definitions

The type definitions can be found under each bundles respective folder; the subdirectory of `node/cjs` and `node/esm` in the `*.d.ts` files, for example as shown on the [npm package page](https://www.npmjs.com/package/weaviate-client/v/3.0.0-beta.17?activeTab=code).

// add code example 

## Authentication

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
  'WEAVIATE_INSTANCE_URL', {
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
  'WEAVIATE_INSTANCE_URL', {
    authCredentials: new weaviate.ApiKey('api-key'), // Add your WCS API KEK here
  }
)

console.log(client)
```

</TabItem>
</Tabs>

### OIDC authentication

import ClientAuthOIDCIntro from '/developers/weaviate/client-libraries/_components/client.auth.oidc.introduction.mdx'

<ClientAuthOIDCIntro />

:::info Background refresh processes with TS
When using OIDC with the TypeScript client, its background token refresh process can block a script from exiting. If this behavior is not desired, you can:
1. Set the `silentRefresh` parameter as `false` in the OIDC configuration. Or,
1. Stop the process via `client.oidcAuth?.stopTokenRefresh()`, e.g. when a script is expected to exit, or token refresh is no longer needed.
:::

#### <i class="fa-solid fa-key"></i> Resource Owner Password Flow

import ClientAuthFlowResourceOwnerPassword from '/developers/weaviate/client-libraries/_components/client.auth.flow.resource.owner.password.mdx'

<ClientAuthFlowResourceOwnerPassword />

<Tabs groupId="languages">
<TabItem value="js" label="JavaScript">

```js
const { default: weaviate } = require('weaviate-client');

const client = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL', // Replace with your instance URL
  {
    authCredentials: new weaviate.AuthUserPasswordCredentials({
    username: 'username',
    password: 'password',
    silentRefresh: true, // Default: true - if false, you must refresh the token manually; if true, this background process will prevent a script from exiting.
    scopes: ['offline_acess'] // optional, depends on the configuration of your identity provider (not required with WCS)
    })
  }
)
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import weaviate, { WeaviateClient, AuthUserPasswordCredentials } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new AuthUserPasswordCredentials({
    username: 'username',
    password: 'password',
    silentRefresh: true, // Default: true - if false, you must refresh the token manually; if true, this background process will prevent a script from exiting.
    scopes: ['offline_acess'] // optional, depends on the configuration of your identity provider (not required with WCS)
    })
  }
)
```

</TabItem>
</Tabs>

#### <i class="fa-solid fa-key"></i> Client Credentials flow

import ClientAuthFlowClientCredentials from '/developers/weaviate/client-libraries/_components/client.auth.flow.client.credentials.mdx'

<ClientAuthFlowClientCredentials />

<Tabs groupId="languages">
<TabItem value="js" label="JavaScript">

```js
const { default: weaviate } = require('weaviate-client');

const client = await weaviate.connectToWCS(
  'https://WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.AuthClientCredentials({
      clientSecret: 'supersupersecret',
      silentRefresh: true, // Default: true - if false, you must refresh the token manually; if true, this background process will prevent a script from exiting.
      scopes: ['scope1', 'scope2']  // optional, depends on the configuration of your identity provider
    })
  }
)
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCS(
  'https://WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.AuthClientCredentials({
      clientSecret: 'supersupersecret',
      silentRefresh: true, // Default: true - if false, you must refresh the token manually; if true, this background process will prevent a script from exiting.
      scopes: ['scope1', 'scope2']  // optional, depends on the configuration of your identity provider
    })
  }
)
```

</TabItem>
</Tabs>

#### <i class="fa-solid fa-key"></i> Refresh Token flow

import ClientAuthBearerToken from '/developers/weaviate/client-libraries/_components/client.auth.bearer.token.mdx'

<ClientAuthBearerToken />

<Tabs groupId="languages">
<TabItem value="js" label="JavaScript">

```js
const { default: weaviate } = require('weaviate-client');

const client = await weaviate.connectToWCS(
  'https://WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.AuthAccessTokenCredentials({
      accessToken: 'acessToken',
      expiresIn: 900,
      refreshToken: 'refreshToken',
      silentRefresh: true // Default: true - if false, you must refresh the token manually; if true, this background process will prevent a script from exiting.
    })
  }
)
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCS(
  'https://WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.AuthAccessTokenCredentials({
      accessToken: 'acessToken',
      expiresIn: 900,
      refreshToken: 'refreshToken',
      silentRefresh: true // Default: true - if false, you must refresh the token manually; if true, this background process will prevent a script from exiting.
    })
  }
)
```

</TabItem>
</Tabs>

## Custom headers

You can pass custom headers to the client, which are added at initialization:

<Tabs groupId="languages">
<TabItem value="js" label="JavaScript">

```js
const { default: weaviate } = require('weaviate-client');

const client = await weaviate.connectToWCS(
  'https://WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
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
  'https://WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
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


### General notes
- All methods use ES6 Promises to deal with asynchronous code, so you need to use `.then()` after function calls, or have `async`/`await` support.
- In the case of an error, the Promise rejects with the specific error message. (If using `async`/`await`, a rejected promises acts like a thrown exception).
- Internally the client uses `isomorphic-fetch` to make the REST calls, so it should work from both the browser and NodeJS applications without any required changes.

## TypeScript for JavaScript users

TypeScript is a superset of JavaScript. There are, however, some differences that you should be aware of. This section offers some suggestions for JavaScript users who are new to TypeScript.

### Run a TypeScript file

To run a TypeScript file, first convert it to JavaScript. The `typescript` package from `npm` includes the `tsc` utility. Use `tsc` to convert (transpile) the TypeScript file.

Install the `typescript` package. Add the `-g` flag if you want the package to be available globally.

```bash
npm install typescript
```
You can then use this command to transpile the TypeScript file.

```bash
tsc
```

`node` only allows the `import` statement in modules. To allow the `import` statement, add the following to your `package.json` file.

```json
{
   "type": "module"
}
```

### Example

To run this example, complete these steps.

- Install the `typescript` package.
- Update the `tsconfig.json` and `package.json` files as described above.
- Copy the sample code.
- Save the code as `sample.ts` in the same directory as `tsconfig.json` and `package.json`.
- Convert and run the code.

Use this code to create `sample.ts`.

<details>
  <summary>Sample TypeScript code</summary>

```ts
import weaviate, { WeaviateClient } from 'weaviate-client'

const client: WeaviateClient = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL',  // Replace with your instance URL
  {
    authCredentials: new weaviate.ApiKey('api-key'),
  }
)

console.log(await client.isReady())
```
</details>

Convert `sample.ts`.

```bash
tsc
```

Run the converted file.

```bash
node sample.js
```

The output looks like this.

<details>
  <summary>Sample output</summary>

```json
{
  "clientId": "wcs",
  "href": "https://auth.wcs.api.weaviate.io/auth/realms/SeMI/.well-known/openid-configuration"
}
```
</details>
