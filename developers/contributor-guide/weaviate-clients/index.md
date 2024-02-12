---
title: Weaviate Clients
sidebar_position: 0
image: og/contributor-guide/weaviate-clients.jpg
# tags: ['contributor-guide', 'clients']
---

# Contributor guidelines

There are currently four clients developed for Weaviate's APIs:
* [Python](/developers/weaviate/client-libraries/python/index.md)
* [Go](/developers/weaviate/client-libraries/go.md)
* [TypeScript/JavaScript](/developers/weaviate/client-libraries/typescript.mdx)
* [Java](/developers/weaviate/client-libraries/java.md)

These clients, and all future clients are and will be developed according to the following guidelines:

1. Every client *must* reflect all features of the [RESTful API one-to-one](/developers/weaviate/api/rest/index.md).
2. Every client *must* reflect all functions of [GraphQL API](/developers/weaviate/api/graphql/index.md) (1-1 where possible).
3. Clients *can* have client-specific, extra or unique features:
   1. These features on top of the 1-1 RESTful and GraphQL functionalities must be defined through a user story, which will also be reflected in the documentation.
   2. These features can be solved in a client's native way (follow the current design of the client for consistency)
   3. Preferably the functionalities are consistent across clients.
4. Keep the design (nomenclature and builder structures) as consistent as possible, with the nomenclature of the RESTful and GraphQL API functions as base, then adopting names from similar functions in a client in another language.
5. To be considered complete, clients must, at a minimum, include journey tests. Please refer to the 'Testing' section below for more details."

# Design philosophy and API patterns

As a rule of thumb it is more important that a client feels native to
developers used to a specific language than it is to have all clients exactly
identical. When developers make their first contact with a Weaviate client,
they should think "This feels like proper Java [Go/Python/JavaScript...]", as
opposed to "I guess it was designed like this to be consistent with other
language clients". Therefore you should design clients in a way that feels
native to those with experience in that language.

This can also mean that specific patterns deviate from one client to another.
For example, python has keyword arguments next to positional arguments. This
makes it easy to add optional arguments with defaults. Golang, on the other
hand, has a fixed set of arguments per function call making it much better
suited for a builder pattern.

Casing in object, property and method names should follow best-practicies for
the respective language.

# Testing

Test coverage is very important for clients to make it possible to easily test
the client against various Weaviate versions. As a client is an integration
point to Weaviate, the [Test pyramid](../weaviate-core/tests.md#test-pyramid)
will look upside down.

Contrary to Weaviate Core it is most important that [Journey
Tests](../weaviate-core/tests.md#journey-tests) are present, which verify all
actual integration points with a real Weaviate instance. Feel free to add
additional Integration, Component or [Unit
Tests](../weaviate-core/tests.md#unit-tests) as they make sense, e.g. for
edge cases or language-speficic sources of error. As a rule of thumb, a
dynamically typed language will probably require more unit-level testing than a
statically typed one. Note, however, that we can only use Journey tests
involving an actual Weaviate instance to verify if a client is 100% compatible
with Weaviate in general and a specific Weaviate version.

For inspiration of how to write great tests for your client, take a look at the
tests of the JavaScript client
([Example](https://github.com/weaviate/weaviate-javascript-client/blob/main/data/journey.test.ts))
or Go client
([Example](https://github.com/weaviate/weaviate-go-client/tree/master/test)).

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
[Java](/developers/weaviate/client-libraries/java.md) and
[Go](/developers/weaviate/client-libraries/go.md) clients.

Then we recommend to start porting one of the existing test suites and start
implementing the client methods until all tests are passed. If you use the same
tests as the existing clients (running against an actual Weaviate instance in
docker-compose) you will have the guarantee that your new client is working
correctly.

Eventually, as you have ported all tests and implemented all features to make
them pass, you have the guarantee that your client is feature-complete and
won't break on future updates.
