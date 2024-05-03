---
title: Generative
sidebar_position: 50
image: og/docs/integrations/provider_integrations_openai.jpg
# tags: ['model providers', 'openai', 'generative', 'rag']
---

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.generative.py';
import TSCode from '!!raw-loader!../_includes/provider.generative.ts';

# OpenAI Generative AI with Weaviate

Weaviate's integration with OpenAI's APIs allows you to access their models' capabilities directly from Weaviate.

[Configure a Weaviate collection](#configure-collection) to use an OpenAI generative AI model, and Weaviate will perform retrieval augmented generation (RAG) using the specified model and your OpenAI API key.

More specifically, Weaviate will perform a search, retrieve the most relevant objects, and then pass them to the OpenAI generative model to generate outputs.

![RAG integration illustration](../_includes/integration_openai_rag.png)

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the OpenAI generative AI integration (`generative-openai`) module.

<details>
  <summary>For WCS (serverless) users</summary>

This integration is enabled by default on Weaviate Cloud Services (WCS) serverless managed instances.

</details>

<details>
  <summary>For self-hosted users</summary>

- Check the [cluster metadata](../../config-refs/meta.md) to verify if the module is enabled.
- Follow the [how-to configure modules](../../configuration/modules.md) guide to enable the module in Weaviate.

</details>

### API credentials

You must provide a valid OpenAI API key to Weaviate for this integration. Go to [OpenAI](https://openai.com/) to sign up and obtain an API key.

Provide the API key to Weaviate using one of the following methods:

- Set the `OPENAI_APIKEY` environment variable that is available to Weaviate.
- Provide the API key at runtime, as shown in the examples below.

<Tabs groupId="languages">

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START OpenAIInstantiation"
      endMarker="# END OpenAIInstantiation"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSConnect}
      startMarker="// START OpenAIInstantiation"
      endMarker="// END OpenAIInstantiation"
      language="ts"
    />
  </TabItem>

</Tabs>

## Configure collection

[Configure a Weaviate collection](../../manage-data/collections.mdx#specify-a-generative-module) to use an OpenAI generative AI model as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BasicGenerativeOpenAI"
      endMarker="# END BasicGenerativeOpenAI"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START BasicGenerativeOpenAI"
      endMarker="// END BasicGenerativeOpenAI"
      language="ts"
    />
  </TabItem>

</Tabs>

You can [specify](#generative-parameters) one of the [available models](#available-models) for Weaviate to use. The default model (`gpt-3.5-turbo`) is used if no model is specified.

## Retrieval augmented generation

After configuring the generative AI integration, perform RAG operations, either with the [single prompt](#single-prompt) or [grouped task](#grouped-task) method.

### Single prompt

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_openai_rag_single.png)

To generate text for each object in the search results, use the single prompt method.

The example below generates outputs for each of the `n` search results, where `n` is specified by the `limit` parameter.

When creating a single prompt query, use braces `{}` to interpolate the object properties you want Weaviate to pass on to the language model. For example, to pass on the object's `title` property, include `{title}` in the query.

<Tabs groupId="languages">

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START SinglePromptExample"
      endMarker="# END SinglePromptExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS (Beta)">
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

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START GroupedTaskExample"
      endMarker="# END GroupedTaskExample"
      language="py"
    />
  </TabItem>

 <TabItem value="js" label="JS/TS (Beta)">
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
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FullGenerativeOpenAI"
      endMarker="# END FullGenerativeOpenAI"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS (Beta)">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START FullGenerativeOpenAI"
      endMarker="// END FullGenerativeOpenAI"
      language="ts"
    />
  </TabItem>

</Tabs>

For further details on model parameters, please consult the [OpenAI API documentation](https://platform.openai.com/docs/api-reference/chat).

### Available models

* [gpt-3.5-turbo](https://platform.openai.com/docs/models/gpt-3-5) (default)
* [gpt-3.5-turbo-16k](https://platform.openai.com/docs/models/gpt-3-5)
* [gpt-3.5-turbo-1106](https://platform.openai.com/docs/models/gpt-3-5)
* [gpt-4](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo)
* [gpt-4-1106-preview](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo)
* [gpt-4-32k](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo)

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

Once the integrations are configured at the collection, the data management and search operations in Weaviate work identically to any other collection. Accordingly, please refer to the following examples, which are model-agnostic:

- The [how-to: manage data](../../manage-data/index.md) guides show how to perform data operations (i.e. create, update, delete).
- The [how-to: search](../../search/index.md) guides show how to perform search operations (i.e. vector, keyword, hybrid) as well as retrieval augmented generation.

### References

- OpenAI [Chat API documentation](https://platform.openai.com/docs/api-reference/chat)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
