---
title: CrewAI
sidebar_position: 1
---

[CrewAI](https://www.crewai.com/) is a framework for building multi-agent applications.

## CrewAI and Weaviate
Weaviate is a [supported vector search tool](https://docs.crewai.com/tools/weaviatevectorsearchtool) in CrewAI. It enables you to run semantic search queries over your documents stored in your Weaviate cluster. 

You can initialize the tool with:

```python
from crewai_tools import WeaviateVectorSearchTool

# Initialize the tool
tool = WeaviateVectorSearchTool(
    collection_name='example_collections',
    limit=3,
    weaviate_cluster_url="https://your-weaviate-cluster-url.com",
    weaviate_api_key="your-weaviate-api-key",
)
```

## Our Resources 
The resources are broken into two categories: 
1. [**Hands on Learning**](#hands-on-learning): Build your technical understanding with end-to-end tutorials.

2. [**Read and Listen**](#read-and-listen): Develop your conceptual understanding of these technologies.

### Hands on Learning

| Topic | Description | Resource | 
| --- | --- | --- |
| Weaviate Query Agent with Crew AI | This notebook will show you how to define the Weaviate Query Agent as a tool through the Crew AI. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-agent-frameworks/crewai/crewai-query-agent-as-tool.ipynb) | 





### Read and Listen

| Topic | Description | Resource | 
| --- | --- | --- |
| Practical Multi Agent RAG using CrewAI, Weaviate, Groq and ExaTool | Learn how to build RAG powered CrewAI agents that enables code_interpretation, rag, memory, and building a custom tool. | [Blog](https://lorenzejay.dev/articles/practical-agentic-rag) | 
| Rag Techniques Tutorial for Agentic Rag | A video on RAG techniques for beginners. | [Video](https://youtu.be/zXBlvpaFNxE?si=KkE14m1KngPZvu_W) | 
|How to Build an Agentic RAG Recommendation Engine | Learn how you can leverage Knowledge to give your crew of agents access to relevant context and information. | [Video](https://youtu.be/2Fu_GgS-Q4s?si=ZnDeucXrGnG7UaQY) | 