---
title: Reranker
sidebar_position: 70
image: og/docs/integrations/provider_integrations_voyageai.jpg
# tags: ['model providers', 'voyageai', 'reranking']
---

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.reranker.py';
import TSCode from '!!raw-loader!../_includes/provider.reranker.ts';

# Voyage AI reranker models with Weaviate

Weaviate's integration with Voyage AI's APIs allows you to access their models' capabilities directly from Weaviate.

[Configure a Weaviate collection](#configure-the-reranker) to use a Voyage AI reranker model, and Weaviate will use the specified model and your Voyage AI API key to rerank search results.

This two-step process involves Weaviate first performing a search and then reranking the results using the specified model.

![Reranker integration illustration](../_includes/integration_voyageai_reranker.png)

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the Voyage AI reranker integration (`reranker-voyageai`) module.

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

You must provide a valid Voyage AI API key to Weaviate for this integration. Go to [Voyage AI](https://www.voyageai.com/) to sign up and obtain an API key.

Provide the API key to Weaviate using one of the following methods:

- Set the `VOYAGEAI_APIKEY` environment variable that is available to Weaviate.
- Provide the API key at runtime, as shown in the examples below.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START VoyageAIInstantiation"
      endMarker="# END VoyageAIInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START VoyageAIInstantiation"
      endMarker="// END VoyageAIInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

## Configure the reranker

Configure a Weaviate collection to use a Voyage AI reranker model as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START RerankerVoyageAI"
      endMarker="# END RerankerVoyageAI"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RerankerVoyageAI"
      endMarker="// END RerankerVoyageAI"
      language="ts"
    />
  </TabItem>

</Tabs>

You can specify one of the [available models](#available-models) for the reranker to use. Currently, `rerank-lite-1` is the only available model.
<!-- The [default model](#available-models) is used if no model is specified. -->

## Reranking query

Once the reranker is configured, Weaviate performs [reranking operations](../../search/rerank.md) using the specified Voyage AI model.

More specifically, Weaviate performs an initial search, then reranks the results using the specified model.

Any search in Weaviate can be combined with a reranker to perform reranking operations.

![Reranker integration illustration](../_includes/integration_voyageai_reranker.png)

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START RerankerQueryExample"
      endMarker="# END RerankerQueryExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RerankerQueryExample"
      endMarker="// END RerankerQueryExample"
      language="ts"
    />
  </TabItem>

</Tabs>

## References

### Available models

- `rerank-lite-1`

## Further resources

### Other integrations

- [Voyage AI embedding models + Weaviate](./embeddings.md).

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. See the following model-agnostic examples:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### References

- Voyage AI [Reranker API documentation](https://docs.voyageai.com/docs/reranker)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
