---
title: Text Embeddings
description: "Weaviate Embeddings' models can be accessed directly from a Weaviate Cloud instance."
sidebar_position: 20
image: og/docs/integrations/provider_integrations_wes.jpg
# tags: ['model providers', 'weaviate', 'wes', 'weaviate embeddings']
---

:::info Access to Weaviate Embeddings during technical preview
Weaviate Embeddings is currently in free technical preview.

To try out Weaviate Embeddings at this time, please [contact us](/embeddings) to request access.
:::

# Weaviate Embeddings

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.weaviate.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.weaviate.ts';
import PyCode from '!!raw-loader!../_includes/provider.vectorizer.py';
import TSCode from '!!raw-loader!../_includes/provider.vectorizer.ts';

Weaviate Embeddings' models can be accessed directly from a Weaviate Cloud instance.

[Configure a Weaviate vector index](#configure-the-vectorizer) to use a Weaviate Embeddings model, and Weaviate will generate embeddings for various operations using the specified model and your Weaviate API key. This feature is called the *vectorizer*.

At [import time](#data-import), Weaviate generates text object embeddings and saves them into the index. For [vector](#vector-near-text-search) and [hybrid](#hybrid-search) search operations, Weaviate converts text queries into embeddings.

![Embedding integration illustration](../_includes/integration_wes_embedding.png)

## Requirements

### Weaviate configuration

The Weaviate Embeddings vectorizer is only available for use by Weaviate Cloud instances. At this time, Weaviate Embeddings is not available for self-hosted users.

### API credentials

Weaviate Embeddings is integrated with Weaviate Cloud. Your Weaviate Cloud credentials will be used to authorize your Weaviate Cloud instance's access for Weaviate Embeddings.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START WeaviateInstantiation"
      endMarker="# END WeaviateInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START WeaviateInstantiation"
      endMarker="// END WeaviateInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

## Configure the vectorizer

[Configure a Weaviate index](../../manage-data/collections.mdx#specify-a-vectorizer) as follows to use a Weaviate Embeddings model:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BasicVectorizerWeaviate"
      endMarker="# END BasicVectorizerWeaviate"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START BasicVectorizerWeaviate"
      endMarker="// END BasicVectorizerWeaviate"
      language="ts"
    />
  </TabItem>

</Tabs>

### Select a model

You can specify one of the [available models](#available-models) for the vectorizer to use, as shown in the following configuration example.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START VectorizerWeaviateCustomModel"
      endMarker="# END VectorizerWeaviateCustomModel"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START VectorizerWeaviateCustomModel"
      endMarker="// END VectorizerWeaviateCustomModel"
      language="ts"
    />
  </TabItem>

</Tabs>

You can [specify](#vectorizer-parameters) one of the [available models](#available-models) for Weaviate to use. The [default model](#available-models) is used if no model is specified.

import VectorizationBehavior from '/_includes/vectorization.behavior.mdx';

<details>
  <summary>Vectorization behavior</summary>

<VectorizationBehavior/>

</details>

### Vectorizer parameters

The following examples show how to configure Weaviate Embeddings-specific options.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FullVectorizerWeaviate"
      endMarker="# END FullVectorizerWeaviate"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START FullVectorizerWeaviate"
      endMarker="// END FullVectorizerWeaviate"
      language="ts"
    />
  </TabItem>

</Tabs>

- `model`: The name of the model to use for embedding generation.
- `dimensions`: The number of dimensions to use for the generated embeddings. Only available for models that support Matryoshka Representation Learning.
- `base_url`: The base URL for the Weaviate Embeddings service. (Not required in most cases.)

## Data import

After configuring the vectorizer, [import data](../../manage-data/import.mdx) into Weaviate. Weaviate generates embeddings for text objects using the specified model.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BatchImportExample"
      endMarker="# END BatchImportExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
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

Once the vectorizer is configured, Weaviate will perform vector and hybrid search operations using the specified WED model.

![Embedding integration at search illustration](../_includes/integration_wes_embedding_search.png)

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

## References

### Available models

- `arctic-embed-m-v1.5` (default)
    - A 109M parameter, 768-dimensional model for enterprise retrieval tasks in English.
    - Trained with Matryoshka Representation Learning to allow vector truncation with minimal loss.
    - Quantization-friendly: Using scalar quantization and 256 dimensions provides 99% of unquantized, full-precision performance.
    - Read more at the [Snowflake blog](https://www.snowflake.com/engineering-blog/arctic-embed-m-v1-5-enterprise-retrieval/), and the Hugging Face [model card](https://huggingface.co/Snowflake/snowflake-arctic-embed-m-v1.5)
    - Allowable `dimensions`: 768 (default), 256

Additional models will be added in the future.

:::info Input truncation
Currently, input exceeding the model's context windows is truncated from the right (i.e. the end of the input).
:::

## Further resources

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. See the following model-agnostic examples:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### Further resources

- Weaviate Embeddings [Documentation](/developers/wcs/embeddings)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>