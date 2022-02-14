---
layout: layout-documentation
solution: weaviate
sub-menu: Modules
title: Custom modules
description: 
tags: ['Custom Modules']
menu-order: 5
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Introduction

You can add your own vectorizer or other module to your Weaviate instance! This page contains information for custom modules, but support to add them to Weaviate will be added soon. Stay tuned!

# Characteristics

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
- Which vectorizer and other modules are applied to which data classes is configured in the [schema](../data-schema/schema-configuration.html#vectorizer).


# Important notes
- The length of the vectors your vectorizer has influences later usage, for example if you're exploring your data by vector with the GraphQL explore filter, the length of this vector should match with the vector length of the data points. 


# More resources

{% include docs-support-links.html %}