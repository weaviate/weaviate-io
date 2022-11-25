---
title: Modules
sidebar_position: 5
# layout: layout-documentation
# solution: weaviate
# sub-menu: Modules
# nav-parent: Modules
# title: Modules
# description: Weaviate Modules
# tags: ['Modules']
# sidebar_position: 0
# open-graph-type: article
# toc: true
---

## Introduction

Weaviate is completely modularized. 

The core of Weaviate, without any modules attached, is a pure vector-native database and search engine. 
[![Weaviate modules introduction](./img/weaviate-module-diagram.svg "Weaviate Module Diagram")](./img/weaviate-module-diagram.svg)

Data is stored as the combination of an object and its vector, and these vectors are searchable by the provided [vector index algorithm](../vectorization/index.md). Without any vectorizer modules attached, Weaviate does not know how to *vectorize* an object, i.e. *how* to calculate the vectors given an object. Depending on the type of data you want to store and search (text, images, etc.), and depending on the use case (like search, question answering, etc., depending on language, classification, ML model, training set, etc.), you can choose and attach a vectorizer module that best fits your use case. 

## Available module types

<!-- TODO: Reminder to fix Jinja-type variables {{ site.xxx }} -->
This graphic shows the available modules of the latest Weaviate version ({{site.weaviate_version}}). 

Broadly, we categorize them into one of:
- Vectorization modules,
- Vectorization + additional functionality modules, and 
- Other modules

![Weaviate module ecosystem](./img/weaviate-modules.png "Weaviate module ecosystem")

### Vectorization modules (*Dense Retriever* modules)

Vectorization modules, like the [`text2vec-contextionary`](../modules/retriever-vectorizer-modules/text2vec-contextionary.md), [`text2vec-transformers`](../modules/retriever-vectorizer-modules/text2vec-transformers.md), [`text2vec-openai`](../modules/retriever-vectorizer-modules/text2vec-openai.md), [`multi2vec-clip`](../modules/retriever-vectorizer-modules/multi2vec-clip.md), and [`img2vec-neural`](../modules/retriever-vectorizer-modules/img2vec-neural.md), transform data into vectors. These modules are also called "Dense Retriever" modules. Retrievers function as a filter to quickly find a relevant set of data to the query.

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

# More Resources

{% include docs-support-links.html %}
