---
title: Architecture
sidebar_position: 2
image: og/contributor-guide/weaviate-modules.jpg
# tags: ['contributor-guide', 'weaviate module system']
---

## Architecture (Code Level)

This page describes the code-level architecture. The high-level architecture
depends on the respective module. For example, `media2vec` modules typically
use a microservice pattern to offload model inference into a separate
container, [see this example for the `text2vec-transformers` high-level
architecture](./overview.md#high-level-architecture).

## What is a module (from a Golang perspective?)

A module is essentially any struct that implements a specific Golang interface.
To keep module development comfortable, we have decided that the main interface
is a really small one. A module essentially only has to provide a `Name()
string` and `Init(...) error` method.

If your struct implements [this small
interface](https://github.com/weaviate/weaviate/blob/master/entities/modulecapabilities/module.go)
it is already a valid Weaviate Module.

## Module Capabilities

Although a valid module, the above example provides little value to the user -
it can't do anything. We cannot predict which capability a module will provide
and don't want to force every module developer to implement hundreds of methods -
only to have 95 of them return `"not implemented"`.

Thus, we have decided to make each capability a small interface with a module
can choose to implement. The module provider will skip modules which do not
implement a specific capability when calling all modules hooked-in functions.

An example for such a capability interface would be the `Vectorizer`
capability. If your module should be able to vectorize an object, it must
implement [this small
interface](https://github.com/weaviate/weaviate/blob/master/entities/modulecapabilities/vectorizer.go).

All possible capabilities can be found in the [`modulecapabilites`
package](https://github.com/weaviate/weaviate/tree/master/entities/modulecapabilities).

This setup also allows us to extend the module API itself in a fashion that is
completely non-breaking to existing modules. If a new capability is added and
existing modules don't implement this new interface, they are simply ignored
for this capability, but all others keep working.

The [`moduletools`
package](https://github.com/weaviate/weaviate/tree/master/entities/moduletools)
provides the modules with various tools that a module might need when providing
various capabilities. They are injected through the signatures of the
capability interface methods.


### Module Capabilities: additional.go

Here is a detailed explanation of what you can find in [`additional.go`](https://github.com/weaviate/weaviate/blob/master/entities/modulecapabilities/additional.go):
* The function `GraphQLFieldFn` generates a GraphQL field based on a class name.
* The function `ExtractAdditionalFn`extracts parameters from graphql queries.
* The interface `AdditionalPropertyWithSearchVector`defines additional property parameters with the ability to pass a search vector. If an additional parameter must contain a search vector, then a given param needs to implement `SetSearchVector` method, so that then that search vector will be added to given parameter.
* The function `AdditionalPropertyFn` defines interface for additional property functions performing given logic. It gives the capability of extending a search result with a given additional property.
* The struct `AdditionalSearch` defines on which type of query a given additional logic can be performed. The function `AdditionalPropertyFn` will be called after search is done. You can then extend the results of a query with some additional property, and with that method you're defining how you want to add those additional properties.
    * `ObjectGet`, `ObjectList` - are methods used by REST API
    * `ExploreGet`, `ExploreList` - are methods used by GraphQL API
    * You can define if a given additional attribute will be available to use using graphql or rest api
* The struct `AdditionalProperty` defines all the needed settings and methods to be set in order to add the additional property to Weaviate.
  * `RestNames              []string`: look `handlers_kinds.go` - defines rest api parameter names
	* `DefaultValue           interface{}`: look `handlers_kinds.go` - defines a default value for a parameter
	* `GraphQLNames           []string`: graphql additional parameter name
	* `GraphQLFieldFunction   GraphQLFieldFn`: defines the additional property graphql argument
	* `GraphQLExtractFunction ExtractAdditionalFn`: defines the extract function for additional property argument
	* `SearchFunctions        AdditionalSearch`: defines all of the functions for rest api and graphql
* The interface `AdditionalProperties` groups whole interface methods needed for adding the capability of additional properties, and defines all of the additional property parameters.


## Visualization

The visualization below shows how modules are part of and connected to Weaviate. The black border indicates Weaviate Core, with the grey boxes as internals. Everything in red involves how Weaviate uses the modules that are connected, with the general Module System API. The red Module API spans two internal 'layers', because it can influence the Weaviate APIs (e.g. by extending GraphQL or providing additional properties), and it can influence the business logic (e.g. by taking the properties of an object and setting a vector).

Everything that is blue belongs to a specific module (more than one module can be attached, but here we show one module). Here we have the example of Weaviate using the `text2vec-transformers` module `bert-base-uncased`. Everything that belongs to the `text2vec-transformers` module is thus drawn in blue. The blue box inside Weaviate Core is the part 1 of the module: the module code for Weaviate. The blue box outside Weaviate Core is the separate inference service, part 2.

The picture shows three APIs:
* The first grey box inside Weaviate Core, which is the user-facing RESTful and GraphQL API.
* The red box is the Module System API, which are interfaces written in Go.
* The third API is completely owned by the module, which is used to communicate with the separate module container. This is in this case a Python container, shown on the left.

To use a custom ML model with Weaviate, you have two options:
* A: Replace parts of an existing module, where you only replace the inference service (part 2). You don't have to touch Weaviate Core here.
* B: Build a complete new module and replace all existing (blue) module parts (both 1 and 2). You can configure custom behavior like extending the GraphQL API, as long as the module can hook into the 'red' Module System API. Keep in mind that you'll need to write some module code in Go to achieve this.

![Weaviate module APIs overview](/img/contributor-guide/weaviate-modules/weaviate-module-apis.svg "Weaviate module APIs overview")

Let's take a more detailed example of how you configure Weaviate to use a specific module: if we look at the [`text2vec-transformers`](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-transformers.md) module, it sets `ENABLE_MODULES=text2vec-transformers` in the `Docker Compose` file, which instructs Weaviate to load the respective Go code (part 1). It also, includes another service in `docker-compose.yml`, which contains the actual model for inference (part 2).

Let's look at how a specific (GraphQL) function is implemented in the [`text2vec-transformers`](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-transformers.md) module:

1. **Module code for Weaviate, written in Go:**
   * Tells the Weaviate GraphQL API that the module provides a specific `nearText` method.
   * Validates specific configuration and schema settings and makes them available to the APIs.
   * Tells Weaviate how to obtain a vector (e.g. a word or image embedding) when one is necessary (by sending an HTTP request to a third-party service, in this case the Python application around the inference model)
2. **Inference service:**
   * Provides a service that can do model inference.
   * Implements an API that is in contract with A (not with Weaviate itself).

Note that this is just one example, and variations are possible as long as both part 1 and 2 are present where 1 contains the connection to Weaviate in Go and 2 contains that inference model that part 1 uses. It would also be possible to amend for example the Weaviate `text2vec-transformers` module (part 1) to use the Hugging Face API or some other third-party hosted inference service, instead of its own container (now in part 2) that it brings.

A module completely controls the communication with any container or service it depends on. So for example in the `text2vec-transformers` module, the API of the inference container is a REST API. But for the `text2vec-contextionary` module has a gRPC, rather than a REST API or another protocol.

## Module Examples

Take a look at some of the existing modules to get a feel for how they work:

- [`text2vec-contextionary`](https://github.com/weaviate/weaviate/tree/master/modules/text2vec-contextionary)
- [`text2vec-transformers`](https://github.com/weaviate/weaviate/tree/master/modules/text2vec-transformers)
