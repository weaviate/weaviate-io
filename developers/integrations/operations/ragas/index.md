---
title: Ragas
sidebar_position: 4
image: og/integrations/home.jpg
---
[Ragas](https://docs.ragas.io/en/stable/) is a framework to help you evaluate your retrieval augmented generation (RAG) applications.

## Ragas and Weaviate
The Ragas metrics are:
* `faithfulness`
* `answer_relevancy`
* `context_precision`
* `context_recall`

To use Ragas, you'll need to store the `question`, `answer`, `ground_truths`, and `contexts` in a json object to send to Ragas.

## Our Resources
[**Hands on Learning**](#hands-on-learning): Build your technical understanding with end-to-end tutorials.

### Hands on Learning

| Topic | Description | Resource |
| --- | --- | --- |
| Introduction Ragas Demo | Learn how to use Weaviate and Ragas | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/operations/ragas/ragas-demo.ipynb) |
| Ragas and LangChain | Learn how to connect Ragas and LangChain. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/operations/ragas/RAGAs-RAG-langchain.ipynb) |