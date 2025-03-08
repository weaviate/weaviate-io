---
title: Query Agent
sidebar_position: 10
image: og/docs/agents.jpg
# tags: ['agents', 'getting started', 'query agent']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/developers/agents/_includes/query_agent.py';

# Weaviate Query Agent: Overview

:::caution Technical Preview

![This Weaviate Agent is in technical preview.](../_includes/agents_tech_preview_light.png#gh-light-mode-only "This Weaviate Agent is in technical preview.")
![This Weaviate Agent is in technical preview.](../_includes/agents_tech_preview_dark.png#gh-dark-mode-only "This Weaviate Agent is in technical preview.")

To be notified with news on this agent, [**sign up here for updates**](https://events.weaviate.io/weaviate-agents).

:::

The Weaviate Query Agent is a pre-built agentic service designed to answer natural language queries based on the data stored in Weaviate Cloud.

The user simply provides a prompt/question in natural language, and the Query Agent takes care of all intervening steps to provide an answer.

![Weaviate Query Agent from a user perspective](../_includes/query_agent_usage_light.png#gh-light-mode-only "Weaviate Query Agent from a user perspective")
![Weaviate Query Agent from a user perspective](../_includes/query_agent_usage_dark.png#gh-dark-mode-only "Weaviate Query Agent from a user perspective")

:::info Changelog and feedback
The official changelog for Weaviate Agents can be [found here](https://weaviateagents.featurebase.app/changelog). If you have feedback, such as feature requests, bug reports or questions, please [submit them here](https://weaviateagents.featurebase.app/), where you will be able to see the status of your feedback and vote on others' feedback.
:::

## Architecture

The Query Agent is provided as a service on Weaviate Cloud.

When a user provides a prompt/query, the query agent analyses it and any other known context to autonomously carry out the searches itself.

:::tip Query Agent context
The Query agent analyses collection and property descriptions to better understand how to construct relevant queries.<br/>

The context may also include previous conversation history, and any other relevant information.
:::

## Query Agent: visualized workflow

![Weaviate Query Agent at a high level](../_includes/query_agent_architecture_light.png#gh-light-mode-only "Weaviate Query Agent at a high level")
![Weaviate Query Agent at a high level](../_includes/query_agent_architecture_dark.png#gh-dark-mode-only "Weaviate Query Agent at a high level")

The Query Agent follows these high-level steps:

- Use appropriate foundation models (e.g. large language models) to analyze the task & the required queries. Determine the exact queries to perform. (Steps 1 & 2)
- Send queries to Weaviate. Weaviate vectorizes the queries as needed using the specified vectorizer integration. (Steps 3-5)
- Receive the results from Weaviate, and use appropriate foundation models to generate the final respond to the user prompt/query. (Step 6)

Then, the Query Agent returns the answer to the user, as well as intermediate outputs, such as the underlying search results from Weaviate.

Note that the term `Query Agent` refers to the entire system. The Query Agent may comprise multiple subsystems, such as microservices and/or agents under the hood, each responsible for a specific task.

![Weaviate Query Agent comprises multiple agents](../_includes/query_agent_info_light.png#gh-light-mode-only "Weaviate Query Agent comprises multiple agents")
![Weaviate Query Agent comprises multiple agents](../_includes/query_agent_info_dark.png#gh-dark-mode-only "Weaviate Query Agent comprises multiple agents")

## Basic Usage

Here is an overview of how to use the this Weaviate Agent. For more detailed information, refer to the [Usage](./usage.md) page.

### Prerequisites

This Agent is available exclusively for use with a Weaviate Cloud instance, and a supported version of the Weaviate client library.

### Example Usage

Pass an instance of the Weaviate client to the Query Agent, and the Query Agent will extract the necessary information from the client to perform the query.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START InstantiateQueryAgent"
            endMarker="# END InstantiateQueryAgent"
            language="py"
        />
    </TabItem>

</Tabs>

Then, provide a natural language query input. The Query Agent will process the query, perform the necessary searches in Weaviate, and return the answer.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START BasicQuery"
            endMarker="# END BasicQuery"
            language="py"
        />
    </TabItem>

</Tabs>

The Query Agent can even handle follow-up queries, using the previous response as additional context.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START FollowUpQuery"
            endMarker="# END FollowUpQuery"
            language="py"
        />
    </TabItem>

</Tabs>

### Further Documentation

For more detailed information on how to use this Agent, refer to the [Usage](./usage.md) page.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>

