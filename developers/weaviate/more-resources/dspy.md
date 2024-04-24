---
title: DSPy Integration
sidebar_position: 5
image: og/docs/more-resources.jpg
---

[DSPy](https://github.com/stanfordnlp/dspy) is a framework for programming language models created by Stanford NLP. DSPy introduces two key concepts: programming model and optimizers. The programming model allows you to define each component that makes a language model request. This includes an input and output fields, task description, and calls to your vector database like Weaviate. The optimizers will compile your DSPy program to tune the language model prompt and/or the weights. 

## DSPy and Weaviate

Weaviate is integrated with DSPy through the retriever module! You will need to connect to your Weaviate cluster through [WCS](https://console.weaviate.cloud/) or [localhost](http://localhost), and pass in your collection:

```python
weaviate_client = weaviate.Client("http://localhost:8080") # or pass in your WCS cluster url

retriever_module = WeaviateRM("WeaviateBlogChunk", # collection name
                    weaviate_client=weaviate_client)
```

## Our Resources 
Here are a few resources on using DSPy from the Weaviate team!

The resources are broken into two categories: 
1. [**Hands on Learning**](#hands-on-learning): Content framed to build your technical understanding with end-to-end tutorials. 

2. [**Read and Listen**](#read-and-listen): Content designed to help develop your conceptual understanding of these technologies.


### Hands on Learning 

| Topic | Details |
| --- | --- |
| [**Getting Started with RAG in DSPy**](https://youtu.be/CEuUG4Umfxs?si=4Gp8gR9glmoMJNaU) | Connor walks you through the four components needed to build a DSPy program: Installation, settings, Datasets with `dspy.Example`, LLM Metrics, The DSPy programming model, and Optimization. [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/dspy/1.Getting-Started-with-RAG-in-DSPy.ipynb) |
| [**DSPy + Weaviate for the Next Generation of LLM Apps**](https://youtu.be/ickqCzFxWj0?si=AxCbD9tq2cbAH6bB) | Erika shows how to build a 4-layer DSPy program for generating blog posts from queries. [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/dspy/2.Writing-Blog-Posts-with-DSPy.ipynb) |
| [**RAG with Persona**](https://twitter.com/ecardenas300/status/1765444492348243976) | Erika demonstrates building a compound AI system with DSPy, Cohere, and Weaviate, adding persona to language model outputs. [Notebook](https://github.com/weaviate/recipes/tree/main/integrations/dspy/fullstack-recipes/RAGwithPersona) |
| [**Adding Depth to RAG Programs**](https://youtu.be/0c7Ksd6BG88?si=YUF2wm1ncUTkSuPQ) | Connor discusses enhancing DSPy programs by integrating unique input-output examples and multiple LLMs. [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/dspy/3.Adding-Depth-to-RAG-Programs.ipynb) |
| [**Hurricane: Writing Blog Posts with Generative Feedback Loops**](https://weaviate.io/blog/hurricane-generative-feedback-loops) | Introduction to Hurricane, a web app for demonstrating Generative Feedback Loops with blog posts. [Notebook](https://github.com/weaviate-tutorials/Hurricane) |
| [**Structured Outputs with DSPy**](https://youtu.be/tVw3CwrN5-8?si=P7fWeXzQ7p-2SFYF) | Connor explains three methods for structuring outputs in DSPy programs. [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/dspy/4.Structured-Outputs-with-DSPy.ipynb) |
| [**Building RAG with Command R+ from Cohere, DSPy, and Weaviate**](https://youtu.be/6dgXALb_5Ag?si=nSX2AnmpbUau_2JF) | Overview of Command R+ with a quick RAG demo in DSPy. [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/dspy/llms/Command-R-Plus.ipynb) |
| [**Advanced Optimizers in DSPy**](https://github.com/weaviate/recipes/blob/main/integrations/dspy/5.Advanced-Optimizers.ipynb) | Dive into optimizing DSPy programs with various techniques. [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/dspy/5.Advanced-Optimizers.ipynb) |
| [**Llama 3 RAG Demo with DSPy Optimization, Ollama, and Weaviate**](https://youtu.be/1h3_h8t3L14?si=G4d-aY5Ynpv8ckea) | Connor discusses integrating Llama3 with DSPy and optimizing prompts with MIPRO. [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/dspy/llms/Llama3.ipynb) |



### Read and Listen

| Topic | Details |
| --- | --- |
| [**DSPy and ColBERT with Omar Khattab! - Weaviate Podcast #85**](https://www.youtube.com/watch?v=CDung1LnLbY) | Connor is joined by Omar Khattab to discuss DSPy and ColBERT. |
| [**DSPy Explained**](https://youtu.be/41EfOY0Ldkc?si=sFieUeHc9rXRn6uk) | Connor covers the core concepts of DSPy and walks through the introduction notebooks showing how to compile a simple retrieve-then-read RAG program and Multi-Hop RAG Program. |
| [**Intro to DSPy: Goodbye Prompting, Hello Programming**](https://towardsdatascience.com/intro-to-dspy-goodbye-prompting-hello-programming-4ca1c6ce3eb9) | Leonie writes about DSPy and how it solves the fragility problem in LLM-based applications. |
| [**Fine-Tuning Cohere’s Reranker**](/blog/fine-tuning-coheres-reranker) | Erika shows you how to generate synthetic data with DSPy to fine-tune Cohere’s reranker model. |
| [**Your Language Model Deserves Better Prompting**](/blog/dspy-optimizers) | Erika and Connor cover the optimizers in DSPy for prompt tuning. |

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />