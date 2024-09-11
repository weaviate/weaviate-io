---
title: Vector indexes
sidebar_position: 10
image: og/docs/indexes.jpg
# tags: ['configuration']
---

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

## Additional considerations

These are some additional things to consider when you configure indexing.

### Compression

Vector indexes can be large. Compressed vectors lose some information, but they use fewer resources and can be very cost effective. In most cases,

See also:

- [Compression overview](/developers/weaviate/starter-guides/managing-resources/compression)
- [Enable compression](/developers/weaviate/configuration/compression)

### Asynchronous indexing

Asynchronous indexing is a prerequisite for dynamic indexing and [AutoPQ](/developers/weaviate/configuration/compression/pq-compression#configure-autopq).

import EnableAsynch from '/_includes/indexes/enable-async.mdx';

<EnableAsynch/>

### Availability levels

## Related pages
- [Indexes overview](/developers/weaviate/starter-guides/managing-resources/indexing)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>