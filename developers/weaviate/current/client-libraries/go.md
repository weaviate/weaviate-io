---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries
title: Go
intro: A Go client library for Weaviate.
description: Go client library for Weaviate
tags: ['go', 'client library']
menu-order: 4
open-graph-type: article
toc: true
redirect_from:
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

## v4.2.0
- Added support for class namespaced API calls
- Added support for `distance` user-facing similarity metric

## v4.1.0
- Fix for `nearText` `moveTo` and `moveAwayFrom` parameters
- Fix for `where` filter operands

## v4.0.0
- (Breaking) Remove `.Objects()` from GraphQL `Get()`. See migration guide above for details
- (Breaking) GraphQL `Aggregate`, `Explore`, and `Get`: `.WithFields()` is now a variadic function, see migration guide above
- (Breaking) `client.Data().Validator().WithSchema(properties)` -> `client.Data().Validator().WithProperties(properties)`
- (Breaking) GraphQL `Get`: `WithNearVector(nearVector string)` -> `WithNearVector(nearVector *NearVectorArgumentBuilder)`. See migration guide above for details
- (Breaking) `Where` filter: `WithWhere(filter string)` -> `WithWhere(filter *filters.WhereBuilder)` See migration guide above

- (Addition) Aggregate support for: `nearObject`, `nearVector`, `nearText`, `ask`, `nearImage`, `where`, `objectLimit`, `limit`
- (Addition) Explore support for: `nearObject`, `nearVector`, `nearText`, `ask`, `nearImage`, `limit`, `offset`
- (Addition) Support for sort in Get GraphQL
- (Addition) Support for indexTimestamps
- (Addition) Batch Delete API support

## v3.0.0 
- Add builders for `where` / `group` / `fields` 
- Support setting stopwords in schema config
- Retrieve and update shard status

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
