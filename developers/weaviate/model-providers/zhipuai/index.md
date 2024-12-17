---
title: Generative AI
description: ZhipuAI Generative Model Provider
sidebar_position: 50
---

# ZhipuAI Generative AI with Weaviate
 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyConnect from '!!raw-loader!../_includes/provider.connect.py';
import TSConnect from '!!raw-loader!../_includes/provider.connect.ts';
import PyCode from '!!raw-loader!../_includes/provider.generative.py';
import TSCode from '!!raw-loader!../_includes/provider.generative.ts';

Weaviate's integration with ZhipuAI's APIs allows you to access their models' capabilities directly from Weaviate.

[Configure a Weaviate collection](#configure-collection) to use an ZhipuAI generative AI model 

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured with the ZhipuAI generative AI integration (`generative-zhipuai`) module.
 

<details>
  <summary>For self-hosted users</summary>

- Check the [cluster metadata](../../config-refs/meta.md) to verify if the module is enabled.
- Follow the [how-to configure modules](../../configuration/modules.md) guide to enable the module in Weaviate.

</details>
 
### API credentials

You must provide a valid ZhipuAI API key to Weaviate for this integration. Go to  [apikey](https://open.bigmodel.cn/usercenter/proj-mgmt/apikeys) to sign up and obtain an API key.

Provide the API key to Weaviate using one of the following methods:

- Set the `ZHIPUAI_APIKEY` environment variable that is available to Weaviate.
- Provide the API key at runtime, as shown in the examples below.

<Tabs groupId="languages">

 <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyConnect}
      startMarker="# START ZhipuAIInstantiation"
      endMarker="# END ZhipuAIInstantiation"
      language="py"
    />
  </TabItem>

</Tabs>

## Configure collection

import MutableGenerativeConfig from '/_includes/mutable-generative-config.md';

<MutableGenerativeConfig />

[Configure a Weaviate index](../../manage-data/collections.mdx#specify-a-generative-model-integration) as follows to use an ZhipuAI generative AI model:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START BasicGenerativeZhipuAI"
      endMarker="# END BasicGenerativeZhipuAI"
      language="py"
    />
  </TabItem>

</Tabs>

### Select a model

You can specify one of the [available models](#available-models) for Weaviate to use, as shown in the following configuration example:

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START GenerativeZhipuAICustomModel"
      endMarker="# END GenerativeZhipuAICustomModel"
      language="py"
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
      startMarker="# START FullGenerativeZhipuAI"
      endMarker="# END FullGenerativeZhipuAI"
      language="py"
    />
  </TabItem>
</Tabs>
 

## References

### Available models

generative_config [model support](https://bigmodel.cn/dev/howuse/model)

* glm-4 (default)
* glm-4-plus
* glm-4-air
* glm-4-airx
* glm-4-0520
* glm-4-long
* glm-4-flashx
* glm-4-flash 
  
## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
