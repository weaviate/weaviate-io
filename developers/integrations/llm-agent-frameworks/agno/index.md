---
title: Agno
sidebar_position: 1
---

[Agno](https://docs.agno.com/introduction) is a lightweight library for building Multimodal Agents. It exposes LLMs as a unified API and gives them superpowers like memory, knowledge, tools and reasoning.


## Agno and Weaviate
Weaviate is a [supported vector database](https://docs.agno.com/vectordb/weaviate) in Agno. You first create the vector store with:

```python
from agno.agent import Agent
from agno.knowledge.pdf_url import PDFUrlKnowledgeBase
from agno.vectordb.search import SearchType
from agno.vectordb.weaviate import Distance, VectorIndex, Weaviate

vector_db = Weaviate(
    collection="recipes",
    search_type=SearchType.hybrid,
    vector_index=VectorIndex.HNSW,
    distance=Distance.COSINE,
    local=True,  # Set to False if using Weaviate Cloud and True if using local instance
)
```

Then you'll create the knowledge base for your agents with:

```python
knowledge_base = PDFUrlKnowledgeBase(
    urls=["https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"],
    vector_db=vector_db,
)
```

## Our Resources 
[**Hands on Learning**](#hands-on-learning): Build your technical understanding with end-to-end tutorials.

### Hands on Learning

| Topic | Description | Resource | 
| --- | --- | --- |
| Weaviate Query Agent with Agno | This notebook will show you how to define the Weaviate Query Agent as a tool through Agno. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-agent-frameworks/agno/agno-weaviate-query-agent.ipynb) |
