---
title: Keyword Search (BM25)
sidebar_position: 40
image: og/docs/concepts.jpg
# tags: ['concepts', 'search', 'keyword search', 'bm25', 'keyword']
---

## Overview

Keyword search is an exact matching-based search using "tokens". A keyword search looks for exact matches of tokens contained in the query against those of the stored objects to find the best matches, before returning the top `n` results.

## Keyword search in Weaviate

In Weaviate, a keyword search will return the objects best matching the query, as measured by the BM25 "score".

This is determined by:

- The [tokenization](#tokenization) used to split the source texts into constituent components.
- Any [stopwords](../../config-refs/schema/index.md#stopwords-stopword-lists).
- BM25F [parameters](#bm25-parameters), `b1` and `k`.
- Property [boosting](#property-boosting), if any.

When an input string such as "A red Nike shoe" is provided as the query, Weaviate will:

1. Tokenize the input (to `["a", "red", "nike", "show"]` according to the tokenization schema)
2. Remove any stopword tokens (to `["red", "nike", "show"]`)
3. Perform BM25f calculations against the database, using the provided parameters, taking into any property boosting.


### Tokenization

Tokenization for keyword searches refers to how each source text is split up into individual "tokens" to be compared and matched.

In Weaviate, the default tokenization method is `word`, The `word` tokenizer keeps alphanumeric characters, lowercase them and splits on whitespace.

Other tokenization methods such as `whitespace`, `lowercase`, and `field` are available, as well as specialized ones such as `GSE` or `kagome_kr` for other languages.

See [References: Configuration: Collection definition](../../config-refs/schema/index.md#tokenization) for further details.
