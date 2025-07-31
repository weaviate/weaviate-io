---
title: Generative AI
description: OpenAI Generative Model Provider
sidebar_position: 50
image: og/docs/integrations/provider_integrations_openai.jpg
# tags: ['model providers', 'openai', 'generative', 'rag']
---

# OpenAI Generative AI with Weaviate

:::info Looking for Azure OpenAI integration docs?
For Azure OpenAI integration docs, see [this page instead](../openai-azure/generative.md).
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.generative.py';
import TSCode from '!!raw-loader!../_includes/provider.generative.ts';

Weaviate's integration with OpenAI's APIs allows you to access their models' capabilities directly from Weaviate.

[Configure a Weaviate collection](#configure-collection) to use a generative AI model with OpenAI. Weaviate will perform retrieval augmented generation (RAG) using the specified model and your OpenAI API key.

More specifically, Weaviate will perform a search, retrieve the most relevant objects, and then pass them to the OpenAI generative model to generate outputs.

![RAG integration illustration](../_includes/integration_openai_rag.png)

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the OpenAI generative AI integration (`generative-openai`) module.

<details>
  <summary>For Weaviate Cloud (WCD) users</summary>

This integration is enabled by default on Weaviate Cloud (WCD) serverless instances.

</details>

<details>
  <summary>For self-hosted users</summary>

- Check the [cluster metadata](../../config-refs/meta.md) to verify if the module is enabled.
- Follow the [how-to configure modules](../../configuration/modules.md) guide to enable the module in Weaviate.

</details>

<!-- Docs note: the `OPENAI_ORGANIZATION` environment variable is not documented, as it is not the recommended way to provide the OpenAI organization parameter. -->

### API credentials

You must provide a valid OpenAI API key to Weaviate for this integration. Go to [OpenAI](https://openai.com/) to sign up and obtain an API key.

Provide the API key to Weaviate using one of the following methods:

- Set the `OPENAI_APIKEY` environment variable that is available to Weaviate.
- Provide the API key at runtime, as shown in the examples below.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START OpenAIInstantiation"
      endMarker="# END OpenAIInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START OpenAIInstantiation"
      endMarker="// END OpenAIInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

## Configure collection

import MutableGenerativeConfig from '/_includes/mutable-generative-config.md';

<MutableGenerativeConfig />

[Configure a Weaviate index](../../manage-data/collections.mdx#specify-a-generative-model-integration) as follows to use an OpenAI generative AI model:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BasicGenerativeOpenAI"
      endMarker="# END BasicGenerativeOpenAI"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START BasicGenerativeOpenAI"
      endMarker="// END BasicGenerativeOpenAI"
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
      startMarker="# START GenerativeOpenAICustomModel"
      endMarker="# END GenerativeOpenAICustomModel"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START GenerativeOpenAICustomModel"
      endMarker="// END GenerativeOpenAICustomModel"
      language="ts"
    />
  </TabItem>

</Tabs>

You can [specify](#generative-parameters) one of the [available models](#available-models) for Weaviate to use. The [default model](#available-models) is used if no model is specified.

### Generative parameters

Configure the following generative parameters to customize the model behavior.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FullGenerativeOpenAI"
      endMarker="# END FullGenerativeOpenAI"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START FullGenerativeOpenAI"
      endMarker="// END FullGenerativeOpenAI"
      language="ts"
    />
  </TabItem>

</Tabs>

For further details on model parameters, see the [OpenAI API documentation](https://platform.openai.com/docs/api-reference/chat).

## Select a model at runtime

Aside from setting the default model provider when creating the collection, you can also override it at query time.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START RuntimeModelSelectionOpenAI"
      endMarker="# END RuntimeModelSelectionOpenAI"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RuntimeModelSelectionOpenAI"
      endMarker="// END RuntimeModelSelectionOpenAI"
      language="ts"
    />
  </TabItem>
</Tabs>

## Header parameters

You can provide the API key as well as some optional parameters at runtime through additional headers in the request. The following headers are available:

- `X-OpenAI-Api-Key`: The OpenAI API key.
- `X-OpenAI-Baseurl`: The base URL to use (e.g. a proxy) instead of the default OpenAI URL.
- `X-OpenAI-Organization`: The OpenAI organization ID.

Any additional headers provided at runtime will override the existing Weaviate configuration.

Provide the headers as shown in the [API credentials examples](#api-credentials) above.

## Retrieval augmented generation

After configuring the generative AI integration, perform RAG operations, either with the [single prompt](#single-prompt) or [grouped task](#grouped-task) method.

### Single prompt

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_openai_rag_single.png)

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

![Grouped task RAG integration generates one output for the set of search results](../_includes/integration_openai_rag_grouped.png)

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

### RAG with images

You can also supply images as a part of the input when performing retrieval augmented generation in both single prompts and grouped tasks. 

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START WorkingWithImagesOpenAI"
      endMarker="# END WorkingWithImagesOpenAI"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS API v3">
  <FilteredTextBlock
      text={TSCode}
      startMarker="// START WorkingWithImagesOpenAI"
      endMarker="// END WorkingWithImagesOpenAI"
      language="ts"
    />
  </TabItem>
</Tabs>

## References

### Available models

* [gpt-3.5-turbo](https://platform.openai.com/docs/models/gpt-3-5) (default)
* [gpt-3.5-turbo-16k](https://platform.openai.com/docs/models/gpt-3-5)
* [gpt-3.5-turbo-1106](https://platform.openai.com/docs/models/gpt-3-5)
* [gpt-4](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo)
* [gpt-4-1106-preview](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo)
* [gpt-4-32k](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo)
* [gpt-4o](https://platform.openai.com/docs/models#gpt-4o)
* [gpt-4o-mini](https://platform.openai.com/docs/models#gpt-4o-mini) (Added in v1.26.7)

<details>
  <summary>Older models</summary>

The following models are available, but not recommended:

* [davinci 002](https://platform.openai.com/docs/models/overview)
* [davinci 003](https://platform.openai.com/docs/models/overview)

</details>

## Further resources

### Other integrations

- [OpenAI embedding models + Weaviate](./embeddings.md).

### Code examples

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. See the following model-agnostic examples:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### References

- OpenAI [Chat API documentation](https://platform.openai.com/docs/api-reference/chat)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
