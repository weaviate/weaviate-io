---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries
title: Go
intro: A Go client library for Weaviate.
description: Go client library for Weaviate
tags: ['go', 'client library']
sidebar_position: 4
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.1.0/client-libraries/go.html
    - /documentation/weaviate/current/client-libs/go.html
    - /documentation/weaviate/current/client-libraries/go.html
---

# Installation and setup
To get the latest stable version of the Go client library, run the following:

```bash
go get github.com/semi-technologies/weaviate-go-client/v4
```

This API client is compatible with Go 1.16+.

You can use the client in your Go scripts as follows:

``` go
package main

import (
	"context"
	"fmt"
	"github.com/semi-technologies/weaviate-go-client/v4/weaviate"
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

# Migration Guides

## From `v2` to `v4`

### Unnecessary `.Objects()` removed from `GraphQL.Get()`

Before:

```go
client.GraphQL().Get().Objects().WithClassName...
```

After:

```go
client.GraphQL().Get().WithClassName
```

### GraphQL `Get().WithNearVector()` uses a builder pattern

In `v2` specifying a `nearVector` argument to `client.GraphQL().Get()` required passing a string. As a result the user had to know the structure of the GraphQL API. `v4` fixes this by using a builder pattern like so:

Before:

```go
client.GraphQL().Get().
  WithNearVector("{vector: [0.1, -0.2, 0.3]}")...
```

After

```go
nearVector := client.GraphQL().NearVectorArgBuilder().
  WithVector([]float32{0.1, -0.2, 0.3})

client.GraphQL().Get().
  WithNearVector(nearVector)...
```


### All `where` filters use the same builder

In `v2` filters were sometimes specified as strings, sometimes in a structured way. `v4` unifies this and makes sure that you can always use the same builder pattern.

#### GraphQL Get

Before:

```go
// using filter encoded as string
where := `where :{
  operator: Equal
  path: ["id"]
  valueString: "5b6a08ba-1d46-43aa-89cc-8b070790c6f2"
}`

client.GraphQL().Get().
  Objects().
  WithWhere(where)...
```

```go
// using deprecated graphql arg builder
where := client.GraphQL().WhereArgBuilder().
  WithOperator(graphql.Equal).
  WithPath([]string{"id"}).
  WithValueString("5b6a08ba-1d46-43aa-89cc-8b070790c6f2")

client.GraphQL().Get().
  Objects().
  WithWhere(where)...
```

After:

```go
where := filters.Where().
  WithPath([]string{"id"}).
  WithOperator(filters.Equal).
  WithValueString("5b6a08ba-1d46-43aa-89cc-8b070790c6f2")

client.GraphQL().Get().
  WithWhere(where)...
```

#### GraphQL Aggregate

Before:

```go
where := client.GraphQL().WhereArgBuilder().
  WithPath([]string{"id"}).
  WithOperator(graphql.Equal).
  WithValueString("5b6a08ba-1d46-43aa-89cc-8b070790c6f2")

client.GraphQL().Aggregate().
  Objects().
  WithWhere(where)...
```

After:

```go
where := filters.Where().
  WithPath([]string{"id"}).
  WithOperator(filters.Equal).
  WithValueString("5b6a08ba-1d46-43aa-89cc-8b070790c6f2")

client.GraphQL().Aggregate().
  WithWhere(where)...
```

#### Classification

Before:

```go
valueInt := 100
valueString  := "Government"

sourceWhere := &models.WhereFilter{
  ValueInt: &valueInt,
  Operator: string(graphql.GreaterThan),
  Path:     []string{"wordCount"},
}

targetWhere := &models.WhereFilter{
  ValueString: &valueString,
  Operator:    string(graphql.NotEqual),
  Path:        []string{"name"},
}

client.Classifications().Scheduler().
  WithSourceWhereFilter(sourceWhere).
  WithTargetWhereFilter(targetWhere)...
```

After:

```go
sourceWhere := filters.Where().
  WithOperator(filters.GreaterThan).
  WithPath([]string{"wordCount"}).
  WithValueInt(100)

targetWhere := filters.Where().
  WithOperator(filters.NotEqual).
  WithPath([]string{"name"}).
  WithValueString("Government")

client.Classifications().Scheduler().
  WithSourceWhereFilter(sourceWhere).
  WithTargetWhereFilter(targetWhere)...
```

### GraphQL `Get().WithFields()`

In `v2` `.WithFields()` took a GraphQL string that required knowledge of how GraphQL fields are structured. Now this can be done with a variadic function. E.g:

Before:

```go
client.GraphQL.Get().WithClassName("MyClass").WithFields("name price age")...
```

After:

```go
client.GraphQL.Get().WithClassName("MyClass").
  WithFields(graphql.Field{Name: "name"},graphql.Field{Name: "price"}, graphql.Field{Name: "age"})...
```

### Graphql `Get().WithGroup()`

In `v2` `.WithFields()` took a GraphQL string that required knowledge of how GraphQL fields are structured. Now this can be done with a builder. E.g:

Before:

```go
client.GraphQL.Get().WithClassName("MyClass")
  .WithGroup("{type:merge force:1.0}")
```

After:

```go
group := client.GraphQL().GroupArgBuilder()
  .WithType(graphql.Merge).WithForce(1.0)

client.GraphQL.Get().WithClassName("MyClass").WithGroup(group)
```

### Graphql `Data().Validator()` property renamed

In `v2` the naming of the method to specify the Schema was inconsistent with other places in the client. This has been fixed in `v4`. Rename according to the following:

Before:
```go
client.Data().Validator().WithSchema(properties)
```

After:
```go
client.Data().Validator().WithProperties(properties)
```


# Change logs

Check the [change logs on GitHub](https://github.com/semi-technologies/weaviate-go-client/releases) for updates on the latest `Go client` changes.

# More Resources

{% include docs-support-links.html %}
