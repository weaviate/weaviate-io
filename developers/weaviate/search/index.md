---
title: Search
sidebar_position: 0
image: og/docs/howto.jpg
# tags: ['how to', 'perform a search']
---

Use these **search** how-to guides to find the data you want.

The [query basics](./basics.md) page covers basic search syntax and how to specify the properties you want to retrieve.

These guides cover additional search topics:

- [Vector similarity search](./similarity.md): Covers `nearXXX` searches that search for objects with the most similar vector representations to the query.
- [Image search](./image.md): Use images as input for a similarity search.
- [Keyword search](./bm25.md): A keyword search that uses the BM25F algorithm to rank results.
- [Hybrid search](./hybrid.md): Combines BM25 and similarity search to rank results.
- [Generative search](./generative.md): Use search results as a prompt for an LLM.
- [Reranking](./rerank.md): Rerank retrieved search results using a `reranker` module.
- [Aggregation](./aggregate.md): Aggregate data from a results set.
- [Filters](./filters.md): Apply conditional filters to the search.

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
