---
title: JavaScript
sidebar_position: 2
image: og/docs/client-libraries.jpg
# tags: ['JavaScript', 'client library']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Installation and setup

The JavaScript client library package can be easily installed using [npm](https://www.npmjs.com/).

<!-- Replace $ .. examples to remove the prompt ($) as it gets copied too along with the actual command -->
```bash
$ npm install weaviate-client
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

Please see the [authentication](../configuration/authentication.md) for broader information in relation to authentication with Weaviate.

The JavaScript client supports multiple OIDC authentication flows to use with Weaviate. 

First, choose one of the supported flows and create the flow-specific authentication configuration, which can then be passed to the client. The configuration, including secrets, are used by the client to obtain an `access token` and (if configured) a `refresh token`.

The `access token` is included in the HTTP-header of any request and is used to authenticate against weaviate. However, this token usually has a limited lifetime and the `refresh token` can be used to acquire a new set of tokens.

### Resource Owner Password flow

:::caution
This flow authenticates users using their *username* and *password*.

The username or password are not saved in the Weaviate client. They are only used to obtain the first tokens, after which existing tokens will be used to obtain subsequent tokens if possible.

Nonetheless, this authentication flow should only be used on trusted devices. 
:::

Not every provider automatically includes a `refresh token` and an appropriate *scope* might be required that depends on your identity provider. The client uses *offline_access* as default scope which works with some providers.

Without a refresh token, there is no possibility to acquire a new `access token` and the client becomes unauthenticated after expiration.

```js
const client = weaviate.client({
  scheme: "http",
  host: "weaviate-host",
  authClientSecret: new weaviate.AuthUserPasswordCredentials({
    username: "user123",
    password: "password"
    scopes: ["scope1", "scope2"]  // optional, depends on the configuration of your identity provider
  })
});
```

### Client Credentials flow

Authenticates users using a client secret which is granted by the authentication server. This authentication flow is typically regarded as more secure than the resource owner password flow:  a compromised client secret can be simply revoked, whereas a compromised password may have larger implications beyond the scope of breached authentication.

```js
const client = weaviate.client({
  scheme: "http",
  host: "weaviate-host",
  authClientSecret: new weaviate.AuthClientCredentials({
    clientSecret: "supersecuresecret",
    scopes: ["scope1", "scope2"]  // optional, depends on the configuration of your identity provider
  })
});
```

### Refresh Token flow

Any other authentication method can be used to obtain tokens directly from your identity provider, for example by using this step-by-step guide of the [hybrid flow](../configuration/authentication.md).

If no `refresh token` is provided, there is no possibility to obtain a new `access token` and the client becomes unauthenticated after expiration.

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

You can pass custom headers to the client, which are added to the initialization of the client in your JavaScript script: 

```js
const client = weaviate.client({
    scheme: 'http',
    host: 'weaviate-host',
    headers: {headerName: 'HeaderValue'}
  });
```

These headers will then be included in every request that the client makes.

## References

All [RESTful endpoints](../api/rest/index.md) and [GraphQL functions](../api/graphql/index.md) references covered by the JS client, and explained on those reference pages in the code blocks.

## Design

### Builder pattern

The JavaScript client is designed with a 'Builder pattern'. A pattern is used to build complex query objects. This means that a function (for example to retrieve data from Weaviate with a request similar to a RESTful GET request, or a more complex GraphQL query) is built with single objects to reduce complexity. Some builder objects are optional, others are required to perform specific functions. All is documented on the [RESTful API reference pages](../api/rest/index.md) and the [GraphQL reference pages](../api/graphql/index.md).

The code snippet above shows a simple query similar to `RESTful GET /v1/schema`. The client is initiated with requiring the package and connecting to the running instance. Then, a query is constructed with getting the `.schema` with `.getter()`. The query will be sent with the `.do()` function, this object is thus required for every function you want to build and execute. 

### General notes
- All methods use ES6 Promises to deal with asynchronous code. So you need to use `.then()` at the end of the function, or have async/await support.  
- In the case of an error, the Promise rejects with the specific error message. (If using async/await a rejected promises acts like a thrown exception).
- Internally the client uses isomorphic-fetch to do the REST calls, so the client should work from both the browser as well as NodeJS backend applications without any required changes.

## Change logs

Check the [change logs on GitHub](https://github.com/weaviate/weaviate-javascript-client/releases) for updates on the latest `JavaScript client` changes.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
