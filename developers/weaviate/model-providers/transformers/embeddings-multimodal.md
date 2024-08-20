---
title: Multimodal (CLIP) Embeddings
sidebar_position: 30
image: og/docs/integrations/provider_integrations_transformers.jpg
# tags: ['model providers', 'transformers', 'embeddings']
---

# Locally Hosted CLIP Embeddings + Weaviate

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.local.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.local.ts';
import PyCode from '!!raw-loader!../_includes/provider.vectorizer.py';
import TSCode from '!!raw-loader!../_includes/provider.vectorizer.ts';

Weaviate's integration with the Hugging Face Transformers library allows you to access their CLIP models' capabilities directly from Weaviate.

[Configure a Weaviate vector index](#configure-the-vectorizer) to use the CLIP integration, and [configure the Weaviate instance](#weaviate-configuration) with a model image, and Weaviate will generate embeddings for various operations using the specified model in the CLIP inference container. This feature is called the *vectorizer*.

At [import time](#data-import), Weaviate generates multimodal object embeddings and saves them into the index. For [vector](#vector-near-text-search) and [hybrid](#hybrid-search) search operations, Weaviate converts queries of one or more modalities into embeddings.

![Embedding integration illustration](../_includes/integration_transformers_embedding.png)

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the CLIP vectorizer integration (`multi2vec-clip`) module.

<details>
  <summary>For Weaviate Cloud (WCD) users</summary>

This integration is not available for Weaviate Cloud (WCD) serverless instances, as it requires spinning up a container with the Hugging Face model.

</details>

#### Enable the integration module

- Check the [cluster metadata](../../config-refs/meta.md) to verify if the module is enabled.
- Follow the [how-to configure modules](../../configuration/modules.md) guide to enable the module in Weaviate.

#### Configure the integration

To use this integration, you must configure the container image of the CLIP model, and the inference endpoint of the containerized model.

The following example shows how to configure the CLIP integration in Weaviate:

<Tabs groupId="languages">
<TabItem value="docker" label="Docker">

#### Docker Option 1: Use a pre-configured `docker-compose.yml` file

Follow the instructions on the [Weaviate Docker installation configurator](../../installation/docker-compose.md#configurator) to download a pre-configured `docker-compose.yml` file with a selected model
<br/>

#### Docker Option 2: Add the configuration manually

Alternatively, add the configuration to the `docker-compose.yml` file manually as in the example below.

```yaml
version: '3.4'
services:
  weaviate:
    # Other Weaviate configuration
    environment:
      CLIP_INFERENCE_API: http://multi2vec-clip:8080  # Set the inference API endpoint
  multi2vec-clip:  # Set the name of the inference container
    image: cr.weaviate.io/semitechnologies/multi2vec-clip:sentence-transformers-clip-ViT-B-32-multilingual-v1
    environment:
      ENABLE_CUDA: 0  # Set to 1 to enable
```

- `CLIP_INFERENCE_API` environment variable sets the inference API endpoint
- `multi2vec-clip` is the name of the inference container
- `image` is the container image
- `ENABLE_CUDA` environment variable enables GPU usage

Set `image` from a [list of available models](#available-models) to specify a particular model to be used.

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Configure the Hugging Face Transformers integration in Weaviate by adding or updating the `multi2vec-clip` module in the `modules` section of the Weaviate Helm chart values file. For example, modify the `values.yaml` file as follows:

```yaml
modules:

  multi2vec-clip:

    enabled: true
    tag: sentence-transformers-clip-ViT-B-32-multilingual-v1
    repo: semitechnologies/multi2vec-clip
    registry: cr.weaviate.io
    envconfig:
      enable_cuda: true
```

See the [Weaviate Helm chart](https://github.com/weaviate/weaviate-helm/blob/master/weaviate/values.yaml) for an example of the `values.yaml` file including more configuration options.

Set `tag` from a [list of available models](#available-models) to specify a particular model to be used.

</TabItem>
</Tabs>

### Credentials

As this integration runs a local container with the CLIP model, no additional credentials (e.g. API key) are required. Connect to Weaviate as usual, such as in the examples below.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START BasicInstantiation"
      endMarker="# END BasicInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START BasicInstantiation"
      endMarker="// END BasicInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

## Configure the vectorizer

[Configure a Weaviate index](../../manage-data/collections.mdx#specify-a-vectorizer) to use a CLIP embedding model by setting the vectorizer as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BasicMMVectorizerCLIP"
      endMarker="# END BasicMMVectorizerCLIP"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START BasicMMVectorizerCLIP"
      endMarker="// END BasicMMVectorizerCLIP"
      language="ts"
    />
  </TabItem>

</Tabs>

:::note Model selection via container image used
Model selection in this integration is done by selecting the appropriate [container image in the integration](#configure-the-integration).
:::

## Data import

After configuring the vectorizer, [import data](../../manage-data/import.mdx) into Weaviate. Weaviate generates embeddings for the objects using the specified model.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START MMBatchImportExample"
      endMarker="# END MMBatchImportExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START MMBatchImportExample"
      endMarker="// END MMBatchImportExample"
      language="ts"
    />
  </TabItem>

</Tabs>

:::tip Re-use existing vectors
If you already have a compatible model vector available, you can provide it directly to Weaviate. This can be useful if you have already generated embeddings using the same model and want to use them in Weaviate, such as when migrating data from another system.
:::

## Searches

Once the vectorizer is configured, Weaviate will perform vector and hybrid search operations using the specified CLIP model.

![Embedding integration at search illustration](../_includes/integration_transformers_embedding_search.png)

### Vector (near text) search

When you perform a [vector search](../../search/similarity.md#search-with-text), Weaviate converts the text query into an embedding using the specified model and returns the most similar objects from the database.

The query below returns the `n` most similar objects from the database, set by `limit`.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START NearTextExample"
      endMarker="# END NearTextExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START NearTextExample"
      endMarker="// END NearTextExample"
      language="ts"
    />
  </TabItem>

</Tabs>

### Hybrid search

:::info What is a hybrid search?
A hybrid search performs a vector search and a keyword (BM25) search, before [combining the results](../../search/hybrid.md#change-the-ranking-method) to return the best matching objects from the database.
:::

When you perform a [hybrid search](../../search/hybrid.md), Weaviate converts the text query into an embedding using the specified model and returns the best scoring objects from the database.

The query below returns the `n` best scoring objects from the database, set by `limit`.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START HybridExample"
      endMarker="# END HybridExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START HybridExample"
      endMarker="// END HybridExample"
      language="ts"
    />
  </TabItem>

</Tabs>

### Vector (near media) search

When you perform a media search such as a [near image search](../../search/similarity.md#search-with-image), Weaviate converts the query into an embedding using the specified model and returns the most similar objects from the database.

To perform a near media search such as near image search, convert the media query into a base64 string and pass it to the search query.

The query below returns the `n` most similar objects to the input image from the database, set by `limit`.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START NearImageExample"
      endMarker="# END NearImageExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START NearImageExample"
      endMarker="// END NearImageExample"
      language="ts"
    />
  </TabItem>

</Tabs>

## References

### Vectorizer parameters

#### Inference URL parameters

Optionally, if your stack includes multiple inference containers, specify the inference container(s) to use with a collection.

If no parameters are specified, the default inference URL from the Weaviate configuration is used.

Specify `inferenceUrl` for a single inference container.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FullMMVectorizerCLIP"
      endMarker="# END FullMMVectorizerCLIP"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START FullMMVectorizerCLIP"
      endMarker="// END FullMMVectorizerCLIP"
      language="ts"
    />
  </TabItem>

</Tabs>

### Available models

Lists of pre-built Docker images for this integration are below.

| Model Name | Image Name | Notes |
| --- | --- | --- |
| sentence-transformers-clip-ViT-B-32 | `cr.weaviate.io/semitechnologies/multi2vec-clip:sentence-transformers-clip-ViT-B-32` | Texts must be in English. (English, 768d) |
| sentence-transformers-clip-ViT-B-32-multilingual-v1 | `cr.weaviate.io/semitechnologies/multi2vec-clip:sentence-transformers-clip-ViT-B-32-multilingual-v1` | Supports a wide variety of languages for text. See sbert.net for details. (Multilingual, 768d) |
| openai-clip-vit-base-patch16 | `cr.weaviate.io/semitechnologies/multi2vec-clip:openai-clip-vit-base-patch16` | The base model uses a ViT-B/16 Transformer architecture as an image encoder and uses a masked self-attention Transformer as a text encoder. |
| ViT-B-16-laion2b_s34b_b88k | `cr.weaviate.io/semitechnologies/multi2vec-clip:ViT-B-16-laion2b_s34b_b88k` | The base model uses a ViT-B/16 Transformer architecture as an image encoder trained with LAION-2B dataset using OpenCLIP. |
| ViT-B-32-quickgelu-laion400m_e32 | `cr.weaviate.io/semitechnologies/multi2vec-clip:ViT-B-32-quickgelu-laion400m_e32` | The base model uses a ViT-B/32 Transformer architecture as an image encoder trained with LAION-400M dataset using OpenCLIP. |
| xlm-roberta-base-ViT-B-32-laion5b_s13b_b90k | `cr.weaviate.io/semitechnologies/multi2vec-clip:xlm-roberta-base-ViT-B-32-laion5b_s13b_b90k` | Uses ViT-B/32 xlm roberta base model trained with the LAION-5B dataset using OpenCLIP. |

## Advanced configuration

### Run a separate inference container

As an alternative, you can run the inference container independently from Weaviate. To do so, follow these steps:

- Enable `multi2vec-clip` and omit `multi2vec-clip` container parameters in your [Weaviate configuration](#weaviate-configuration)
- Run the inference container separately, e.g. using Docker, and
- Use `CLIP_INFERENCE_API` or [`inferenceUrl`](#configure-the-vectorizer) to set the URL of the inference container.

For example, run the container with Docker:

```shell
docker run -itp "8000:8080" semitechnologies/multi2vec-clip:sentence-transformers-clip-ViT-B-32-multilingual-v1
```

Then, set `CLIP_INFERENCE_API="http://localhost:8000"`. If Weaviate is part of the same Docker network, as a part of the same `docker-compose.yml` file, you can use the Docker networking/DNS, such as `CLIP_INFERENCE_API=http://multi2vec-clip:8080`.

## Further resources

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. See the following model-agnostic examples:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### Model licenses

Each of the compatible models has its own license. For detailed information, review the license for the model you are using in the [Hugging Face Model Hub](https://huggingface.co/models).

It is your responsibility to evaluate whether the terms of its license(s), if any, are appropriate for your intended use.

### External resources

- Hugging Face [Model Hub](https://huggingface.co/models)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
