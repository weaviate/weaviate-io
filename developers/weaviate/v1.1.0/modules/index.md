---
layout: layout-documentation
solution: weaviate
sub-menu: Modules
title: Modules
description: Modules
tags: ['Modules']
menu-order: 0
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Introduction

Weaviate is completely modularized. The Core of Weaviate, without any modules attached, is a pure vector-native database and search engine. Data is stored as vectors, and these vectors are searchable by the provide [vector index algorithm](../vector-index-plugins/index.html). Without any modules attached, Weaviate does not know how to *vectorize* data, i.e. *how* to calculate the vectors from a data item. Depending on the type of data you want to store and search (text, images, etc), and depending on the use case (like search, question answering, etc, depending on language, classification, ML model, training set, etc), you can choose and attach a module that best fits your use case. 

# Characteristics

Modules can be "vectorizers" (defines how the numbers in the vectors are chosen from the data) or other modules providing additional functions like question answering, custom classification, etc. Modules have the following characteristics:
- Naming convention: 
  - Vectorizer: `<media>2vec-<name>-<optional>`, for example `text2vec-contextionary`, `image2vec-RESNET` or `text2vec-BERT-transformer-hyperfoo`.
  - Other modules: `<functionality>-<name>-<optional>`.
  - A module name must be url-safe, meaning it must not contain any characters which would require url-encoding.
  - A module name is not case-sensitive. `text2vec-bert` would be the same module as `text2vec-BERT`.
- Module information is accessible through the [`v1/modules/<module-name>/<module-specific-endpoint>` RESTful endpoint](../restful-api-references/modules.html).
- General module information (which modules are attached, version, etc.) is accessible through Weaviate's [`v1/meta` endpoint](../restful-api-references/meta.html).
- Modules can add `additional` properties in the RESTful API and [`_additional` properties in the GraphQL API](../graphql-references/additional-properties.html).
- A module can add [filters](../graphql-references/filters.html) in GraphQL queries.
- Which vectorizer and other modules are applied to which data classes is configured in the [schema](../data-schema/schema-configuration.html#vectorizer).

# Text vectorizer Contextionary

One vectorizer that is provided is [`text2vec-contextionary`](./text2vec-contextionary.html). `text2vec-contextionary` is a text vectorizer that gives context to the textual data using a language model trained using [fasttext](https://fasttext.cc/) on Wiki data and CommonCrawl. More information can be found [here](./text2vec-contextionary.html).

# Custom modules

Custom modules will soon be supported, more information can be found [here](./custom-modules.html). Stay tuned!


# More Resources

{% include docs-support-links.html %}