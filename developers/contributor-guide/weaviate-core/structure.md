---
title: Code structure and Style
sidebar_position: 1
image: og/contributor-guide/weaviate-core.jpg
# tags: ['contributor-guide']
---

## Package structure

Weaviate's package structure is modelled after [Clean
Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

### Why Clean Architecture?

We believe Clean Architecture is a good fit for Weaviate. Besides the benefits
listed on the Clean Architecture page, we think it's a great fit for the
following reasons:

* It works well with Go. Concentrating "business-wide" structures in an inner
  "entity" package which does not depend on any outside package fits well with
  Go. It helps avoid cyclical import issues.
* The Go philosophy of "Consumer owns the interface" and implicit interfaces
  fits very well with this model. A use case (inner layer) defines what it
  needs from an adapter (e.g. handler, database) of an outer layer. It
  therefore does not need to know which outer layers exist
* The general goal of pluggability is important to Weaviate: Over the history of
  Weaviate the persistence layer has changed considerably. Originally it
  depended on Janusgraph, which was later migrated to Elasticsearch. As of
  `v1.0.0` the persistence is done "in-house", but the same abstraction
  principles apply. While we now no longer switch vendors, we might still
  switch implementations.

### How we use Clean Architecture

* The most central "entities" are found in the `./entities` subpackages.
  `entities/models` are auto-generated from go-swagger, whereas the remaining
  entities are custom-built. Note that allowing framework-generated packages to
  be entities is not in line with Clean Architecture. This is mostly due to
  historic reasons. Entities are mostly structures with properties. Methods on
  those structures are mainly accessor methods.
* The usecases are located in the `./usecase` folder. This is where most of the
  application-specific business logic sits. For example CRUD logic and its
  validation sits in the `usecases/kinds` package and methods to traverse the
  graph are in the `usecases/traverser` package. All of these packages are
  agnostic of the API-types (GraphQL, REST, etc) as well as agnostic of the
  persistence layer (legacy-Elasticsearch, Standalone, etc.)
* Interface adapters are located in `./adapters`. The `adapters/handlers`
  folder contains subpackages for the GraphQL (`adapters/handlers/graphql`) and
  REST (`adapters/handlers/rest`) packages. Note that since GraphQL is served
  via REST it is not truly independent from the REST api package, but is
  actually served through this package by the same webserver.

  The `adapters/repos` package is where most of the database-logic resides.
  Traditionally these contained subpackages for all the supported third-party
  backends, (e.g. `adapters/repos/esvector` for the Vector-Enabled
  Elasticsearch instance or `adapters/repos/etcd` for the consistent
  configurations storage in etcd). With the move to Weaviate Standalone, the
  custom database logic is located in `adapters/repos/db`.

## Code Style

The following guidelines help us write clean and maintainable code:

* Use the principles outlined in "Clean Code" by Robert C. Martin
  pragmatically. This means they should act as a guide, but do not need to be
  followed religiously.
* Write code that is idiomatic for the respective language. For Weaviate, which
  is a Golang-application, adhere to the principles outlined in [Effective
  Go](https://golang.org/doc/effective_go.html)
* Use linters and other tools as helpers. If a linter can prevent us from
  writing bad code, it's a good linter. If it annoys us, it's not.
* Format all code using [gofumports](https://github.com/mvdan/gofumpt).
  `gofumports` is the `goimports`-enabled version of `gofumpt`. `Gofumpt`
  itself is a stricter version of `golint`. Stricter in this case does not mean
  that it should restrict us more. Since it is fully auto-format compatible it
  takes boring decisions away from us and makes sure code looks consistent
  regardless of who wrote it.
* Use [golangci-lint](https://github.com/golangci/golangci-lint) to combine
  various meta linters. The current config can be found in `.golangci.yml`. It
  is inspired by the settings on [Go Report
  Card](https://goreportcard.com/report/github.com/weaviate/weaviate)
  where Weaviate holds an A+ rating.
* Keep methods short.
* Don't comment obvious things, comment intent on decisions you took that might
  not be 100% obvious. It's better to have a few 100-line comments, than to
  have 100s of 1-line comments which don't add any value.

## More Resources

import ContributorGuideMoreResources from '/_includes/more-resources-contributor-guide.md';

<ContributorGuideMoreResources />

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>