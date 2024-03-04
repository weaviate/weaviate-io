---
title: Modules
sidebar_position: 11
image: og/docs/configuration.jpg
# tags: ['configuration', 'modules']
---


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

Weaviate's functionality can be customized by using [modules](../concepts/modules.md). This page explains how to enable and configure modules.

## Instance-level configuration

At the instance (i.e. Weaviate cluster) level, you can:

- Enable modules
- Configure the default vectorizer module
- Configure module-specific variables (e.g. API keys), where applicable

This can be done by setting the appropriate [environment variables](../config-refs/env-vars.md) as shown below.

:::tip What about WCS?
Weaviate Cloud Services (WCS) instances come with modules pre-configured. See [this page](../../wcs/index.mdx#configuration) for details.
:::

### Enable modules

You can enable modules by specifying the list of modules in the `ENABLE_MODULES` variable. For example, this code enables the `text2vec-contextionary` module.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-contextionary'
```

To enable multiple modules, add them in a comma-separated list.

This example code enables the `'text2vec-huggingface`, `generative-cohere`, and `qna-openai` modules.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-huggingface,generative-cohere,qna-openai'
```

### Module-specific variables

You may need to specify additional environment variables to configure each module where applicable. For example, the `backup-s3` module requires the backup S3 bucket to be set via `BACKUP_S3_BUCKET`, and the `text2vec-contextionary` module requires the inference API location via `TRANSFORMERS_INFERENCE_API`.

Refer to the individual [module documentation](../modules/index.md) for more details.

## Vectorizer modules

The [vectorization modules](../modules/retriever-vectorizer-modules/index.md) enable Weaviate to vectorize data at import, and to perform [`near<Media>`](../search/similarity.md#an-input-medium) searches such as `nearText` or `nearImage`.

:::info List of available vectorizer (`xxx2vec-xxx`) modules
Can be found [in this section](../modules/retriever-vectorizer-modules/index.md).
:::

### Enable vectorizer modules

You can enable vectorizer modules by adding them to the `ENABLE_MODULES` environment variable. For example, this code enables the `text2vec-cohere`, `text2vec-huggingface`, and `text2vec-openai` vectorizer modules.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-cohere,text2vec-huggingface,text2vec-openai'
```

### Default vectorizer module

You can specify a default vectorization module with the `DEFAULT_VECTORIZER_MODULE` variable as below.

If a default vectorizer module is not set, you must set a vectorizer in the schema before you can use `near<Media>` or vectorization at import time.

This code sets `text2vec-huggingface` as the default vectorizer. Thus, `text2vec-huggingface` module will be used unless another vectorizer is specified for that class.

``` yaml
services:
  weaviate:
    environment:
      DEFAULT_VECTORIZER_MODULE: text2vec-huggingface
```

## Generative modules

The [generative modules](../modules/reader-generator-modules/index.md) enable [generative search](../search/generative.md) functions.

:::info List of available generative (`generative-xxx`) modules
Can be found [in this section](../modules/reader-generator-modules/index.md).
:::

### Enable a generative module

You can enable generative modules by adding the desired module to the `ENABLE_MODULES` environment variable. For example, this code enables the `generative-cohere` module and the `text2vec-huggingface` vectorizer module.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-huggingface,generative-cohere'
```

:::tip `generative` module selection unrelated to `text2vec` module selection
Your choice of the `text2vec` module does not restrict your choice of `generative` module, or vice versa.
:::

## Custom modules
See [here](../modules/other-modules/custom-modules.md) how you can create and use your own modules.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
