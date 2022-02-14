---
layout: layout-documentation
solution: contributor-guide
sub-menu: Weaviate Module System
solution-order: 1
title: Architecture
intro: |-
  Learn how a module is built up and how you can build your own modules
description: Code-level architecture of Weaviate Modules
tags: ['contributor-guide', 'weaviate module system']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
toc: true
---

## Architecture (Code Level)

This page describes the code-level architecture. The high-level architecture
depends on the respective module. For example, `media2vec` modules typically
use a microservice pattern to offload model inference into a separate
container, [see this example for the `text2vec-transformers` high-level
architecture](./overview.html#high-level-architecture).

## What is a module (from a Golang perspective?)

A module is essentially any struct that implements a specific Golang interface.
To keep module development comfortable, we have decided that the main interface
is a really small one. A module essentially only has to provide a `Name()
string` and `Init(...) error` method.

If your struct implements [this small
interface](https://github.com/semi-technologies/weaviate/blob/master/entities/modulecapabilities/module.go)
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
interface](https://github.com/semi-technologies/weaviate/blob/master/entities/modulecapabilities/vectorizer.go).

All possible capabilities can be found in the [`modulecapabilites`
package](https://github.com/semi-technologies/weaviate/tree/master/entities/modulecapabilities).

This setup also allows us to extend the module API itself in a fashion that is
completely non-breaking to existing modules. If a new capability is added and
existing modules don't implement this new interface, they are simply ignored
for this capability, but all others keep working.

The [`moduletools`
package](https://github.com/semi-technologies/weaviate/tree/master/entities/moduletools)
provides the modules with various tools that a module might need when providing
various capabilities. They are injected through the signatures of the
capability interface methods.

## Module Examples

Take a look at some of the existing modules to get a feel for how they work:

- [`text2vec-contextionary`](https://github.com/semi-technologies/weaviate/tree/master/modules/text2vec-contextionary)
- [`text2vec-transformers`](https://github.com/semi-technologies/weaviate/tree/master/modules/text2vec-transformers)
