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


Weaviate's functionality can be customized by using [modules](../concepts/modules.md). This page explains how to enable and configure modules.

## Instance-level configuration

At the instance (i.e. Weaviate cluster) level, you can:

- Enable modules
- Configure the default vectorizer module
- Configure module-specific variables (e.g. API keys), where applicable

This can be done by setting the appropriate [environment variables](../config-refs/env-vars.md) as shown below.

:::tip What about WCD?
Weaviate Cloud (WCD) instances come with modules pre-configured. See [this page](../../wcs/index.mdx#configuration) for details.
:::

### Enable individual modules

You can enable modules by specifying the list of modules in the `ENABLE_MODULES` variable. For example, this code enables the `text2vec-transformers` module.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-transformers'
```

To enable multiple modules, add them in a comma-separated list.

This example code enables the `'text2vec-huggingface`, `generative-cohere`, and `qna-openai` modules.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-huggingface,generative-cohere,qna-openai'
```

### Enable all API-based modules

:::caution Experimental feature
Available starting in `v1.26.0`. This is an experimental feature. Use with caution.
:::

You can enable all API-based modules by setting the `ENABLE_API_BASED_MODULES` variable to `true`. This will enable all API-based [model integrations](../model-providers/index.md), such as those for Anthropic, Cohere, OpenAI and so on by enabling the relevant modules. These modules are lightweight, so enabling them all will not significantly increase resource usage.

```yaml
services:
  weaviate:
    environment:
      ENABLE_API_BASED_MODULES: 'true'
```

The list of API-based modules can be found on the [model provider integrations page](../model-providers/index.md#api-based). You can also inspect the [source code](https://github.com/weaviate/weaviate/blob/main/adapters/handlers/rest/configure_api.go) where the list is defined.

This can be combined with enabling individual modules. For example, the example below enables all API-based modules, Ollama modules and the `backup-s3` module.

```yaml
services:
  weaviate:
    environment:
      ENABLE_API_BASED_MODULES: 'true'
      ENABLE_MODULES: 'text2vec-ollama,generative-ollama,backup-s3'
```

Note that enabling multiple vectorizer (e.g. `text2vec`, `multi2vec`) modules will disable the [`Explore` functionality](../api/graphql/explore.md). If you need to use `Explore`, you should only enable one vectorizer module.

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

## Tenant offload modules

### `offload-s3` module

The `offload-s3` module enables you to [offload tenants](../concepts/data.md#tenant-activity-status) to an S3 bucket.

To use the `offload-s3` module, add `offload-s3` to the `ENABLE_MODULES` environment variable.

```yaml
services:
  weaviate:
    environment:
      # highlight-start
      ENABLE_MODULES: 'text2vec-cohere,generative-cohere,offload-s3'
      # highlight-end
```

The `offload-s3` module reads the following environment variables:

- `OFFLOAD_S3_BUCKET`: The S3 bucket where `INACTIVE` tenants are offloaded.
    - The default is `weaviate-offload`.
    - If the bucket does not exist, and `OFFLOAD_S3_BUCKET_AUTO_CREATE` is set to `true`, Weaviate creates the bucket automatically.
- `OFFLOAD_S3_BUCKET_AUTO_CREATE`: When `true`, Weaviate automatically creates an S3 bucket if it does not exist. The default is `false`.
- `OFFLOAD_S3_CONCURRENCY`: The number of concurrent offload operations. The default is `25`.
- `OFFLOAD_TIMEOUT`: The timeout for offloading operations (create bucket, upload, download). The default is `120` (in seconds)
    - Offload operations are asynchronous. As a result, the timeout is for the operation to start, not to complete.
    - Each operation will retry up to 10 times on timeouts, except on authentication/authorization errors.

:::tip AWS permissions
The Weaviate instance must have the necessary permissions to access the S3 bucket.

- The provided AWS identity must be able to write to the bucket.
- If `OFFLOAD_S3_BUCKET_AUTO_CREATE` is set to `true`, the AWS identity must have permission to create the bucket.
:::

## Custom modules

See [here](../modules/other-modules/custom-modules.md) how you can create and use your own modules.

## Related pages
- [Concepts: Modules](../concepts/modules.md)
- [References: Modules](../modules/index.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
