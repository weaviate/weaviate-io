---
title: Search
sidebar_position: 5
image: og/docs/concepts.jpg
# tags: ['vector compression', 'quantization']
---

## Introduction: Search and Weaviate

As a scalable AI-native database, search a core capability for Weaviate. Flexible, fast and scalable search helps users to find the right data quickly even as the dataset grows.

Weaviate supports a variety of search types, including vector search, keyword search, and hybrid search, to meet the needs of different use cases. Users can also configure search settings to optimize performance and accuracy.

The following sections provide an overview of search in Weaviate, including different search types, configurable query settings, and best practices for search performance and scalability.

## Search Features

The following diagram illustrates the different search features supported by Weaviate, and how they fit together:

| Step | Option | Description |
|------|--------|-------------|
| 1. Filtering | Optional | Pre-filter data before search |
| 2. Search Type | Required (choose one) | - Keyword Search<br>- Vector Search<br>- Hybrid Search |
| 3. Reranking | Optional | Reorder results for better relevance |
| 4. Generative Search | Optional | Apply RAG (Retrieval-Augmented Generation) |

### Filtering

Filtering narrows down results based on specific criteria, such as:

- Date ranges
- Numerical thresholds
- Categorical values
- Geographical locations

Effective filtering can significantly improve search relevance by reducing the dataset before performing searches.

Weaivate applies [pre-filtering](./prefiltering.md), where filtering is performed before searches. A filtered result set is passed to search algorithms as a parameter, so that search results are only considered if they meet the filter criteria. This ensures that the requested number of search results are returned.

### Vector Search

Similarity-based search using [vector embeddings](#vector-embeddings). This method compares vector representations of the query against the data to find the closest matches, based on a predefined [distance metric](../config-refs/distances.md).

<details>
  <summary>When to use vector search</summary>

Vector search is best suited where a human-like concept of "similarity" can be a good measure of result quality.

For example:
- Semantic text search: Locating documents with similar meanings, even if they use different words.
- Multi-lingual search: Finding relevant content across different languages.
- Image similarity search: Finding visually similar images in a large database.

</details>

### Keyword Search

Traditional text-based search using occurrences of "tokens" in the query. This method uses how often the tokens appear in each data object, against how common they are in the dataset. These metrics are combined using the [BM25 algorithm](#bm25f-algorithm) to produce a score.

<details>
  <summary>When to use keyword search</summary>

Keyword search is great where occurrences of certain words strongly indicate the text's relevance.

For example:
- Find medical, or legal literature containing specific terms.
- Search for technical documentation or API references where exact terminology is crucial.
- Locating specific product names or SKUs in an e-commerce database.
- Finding code snippets or error messages in a programming context.

</details>

### Hybrid Search

Combines vector and keyword search to leverage the strengths of both approaches. Both searches are carried out and the results are combined using the selected [hybrid fusion method](#hybrid-fusion-method) and the given [alpha](#alpha-hybrid-search) value.

<details>
  <summary>When to use hybrid search</summary>

Hybrid search is great as a starting point, as it is a robust search type. It tends to boost results that perform well in at least one of the two searches.

For example:
- Academic paper search: Finding research papers based on both keyword relevance and semantic similarity to the query.
- Job matching: Identifying suitable candidates by combining keyword matching of skills with semantic understanding of job descriptions.
- Recipe search: Locating recipes that match specific ingredients (keywords) while also considering overall dish similarity (vector).
- Customer support: Finding relevant support tickets or documentation using both exact term matching and conceptual similarity.

</details>

### Reranking

Reranking improves relevance by reordering initial results with a different model.

The chosen reranking algorithm is applied to a smaller set of results retrieved with the first-stage search. This allows a more computationally expensive algorithm to be used for re-ranking, potentially boosting the relevance of the top results.

### Generative Search / RAG

Generative search is another name for Retrieval-Augmented Generation (RAG). RAG uses AI to generate responses based on a prompt, and the added context that is retrieved through the above search process.

This approach:

- Combines the power of large language models with the accuracy of retrieved information
- Can provide natural language summaries or answers based on search results
- Enhances user experience by offering more context-aware and detailed responses

## Optimizing Search Relevance

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

## Glossary

### Search

#### Vector embeddings

- What is a vector embedding?

#### BM25F algorithm

- What is BM25

#### Hybrid fusion method

-

#### Alpha (hybrid search)

- What is the alpha values

