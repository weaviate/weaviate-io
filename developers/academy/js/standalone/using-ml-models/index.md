---
title: Using ML Models
sidebar_position: 10
---

# Understanding ML Models in Weaviate

## <i class="fa-solid fa-chalkboard-user"></i> Overview

Weaviate leverages two fundamental types of machine learning models to power AI-native applications:

1. **Embedding Models** - Transform data into high-dimensional vector representations
2. **Generative Models** - Create new content based on input prompts and context

This guide will help you understand how these models work together in Weaviate and how to choose the right models for your use case. We'll explore practical applications ranging from semantic search to complex AI agents.

## <i class="fa-solid fa-clipboard-list-check"></i> Prerequisites

Before diving in, make sure you have:

- A Node.js environment with `weaviate-client` installed
- Basic understanding of Weaviate's search functionality
- Intermediate JavaScript programming skills
- Familiarity with vector databases and embeddings (recommended)

## <i class="fa-solid fa-bullseye"></i> Learning Objectives

By the end of this unit, you will be able to:

1. **Differentiate Model Types**
   - Compare embedding models vs generative models
   - Identify the strengths and limitations of each model type
   - Understand how models complement each other in AI applications

2. **Select Appropriate Models**
   - Evaluate model characteristics (speed, accuracy, cost)
   - Choose models based on specific use case requirements
   - Consider deployment constraints and tradeoffs

3. **Build AI Applications**
   - Implement basic RAG (Retrieval-Augmented Generation) systems
   - Create semantic search functionality
   - Design conversational AI interfaces
   - Develop autonomous AI agents

## <i class="fa-solid fa-book"></i> Detailed Guides

Dive deeper into each model type:

- **[Embedding Models](./10_embedding.mdx)**
  - Vector representations
  - Distance metrics
  - Model selection criteria
  - Optimization techniques

- **[Generative Models](./20_generative.mdx)**
  - Text generation capabilities
  - Prompt engineering
  - Context windows
  - Output control

## <i class="fa-solid fa-laptop-code"></i> Common Use Cases

Learn how to combine models for popular applications:

1. **Semantic Search**
   - Using embeddings for similarity search
   - Ranking and relevance scoring
   - Hybrid search approaches

2. **Question Answering**
   - RAG architecture
   - Context retrieval
   - Answer generation

3. **Chatbots**
   - Conversation flow
   - Memory management
   - Response generation

4. **AI Agents**
   - Task planning
   - Tool use
   - Decision making

## Questions and Feedback

We value your input! Help us improve this documentation:

<DocsFeedback/>

---

**Next Steps:**
- Explore the [Embedding Models](./10_embedding.mdx) guide
- Learn about [Generative Models](./20_generative.mdx)
- Check out our [Example Applications](./examples)