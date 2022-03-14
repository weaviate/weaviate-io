---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries & CLI
title: Java
intro: A Java client library for Weaviate.
description: Java client library for Weaviate
tags: ['java', 'client library']
menu-order: 4
open-graph-type: article
og: /img/og/og-documentation/client-libraries--cli-java.jpg
toc: true
---

# Installation and setup
To get the latest stable version of the Java client library, add this dependency to your project:

```xml
<dependency>
  <groupId>technology.semi.weaviate</groupId>
  <artifactId>client</artifactId>
  <version>1.2.1</version>
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
    if (meta.getError() != null) {
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

# Change logs

## 1.1.2
- Added support of the `spellcheck` module.

## 1.1.1

- The new version is compatible with Weaviate `v1.6.0` (by supporting the new `ZeroShot` classification).

## 1.1.0

- The new version is compatible with Weaviate `v1.4.0` (supports the new `img2vec-neural` module).

# More Resources

{% include docs-support-links.html %}
