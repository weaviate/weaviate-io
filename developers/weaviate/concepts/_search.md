---
title: Search
sidebar_position: 5
image: og/docs/concepts.jpg
# tags: ['vector compression', 'quantization']
---

As a scalable AI-native database, search a core capability for Weaviate. Flexible, fast and scalable search helps users to find the right data quickly even as the dataset grows.

Weaviate supports a variety of search types, including vector search, keyword search, and hybrid search, to meet the needs of different use cases.

Users can also configure search settings to optimize performance and accuracy.

The following sections provide an overview of search in Weaviate, including different search types, configurable query settings, and best practices for search performance and scalability.

## Search process

The following diagram illustrates the search process in Weaviate. Around the core search process, there are several steps that can be taken to improve and manipulate the search results.

| Step | Description |
|------|-------------|
| 1. [Filter](#filter) | Narrow result sets based on criteria |
| 2. [Search](#search) | Find the most relevant entries, using [keyword](#keyword-search), [vector](#vector-search) or [hybrid](#hybrid-search) search types |
| 3. [Reranking](#reranking) | Reorder results using a different (e.g. more complex) model |
| 4. [Generative search](#generative-search--rag) | Perform RAG (Retrieval-Augmented Generation) |

Here's a brief overview of each step:

### Filter

<!--
:::warning TODO
Add simple wide fig
:::
-->

Filters reduce the number of objects based on specific criteria. This can include:

- Text matches
- Numerical thresholds
- Date ranges
- Categorical values
- Geographical locations

Effective filtering can significantly improve search relevance. This is due to filters' ability to precisely reduce the result set based on exact criteria.

:::info How filters interact with searches?
Weaivate applies [pre-filtering](./prefiltering.md), where filters are performed before searches.
<br/>

This ensures that search results overlap with the filter criteria to make sure that the right objects are retrieved.
:::

### Search

<!--
:::warning TODO
Add simple wide fig
:::
-->

Search is about finding the closest, or most relevant data objects. Weaviate supports three primary search types: [vector search](#vector-search), [keyword search](#keyword-search), and [hybrid search](#hybrid-search).

Here's a summary of these search types:

| Search Type | Description |
|-------------|-------------|
| Vector Search | Similarity-based search using vector embeddings. |
| Keyword Search | Traditional text-based search using "token" frequency. |
| Hybrid Search | Combines vector and keyword search results. |

Let's review these search types in more detail.

:::tip Search vs Filter
A filter simply passes or blocks objects based on criteria. Therefore, there is no ranking of results.
<br/>

Unlike filters, Search results will be **ranked** based on their relevance to the query.
:::

#### Vector Search

Similarity-based search using [vector embeddings](#vector-embeddings). This method compares vector representations of the query against the data to find the closest matches, based on a predefined [distance metric](../config-refs/distances.md).

<details>
  <summary>When to use vector search</summary>

Vector search is best suited where a human-like concept of "similarity" can be a good measure of result quality.

For example:
- Semantic text search: Locating documents with similar meanings, even if they use different words.
- Multi-lingual search: Finding relevant content across different languages.
- Image similarity search: Finding visually similar images in a large database.

</details>

#### Keyword Search

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

#### Hybrid Search

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

#### Object retrieval / no search

Although it is not a search type, it is worth mentioning that Weaviate can also retrieve objects without specifying a search type.

For example, you can simply use a filter, or without any other criteria.

In this case, Weaviate will retrieve objects in order of their UUIDs.

### Reranking

<!--
:::warning TODO
Add simple wide fig
:::
-->

Reranking improves search relevance by reordering initial results.

You might ask - why not just use the best model from the start? The answer is that the best models are often computationally expensive. By using a simpler model for the initial search, we can reduce the result set to a manageable size. The reranking algorithm then uses a more computationally expensive model to refine the order of the top results.

### Generative Search / RAG

<!--
:::warning TODO
Add simple wide fig
:::
-->

Generative search is another name for Retrieval-Augmented Generation (RAG). RAG uses AI to generate responses based on a prompt, and the added context that is retrieved through the above search process.

This approach combines the power of large language models with the accuracy of retrieved information.

Example use cases include:
- Provide natural language summaries of retrieved documents
- Chatbot responses based on retrieved information
- Present translations of retrieved information

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
