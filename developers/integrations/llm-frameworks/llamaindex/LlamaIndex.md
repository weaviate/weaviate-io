---
title: LlamaIndex
sidebar_position: 5
image: og/docs/llamaindex.jpg
---

[LlamaIndex](https://www.llamaindex.ai/) is a framework for building large language model (LLM) applications. 

## LlamaIndex and Weaviate
Weaviate is a [supported vector store](https://docs.llamaindex.ai/en/stable/api_reference/storage/vector_store/weaviate/) in LlamaIndex. 

Create a vector store:

```python
vector_store = WeaviateVectorStore(weaviate_client=client, index_name="LlamaIndex")
```

## Our Resources 
The resources are broken into two categories: 
1. [**Hands on Learning**](#hands-on-learning): Build your technical understanding with end-to-end tutorials.

2. [**Read and Listen**](#read-and-listen): Develop your conceptual understanding of these technologies.

### Hands on Learning

| Topic | Description | Resource | 
| --- | --- | --- |
| Data Loaders in LlamaIndex | Learn how to load data into Weaviate using LlamaIndex, and how to connect LlamaIndex to an existing Weaviate cluster. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/llamaindex/data-loaders-episode1/episode1.ipynb) |
| Indexes in LlamaIndex | Learn about the various indexes you can build in LlamaIndex. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/llamaindex/indexes-episode2/indexes-in-llamaindex.ipynb) |
| Recursive Query Engine | Learn how to build a recursive query engine. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/llamaindex/recursive-query-engine/recursive-retrieval.ipynb) |
| Self Correcting Query Engine | Setup your vector store and build a self-correcting query engine. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/llamaindex/self-correcting-query-engine/self-correcting.ipynb) | 
| Simple Query Engine | Build a simple query engine | [Notebook](https://github.com/weaviate/recipes/tree/main/integrations/llm-frameworks/llamaindex/simple-query-engine) |
| SQL Router Query Engine | Build a SQL Query Engine to search through your vector and SQL database. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/llamaindex/sql-router-query-engine/sql-query-router.ipynb) |
| Sub-Question Query Engine | Build a query engine that will break down a complex question into multiple parts. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/llamaindex/sub-question-query-engine/sub_question_query_enginev1.ipynb) |
| Advanced RAG | This notebook walks you through an advanced Retrieval-Augmented Generation (RAG) pipeline using LlamaIndex and Weaviate. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/llamaindex/retrieval-augmented-generation/advanced_rag.ipynb) | 
| Naive RAG | This notebook walks you through a naive Retrieval-Augmented Generation (RAG) pipeline using LlamaIndex and Weaviate. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/llamaindex/retrieval-augmented-generation/naive_rag.ipynb)



### Read and Listen 
| Topic | Description | Resource | 
| --- | --- | --- |
| Episode 1: Data Loading | This episode shows you how to connect your data to LlamaIndex and Weaviate.| [Video](https://youtu.be/Bu9skgCrJY8?feature=shared) | 
| Indexes in LlamaIndex | The video covers the three LlamaIndex indexes (Vector Store Index, List Index, and Tree Index) and walks through the architecture design. The video ends with a demo using the Vector Store Index and List Index.  | [Video](https://youtu.be/6pLgOJrFL38?feature=shared) |
| Episode 3: RAG Techniques in LlamaIndex | Learn about four query engines implemented in LlamaIndex. | [Video](https://youtu.be/Su-ROQMaiaw?feature=shared) | 
| LlamaIndex and Weaviate Blog | An introduction on LlamaIndex and an overview of the integration. | [Blog](https://weaviate.io/blog/llamaindex-and-weaviate) | 
