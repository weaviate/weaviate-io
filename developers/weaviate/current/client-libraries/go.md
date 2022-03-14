---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries & CLI
title: Go
intro: A Go client library for Weaviate.
description: Go client library for Weaviate
tags: ['go', 'client library']
menu-order: 3
open-graph-type: article
og: /img/og/og-documentation/client-libraries-go.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/client-libs/go.html
    - /documentation/weaviate/current/client-libraries/go.html
---

# Installation and setup
To get the latest stable version of the Go client library, run the following:

```bash
go get github.com/semi-technologies/weaviate-go-client/v2
```

This API client is compatible with Go 1.13.

You can use the client in your Go scripts as follows:

``` go
package main

import (
	"context"
	"fmt"
	"github.com/semi-technologies/weaviate-go-client/v2/weaviate"
)

func GetSchema() {
    cfg := weaviate.Config{
        Host:   "localhost:8080",
		Scheme: "http",
    }
    client := weaviate.New(cfg)

    schema, err := client.Schema().Getter().Do(context.Background())
    if err != nil {
        panic(err)
    }
    fmt.Printf("%v", schema)
}
```

## Authentication

Authentication can be added to the configuration of the client as follows:

```go
token := &oauth2.Token{
    AccessToken:  "<token>",
    TokenType:   "Bearer",
}
cfg := weaviate.Config{
    Host:   "weaviate.example.com",
    Scheme: "https",
    ConnectionClient: oauth2.NewClient(context.Background(), oauth2.StaticTokenSource(token)),
}
client := weaviate.New(cfg)
```

# References

All [RESTful endpoints](../restful-api-references/index.html) and [GraphQL functions](../graphql-references/index.html) references covered by the Go client, and explained on those reference pages in the code blocks.

# Design

## Builder pattern

The Go client functions are designed with a 'Builder pattern'. A pattern is used to build complex query objects. This means that a function (for example to retrieve data from Weaviate with a request similar to a RESTful GET request, or a more complex GraphQL query) is built with single objects to reduce complexity. Some builder objects are optional, others are required to perform specific functions. All is documented on the [RESTful API reference pages](../restful-api-references/index.html) and the [GraphQL reference pages](../graphql-references/index.html).

The code snippet above shows a simple query similar to `RESTful GET /v1/schema`. The client is initiated by requiring the package and connecting to the running instance. Then, a query is constructed by getting the `.Schema` with `.Getter()`. The query will be sent with the `.Go()` function, this object is thus required for every function you want to build and execute. 

# Change logs

## v2.3.0
- Added support of the `spellcheck` module.

## v2.2.0

- The new version is compatible with Weaviate `v1.4.0` (supports the new `img2vec-neural` module).

## v2.1.x

- Added `QnA-transformers` module support.

## v2.0.x

This change contains breaking changes over previous version as it is aligned with the new API of Weaviate `v1`. Use the client version `v2.0.0` and up for Weaviate instances running `v1.0.0` and up. Use client version `v1.1.x` for Weaviate version `0.23.y`.
Changes (and migration guide):

* **`.WithKind()` removed**

  Due to the removal of semantic Kinds ("things/actions") in Weaviate, the `.WithKind()` method is removed on all builders

* **`.WithSchema()` -> `.WithProperties()`**
  
  Due to the renaming of `Object.Schema` to `Object.Properties` in Weaviate, all `.WithSchema(propertySchema)` methods were renamed to `.WithProperties(propertySchema)`

* **`.WithAdditionalInterpretation()` => `.WithAdditional("interpretation")` on ObjectsGetter**
  
  This change reflects two changes in Weaviate: First up, "Underscore Properties" are now called "Additional Properties", furthermore the presence of such properties may depend on modules and is thus now dynamic. As such, the desired additional property is now passed in as a string.
  
  Note: There is one exception: `.WithVector()` can still be used, as the field `vector` has been "upgraded" from an underscore/additional property to a regular property

* **`.WithExplore()` -> `.WithNearText()`**
  
  Following the renaming of `explore` to `nearText` in Weaviate the builder method was renamed accordingly. Additionally, the new method `.WithNearVector("{vector: [...]}")` was introduced to allow for nearVector searches.

* **`.WithK(3)` -> `.WithSettings(&classification.ParamsKNN{K: &k})`** in classification builder
  
  To reflect the API changes in the classification builder the kNN-specific method `.WithK()`, was replaced with a more generic `.WithSettings(interface{})` which takes any classification type-specific settings, such as `&classification.ParamsKNN{K: &k}` for kNN or `&classification.ParamsContextual{TfidfCutoffPercentile: &value}` for text2vec-contextual.

# More Resources

{% include docs-support-links.html %}
