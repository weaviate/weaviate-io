---
title: Testcontainers
sidebar_position: 1
---

[Testcontainers](https://testcontainers.com) is an open source framework for providing throwaway, lightweight instances of databases, message brokers, web browsers, or just about anything that can run in a Docker container.

## Testcontainers and Weaviate

Create a Weaviate instance and use it in Java tests:

```java
var weaviate = new WeaviateContainer("semitechnologies/weaviate:1.25.5");
weaviate.start();
```

Create a Weaviate instance and use it in Go tests:

```go
weaviateContainer, err := weaviate.Run(ctx, "semitechnologies/weaviate:1.25.5")
```

Create a Weaviate instance and use it in Node tests:

```node
const container = await new WeaviateContainer("semitechnologies/weaviate:1.25.5").start();
```

## Resources

* https://testcontainers.com/modules/weaviate/
