---
title: References - Modules
sidebar_position: 0
image: og/docs/modules/_title.jpg
# tags: ['modules']
---

<!-- :::caution Migrated From:
- `Modules`
- High-level configuration options are now in `Configuration/Modules`
- Some theoretical elements are now in `Concepts:Essential/Modules`
::: -->

This section describes Weaviate's individual modules, including their capabilities and how to use them.

- The Vectorizer (also called Retrievers sometimes) modules such as `text2vec-*` or `img2vec-*` convert data objects and query inputs to vectors.
- The (Re)Ranker modules such as `rerank-*` apply a(n) (additional) ranking process to the search results.
- The Reader & Generator modules process data after retrieving the data from Weaviate, such as to answer questions or summarize text.
- The other modules include everything else, such as a spellcheck module.

## General

Modules can be "vectorizers" (defines how the numbers in the vectors are chosen from the data) or other modules providing additional functions like question answering, custom classification, etc. Modules have the following characteristics:
- Naming convention:
  - Vectorizer (Retriever module): `<media>2vec-<name>-<optional>`, for example `text2vec-contextionary`, `img2vec-neural` or `text2vec-transformers`.
  - Other modules: `<functionality>-<name>-<optional>`, for example `qna-transformers`.
  - A module name must be url-safe, meaning it must not contain any characters which would require url-encoding.
  - A module name is not case-sensitive. `text2vec-bert` would be the same module as `text2vec-BERT`.
- Module information is accessible through the [`v1/modules/<module-name>/<module-specific-endpoint>` RESTful endpoint](../api/rest/modules.md).
- General module information (which modules are attached, version, etc.) is accessible through Weaviate's [`v1/meta` endpoint](../api/rest/meta.md).
- Modules can add `additional` properties in the RESTful API and [`_additional` properties in the GraphQL API](../api/graphql/additional-properties.md).
- A module can add [filters](../api/graphql/filters.md) in GraphQL queries.
- Which vectorizer and other modules are applied to which data classes is configured in the [schema](../manage-data/collections.mdx#specify-a-vectorizer).

## Default vectorizer module

Unless you specify a default vectorization module in Weaviate's configuration, you'll need to specify which vectorization module is used per class you add to the data schema (or you need to enter a vector for each data point you add manually). Set the default with the environment variable `DEFAULT_VECTORIZER_MODULE` to `text2vec-contextionary` in the Docker Compose file:

``` yaml
services:
  weaviate:
    environment:
      DEFAULT_VECTORIZER_MODULE: text2vec-contextionary
```

## Multiple vectors

import MultiVectorSupport from '/_includes/multi-vector-support.mdx';

<MultiVectorSupport />

## Backup Modules

Backup and restore operations in Weaviate are facilitated by the use of backup provider modules.

These are interchangeable storage backends which exist either internally or externally. The following sections will explain the difference between these two types of backup provider modules, and their intended usages.

## External provider

External backup providers coordinate the storage and retrieval of backed-up Weaviate data with external storage services.

This type of provider is ideal for production environments. This is because storing the backup data outside of a Weaviate instance decouples the availability of the backup from the Weaviate instance itself. In the event of an unreachable node, the backup is still available.

Additionally, multi-node Weaviate clusters _require_ the use of an external provider. Storing a multi-node backup on internally on a single node presents several issues, like significantly reducing the durability and availability of the backup, and is not supported.

The supported external backup providers are:
- [S3](/developers/weaviate/configuration/backups.md#s3-aws-or-s3-compatible)
- [GCS](/developers/weaviate/configuration/backups.md#gcs-google-cloud-storage)
- [Azure](/developers/weaviate/configuration/backups.md#azure-storage)

Thanks to the extensibility of the module system, new providers can be readily added. If you are interested in an external provider other than the ones listed above, feel free to reach out via our [forum](https://forum.weaviate.io/), or open an issue on [GitHub](https://github.com/weaviate/weaviate).

## Internal provider

Internal providers coordinate the storage and retrieval of backed-up Weaviate data within a Weaviate instance. This type of provider is intended for developmental or experimental use, and is not recommended for production. Internal Providers are not compatible for multi-node backups, which require the use of an external provider.

As of Weaviate `v1.16`, the only supported internal backup provider is the [filesystem](/developers/weaviate/configuration/backups.md#filesystem) provider.

## Related pages

- [Configuration: Modules](../configuration/modules.md)
- [Concepts: Modules](../concepts/modules.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
