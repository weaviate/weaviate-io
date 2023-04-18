---
title: JavaScript
sidebar_position: 3
image: og/docs/client-libraries.jpg
# tags: ['JavaScript', 'client library']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

:::note JavaScript client version
The current JavaScript client version is `v||site.javascript_client_version||`.
:::

import JavaScriptMaintenanceWarning from '/_includes/javascript-maintenance-warning.mdx';

<JavaScriptMaintenanceWarning />

## Installation and setup

The JavaScript client library package can be easily installed using [npm](https://www.npmjs.com/).

<!-- Replace $ .. examples to remove the prompt ($) as it gets copied too along with the actual command -->
```bash
npm install weaviate-client
```

Now you can use the client in your JavaScript scripts as follows:

```javascript
const weaviate = require("weaviate-client");

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

client
  .schema
  .getter()
  .do()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err)
  });
```

## Authentication

import ClientAuthIntro from '/developers/weaviate/client-libraries/_components/client.auth.introduction.mdx'

<ClientAuthIntro clientName="JavaScript"/>

### WCS authentication

import ClientAuthWCS from '/developers/weaviate/client-libraries/_components/client.auth.wcs.mdx'

<ClientAuthWCS />

### OIDC authentication

import ClientAuthOIDCIntro from '/developers/weaviate/client-libraries/_components/client.auth.oidc.introduction.mdx'

<ClientAuthOIDCIntro />

#### <i class="fa-solid fa-key"></i> Resource Owner Password Flow

import ClientAuthFlowResourceOwnerPassword from '/developers/weaviate/client-libraries/_components/client.auth.flow.resource.owner.password.mdx'

<ClientAuthFlowResourceOwnerPassword />


```js
const client = weaviate.client({
  scheme: "http",
  host: "weaviate-host",
  authClientSecret: new weaviate.AuthUserPasswordCredentials({
    username: "user123",
    password: "password",
    scopes: ["offline_access"]  // optional, depends on the configuration of your identity provider (not required with WCS)
  })
});
```

#### <i class="fa-solid fa-key"></i> Client Credentials flow

import ClientAuthFlowClientCredentials from '/developers/weaviate/client-libraries/_components/client.auth.flow.client.credentials.mdx'

<ClientAuthFlowClientCredentials />

```js
const client = weaviate.client({
  scheme: "http",
  host: "weaviate-host",
  authClientSecret: new weaviate.AuthClientCredentials({
    clientSecret: "supersecuresecret",
    scopes: ["scope1", "scope2"]  // optional, depends on the configuration of your identity provider (not required with WCS)
  })
});
```

#### <i class="fa-solid fa-key"></i> Refresh Token flow

import ClientAuthBearerToken from '/developers/weaviate/client-libraries/_components/client.auth.bearer.token.mdx'

<ClientAuthBearerToken />

```js
const client = weaviate.client({
  scheme: "http",
  host: "weaviate-host",
  authClientSecret: new weaviate.AuthAccessTokenCredentials({
    accessToken: "abcd1234",
    expiresIn: 900,
    refreshToken: "efgh5678"
  })
});
```

## Custom headers

You can pass custom headers to the client, which are added at initialization:

```js
const client = weaviate.client({
    scheme: 'http',
    host: 'weaviate-host',
    headers: {headerName: 'HeaderValue'}
  });
```

These headers will then be included in every request that the client makes.

## References

All [RESTful endpoints](../api/rest/index.md) and [GraphQL functions](../api/graphql/index.md) covered by the JS client have JavaScript examples in the code blocks.

## Design

### Builder pattern

The JavaScript client is designed following the [Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern). The pattern is used to build complex query objects. This means that calls (for example to retrieve data with a RESTful GET request, or using a more complex GraphQL query) are built with chained objects to reduce complexity. Some builder objects are optional, others are required to perform specific functions. Builder examples can be found in the [RESTful API reference pages](../api/rest/index.md) and the [GraphQL reference pages](../api/graphql/index.md).

The code snippet at the top of this page shows a simple query corresponding to the RESTful request `GET /v1/schema`. The client is initialized by requiring the package and connecting to a local instance. Then, a query is constructed by getting the `.schema` with `.getter()`. The query will be sent with the `.do()` call. `do()` is required for every function you want to build and execute.

### General notes
- All methods use ES6 Promises to deal with asynchronous code, so you need to use `.then()` after function calls, or have `async`/`await` support.
- In the case of an error, the Promise rejects with the specific error message. (If using `async`/`await`, a rejected promises acts like a thrown exception).
- Internally the client uses `isomorphic-fetch` to make the REST calls, so it should work from both the browser and NodeJS applications without any required changes.

## Changelog

See the [change logs on GitHub](https://github.com/weaviate/weaviate-javascript-client/releases).

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
