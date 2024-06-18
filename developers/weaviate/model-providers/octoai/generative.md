---
title: Generative AI
sidebar_position: 50
image: og/docs/integrations/provider_integrations_octoai.jpg
# tags: ['model providers', 'octoai', 'generative', 'rag']
---

# OctoAI Generative AI with Weaviate

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

:::info Added in `v1.25.0`
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.generative.py';
import TSCode from '!!raw-loader!../_includes/provider.generative.ts';

Weaviate's integration with OctoAI's APIs allows you to access open source and their models' capabilities directly from Weaviate.

[Configure a Weaviate collection](#configure-collection) to use an OctoAI generative AI model, and Weaviate will perform retrieval augmented generation (RAG) using the specified model and your OctoAI API key.

More specifically, Weaviate will perform a search, retrieve the most relevant objects, and then pass them to the OctoAI generative model to generate outputs.

![RAG integration illustration](../_includes/integration_octoai_rag.png)

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the OctoAI generative AI integration (`generative-octoai`) module.

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

You must provide a valid OctoAI API key to Weaviate for this integration. Go to [OctoAI](https://octo.ai/docs/getting-started/how-to-create-an-octoai-access-token) to sign up and obtain an API key.

Provide the API key to Weaviate using one of the following methods:

- Set the `OCTOAI_APIKEY` environment variable that is available to Weaviate.
- Provide the API key at runtime, as shown in the examples below.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START OctoAIInstantiation"
      endMarker="# END OctoAIInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START OctoAIInstantiation"
      endMarker="// END OctoAIInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

## Configure collection

[Configure a Weaviate collection](../../manage-data/collections.mdx#specify-a-generative-module) to use an OctoAI generative AI model as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BasicGenerativeOctoAI"
      endMarker="# END BasicGenerativeOctoAI"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START BasicGenerativeOctoAI"
      endMarker="// END BasicGenerativeOctoAI"
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
      startMarker="# START GenerativeOctoAICustomModel"
      endMarker="# END GenerativeOctoAICustomModel"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START GenerativeOctoAICustomModel"
      endMarker="// END GenerativeOctoAICustomModel"
      language="ts"
    />
  </TabItem>

</Tabs>

The [default model](#available-models) is used if no model is specified.

## Retrieval augmented generation

After configuring the generative AI integration, perform RAG operations, either with the [single prompt](#single-prompt) or [grouped task](#grouped-task) method.

### Single prompt

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_octoai_rag_single.png)

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

![Grouped task RAG integration generates one output for the set of search results](../_includes/integration_octoai_rag_grouped.png)

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

<!-- Zain: Any parameters discuss here? Pls see e.g. Cohere/OpenAI page for comparison -->

Configure the following generative parameters to customize the model behavior.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FullGenerativeOctoAI"
      endMarker="# END FullGenerativeOctoAI"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START FullGenerativeOctoAI"
      endMarker="// END FullGenerativeOctoAI"
      language="ts"
    />
  </TabItem>

</Tabs>

For further details on model parameters, see the [OctoAI API documentation](https://octo.ai/docs/text-gen-solution/rest-api).

### Available models

* `qwen1.5-32b-chat`
* `meta-llama-3-8b-instruct`
* `meta-llama-3-70b-instruct`
* `mixtral-8x22b-instruct`
* `nous-hermes-2-mixtral-8x7b-dpo`
* `mixtral-8x7b-instruct`
* `mixtral-8x22b-finetuned`
* `hermes-2-pro-mistral-7b`
* `mistral-7b-instruct` (default)
* `codellama-7b-instruct`
* `codellama-13b-instruct`
* `codellama-34b-instruct`
* `llama-2-13b-chat`
* `llama-2-70b-chat`

## Further resources

### Other integrations

- [OctoAI embedding models + Weaviate](./embeddings.md).

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. See the following model-agnostic examples:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### References

- OctoAI [API documentation](https://octo.ai/docs/getting-started/inference-models)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
