---
layout: layout-documentation
solution: contributor-guide
sub-menu: Weaviate Contributor's Guide
title: Suggesting Enhancements 
tags: ['contributor-guide']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
toc: true
---
## Suggesting Enhancements

Have some suggestions in your mind? We are glad you want to improve our product by suggesting new feature(s). We’d love to hear your ideas. We at Weaviate standardize the work, procedures and focus on continuous improvement.

How suggesting enhancements will help you?

* Receive timely feedback from engineers on requests.

* Learn more about upcoming releases.

* Increase your involvement over feature development

This section walks you through the process of submitting an enhancement for an addition to Weaviate core, such as a brand-new feature or a small change to an already-existing feature. 

Following these guidelines can help you make a better suggestion, and make it easier for the maintainers and the community to understand your proposal and find other similar suggestions.

You can still file an issue if you have an idea for a new feature but aren't sure where it should go. When filling out the issue template, be sure to include the steps you would take if the requested feature were available.

We recommend you to check the Weaviate Module System to get better understanding of how Weaviate works.

* [Overview and High-Level Architecture](../weaviate-module-system/overview.html)
* [Code-Level Architecture](../weaviate-module-system/architecture.html)

Be sure to checkout the [folder structure](#folder-structure) to get high level overview of the repository.

## How do I make a (good) suggestion for improvement?

Enhancement suggestions are tracked as GitHub issues. Check if there's already a WIP (work in progress) issue which describes that enhancement. If not, create an issue in the repository using the template and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* Give as many specifics as you can in a **step-by-step description** of the suggested improvement.
* **Add specific examples** to demonstrate the steps. If possible, include code snippets in Markdown format.
* **Describe the current behavior** and then **explain which behaviour you were expecting and why**.
* **Include images, animated GIFs, or video links** that can be used to illustrate the steps or highlight the area of Weaviate that the suggestion relates to.
* **Explain why this enhancement would be useful** to most Weaviate users.
* Specify which **version of Weaviate** you're using. Check the version in your `docker-compose.yml` file.

In order to get your requests into these prioritization meetings, make sure they are clearly written with details about what you’re trying to accomplish (Your use cases) , your current workaround (if you have one), what problems you’re having, and any other details that will help build a case for why this is an important request to you. 

## Folder Structure

```
.
├── adapters 
│   ├── client 
│   ├── handlers
│   │   ├── graphql
│   │   └── rest
│   └── repos
│       ├── classifications
│       ├── db
│       ├── modules
│       └── schema
├── ci
├── client
│   ├── batch
│   ├── classifications
│   ├── graphql
│   ├── meta
│   ├── obejcts
│   ├── operations
│   ├── schema
│   └── well-known
├── cmd
|   └── weaviate-server
├── deprecations
├── docker-compose
├── entities
│   ├── additional
│   ├── aggregation
│   ├── filters
│   ├── models
│   ├── modulecapabilities
│   ├── moduletools
│   ├── multi
│   ├── schema
|   |   └── crossref
│   ├── search
│   ├── searchparams
│   ├── storagestate
│   └── storobj
├── genesis
│   ├── client
|   |   └── operations
│   ├── cmd
|   |   └── weaviate-genesis-server
│   ├── models
│   ├── restapi
|   |   └── operations
│   ├── state
│   ├── test
|   |   └── acceptance
│   ├── tools
├── modules
│   ├── img2vec-neural
│   ├── multi2vec-clip
│   ├── ner-transformers
│   ├── qna-transformers
│   ├── text-spellcheck
│   ├── text2vec-contextionary
│   ├── text2vec-openai
│   └── text2vec-transformers
├── openapi-specs
├── test
|   ├── acceptance
|   ├── helper
|   └── integration
├── tools
│   ├── dev
│   ├── license_headers
│   ├── release_template
│   └── test
└── usecases
    ├── auth
    ├── classification
    ├── cluster
    ├── config
    ├── connstate
    ├── locks
    ├── modules
    ├── monitoring
    ├── network
    ├── objects
    ├── schema
    ├── sharding
    ├── traverser
    └── vectorizer
```

## Working on your suggestion

You want to work on the idea yourself? We heavily appreciate your willingness to work on the product if you want to work on the enhancement/feature you suggested by contributing to the code. If you get stuck or run into problems while contributing code, our team will help you. Simply post your question in our [Slack](https://weaviate.slack.com/).

## Setting up your development environment

Follow the steps below to set up your local environment for development on Weaviate.

Prerequisities

* Go
* Docker
* Docker compose

In order to run local development environment:

Start up all dependencies (e.g. modules inference containers) and compile/run Weaviate locally. This script assumes a contextionary-based setup:

**Default setup (contextionary module)**

```
tools/dev/restart_dev_environment.sh && ./tools/dev/run_dev_server.sh
```

You can also run with different modules, e.g.:

**Transformers t2v only**

```
tools/dev/restart_dev_environment.sh --transformers && ./tools/dev/run_dev_server.sh local-transformers
```

**Contextionary t2v & Transformers QnA**

```
tools/dev/restart_dev_environment.sh --qna && ./tools/dev/run_dev_server.sh local-qna
```

The above commands are subject to change as we add more modules and require specific combinations for local testing. You can always inspect the two files to see which options are contained. The first option without any arguments is always guarateed to work.

To make query search use this link for console: [https://console.semi.technology/](https://console.semi.technology/).

There are multiple ways to set up a Weaviate instance. For a testing setup, we recommend you start with docker-compose. Cloud deployment can be used for small and larger projects. For production setup and/or large scale projects, we encourage you to use Kubernetes.

For setting up your Weaviate instance, go through this detailed [quickstart guide](/developers/weaviate/current/getting-started/quick-start.html).

## Additional References

We recommend that you read through these guides, which will provide you with a clear understanding of Weaviate's code structure and style, CI/CD philosophy, and so on. These will assist you in making more feature-rich recommendations.

* [Code structure and style](../weaviate-core/structure.html)
* [CI/CD Philosophy](../weaviate-core/cicd.html)
* [Test philosophy of Weaviate](../weaviate-core/tests.html)