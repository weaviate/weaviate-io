---
title: Generative AI
sidebar_position: 50
image: og/docs/integrations/provider_integrations_cohere.jpg
# tags: ['model providers', 'cohere', 'generative', 'rag']
---

# Cohere Generative AI with Weaviate

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.generative.py';
import TSCode from '!!raw-loader!../_includes/provider.generative.ts';

Weaviate's integration with Cohere's APIs allows you to access their models' capabilities directly from Weaviate.

[Configure a Weaviate collection](#configure-collection) to use a Cohere generative AI model, and Weaviate will perform retrieval augmented generation (RAG) using the specified model and your Cohere API key.

More specifically, Weaviate will perform a search, retrieve the most relevant objects, and then pass them to the Cohere generative model to generate outputs.

![RAG integration illustration](../_includes/integration_cohere_rag.png)

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the Cohere generative AI integration (`generative-cohere`) module.

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

You must provide a valid Cohere API key to Weaviate for this integration. Go to [Cohere](https://cohere.com/) to sign up and obtain an API key.

Provide the API key to Weaviate using one of the following methods:

- Set the `COHERE_APIKEY` environment variable that is available to Weaviate.
- Provide the API key at runtime, as shown in the examples below.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START CohereInstantiation"
      endMarker="# END CohereInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START CohereInstantiation"
      endMarker="// END CohereInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

## Configure collection

[Configure a Weaviate collection](../../manage-data/collections.mdx#specify-a-generative-module) to use a Cohere generative AI model as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BasicGenerativeCohere"
      endMarker="# END BasicGenerativeCohere"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START BasicGenerativeCohere"
      endMarker="// END BasicGenerativeCohere"
      language="ts"
    />
  </TabItem>

</Tabs>

### Select a model

You can specify one of the [available models](#available-models) for Weaviate to use, as shown in the following configuration example:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START GenerativeCohereCustomModel"
      endMarker="# END GenerativeCohereCustomModel"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START GenerativeCohereCustomModel"
      endMarker="// END GenerativeCohereCustomModel"
      language="ts"
    />
  </TabItem>

</Tabs>

The [default model](#available-models) is used if no model is specified.

## Retrieval augmented generation

After configuring the generative AI integration, perform RAG operations, either with the [single prompt](#single-prompt) or [grouped task](#grouped-task) method.

### Single prompt

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_cohere_rag_single.png)

To generate text for each object in the search results, use the single prompt method.

The example below generates outputs for each of the `n` search results, where `n` is specified by the `limit` parameter.

When creating a single prompt query, use braces `{}` to interpolate the object properties you want Weaviate to pass on to the language model. For example, to pass on the object's `title` property, include `{title}` in the query.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START SinglePromptExample"
      endMarker="# END SinglePromptExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START SinglePromptExample"
      endMarker="// END SinglePromptExample"
      language="ts"
    />
  </TabItem>

</Tabs>

### Grouped task

![Grouped task RAG integration generates one output for the set of search results](../_includes/integration_cohere_rag_grouped.png)

To generate one text for the entire set of search results, use the grouped task method.

In other words, when you have `n` search results, the generative model generates one output for the entire group.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START GroupedTaskExample"
      endMarker="# END GroupedTaskExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START GroupedTaskExample"
      endMarker="// END GroupedTaskExample"
      language="ts"
    />
  </TabItem>

</Tabs>

## References

### Generative parameters

Configure the following generative parameters to customize the model behavior.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FullGenerativeCohere"
      endMarker="# END FullGenerativeCohere"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START FullGenerativeCohere"
      endMarker="// END FullGenerativeCohere"
      language="ts"
    />
  </TabItem>

</Tabs>

For further details on model parameters, see the [Cohere API documentation](https://docs.cohere.com/reference/chat).

### Available models

- `command-r-plus`  (Added in `v1.25.0`)
- `command-r` (default)  (Added in `v1.25.0`)
- `command-xlarge`
- `command-xlarge-beta`
- `command-xlarge-nightly`
- `command-medium`
- `command-medium-nightly`
- `command`
- `command-nightly`
- `command-light`
- `command-light-nightly`

## Further resources

### Other integrations

- [Cohere embedding models + Weaviate](./embeddings.md).
- [Cohere reranker models + Weaviate](./reranker.md).

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. See the following model-agnostic examples:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### References

- Cohere [Chat API documentation](https://docs.cohere.com/reference/chat)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
