---
layout: layout-documentation
solution: weaviate
sub-menu: Architecture
title: Architecture
description: Architecture Overview
tags: ['architecture']
sidebar_position: 0
open-graph-type: article
toc: false
---

# Weaviate's Architecture from above

<!-- [![Weaviate module APIs overview](/img/weaviate-architecture-overview.svg "Weaviate System and Architecture Overview")](/img/weaviate-architecture-overview.svg) -->

The above gives a 30,000 feet view of Weaviate's architecture. On these pages
you can learn more about the individual sections:

* **[Learn about Storage inside a shard](./storage.md)**
  * How Weaviate stores data
  * How Weaviate makes writes durable
  * How an inverted index, a vector index and an object store interact with each other

* **[Ways to scale Weaviate horizontally](./cluster.md)**
  * Different motivations to scale
  * Sharding vs. Replication
  * Configuring a cluster
  * Consistency

* **[How to plan resources](./resources.md)**
  * The roles of CPU, Memory and GPUs
  * How to size a cluster correctly
  * Speeding up specific processes
  * Preventing bottlenecks

<!-- TODO: We probably need to move modules/index.md to the root of the modules -->
* **[The module system](/docs/weaviate/modules/index.md)**
  * How Weaviate can be extended through modules
  * The various roles of modules (vectorizers, etc.)
  * Creating your own modules or adapting existing modules to your needs

* **[Filtered Vector Search](./prefiltering.md)**
  * Combine vector search with filters
  * Learn how combining an HNSW with an inverted index leads to high-recall, high-speed filtered queries


* **[User-facing interfaces](./interface.md)**
  * Design philosophy behind user-facing APIs
  * Role of the REST and GraphQL APIs

* **[Roadmap](/docs/weaviate/more-resources/roadmap/index.md)**
  * Learn about features currently under development
  * What will Weaviate be like in the future from an architectural perspective?


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
