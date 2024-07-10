---
title: Overview
sidebar_position: 1
image: og/contributor-guide/weaviate-modules.jpg
# tags: ['contributor-guide', 'weaviate module system']
---

## Weaviate Module System

The Module system in Weaviate is a way to extend Weaviate's functionality.
Modules often provide access to various machine-learning models which can be
used to turn media into vectors at query and import time. However, that's not
the only thing a module can do; any extension on functionality can be
incorporated into a module.

The user decides which modules are activated at startup through configuration.
Some modules can be combined with each other, others might be conflicting. In
this case startup will fail.

## High level architecture

A module is essentially code which compiles with Weaviate, but a module can
also communicate with other services. We are going through the
`text2vec-transformers` module as an example.

From a high level, the motivation for a user to enable this module would be to
have their imported data vectorized with a transformer module (e.g. BERT,
etc.). Additionally, at query time, the query string should also be vectorized
in the same way.

From a tech level this module therefore has to provide some capabilities. See
[Architecture](./architecture.md) for details of what capabilities are and
how a module can provide such a capability. The capabilities we need are:

- **Vectorizer** The module must be able to turn the text of an object to a
  vector at import time.

- **GraphQLArguments** The module must provide text-specific graphQL-Searcher
  arguments, such as `nearText`. Additionally the module needs to hook into the
  query process and turn user-specified text into a search-vector which
  Weaviate can use for the nearest-neighbor search.

### What happens when the Vectorizer gets called?

Weaviate is written in Go and so is the module. But what happens if our model
only has Python bindings? The module can decide to make RPC calls (REST, gRPC,
etc.) to other services. In the case of the `text2vec-transformers` module, the
module also provides a python container which wraps the respective model with
a simple REST API, which it can then call from within the module.

This split into several containers (often referred to as a microservice
pattern) is not just to abstract programming languages away. We obtain several
other benefits from running the container as a separate service. Most notably:

- **Hardware requirements**
  Neural-network-based models, such as BERT & friends, typically require GPUs
  to run efficiently. Weaviate however is very fast on cheap CPU-based
  machines. Thus instead of requiring expensive GPU-machines for the entire
  setup, we can use GPU-machines only for the model interference part. On
  Kubernetes this could be achieved through node affinity, for example. Thus,
  even if running on the same cluster, you can schedule your Weaviate pods on
  CPU-only nodes and have the inference pods run on GPU-enabled nodes.

- **Independent scalability**
  This separation of concerns allows to scale each concern depending on load.
  For example, if you have a read-heavy workload, Weaviate Core might be the
  bottleneck. If you have a write-heavy workload with very long objects, model
  inference might be the bottleneck. By having these concerns separated, you
  can individually scale based on your needs.

- **Exchangability**
  Most transformer models have the same API and usage principles. They only
  differ in use case and training data. By having the model inference run in a
  separate container, you can quickly exchange models. E.g. from BERT to
  DistilRoBERTa - only by exchanging Docker containers.

## Module characteristics

A module is a custom code that can extend Weaviate by hooking into specific lifecycle hooks. As Weaviate is written in Go, so module code must also be written in Go. However, some existing modules make use of independent services which can be written in any language, as is often the case with vectorizer modules which bring along model inference containers often written in Python.

Modules can be "vectorizers" (defines how the numbers in the vectors are chosen from the data) or other modules providing additional functions like question answering, custom classification, etc. Modules have the following characteristics:
- Naming convention:
  - Vectorizer: `<media>2vec-<name>-<optional>`, for example `text2vec-contextionary`, `image2vec-RESNET` or `text2vec-transformers`.
  - Other modules: `<functionality>-<name>-<optional>`.
  - A module name must be url-safe, meaning it must not contain any characters which would require url-encoding.
  - A module name is not case-sensitive. `text2vec-bert` would be the same module as `text2vec-BERT`.
- Module information is accessible through the `v1/modules/<module-name>/<module-specific-endpoint>` RESTful endpoint.
- General module information (which modules are attached, version, etc.) is accessible through Weaviate's [`v1/meta` endpoint](developers/weaviate/api/rest#tag/meta).
- Modules can add `additional` properties in the RESTful API and [`_additional` properties in the GraphQL API](/developers/weaviate/api/graphql/additional-properties.md).
- A module can add [filters](/developers/weaviate/api/graphql/filters.md) in GraphQL queries.
- Which vectorizer and other modules are applied to which data classes is configured in the [schema](/developers/weaviate/manage-data/collections.mdx#specify-a-vectorizer).
