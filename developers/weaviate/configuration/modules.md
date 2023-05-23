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

Weaviate is modularized for flexibility. You can enable and configure Weaviate's modules by setting appropriate [environment variables](../config-refs/env-vars.md) as shown below.

:::tip WCS instances come with modules pre-configured
Weaviate Cloud Services instances come with modules pre-configured. See [this page](../../wcs/index.mdx#configuration) for details.
:::

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
      ENABLE_MODULES: 'text2vec-huggingface,generative-cohere,qna-openai'
```

### Module-specific variables

Many of the available modules must be configured by setting additional environment variables. For example, the `backup-s3` module requires the backup S3 bucket to be set via `BACKUP_S3_BUCKET` , and the `text2vec-contextionary` module requires the inference API location via `TRANSFORMERS_INFERENCE_API`.

These variables and associated instructions are available in the [Modules](../modules/index.md) section, or in the relevant page within the current [Configuration](./index.md) section of the documentation.

## Vectorizer modules

Weaviate's [vectorization modules](../modules/retriever-vectorizer-modules/index.md) can be used to vectorize data at import, or perform [`near<Media>`](../search/similarity.md#an-input-medium) searches such as `nearText`.

### Enable vectorizer modules

Vectorizer modules can be enabled by adding the desired module to the `ENABLE_MODULES` environment variable. For example, the below will enable the `text2vec-cohere`, `text2vec-huggingface` and `text2vec-openai` vectorizer modules.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-cohere,text2vec-huggingface,text2vec-openai'
```

You can find a list of available vectorizer modules [in this section](../modules/retriever-vectorizer-modules/index).

### Default vectorizer module

You can specify a default vectorization module with the `DEFAULT_VECTORIZER_MODULE` variable as below.

If a default vectorizer module is not set, you must set a vectorizer in the schema before you can use `near<Media>` or vectorization at import time.

The below will set `text2vec-huggingface` as the default vectorizer. Thus, `text2vec-huggingface` module will be used unless another vectorizer is specified for that class.

``` yaml
services:
  weaviate:
    environment:
      DEFAULT_VECTORIZER_MODULE: text2vec-huggingface
```

:::caution Multiple vectorization modules & `Explore`
Combining text vectorization modules will disable `Explore{}`.
:::

## Generative modules

You can configure a [generative module](../modules/reader-generator-modules/index.md) to enable [generative search](../search/generative.md) functions in Weaviate.

You can see the list of available `generative-xxx` modules [in this section](../modules/reader-generator-modules/index.md)

### Enable a generative module

Generative modules can be enabled by adding the desired module to the `ENABLE_MODULES` environment variable. For example, the below will enable the `generative-cohere` module along with `text2vec-huggingface` vectorizer.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-huggingface,generative-cohere'
```

:::tip `generative` API provider unrelated to `text2vec` API provider
The `generative` inference API is separate to any `text2vec` configuration. Accordingly, your choice of the `text2vec` module does not restrict your choice of `generative` module.
:::

## Custom modules
See [here](../modules/other-modules/custom-modules.md) how you can create and use your own modules.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
