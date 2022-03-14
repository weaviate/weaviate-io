---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries & CLI
title: JavaScript
intro: A JavaScript client library for Weaviate.
description: JavaScript client library for Weaviate
tags: ['JavaScript', 'client library']
menu-order: 2
open-graph-type: article
og: /img/og/og-documentation/client-libraries-javascript.jpg
toc: true
redirect_from:
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

## v2.4.0
- Added support of the `spellcheck` module

## v2.3.0

- Added `img2vec-neural` module (Weaviate v1.4.0) support.

## v2.2.0

- Added `QnA-transformers` module support.

## v2.1.0

This release adds `nearObject` using `withNearObject()` in GraphQL `"Get"` and `"Explore"`.

## v2.0.0

This change contains breaking changes over previous version as it is aligned with the new API of Weaviate `v1`. Use the client version `v2.0.0` and up for Weaviate instances running `v1.0.0` and up. Use client version `v1.1.x` for Weaviate version `0.23.y`.
Changes (and migration guide):
* **`.withKind()` removed**

  Due to the removal of semantic Kinds ("things/actions") in Weaviate, the `.withKind()` method is removed on all builders

* **`.withSchema()` -> `.withProperties()`**

  Due to the renaming of `object.schema` to `object.properties` in Weaviate, all `.withSchema({"foo": "bar"})` methods were renamed to `.withProperties({"foo": "bar"})`

* **`.withInterpretation()` => `.withAdditional('interpretation')` on Getter/GetterById**

  This change reflects two changes in Weaviate: First up, "Underscore Properties" are now called "Additional Properties", furthermore the presence of such properties may depend on modules and is thus now dynamic. As such, the desired additional property is now passed in as a string. 

  Note: There is one exception: `.withVector()` can still be used, as the field `vector` has been "upgraded" from an underscore/additional property to a regular property

* **`.withExplore()` -> `.withNearText()`**

  Following the renaming of `explore` to `nearText` in Weaviate the builder method was renamed accordingly. Additionally, the new method `.withNearVector({vector: [...]})` was introduced to allow for `nearVector` searches. 

  Note: GraphQL `Explore { }` queries in Weaviate v1 were changed to no longer be specific to text searches. As a result the client builder methods `.withConcepts()`, `.withMoveTo()` and `.withMoveAwayFrom()` were replaced with `.withNearText({concepts: [...], ...})`. Similarly to GraphQL `Get { }`, the new method `.withNearVector({vector: [...]})`

* **`.withK(3)` -> `.withSettings({k: 3})` in classification builder**

  To reflect the API changes in the classification builder the kNN-specific method `.withK()`, was replaced with a more generic `.withSettings({})` which takes any classification type-specific settings, such as `{k: 3}` for kNN or `{tfidfCutoffPercentile: 80}` for `text2vec-contextual`


# More Resources

{% include docs-support-links.html %}