---
title: Using Machine Learning Models in Weaviate
sidebar_position: 10
---

# Using Machine Learning Models in Weaviate

## <i class="fa-solid fa-chalkboard-user"></i> Overview

Weaviate leverages two fundamental types of machine learning models to power AI-native applications:

1. **Embedding Models** - Transform data into high-dimensional vector representations
2. **Generative Models** - Create new content based on input prompts and context

This guide will help you understand how these models can be set up in Weaviate, briefly covering the functioning of these models on a high level as well. 

We will look at how to use the search enabled by the two types of embedding models supported in Weaviate; Text embeddings and Multimodal embeddings. 

This guide will also explore practical applications ranging from semantic search to complex AI agents.

## <i class="fa-solid fa-clipboard-list-check"></i> Prerequisites

Before diving in, make sure you have:

- A Node.js environment with `weaviate-client` installed
- Basic understanding of Weaviate's search functionality
- Intermediate JavaScript programming skills
- You must have completed the [quickstart](../../../../../developers/weaviate/quickstart)

## <i class="fa-solid fa-bullseye"></i> Learning Objectives

By the end of this unit, you will be able to:

Learning Goals:

- the core functionalities of embedding and generative models
- Distinguish between text and multimodal embedding types
- Configuring embedding and generative models in Weaviate
- Making semantic and generative searches

Learning Outcomes:

- Create vector embeddings of both text and multimodal data
- Run semantic and generative searches
- configure supported embedding and generative models in Weaviate

## Questions and Feedback

We value your input! Help us improve this documentation:

<DocsFeedback/>

---

**Next Steps:**
- Explore the [Embedding Models](./10_embedding.mdx) guide
- Learn about [Generative Models](./20_generative.mdx)
- Check out our [Example Applications](./examples)