---
title: Modules
sidebar_position: 2
image: og/docs/concepts.jpg
# tags: ['modules']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

<!-- :::caution Migrated From:
- Combines theoretical explanations from `Configuration/Modules` + `Modules/Index`. e.g.:
  - `Introduction` is from `Configuration/Modules`
  - `Vectorization modules (Dense Retriever modules)` is from `Modules/Index`
::: -->

## Overview

This page explains what modules are, and what purpose they serve in Weaviate.

:::info Related pages
- [Configuration: Modules](../configuration/modules.md)
- [References: Modules](../modules/index.md)
:::

## Introduction

Weaviate adopts a modularized structure, where for examples functionalities such as vectorization or backups are carried out by *optional* modules.

The core of Weaviate, without any modules attached, is a pure vector-native database.
[![Weaviate modules introduction](./img/weaviate-module-diagram.svg "Weaviate Module Diagram")](./img/weaviate-module-diagram.svg)

Data is stored in Weaviate as the combination of an object and its vector, and these vectors are searchable by the provided [vector index algorithm](../concepts/vector-index.md). Without any vectorizer modules attached, Weaviate does not know how to *vectorize* an object, i.e. *how* to calculate the vectors given an object.

Depending on the type of data you want to store and search (text, images, etc.), and depending on the use case (like search, question answering, etc., depending on language, classification, ML model, training set, etc.), you can choose and attach a vectorizer module that best fits your use case. Or, you can "bring your own" vectors to Weaviate.

## Available module types

This graphic shows the available modules of the latest Weaviate version (v||site.weaviate_version||).

Broadly, we categorize them into one of:
- Vectorization modules,
- Vectorization + additional functionality modules, and
- Other modules

![Weaviate module ecosystem](./img/weaviate-modules.png "Weaviate module ecosystem")

### Vectorization modules (*Dense Retriever* modules)

Vectorization modules, like the `text2vec-*`, `multi2vec-*` or `img2vec-*` modules, transform data into vectors. These modules are also called "Dense Retriever" modules. Retrievers function as a filter to quickly find a relevant set of data to the query.

#### Dense retrievers vs. sparse retrievers
Sparse vector retrievers for the task of finding relevant data (by calculating the similarity of two pieces of data) in a database are for example TF-IDF or BM25. These retrievers are not trainable; instead they rely on word frequency in documents. This type of retrievers are not possible as Weaviate modules, because the implementation sits deep in the core of Weaviate (BM25 will be released soon!).

Dense vector retrievers are a relatively new approach to data retrieval, which usually outperforms traditional sparse retrieval methods because they take semantics into account and they are trainable. Dense vector retrievers can be chosen as Weaviate modules. Depending on the type of data you want to store and search (text, images, etc), and depending on the use case domain (science, healthcare, common daily language, etc), you can choose and attach a dense retriever (vectorization) module that best fits your use case.

### Modules with additional functionalities (*Reader* or *Generator* modules)

Reader or Generator modules can be used on top of a Retriever/Vectorization module. A Reader module takes the set of relevant documents that are retrieved by the Retriever module, and extracts a piece of relevant information per document. An example Reader module is [`qna-transformers`](../modules/reader-generator-modules/qna-transformers.md) module, which extracts an answer directly from a document that is retrieved by a Retriever module. A Generator module would, on the other hand, use *language generation* to generate an answer from the given document.

### Other modules

These include those such as `gcs-backup` or `text-spellcheck`.

## Dependencies

Modules can be dependent on other modules to be present. For example, to use the [`qna-transformers`](../modules/reader-generator-modules/qna-transformers.md) module, *exactly one* text vectorization module is required.

## Weaviate without modules

Weaviate can also be used without any modules, as pure vector native database and search engine. If you choose not to include any modules, you will need to enter a vector for each data entry. You can then search through the objects by a vector as well.

## Custom modules

It is possible for anyone to create a custom module for use with Weaviate. Click [here](../modules/other-modules/custom-modules.md) to see how you can create and use your own modules.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
