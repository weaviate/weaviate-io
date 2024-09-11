---
title: Indexing
sidebar_position: 0
image: og/docs/indexes.jpg
# tags: ['configuration']
---

This section provides examples of how to index Weaviate collections.

Collection objects contain vectors and properties. Vector indexes let you search the collection's vectors quickly and efficiently. Inverted indexes make filtering and searching object properties faster.

## Vector indexes

import VectorIntro from '/_includes/indexes/vector-intro.mdx';

<VectorIntro/>

### HNSW indexes

import HNSWIntro from '/_includes/indexes/hnsw-intro.mdx';

<HNSWIntro/>

See also:

 - [HNSW index parameters](/developers/weaviate/config-refs/schema/vector-index#hnsw-index-parameters)

### Flat indexes

import FlatIntro from '/_includes/indexes/flat-intro.mdx';

<FlatIntro/>

See also:

- [Flat index parameters](/developers/weaviate/config-refs/schema/vector-index#flat-indexes)

### Dynamic indexes

import DynamicIntro from '/_includes/indexes/dynamic-intro.mdx';

<DynamicIntro/>

See also:

- [Dynamic index parameters](/developers/weaviate/config-refs/schema/vector-index#dynamic-index-parameters)

## Inverted indexes

- [Overview](add)
- [indexSearchable]](add)
- [indexFilterable]](add)
- [indexRangeFilters]](add)

## Additional considerations

- [Asynchronous indexing](add)

import EnableAsynch from '/_includes/indexes/enable-async.mdx';

<EnableAsynch/>

- [Availability levels](add)
