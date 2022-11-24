---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries
title: JavaScript
intro: A JavaScript client library for Weaviate.
description: JavaScript client library for Weaviate
tags: ['JavaScript', 'client library']
sidebar_position: 2
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.2.1/client-libraries/javascript.html
    - /documentation/weaviate/current/client-libs/javascript.html
---

# Installation and setup

The JavaScript client library package can be easily installed using [npm](https://www.npmjs.com/).

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

You can pass authentication credentials in a header to the client, which is added to the initialization of the client in your JavaScript script: 

```js
const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
    headers: {authorization: 'Bearer <put your token here>'}
  });
```

# References

All [RESTful endpoints](../restful-api-references/index.html) and [GraphQL functions](../graphql-references/index.html) references covered by the JS client, and explained on those reference pages in the code blocks.

# Design

## Builder pattern

The JavaScript client is designed with a 'Builder pattern'. A pattern is used to build complex query objects. This means that a function (for example to retrieve data from Weaviate with a request similar to a RESTful GET request, or a more complex GraphQL query) is built with single objects to reduce complexity. Some builder objects are optional, others are required to perform specific functions. All is documented on the [RESTful API reference pages](../restful-api-references/index.html) and the [GraphQL reference pages](../graphql-references/index.html).

The code snippet above shows a simple query similar to `RESTful GET /v1/schema`. The client is initiated with requiring the package and connecting to the running instance. Then, a query is constructed with getting the `.schema` with `.getter()`. The query will be sent with the `.do()` function, this object is thus required for every function you want to build and execute. 

## General notes
- All methods use ES6 Promises to deal with asynchronous code. So you need to use `.then()` at the end of the function, or have async/await support.  
- In the case of an error, the Promise rejects with the specific error message. (If using async/await a rejected promises acts like a thrown exception).
- Internally the client uses isomorphic-fetch to do the REST calls, so the client should work from both the browser as well as NodeJS backend applications without any required changes.

# Change logs

Check the [change logs on GitHub](https://github.com/semi-technologies/weaviate-javascript-client/releases) for updates on the latest `JavaScript client` changes.

# More Resources

{% include docs-support-links.html %}
