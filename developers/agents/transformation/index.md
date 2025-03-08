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

:::caution

![This Weaviate Agent isn't quit ready yet.](../_includes/agents_coming_soon_light.png#gh-light-mode-only "This Weaviate Agent isn't quit ready yet.")
![This Weaviate Agent isn't quit ready yet.](../_includes/agents_coming_soon_dark.png#gh-dark-mode-only "This Weaviate Agent isn't quit ready yet.")

To be notified when this agent is released, [**sign up here for updates**](https://events.weaviate.io/weaviate-agents).

:::

The Weaviate Transformation Agent is an agentic service designed to augment and transform data using foundation models.

The Transformation Agent can be used to append new properties and/or update existing properties of data, for new or existing objects in Weaviate.

This can help you to improve the quality of your objects in your Weaviate collections, ready for further use in your applications.

![Weaviate Transformation Agent overview](../_includes/transformation_agent_overview_light.png#gh-light-mode-only "Weaviate Transformation Agent overview")
![Weaviate Transformation Agent overview](../_includes/transformation_agent_overview_dark.png#gh-dark-mode-only "Weaviate Transformation Agent overview")

## Architecture

The Transformation Agent is provided as a service on Weaviate Cloud.

The Transformation Agent can be called upon to perform one or more transformation operations at a time. Each operation is performed:

- On new data being imported into Weaviate, or on existing data in Weaviate.
- To create a new property, or update an existing property.
- Based on the context of one or more existing properties and a specified set of instructions.

The Transformation Agent can thus be used to enhance the data at import time, or to update properties on existing objects.

## Transformation Agent: visualized workflow

![Weaviate Transformation Agent at a high level](../_includes/transformation_agent_architecture_light.png#gh-light-mode-only "Weaviate Transformation Agent at a high level")
![Weaviate Transformation Agent at a high level](../_includes/transformation_agent_architecture_dark.png#gh-dark-mode-only "Weaviate Transformation Agent at a high level")

Let's dive into a little more detail about the Transformation Agent, using a few example workflows:

### Add new properties to data at import time

In this example, the Transformation Agent is used to add new properties to data at import time. The Transformation Agent is provided with a set of instructions for creating new properties, and the set of new objects to be added to Weaviate.

The figure below shows the workflow:

![Weaviate Transformation Agent: Enhance data at import time](../_includes/transformation_agent_new_append_light.png#gh-light-mode-only "Weaviate Transformation Agent: Enhance data at import time")
![Weaviate Transformation Agent: Enhance data at import time](../_includes/transformation_agent_new_append_dark.png#gh-dark-mode-only "Weaviate Transformation Agent: Enhance data at import time")

The Transformation Agent works as follows at a high level:

- The Transformation Agent works with a foundation model to create the new property, based on the instructions provided and the context of the specified existing properties (steps 1-2).
- Insert the transformed objects to Weaviate. Weaviate vectorizes the data as needed using the specified vectorizer integration. (Steps 3-5)
- Receive the job status from Weaviate, which is returned to the user (Step 6).

As a result, Weaviate is populated with transformed versions of the input data provided by the user.

### Update properties on existing objects

In this example, the Transformation Agent is used to update existing properties on objects that already exist in Weaviate. The Transformation Agent is provided with a set of instructions for how to update the existing properties, and which of the existing objects to update.

The figure below shows the workflow:

![Weaviate Transformation Agent: Update properties on existing objects](../_includes/transformation_agent_existing_update_light.png#gh-light-mode-only "Weaviate Transformation Agent: Update properties on existing objects")
![Weaviate Transformation Agent: Update properties on existing objects](../_includes/transformation_agent_existing_update_dark.png#gh-dark-mode-only "Weaviate Transformation Agent: Update properties on existing objects")

The Transformation Agent works as follows at a high level:

- The Transformation Agent retrieves the existing objects from Weaviate, based on the specified criteria (steps 1-2).
- The Transformation Agent works with a foundation model to create new versions of the property, based on the instructions provided and the context of the specified existing properties (steps 3-4).
- Update the transformed objects in Weaviate. Weaviate vectorizes the data as needed using the specified vectorizer integration. (Steps 5-7)
- Receive the job status from Weaviate, which is returned to the user (Step 8).

As a result, the specified objects in Weaviate are updated, with the new versions of the specified properties. For clarity, this would not change the number of objects in Weaviate, but would update the properties of the specified objects.

## Basic Usage

Here is an overview of how to use the this Weaviate Agent. For more detailed information, refer to the [Usage](./usage.md) page.

### Prerequisites

This Agent is available exclusively for use with a Weaviate Cloud instance, and a supported version of the Weaviate client library.

### Example Usage

To use the Transformation Agent, instantiate it with the following inputs:

- An instance of the Weaviate client, connected to a Weaviate Cloud instance.
- Either new objects to be added to Weaviate, or existing objects to be updated.
- A list of the transformation operations to be performed.

And then start the update(s). Transformation operations are asynchronous, and the Transformation Agent will return a job ID. You then use this job ID to check the status of the job.

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

