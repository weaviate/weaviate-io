---
title: How to configure Weaviate
sidebar_position: 0
image: og/docs/configuration.jpg
# tags: ['configuration']
---


<!-- :::caution Migrated From:
- `Configuration`
- `Schema` is from `Schema/Schema configuration`
- `Data types` is from `Schema/Data types`
- `Distance metrics` from `Vector index plugins/Distance metrics`
- `Modules` is mostly new - the previous `Configuration/Modules` content has been migrated to `References:Modules/index`
- `Vector index` adds text re: configuration options from `Vector index plugins/HNSW`
::: -->

## Overview

This section shows you how to configure Weaviate to suit your specific needs.

For example, you can read about how to:

- Extend Weaviate's functionality by adding [modules](./modules.md), including vectorizers
- Configure how Weaviate stores and indexes data through its [schema](../manage-data/collections.mdx), [data type](../config-refs/datatypes.md) and [distance metric](../config-refs/distances.md)
- Manage performance vs. cost tradeoffs by its [vector index properties](/developers/weaviate/config-refs/schema/vector-index)
- [Back up](./backups.md) your Weaviate instance
- Control access through [authentication](./authentication.md) and [authorization](./authorization.md)
- [Monitor](./monitoring.md) your Weaviate instance

You do not need to read this section linearly. But we do recommend that you browse through this section so that you are aware of the available main customization options, including features that will help you to take it into production.
