---
title: Usage
sidebar_position: 30
image: og/docs/agents.jpg
# tags: ['agents', 'getting started', 'query agent']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/developers/agents/_includes/query_agent.py';

# Weaviate Query Agent: Usage

:::caution Technical Preview

![This Weaviate Agent is in technical preview.](../_includes/agents_tech_preview_light.png#gh-light-mode-only "This Weaviate Agent is in technical preview.")
![This Weaviate Agent is in technical preview.](../_includes/agents_tech_preview_dark.png#gh-dark-mode-only "This Weaviate Agent is in technical preview.")

To be notified with news on this agent, [**sign up here for updates**](https://events.weaviate.io/weaviate-agents).

:::

The Weaviate Query Agent is a pre-built agentic service designed to answer natural language queries based on the data stored in Weaviate Cloud.

The user simply provides a prompt/question in natural language, and the Query Agent takes care of all intervening steps to provide an answer.

![Weaviate Query Agent from a user perspective](../_includes/query_agent_usage_light.png#gh-light-mode-only "Weaviate Query Agent from a user perspective")
![Weaviate Query Agent from a user perspective](../_includes/query_agent_usage_dark.png#gh-dark-mode-only "Weaviate Query Agent from a user perspective")

This page describes how to use the Query Agent to answer natural language queries, using your data stored in Weaviate Cloud.

## Prerequisites

### Weaviate instance

The Query Agent is available exclusively for use with a Weaviate Cloud instance.

Refer to the [Weaviate Cloud documentation](/developers/wcs/index.mdx) for more information on how to set up a Weaviate Cloud instance.

You can try the Query Agent with a free Sandbox instance on [Weaviate Cloud](https://console.weaviate.cloud/).

### Client library

You must install the Weaviate client library with the optional `agents` extras to use the Query Agent. Install the client library using the following command:

<Tabs groupId="languages">
<TabItem value="py_agents" label="Python">

```shell
pip install weaviate-client[agents]
```

</TabItem>

</Tabs>

:::note Supported languages
At this time, the Query Agent is available only for Python. Support for other languages will be added in the future.
:::

## How to use the Query Agent

The Query Agent is stateless agentic service. To use it, follow these steps:

1. Instantiate the Query Agent.
    - Pass a Weaviate client object, and a list of collections that the Query Agent may use to answer queries.
1. Provide a query to the Query Agent.

### Instantiate the Query Agent

- Your Weaviate Cloud instance details (e.g. the `WeaviateClient` object in Python) to the Query Agent.
- A list of the collections that the Query Agent may use to answer queries.

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

### Queries

Provide a natural language query to the Query Agent. The Query Agent will process the query, perform the necessary searches in Weaviate, and return the answer.

This is a synchronous operation. The Query Agent will return the answer to the user as soon as it is available.

:::tip Consider your query carefully
The Query Agent will formulate its strategy based on your query. So, aim to be unambiguous, complete, yet concise in your query as much as possible.
:::

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

### Follow-up queries

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

## Inspect responses

The response from the Query Agent will contain the final answer, as well as additional supporting information.

The supporting information may include searches or aggregations carried out, what information may have been missing, and how many LLM tokens were used by the Agent.

### Helper function

Try the provided helper function (e.g. `print_query_agent_response`) to display the response in a readable format.

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

This will print the response and a summary of the supporting information found by the Query Agent.

### Inspection example

This example outputs:

- The original user query
- The answer provided by the Query Agent
- Searches & aggregations (if any) conducted by the Query Agent
- Any missing information

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START InspectResponseExample"
            endMarker="# END InspectResponseExample"
            language="py"
        />
    </TabItem>

</Tabs>

## Advanced options

### Agent instantiation

The Query Agent can be instantiated with additional options, such as:

- `system_prompt`: A custom system prompt to replace the default system prompt provided by the Weaviate team.
- `timeout`: The maximum time the Query Agent will spend on a single query, in seconds (server-side default: 60).

### Collection selection

Use `.add_collection` or `.remove_collection` methods on an instantiated `QueryAgent` object to add or remove collections from the Query Agent's list of collections.

### Queries

Use `.view_properties` to define the properties that the Query Agent can look at when answering queries.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>

