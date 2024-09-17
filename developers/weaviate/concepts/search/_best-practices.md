---
title: Best Practices
sidebar_position: 5
image: og/docs/concepts.jpg
# tags: ['concepts', 'search', 'optimization']
---

# Search: Best Practices

This page lays out suggested best practices for optimizing search quality and performance.

## Filters

Filters narrow down search results based on specific criteria related to properties or metadata.

Weaviate applies [pre-filtering](../prefiltering.md) where filtering is done, and passed to the search as a parameter. This helps to keep the recall high even when the filter is very restrictive.

Enable or disable [indexes for each property](#index-types-and-filters) or [index optional metadata](#optional-metadata-filtering) to trade off filter performance against disk usage.

### Index types and filters

Weaviate makes use of indexes to speed up filtering operations.

[Roaring bitmap indexes (`indexFilterable`)](../prefiltering.md#indexfilterable) were added in `v1.18` to improve the performance of filtering operations. [Range-based indexes (`indexRangeFilters`)](../prefiltering.md#indexrangefilters) were added in `v1.26` to speed up range-based numerical filtering for `int`, `number`, or `date` properties.

These indexes can be [enabled or disabled](../../manage-data/collections.mdx#set-inverted-index-parameters) for each property.

Enabling these indexes will speed up search, at the cost of slight increase in storage requirements both on disk and memory.

As a rule of thumb, we recommend enabling both `indexFilterable` and `indexRangeFilters` unless you are certain that filtering is not required for that property.

### Optional metadata filtering

Each property can optionally be configured for further metadata filtering, if enabled at property creation.

These options are:

- `indexTimestamps`: for timestamp-based filtering (creation time or last modified time)
- `indexNullState`: for filtering by null value
- `indexPropertyLength`: for filtering by text property length

These indexing options will enable corresponding filtering options, at the cost of slight increase in storage requirements both on disk and memory.

## Vector Search

Vector search is a similarity-based search that compares a vector query against stored vector to find the closest matches.

Weaviate supports integrated vectorization of media such as text or image using a configured [model provider integration](../../model-providers/index.md) at import time and at query time.

### Vectorizer model selection

Vectorization is the process of converting data (text, images, etc.) into numerical vectors using a vectorizer model.

1. **Embedding Models**: Weaviate uses machine learning models (e.g., transformers) to convert input data into vector embeddings.
2. **Dimensionality**: Vectors typically have high dimensionality (e.g., 768 or 1536 dimensions) to capture complex semantic relationships.
3. **Semantic Meaning**: The position of vectors in the high-dimensional space represents their semantic relationship to other vectors.

### Approximate Nearest Neighbor (ANN) Search

Vector search in Weaviate uses ANN algorithms to efficiently find similar vectors in high-dimensional spaces.

1. **Exact vs. Approximate**: While exact nearest neighbor search guarantees finding the closest vectors, it's computationally expensive. ANN trades a small amount of accuracy for significant speed improvements.
2. **ANN Algorithms**: Weaviate supports various ANN algorithms, including:
   - HNSW (Hierarchical Navigable Small World): Creates a multi-layer graph structure for efficient searching.
   - PQ (Product Quantization): Compresses vectors to reduce memory usage and speed up search.
3. **Index Building**: Weaviate constructs ANN indexes during data ingestion, optimizing them for fast retrieval during search operations.

### Distance Metrics

Vector similarity is measured using distance metrics. Weaviate supports several distance metrics:

1. **Cosine Similarity**: Measures the cosine of the angle between vectors (default for most use cases).
2. **Euclidean Distance**: Measures the straight-line distance between vectors.
3. **Dot Product**: Calculates the dot product of vectors (useful for certain types of normalized embeddings).

## Keyword Search

### Inverted Indexes

Keyword search in Weaviate relies on inverted indexes, a data structure that maps terms to the documents containing them.

1. **Index Construction**: During data ingestion, Weaviate breaks text into tokens and creates an index mapping each token to the documents it appears in.
2. **Tokenization**: Text is split into individual words or subwords, considering factors like language, stemming, and stop words.
3. **Posting Lists**: For each term, the inverted index maintains a list of documents containing that term, along with additional information like term frequency.

### BM25 Algorithm

Weaviate uses the BM25F algorithm to rank results in keyword searches.

1. **Term Frequency (TF)**: Measures how often a term appears in a document.
2. **Inverse Document Frequency (IDF)**: Measures how rare or common a term is across all documents.
3. **Field Weights**: BM25F allows different weights for different fields in a document.
4. **Scoring**: Combines TF, IDF, and field weights to produce a relevance score for each document.

## Hybrid Search

Hybrid search combines vector and keyword search to leverage the strengths of both approaches.

### Fusion Methods

Weaviate offers two fusion methods to combine vector and keyword search results:

1. **Relative Score Fusion**:
   - Normalizes vector similarities and BM25 scores to a common scale.
   - Combines normalized scores using a weighted sum.
2. **Ranked Fusion**:
   - Assigns scores based on the rank of each object in vector and keyword results.
   - Combines rank-based scores to produce final ordering.

### Alpha Parameter

The alpha parameter controls the balance between vector and keyword search in hybrid searches:

- Alpha = 0: Pure keyword search
- Alpha = 1: Pure vector search
- 0 < Alpha < 1: Weighted combination of both

## Performance Considerations

1. **Indexing**: Building efficient indexes (both ANN and inverted) is crucial for search performance.
2. **Sharding**: Weaviate can distribute data across multiple shards for improved scalability.
3. **Caching**: Proper caching strategies can significantly improve response times for repeated or similar queries.
4. **Hardware**: GPU acceleration can boost performance, especially for vector operations.

## Reranking

Reranking is a technique used to improve search relevance by reordering initial search results using a more sophisticated model or different criteria.

### Cross-Encoder Models

1. **Bi-Encoder vs. Cross-Encoder**: While initial retrieval often uses bi-encoder models for efficiency, reranking typically employs cross-encoder models for higher accuracy.
2. **Attention Mechanism**: Cross-encoders process query and document pairs together, allowing for more nuanced understanding of relevance.
3. **Computational Trade-off**: Cross-encoders are more computationally expensive, hence their use on a smaller subset of initially retrieved results.


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

## Generative Search (RAG)

Generative search, also known as Retrieval Augmented Generation (RAG), combines traditional search mechanisms with generative AI models to produce new content based on retrieved information.

### RAG Architecture

1. **Retriever**: Uses Weaviate's search capabilities (vector, keyword, or hybrid) to find relevant information.
2. **Generator**: Employs a large language model (LLM) to generate responses based on the retrieved information and the user query.
3. **Prompt Engineering**: Crafts effective prompts that combine the user query with retrieved information to guide the LLM's output.

### Integration with Language Models

1. **API Connections**: Weaviate integrates with various LLM providers like OpenAI, Cohere, and Google.
2. **Model Selection**: Users can choose appropriate models based on factors like performance, cost, and specific use case requirements.
3. **Token Management**: Handles token limits and truncation to ensure effective use of LLM APIs.

### RAG Workflow

1. **Query Processing**: Analyze the user query to determine search parameters.
2. **Information Retrieval**: Use Weaviate's search capabilities to find relevant documents or data points.
3. **Context Preparation**: Prepare retrieved information as context for the generative model.
4. **Response Generation**: Send the query and prepared context to the LLM to generate a response.
5. **Post-processing**: Optionally refine or format the generated response before returning it to the user.


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
