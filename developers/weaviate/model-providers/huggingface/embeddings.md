---
title: Embeddings
sidebar_position: 20
image: og/docs/integrations/provider_integrations_huggingface.jpg
# tags: ['model providers', 'huggingface', 'embeddings']
---

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.vectorizer.py';
import TSCode from '!!raw-loader!../_includes/provider.vectorizer.ts';

# Hugging Face Embeddings with Weaviate

Weaviate's integration with Hugging Face's APIs allows you to access their models' capabilities directly from Weaviate.

[Configure a Weaviate vector index](#configure-the-vectorizer) to use an Hugging Face Hub embedding model, and Weaviate will generate embeddings for various operations using the specified model and your Hugging Face API key. This feature is called the *vectorizer*.

At [import time](#data-import), Weaviate generates text object embeddings and saves them into the index. For [vector](#vector-near-text-search) and [hybrid](#hybrid-search) search operations, Weaviate converts text queries into embeddings.

![Embedding integration illustration](../_includes/integration_huggingface_embedding.png)

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the Hugging Face vectorizer integration (`text2vec-huggingface`) module.

<details>
  <summary>For Weaviate Cloud (WCD) users</summary>

This integration is enabled by default on Weaviate Cloud (WCD) serverless managed instances.

</details>

<details>
  <summary>For self-hosted users</summary>

- Check the [cluster metadata](../../config-refs/meta.md) to verify if the module is enabled.
- Follow the [how-to configure modules](../../configuration/modules.md) guide to enable the module in Weaviate.

</details>

### API credentials

You must provide a valid Hugging Face API key to Weaviate for this integration. Go to [Hugging Face](https://huggingface.co/docs/api-inference/en/quicktour) to sign up and obtain an API key.

Provide the API key to Weaviate using one of the following methods:

- Set the `HUGGINGFACE_APIKEY` environment variable that is available to Weaviate.
- Provide the API key at runtime, as shown in the examples below.

<Tabs groupId="languages">

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START HuggingFaceInstantiation"
      endMarker="# END HuggingFaceInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START HuggingFaceInstantiation"
      endMarker="// END HuggingFaceInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

## Configure the vectorizer

[Configure a Weaviate index](../../manage-data/collections.mdx#specify-a-vectorizer) to use a Hugging Face embedding model by setting the vectorizer as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BasicVectorizerHuggingFace"
      endMarker="# END BasicVectorizerHuggingFace"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START BasicVectorizerHuggingFace"
      endMarker="// END BasicVectorizerHuggingFace"
      language="ts"
    />
  </TabItem>

</Tabs>

You must [specify](#vectorizer-parameters) one of the [available models](#available-models) for the vectorizer to use.

## Data import

After configuring the vectorizer, [import data](../../manage-data/import.mdx) into Weaviate. Weaviate generates embeddings for text objects using the specified model.

<Tabs groupId="languages">

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BatchImportExample"
      endMarker="# END BatchImportExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START BatchImportExample"
      endMarker="// END BatchImportExample"
      language="ts"
    />
  </TabItem>

</Tabs>

:::tip Re-use existing vectors
If you already have a compatible model vector available, you can provide it directly to Weaviate. This can be useful if you have already generated embeddings using the same model and want to use them in Weaviate, such as when migrating data from another system.
:::

## Searches

Once the vectorizer is configured, Weaviate will perform vector and hybrid search operations using the specified Hugging Face model.

![Embedding integration at search illustration](../_includes/integration_huggingface_embedding_search.png)

### Vector (near text) search

When you perform a [vector search](../../search/similarity.md#search-with-text), Weaviate converts the text query into an embedding using the specified model and returns the most similar objects from the database.

The query below returns the `n` most similar objects from the database, set by `limit`.

<Tabs groupId="languages">

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START NearTextExample"
      endMarker="# END NearTextExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS (Beta)">
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

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START HybridExample"
      endMarker="# END HybridExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START HybridExample"
      endMarker="// END HybridExample"
      language="ts"
    />
  </TabItem>

</Tabs>

## References

### Vectorizer parameters

The following examples show how to configure Hugging Face-specific options.

#### Model selection parameters

Only select one of the following parameters to specify the model:

- `model`,
- `passageModel` and `queryModel`, or
- `endpointURL`

:::note Differences between `model`, `passageModel`/`queryModel` and `endpointURL`
The `passageModel` and `queryModel` parameters are used together to specify a [DPR](https://huggingface.co/docs/transformers/en/model_doc/dpr) passage and query model.

The `endpointURL` parameter is used to specify a [custom Hugging Face Inference Endpoint](https://huggingface.co/inference-endpoints). This parameter overrides the `model`, `passageModel`, and `queryModel` parameters.
:::

#### Other Parameters

- `options.waitForModel`: If the model is not ready, wait for it rather than returning a `503` error.
- `options.useGPU`: Use a GPU for inference if your [account plan](https://huggingface.co/inference-api#pricing) supports it.
- `options.useCache`: Use a cached result if available. (For non-deterministic models to prevent the caching mechanism from being used.)

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FullVectorizerHuggingFace"
      endMarker="# END FullVectorizerHuggingFace"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START FullVectorizerHuggingFace"
      endMarker="// END FullVectorizerHuggingFace"
      language="ts"
    />
  </TabItem>

</Tabs>

### Available models

You can use any Hugging Face embedding model with `text2vec-huggingface`, including public and private Hugging Face models. [Sentence similarity models](https://huggingface.co/models?pipeline_tag=sentence-similarity&sort=downloads) generally work best.

## Further resources

<!-- TODO: Add link to locally hosted version -->

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. Accordingly, please refer to the following examples, which are model-agnostic:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### External resources

- Hugging Face [Inference API documentation](https://huggingface.co/docs/api-inference/en/quicktour)
- Hugging Face [Model Hub](https://huggingface.co/models)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
