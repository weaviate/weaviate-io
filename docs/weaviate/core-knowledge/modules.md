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

# Introduction

Weaviate is completely modularized. The Core of Weaviate, without any modules attached, is a pure vector-native database and search engine. Data is stored as vectors, and these vectors are searchable by the provided [vector index (ANN) algorithm](../vector-index-plugins/index.html). The functionality of the vector-native database can be enriched by modules. One or more modules can be attached, for example to *vectorize* data (dense retrievers) or other functionalities like *question answering* (reader/generator modules). Retriever modules are used to quickly find a relevant set of data to the query, which then can be passed to a Reader or Generator module to enhance the search results.

## Vectorization modules (*Dense Retriever* modules)

Vectorization modules, like the [`text2vec-contextionary`](../retriever-vectorizer-modules/text2vec-contextionary.html), [`text2vec-transformers`](../retriever-vectorizer-modules/text2vec-transformers.html), [`text2vec-openai`](../retriever-vectorizer-modules/text2vec-openai.html), [`multi2vec-clip`](../retriever-vectorizer-modules/multi2vec-clip.html), and [`img2vec-neural`](../retriever-vectorizer-modules/img2vec-neural.html), transform data into vectors. These modules are also called "Dense Retriever" modules. Retrievers function as a filter to quickly find a relevant set of data to the query.

### Dense retrievers vs. sparse retrievers
Sparse vector retrievers for the task of finding relevant data (by calculating the similarity of two pieces of data) in a database are for example TF-IDF or BM25. These retrievers are not trainable; instead they rely on word frequency in documents. This type of retrievers are not possible as Weaviate modules, because the implementation sits deep in the core of Weaviate (BM25 will be released soon!). 
Dense vector retrievers are a relatively new approach to data retrieval, which usually outperforms traditional sparse retrieval methods because they take semantics into account and they are trainable. Dense vector retrievers can be chosen as Weaviate modules. Depending on the type of data you want to store and search (text, images, etc), and depending on the use case domain (science, healthcare, common daily language, etc), you can choose and attach a dense retriever (vectorization) module that best fits your use case.

## Modules with additional functionalities (*Reader* or *Generator* modules)

Reader or Generator modules can be used on top of a Retriever/Vectorization module. A Reader module takes the set of relevant documents that are retrieved by the Retriever module, and extracts a piece of relevant information per document. An example Reader module is [`qna-transformers`](./qna-transformers.html) module, which extracts an answer directly from a document that is retrieved by a Retriever module. A Generator module would, on the other hand, use *language generation* to generate an answer from the given document. Currently, there are no Generator modules available out-of-the-box yet, but they [may be added soon](https://github.com/semi-technologies/weaviate/issues/1831)!

## Custom modules

Check [here](../other-modules/custom-modules.html) how you can create and use your own modules.

## Default vectorizer module

Unless you specify a default vectorization module in Weaviate's configuration, you'll need to specify which vectorization module is used per class you add to the data schema (or you need to enter a vector for each data point you add manually). Set the default with the environment variable `DEFAULT_VECTORIZER_MODULE` to `text2vec-contextionary` in the docker-compose configuration file: 

``` yaml
services:
  weaviate:
    environment:
      DEFAULT_VECTORIZER_MODULE: text2vec-contextionary
```

## Dependencies

Modules can be dependent on other modules to be present. For example, to use the [`qna-transformers`](./qna-transformers.html) module, *exactly one* text vectorization module is required.

# Module ecosystem

This graphic shows the available modules of the latest Weaviate version ({{site.weaviate_version}}). 

<!-- ![Weaviate module ecosystem](/img/weaviate-modules.png "Weaviate module ecosystem") -->

# Characteristics

Modules can be "vectorizers" (defines how the numbers in the vectors are chosen from the data) or other modules providing additional functions like question answering, custom classification, etc. Modules have the following characteristics:
- Naming convention: 
  - Vectorizer (Retriever module): `<media>2vec-<name>-<optional>`, for example `text2vec-contextionary`, `image2vec-RESNET` or `text2vec-transformers`.
  - Other modules: `<functionality>-<name>-<optional>`, for example `qna-transformers`. 
  - A module name must be url-safe, meaning it must not contain any characters which would require url-encoding.
  - A module name is not case-sensitive. `text2vec-bert` would be the same module as `text2vec-BERT`.
- Module information is accessible through the [`v1/modules/<module-name>/<module-specific-endpoint>` RESTful endpoint](../restful-api-references/modules.html).
- General module information (which modules are attached, version, etc.) is accessible through Weaviate's [`v1/meta` endpoint](../restful-api-references/meta.html).
- Modules can add `additional` properties in the RESTful API and [`_additional` properties in the GraphQL API](../graphql-references/additional-properties.html).
- A module can add [filters](../graphql-references/filters.html) in GraphQL queries.
- Which vectorizer and other modules are applied to which data classes is configured in the [schema](../schema/schema-configuration.html#vectorizer).

# Weaviate without modules

Weaviate can also be used without any modules, as pure vector native database and search engine. If you choose not to include any modules, you will need to enter a vector for each data entry. You can then search through the objects by a vector as well. 




:::note

TAKEN FROM CONFIG/MODULES - TO BE MERGED INTO THIS

The Core of Weaviate, without any modules attached, is a pure vector-native database and search engine.

[![Weaviate modules introduction](./img/weaviate-module-diagram.svg "Weaviate Module Diagram")](./img/weaviate-module-diagram.svg)

# Vectorizer Modules

Data is stored as the combination of an object and its vector, and these vectors are searchable by the provided [vector index algorithm](../vector-index-plugins/index.html). Without any vectorizer modules attached, Weaviate does not know how to *vectorize* an object, i.e. *how* to calculate the vectors given an object. Depending on the type of data you want to store and search (text, images, etc.), and depending on the use case (like search, question answering, etc., depending on language, classification, ML model, training set, etc.), you can choose and attach a vectorizer module that best fits your use case. 

## Text vectorizer: Contextionary 

One vectorizer that is provided is [`text2vec-contextionary`](../modules/text2vec-contextionary.html). `text2vec-contextionary` is a text vectorizer that gives context to the textual data using a language model trained using [fasttext](https://fasttext.cc/) on Wiki data and CommonCrawl. More information can be found [here](../modules/text2vec-contextionary.html). The contextionary is a Weighted Mean of Word Embeddings (WMOWE) vectorizer module which works with popular models such as fastText and GloVe.

## Text vectorizer: Transformers

Another type of text vectorization is possible with the [`text2vec-transformers`](../modules/text2vec-transformers.html) module.

_Note: at the moment, text vectorization modules can be combined in a single setup, but this will disable `Explore{}`. You can't use multiple models of the same module yet, this will be part of a future release (i.e. you can’t run `all-mpnet-base` and `t5` (both transformers models) in the same setup yet._

# Backup Provider Modules

Backup and restore operations in Weaviate are facilitated by the use of backup provider modules. These are interchangeable storage backends which exist either internally or externally. The following sections will explain the difference between these two types of backup provider modules, and their intended usages.

## External provider

External backup providers coordinate the storage and retrieval of backed-up Weaviate data with external storage services. 

This type of provider is ideal for production environments. This is because storing the backup data outside of a Weaviate instance decouples the availability of the backup from the Weaviate instance itself. In the event of an unreachable node, the backup is still available. 

Additionally, multi-node Weaviate clusters _require_ the use of an external provider. Storing a multi-node backup on internally on a single node presents several issues, like significantly reducing the durability and availability of the backup, and is not supported.

As of Weaviate `v1.16`, the supported external backup providers are:
- [S3](/developers/weaviate/current/configuration/backups.html#s3-aws-or-s3-compatible)
- [GCS](/developers/weaviate/current/configuration/backups.html#gcs-google-cloud-storage)

Thanks to the extensibility of the module system, new providers can be readily added. If you are interested in an external provider other than the ones listed above, feel free to reach out via our [community Slack channel](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw), or open an issue on [GitHub](https://github.com/semi-technologies/weaviate).

## Internal provider

Internal providers coordinate the storage and retrieval of backed-up Weaviate data within a Weaviate instance. This type of provider is intended for developmental or experimental use, and is not recommended for production. Internal Providers are not compatible for multi-node backups, which require the use of an external provider.

As of Weaviate `v1.16`, the only supported internal backup provider is the [filesystem](/developers/weaviate/current/configuration/backups.html#filesystem) provider.


:::




# More Resources

{% include docs-support-links.html %}
