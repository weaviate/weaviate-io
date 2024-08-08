---
title: Replicate
sidebar_position: 2
---

[Replicate](https://replicate.com/) is a platform that allows users to run machine learning models through a cloud API. They host a plethora of open-source models, including embedding and language models, which enables users to run and fine-tune them.

## Replicate and Weaviate
Weaviate does not currently have a direct integration for Replicate. To use models on Replicate, we recommend you use [LlamaIndex](https://docs.llamaindex.ai/en/stable/api_reference/llms/replicate/) or [LangChain](https://python.langchain.com/v0.2/docs/integrations/llms/replicate/) and connect it to your Weaviate vector store. 

## Our Resources 
**Hands on Learning**: Content framed to build your technical understanding with end-to-end tutorials.

| Topic | Description | Resource | 
| --- | --- | --- |
Run Llama 2 on Replicate | Build a LlamaIndex query engine using Replicate, Weaviate, and Llama 2 as the generative model. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/compute-infrastructure/replicate-llama2/notebook.ipynb) |