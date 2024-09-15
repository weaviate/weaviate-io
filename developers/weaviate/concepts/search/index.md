---
title: Search
sidebar_position: 5
image: og/docs/concepts.jpg
# tags: ['concepts', 'search']
---

Weaviate performs flexible, fast and scalable searches to help users to find the right data quickly even with billion-scale datasets.

With Weaviate, you can perform variety of search types to suit your needs, and configure search settings to optimize performance and accuracy.

The following sections provide a conceptual overview of search in Weaviate, including [an overview of the search process and types](#search-process).

## Search process

The following table illustrates the search process in Weaviate. Around the core search process, there are several steps that can be taken to improve and manipulate the search results.

| Step | Description | Optional |
|------|-------------|----------|
| 1. [Retrieval](#retrieval) | <strong>[Filter](#retrieval-filter):</strong> Narrow result sets based on criteria<br/><strong>[Search](#retrieval-search):</strong> Find the most relevant entries, using one of [keyword](#keyword-search), [vector](#vector-search) or [hybrid](#hybrid-search) search types<br/> | Required |
| 2. [Reranking](#reranking) | Reorder results using a different (e.g. more complex) model | Optional |
| 3. [Generative](#generative-search--rag) | Send retrieved data and a prompt to a generative AI model. Also called retrieval augmented generation, or RAG. | Optional |

Here is a brief overview of each step:

### Retrieval: Filter

:::info In one sentence
<i class="fa-solid fa-filter"></i> A filter reduces the number of objects based on specific criteria.
:::

Filters reduce the number of objects based on specific criteria. This can include:

- Text matches
- Numerical thresholds
- Date ranges
- Categorical values
- Geographical locations

Effective filtering can significantly improve search relevance. This is due to filters' ability to precisely reduce the result set based on exact criteria.

:::info How do filters interact with searches?
Weaivate applies [pre-filtering](../prefiltering.md), where filters are performed before searches.
<br/>

This ensures that search results overlap with the filter criteria to make sure that the right objects are retrieved.
:::

<details>
  <summary>Filter: Example</summary>

In a dataset such as `animal_objs` below, you could filter by a specific color to retrieve only objects that match this criterion.
<br/>

```json
[
    {"description": "brown dog"},
    {"description": "small domestic black cat"},
    {"description": "orange cheetah"},
    {"description": "black bear"},
    {"description": "large white seagull"},
    {"description": "yellow canary"},
]
```

A filter for `"black"` in the `"description"` would return only the objects with a black color.

- `{'description': 'black bear'}`
- `{'description': 'small domestic black cat'}`
<br/>

In Weaviate, the order of these results are based on the UUIDs of the objects, if no other ranking is applied. As a result, the order of these objects would be essentially random, as the filter only passes or blocks objects based on the criteria.
</details>

### Retrieval: Search

:::info In one sentence
<i class="fa-solid fa-magnifying-glass"></i> A search produces an ordered list of objects based on relevance to a query.
:::

Search is about finding the closest, or most relevant data objects. Weaviate supports three primary search types: [vector search](#vector-search), [keyword search](#keyword-search), and [hybrid search](#hybrid-search).

Here's a summary of these search types:

| Search Type | Description |
|-------------|-------------|
| Vector Search | Similarity-based search using vector embeddings. |
| Keyword Search | Traditional text-based search using "token" frequency. |
| Hybrid Search | Combines vector and keyword search results. |

:::tip Search vs Filter
A filter simply passes or blocks objects based on criteria. Therefore, there is no ranking of results.
<br/>

Unlike filters, Search results will be **ranked** based on their relevance to the query.
:::

Let's review these search types in more detail.

#### Keyword Search

Keyword search ranks results based on keyword match "scores". These scores are based on how often tokens in the query appear in each data object. These metrics are combined using the [BM25 algorithm](#bm25f-algorithm) to produce a score.

<details>
  <summary>Keyword Search: Example</summary>

In a dataset such as `animal_objs` below, you could perform keyword searches by a specific color to retrieve how significant they are.
<br/>

```json
[
    {"description": "brown dog"},
    {"description": "small domestic black cat"},
    {"description": "orange cheetah"},
    {"description": "black bear"},
    {"description": "large white seagull"},
    {"description": "yellow canary"},
]
```

A keyword search for `"black"` would return only the objects with a black color, as before. But here, the results are ranked based on the BM25 algorithm.
1. `{'description': 'black bear'}`
1. `{'description': 'small domestic black cat'}`
<br/>

Here `{"description": "black bear"}` has a higher score than `{"description": "small domestic black cat"}` because the term "black" is a larger proportion of the text.
</details>

<details>
  <summary>When to use keyword search</summary>

Keyword search is great where occurrences of certain words strongly indicate the text's relevance.

For example:
- Find medical, or legal literature containing specific terms.
- Search for technical documentation or API references where exact terminology is crucial.
- Locating specific product names or SKUs in an e-commerce database.
- Finding code snippets or error messages in a programming context.

</details>

#### Vector Search

Similarity-based search using [vector embeddings](#vector-embeddings). This method compares vector representations of the query against those of the stored objects to find the closest matches, based on a predefined [distance metric](../../config-refs/distances.md).

In Weaviate, you can perform vector searches in multiple ways. You can search for similar objects based on [a text input](../../search/similarity.md#search-with-text), [a vector input](../../search/similarity.md#search-with-a-vector), or [an exist object](../../search/similarity.md#search-with-an-existing-object). You can even search for similar objects with other modalities such as [with images](../../search/image.md).

<details>
  <summary>Vector Search: Example</summary>

In a dataset such as `animal_objs` below, you could perform vector searches with words that are semantically similar to retrieve how significant they are.
<br/>

```json
[
    {"description": "brown dog"},
    {"description": "small domestic black cat"},
    {"description": "orange cheetah"},
    {"description": "black bear"},
    {"description": "large white seagull"},
    {"description": "yellow canary"},
]
```

A search for `"black"` here would work similarly to the keyword search. But, a vector search would also produce similar results for queries such as `"very dark"`, `"noir"`, or `"ebony"`.
<br/>

This is because vector search is based on the extracted meaning of the text, rather than the exact words used. The vector embeddings capture the semantic meaning of the text, allowing for more flexible search queries.
<br/>

As a result, the top 3 results are:
1. `{'description': 'black bear'}`
1. `{'description': 'small domestic black cat'}`
1. `{'description': 'orange cheetah'}`

</details>

<details>
  <summary>When to use vector search</summary>

Vector search is best suited where a human-like concept of "similarity" can be a good measure of result quality.

For example:
- Semantic text search: Locating documents with similar meanings, even if they use different words.
- Multi-lingual search: Finding relevant content across different languages.
- Image similarity search: Finding visually similar images in a large database.

</details>

#### Hybrid Search

Combines vector and keyword search to leverage the strengths of both approaches. Both searches are carried out and the results are combined using the selected [hybrid fusion method](#hybrid-fusion-method) and the given [alpha](#alpha-hybrid-search) value.

<details>
  <summary>Hybrid Search: Example</summary>

In a dataset such as `animal_objs` below, you could perform hybrid searches to robustly find relevant objects, taking a best-of-both-worlds approach.
<br/>

```json
[
    {"description": "brown dog"},
    {"description": "small domestic black cat"},
    {"description": "orange cheetah"},
    {"description": "black bear"},
    {"description": "large white seagull"},
    {"description": "yellow canary"},
]
```

A hybrid search for `"black canine"` would match well the objects with `"black"` in the description due to its match with the keyword search. So it would surface `{"description": "small domestic black cat"}` and `{"description": "black bear"}` towards the top.
<br/>

But it would also boost objects with `"dog"` in the description, such as `{"description": "brown dog"}`. This is because the vector search would find a high similarity between the query and the word `"dog"`, even though the word `"dog"` is not in the query.
<br/>

As a result, the top 3 results are:
1. `{"description": "black bear"}`
1. `{"description": "small domestic black cat"}`
1. `{"description": "brown dog"}`

</details>

<details>
  <summary>When to use hybrid search</summary>

Hybrid search is great as a starting point, as it is a robust search type. It tends to boost results that perform well in at least one of the two searches.

For example:
- Academic paper search: Finding research papers based on both keyword relevance and semantic similarity to the query.
- Job matching: Identifying suitable candidates by combining keyword matching of skills with semantic understanding of job descriptions.
- Recipe search: Locating recipes that match specific ingredients (keywords) while also considering overall dish similarity (vector).
- Customer support: Finding relevant support tickets or documentation using both exact term matching and conceptual similarity.

</details>

### Retrieval: Unordered

Queries can be formulated without any ranking mechanisms.

For example, a query may simply consist of a filter, or you may wish to iterate through the entire dataset, using the [cursor API](../../manage-data/read-all-objects.mdx).

In such cases of unordered retrieval requests, Weaviate will retrieve objects in order of their UUIDs. This retrieval method will result in an essentially randomly-ordered object list.

### Rerank

:::info In one sentence
<i class="fa-solid fa-sort"></i> A reranker reorders initial retrieval results with a more complex model or different criteria.
:::

Reranking improves search relevance by reordering initial results.

If a collection is [configured with a reranker integration](../../model-providers/index.md), Weaviate will use the configured reranker model to reorder the initial search results.

This allows you to use a more computationally expensive model on a smaller subset of results, improving the overall search quality. Typically, reranking models such as [Cohere Rerank](../../model-providers/cohere/reranker.md) or [Hugging Face Reranker](../../model-providers/transformers/reranker.md) models are cross-encoder models that can provide a more nuanced understanding of the text.

A reranker can also be used to provide a different input query to that used for retrieval, allowing for more complex search strategies.

<details>
  <summary>When to use reranking</summary>

Reranking is useful when you want to improve the quality of search results by applying a more complex model to a smaller subset of results. This may be necessary when the object set is very subtle or specific, such as in particular industries or use cases.

For example, searches in legal, medical, or scientific literature may require a more nuanced understanding of the text. Reranking can help to ensure that the most relevant results are surfaced.
</details>

### Generative search / RAG

:::info In one sentence
<i class="fa-solid fa-robot"></i> Generative search combines search with a generative AI model to produce new content based on the search results.
:::

Generative search, also called retrieval augmented generation or RAG, combines search with a generative AI model to produce new content based on the search results. It is a powerful technique that can leverage the generative capabilities of AI models and the search capabilities of Weaviate.

Weaviate integrates with many popular [generative model providers](../../model-providers/index.md) such as [AWS](../../model-providers/aws/generative.md), [Cohere](../../model-providers/cohere/generative.md), [Google](../../model-providers/google/generative.md), [OpenAI](../../model-providers/openai/generative.md) and [Ollama](../../model-providers/ollama/generative.md).

As a result, generative searches in Weaviate are [easy to set up](../../manage-data/collections.mdx#specify-a-generative-module), and can be conveniently executed as [an integrated, single query](../../search/generative.md#grouped-task-search).

<details>
  <summary>Generative Search: Example</summary>

In a dataset such as `animal_objs` below, you could combine generative search with any other search method to find relevant objects and then transform it.
<br/>

```json
[
    {"description": "brown dog"},
    {"description": "small domestic black cat"},
    {"description": "orange cheetah"},
    {"description": "black bear"},
    {"description": "large white seagull"},
    {"description": "yellow canary"},
]
```

Take an example of a keyword search for `"black"`, and a generative search request `"What do these animal descriptions have in common?"`.
<br/>

The search results consist of `{"description": "black bear"}` and `{"description": "small domestic black cat"}` as you saw before. Then, the generative model would produce an output based on our query. In one example, it produced:
<br/>

```text
"What these descriptions have in common are:

* **Color:** Both describe animals with a **black** color.
* **Species:**  One is an **animal**, the other describes a **breed** of animal (domesticated)."
```
</details>

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
