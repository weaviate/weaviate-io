---
title: Indexing
sidebar_position: 1
image: og/docs/indexing.jpg
# tags: ['basics']['indexes']
---

This section of the documentation discusses indexing concepts as they relate to Weaviate.

For configuration examples without additional contextual material, see the [Vector index](/developers/weaviate/configuration/indexing-vector) and [Inverted index](/developers/weaviate/configuration/inverted-indexes) configuration pages.

## Vector indexes

Vector embeddings encapsulate meaning for the objects that they represent. Vector indexes make it easier to efficiently search large vector spaces in order to find objects with similar vector embeddings.

Weaviate offers these vector index types:

- [Hierarchical Navigable Small World (HNSW) indexes](/developers/weaviate/concepts/indexing/hnsw-indexes)
- [Flat indexes](/developers/weaviate/concepts/indexing/flat-indexes)
- [Dynamic indexes](/developers/weaviate/configuration/indexing-vector/dynamic-indexes)

## Inverted indexes

Inverted indexes, also known as keyword indexes, make textual and numeric searches more efficient. Inverted indexes use the [BM25](/developers/weaviate/concepts/indexing/inverted-indexes#bm25-ranking-algorithm) ranking algorithm.

Weaviate offers these inverted index types:

- indexSearchable
- indexFilterable
- indexRangeFilters

## Related pages

For more information, see the following:

- [Configure vector indexes](/developers/weaviate/configuration/indexing-vector)
- [Configure inverted indexes](/developers/weaviate/configuration/inverted-indexes)
- [Indexing starter guide](/developers/weaviate/starter-guides/managing-resources/indexing)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>