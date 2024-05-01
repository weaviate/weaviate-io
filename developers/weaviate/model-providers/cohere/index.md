---
title: Cohere + Weaviate
sidebar_position: 50
image: og/docs/integrations/provider_integrations_cohere.jpg
# tags: ['model providers', 'cohere']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!../_includes/provider.connect.py';

Cohere provides a range of models through their API. Weaviate's integration with Cohere's APIs allows you to access their models' capabilities directly from Weaviate.

![Embedding integration illustration](../_includes/integration_cohere_embedding.png)

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the Cohere module.

- To check if the Cohere module is enabled in your Weaviate instance, review the [cluster metadata](../../config-refs/meta.md).
- For instructions on how to enable the Cohere module in Weaviate, see the [how-to configure modules](../../configuration/modules.md) guide.

### API key

For the integration to work, you must provide a valid Cohere API key so that Weaviate can work with the Cohere API. You can obtain an API key by signing up for [a Cohere account](https://cohere.com/) and following their instructions.

You can provide the API key to Weaviate in one of two ways:

- Set the `COHERE_API_KEY` environment variable that is available to Weaviate.
- Provide the API key at runtime, as shown in the examples below.

<Tabs groupId="languages">
 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START CohereInstantiation"
      endMarker="# END CohereInstantiation"
      language="py"
    />
  </TabItem>
</Tabs>

## Available model groups

- [Embeddings](./embeddings.md)
- [Generative AI](./generative.md)
- [Reranker](./reranker.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
