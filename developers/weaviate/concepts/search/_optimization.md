---
title: Best practices
sidebar_position: 5
image: og/docs/concepts.jpg
# tags: ['concepts', 'search', 'optimization']
---

## Optimizing Relevance

Search relevance may be affected by the following aspects.

### Vector Search Quality

#### Vectorizer model selection

The vectorizer model determines how an object is converted into a vector.

The model should be appropriate for your data modality (text, images, audio, etc.). Consider domain-specific models, and balancing model complexity and performance requirements.

Weaviate integrates with ::model provider integrations::

#### Which fields to vectorize

Identify fields that contribute most to semantic understanding. Consider combining multiple fields into a single vector representation. Evaluate the impact of vectorizing structured vs. unstructured data

#### ANN index settings

### Keyword Search

- Index property length, null properties, etc.
- How these settings affect search behavior and available queries
- k1 and b values

### Hybrid search

- Hybrid fusion method
- Alpha values

## Search Performance and Scalability

- Vector index settings & query performance
- Quantization and queries
- Best practices for optimizing search in large datasets

## AI Models and Search

### Overview

- Role of AI models in searches (vector search; reranking; gen search) (clarify their role in others)

### Model selection guide

- Criteria for choosing appropriate models
- Trade-offs between different model types

## Search Relevance and Ranking

- How Weaviate determines result order
- Techniques for improving search relevance

## Common Use Cases

- E-commerce product search
- Content recommendation systems
- Semantic document retrieval
- Image and multimedia search

## Troubleshooting and Common Pitfalls

- Addressing frequent issues in search implementation
- Tips for diagnosing and resolving search-related problems
