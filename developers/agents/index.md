---
title: Introduction
sidebar_position: 10
image: og/docs/agents.jpg
# tags: ['agents', 'getting started']
---

# Weaviate Agents - Introduction

![Weaviate Agents - Coming soon](./_includes/agents_coming_soon.png "Weaviate Agents - Coming soon. Weaviate agents are not quite available yet. Please note that the API / code examples shown here are indicative, and may change when the agents / client libraries launch.")

Weaviate Agents are pre-built agentic services designed for specific tasks. They are available out-of-the-box for Weaviate Cloud users to interact with their data in Weaviate Cloud to simplify data engineering and AI development workflows.

## How Weaviate Agents work

Weaviate Agents have been pre-trained on Weaviate’s APIs, making them experts in performing Weaviate-specific data tasks.

All you need to do is provide inputs, and the particular Agent will perform the required task using your data.

:::info Weaviate Agents is not an agent framework
Weaviate Agents is not a framework for building agents. It is a set of pre-built agentic services for Weaviate.
:::

## Query Agent

The [Query Agent](./query.md) provides an answer to your natural language questions, by querying your stored data.

[![Click to read more about the Query Agent](./_includes/query_agent_usage_light.png#gh-light-mode-only "Click to read more about the Query Agent")](./query.md)
[![Click to read more about the Query Agent](./_includes/query_agent_usage_dark.png#gh-dark-mode-only "Click to read more about the Query Agent")](./query.md)

[Read more about the Query Agent](./query.md)

## Transformation Agent

The [Transformation Agent](./transformation.md) enhances your data by manipulating it based on your instructions.

[![Click to read more about the Transformation Agent](./_includes/transformation_agent_overview.png "Click to read more about the Transformation Agent")](./transformation.md)

[Read more about the Transformation Agent](./transformation.md)

## Personalization Agent

The [Personalization Agent](./personalization.md) customizes outputs based on persona-specific information, which can even be learned over time.

[![Click to read more about the Personalization Agent](./_includes/personalization_agent_overview.png "Click to read more about the Personalization Agent")](./personalization.md)

[Read more about the Personalization Agent](./personalization.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
