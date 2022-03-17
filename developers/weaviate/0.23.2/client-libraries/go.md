---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries & CLI
title: Go
intro: A Go client library for Weaviate.
description: Go client library for Weaviate
tags: ['go', 'client library']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Installation and setup
To get the latest stable version of the Go client library, run the following:

```bash
go get github.com/semi-technologies/weaviate-go-client@v1.1.0
```

This API client is compatible with Go 1.13.

You can use the client in your Go scripts as follows:

``` go
package main

import (
	"context"
	"fmt"
	"github.com/semi-technologies/weaviate-go-client/weaviate"
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

The code snippet above shows a simple query similar to `RESTful GET /v1/schema`. The client is initiated with requiring the package and connecting to the running instance. Then, a query is constructed with getting the `.Schema` with `.Getter()`. The query will be sent with the `.Go()` function, this object is thus required for every function you want to build and execute. 


# More Resources

{% include docs-support-links.html %}