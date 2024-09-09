---
title: FriendliAI + Weaviate
sidebar_position: 10
image: og/docs/integrations/provider_integrations_friendliai.jpg
# tags: ['model providers', 'friendliai']
---

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

:::info Added in `v1.26.0`
:::

FriendliAI offers a wide range of models for natural language processing and generation. Weaviate seamlessly integrates with FriendliAI APIs, allowing users to leverage FriendliAI's powerful inference engine within the Weaviate database.

FriendliAI integration empowers developers to build sophisticated AI-driven applications with ease.

## Integrations with FriendliAI

### Generative AI models for RAG

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_friendliai_rag_single.png)

FriendliAI's generative AI models can generate human-like text based on given prompts and contexts, showing groundbreaking performance at a reasonable price.

[Weaviate's generative AI integration](./generative.md) enables users to perform Retrieval Augmented Generation (RAG) directly within the Weaviate database. This combines Weaviate's efficient storage and fast retrieval capabilities with FriendliAI's generative AI models to generate personalized and context-aware responses.

Visit [FriendliAI generative AI integration page](./generative.md) for more information on our integrations with FriendliAI.

## Summary

This integration enables developers to harness the power of FriendliAI's inference engine within Weaviate.

FriendliAI helps simplify the process of building AI-driven applications and speeds up your development process so that you can focus on creating innovative solutions.

## Get started

To get started, you need to integrate a valid Friendli token (aka Personal Access Token) to Weaviate for these integrations. Go to [Friendli Suite](https://suite.friendli.ai/) to sign up and obtain a personal access token.

Then, go to the relevant integrations page to learn how to configure Weaviate with the FriendliAI models and start using them in your applications.

- [Generative AI](./generative.md)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
