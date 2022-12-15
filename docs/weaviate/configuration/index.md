---
title: References - Configuration
sidebar_position: 0
# layout: layout-documentation
# solution: weaviate
# sub-menu: Configuration
# title: Configuration
# description: Configuration overview
# tags: ['configuration']
# sidebar_position: 0
# open-graph-type: article
# toc: false
# redirect_from:
#     - /documentation/weaviate/current/configuration/index.html
#     - /documentation/weaviate/current/configuration/
#     - /documentation/weaviate/current/setup/health_check.html
---

<!-- TODO: Remove explanatory header once layout review complete -->
:::caution Migrated From:
- `Configuration`
- `Schema` is from `Schema/Schema configuration`
- `Data types` is from `Schema/Data types`
- `Distance metrics` from `Vector index plugins/Distance metrics`
- `Modules` is mostly new - the previous `Configuration/Modules` content has been migrated to `References:Modules/index`
- `Vector index` adds text re: configuration options from `Vector index plugins/HNSW`
:::

## Overview

You can change Weaviate's configurations to suit your specific needs. 

For example, you can:

- Extend Weaviate's functionality by adding [modules](./modules.md), including vectorizers
- Configure how Weaviate stores and indexes data through its the [schema](./schema-configuration.md), [data type](./datatypes.md) and [distance metric](./distances.md)
- Manage performance vs. cost tradeoffs by its [vector index properties](./vector-index-type.md)
- [Back up](./backups.md) your Weaviate instance
- Control access through [authentication](./authentication.md) and [authorization](./authorization.md)
- [Monitor](./monitoring.md) your Weaviate instance

You do not need to read this section linearly. But we do recommend that you browse through this section so that you are aware of the available main customization options, including features that will help you to take it into production.
