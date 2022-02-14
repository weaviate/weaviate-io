---
layout: layout-documentation
solution: contributor-guide
sub-menu: Weaviate Module System
solution-order: 1
title: Overview 
intro: |-
  Weaviate's Module system allows extending Weaviate with different
  use-case specific capabilities. For example, text2vec modules can use NLP
  models, such as transformers or the contextionary to turn text objects into
  vectors, whearas an img2vec module would do the same for images. But the module
  system is not limited to ML model inference. It could also provide completely
  new capabilities, such as provide network connectivity.
description: Overview of Weaviate's Module System
tags: ['contributor-guide', 'weaviate module system']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

## Weaviate Module System

The Module system in Weaviate is a way to extend Weaviate functionality.
Modules often provide access to various machine-learning models which can be
used to turn media into vectors at query and import time. However, that's not
the only thing a module can do, any extension on functionality can be
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
[Architecture](./architecture.html) for details of what capabilities are and
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
module also provides a a python container which wraps the respective model with
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
