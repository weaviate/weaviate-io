---
title: Usage
sidebar_position: 30
image: og/docs/agents.jpg
# tags: ['agents', 'getting started', 'transformation agent']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/developers/agents/_includes/transformation_agent.py';


# Weaviate Transformation Agent: Usage

:::caution Technical Preview

![This Weaviate Agent is in technical preview.](../_includes/agents_tech_preview_light.png#gh-light-mode-only "This Weaviate Agent is in technical preview.")
![This Weaviate Agent is in technical preview.](../_includes/agents_tech_preview_dark.png#gh-dark-mode-only "This Weaviate Agent is in technical preview.")

To be notified with news on this agent, [**sign up here for updates**](https://events.weaviate.io/weaviate-agents).

:::

The Weaviate Transformation Agent is an agentic service designed to augment and transform data using foundation models.

The Transformation Agent can be used to append new properties and/or update existing properties of data, for new or existing objects in Weaviate.

This can help you to improve the quality of your objects in your Weaviate collections, ready for further use in your applications.

![Weaviate Transformation Agent overview](../_includes/transformation_agent_overview_light.png#gh-light-mode-only "Weaviate Transformation Agent overview")
![Weaviate Transformation Agent overview](../_includes/transformation_agent_overview_dark.png#gh-dark-mode-only "Weaviate Transformation Agent overview")

This page describes how to use the Weaviate Transformation Agent to transform and augment your data in Weaviate.

## Prerequisites

### Weaviate instance

This Agent is available exclusively for use with a Weaviate Cloud instance.

Refer to the [Weaviate Cloud documentation](/developers/wcs/index.mdx) for more information on how to set up a Weaviate Cloud instance.

You can try this Weaviate Agent with a free Sandbox instance on [Weaviate Cloud](https://console.weaviate.cloud/).

### Client library

You can install the Weaviate client library with the optional `agents` extras to use Weaviate Agents. This will install the `weaviate-agents` package along with the `weaviate-client` package.

Install the client library using the following command:

<Tabs groupId="languages">
<TabItem value="py_agents" label="Python">

```shell
pip install -U weaviate-client[agents]
```

:::tip Force `pip` to install the latest version
In some cases, `pip` may not bump `weaviate-agents` to the latest version, as it is an optional dependency. In this case, additionally run the following command to ensure you have the latest version:

```shell
pip install -U weaviate-agents
```
:::

</TabItem>

</Tabs>

:::note Supported languages
At this time, the Query Agent is available only for Python. Support for other languages will be added in the future.
:::


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
