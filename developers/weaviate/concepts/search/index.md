---
title: Search
sidebar_position: 5
image: og/docs/concepts.jpg
# tags: ['concepts', 'search']
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

:::warning TODO
Add simple wide fig
:::

Filters reduce the number of objects based on specific criteria. This can include:

- Text matches
- Numerical thresholds
- Date ranges
- Categorical values
- Geographical locations

Effective filtering can significantly improve search relevance. This is due to filters' ability to precisely reduce the result set based on exact criteria.

:::info How filters interact with searches?
Weaivate applies [pre-filtering](../prefiltering.md), where filters are performed before searches.
<br/>

This ensures that search results overlap with the filter criteria to make sure that the right objects are retrieved.
:::

### Search

:::warning TODO
Add simple wide fig
:::

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

Similarity-based search using [vector embeddings](#vector-embeddings). This method compares vector representations of the query against the data to find the closest matches, based on a predefined [distance metric](../../config-refs/distances.md).

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

### Rerank

:::warning TODO
Add simple wide fig
:::

Reranking improves search relevance by reordering initial results.

If a collection is [configured with a reranker integration](../../model-providers/index.md), Weaviate will use the configured reranker model to reorder the initial search results.

This allows you to use a more computationally expensive model on a smaller subset of results, improving the overall search quality.

## Glossary

#### Vector embeddings

A vector embedding captures semantic meaning of an object in a vector space. It consists of a set of numbers that represent the object's features. Vector embeddings are generated by a vectorizer model, which is a machine learning model that is trained for this purpose.

#### BM25F algorithm

The BM25 algorithm ranks matching documents according to their relevance to a given search query. At a high level, the BM25 algorithm uses the count of query terms in the document (term frequency) against the overall frequency of the term in the dataset (inverse document frequency) to calculate a relevance score.

The BM25F variant extends the BM25 algorithm to support multiple fields in the search index.

#### Hybrid fusion method

Weaviate uses a hybrid fusion method to combine the results of vector and keyword searches. The method determines how the results of the two searches are combined to produce the final search results.

There are two algorithms available: `relativeScoreFusion` (default from `1.24`) and `rankedFusion` (default until `1.24`).

With `rankedFusion`, each object is scored according to its position in the results for the given search, starting from the highest score for the top-ranked object and decreasing down the order. The total score is calculated by adding these rank-based scores from the vector and keyword searches.

With `relativeScoreFusion`, each object is scored by *normalizing* the metrics output by the vector search and keyword search respectively. The highest value becomes 1, the lowest value becomes 0, and others end up in between according to this scale. The total score is thus calculated by a scaled sum of normalized vector similarity and normalized BM25 score.

#### Alpha (hybrid search)

The alpha value determines the weight of the vector search results in the final hybrid search results. The alpha value ranges from 0 to 1, where 0 means only keyword search results are considered, and 1 means only vector search results are considered.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
