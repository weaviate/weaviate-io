---
title: Composio
sidebar_position: 1
image: og/integrations/home.jpg
---

[Composio](https://docs.composio.dev/introduction/intro/overview) uses function calling to manage and integrate tools with language models and AI agents.  

## Composio and Weaviate 
With Weaviate's retrieval, you can personalize the agent(s) and make them more context aware. 

The integration is supported through our LangChain vector store. 

To configure the integration, create the vector store and connect to your Weaviate instance:
```python
WeaviateVectorStore.from_documents( )
```

Learn how to [create a vector store](https://python.langchain.com/v0.2/docs/integrations/vectorstores/weaviate/#step-1-data-import).

## Our Resources 
[**Hands on Learning**](#hands-on-learning): Build your technical understanding with end-to-end tutorials.

### Hands on Learning

| Topic | Description | Resource | 
| --- | --- | --- |
| Gmail Agent | Integrate Composio's Gmail tool with Weaviate to create an agent that will respond to new messages. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/function-calling/composio/agent.ipynb) |