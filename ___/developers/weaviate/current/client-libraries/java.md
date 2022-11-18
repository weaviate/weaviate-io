---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries
title: Java
intro: A Java client library for Weaviate.
description: Java client library for Weaviate
tags: ['java', 'client library']
sidebar_position: 3
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.11.0/client-libraries/java.html
---

# Installation and setup
To get the latest stable version of the Java client library, add this dependency to your project:

```xml
<dependency>
  <groupId>technology.semi.weaviate</groupId>
  <artifactId>client</artifactId>
  <version>3.2.0</version>
</dependency>
```

This API client is compatible with Java 8 and beyond.

You can use the client in your project as follows:

```clike
import technology.semi.weaviate.client.Config;
import technology.semi.weaviate.client.WeaviateClient;
import technology.semi.weaviate.client.base.Result;
import technology.semi.weaviate.client.v1.misc.model.Meta;

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

You can pass authentication credentials in a header to the client, which is added to the initialization of the client in your Java project:

```clike
import technology.semi.weaviate.client.Config;
import technology.semi.weaviate.client.WeaviateClient;
import technology.semi.weaviate.client.base.Result;
import technology.semi.weaviate.client.v1.misc.model.Meta;

public class App {
  public static void main(String[] args) {
    Map<String, String> headers = new HashMap<String, String>() { {
      put("Authorization", "Bearer <put your token here>");
    } };
    Config config = new Config("http", "localhost:8080", headers);
    WeaviateClient client = new WeaviateClient(config);
    Result<Meta> meta = client.misc().metaGetter().run();    
  }
}
```

# References

All [RESTful endpoints](../restful-api-references/index.html) and [GraphQL functions](../graphql-references/index.html) references covered by the Java client, and explained on those reference pages in the code blocks.

# Design

## Builder pattern

The Java client functions are designed with a 'Builder pattern'. A pattern is used to build complex query objects. This means that a function (for example to retrieve data from Weaviate with a request similar to a RESTful GET request, or a more complex GraphQL query) is built with single objects to reduce complexity. Some builder objects are optional, others are required to perform specific functions. All is documented on the [RESTful API reference pages](../restful-api-references/index.html) and the [GraphQL reference pages](../graphql-references/index.html).

The code snippet above shows a simple query similar to `RESTful GET /v1/meta`. The client is initiated by requiring the package and connecting to the running instance. Then, a query is constructed by using the `.metaGetter()` on `.misc()`. The query will be sent with the `.run()` function, this object is thus required for every function you want to build and execute. 

# Migration Guides

## From `2.4.0` to `3.0.0`

### Removed @Deprecated method `Aggregate::withFields(Fields fields)`

Before:
```java
// import technology.semi.weaviate.client.v1.graphql.query.fields.Field;
// import technology.semi.weaviate.client.v1.graphql.query.fields.Fields;

Fields fields = Fields.builder().fields(new Field[]{name, description}).build();
client.graphQL().aggregate().withFields(fields)...
```

After:
```java
client.graphQL().aggregate().withFields(name, description)...
```

### Removed @Deprecated method `Get::withFields(Fields fields)`

Before:
```java
// import technology.semi.weaviate.client.v1.graphql.query.fields.Field;
// import technology.semi.weaviate.client.v1.graphql.query.fields.Fields;

Fields fields = Fields.builder().fields(new Field[]{name, description}).build();
client.graphQL().get().withFields(fields)...
```

After:
```java
client.graphQL().get().withFields(name, description)...
```

### Removed @Deprecated method `Get::withNearVector(Float[] vector)`

Before:
```java
client.graphQL().get().withNearVector(new Float[]{ 0f, 1f, 0.8f })...
```

After:
```java
// import technology.semi.weaviate.client.v1.graphql.query.argument.NearVectorArgument;

NearVectorArgument nearVector = NearVectorArgument.builder().vector(new Float[]{ 0f, 1f, 0.8f }).certainty(0.8f).build();
client.graphQL().get().withNearVector(nearVector)...
```

### All `where` filters use the same implementation

With `batch delete` feature, unified `filters.WhereFilter` implementation is introduced, which replaces `classifications.WhereFilter`, `graphql.query.argument.WhereArgument` and `graphql.query.argument.WhereFilter`.

#### GraphQL

Before:
```java
// import technology.semi.weaviate.client.v1.graphql.query.argument.GeoCoordinatesParameter;
// import technology.semi.weaviate.client.v1.graphql.query.argument.WhereArgument;
// import technology.semi.weaviate.client.v1.graphql.query.argument.WhereOperator;

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
// import technology.semi.weaviate.client.v1.filters.Operator;
// import technology.semi.weaviate.client.v1.filters.WhereFilter;

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
// import technology.semi.weaviate.client.v1.graphql.query.argument.WhereArgument;
// import technology.semi.weaviate.client.v1.graphql.query.argument.WhereOperator;

WhereArgument where = WhereArgument.builder()
    .valueString("txt")
    .operator(WhereOperator.Equal)
    .path(new String[]{ "add" })
    .build();

client.graphQL().aggregate().withWhere(where)...
```

After:
```java
// import technology.semi.weaviate.client.v1.filters.Operator;
// import technology.semi.weaviate.client.v1.filters.WhereFilter;

WhereFilter where = WhereFilter.builder()
    .valueString("txt")
    .operator(Operator.Equal)
    .path(new String[]{ "add" })
    .build();

client.graphQL().aggregate().withWhere(where)...
```

Before:
```java
// import technology.semi.weaviate.client.v1.graphql.query.argument.WhereArgument;
// import technology.semi.weaviate.client.v1.graphql.query.argument.WhereFilter;
// import technology.semi.weaviate.client.v1.graphql.query.argument.WhereOperator;

WhereArgument where = WhereArgument.builder()
    .operands(new WhereFilter[]{
        WhereFilter.builder()
            .valueInt(10)
            .path(new String[]{ "wordCount" })
            .operator(WhereOperator.LessThanEqual)
            .build(),
        WhereFilter.builder()
            .valueString("word")
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
// import technology.semi.weaviate.client.v1.filters.Operator;
// import technology.semi.weaviate.client.v1.filters.WhereFilter;

WhereFilter where = WhereFilter.builder()
    .operands(new WhereFilter[]{
        WhereFilter.builder()
            .valueInt(10)
            .path(new String[]{ "wordCount" })
            .operator(Operator.LessThanEqual)
            .build(),
        WhereFilter.builder()
            .valueString("word")
            .path(new String[]{ "word" })
            .operator(Operator.LessThan)
            .build(),
    })
    .operator(Operator.And)
    .build();

client.graphQL().aggregate().withWhere(where)...
```

#### Classification

Before:
```java
// import technology.semi.weaviate.client.v1.classifications.model.GeoCoordinates;
// import technology.semi.weaviate.client.v1.classifications.model.Operator;
// import technology.semi.weaviate.client.v1.classifications.model.WhereFilter;
// import technology.semi.weaviate.client.v1.classifications.model.WhereFilterGeoRange;
// import technology.semi.weaviate.client.v1.classifications.model.WhereFilterGeoRangeDistance;

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
// import technology.semi.weaviate.client.v1.filters.Operator;
// import technology.semi.weaviate.client.v1.filters.WhereFilter;

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


# Change logs


Check the [change logs on GitHub](https://github.com/semi-technologies/weaviate-java-client/releases) for updates on the latest `Java client` changes.

# More Resources

{% include docs-support-links.html %}
