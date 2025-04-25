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

[Sign up here](https://events.weaviate.io/weaviate-agents) for notifications on Weaviate Agents, or visit [this page](https://weaviateagents.featurebase.app/) to see the latest updates and provide feedback.

:::

:::warning Do not use in production
The Weaviate Transformation Agent is designed to modify data in Weaviate in place. **While the Agent is in technical preview, do not use it in a production environment.** The Agent may not work as expected, and the data in your Weaviate instance may be affected in unexpected ways.
:::

The Weaviate Transformation Agent is an agentic service designed to augment and transform data using generative models. Use the Transformation Agent to append new properties and/or update existing properties of data on existing objects in Weaviate.

This can help you to improve the quality of your objects in your Weaviate collections, ready for further use in your applications.

![Weaviate Transformation Agent overview](../_includes/transformation_agent_overview_light.png#gh-light-mode-only "Weaviate Transformation Agent overview")
![Weaviate Transformation Agent overview](../_includes/transformation_agent_overview_dark.png#gh-dark-mode-only "Weaviate Transformation Agent overview")

This page describes how to use the Weaviate Transformation Agent to transform and augment your data in Weaviate.

:::info Changelog and feedback
The official changelog for Weaviate Agents can be [found here](https://weaviateagents.featurebase.app/changelog). If you have feedback, such as feature requests, bug reports or questions, please [submit them here](https://weaviateagents.featurebase.app/), where you will be able to see the status of your feedback and vote on others' feedback.
:::

## Prerequisites

### Weaviate instance

This Agent is available exclusively for use with a Weaviate Cloud instance.

Refer to the [Weaviate Cloud documentation](/developers/wcs/index.mdx) for more information on how to set up a Weaviate Cloud instance.

You can try this Weaviate Agent with a free Sandbox instance on [Weaviate Cloud](https://console.weaviate.cloud/).

### Client library

:::note Supported languages
At this time, this Agent is available only for Python. Support for other languages will be added in the future.
:::

You can install the Weaviate client library with the optional `agents` extras to use Weaviate Agents. This will install the `weaviate-agents` package along with the `weaviate-client` package.

Install the client library using the following command:

<Tabs groupId="languages">
<TabItem value="py_agents" label="Python">

```shell
pip install -U weaviate-client[agents]
```

#### Troubleshooting: Force `pip` to install the latest version

For existing installations, even `pip install -U "weaviate-client[agents]"` may not upgrade `weaviate-agents` to the [latest version](https://pypi.org/project/weaviate-agents/). If this occurs, additionally try to explicitly upgrade the `weaviate-agents` package:

```shell
pip install -U weaviate-agents
```

Or install a [specific version](https://github.com/weaviate/weaviate-agents-python-client/tags):

```shell
pip install -U weaviate-agents==||site.weaviate_agents_version||
```

</TabItem>

</Tabs>

## Usage

To use the Transformation Agent, instantiate it with the required inputs and start the operations.

Transformation operations are asynchronous. Each operation will return a workflow ID to the user. Use this ID to check its status.

Example usage is shown below.

### Prerequisites

The Transformation Agent is tightly integrated with Weaviate Cloud. As a result, the Transformation Agent is available exclusively for use with a Weaviate Cloud instance, and a supported version of the client library.

### Connect to Weaviate

You must connect to the Weaviate Cloud instance to use the Transformation Agent. Connect to the Weaviate Cloud instance using the Weaviate client library.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START ConnectToWeaviate"
            endMarker="# END ConnectToWeaviate"
            language="py"
        />
    </TabItem>
</Tabs>

### Define transformation operations

You must define transformation operations before starting the Transformation Agent. Define operations with the following information:

- Operation type
- Target property name
- The properties to be used as context
- Instructions
- (For new properties) The data type of the new property

Example operations are shown below.

#### Append new properties to data

New properties can be appended to objects based on existing property values and user instructions.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START DefineOperationsAppend"
            endMarker="# END DefineOperationsAppend"
            language="py"
        />
    </TabItem>

</Tabs>

#### Update existing properties

Values of existing properties can be updated on objects based on existing property values and user instructions.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START DefineOperationsUpdate"
            endMarker="# END DefineOperationsUpdate"
            language="py"
        />
    </TabItem>

</Tabs>

### Start the transformation operations

To start the transformation operations, instantiate the Transformation Agent with the required inputs and start the operations.

Instantiate the Transformation Agent with the Weaviate client, the target collection name, and the list of transformation operations.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START StartTransformationOperations"
            endMarker="# END StartTransformationOperations"
            language="py"
        />
    </TabItem>

</Tabs>

### Monitor job status

You can use the workflow ID to monitor the status of each transformation operation.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START MonitorJobStatus"
            endMarker="# END MonitorJobStatus"
            language="py"
        />
    </TabItem>

</Tabs>

## Limitations & Troubleshooting

:::caution Technical Preview

![This Weaviate Agent is in technical preview.](../_includes/agents_tech_preview_light.png#gh-light-mode-only "This Weaviate Agent is in technical preview.")
![This Weaviate Agent is in technical preview.](../_includes/agents_tech_preview_dark.png#gh-dark-mode-only "This Weaviate Agent is in technical preview.")

[Sign up here](https://events.weaviate.io/weaviate-agents) for notifications on Weaviate Agents, or visit [this page](https://weaviateagents.featurebase.app/) to see the latest updates and provide feedback.

:::

### Usage limits

At this stage, there is a limit of 50,000 Transformation Agent operations per day per Weaviate Cloud [organization](/developers/wcs/platform/users-and-organizations.mdx#organizations).

Note that this limit is per individual operations. In other words, running a Transformation Agent with 4 operations on a collection of 2,500 objects would max out the limit for that day.

This limit may change in future versions of the Transformation Agent.

### Model input context length

Due to the limitations of the underlying models, the input context length for a transformation operation is limited. We recommend that the input context length is kept below ~25000 characters.

In other words, the total length of the input context (the properties used as context) and the instructions should be kept below this limit. If the model input context length is exceeded, the transformation operation will fail.

### Race condition on multiple operations

When multiple transformation operations are initiated on the same collection, it is possible for a race condition to occur, overwriting the results of one operation with the results of another.

This can be avoided by ensuring that only one operation is performed on a collection at a time. If you need to perform multiple operations on the same collection, ensure that the operations are performed sequentially.

You can do this by using the workflow ID of the previous operation to monitor its status before starting the next operation.

This will be addressed in future versions of the Transformation Agent.

## Questions and feedback

:::info Changelog and feedback
The official changelog for Weaviate Agents can be [found here](https://weaviateagents.featurebase.app/changelog). If you have feedback, such as feature requests, bug reports or questions, please [submit them here](https://weaviateagents.featurebase.app/), where you will be able to see the status of your feedback and vote on others' feedback.
:::

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
