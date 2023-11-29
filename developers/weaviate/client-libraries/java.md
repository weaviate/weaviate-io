---
title: Java
sidebar_position: 50
image: og/docs/client-libraries.jpg
# tags: ['java', 'client library']
---


:::note Java client version
The current Java client version is `v||site.java_client_version||`.
:::

:::info Breaking changes introduced in v4
The `package` and `import` paths have been updated from `technology.semi.weaviate` to `io.weaviate`.

See the [Migration Guide](#from-3xx-to-400) for more info.
:::

## Installation and setup
To get the latest stable version of the Java client library, add this dependency to your project:

```xml
<dependency>
  <groupId>io.weaviate</groupId>
  <artifactId>client</artifactId>
  <version>4.0.0</version>  <!-- Check latest version -->
</dependency>
```

This API client is compatible with Java 8 and beyond.

You can use the client in your project as follows:

```java
package io.weaviate;

import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.misc.model.Meta;

public class App {
  public static void main(String[] args) {
    Config config = new Config("http", "localhost:8080");
    WeaviateClient client = new WeaviateClient(config);
    Result<Meta> meta = client.misc().metaGetter().run();
    if (meta.getError() == null) {
      System.out.printf("meta.hostname: %s\n", meta.getResult().getHostname());
      System.out.printf("meta.version: %s\n", meta.getResult().getVersion());
      System.out.printf("meta.modules: %s\n", meta.getResult().getModules());
    } else {
      System.out.printf("Error: %s\n", meta.getError().getMessages());
    }
  }
}
```

## Authentication

import ClientAuthIntro from '/developers/weaviate/client-libraries/_components/client.auth.introduction.mdx'

<ClientAuthIntro clientName="Java"/>

### WCS authentication

import ClientAuthWCS from '/developers/weaviate/client-libraries/_components/client.auth.wcs.mdx'

<ClientAuthWCS />

### API key authentication

:::info Added in Weaviate Java client version `4.0.2`.
:::

import ClientAuthApiKey from '/developers/weaviate/client-libraries/_components/client.auth.api.key.mdx'

<ClientAuthApiKey />

```java
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;

Config config = new Config("https", "some-endpoint.weaviate.network");
WeaviateClient client = WeaviateAuthClient.apiKey(config, "YOUR-WEAVIATE-API-KEY");  // Replace w/ your Weaviate instance API key
```

### OIDC authentication

import ClientAuthOIDCIntro from '/developers/weaviate/client-libraries/_components/client.auth.oidc.introduction.mdx'

<ClientAuthOIDCIntro />

#### <i class="fa-solid fa-key"></i> Resource Owner Password Flow

import ClientAuthFlowResourceOwnerPassword from '/developers/weaviate/client-libraries/_components/client.auth.flow.resource.owner.password.mdx'

<ClientAuthFlowResourceOwnerPassword />

```java
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;

Config config = new Config("http", "weaviate.example.com:8080");
WeaviateAuthClient.clientPassword(
    config,
    "Your user",
    "Your password",
    Arrays.asList("scope1", "scope2") // optional, depends on the configuration of your identity provider (not required with WCS)
);
```

#### <i class="fa-solid fa-key"></i> Client Credentials flow

import ClientAuthFlowClientCredentials from '/developers/weaviate/client-libraries/_components/client.auth.flow.client.credentials.mdx'

<ClientAuthFlowClientCredentials />

```java
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;

Config config = new Config("http", "weaviate.example.com:8080");
WeaviateAuthClient.clientCredentials(
    config,
    "your_client_secret",
    Arrays.asList("scope1" ,"scope2") // optional, depends on the configuration of your identity provider
);
```

#### <i class="fa-solid fa-key"></i> Refresh Token flow

import ClientAuthBearerToken from '/developers/weaviate/client-libraries/_components/client.auth.bearer.token.mdx'

<ClientAuthBearerToken />

```java
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateAuthClient;

Config config = new Config("http", "weaviate.example.com:8080");
WeaviateAuthClient.bearerToken(
    config,
    "Your_access_token",
    500,  // lifetime in seconds
    "Your_refresh_token",
);
```

## Custom headers

You can pass custom headers to the client, which are added at initialization:

```java
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;

public class App {
  public static void main(String[] args) {
    Map<String, String> headers = new HashMap<String, String>() { {
      put("header_key", "value");
    } };
    Config config = new Config("http", "localhost:8080", headers);
    WeaviateClient client = new WeaviateClient(config);
  }
}
```

## References

All [RESTful endpoints](../api/rest/index.md) and [GraphQL functions](../api/graphql/index.md) references covered by the Java client, and explained on those reference pages in the code blocks.

## Design

### Builder pattern

The Java client functions are designed with a 'Builder pattern'. A pattern is used to build complex query objects. This means that a function (for example to retrieve data from Weaviate with a request similar to a RESTful GET request, or a more complex GraphQL query) is built with single objects to reduce complexity. Some builder objects are optional, others are required to perform specific functions. All is documented on the [RESTful API reference pages](../api/rest/index.md) and the [GraphQL reference pages](../api/graphql/index.md).

The code snippet above shows a simple query similar to `RESTful GET /v1/meta`. The client is initiated by requiring the package and connecting to the running instance. Then, a query is constructed by using the `.metaGetter()` on `.misc()`. The query will be sent with the `.run()` function, this object is thus required for every function you want to build and execute.

## Migration Guides

### From `3.x.x` to `4.0.0`

#### Moved from `technology.semi.weaviate` to `io.weaviate` package

Before:
```java
package technology.semi.weaviate;
import technology.semi.weaviate.client.*;
```

After:
```java
package io.weaviate;
import io.weaviate.client.*;
```

### From `2.4.0` to `3.0.0`

#### Removed @Deprecated method `Aggregate::withFields(Fields fields)`

Before:
```java
// import io.weaviate.client.v1.graphql.query.fields.Field;
// import io.weaviate.client.v1.graphql.query.fields.Fields;

Fields fields = Fields.builder().fields(new Field[]{name, description}).build();
client.graphQL().aggregate().withFields(fields)...
```

After:
```java
client.graphQL().aggregate().withFields(name, description)...
```

#### Removed @Deprecated method `Get::withFields(Fields fields)`

Before:
```java
// import io.weaviate.client.v1.graphql.query.fields.Field;
// import io.weaviate.client.v1.graphql.query.fields.Fields;

Fields fields = Fields.builder().fields(new Field[]{name, description}).build();
client.graphQL().get().withFields(fields)...
```

After:
```java
client.graphQL().get().withFields(name, description)...
```

#### Removed @Deprecated method `Get::withNearVector(Float[] vector)`

Before:
```java
client.graphQL().get().withNearVector(new Float[]{ 0f, 1f, 0.8f })...
```

After:
```java
// import io.weaviate.client.v1.graphql.query.argument.NearVectorArgument;

NearVectorArgument nearVector = NearVectorArgument.builder().vector(new Float[]{ 0f, 1f, 0.8f }).certainty(0.8f).build();
client.graphQL().get().withNearVector(nearVector)...
```

#### All `where` filters use the same implementation

With `batch delete` feature, unified `filters.WhereFilter` implementation is introduced, which replaces `classifications.WhereFilter`, `graphql.query.argument.WhereArgument` and `graphql.query.argument.WhereFilter`.

##### GraphQL

Before:
```java
// import io.weaviate.client.v1.graphql.query.argument.GeoCoordinatesParameter;
// import io.weaviate.client.v1.graphql.query.argument.WhereArgument;
// import io.weaviate.client.v1.graphql.query.argument.WhereOperator;

GeoCoordinatesParameter geo = GeoCoordinatesParameter.builder()
    .latitude(50.51f)
    .longitude(0.11f)
    .maxDistance(3000f)
    .build();
WhereArgument where = WhereArgument.builder()
    .valueGeoRange(geo)
    .operator(WhereOperator.WithinGeoRange)
    .path(new String[]{ "add "})
    .build();

client.graphQL().aggregate().withWhere(where)...
```

After:
```java
// import io.weaviate.client.v1.filters.Operator;
// import io.weaviate.client.v1.filters.WhereFilter;

WhereFilter where = WhereFilter.builder()
    .valueGeoRange(WhereFilter.GeoRange.builder()
        .geoCoordinates(WhereFilter.GeoCoordinates.builder()
            .latitude(50.51f)
            .longitude(0.11f)
            .build()
        )
        .distance(WhereFilter.GeoDistance.builder()
            .max(3000f)
            .build()
        )
        .build()
    )
    .operator(Operator.WithinGeoRange)
    .path(new String[]{ "add" })
    .build();

client.graphQL().aggregate().withWhere(where)...
```

Before:
```java
// import io.weaviate.client.v1.graphql.query.argument.WhereArgument;
// import io.weaviate.client.v1.graphql.query.argument.WhereOperator;

WhereArgument where = WhereArgument.builder()
    .valueText("txt")
    .operator(WhereOperator.Equal)
    .path(new String[]{ "add" })
    .build();

client.graphQL().aggregate().withWhere(where)...
```

After:
```java
// import io.weaviate.client.v1.filters.Operator;
// import io.weaviate.client.v1.filters.WhereFilter;

WhereFilter where = WhereFilter.builder()
    .valueText("txt")
    .operator(Operator.Equal)
    .path(new String[]{ "add" })
    .build();

client.graphQL().aggregate().withWhere(where)...
```

Before:
```java
// import io.weaviate.client.v1.graphql.query.argument.WhereArgument;
// import io.weaviate.client.v1.graphql.query.argument.WhereFilter;
// import io.weaviate.client.v1.graphql.query.argument.WhereOperator;

WhereArgument where = WhereArgument.builder()
    .operands(new WhereFilter[]{
        WhereFilter.builder()
            .valueInt(10)
            .path(new String[]{ "wordCount" })
            .operator(WhereOperator.LessThanEqual)
            .build(),
        WhereFilter.builder()
            .valueText("word")
            .path(new String[]{ "word" })
            .operator(WhereOperator.LessThan)
            .build()
    })
    .operator(WhereOperator.And)
    .build();

client.graphQL().aggregate().withWhere(where)...
```

After:
```java
// import io.weaviate.client.v1.filters.Operator;
// import io.weaviate.client.v1.filters.WhereFilter;

WhereFilter where = WhereFilter.builder()
    .operands(new WhereFilter[]{
        WhereFilter.builder()
            .valueInt(10)
            .path(new String[]{ "wordCount" })
            .operator(Operator.LessThanEqual)
            .build(),
        WhereFilter.builder()
            .valueText("word")
            .path(new String[]{ "word" })
            .operator(Operator.LessThan)
            .build(),
    })
    .operator(Operator.And)
    .build();

client.graphQL().aggregate().withWhere(where)...
```

##### Classification

Before:
```java
// import io.weaviate.client.v1.classifications.model.GeoCoordinates;
// import io.weaviate.client.v1.classifications.model.Operator;
// import io.weaviate.client.v1.classifications.model.WhereFilter;
// import io.weaviate.client.v1.classifications.model.WhereFilterGeoRange;
// import io.weaviate.client.v1.classifications.model.WhereFilterGeoRangeDistance;

WhereFilter where = WhereFilter.builder()
    .valueGeoRange(WhereFilterGeoRange.builder()
        .geoCoordinates(GeoCoordinates.builder()
            .latitude(50.51f)
            .longitude(0.11f)
            .build())
        .distance(WhereFilterGeoRangeDistance.builder()
            .max(3000d)
            .build())
        .build())
    .operator(Operator.WithinGeoRange)
    .path(new String[]{ "geo" })
    .build();

client.classifications().scheduler().withTrainingSetWhereFilter(where)...
```

After:
```java
// import io.weaviate.client.v1.filters.Operator;
// import io.weaviate.client.v1.filters.WhereFilter;

WhereFilter where = WhereFilter.builder()
    .valueGeoRange(WhereFilter.GeoRange.builder()
        .geoCoordinates(WhereFilter.GeoCoordinates.builder()
            .latitude(50.51f)
            .longitude(0.11f)
            .build())
        .distance(WhereFilter.GeoDistance.builder()
            .max(3000f)
            .build())
        .build())
    .operator(Operator.WithinGeoRange)
    .path(new String[]{ "geo" })
    .build();

client.classifications().scheduler().withTrainingSetWhereFilter(where)...
```

## Client releases

import MatrixIntro from '/_includes/clients/matrix-intro.md';

<MatrixIntro />

## Change logs

Check the
[change logs on GitHub](https://github.com/weaviate/weaviate-java-client/releases)
for updates on the latest `Java client` changes.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
