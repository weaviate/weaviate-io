---
layout: layout-documentation
solution: weaviate
sub-menu: Modules
title: Modules
description: Weaviate Modules
tags: ['Modules']
menu-order: 0
open-graph-type: article
og: /img/og/og-documentation/modules-index.jpg
toc: true
---

# Introduction

Weaviate is completely modularized. The Core of Weaviate, without any modules attached, is a pure vector-native database and search engine. Data is stored as vectors, and these vectors are searchable by the provide [vector index (ANN) algorithm](../vector-index-plugins/index.html). The functionality of the vector-native database can be enriched by modules. One or more modules can be attached, for example to *vectorize* data or other functionalities like *question answering*. 

## Vectorization modules

Vectorization modules, like the [`text2vec-contextionary`](./text2vec-contextionary.html), [`text2vec-transformers`](./text2vec-transformers.html), [`text2vec-openai`](./text2vec-openai.html), [`multi2vec-clip`](./multi2vec-clip.html), and [`img2vec-neural`](./img2vec-neural.html), transform data into vectors. Depending on the type of data you want to store and search (text, images, etc), and depending on the use case domain (science, healthcare, common daily language, etc), you can choose and attach a module that best fits your use case.

## Modules with additional functionalities

Modules can also add a certain functionality to Weaviate. For example, the [`qna-transformers`](./qna-transformers.html) module adds a question answering feature, which can be used to query data using GraphQL.

## Custom modules

Check [here](./custom-modules.html) how you can create and use your own modules.

## Dependencies

Modules can be dependent on other modules to be present. For example, to use the [`qna-transformers`](./qna-transformers.html) module, *exactly one* text vectorization module is required.

# Module ecosystem

This graphic shows the available modules.

![Weaviate {{ site.weaviate_version }} module ecosystem](/img/weaviate-modules-{{ site.weaviate_version }}.png "Weaviate {{ site.weaviate_version }} module ecosystem")

# Characteristics

Modules can be "vectorizers" (defines how the numbers in the vectors are chosen from the data) or other modules providing additional functions like question answering, custom classification, etc. Modules have the following characteristics:
- Naming convention: 
  - Vectorizer: `<media>2vec-<name>-<optional>`, for example `text2vec-contextionary`, `image2vec-RESNET` or `text2vec-transformers`.
  - Other modules: `<functionality>-<name>-<optional>`, for example `qna-transformers`. 
  - A module name must be url-safe, meaning it must not contain any characters which would require url-encoding.
  - A module name is not case-sensitive. `text2vec-bert` would be the same module as `text2vec-BERT`.
- Module information is accessible through the [`v1/modules/<module-name>/<module-specific-endpoint>` RESTful endpoint](../restful-api-references/modules.html).
- General module information (which modules are attached, version, etc.) is accessible through Weaviate's [`v1/meta` endpoint](../restful-api-references/meta.html).
- Modules can add `additional` properties in the RESTful API and [`_additional` properties in the GraphQL API](../graphql-references/additional-properties.html).
- A module can add [filters](../graphql-references/filters.html) in GraphQL queries.
- Which vectorizer and other modules are applied to which data classes is configured in the [schema](../data-schema/schema-configuration.html#vectorizer).

# Weaviate without modules

Weaviate can also be used without any modules, as pure vector native database and search engine. If you choose not to include any modules, you will need to enter a vector for each data entry. You can then search through the objects by a vector as well. 


# More Resources

{% include docs-support-links.html %}