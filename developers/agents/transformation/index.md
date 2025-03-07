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

