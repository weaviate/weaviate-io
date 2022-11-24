---
layout: layout-documentation
solution: weaviate
sub-menu: Other Modules
nav-parent: Modules
title: Custom modules
description: How to create custom Weaviate modules
tags: ['Custom Modules']
sidebar_position: 9
open-graph-type: article
toc: true
redirect_from:
   - /developers/weaviate/v1.1.0/modules/custom-modules.html
   - /developers/weaviate/current/modules/custom-modules.html
---

# Introduction

Besides using one of the out-of-the-box vectorization models, you can also attach your own machine learning model to Weaviate. This way, you can use Weaviate to scale your ML and NLP models, since Weaviate takes care of efficient data storage and retrieval. A custom vectorizer module is, for example, a model that you trained on your own training data, that is able to transform data (e.g. text or image data) to embeddings. 

If you have model that already fits with an existing model architecture (e.g. Transformers), you don't have to write any custom code and you can just run this Transformer model with the existing [`text2vec-transformer` module](../retriever-vectorizer-modules/text2vec-transformers.html).

This page contains information about how you can attach your own ML model to Weaviate. You will need to attach your ML model to Weaviate's Module API as a module. First, there is some information about how (vectorizer/embedding) modules in Weaviate work.

Quick links: 
* To build your own inference container (which uses an existing Weaviate Module API), click [here](#a-replace-parts-of-an-existing-module).
* To build a completely new module (to create your own Weaviate Module API to e.g. add fields to GraphQL, etc), click [here](../../../contributor-guide/current/weaviate-module-system/how-to-build-a-new-module.html).

# Video: How to create custom modules in Weaviate?

<iframe width="100%" height="375" src="https://www.youtube.com/embed/uKYDHzjEsbU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_Recorded during the Weaviate meetup – custom modules section starts @ 13:30min_

# Background: Module architecture in Weaviate

To understand how to create a new module, you'll need to understand how the module system of Weaviate works in general.

Weaviate is entirely agnostic on how a module obtains the values it needs for the specific lifecycle hooks. For example, for a vectorizer module, the contract between Weaviate and the module is as follows: At import time, each object is passed to the (configured) vectorizer module and the module must extend it with a vector (embedding). Weaviate is agnostic to how the module does that. For example, if the module's purpose is to use a pre-existing ML model for inference, the module may decide to provide a second inference service and contact that inference service as part of the "vectorize" lifecycle hook. Weaviate is agnostic on how that communication occurs. For example, the `text2vec-contextionary` module uses a gRPC API on its inference service, whereas the the `text2vec-transformers` module uses a REST API for the same purpose.

Typically a (vectorizer) module consists of two parts:
1. **Module code for Weaviate, written in Go**, which hooks into specific lifecycles and provides various capabilities (like controlling the API function) to integrate the module into the regular flow in Weaviate. 
2. **Inference service**, typically a containerized application that wraps an ML model with a module-specific API which is consumed by the module code executed in Weaviate (part 1).

The visualization below shows how modules are part of and connected to Weaviate. The black border indicates Weaviate Core, with the grey boxes as internals. Everything in red involves how Weaviate uses the modules that are connected, with the general Module System API. The red Module API spans two internal 'layers', because it can influence the Weaviate APIs (e.g. by extending GraphQL or providing additional properties), and it can influence the business logic (e.g. by taking the properties of an object and setting a vector).

Everything that is blue belongs to a specific module (more than one module can be attached, but here we show one module). Here we have the example of Weaviate using the `text2vec-transformers` module `bert-base-uncased`. Everything that belongs to the `text2vec-transformers` module is thus drawn in blue. The blue box inside Weaviate Core is the part 1 of the module: the module code for Weaviate. The blue box outside Weaviate Core is the separate inference service, part 2.

The picture shows three APIs: 
* The first grey box inside Weaviate Core, which is the user-facing RESTful and GraphQL API.
* The red box is the Module System API, which are interfaces written in Go.
* The third API is completely owned by the module, which is used to communicate with the separate module container. In this case, this is a Python container, shown on the left.

To use a custom ML model with Weaviate, you have two options: ([further explained below](#how-to-build-and-use-a-custom-module))
* A: Replace parts of an existing module, where you only replace the inference service (part 2). You don't have to touch Weaviate Core here. 
* B: Build a completely new module and replace all existing (blue) module parts (both 1 and 2). You can configure custom behavior like extending the GraphQL API, as long as the module can hook into the 'red' Module System API. Keep in mind that you'll need to write some module code in Go to achieve this. 

<!-- ![Weaviate module APIs overview](/img/weaviate-module-apis.svg "Weaviate module APIs overview") -->

Let's take a more detailed example of how you configure Weaviate to use a specific module: if we look at the [`text2vec-transformers`](../retriever-vectorizer-modules/text2vec-transformers.html) module, you set `ENABLE_MODULES=text2vec-transformers` in the docker-compose configuration, which instructs Weaviate to load the respective Go code (part 1). Additionally, you include another service in `docker-compose.yml` which contains the actual model for inference (part 2). In more detail, let's look at how a specific (GraphQL) function is implemented in the [`text2vec-transformers`](../retriever-vectorizer-modules/text2vec-transformers.html) module:

1. **Module code for Weaviate, written in Go:**
   * Tells the Weaviate GraphQL API that the module provides a specific `nearText` method.
   * Validates specific configuration and schema settings and makes them available to the APIs.
   * Tells Weaviate how to obtain a vector (e.g. a word or image embedding) when one is necessary (by sending an HTTP request to a third-party service, in this case the Python application around the inference model)
2. **Inference service:**
   * Provides a service that can do model inference.
   * Implements an API that is in contract with A (not with Weaviate itself). 

Note that this is just one example, and variations are possible as long as both part 1 and 2 are present where 1 contains the connection to Weaviate in Go and 2 contains that inference model that part 1 uses. It would also be possible to amend, for example, the Weaviate `text2vec-transformers` module (part 1) to use the Huggingface API or some other third-party hosted inference service, instead of it's own container (now in part 2) that it brings. 

A module completely controls the communication with any container or service it depends on. So, for example, in the `text2vec-transformers` module, the API of the inference container is a REST API. But for the `text2vec-contextionary` module has a gRPC, rather than a REST API or another protocol. 

## Module characteristics

A module is a custom code that can extend Weaviate by hooking into specific lifecycle hooks. As Weaviate is written in Go, so module code must also be written in Go. However, some existing modules make use of independent services which can be written in any language, as is often the case with vectorizer modules which bring along model inference containers often written in Python.

Modules can be "vectorizers" (defines how the numbers in the vectors are chosen from the data) or other modules providing additional functions like question answering, custom classification, etc. Modules have the following characteristics:
- Naming convention: 
  - Vectorizer: `<media>2vec-<name>-<optional>`, for example `text2vec-contextionary`, `image2vec-RESNET` or `text2vec-transformers`.
  - Other modules: `<functionality>-<name>-<optional>`.
  - A module name must be url-safe, meaning it must not contain any characters which would require url-encoding.
  - A module name is not case-sensitive. `text2vec-bert` would be the same module as `text2vec-BERT`.
- Module information is accessible through the [`v1/modules/<module-name>/<module-specific-endpoint>` RESTful endpoint](../restful-api-references/modules.html).
- General module information (which modules are attached, version, etc.) is accessible through Weaviate's [`v1/meta` endpoint](../restful-api-references/meta.html).
- Modules can add `additional` properties in the RESTful API and [`_additional` properties in the GraphQL API](../graphql-references/additional-properties.html).
- A module can add [filters](../graphql-references/filters.html) in GraphQL queries.
- Which vectorizer and other modules are applied to which data classes is configured in the [schema](../schema/schema-configuration.html#vectorizer).

# How to build and use a custom module

There are two different ways to extend Weaviate with custom vectorization capabilities: You can either build a completely custom module (parts 1 + 2) or only replace the inference service of an existing module (only replace part 2, Option A). The latter is a good option for fast prototyping and proofs of concepts. In this case, you simply replace the inference model (part 2), but keep the interface with Weaviate in Go. This is a quick way to integrate completely different model types. You can also choose to build a complete new module (Option B). This is the most flexible option, but it means you'll have to write a Weaviate interface in Go. We recommend to only go for option B if you are happy with the prototype results. With option B you can turn the PoC into a full module, because you can control all configuration and naming when you go for option B.

## A. Replace parts of an existing module

The quickest way to integrate a completely different inference model is replacing parts of an existing module. You reuse part 1 (the interface with Weaviate) and thus adhere to part 1's API contract, and only implement changes to or replace part 2.

Because you are not touching the Go Weaviate interface code, you don't have the possibility to introduce a new configuration that is specific to your module inference into Weaviate's APIs provided and consumed by existing modules that are not existing in part 1 (i.e. all the configuration parameters, e.g. those of `text2vec-transformers`). This also implies that you cannot change or introduce new (GraphQL) API functions or filters. 
_Note that Weaviate APIs are not guaranteed to be stable. Even on a non-breaking Weaviate release, 'internal' APIS could always change._

To use a new inference model (part 2) with an existing Weaviate interface (part 1), you could reuse all the Go-code from the existing module and simply point it to a different inference container. As an example, here's how to use a custom inference module using the `text2vec-transformers` Go-code:
1. In a valid `docker-compose.yml` that’s configured to use transformers (e.g. for example configure one via the [configuration configurator](../installation/docker-compose.html#configurator)), you will find an env var like this: `TRANSFORMERS_INFERENCE_API: 'http://t2v-transformers:8080'`, you can point that to any app you like. You should keep the variable name `TRANSFORMERS_INFERENCE_API`. 
2. Build a small HTTP API wrapper around your model, it should at the minimum have the endpoints listed below (which is in this example entirely specific to the `text2vec-transformers` module and fully in its control):
   1. `GET /.well-known/live` -> respond `204` when the app is alive
   2. `GET /.well-known/ready` -> respond `204` when the app is ready to serve traffic
   3. `GET /meta` -> respond meta information about the inference model
   4. `POST /vectors` -> see example request and response payloads below. (Note that the app is exposed locally on port `8090` on my machine by adding `ports: ["8090:8080"]` in the docker-compose file). 

Request:
```bash
curl localhost:8090/vectors/ -H "Content-Type: application/json" -d '{"text":"hello world"}' 
```
Response:
```bash
{"text":"hello world","vector":[-0.08469954133033752,0.4564870595932007, ..., 0.14153483510017395],"dim":384} 
```

## B. Build a completely new module

Implementing a fully new module with both part 1 and 2 is a lot more flexible, because you can control naming, APIs, behavior, etc. To achieve this, you are essentially contributing to Weaviate. Note that for this option, you need to understand at least parts of Weaviate's architecture, and what a module can and can not control (what is "fixed"). You can fork [Weaviate's repository](https://github.com/semi-technologies/weaviate) and create a completely new [module](https://github.com/semi-technologies/weaviate/tree/master/modules) inside it. This new module can also depend on any number of other containers (which you will have to supply), and could use any API for communication with its dependencies (it could also have not any dependencies). 

Detailed instructions are described in the [contributor guide](../../../contributor-guide/current/weaviate-module-system/how-to-build-a-new-module.html)

If you choose to build a completely new module including a Weaviate Go interface, you can contact us via [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw) or through an [issue on Github](https://github.com/semi-technologies/weaviate/issues) so we help you get started.

# Important notes
- The length of the vectors your vectorizer has influences later usage, for example if you're exploring your data by vector with the GraphQL explore filter, the length of this vector should match with the vector length of the data points. 
- Weaviate APIs internal to a module are not guaranteed to be stable. Even on a non-breaking Weaviate release, 'internal' APIS could always change.


# More resources

{% include docs-support-links.html %}
