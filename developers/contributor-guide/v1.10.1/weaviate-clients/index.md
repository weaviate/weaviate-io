---
layout: layout-documentation
solution: contributor-guide
sub-menu: Weaviate Clients
title: Weaviate Clients
intro: An overview of the Weaviate Client development
description: An overview of the Weaviate Client development
tags: ['contributor-guide', 'clients']
menu-order: 0
open-graph-type: article
og-img: documentation.jpg
toc: true
redirect_from:
  - /documentation/contributor-guide/current/weaviate-clients/index.html
  - /documentation/contributor-guide/current/weaviate-clients/
---

# Contributor guidelines 

There are currently four clients developed for Weaviate's APIs: 
* [Python](../../../weaviate/current/client-libraries/python.html)
* [Go](../../../weaviate/current/client-libraries/go.html) 
* [JavaScript](../../../weaviate/current/client-libraries/javascript.html) 
* [Java](../../../weaviate/current/client-libraries/java.html) 

These clients, and all future clients are and will be developed according to the following guidelines:

1. Every client *must* reflect all features of the [RESTful API one-to-one](../../../weaviate/current/restful-api-references/).
2. Every client *must* reflect all functions of [GraphQL API](../../../weaviate/current/graphql-references/) (1-1 where possible).
3. Clients *can* have client-specific, extra or unique features:
   1. These features on top of the 1-1 RESTful and GraphQL functionalities must be defined through a user story, which will also be reflected in the documentation.
   2. These features can be solved in a client's native way (follow the current design of the client for consistency)
   3. Preferably the functionalities are consistent across clients.
4. Keep the design (nomenclature and builder structures) as consistent as possible, with the nomenclature of the RESTful and GraphQL API functions as base, then adopting names from similar functions in a client in another language. 
5. Clients must at the minimum contain journey-tests to be considered complete. See "Testing" below.

# Design philosophy and API patterns

As a rule of thumb it is more important that a client feels native to
developers used to a specific language than it is to have all clients exaclty
identical. When developers make their first contact with a Weaviate client,
they should think "This feels like proper Java [Go/Pytho/Javascript...]", as
opposed to "I guess it was designed like this to be consistent with other
language clients". Therefore you should design a client in a way that it feels
native to those with experience in the langauge.

This can also mean that specific patterns deviate from one client to another.
For example, python has keyword arguments next to positional arguments. This
makes it easy to add optional arguments with defaults. Golang, on the other
hand, has a fixed set of arguments per funtion call making it much better
suited for a builder pattern.

Casing in object, property and method names should follow best-practicies for
the respective language. 

# Testing

Test coverage is very important for clients to make it possible to easily test
the client against various Waeviate versions. As a client is an integration
point to Weaviate, the [Test pyramid](../weaviate-core/tests.html#test-pyramid)
willl look upside down.

Contrary to Weaviate Core it is most important that [Journey
Tests](../weaviate-core/tests.html#journey-tests) are present, which verify all
actual integration points with a real Weaviate instance. Feel free to add
additional Integration, Component or [Unit
Tests](../weaviate-core/tests.html#unit-tests) as they make sense, e.g. for
edge cases or language-speficic sources of error. As a rule of thumb, a
dynamically typed language will probably require more unit-level testing than a
statically typed one. Note, however, that we can only use Journey tests
involving an actual Weavaite instance to verify if a client is 100% compatible
with Weaviate in general and a specific Weaviate version.

For inspiration of how to write great tests for your client, take a look at the
tests of the Javascript client
([Example](https://github.com/semi-technologies/weaviate-javascript-client/blob/master/data/journey.test.js))
or Go client
([Example](https://github.com/semi-technologies/weaviate-go-client/tree/master/test)).

# How to get started

We recommend that you first identify which existing client uses a language most
similar to the one you've picked. For example, criteria could include:

* Is the language dynamically or statically typed?
* Is the language compiled or interpreted?
* How are optional arguments typically handled?
* How verbose are patterns in the language?

Then you can take a look at an existing client which matches your language the
closest and get inspried. 

For example, if you plan to implement a client in C#, it might make sense to look at the 
[Java](../../../weaviate/current/client-libraries/java.html) and
[Go](../../../weaviate/current/client-libraries/go.html) clients.

Then we recommend to start porting one of the existing test suites and start
implementing the client methods until all tests are passed. If you use the same
tests as the existing clients (running against an actual Weaviate instance in
docker-compose) you will have the guarantee that your new client is working
correctly.

Eventually, as you have ported all tests and implemented all features to make
them pass, you have the guarantee that your client is feature-complete and
won't break on future updates.
