---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Modules
description: Modules
tags: ['configuration', 'modules']
menu-order: 1
open-graph-type: article
og: /img/og/og-documentation/configuration-modules.jpg
toc: true
---

# Introduction

Weaviate is completely modularized. The Core of Weaviate, without any modules attached, is a pure vector-native database and search engine. Data is stored as vectors, and these vectors are searchable by the provided [vector index algorithm](../vector-index-plugins/index.html). Without any modules attached, Weaviate does not know how to *vectorize* data, i.e. *how* to calculate the vectors from a data item. Depending on the type of data you want to store and search (text, images, etc.), and depending on the use case (like search, question answering, etc., depending on language, classification, ML model, training set, etc.), you can choose and attach a module that best fits your use case. 

## Default module

Unless you specify a default vectorization module in Weaviate's configuration, you'll need to specify which vectorization module is used per class you add to the data schema (or you need to enter a vector for each data point you add manually). Set the default with the environment variable `DEFAULT_VECTORIZER_MODULE` in the docker-compose configuration file, for example: 

``` yaml
services:
  weaviate:
    environment:
      DEFAULT_VECTORIZER_MODULE: text2vec-contextionary
```

# Text vectorizer Contextionary 

One vectorizer that is provided is [`text2vec-contextionary`](../modules/text2vec-contextionary.html). `text2vec-contextionary` is a text vectorizer that gives context to the textual data using a language model trained using [fasttext](https://fasttext.cc/) on Wiki data and CommonCrawl. More information can be found [here](../modules/text2vec-contextionary.html). The contextionary is a Weighted Mean of Word Embeddings (WMOWE) vectorizer module which works with popular models such as fastText and GloVe.

# Text vectorizer Transformers

Another type of text vectorization is possible with the [`text2vec-transformers`](../modules/text2vec-transformers.html) module.

_Note: at the moment, text vectorization modules can be combined in a single setup, but this will disable `Explore{}`. You can't use multiple models of the same module yet, this will be part of a future release (i.e. you can’t run `all-mpnet-base` and `t5` (both transformers models) in the same setup yet._

# Custom modules

Check [here](../modules/custom-modules.html) how you can create and use your own modules.

# More Resources

{% include docs-support-links.html %}
