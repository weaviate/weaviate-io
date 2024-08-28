---
title: Generative AI
sidebar_position: 51
image: og/docs/integrations/provider_integrations_friendliai.jpg
# tags: ['model providers', 'friendliai', 'generative', 'rag']
---

# FriendliAI Generative AI with Weaviate

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

:::info Added in `v1.26.0`
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.generative.py';
import TSCode from '!!raw-loader!../_includes/provider.generative.ts';

Weaviate's integrations with FriendliAI APIs allow you to utilize a wide range of models' capabilities directly from Weaviate.

[Configure a Weaviate collection](#configure-collection) to use generative AI models on FriendliAI. Weaviate will perform Retrieval Augmented Generation (RAG) using the specified model and your Friendli token.

More specifically, Weaviate will perform a search, retrieve the most relevant objects, and then pass them to the FriendliAI generative AI model to generate outputs.

![RAG integration illustration](../_includes/integration_friendliai_rag.png)

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the FriendliAI generative AI integration (`generative-friendliai`) module.

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

You must provide a valid Friendli Suite Token to Weaviate for this integration. Go to [Friendli Suite](https://docs.friendli.ai/openapi/create-chat-completions) to sign up and obtain a personal access token.

Provide the Friendli token to Weaviate using one of the following methods:

- Set the `FRIENDLI_TOKEN` environment variable that is available to Weaviate.
- Provide the token at runtime, as shown in the examples below.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START FriendliInstantiation"
      endMarker="# END FriendliInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START FriendliInstantiation"
      endMarker="// END FriendliInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

## Configure collection

[Configure a Weaviate collection](../../manage-data/collections.mdx#specify-a-generative-module) to use a FriendliAI generative AI model as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BasicGenerativeFriendliAI"
      endMarker="# END BasicGenerativeFriendliAI"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START BasicGenerativeFriendliAI"
      endMarker="// END BasicGenerativeFriendliAI"
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
      startMarker="# START GenerativeFriendliAICustomModel"
      endMarker="# END GenerativeFriendliAICustomModel"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START GenerativeFriendliAICustomModel"
      endMarker="// END GenerativeFriendliAICustomModel"
      language="ts"
    />
  </TabItem>

</Tabs>

The [default model](#available-models) is used if no model is specified.

## Retrieval augmented generation

After configuring the generative AI integration, perform RAG operations, either with the [single prompt](#single-prompt) or [grouped task](#grouped-task) method.

### Single prompt

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_friendliai_rag_single.png)

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

![Grouped task RAG integration generates one output for the set of search results](../_includes/integration_friendliai_rag_grouped.png)

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
      startMarker="# START FullGenerativeFriendliAI"
      endMarker="# END FullGenerativeFriendliAI"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START FullGenerativeFriendliAI"
      endMarker="// END FullGenerativeFriendliAI"
      language="ts"
    />
  </TabItem>

</Tabs>

For further details on model parameters, see the [FriendliAI API documentation](https://docs.friendli.ai/openapi/create-chat-completions).

### Available models

* `meta-llama-3.1-70b-instruct` (default)
* `meta-llama-3.1-8b-instruct`
* `mixtral-8x7b-instruct-v0-1`

If you are looking for further options, you can deploy them on the Friendli Suite and still use them with Weaviate. We provide a wide range of [available models](https://friendli.ai/models), and you can also [fine-tune](https://docs.friendli.ai/guides/dedicated_endpoints/fine-tuning) them to your specific use case. Feel free to explore the models and choose the one that best fits your needs. You can easily deploy them following the [quickstart guide](https://docs.friendli.ai/guides/dedicated_endpoints/quickstart).

The following code snippet is the part that needs to be different when you use your dedicated endpoint within Weaviate:

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START FriendliDedicatedInstantiation"
      endMarker="# END FriendliDedicatedInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START FriendliDedicatedInstantiation"
      endMarker="// END FriendliDedicatedInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START DedicatedGenerativeFriendliAI"
      endMarker="# END DedicatedGenerativeFriendliAI"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START DedicatedGenerativeFriendliAI"
      endMarker="// END DedicatedGenerativeFriendliAI"
      language="ts"
    />
  </TabItem>

</Tabs>

## Further resources

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. See the following model-agnostic examples:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### References

- [FriendliAI API documentation](https://docs.friendli.ai/openapi/create-chat-completions)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
