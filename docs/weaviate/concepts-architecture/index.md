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

* **[Learn about Storage inside a shard](storage.html)**
  * How Weaviate stores data
  * How Weaviate makes writes durable
  * How an inverted index, a vector index and an object store interact with each other

* **[Ways to scale Weaviate horizontally](cluster.html)**
  * Different motivations to scale
  * Sharding vs. Replication
  * Configuring a cluster
  * Consistency

* **[How to plan resources](resources.html)**
  * The roles of CPU, Memory and GPUs
  * How to size a cluster correctly
  * Speeding up specific processes
  * Preventing bottlenecks

* **[The module system](../modules)**
  * How Weaviate can be extended through modules
  * The various roles of modules (vectorizers, etc.)
  * Creating your own modules or adapting existing modules to your needs

* **[Filtered Vector Search](prefiltering.html)**
  * Combine vector search with filters
  * Learn how combining an HNSW with an inverted index leads to high-recall, high-speed filtered queries


* **[User-facing interfaces](interface.html)**
  * Design philosophy behind user-facing APIs
  * Role of the REST and GraphQL APIs

* **[Roadmap](roadmap.html)**
  * Learn about features currently under development
  * What will Weaviate be like in the future from an architectural perspective?


# More Resources

{% include docs-support-links.html %}
