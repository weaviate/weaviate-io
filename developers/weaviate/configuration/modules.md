---
title: Modules
sidebar_position: 11
image: og/docs/configuration.jpg
# tags: ['configuration', 'modules']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

<!-- :::caution Migrated From:
- Mostly newly written
- Previous `Configuration/Modules` content has been migrated to `References:Modules/index`
::: -->

:::info Related pages
- [Concepts: Modules](../concepts/modules.md)
- [References: Modules](../modules/index.md)
- [References: REST API: Modules](../api/rest/modules.md)
:::

## Introduction

Weaviate is modularized, which provides it and its users a great deal of flexibility. This also requires users to specify the desired optional Weaviate modules to be used the relevant configuration file, by setting appropriate [environment variables](../installation/docker-compose.md#environment-variables).

Some of the key environment variables in relation to module use are explained below.

### Enable modules

Provide the list of modules to be used to the `ENABLE_MODULES` variable. For example, the below will enable the `text2vec-contextionary` module.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-contextionary'
```

If multiple modules are to be used, each of them should be separate by a comma as shown below.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-contextionary,ner-transformers'
```

### Default vectorizer module

You can specify a default vectorization module in Weaviate's configuration with the environment variable `DEFAULT_VECTORIZER_MODULE` as below.

``` yaml
services:
  weaviate:
    environment:
      DEFAULT_VECTORIZER_MODULE: text2vec-contextionary
```

If a default vectorizer module is not set, you will need to specify for each class the vectorization module to be used (or use your own vectors).

:::caution Multiple vectorization modules
At the moment, text vectorization modules can be combined in a single setup, but this will disable `Explore{}`. You can't use multiple models of the same module yet, this will be part of a future release (i.e. you can’t run `all-mpnet-base` and `t5` (both transformers models) in the same setup yet.
:::

### Module-specific variables

Many of the available modules must be configured by setting additional environment variables. For example, the `backup-s3` module requires the backup S3 bucket to be set via `BACKUP_S3_BUCKET` , and the `text2vec-contextionary` module requires the inference API location via `TRANSFORMERS_INFERENCE_API`.

These variables and associated instructions are available in the [Modules](../modules/index.md) section, or in the relevant page within the current [Configuration](./index.md) section of the documentation.

## Custom modules
See [here](../modules/other-modules/custom-modules.md) how you can create and use your own modules.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
