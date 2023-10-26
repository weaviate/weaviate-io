---
title: Vectorizers and Rerankers
sidebar_position: 0
image: og/docs/modules/vectorizers-overview.jpg
# tags: ['modules']
---


## Overview

This section includes reference guides for retriever & vectorizer modules. As their names suggest, `XXX2vec` modules are configured to produce a vector for each object.

- `text2vec` converts text data
- `img2vec` converts image data
- `multi2vec` converts image or text data (into the same embedding space)
- `ref2vec` converts cross-reference data (from within Weaviate)

### Vectorization with `text2vec-*` modules

import VectorizationBehavior from '/_includes/vectorization.behavior.mdx';

<VectorizationBehavior/>

:::info Vector inference at object update
Where Weaviate is configured with a vectorizer, it will only obtain a new vector if an object update changes the underlying text to be vectorized.
:::


## Re-ranking

Weaviate includes the following modules for [re-ranking](../../search/rerank.md) the data objects in a result set:
* [reranker-cohere](./reranker-cohere.md)
* [reranker-transformers](./reranker-transformers.md)
