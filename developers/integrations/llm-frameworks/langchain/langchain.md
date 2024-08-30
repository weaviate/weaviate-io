---
title: LangChain
sidebar_position: 4
---

[LangChain](https://python.langchain.com/v0.2/docs/introduction/) is a framework for building applications that use large language models (LLMs).

## LangChain and Weaviate 
Weaviate is a supported [vector store](https://python.langchain.com/v0.2/docs/integrations/vectorstores/weaviate/#step-1-data-import) in LangChain. You will need a running Weaviate cluster (any deployment) to use the integration.

Connect LangChain to your Weaviate cluster:
```python
weaviate_client = weaviate.connect_to_local()
db = WeaviateVectorStore.from_documents(docs, embeddings, client=weaviate_client)
```

## Our Resources 
The resources are broken into two categories: 
1. [**Hands on Learning**](#hands-on-learning): Build your technical understanding with end-to-end tutorials.

2. [**Read and Listen**](#read-and-listen): Develop your conceptual understanding of these technologies.

### Hands on Learning

| Topic | Description | Resource | 
| --- | --- | --- |
| LangChain LCEL | A notebook that defines a language program with LangChain LCEL, compiles it with DSPy, and converts it back to LangChain LCEL. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/langchain/LCEL/RAG-with-LangChain-LCEL-and-DSPy.ipynb) |
| LangChain and Multi-Tenancy | Build a multi-language RAG by multiple PDFs per tenant with Langchain, OpenAI, and Weaviate. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/langchain/loading-data/langchain-simple-pdf-multitenant.ipynb) |
| Multi-Language RAG | Simple notebook showing you how to build a RAG application using LangChain and Weaviate. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/langchain/loading-data/langchain-simple-pdf.ipynb) |


### Read and Listen 
| Topic | Description | Resource | 
| --- | --- | --- |
| Combining LangChain and Weaviate | Learn about how Weaviate is integrated in LangChain and the different `CombineDocuments` techniques. | [Blog](https://weaviate.io/blog/combining-langchain-and-weaviate) |
| Weaviate Podcast #36 | LangChain and Weaviate with Harrison Chase and Bob van Luijt | [Podcast](https://www.youtube.com/watch?v=lhby7Ql7hbk) |
| Weaviate + LangChain for LLM apps | An overview of how LangChain and Weaviate work together. | [Video](https://youtu.be/7AGj4Td5Lgw?feature=shared) |