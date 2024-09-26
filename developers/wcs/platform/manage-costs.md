---
title: Manage resource costs
sidebar_position: 20
image: og/wcs/user_guides.jpg
---

Weaviate Cloud provides flexible resource management features that let you balance system performance and system resource costs. This page discusses configuration strategies to help you to get the most value from Weaviate Cloud.

## Indexes

Weaviate is a vector database. Its purpose is to manage collections of vectors, potentially very large collections of vectors. Most objects in Weaviate collections have one or more vectors; collections can have millions of objects; individual vectors can have thousands of dimensions. This adds up to a lot of storage.

Weaviate uses vector indexes to search collections efficiently. Indexes dramatically improve search, but they also increase storage requirements.

The default vector index in Weaviate Cloud is a [Hierarchical Navigable Small World (HNSW) index](/developers/weaviate/concepts/vector-index#hierarchical-navigable-small-world-hnsw-index). HNSW is an in memory index. The index is held in RAM memory along with the underlying vectors in the collection. The memory costs for a large collection can add up quickly.

### Index alternatives

Weaviate offers these index alternatives:

- [HNSW indexes](/developers/weaviate/starter-guides/managing-resources/indexing#hnsw-indexes). HNSW indexes are in-memory indexes that enable fast searching even with very large data sets.
- [Flat indexes](/developers/weaviate/starter-guides/managing-resources/indexing#flat-indexes). Flat indexes are disk-based indexes that work best with small data sets.
- [Dynamic indexes](/developers/weaviate/starter-guides/managing-resources/indexing#dynamic-indexes). Dynamic indexes are a configuration option that converts a flat index to an HNSW index at a threshold object count.

Weaviate Cloud costs are based on usage. More expensive resources, like RAM, incur more cost than cheaper resources, like disk or offline storage. If you don't need the precision and [control of an HNSW index](/developers/weaviate/config-refs/schema/vector-index#hnsw-indexes), consider using a flat index to shift resource costs.

If your application is multi-tenanted, consider [configuring a dynamic index](/developers/weaviate/manage-data/collections#set-vector-index-type) for your tenants. Smaller tenant indexes are flat, and stored on disk. Larger tenants are stored in RAM as HNSW indexes, but the overall cost is lower.

## Compression

## Tenant states

## Support

import SupportAndTrouble from '/_includes/wcs/support-and-troubleshoot.mdx';

<SupportAndTrouble />

import CustomScriptLoader from '/src/components/scriptSwitch';

<CustomScriptLoader/>
