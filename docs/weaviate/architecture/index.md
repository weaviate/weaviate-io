---
title: Concepts - Architecture
sidebar_position: 0
# layout: layout-documentation
# solution: weaviate
# sub-menu: Architecture
# title: Architecture
# description: Architecture Overview
# tags: ['architecture']
# sidebar_position: 0
# open-graph-type: article
# toc: false
---

<!-- TODO: Remove explanatory header once layout review complete -->
:::caution NOTE:
The "Concepts: Architecture" sections comes from Architecture in Weaviate Docs Classic
:::

## Overview

This section includes explanations of of Weaviate's architecture. If you are curious about how Weaviate works under the hood, or how it is designed to scale, you are at the right place.

This section does not need to be read linearly. We do recommend that you read the [core concepts](../core-knowledge/index.md) section first if you have not already.

## Weaviate Architecture

The figure below gives a 30,000 feet view of Weaviate's architecture. 

[![Weaviate module APIs overview](./img/weaviate-architecture-overview.svg "Weaviate System and Architecture Overview")](./img/weaviate-architecture-overview.svg)

You can learn more about the individual components in this figure by following the below guides:

### [Learn about storage inside a shard](./storage.md)
  * How Weaviate stores data
  * How Weaviate makes writes durable
  * How an inverted index, a vector index and an object store interact with each other

### [Ways to scale Weaviate horizontally](./cluster.md)
  * Different motivations to scale
  * Sharding vs. Replication
  * Configuring a cluster
  * Consistency

### [How to plan resources](./resources.md)
  * The roles of CPU, Memory and GPUs
  * How to size a cluster correctly
  * Speeding up specific processes
  * Preventing bottlenecks

### [The module system](/docs/weaviate/modules/index.md)
  * How Weaviate can be extended through modules
  * The various roles of modules (vectorizers, etc.)
  * Creating your own modules or adapting existing modules to your needs

### [Filtered vector search](./prefiltering.md)
  * Combine vector search with filters
  * Learn how combining an HNSW with an inverted index leads to high-recall, high-speed filtered queries

### [User-facing interfaces](./interface.md)
  * Design philosophy behind user-facing APIs
  * Role of the REST and GraphQL APIs

### [Roadmap](/docs/weaviate/roadmap/index.md)
  * Learn about features currently under development
  * What will Weaviate be like in the future from an architectural perspective?


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
