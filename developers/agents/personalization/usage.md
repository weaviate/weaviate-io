---
title: Usage
sidebar_position: 30
image: og/docs/agents.jpg
# tags: ['agents', 'getting started', 'personalization agent']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/developers/agents/_includes/personalization_agent.py';

# Weaviate Personalization Agent: Usage

:::caution Technical Preview

![This Weaviate Agent is in technical preview.](../_includes/agents_tech_preview_light.png#gh-light-mode-only "This Weaviate Agent is in technical preview.")
![This Weaviate Agent is in technical preview.](../_includes/agents_tech_preview_dark.png#gh-dark-mode-only "This Weaviate Agent is in technical preview.")

[Sign up here](https://events.weaviate.io/weaviate-agents) for notifications on Weaviate Agents, or visit [this page](https://weaviateagents.featurebase.app/) to see the latest updates and provide feedback.

:::


The Weaviate Personalization Agent is an agentic service designed to return personalized recommendations tailored to each user. The Personalization Agent uses data from the associated Weaviate Cloud instance to provide these recommendations.

:::tip Nomenclature: User vs Developer
The Personalization Agent is all about providing personalized recommendations tailored to a particular person. In this context, that person will be referred to as the `user`. The developer is the person who is using the Personalization Agent to provide these recommendations.
:::

The developer would simply provide a user profile, and the Personalization Agent takes care of all intervening steps to provide a set of personalized recommendations from Weaviate. The resulting workflow for the developer looks as follows:

![Weaviate Personalization Agent from a developer perspective](../_includes/personalization_agent_overview_light.png#gh-light-mode-only "Weaviate Personalization Agent from a developer perspective")
![Weaviate Personalization Agent from a developer perspective](../_includes/personalization_agent_overview_dark.png#gh-dark-mode-only "Weaviate Personalization Agent from a developer perspective")

This page describes how to use the Weaviate Personalization Agent to obtain personalized recommendations from your data stored in Weaviate.

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

To use the Personalization Agent, follow the below high-level steps:

- Create or connect to a personalization agent
- Create or select a user persona
- Add interactions for the given persona
- Obtain personalized recommendations

Optionally, the personalization agent can:
- Perform reranking of the results
- With a further option of custom instructions for the reranking

Example usage is shown below.

### Prerequisites

The Personalization Agent is tightly integrated with Weaviate Cloud. As a result, the Personalization Agent is available exclusively for use with a Weaviate Cloud instance, and a supported version of the client library.

### Connect to Weaviate

You must connect to the Weaviate Cloud instance to use the Personalization Agent. Connect to the Weaviate Cloud instance using the Weaviate client library.

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

### Create or connect to a personalization agent

Personalization Agents are stateful, with user persona data persisting in Weaviate. As a result, you can create a new Personalization Agent or connect to an existing one.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START CreateOrConnectToAgent"
            endMarker="# END CreateOrConnectToAgent"
            language="py"
        />
    </TabItem>
</Tabs>

### Create a user persona

The Personalization Agent is designed to provide personalized recommendations for a specific user.

You can do this through a `Persona`, which is a collection of user properties and interactions.

Each persona will include a user ID, a set of user properties, and a set of interactions.

To create a persona, specify a user ID and the set of user properties to be used for personalization.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START CreatePersona"
            endMarker="# END CreatePersona"
            language="py"
        />
    </TabItem>

</Tabs>

### Add interactions

Interactions form the basis of the personalization process. They are the data points that the Personalization Agent uses to learn about the user and provide personalized recommendations.

To add interactions, select the user persona and provide the interaction details.

The available parameters are:

- `persona_id`: ID of the user persona
- `item_id`: ID of the item being interacted with
- `weight`: weight of the interaction (e.g. 1 for strongest like, -1 for strongest dislike)
- `replace_previous_interaction`: whether to replace the previous interaction with the same item ID
- `created_at`: timestamp of the interaction (affects how much weight the interaction has)

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START AddUserInteractions"
            endMarker="# END AddUserInteractions"
            language="py"
        />
    </TabItem>

</Tabs>

### Perform a basic query

Once a user persona has been created, you can perform queries to obtain personalized recommendations.

As a minimum, simply provide the user ID to the Personalization Agent. The Personalization Agent will process the user ID, perform the necessary searches in Weaviate, and return the personalized recommendations.

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

### Ranking options

The Personalization Agent uses a combination of vector search and LLM-based ranking to provide personalized recommendations. The vector search is based on our analysis of the set of interactions for the user persona. The LLM can optionally be used to rerank the results.

You can use it in one of three modes:

- **Agent-based reranking**: The Personalization Agent will first perform a vector search to retrieve a set of items, and then rerank them using an LLM, based on the user persona. This is the default mode.
- **Agent-based reranking with custom instructions**: If a custom instruction is provided, the Personalization Agent will use this instruction to rerank the results. This allows you to customize the ranking process based on your specific needs.
- **Vector search only**: If you retrieve results without using the agent ranking, the results will be based solely on the vector search.

### Query options

There are a number of options available to customize the query.

- `limit`: maximum number of items to return
- `recent_interactions_count`: number of recent interactions to consider for personalization
- `exclude_interacted_items`: whether to exclude items that the user has already interacted with
- `decay_rate`: decay rate for older interactions (1.0 = heavily discount older interactions; 0.0 = no discount)
- `exclude_items`: list of item IDs to exclude from the recommendations
- `use_agent_ranking`: whether to use the agent to rerank the results
- `instruction`: custom instructions for the reranking
- `explain_results`: whether to include explanations for the results

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START QueryParameters"
            endMarker="# END QueryParameters"
            language="py"
        />
    </TabItem>
</Tabs>

### Inspect results

The response from the Personalization Agent will include the personalized recommendations.

In addition to the response objects, the response may include the following information (depending on the options selected):

- Rationale for the recommendations
- For each object:
    - Original rank of the item
    - Personalized rank of the item

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START InspectResults"
            endMarker="# END InspectResults"
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

At this stage, there is a limit of 100 Personalization Agent queries per day per Weaviate Cloud [organization](/developers/wcs/platform/users-and-organizations.mdx#organizations) where the agent-based reranking is used.

There are no limits on the number of queries per day for the vector search only (i.e. without the agent-based reranking).

This limit may change in future versions of the Personalization Agent.

## Questions and feedback

:::info Changelog and feedback
The official changelog for Weaviate Agents can be [found here](https://weaviateagents.featurebase.app/changelog). If you have feedback, such as feature requests, bug reports or questions, please [submit them here](https://weaviateagents.featurebase.app/), where you will be able to see the status of your feedback and vote on others' feedback.
:::

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>

