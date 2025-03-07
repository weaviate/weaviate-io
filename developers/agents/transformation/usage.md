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

:::note Supported languages
At this time, the Query Agent is available only for Python. Support for other languages will be added in the future.
:::

You can install the Weaviate client library with the optional `agents` extras to use Weaviate Agents. This will install the `weaviate-agents` package along with the `weaviate-client` package.

Install the client library using the following command:

<Tabs groupId="languages">
<TabItem value="py_agents" label="Python">

```shell
pip install -U weaviate-client[agents]
```

#### Troubleshooting: Force `pip` to install the latest version

For existing installations, even `pip install -U "weaviate-client[agents]"` may not upgrade `weaviate-agents` to the [latest version](https://pypi.org/project/weaviate-agents/). If this occurs, additionally run:

```shell
pip install -U weaviate-agents
```

</TabItem>

</Tabs>













## Usage

:::caution

![This Weaviate Agent isn't quit ready yet.](../_includes/agents_coming_soon_light.png#gh-light-mode-only "This Weaviate Agent isn't quit ready yet.")
![This Weaviate Agent isn't quit ready yet.](../_includes/agents_coming_soon_dark.png#gh-dark-mode-only "This Weaviate Agent isn't quit ready yet.")

To be notified when this agent is released, [**sign up here for updates**](https://events.weaviate.io/weaviate-agents).

:::

Transformation operations are asynchronous, and the Transformation Agent will return a job ID to the user. The user can then use this job ID to check the status of the job, and retrieve the results when the job is complete.

To use the Transformation Agent, you must provide the following:

- The Weaviate Cloud instance details (e.g. the `WeaviateClient` object in Python) to the Transformation Agent.
- Either new objects to be added to Weaviate, or existing objects to be updated.
- A list of the transformation operations to be performed.

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

A transformation operation requires:

- Type
- Targets (e.g. objects to be updated, or new objects to be added)
- Instructions
- Context (e.g. existing properties to be used as context)

Here are a few examples of transformation operations:

#### Append new properties to data

Properties of various types can be added to the data, based on one or more existing properties. See the following example operations:

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

Existing properties can be updated based on the context of one or more existing properties. See the following example operations:

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

### Transform at insert

Once the transformation operations are defined, you can create a Transformation Agent, and use it to transform new data at insert.

The vectorization will only occur after the transformation operations are completed and the data is inserted into Weaviate.

The Transformation Agent will return a job ID when the operations are started.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START TransformAtInsert"
            endMarker="# END TransformAtInsert"
            language="py"
        />
    </TabItem>

</Tabs>

### Transform collection data

You can also use the Transformation Agent to transform data in an existing collection. The Transformation Agent will update the specified objects in the collection with the new properties. The objects will be re-vectorized as needed.

The Transformation Agent will return a job ID when the operations are started.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START TransformExisting"
            endMarker="# END TransformExisting"
            language="py"
        />
    </TabItem>

</Tabs>

### Monitor job status

You can use the job ID to monitor the status of the job, and retrieve a response when the job is complete.

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


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
