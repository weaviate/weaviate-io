---
title: Search
sidebar_position: 0
image: og/docs/howto.jpg
# tags: ['how to', 'perform a search']
---



## Overview

These **search** how-to guides aim to help you find the data you want using Weaviate.

import BasicPrereqs from '/_includes/prerequisites-quickstart.md';

<BasicPrereqs />

We recommend starting with the [query basics](./basics.md) page.
- It covers the basic syntax of a search (i.e. `Get`) query, and how to specify the properties you want to retrieve.

Then, move onto a how-to guide of your choice. We have separate how-to guides for:

- [Similarity](./similarity.md): Covers `nearXXX` searches, which work by searching for objects with the most similar vector representation to the query.
- [Image](./image.md): Similarity search involving images.
- [BM25](./bm25.md): A keyword search that ranks results with the BM25F search function.
- [Hybrid](./hybrid.md): Combines BM25 and similarity search to rank results.
- [Generative](./generative.md): Feed search results to an LLM with a prompt using a `generative` module.
- [Reranking](./rerank.md): Rerank retrieved search results using a `reranker` module.
- [Aggregate](./aggregate.md): Aggregate data from a results set.
- [Filters](./filters.md): Apply conditional filters to the search.

Each guide is self-contained. So you can read them in any order.

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
