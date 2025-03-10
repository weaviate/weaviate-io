---
title: Transformation Agent
sidebar_position: 30
image: og/docs/agents.jpg
# tags: ['agents', 'getting started', 'transformation agent']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/developers/agents/_includes/transformation_agent.py';

# Weaviate Transformation Agent

The Weaviate Transformation Agent is an agentic service designed to augment and transform data using generative models. Use the Transformation Agent to append new properties and/or update existing properties of data on existing objects in Weaviate.

![Weaviate Transformation Agent example - append](../_includes/transformation_agent_append_example_light.png#gh-light-mode-only "Weaviate Transformation Agent example - append")
![Weaviate Transformation Agent example - append](../_includes/transformation_agent_append_example_dark.png#gh-dark-mode-only "Weaviate Transformation Agent example - append")

This can help you to improve the quality of your objects in your Weaviate collections, ready for further use in your applications.

:::info Changelog and feedback
The official changelog for Weaviate Agents can be [found here](https://weaviateagents.featurebase.app/changelog). If you have feedback, such as feature requests, bug reports or questions, please [submit them here](https://weaviateagents.featurebase.app/), where you will be able to see the status of your feedback and vote on others' feedback.
:::

## Architecture

The Transformation Agent is provided as a service on Weaviate Cloud. It updates existing Weaviate objects by either appending new properties or updating existing properties.


![Weaviate Transformation Agent overview](../_includes/transformation_agent_overview_light.png#gh-light-mode-only "Weaviate Transformation Agent overview")
![Weaviate Transformation Agent overview](../_includes/transformation_agent_overview_dark.png#gh-dark-mode-only "Weaviate Transformation Agent overview")

Provide a set of instructions to the Transformation Agent, such as the collection to update and existing properties to review and the instructions. The Transformation Agent will then perform the specified operations on the specified objects in Weaviate.

:::note Total object count unaffected
This would not change the number of objects in Weaviate, but would update the properties of the specified objects.
:::

## Transformation Agent: visualized workflow

To transform existing objects, the Transformation Agent follows the workflows shown below.

- The Transformation Agent retrieves the existing objects from Weaviate, based on the specified criteria (steps 1-2).
- The Transformation Agent works with a generative model to create the property value, based on the instructions provided and the context of the specified existing properties (steps 3-4).
- Update the transformed objects in Weaviate. Weaviate vectorizes the data as needed using the specified vectorizer integration. (Steps 5-7)
- Receive the job status from Weaviate, which is returned to the user (Step 8).

### Update properties on existing objects

When updating properties on existing objects, the Transformation Agent replaces the existing property values with the new values. The workflow for this operation is shown below.

![Weaviate Transformation Agent: Update properties on existing objects](../_includes/transformation_agent_existing_update_light.png#gh-light-mode-only "Weaviate Transformation Agent: Update properties on existing objects")
![Weaviate Transformation Agent: Update properties on existing objects](../_includes/transformation_agent_existing_update_dark.png#gh-dark-mode-only "Weaviate Transformation Agent: Update properties on existing objects")

### Append new properties to existing objects

When appending properties to existing objects, the Transformation Agent adds the new values to the objects as new properties. The workflow for this operation is shown below.

![Weaviate Transformation Agent: Append news properties to existing objects](../_includes/transformation_agent_existing_append_light.png#gh-light-mode-only "Weaviate Transformation Agent: Append news properties to existing objects")
![Weaviate Transformation Agent: Append news properties to existing objects](../_includes/transformation_agent_existing_append_dark.png#gh-dark-mode-only "Weaviate Transformation Agent: Append news properties to existing objects")

## Basic Usage

Here is an overview of how to use the this Weaviate Agent. For more detailed information, refer to the [Usage](./usage.md) page.

### Prerequisites

This Agent is available exclusively for use with a Weaviate Cloud instance, and a supported version of the Weaviate client library.

### Example Usage

To use the Transformation Agent, instantiate it with the following inputs:

- An instance of the Weaviate client (e.g. the `WeaviateClient` object in Python), connected to a Weaviate Cloud instance.
- Name of the target collection to be transformed.
- A list of the transformation operations to be performed.

And then start the operations.

Transformation operations are asynchronous. Each operation will return a workflow ID to the user. The user can then use this ID to check its status.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START SimpleTransformationAgentExample"
            endMarker="# END SimpleTransformationAgentExample"
            language="py"
        />
    </TabItem>

</Tabs>

The transformed attributes will become available on each object as the transformation progresses.

### Further Documentation

For more detailed information on how to use this Agent, refer to the [Usage](./usage.md) page.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>

