---
title: Multimodal Embeddings
sidebar_position: 25
image: og/docs/integrations/provider_integrations_google.jpg
# tags: ['model providers', 'google', 'embeddings']
---

# Google AI Multimodal Embeddings with Weaviate

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.vectorizer.py';
import TSCode from '!!raw-loader!../_includes/provider.vectorizer.ts';

Weaviate's integration with [Google Vertex AI](https://cloud.google.com/vertex-ai) APIs allows you to access their models' capabilities directly from Weaviate.

:::note AI Studio not available
Multimodal embeddings are currently not available to Google AI Studio users.
:::

[Configure a Weaviate vector index](#configure-the-vectorizer) to use a Google AI embedding model, and Weaviate will generate embeddings for various operations using the specified model and your Google AI API key. This feature is called the *vectorizer*.

At [import time](#data-import), Weaviate generates multimodal object embeddings and saves them into the index. For [vector](#vector-near-text-search) and [hybrid](#hybrid-search) search operations, Weaviate converts queries of one or more modalities into embeddings.

![Embedding integration illustration](../_includes/integration_google_embedding.png)

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the Google AI vectorizer integration (`multi2vec-palm`) module.

<details>
  <summary>For Weaviate Cloud (WCD) users</summary>

This integration is enabled by default on Weaviate Cloud (WCD) serverless instances.

</details>

<details>
  <summary>For self-hosted users</summary>

- Check the [cluster metadata](../../config-refs/meta.md) to verify if the module is enabled.
- Follow the [how-to configure modules](../../configuration/modules.md) guide to enable the module in Weaviate.

</details>

### API credentials

You must provide valid API credentials to Weaviate for the appropriate integration.

#### Vertex AI

This is called an `access token` in Google Cloud.

If you have the [Google Cloud CLI tool](https://cloud.google.com/cli) installed and set up, you can view your token by running the following command:

```shell
gcloud auth print-access-token
```

#### Token expiry for Vertex AI users

import GCPTokenExpiryNotes from '/_includes/gcp.token.expiry.notes.mdx';

<GCPTokenExpiryNotes/>

#### Provide the API key

Provide the API key to Weaviate at runtime, as shown in the examples below.

<!-- Note the separate headers that are available for [AI Studio](#ai-studio) and [Vertex AI](#vertex-ai) users. -->

import ApiKeyNote from '../_includes/google-api-key-note.md';

<ApiKeyNote />

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START GoogleVertexInstantiation"
      endMarker="# END GoogleVertexInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START GoogleVertexInstantiation"
      endMarker="// END GoogleVertexInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

## Configure the vectorizer

[Configure a Weaviate index](../../manage-data/collections.mdx#specify-a-vectorizer) to use a Google AI embedding model by setting the vectorizer as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BasicMMVectorizerGoogleVertex"
      endMarker="# END BasicMMVectorizerGoogleVertex"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START BasicMMVectorizerGoogleVertex"
      endMarker="// END BasicMMVectorizerGoogleVertex"
      language="ts"
    />API v
  </TabItem>

</Tabs>

You can [specify](#vectorizer-parameters) one of the [available models](#available-models) for the vectorizer to use. Currently, `multimodalembedding@001` is the only available model.

<!-- The default model (`textembedding-gecko@001` for Vertex AI, `embedding-001` for AI Studio) is used if no model is specified. -->

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

Once the vectorizer is configured, Weaviate will perform vector and hybrid search operations using the specified Google AI model.

![Embedding integration at search illustration](../_includes/integration_google_embedding_search.png)

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

The following examples show how to configure Google AI-specific options.

- `location` (Required): e.g. `"us-central1"`
- `projectId` (Only required if using Vertex AI): e.g. `cloud-large-language-models`
- `apiEndpoint` (Optional): e.g. `us-central1-aiplatform.googleapis.com`
- `modelId` (Optional): e.g. `multimodalembedding@001`
- `dimensions` (Optional): Must be one of: `128`, `256`, `512`, `1408`. Default is `1408`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FullMMVectorizerGoogle"
      endMarker="# END FullMMVectorizerGoogle"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START FullMMVectorizerGoogle"
      endMarker="// END FullMMVectorizerGoogle"
      language="ts"
    />
  </TabItem>

</Tabs>

### Available models

- `multimodalembedding@001` (default)

## Further resources

### Other integrations

- [Google AI generative models + Weaviate](./generative.md).

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. See the following model-agnostic examples:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### External resources

- [Google Vertex AI](https://cloud.google.com/vertex-ai)
- [Google AI Studio](https://ai.google.dev/?utm_source=weaviate&utm_medium=referral&utm_campaign=partnerships&utm_content=)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
