---
title: Go
sidebar_position: 70
image: og/docs/client-libraries.jpg
# tags: ['go', 'client library']
---

:::note Go client version
The current Go client version is `v||site.go_client_version||`.
:::

The Weaviate Go client is compatible with Go 1.16+.

## Installation
The client doesn't support the old Go modules system. Create a repository for your code before you import the Weaviate client.

Create a repository:

```bash
go mod init github.com/weaviate-go-client
go mod tidy
```

To get the latest stable version of the Go client library, run the following:

```bash
go get github.com/weaviate/weaviate-go-client/v4
```

## Example

This example establishes a connection to your Weaviate instance and retrieves the schema.:

``` go
package main

import (
	"context"
	"fmt"
	"github.com/weaviate/weaviate-go-client/v4/weaviate"
)

func GetSchema() {
    cfg := weaviate.Config{
        Host:   "localhost:8080",
		  Scheme: "http",
    }
    client, err := weaviate.NewClient(cfg)
    if err != nil {
        panic(err)
    }

    schema, err := client.Schema().Getter().Do(context.Background())
    if err != nil {
        panic(err)
    }
    fmt.Printf("%v", schema)
}

func main() {
   GetSchema()
}
```

## Authentication

import ClientAuthIntro from '/developers/weaviate/client-libraries/_components/client.auth.introduction.mdx'

<ClientAuthIntro clientName="Go"/>

### WCD authentication

import ClientAuthWCD from '/developers/weaviate/client-libraries/_components/client.auth.wcs.mdx'

<ClientAuthWCD />

### API key authentication

:::info Added in Weaviate Go client version `4.7.0`.
:::

import ClientAuthApiKey from '/developers/weaviate/client-libraries/_components/client.auth.api.key.mdx'

<ClientAuthApiKey />


```go
cfg := weaviate.Config{
	Host:       "weaviate.example.com",
	Scheme:     "http",
	AuthConfig: auth.ApiKey{Value: "my-secret-key"},
	Headers:    nil,
}
client, err := weaviate.NewClient(cfg)
if err != nil{
  fmt.Println(err)
}
```

### OIDC authentication

import ClientAuthOIDCIntro from '/developers/weaviate/client-libraries/_components/client.auth.oidc.introduction.mdx'

<ClientAuthOIDCIntro />

#### <i class="fa-solid fa-key"></i> Resource Owner Password Flow

import ClientAuthFlowResourceOwnerPassword from '/developers/weaviate/client-libraries/_components/client.auth.flow.resource.owner.password.mdx'

<ClientAuthFlowResourceOwnerPassword />

```go
cfg := weaviate.Config{
	Host:   "weaviate.example.com",
	Scheme: "http",
	AuthConfig: auth.ResourceOwnerPasswordFlow{
		Username: "Your user",
		Password: "Your password",
		Scopes:   []string{"offline_access"}, // optional, depends on the configuration of your identity provider (not required with WCD)
	},
	Headers: nil,
}
client, err := weaviate.NewClient(cfg)
if err != nil{
	fmt.Println(err)
}
```

#### <i class="fa-solid fa-key"></i> Client Credentials flow

import ClientAuthFlowClientCredentials from '/developers/weaviate/client-libraries/_components/client.auth.flow.client.credentials.mdx'

<ClientAuthFlowClientCredentials />

```go
cfg := weaviate.Config{
	Host:   "weaviate.example.com",
	Scheme: "http",
	AuthConfig: auth.ClientCredentials{
		ClientSecret: "your_client_secret",
		Scopes:       []string{"scope1 scope2"}, // optional, depends on the configuration of your identity provider (not required with WCD)
	},
	Headers: nil,
}
client, err := weaviate.NewClient(cfg)
if err != nil{
	fmt.Println(err)
}
```

#### <i class="fa-solid fa-key"></i> Refresh Token flow

import ClientAuthBearerToken from '/developers/weaviate/client-libraries/_components/client.auth.bearer.token.mdx'

<ClientAuthBearerToken />

```go
cfg := weaviate.Config{
	Host:   "weaviate.example.com",
	Scheme: "http",
	AuthConfig: auth.BearerToken{
		AccessToken:  "some token",
		RefreshToken: "other token",
		ExpiresIn:    uint(500), // in seconds
	},
	Headers: nil,
}
client, err := weaviate.NewClient(cfg)
if err != nil{
	fmt.Println(err)
}
```

## Custom headers

You can pass custom headers to the client, which are added at initialization:

```go
cfg := weaviate.Config{
  Host:"weaviate.example.com",
  Scheme: "http",
  AuthConfig: nil,
  Headers: map[string]string{
    "header_key1": "value",
    "header_key2": "otherValue",
    },
}
client, err := weaviate.NewClient(cfg)
if err != nil{
  fmt.Println(err)
}
```

## References

All [RESTful endpoints](/developers/weaviate/api/rest) and [GraphQL functions](../api/graphql/index.md) references covered by the Go client, and explained on those reference pages in the code blocks.

## Design

### Builder pattern

The Go client functions are designed with a 'Builder pattern'. A pattern is used to build complex query objects. This means that a function (for example to retrieve data from Weaviate with a request similar to a RESTful GET request, or a more complex GraphQL query) is built with single objects to reduce complexity. Some builder objects are optional, others are required to perform specific functions. All is documented on the [RESTful API reference pages](/developers/weaviate/api/rest) and the [GraphQL reference pages](../api/graphql/index.md).

The code snippet above shows a simple query similar to `RESTful GET /v1/schema`. The client is initiated by requiring the package and connecting to the running instance. Then, a query is constructed by getting the `.Schema` with `.Getter()`. The query will be sent with the `.Go()` function, this object is thus required for every function you want to build and execute.

## Migration Guides

### From `v2` to `v4`

#### Unnecessary `.Objects()` removed from `GraphQL.Get()`

Before:

```go
client.GraphQL().Get().Objects().WithClassName...
```

After:

```go
client.GraphQL().Get().WithClassName
```

#### GraphQL `Get().WithNearVector()` uses a builder pattern

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


#### All `where` filters use the same builder

In `v2` filters were sometimes specified as strings, sometimes in a structured way. `v4` unifies this and makes sure that you can always use the same builder pattern.

##### GraphQL Get

Before:

```go
// using filter encoded as string
where := `where :{
  operator: Equal
  path: ["id"]
  valueText: "5b6a08ba-1d46-43aa-89cc-8b070790c6f2"
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

##### GraphQL Aggregate

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

##### Classification

Before:

```go
valueInt := 100
valueText  := "Government"

sourceWhere := &models.WhereFilter{
  ValueInt: &valueInt,
  Operator: string(graphql.GreaterThan),
  Path:     []string{"wordCount"},
}

targetWhere := &models.WhereFilter{
  ValueString: &valueText,
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

#### GraphQL `Get().WithFields()`

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

#### Graphql `Get().WithGroup()`

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

#### Graphql `Data().Validator()` property renamed

In `v2` the naming of the method to specify the Schema was inconsistent with other places in the client. This has been fixed in `v4`. Rename according to the following:

Before:
```go
client.Data().Validator().WithSchema(properties)
```

After:
```go
client.Data().Validator().WithProperties(properties)
```

## Client releases

import MatrixIntro from '/_includes/clients/matrix-intro.md';

<MatrixIntro />

## Change logs

Check the
[change logs on GitHub](https://github.com/weaviate/weaviate-go-client/releases)
for updates on the latest `Go client` changes.


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
