---
title: DeepEval
sidebar_position: 2
image: og/integrations/home.jpg
---

[DeepEval](https://docs.confident-ai.com/) is an open-source LLM evaluation framework, built for engineers to unit-test LLM applications and AI Agents. It provides out-of-the-box LLM-powered metrics, including RAG, conversational, red-teaming, agentic, multimodal, and custom metrics.

## DeepEval and Weaviate
You can use DeepEval to optimize search, retrieval, and RAG with Weaviate by leveraging DeepEval's custom and RAG metrics to select the best hyperparameters like `embedding model` and `top-K` for your Weaviate collection.

### Custom Metrics 
1. [G-Eval](https://docs.confident-ai.com/docs/metrics-llm-evals)
2. [DAG](https://docs.confident-ai.com/docs/metrics-dag)

### RAG Metrics 
1. [Answer Relevancy](https://docs.confident-ai.com/docs/metrics-answer-relevancy)
2. [Faithfulness](https://docs.confident-ai.com/docs/metrics-faithfulness)
3. [Contextual Precision](https://docs.confident-ai.com/docs/metrics-contextual-precision)
4. [Contextual Recall](https://docs.confident-ai.com/docs/metrics-contextual-recall)
5. [Contextual Relevancy](https://docs.confident-ai.com/docs/metrics-contextual-relevancy)

## Hands on Learning

| Topic | Description | Resource |
| --- | --- | --- |
| Optimizing RAG with DeepEval | This notebook shows how to build a RAG pipeline using Weaviate and how to optimize its performance with DeepEval. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/operations/deepeval/rag_evaluation_deepeval.ipynb) |