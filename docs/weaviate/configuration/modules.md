---
title: Modules
sidebar_position: 4
# layout: layout-documentation
# solution: weaviate
# sub-menu: Configuration
# title: Modules
# description: Modules
# tags: ['configuration', 'modules']
# sidebar_position: 1
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.11.0/configuration/modules.html
---

# Introduction

Weaviate is completely modularized. The Core of Weaviate, without any modules attached, is a pure vector-native database and search engine.

<!-- [![Weaviate modules introduction](/img/weaviate-module-diagram.svg "Weaviate Module Diagram")](/img/weaviate-module-diagram.svg) -->

# Vectorizer Modules

Data is stored as the combination of an object and its vector, and these vectors are searchable by the provided [vector index algorithm](../vector-index-plugins/index.html). Without any vectorizer modules attached, Weaviate does not know how to *vectorize* an object, i.e. *how* to calculate the vectors given an object. Depending on the type of data you want to store and search (text, images, etc.), and depending on the use case (like search, question answering, etc., depending on language, classification, ML model, training set, etc.), you can choose and attach a vectorizer module that best fits your use case. 

## Default vectorizer module

Unless you specify a default vectorization module in Weaviate's configuration, you'll need to specify which vectorization module is used per class you add to the data schema (or you need to enter a vector for each data point you add manually). Set the default with the environment variable `DEFAULT_VECTORIZER_MODULE` in the docker-compose configuration file, for example: 

``` yaml
services:
  weaviate:
    environment:
      DEFAULT_VECTORIZER_MODULE: text2vec-contextionary
```

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

# Custom modules

Check [here](../other-modules/custom-modules.html) how you can create and use your own modules.

# More Resources

{% include docs-support-links.html %}
